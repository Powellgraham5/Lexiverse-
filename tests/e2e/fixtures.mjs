// Canned Datamuse answers so e2e runs are repeatable and never depend on the live API.
const d = (word, def, extra = {}) => ({ word, score: 1000, defs: [`n\t${def}`], ...extra });

const ROUTES = [
  [/sp=seren\*/, [d('serendipity', 'Luck in finding good things by chance'), d('serene', 'Calm and peaceful'), d('serenity', 'The state of being calm')]],
  [/sp=serendipity\*/, [d('serendipity', 'Luck in finding good things by chance'), d('serendipitous', 'Happening by happy chance')]],
  [/sp=serendipty\*/, []],
  [/sp=serendipty(&|$)/, [{ word: 'serendipity', score: 10 }]],
  [/sp=qwizzle/, []],
  [/sp=c%3Ft/, [d('cat', 'A small furry pet'), d('cot', "A baby's bed"), d('cut', 'To divide with a blade')]],
  [/ml=/, [d('bibliophile', 'A person who loves books'), d('bookworm', 'Someone who reads a lot'), d('reader', 'A person who reads')]],
  [/rel_rhy=bright/, [{ word: 'night', numSyllables: 1 }, { word: 'kite', numSyllables: 1 }, { word: 'delight', numSyllables: 2 }, { word: 'satellite', numSyllables: 3 }]],
  [/rel_nry=bright/, [{ word: 'life' }]],
  [/sp=fail/, 500]
];

import { readFileSync } from 'node:fs';

const DICT = {
  serendipity: JSON.parse(readFileSync(new URL('./data/dict-serendipity.json', import.meta.url))),
  // A real entry with its recordings removed: the "partial" state.
  defenestrate: JSON.parse(readFileSync(new URL('./data/dict-defenestrate.json', import.meta.url)))
    .map((e) => ({ ...e, phonetics: e.phonetics.map((p) => ({ ...p, audio: '' })) }))
};

// MyMemory: quota error for "quota", Arabic for RTL checks, otherwise a tagged echo.
function myMemory(url) {
  const u = new URL(url);
  const q = u.searchParams.get('q');
  const to = u.searchParams.get('langpair').split('|')[1];
  if (/quota/i.test(q)) return { status: 429, json: { responseStatus: 429, quotaFinished: true } };
  if (to === 'ar') return { status: 200, json: { responseData: { translatedText: 'شكرًا لمساعدتك' }, responseStatus: 200 } };
  return { status: 200, json: { responseData: { translatedText: `[${to}] ${q}` }, responseStatus: 200 } };
}

export async function mockApis(context) {
  await context.route('https://api.datamuse.com/**', (route) => {
    const url = route.request().url();
    const hit = ROUTES.find(([re]) => re.test(url));
    const body = hit ? hit[1] : [];
    return body === 500 ? route.fulfill({ status: 500, body: 'error' }) : route.fulfill({ json: body });
  });
  await context.route('https://api.dictionaryapi.dev/**', (route) => {
    const url = route.request().url();
    if (url.includes('/media/')) return route.fulfill({ status: 200, contentType: 'audio/mpeg', body: '' });
    const word = decodeURIComponent(url.split('/').pop());
    if (word === 'fail') return route.fulfill({ status: 500, body: 'error' });
    if (DICT[word]) return route.fulfill({ json: DICT[word] });
    return route.fulfill({ status: 404, json: { title: 'No Definitions Found' } });
  });
  await context.route('https://api.mymemory.translated.net/**', (route) => {
    const r = myMemory(route.request().url());
    return route.fulfill({ status: r.status, json: r.json });
  });
}

export const PROFILE = { goal: 'e', level: 2, done: true, startedAt: 0 };

// Records what would be spoken instead of using real voices (headless Chromium has none).
export const SPEECH_STUB = () => {
  window.__spoken = [];
  const fakeVoices = [{ lang: 'en-US', localService: true, name: 'US' }, { lang: 'en-GB', localService: true, name: 'UK' }, { lang: 'fr-FR', localService: true, name: 'FR' }];
  const synth = {
    speaking: false,
    getVoices: () => fakeVoices,
    cancel() {},
    speak(u) { window.__spoken.push({ text: u.text, lang: u.lang, rate: u.rate }); setTimeout(() => u.onend?.(), 10); }
  };
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
};
