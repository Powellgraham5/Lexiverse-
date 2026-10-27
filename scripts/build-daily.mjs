// Builds public/data/daily.json from the hand-written lists in scripts/content/daily-*.txt.
// Adds pronunciation and audio (Free Dictionary API) and similar, opposite and family words (Datamuse).
// Responses are cached in scripts/.cache so reruns are fast and polite to the free APIs.
// Run: node scripts/build-daily.mjs   (after scripts/build-frequency.py)
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { BLOCKLIST } from '../src/lib/blocklist.js';
import { etymologyText, syllables } from './wiktionary.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const CACHE = join(ROOT, 'scripts/.cache');
mkdirSync(CACHE, { recursive: true });

const lines = (f) => readFileSync(join(ROOT, f), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const block = BLOCKLIST;
const ranked = lines('public/data/words.txt');
const rank = new Map(ranked.map((w, i) => [w, i]));
const ipaOverrides = new Map(lines('scripts/content/ipa-overrides.txt').map((l) => l.split('|')));
const relatedOverrides = new Map(lines('scripts/content/related-overrides.txt').map((l) => {
  const [w, syn, ant, fam] = l.split('|').map((x) => (x || '').split(',').filter(Boolean));
  return [w[0], { syn, ant, fam }];
}));

async function cachedJson(url) {
  const file = join(CACHE, createHash('sha1').update(url).digest('hex') + '.json');
  if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url);
    // The dictionary sometimes answers 404 when busy, so a 404 is confirmed once before it is cached.
    if (res.status === 404 && attempt > 0) { writeFileSync(file, 'null'); return null; }
    if (res.status === 404) { await new Promise((r) => setTimeout(r, 3000)); continue; }
    if (res.ok) { const data = await res.json(); writeFileSync(file, JSON.stringify(data)); return data; }
    // 429: wait for the rate-limit window to reset (capped), otherwise back off.
    const reset = Number(res.headers.get('x-ratelimit-reset')) * 1000 - Date.now();
    const wait = res.status === 429 && reset > 0 ? Math.min(reset + 1000, 90000) : 2000 * (attempt + 1);
    console.log(`  ${res.status} on ${url.split('/').pop()}, waiting ${Math.round(wait / 1000)} s`);
    await new Promise((r) => setTimeout(r, wait));
  }
  throw new Error(`Failed: ${url}`);
}

// Keep related words learners can use: single, common-ish, not offensive, not the word itself.
const usable = (w, self) => /^[a-z]+$/.test(w) && !block.has(w) && w !== self && rank.has(w);

// Word family: same base plus real English suffixes (grateful -> gratefully, diligent -> diligence).
const SUFFIXES = ['ation', 'ition', 'ness', 'ment', 'ence', 'ance', 'ency', 'ancy', 'ity', 'ous', 'ive', 'ful', 'less', 'able', 'ible', 'ent', 'ant', 'ion', 'ism', 'ist', 'ise', 'ize', 'ate', 'al', 'ic', 'ly', 'ed', 'ing', 'er', 'y', 'e', 's'];
const isSuffixChain = (rest) => rest === '' || SUFFIXES.some((x) => rest.startsWith(x) && isSuffixChain(rest.slice(x.length)));
// anticipates, anticipated, anticipating are forms of the same word, not new family members.
const isInflection = (word, x) => ['s', 'es', 'd', 'ed', 'ing'].some((end) => x === word + end || (word.endsWith('e') && x === word.slice(0, -1) + end))
  || (word.endsWith('y') && ['ies', 'ied'].some((end) => x === word.slice(0, -1) + end));
function familyOf(word) {
  const suffix = SUFFIXES.find((x) => word.endsWith(x) && word.length - x.length >= 4);
  const base = suffix ? word.slice(0, -suffix.length) : word;
  return ranked.filter((x) => x !== word && x.length > base.length + 1 && x.startsWith(base) && !block.has(x)
    && isSuffixChain(x.slice(base.length)) && !word.startsWith(x) && !isInflection(word, x))
    .filter((x, _, all) => !all.some((y) => y !== x && isInflection(y, x))).slice(0, 2);
}

function phonetics(entries) {
  const out = { ipa: null, us: null, uk: null };
  for (const e of entries || []) {
    for (const p of e.phonetics || []) {
      if (!out.ipa && p.text) out.ipa = p.text;
      if (p.audio && /-us\.mp3$/.test(p.audio) && !out.us) out.us = p.audio;
      if (p.audio && /-uk\.mp3$/.test(p.audio) && !out.uk) out.uk = p.audio;
    }
    if (!out.ipa && e.phonetic) out.ipa = e.phonetic;
  }
  return out;
}

const files = readdirSync(join(ROOT, 'scripts/content')).filter((f) => /^daily-\d/.test(f)).sort();
const seen = new Set();
const items = [];
for (const f of files) {
  const level = Number(f.match(/daily-(\d)/)[1]);
  for (const line of lines(`scripts/content/${f}`)) {
    const [w, pos, def, ex, goals] = line.split('|');
    if (seen.has(w)) continue;
    seen.add(w);
    items.push({ w, l: level, pos, def, ex, goals: goals.split(',') });
  }
}

let done = 0;
async function enrich(item) {
  const enc = encodeURIComponent(item.w);
  const [dict, syn, ml, ant, self] = await Promise.all([
    cachedJson(`https://api.dictionaryapi.dev/api/v2/entries/en/${enc}`),
    cachedJson(`https://api.datamuse.com/words?rel_syn=${enc}&max=20`),
    cachedJson(`https://api.datamuse.com/words?ml=${enc}&max=20&md=p`),
    cachedJson(`https://api.datamuse.com/words?rel_ant=${enc}&max=10`),
    cachedJson(`https://api.datamuse.com/words?sp=${enc}&md=p&max=1`)
  ]);
  // Every part of speech the word can take (calm is an adjective, a noun and a verb), used by the daily challenge.
  const POS = { n: 'noun', v: 'verb', adj: 'adjective', adv: 'adverb' };
  const allPos = [...new Set([item.pos, ...((self?.[0]?.word === item.w && self[0].tags) || []).map((t) => POS[t]).filter(Boolean)])];
  let ph = phonetics(dict);
  // British spellings are often missing from the dictionary; borrow the US entry's pronunciation.
  const us = item.w.replace(/is(e|ed|ing|ation)$/, 'iz$1').replace(/our$/, 'or').replace(/^sceptic/, 'skeptic');
  if (!ph.ipa && us !== item.w) ph = phonetics(await cachedJson(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(us)}`));
  // True synonyms first; "means like" words only fill gaps and must share the part of speech.
  const posTag = { noun: 'n', verb: 'v', adjective: 'adj', adverb: 'adv' }[item.pos];
  // Order by "means like" relevance (Datamuse's synonym list is unordered: anticipate -> call, occur),
  // keep real synonyms of the same part of speech first, then any leftover synonyms.
  const synSet = new Set((syn || []).map((x) => x.word));
  const close = (ml || []).filter((x) => (x.tags || []).includes(posTag)).map((x) => x.word);
  const ranked = [...close.filter((w) => synSet.has(w) || (ml.find((x) => x.word === w)?.tags || []).includes('syn')), ...close, ...synSet];
  const similar = [...new Set(ranked)].filter((x) => usable(x, item.w)).slice(0, 3);
  const opposite = (ant || []).map((x) => x.word).filter((x) => usable(x, item.w)).slice(0, 2);
  const family = familyOf(item.w);
  done++;
  if (done % 25 === 0) console.log(`${done}/${items.length}`);
  const fix = relatedOverrides.get(item.w);
  const page = wikt.get(item.w) || '';
  const origin = page ? etymologyText(page) : null;
  const syl = page ? syllables(page) : null;
  return { ...item, allPos, ipa: ph.ipa || ipaOverrides.get(item.w) || null, audio: { us: ph.us, uk: ph.uk }, origin, syl: syl && syl.join('') === item.w ? syl : null, syn: fix?.syn ?? similar, ant: fix?.ant ?? opposite, fam: fix?.fam ?? family, rank: rank.get(item.w) ?? null };
}

// Wiktionary pages for origins and syllables: 50 titles per request, a descriptive User-Agent
// and a pause between batches, as Wikimedia's API etiquette asks.
const UA = 'LexiverseBuild/1.0 (https://github.com/Powellgraham5/Lexiverse-; build script)';
async function wiktionaryPages(words) {
  const pages = new Map();
  for (let i = 0; i < words.length; i += 50) {
    const titles = words.slice(i, i + 50);
    const url = `https://en.wiktionary.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2&titles=${encodeURIComponent(titles.join('|'))}`;
    const file = join(CACHE, 'wikt-' + createHash('sha1').update(url).digest('hex') + '.json');
    let data = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
    for (let attempt = 0; !data && attempt < 5; attempt++) {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (res.ok) { data = await res.json(); writeFileSync(file, JSON.stringify(data)); break; }
      console.log(`  Wiktionary ${res.status}, waiting ${30 * (attempt + 1)} s`);
      await new Promise((r) => setTimeout(r, 30000 * (attempt + 1)));
    }
    for (const p of data?.query?.pages || []) if (p.revisions) pages.set(p.title, p.revisions[0].slots.main.content);
    if (!existsSync(file)) await new Promise((r) => setTimeout(r, 2000));
  }
  return pages;
}
const wikt = await wiktionaryPages(items.map((x) => x.w));

// Three at a time, so the free APIs aren't flooded.
const out = [];
for (let i = 0; i < items.length; i += 3) out.push(...(await Promise.all(items.slice(i, i + 3).map(enrich))));

const missing = out.filter((x) => !x.ipa).map((x) => x.w);
const lonely = out.filter((x) => x.syn.length + x.ant.length + x.fam.length < 2).map((x) => x.w);
writeFileSync(join(ROOT, 'public/data/daily.json'), JSON.stringify({ version: 1, words: out }));
console.log(`daily.json: ${out.length} words (level 1: ${out.filter((x) => x.l === 1).length}, 2: ${out.filter((x) => x.l === 2).length}, 3: ${out.filter((x) => x.l === 3).length})`);
console.log(`no pronunciation: ${missing.length} ${missing.join(' ')}`);
console.log(`origins: ${out.filter((x) => x.origin).length}/${out.length}, syllables: ${out.filter((x) => x.syl).length}/${out.length}`);
console.log(`fewer than 2 related words: ${lonely.length} ${lonely.join(' ')}`);
