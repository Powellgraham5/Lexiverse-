// Translation: the offline phrasebook first (exact phrase), then MyMemory (free, no key,
// supports Yoruba, Hausa and Igbo). Results are cached on the device.
import { RequestError } from './request-state.js';
import { byCode } from './languages.js';
import { get, put } from './db.js';

export const MAX_CHARS = 500;
const API = 'https://api.mymemory.translated.net/get';

const norm = (s) => s.toLowerCase().replace(/[.,!?¿¡…"“”'’]/g, '').replace(/\s+/g, ' ').trim();

let phrasebook = null;
export function loadPhrasebook(fetchImpl = globalThis.fetch) {
  if (!phrasebook) {
    phrasebook = fetchImpl('/data/phrases.json').then((r) => (r.ok ? r.json() : Promise.reject(new Error('phrases ' + r.status))))
      .catch((e) => { phrasebook = null; throw e; });
  }
  return phrasebook;
}

// English to another language from the phrasebook, or null.
export function fromPhrasebook(book, text, to) {
  const hit = book?.phrases.find((p) => norm(p.en) === norm(text));
  const t = hit?.t[to];
  return t ? { text: t.text, source: 'phrasebook', reviewed: t.reviewed } : null;
}

export async function translate(text, from, to, { signal, fetchImpl = globalThis.fetch, book } = {}) {
  const clean = text.trim().slice(0, MAX_CHARS);
  if (!clean) return null;
  if (from === to) return { text: clean, source: 'same', reviewed: true };
  if (from === 'en') {
    const hit = fromPhrasebook(book, clean, to);
    if (hit) return hit;
  }
  if (byCode(to)?.phrasebookOnly || byCode(from)?.phrasebookOnly) {
    throw new RequestError('not-found', 'Only phrasebook phrases are available for this language', 'TR-404');
  }
  const key = `tr:${from}|${to}:${norm(clean)}`;
  try { const c = await get('cache', key); if (c) return c.data; } catch { /* no storage */ }

  let res;
  try { res = await fetchImpl(`${API}?q=${encodeURIComponent(clean)}&langpair=${from}|${to}`, { signal }); } catch (e) {
    if (e?.name === 'AbortError') throw e;
    throw new RequestError('network', 'Translator could not connect', 'TR-503');
  }
  const body = res.ok ? await res.json().catch(() => null) : null;
  const out = body?.responseData?.translatedText;
  // MyMemory reports its daily free limit as a 429, or as a warning inside a 200 answer.
  if (res.status === 429 || body?.quotaFinished || /MYMEMORY WARNING/i.test(out || '')) {
    throw new RequestError('server', "Today's free translation limit is used up", 'TR-429');
  }
  if (!res.ok || !out || Number(body.responseStatus) >= 400) throw new RequestError('server', 'Translator is not responding', 'TR-503');
  const data = { text: out, source: 'machine', reviewed: false };
  put('cache', { id: key, at: Date.now(), data }).catch(() => {});
  return data;
}
