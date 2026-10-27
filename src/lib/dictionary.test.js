import 'fake-indexeddb/auto';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalize, lookup } from './dictionary.js';
import { clear, resetDB } from './db.js';
import { RequestError } from './request-state.js';

const SEREN = JSON.parse(readFileSync(new URL('../../tests/e2e/data/dict-serendipity.json', import.meta.url)));
const respond = (status, body) => async () => ({ status, ok: status < 400, json: async () => body });
beforeEach(async () => { resetDB(); await clear('cache'); });

test('normalize collects meanings, audio by accent and related words', () => {
  const n = normalize(SEREN);
  assert.equal(n.word, 'serendipity');
  assert.match(n.ipa, /dɪ/);
  assert.ok(n.audio.us || n.audio.uk || n.audio.au);
  assert.ok(n.meanings.length >= 1 && n.meanings[0].pos === 'noun');
  assert.ok(n.synonyms.includes('luck'));
  assert.ok(!n.antonyms.includes("Murphy's law"), 'multi-word related terms are skipped');
});

test('a daily word puts our learner meaning first', () => {
  const daily = { w: 'serendipity', pos: 'noun', def: 'Luck in finding good things by chance.', ex: 'Pure serendipity.', ipa: '/x/', syn: ['luck'], ant: [], fam: [], origin: 'From Serendip.', syl: null };
  const n = normalize(SEREN, daily);
  assert.equal(n.meanings[0].def, daily.def);
  assert.equal(n.meanings[0].register, 'Everyday');
  assert.equal(n.origin, 'From Serendip.');
});

test('vulgar or slang senses are left out', () => {
  const n = normalize([{ word: 'x', meanings: [{ partOfSpeech: 'noun', definitions: [{ definition: '(vulgar) rude' }, { definition: 'A clean sense.' }] }] }]);
  assert.deepEqual(n.meanings.map((m) => m.def), ['A clean sense.']);
});

test('lookup caches entries and serves them offline', async () => {
  await lookup('serendipity', { fetchImpl: respond(200, SEREN), now: 1000 });
  const offline = async () => { throw new TypeError('offline'); };
  const n = await lookup('serendipity', { fetchImpl: offline, now: 2000 });
  assert.equal(n.word, 'serendipity');
  assert.equal(n.cachedAt, 1000);
});

test('stale cache is refreshed, but used if the network fails', async () => {
  await lookup('serendipity', { fetchImpl: respond(200, SEREN), now: 0 });
  const later = 40 * 24 * 3600 * 1000;
  const n = await lookup('serendipity', { fetchImpl: respond(503, null), now: later });
  assert.ok(n.stale);
});

test('404 becomes not-found DICT-404; failures become DICT-503', async () => {
  await assert.rejects(lookup('serendipty', { fetchImpl: respond(404, {}) }), (e) => e instanceof RequestError && e.kind === 'not-found' && e.code === 'DICT-404');
  await assert.rejects(lookup('zzz', { fetchImpl: respond(500, {}) }), (e) => e.kind === 'server' && e.code === 'DICT-503');
});

test('a daily word still opens when the dictionary is down', async () => {
  const daily = { w: 'benevolent', pos: 'adjective', def: 'Kind.', ex: 'A kind act.', syn: [], ant: [], fam: [] };
  const n = await lookup('benevolent', { daily, fetchImpl: respond(500, {}) });
  assert.ok(n.partial);
  assert.equal(n.meanings[0].def, 'Kind.');
});
