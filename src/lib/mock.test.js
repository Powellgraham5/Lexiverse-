import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_FORMATS, mockTotal, buildMock, scoreMock, clock, hms, warnAt, saveRun, loadRun, clearRun, recordMock, loadMocks, bestMock } from './mock.js';
import { loadBank } from './bank.js';

const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };

test('the full mock matches the UTME shape: 60 + 3 x 40 = 180 questions in 2 hours', async () => {
  const ids = ['biology', 'english', 'mathematics', 'physics'];
  assert.equal(mockTotal(MOCK_FORMATS.full, ids), 180);
  assert.equal(MOCK_FORMATS.full.secs, 7200);
  const banks = await Promise.all(ids.map(loadBank));
  const paper = buildMock(banks, 'full');
  assert.equal(paper[0].id, 'english', 'Use of English comes first');
  assert.deepEqual(paper.map((s) => s.ids.length), [60, 40, 40, 40]);
  for (const s of paper) assert.equal(new Set(s.ids).size, s.ids.length, `${s.id} has no repeats`);
  assert.deepEqual(buildMock(banks, 'short').map((s) => s.ids.length), [20, 15, 15, 15]);
});

test('unseen questions are drawn first', async () => {
  const bank = await loadBank('biology');
  const seen = Object.fromEntries(bank.questions.slice(0, 80).map((q) => [q.id, 1]));
  const [s] = buildMock([bank], 'full', { biology: seen });
  assert.ok(s.ids.every((id) => !seen[id]));
});

test('each subject scores out of 100 and the total out of 400', () => {
  const byId = { a: { answer: 0 }, b: { answer: 0 }, c: { answer: 0 }, d: { answer: 0 } };
  const r = scoreMock([{ id: 'english', title: 'E', ids: ['a', 'b'] }, { id: 'biology', title: 'B', ids: ['c', 'd'] }], byId, { a: 0, b: 2, c: 0, d: 0 });
  assert.deepEqual(r.subjects.map((s) => s.score), [50, 100]);
  assert.equal(r.total, 150); assert.equal(r.max, 200);
  assert.equal(r.subjects[0].answered, 2);
});

test('the clock counts down from a deadline, pauses and can be turned off', () => {
  let c = clock.start(120, 0);
  assert.equal(clock.left(c, 30000), 90);
  c = clock.pause(c, 30000);
  assert.equal(clock.left(c, 999999), 90, 'paused time does not run');
  c = clock.pause(c, 100000);
  assert.equal(clock.left(c, 110000), 80);
  assert.equal(clock.left(c, 10 ** 9), 0);
  assert.equal(clock.left(clock.off(), 5), null);
  assert.equal(hms(7200), '2:00:00'); assert.equal(hms(65), '1:05'); assert.equal(hms(3605), '1:00:05');
  assert.equal(warnAt(300), '5 minutes left'); assert.equal(warnAt(301), '');
});

test('a paper in progress and finished mocks are kept', async () => {
  const s = mem();
  saveRun({ sections: [{ id: 'english', ids: ['en1'] }], answers: { en1: 2 } }, s);
  assert.equal(loadRun(s).answers.en1, 2);
  clearRun(s); assert.equal(loadRun(s), null);
  await recordMock({ format: 'full', total: 210, max: 400, secs: 5000, subjects: [{ id: 'english', score: 60 }] }, 1);
  await recordMock({ format: 'short', total: 260, max: 400, secs: 2000, subjects: [{ id: 'english', score: 70 }] }, 2);
  const h = await loadMocks();
  assert.equal(h.runs.length, 2);
  assert.equal(bestMock(h).total, 260);
  assert.equal(h.runs[0].subjects.english, 60);
});
