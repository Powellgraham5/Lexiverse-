import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PATHS, loadPath, lessonsOf, pathProgress, markLessonDone, loadProgress, focusPath } from './paths.js';
import { checkWriting } from './writing.js';

const open = PATHS.filter((p) => p.load);

test('round 1 opens WAEC, Essays and Emails; the rest are coming soon', () => {
  assert.deepEqual(open.map((p) => p.id), ['waec', 'essays', 'emails']);
  assert.equal(focusPath('x', 'waec'), 'waec');
  assert.equal(focusPath('x', 'ielts'), null);
  assert.equal(focusPath('k', 'emails'), 'emails');
});

test('every lesson and exercise in every open path is well formed', async () => {
  const ids = new Set();
  for (const meta of open) {
    const path = await loadPath(meta.id);
    assert.ok(path.note && path.units.length, `${meta.id} needs a note and units`);
    const text = JSON.stringify(path);
    assert.ok(!text.includes('—'), `${meta.id} contains an em dash`);
    for (const l of lessonsOf(path)) {
      assert.ok(!ids.has(l.id), `duplicate lesson id ${l.id}`); ids.add(l.id);
      assert.ok(l.title && l.minutes > 0 && l.cards.length && l.exercises.length, `${l.id} incomplete`);
      for (const [i, x] of l.exercises.entries()) {
        const where = `${l.id} #${i + 1}`;
        assert.ok(x.q, `${where} has no question`);
        if (x.type === 'choice' || x.type === 'gap') {
          assert.ok(x.options.length >= 2 && x.answer >= 0 && x.answer < x.options.length, `${where} answer out of range`);
          assert.equal(new Set(x.options).size, x.options.length, `${where} repeats an option`);
          assert.ok(x.why, `${where} has no explanation`);
          if (x.type === 'gap') assert.ok(x.q.includes('___'), `${where} has no gap`);
        } else if (x.type === 'error') {
          assert.equal(x.parts.length, 4, `${where} needs 4 parts`);
          assert.ok(x.answer >= 0 && x.answer < 4 && x.fix && x.why, where);
        } else if (x.type === 'order') {
          assert.ok(x.parts.length >= 3 && new Set(x.parts).size === x.parts.length && x.why, where);
        } else if (x.type === 'write') {
          assert.ok(x.kind && x.minWords < x.maxWords && x.checklist.length && x.model, where);
        } else assert.fail(`${where} unknown type ${x.type}`);
      }
    }
  }
});

test('every model answer passes its own automatic checks', async () => {
  for (const meta of open) {
    for (const l of lessonsOf(await loadPath(meta.id))) {
      for (const x of l.exercises.filter((e) => e.type === 'write')) {
        const failed = checkWriting(x.model, x).filter((c) => !c.ok);
        assert.deepEqual(failed, [], `${l.id} model answer fails: ${failed.map((f) => f.label).join(', ')}`);
      }
    }
  }
});

test('progress: lessons are marked done and the next lesson moves on', async () => {
  const path = await loadPath('emails');
  const [first, second] = lessonsOf(path);
  let p = pathProgress(path, await loadProgress('emails'));
  assert.equal(p.done, 0); assert.equal(p.next.id, first.id);
  await markLessonDone('emails', first.id, { score: 3, total: 4 });
  p = pathProgress(path, await loadProgress('emails'));
  assert.equal(p.done, 1); assert.equal(p.next.id, second.id);
  assert.ok(p.percent > 0 && p.percent < 100);
});

test('writing checks: length, paragraphs, greeting, closing, subject and formal style', () => {
  const by = (list, label) => list.find((c) => c.label.includes(label));
  const short = checkWriting('Too short.', { minWords: 20, kind: 'paragraph' });
  assert.equal(short[0].ok, false);
  const email = checkWriting('Hello team, the report is ready.', { kind: 'email', subject: true });
  assert.equal(by(email, 'Closing').ok, false);
  assert.equal(by(email, 'Subject').ok, false);
  const fixed = checkWriting('Subject: Report\n\nHello team, the report is ready.\n\nBest regards,\nAda', { kind: 'email', subject: true });
  assert.equal(by(fixed, 'Closing').ok, true);
  assert.equal(by(fixed, 'Subject').ok, true);
  const formal = checkWriting('Dear Sir,\n\nI can’t attend.\n\nYours faithfully,\nAda', { kind: 'letter-formal' });
  assert.equal(by(formal, 'Formal').ok, false);
  const possessive = checkWriting('Dear Sir,\n\nThe school’s library is small.\n\nYours faithfully,\nAda', { kind: 'letter-formal' });
  assert.equal(by(possessive, 'Formal'), undefined, 'a possessive is not a contraction');
  const essay = checkWriting('One idea only in one paragraph.', { kind: 'essay' });
  assert.equal(by(essay, 'paragraph').ok, false);
  const repeat = checkWriting('good good good good good good', {});
  assert.ok(by(repeat, 'Repeated'));
});
