import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanDef, startsWith, didYouMean, rhymes, byPattern } from './datamuse.js';
import { RequestError } from './request-state.js';

const fake = (routes) => async (url) => {
  const hit = Object.entries(routes).find(([k]) => url.includes(k));
  if (!hit) throw new TypeError('network');
  return { ok: hit[1] !== 500, status: hit[1] === 500 ? 500 : 200, json: async () => hit[1] };
};

test('cleanDef skips vulgar and slang senses and strips labels', () => {
  assert.equal(cleanDef(['n\t(vulgar) something rude', 'n\t(countable) A small furry pet. ']), 'A small furry pet');
  assert.equal(cleanDef(['n\tTerms relating to animals. ']), 'Terms relating to animals');
  assert.equal(cleanDef(['n\tAbbreviation of category. [x]']), null);
  assert.equal(cleanDef([]), null);
});

test('cleanDef shortens long definitions at a word boundary', () => {
  const d = cleanDef(['n\t' + 'word '.repeat(40)]);
  assert.ok(d.length <= 90 && d.endsWith('…'));
});

test('startsWith keeps single clean words and puts an exact match first', async () => {
  const f = fake({ 'sp=seren*': [
    { word: 'serenity', score: 9, defs: ['n\tCalm.'] },
    { word: 'serendipity berry', score: 8 },
    { word: 'serene', score: 7, defs: ['adj\tCalm and peaceful.'] }
  ] });
  assert.deepEqual((await startsWith('seren', undefined, f)).map((x) => x.word), ['serenity', 'serene']);
  const g = fake({ 'sp=serene*': [{ word: 'serenely', defs: [] }, { word: 'serene', defs: [] }] });
  assert.equal((await startsWith('serene', undefined, g))[0].word, 'serene');
});

test('didYouMean suggests a correction only for typos', async () => {
  assert.equal(await didYouMean('serendipty', undefined, fake({ 'sp=serendipty': [{ word: 'serendipity' }] })), 'serendipity');
  assert.equal(await didYouMean('serene', undefined, fake({ 'sp=serene': [{ word: 'serene' }] })), null);
});

test('rhymes are grouped by syllables, fewest first', async () => {
  const r = await rhymes('bright', undefined, fake({
    rel_rhy: [{ word: 'delight', numSyllables: 2 }, { word: 'night', numSyllables: 1 }, { word: 'kite', numSyllables: 1 }],
    rel_nry: [{ word: 'life' }]
  }));
  assert.deepEqual(r.groups, [{ syllables: 1, words: ['night', 'kite'] }, { syllables: 2, words: ['delight'] }]);
  assert.deepEqual(r.near, ['life']);
});

test('pattern drops words with no clean definition', async () => {
  const r = await byPattern('c?t', undefined, fake({ 'sp=c%3Ft': [{ word: 'cat', defs: ['n\tA pet.'] }, { word: 'cit', defs: ['n\t(derogatory) x'] }] }));
  assert.deepEqual(r.map((x) => x.word), ['cat']);
});

test('network and server failures become RequestErrors', async () => {
  await assert.rejects(startsWith('x', undefined, fake({})), (e) => e instanceof RequestError && e.kind === 'network');
  await assert.rejects(startsWith('x', undefined, fake({ 'sp=x*': 500 })), (e) => e instanceof RequestError && e.kind === 'server' && e.code === 'DICT-503');
});
