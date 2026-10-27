import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pickWords, buildQuiz, buildMatch, diffSpelling, shortDef, cardFor } from './practice.js';
import { fresh } from './srs.js';

const DAILY = JSON.parse(readFileSync(new URL('../../public/data/daily.json', import.meta.url))).words;
const byWord = new Map(DAILY.map((w) => [w.w, w]));
const NOW = 1_000_000_000_000;

test('due words come first, oldest first, then saved, then fresh words for the level', () => {
  const reviews = [{ ...fresh('benevolent', 0), due: NOW - 10 }, { ...fresh('diligent', 0), due: NOW - 100 }, { ...fresh('candid', 0), due: NOW + 1e9 }];
  const ids = pickWords({ reviews, saved: [{ id: 'serendipity' }], daily: DAILY, profile: { level: 2, goal: 'e' }, size: 6, now: NOW });
  assert.deepEqual(ids.slice(0, 3), ['diligent', 'benevolent', 'serendipity']);
  assert.ok(!ids.includes('candid'), 'not due yet');
  assert.equal(ids.length, 6);
  assert.ok(ids.slice(3).every((w) => byWord.get(w)?.l === 2), 'fresh words match the level');
});

test('a brand-new learner still gets a full session', () => {
  const ids = pickWords({ reviews: [], saved: [], daily: DAILY, profile: { level: 1, goal: 'x' }, size: 8, now: NOW });
  assert.equal(ids.length, 8);
  assert.ok(byWord.get(ids[0]).goals.includes('x'), 'goal words first');
});

test('every daily word makes a valid quiz question', () => {
  const cards = DAILY.map((w) => ({ w: w.w, pos: w.pos, def: w.def, ex: w.ex }));
  for (let i = 0; i < cards.length; i += 5) {
    for (const q of buildQuiz(cards.slice(i, i + 5), DAILY, 's' + i, 5, ['meaning', 'gap', 'listen', 'spell'])) {
      if (q.kind === 'typed') { assert.equal(q.type, 'Spelling'); continue; }
      assert.equal(q.options.length, 4, q.word);
      assert.equal(new Set(q.options).size, 4, `${q.word}: ${q.options}`);
      assert.ok(q.answer >= 0);
      if (q.type === 'Fill the gap') { assert.ok(q.text.includes('___')); assert.equal(q.options[q.answer], q.word); }
    }
  }
});

test('match never puts a meaning beside its own word', () => {
  const cards = DAILY.slice(0, 40).map((w) => ({ w: w.w, def: w.def }));
  for (let i = 0; i < 36; i += 4) {
    const m = buildMatch(cards.slice(i, i + 4), 'seed' + i);
    assert.equal(m.defs.length, 4);
    m.defs.forEach((d, k) => assert.notEqual(d.w, m.words[k]));
  }
});

test('spelling diff marks missing, wrong and extra letters', () => {
  const s = (t, y) => diffSpelling(t, y).map((x) => (x.status === 'ok' ? x.ch : `[${x.status[0]}:${x.ch}]`)).join('');
  assert.equal(s('meticulous', 'meticulous'), 'meticulous');
  assert.equal(s('meticulous', 'meticulus'), 'meticul[m:o]us');
  assert.equal(s('cat', 'cut'), 'c[w:a]t');
  // An extra letter can align in more than one place; exactly one 't' is extra either way.
  const extra = diffSpelling('cat', 'catt');
  assert.deepEqual(extra.filter((x) => x.status === 'extra').map((x) => x.ch), ['t']);
  assert.equal(extra.filter((x) => x.status === 'ok').map((x) => x.ch).join(''), 'cat');
});

test('short meanings are trimmed at a word boundary', () => {
  assert.equal(shortDef('Kind and wanting to help other people.'), 'Kind and wanting to help other people');
  assert.ok(shortDef('x '.repeat(50)).length <= 60);
});

test('cards come from daily data, offline', async () => {
  const c = await cardFor('benevolent', byWord);
  assert.equal(c.def, byWord.get('benevolent').def);
  assert.equal(await cardFor('not-cached-word', byWord), null);
});
