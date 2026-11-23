// Voices that run on the phone itself (free, offline after one download), for languages
// that phones don't have a voice for. Meta's MMS models, converted for the browser.
export const LOCAL_VOICES = {
  yo: { model: 'Xenova/mms-tts-yor', size: '38 MB', name: 'Yoruba' },
  ha: { model: 'lexiverse/mms-tts-hau', size: '38 MB', name: 'Hausa' },
  pcm: { model: 'lexiverse/mms-tts-pcm', size: '38 MB', name: 'Pidgin' }
};
// Voices that are planned but not ready yet, so the page can say so honestly.
export const COMING_VOICES = [];

export const hasLocalVoice = (lang) => Boolean(LOCAL_VOICES[lang]);

const flagKey = (lang) => `lx-voice-${lang}`;
export function localVoiceReady(lang) {
  try { return localStorage.getItem(flagKey(lang)) === '1'; } catch { return false; }
}

// The Yoruba model only knows lower-case letters with tone marks and dots under; drop anything else.
export function cleanForVoice(text, lang) {
  let t = String(text || '').normalize('NFC').toLowerCase();
  if (lang === 'yo') {
    t = t.replace(/[.,;:!?()"“”‘’]/g, ' ').replace(/[^a-zàáèéìíòóùúńǹṣẹọ̀́ '-]/g, '');
  } else if (lang === 'ha') {
    // Hausa hooked letters stay; tone and length marks are dropped (the voice was trained without them).
    t = t.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').replace(/[.,;:!?()"“”‘’]/g, ' ').replace(/[^a-zƙɓɗ' -]/g, '');
  } else if (lang === 'pcm') {
    t = t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[.,;:!?()"“”‘’]/g, ' ').replace(/[^a-z0-9' -]/g, '');
  }
  return t.replace(/\s+/g, ' ').trim();
}

let worker = null;
let seq = 0;
const waiting = new Map();
const progressFns = new Set();

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL('./tts.worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = ({ data }) => {
    if (data.type === 'progress') { progressFns.forEach((fn) => fn(data)); return; }
    const w = waiting.get(data.id);
    if (!w) return;
    waiting.delete(data.id);
    if (data.type === 'error') w.reject(new Error(data.message));
    else w.resolve(data);
  };
  worker.onerror = (ev) => {
    for (const w of waiting.values()) w.reject(new Error(ev.message || 'Voice failed to start'));
    waiting.clear();
    worker = null;
  };
  return worker;
}

function ask(msg) {
  const id = ++seq;
  return new Promise((resolve, reject) => {
    waiting.set(id, { resolve, reject });
    getWorker().postMessage({ id, ...msg });
  });
}

// Downloads the voice (or wakes it from the cache). onProgress gets a fraction from 0 to 1.
export async function loadLocalVoice(lang, onProgress) {
  const v = LOCAL_VOICES[lang];
  if (!v) throw new Error('No on-device voice for this language');
  const fn = (p) => { if (p.model === v.model && p.total) onProgress?.(Math.min(1, p.loaded / p.total)); };
  progressFns.add(fn);
  try {
    await ask({ type: 'load', model: v.model });
    try { localStorage.setItem(flagKey(lang), '1'); } catch { /* private mode */ }
  } finally { progressFns.delete(fn); }
}

let ctx = null;
let current = null;

// Must be called during the tap: browsers only let sound start from a user action.
export function unlockAudio() {
  const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function stopLocal() {
  if (current) { try { current.stop(); } catch { /* already ended */ } current = null; }
}

// Speaks text with the on-device voice; resolves when it has finished.
export async function speakLocal(text, lang, { rate = 1 } = {}) {
  const v = LOCAL_VOICES[lang];
  const ac = unlockAudio();
  const clean = cleanForVoice(text, lang);
  if (!v || !ac || !clean) return false;
  const out = await ask({ type: 'speak', model: v.model, text: clean });
  stopLocal();
  const buf = ac.createBuffer(1, out.audio.length, out.rate);
  buf.copyToChannel(out.audio, 0);
  const src = ac.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = rate;
  src.connect(ac.destination);
  current = src;
  return new Promise((resolve) => {
    src.onended = () => { if (current === src) current = null; resolve(true); };
    src.start();
  });
}
