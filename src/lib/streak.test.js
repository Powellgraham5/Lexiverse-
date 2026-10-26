import { test } from 'node:test';
import assert from 'node:assert/strict';
import { currentStreak, recordActivity, loadActivity, challengeDone } from './streak.js';

const memory = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) }; };

test('streak counts back from today', () => {
  assert.equal(currentStreak(['2026-10-24', '2026-10-25', '2026-10-26'], '2026-10-26'), 3);
});

test('streak still counts when today is not done yet', () => {
  assert.equal(currentStreak(['2026-10-24', '2026-10-25'], '2026-10-26'), 2);
});

test('a missed day breaks the streak', () => {
  assert.equal(currentStreak(['2026-10-22', '2026-10-24'], '2026-10-26'), 0);
  assert.equal(currentStreak([], '2026-10-26'), 0);
});

test('streak crosses month and year boundaries', () => {
  assert.equal(currentStreak(['2026-12-31', '2027-01-01'], '2027-01-01'), 2);
  assert.equal(currentStreak(['2026-02-28', '2026-03-01'], '2026-03-01'), 2);
});

test('recording a challenge marks the day and the challenge', () => {
  const s = memory();
  recordActivity('challenge', s, '2026-10-26');
  recordActivity('review', s, '2026-10-26');
  const a = loadActivity(s);
  assert.deepEqual(a.days, ['2026-10-26']);
  assert.ok(challengeDone(a, '2026-10-26'));
  assert.ok(!challengeDone(a, '2026-10-27'));
});
