// Word lookups through the Free Dictionary API (dictionaryapi.dev, free, Wiktionary-based,
// CC BY-SA). Entries are cached on the device so viewed words open offline.
import { RequestError } from './request-state.js';
import { hiddenSense } from './datamuse.js';
import { get, put } from './db.js';

const BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const TTL = 30 * 24 * 3600 * 1000;
const MAX_MEANINGS = 6;

const accentOf = (url) => (/-us\.mp3$/.test(url) ? 'us' : /-uk\.mp3$/.test(url) ? 'uk' : /-au\.mp3$/.test(url) ? 'au' : null);
const tidy = (s) => s.replace(/\s+/g, ' ').trim();

// API entries (and, for daily words, our own learner entry) to one word-page model.
export function normalize(entries, daily = null) {
  const first = entries?.[0];
  const word = daily?.w || first?.word;
  const audio = { us: null, uk: null, au: null };
  let ipa = daily?.ipa || null;
  const meanings = [];
  const synonyms = new Set();
  const antonyms = new Set();
  for (const e of entries || []) {
    if (!ipa) ipa = e.phonetic || e.phonetics?.find((p) => p.text)?.text || null;
    for (const p of e.phonetics || []) { const a = accentOf(p.audio || ''); if (a && !audio[a]) audio[a] = p.audio; }
    for (const m of e.meanings || []) {
      (m.synonyms || []).forEach((x) => synonyms.add(x));
      (m.antonyms || []).forEach((x) => antonyms.add(x));
      for (const d of m.definitions || []) {
        if (!d.definition || hiddenSense(d.definition)) continue;
        (d.synonyms || []).forEach((x) => synonyms.add(x));
        (d.antonyms || []).forEach((x) => antonyms.add(x));
        meanings.push({ pos: m.partOfSpeech, def: tidy(d.definition), example: d.example ? tidy(d.example) : null, register: null });
      }
    }
  }
  if (daily) meanings.unshift({ pos: daily.pos, def: daily.def, example: daily.ex, register: 'Everyday', ours: true });
  const single = (x) => /^[a-z-]+$/.test(x) && x !== word;
  return {
    word,
    ipa,
    audio,
    meanings: meanings.slice(0, MAX_MEANINGS),
    synonyms: daily?.syn?.length ? daily.syn : [...synonyms].filter(single).slice(0, 3),
    antonyms: daily?.ant?.length ? daily.ant : [...antonyms].filter(single).slice(0, 2),
    family: daily?.fam || [],
    origin: daily?.origin || entries?.find((e) => e.origin)?.origin || null,
    syllables: daily?.syl || null,
    source: first?.sourceUrls?.[0] || (word ? `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}` : null)
  };
}

async function fetchEntries(word, signal, fetchImpl) {
  let res;
  try { res = await fetchImpl(BASE + encodeURIComponent(word), { signal }); } catch (e) {
    if (e?.name === 'AbortError') throw e;
    throw new RequestError('network', 'Dictionary could not connect', 'DICT-503');
  }
  if (res.status === 404) throw new RequestError('not-found', `No entry for ${word}`, 'DICT-404');
  if (!res.ok) throw new RequestError('server', `Dictionary answered ${res.status}`, 'DICT-503');
  return res.json();
}

// Fresh cache first; otherwise the network; if the network fails, a stale cached copy.
export async function lookup(word, { signal, daily = null, fetchImpl = globalThis.fetch, now = Date.now() } = {}) {
  const key = `dict:${word.toLowerCase()}`;
  let cached = null;
  try { cached = await get('cache', key); } catch { /* storage unavailable: carry on without it */ }
  if (cached && now - cached.at < TTL) return { ...normalize(cached.data, daily), cachedAt: cached.at };
  try {
    const data = await fetchEntries(word.toLowerCase(), signal, fetchImpl);
    put('cache', { id: key, at: now, data }).catch(() => {});
    return normalize(data, daily);
  } catch (e) {
    if (cached && e.kind !== 'not-found') return { ...normalize(cached.data, daily), cachedAt: cached.at, stale: true };
    // A daily word still has our own entry when the dictionary is unreachable.
    if (daily && e.kind !== 'not-found') return { ...normalize([], daily), partial: true };
    throw e;
  }
}
