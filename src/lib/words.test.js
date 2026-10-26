import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseWordList, levelOf, lettersSearch } from './words.js';

const data = parseWordList(readFileSync(new URL('../../public/data/words.txt', import.meta.url), 'utf8'));

test('word list loads with bands in order', () => {
  assert.ok(data.list.length > 20000);
  assert.equal(data.list[0], 'the');
  assert.deepEqual(data.bands.map((b) => b[0]), ['A1', 'A2', 'B1', 'B2', 'C1']);
});

test('levels: common words are low, rare words are C2', () => {
  assert.equal(levelOf('house', data).cefr, 'A1');
  assert.equal(levelOf('house', data).label, 'Common');
  assert.deepEqual(levelOf('qwizzle', data), { cefr: 'C2', label: 'Rare' });
  assert.equal(levelOf('House', data).cefr, 'A1');
});

test('letters: full anagrams first, then shorter words by length', () => {
  const groups = lettersSearch('stone', data.list);
  assert.equal(groups[0].length, 5);
  assert.ok(groups[0].all);
  for (const w of ['notes', 'onset', 'tones']) assert.ok(groups[0].words.includes(w), w);
  assert.ok(groups.find((g) => g.length === 4).words.includes('note'));
  assert.ok(groups.every((g, i) => i === 0 || g.length < groups[i - 1].length));
  assert.ok(groups.flatMap((g) => g.words).every((w) => w.length >= 3));
});

test('letters: never uses a letter more times than given', () => {
  for (const w of lettersSearch('aple', data.list).flatMap((g) => g.words)) assert.ok(!/p.*p/.test(w), w);
});

test('letters: ? is a blank tile', () => {
  const words = lettersSearch('ca?', data.list).flatMap((g) => g.words);
  assert.ok(words.includes('cat') && words.includes('car'));
});
