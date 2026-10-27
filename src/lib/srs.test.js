import 'fake-indexeddb/auto';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { fresh, grade, comesBack, gradeFor, summary, record, loadReviews } from './srs.js';
import { clear, resetDB } from './db.js';

const DAY = 86400000;
beforeEach(async () => { resetDB(); await clear('reviews'); });

test('got it: 7 days, then interval x ease', () => {
  const a = grade(fresh('w', 0), 'got', 0);
  assert.equal(a.interval, 7);
  assert.equal(a.due, 7 * DAY);
  const b = grade(a, 'got', a.due);
  assert.equal(b.interval, Math.round(7 * 2.5));
});

test('forgot: later today, interval reset, ease drops but not below the floor', () => {
  let s = grade(fresh('w', 0), 'got', 0);
  s = grade(s, 'forgot', 100);
  assert.equal(s.interval, 0);
  assert.equal(s.due, 100 + 10 * 60000);
  assert.equal(s.lapses, 1);
  for (let i = 0; i < 20; i++) s = grade(s, 'forgot', 0);
  assert.equal(s.ease, 1.3);
});

test('almost: at least 2 days', () => {
  const s = grade(fresh('w', 0), 'almost', 0);
  assert.equal(s.interval, 2);
  assert.equal(s.ease, 2.35);
});

test('the buttons say when the word comes back', () => {
  const s = fresh('w', 0);
  assert.equal(comesBack(s, 'forgot'), 'later today');
  assert.equal(comesBack(s, 'almost'), 'in 2 days');
  assert.equal(comesBack(s, 'got'), 'in 7 days');
});

test('game results map to grades', () => {
  assert.equal(gradeFor({ correct: true }), 'got');
  assert.equal(gradeFor({ correct: true, helped: true }), 'almost');
  assert.equal(gradeFor({ correct: false }), 'forgot');
});

test('summary counts due, done today and the next due time', async () => {
  const now = new Date(2026, 9, 26, 12).getTime();
  await record('a', 'got', now);
  await record('b', 'forgot', now);
  await record('c', 'got', now - 30 * DAY);
  const s = summary(await loadReviews(), now);
  assert.equal(s.due, 1, 'c is due again');
  assert.equal(s.doneToday, 2);
  assert.equal(s.nextDue, now + 10 * 60000);
});
