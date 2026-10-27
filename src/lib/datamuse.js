// Search through the free Datamuse API (no key needed). Every function returns plain data
// and throws RequestError so the screens can show the designed states (src/lib/request-state.js).
import { RequestError } from './request-state.js';
import { BLOCKLIST } from './blocklist.js';

const BASE = 'https://api.datamuse.com';

// Wiktionary senses carry labels; these never reach learners.
const HIDDEN = /\b(vulgar|offensive|derogatory|slang|obsolete|archaic|dated|rare|abbreviation|initialism|acronym|clipping|misspelling|alternative form|plural of|past tense|present participle|third-person|ethnic slur)\b/i;

// True when a sense is vulgar, slang, archaic or just a pointer to another form.
export const hiddenSense = (text = '') => HIDDEN.test((text.match(/^\s*\(([^)]*)\)/)?.[1] || '')) || HIDDEN.test(text.slice(0, 40));

// The first clean, short definition, without its "(label)" prefix.
export function cleanDef(defs = []) {
  for (const raw of defs) {
    const text = raw.split('\t')[1] || raw;
    const label = text.match(/^\s*\(([^)]*)\)/)?.[1] || '';
    if (HIDDEN.test(label) || HIDDEN.test(text.slice(0, 40))) continue;
    const def = text.replace(/^\s*(\([^)]*\)\s*)+/, '').replace(/\s*\[.*$/, '').trim().replace(/\.$/, '');
    if (!def) continue;
    return def.length > 90 ? def.slice(0, def.lastIndexOf(' ', 87)) + '…' : def;
  }
  return null;
}

export const usableWord = (w) => /^[a-z]+(-[a-z]+)?$/.test(w) && !BLOCKLIST.has(w);

async function get(path, signal, fetchImpl = globalThis.fetch) {
  let res;
  try { res = await fetchImpl(BASE + path, { signal }); } catch (e) {
    if (e?.name === 'AbortError') throw e;
    throw new RequestError('network', 'Search could not connect', 'DICT-503');
  }
  if (!res.ok) throw new RequestError('server', `Search answered ${res.status}`, 'DICT-503');
  return res.json();
}

const q = encodeURIComponent;
const rows = (list, withDef = true) => list.filter((x) => usableWord(x.word)).map((x) => ({ word: x.word, def: withDef ? cleanDef(x.defs) : null, score: x.score }));

// Word mode: words starting with what was typed, most common first.
export async function startsWith(text, signal, f) {
  const t = text.trim().toLowerCase();
  const list = rows(await get(`/words?sp=${q(t)}*&md=d&max=24`, signal, f));
  // Put an exact match first even if it is less common than longer words.
  list.sort((a, b) => (b.word === t) - (a.word === t));
  return list.slice(0, 12);
}

// Closest spelling for a typo, or null when the text is already a word.
export async function didYouMean(text, signal, f) {
  const t = text.trim().toLowerCase();
  const best = (await get(`/words?sp=${q(t)}&max=3`, signal, f)).map((x) => x.word).find(usableWord);
  return best && best !== t ? best : null;
}

// Meaning mode (reverse dictionary): describe it, get ranked words.
export async function byMeaning(text, signal, f) {
  return rows(await get(`/words?ml=${q(text.trim())}&md=d&max=24`, signal, f)).filter((x) => x.def).slice(0, 12);
}

// Pattern mode: ? is one letter, * is any letters.
export async function byPattern(pattern, signal, f) {
  const p = pattern.trim().toLowerCase().replace(/[^a-z?*]/g, '');
  return rows(await get(`/words?sp=${q(p)}&md=d&max=40`, signal, f)).filter((x) => x.def).slice(0, 24);
}

// Rhymes grouped by syllable count (fewest first), plus a few near rhymes.
export async function rhymes(word, signal, f) {
  const w = q(word.trim().toLowerCase());
  const [perfect, near] = await Promise.all([
    get(`/words?rel_rhy=${w}&md=s&max=60`, signal, f),
    get(`/words?rel_nry=${w}&max=12`, signal, f)
  ]);
  const groups = new Map();
  for (const x of perfect) {
    if (!usableWord(x.word)) continue;
    const n = x.numSyllables || 1;
    if (!groups.has(n)) groups.set(n, []);
    if (groups.get(n).length < 10) groups.get(n).push(x.word);
  }
  return {
    groups: [...groups.entries()].sort((a, b) => a[0] - b[0]).slice(0, 4).map(([syllables, words]) => ({ syllables, words })),
    near: near.map((x) => x.word).filter(usableWord).slice(0, 6)
  };
}
