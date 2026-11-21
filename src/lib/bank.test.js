import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JAMB_SUBJECTS, loadBank, drawSet, recordBankSession, loadBankProgress, bestSession, seenCount } from './bank.js';
import { pathHome } from './paths.js';

const ready = JAMB_SUBJECTS.filter((s) => s.load);

test('every JAMB bank is large and well formed', async () => {
  const ids = new Set();
  for (const s of ready) {
    const bank = await loadBank(s.id);
    assert.ok(bank.questions.length >= 120, `${s.id} has only ${bank.questions.length} questions`);
    assert.ok(!JSON.stringify(bank).includes('—'), `${s.id} contains an em dash`);
    for (const q of bank.questions) {
      assert.ok(!ids.has(q.id), `duplicate id ${q.id}`); ids.add(q.id);
      assert.ok(q.q && q.why && bank.topics.includes(q.topic), `${q.id} incomplete`);
      assert.equal(q.options.length, 4, `${q.id} needs 4 options`);
      assert.equal(new Set(q.options).size, 4, `${q.id} repeats an option`);
      assert.ok(q.answer >= 0 && q.answer < 4, `${q.id} answer out of range`);
    }
  }
});

test('a session prefers questions not seen yet, and each draw is a new order', async () => {
  const bank = await loadBank('mathematics');
  const first = drawSet(bank.questions, 20, {});
  assert.equal(new Set(first.map((q) => q.id)).size, 20);
  const seen = Object.fromEntries(first.map((q) => [q.id, 1]));
  const second = drawSet(bank.questions, 20, seen);
  assert.ok(second.every((q) => !seen[q.id]), 'a new set avoids questions already seen');
  const a = drawSet(bank.questions, 20, {}, () => 0.1).map((q) => q.id);
  const b = drawSet(bank.questions, 20, {}).map((q) => q.id);
  assert.notDeepEqual(a, b);
  assert.equal(drawSet(bank.questions, 5000, {}).length, bank.questions.length, 'All means every question');
});

test('sessions are recorded with the questions seen and the best score', async () => {
  await recordBankSession('english', { score: 12, total: 20, secs: 600, ids: ['en1', 'en2'] });
  await recordBankSession('english', { score: 18, total: 20, secs: 500, ids: ['en3'] });
  const p = await loadBankProgress('english');
  assert.equal(seenCount(p), 3);
  assert.equal(bestSession(p).score, 18);
});

test('JAMB opens on its question bank; other paths open on their course', () => {
  assert.equal(pathHome('jamb'), '/learn/bank/jamb');
  assert.equal(pathHome('emails'), '/learn/path/emails');
});
