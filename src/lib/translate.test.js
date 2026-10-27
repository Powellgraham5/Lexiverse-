import 'fake-indexeddb/auto';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { translate, fromPhrasebook } from './translate.js';
import { searchLanguages, hasVoice } from './languages.js';
import { clear, resetDB } from './db.js';

const BOOK = JSON.parse(readFileSync(new URL('../../public/data/phrases.json', import.meta.url)));
const reply = (status, body) => { const calls = []; const f = async (url) => { calls.push(url); return { status, ok: status < 400, json: async () => body }; }; f.calls = calls; return f; };
beforeEach(async () => { resetDB(); await clear('cache'); });

test('phrasebook answers first, ignoring case and punctuation', async () => {
  const f = reply(200, {});
  const r = await translate('thank you for your help!', 'en', 'yo', { book: BOOK, fetchImpl: f });
  assert.equal(r.text, 'Ẹ ṣé fún ìrànlọ́wọ́ yín');
  assert.equal(r.source, 'phrasebook');
  assert.equal(f.calls.length, 0);
});

test('every phrase has all five languages filled in', () => {
  for (const p of BOOK.phrases) for (const c of BOOK.languages) assert.ok(p.t[c].text?.trim(), `${p.id} ${c}`);
  assert.equal(fromPhrasebook(BOOK, 'Not a phrase', 'yo'), null);
});

test('machine translation is fetched once, then cached', async () => {
  const f = reply(200, { responseData: { translatedText: 'Bawo ni ojo' }, responseStatus: 200 });
  const a = await translate('How is the weather', 'en', 'yo', { book: BOOK, fetchImpl: f });
  const b = await translate('How is the weather', 'en', 'yo', { book: BOOK, fetchImpl: f });
  assert.equal(a.text, 'Bawo ni ojo');
  assert.deepEqual(b, a);
  assert.equal(f.calls.length, 1);
  assert.match(f.calls[0], /langpair=en\|yo/);
});

test('quota and failures become translator errors', async () => {
  await assert.rejects(translate('x y', 'en', 'fr', { fetchImpl: reply(429, {}) }), (e) => e.code === 'TR-429');
  await assert.rejects(translate('x z', 'en', 'fr', { fetchImpl: reply(200, { responseData: { translatedText: 'MYMEMORY WARNING: YOU USED ALL AVAILABLE FREE TRANSLATIONS' } }) }), (e) => e.code === 'TR-429');
  await assert.rejects(translate('x w', 'en', 'fr', { fetchImpl: reply(500, {}) }), (e) => e.code === 'TR-503');
  await assert.rejects(translate('x v', 'en', 'fr', { fetchImpl: async () => { throw new TypeError('offline'); } }), (e) => e.kind === 'network');
});

test('Pidgin is phrasebook only', async () => {
  assert.equal((await translate('Please', 'en', 'pcm', { book: BOOK })).text, 'Abeg');
  await assert.rejects(translate('Where is the bank', 'en', 'pcm', { book: BOOK }), (e) => e.code === 'TR-404');
});

test('text is capped at 500 characters', async () => {
  const f = reply(200, { responseData: { translatedText: 'ok' }, responseStatus: 200 });
  await translate('a'.repeat(900), 'en', 'fr', { fetchImpl: f });
  assert.equal(decodeURIComponent(f.calls[0].match(/q=([^&]*)/)[1]).length, 500);
});

test('language search matches English and native names without accents', () => {
  assert.deepEqual(searchLanguages('sw').map((l) => l.name), ['Swahili', 'Swedish']);
  assert.deepEqual(searchLanguages('yoruba').map((l) => l.code), ['yo']);
  assert.deepEqual(searchLanguages('Français').map((l) => l.code), ['fr']);
});

test('voices are matched by language prefix', () => {
  assert.ok(hasVoice('fr', [{ lang: 'fr-FR' }]));
  assert.ok(!hasVoice('yo', [{ lang: 'fr-FR' }, { lang: 'en-US' }]));
  assert.ok(hasVoice('zh', [{ lang: 'zh-CN' }]));
});
