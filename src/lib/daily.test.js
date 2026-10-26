import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dayKey, wordOfTheDay, buildChallenge } from './daily.js';

const WORDS = JSON.parse(readFileSync(new URL('../../public/data/daily.json', import.meta.url))).words;

test('dayKey uses the local calendar date', () => {
  assert.equal(dayKey(new Date(2026, 0, 5, 23, 59)), '2026-01-05');
});

test('word of the day is stable for a day and changes the next day', () => {
  const a = wordOfTheDay(WORDS, { level: 2, goal: 'x', day: '2026-10-27' });
  assert.equal(wordOfTheDay(WORDS, { level: 2, goal: 'x', day: '2026-10-27' }).w, a.w);
  assert.notEqual(wordOfTheDay(WORDS, { level: 2, goal: 'x', day: '2026-10-28' }).w, a.w);
  assert.equal(a.l, 2);
});

test('a full cycle never repeats a word and puts goal words first', () => {
  const pool = WORDS.filter((w) => w.l === 3);
  const seen = new Set();
  for (let i = 0; i < pool.length; i++) {
    const d = new Date(Date.UTC(2027, 0, 1) + i * 86400000);
    seen.add(wordOfTheDay(WORDS, { level: 3, goal: 'k', day: d.toISOString().slice(0, 10) }).w);
  }
  assert.equal(seen.size, pool.length);
});

test('every daily word gets a challenge with exactly one right answer and three options', () => {
  for (const w of WORDS) {
    const c = buildChallenge(w, WORDS);
    assert.equal(c.options.length, 3, `${w.w} has ${c.options.length} options`);
    assert.equal(c.options.filter((o) => o.correct).length, 1);
    assert.equal(new Set(c.options.map((o) => o.text)).size, 3);
    if (c.kind === 'usage') {
      assert.equal(c.options[c.answer].text, w.ex);
      for (const o of c.options.filter((x) => !x.correct)) assert.match(o.text.toLowerCase(), new RegExp(`\\b${w.w}\\b`), `${w.w}: "${o.text}"`);
    } else {
      assert.equal(c.options[c.answer].text, w.def);
    }
  }
});

test('words that can be adjective, noun and verb get a meaning question', () => {
  const calm = WORDS.find((x) => x.w === 'calm');
  assert.deepEqual(new Set(calm.allPos), new Set(['adjective', 'noun', 'verb']));
  assert.equal(buildChallenge(calm, WORDS).kind, 'meaning');
});

test('usage distractors never use a slot the word can fill', () => {
  for (const w of WORDS) {
    const c = buildChallenge(w, WORDS);
    if (c.kind !== 'usage') continue;
    const wrong = c.options.filter((o) => !o.correct).map((o) => o.text);
    const donors = WORDS.filter((d) => wrong.includes(d.ex.replace(new RegExp(`\\b${d.w}\\b`, 'i'), (m) => (m[0] === m[0].toUpperCase() ? w.w[0].toUpperCase() + w.w.slice(1) : w.w))));
    for (const d of donors) assert.ok(!(w.allPos || [w.pos]).includes(d.pos), `${w.w} (${w.allPos}) used in a ${d.pos} slot`);
  }
});

test('the explanation names the part of speech', () => {
  const w = WORDS.find((x) => x.w === 'benevolent');
  const c = buildChallenge(w, WORDS);
  assert.match(c.explain, /^Benevolent is an adjective: it describes a person or thing\./);
});

test('every daily word has its own word in its example sentence', () => {
  const stem = (w) => w.slice(0, Math.max(4, w.length - 3));
  for (const w of WORDS) assert.ok(w.ex.toLowerCase().includes(stem(w.w)), `${w.w}: ${w.ex}`);
});
