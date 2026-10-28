import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PATHS, loadPath, lessonsOf, pathProgress, markLessonDone, loadProgress, focusPath, buildTest, TIMER, recordTest, bestTest } from './paths.js';
import { addNote, allNotes, updateNote, deleteNote, restoreNote, searchNotes, cardToNote } from './notebook.js';
import { checkWriting } from './writing.js';

const open = PATHS.filter((p) => p.load);

test('seven paths are open; Other exams, Meetings and Interviews are coming soon', () => {
  assert.deepEqual(open.map((p) => p.id), ['waec', 'ielts', 'sat', 'essays', 'reports', 'stories', 'emails']);
  assert.equal(focusPath('x', 'waec'), 'waec');
  assert.equal(focusPath('x', 'ielts'), 'ielts');
  assert.equal(focusPath('k', 'meetings'), null);
  assert.equal(focusPath('k', 'emails'), 'emails');
});

test('every lesson and exercise in every open path is well formed', async () => {
  const ids = new Set();
  for (const meta of open) {
    const path = await loadPath(meta.id);
    assert.ok(path.note && path.units.length && path.guide?.length >= 3, `${meta.id} needs a note, a guide and units`);
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
        } else if (x.type === 'listen') {
          assert.ok(x.script && x.options.length >= 2 && x.answer >= 0 && x.answer < x.options.length && x.why, `${where} listen incomplete`);
        } else if (x.type === 'speak') {
          assert.ok(x.points.length && x.checklist.length && x.prep > 0 && x.talk > 0, `${where} speak incomplete`);
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

test('practice test: 10 unique scored questions, the same every time', async () => {
  for (const meta of open) {
    const path = await loadPath(meta.id);
    const t = buildTest(path);
    assert.ok(t.length >= 8 && t.length <= 10, `${meta.id} test has ${t.length}`);
    assert.equal(new Set(t.map((x) => x.key)).size, t.length);
    assert.ok(t.every((x) => ['choice', 'gap', 'error', 'listen'].includes(x.type)));
    assert.deepEqual(buildTest(path).map((x) => x.key), t.map((x) => x.key));
  }
});

test('timer: ticks, pauses, switches off and expires', () => {
  let t = TIMER.start(3);
  t = TIMER.tick(t); assert.equal(t.left, 2);
  t = TIMER.pause(t); t = TIMER.tick(t); assert.equal(t.left, 2, 'paused');
  t = TIMER.pause(t); t = TIMER.tick(TIMER.tick(t)); assert.equal(t.left, 0);
  assert.ok(TIMER.expired(t));
  assert.ok(!TIMER.expired(TIMER.off(t)), 'switched off never expires');
  assert.equal(TIMER.announce({ ...TIMER.start(600), left: 60 }), 'One minute left');
  assert.equal(TIMER.announce({ ...TIMER.start(600), left: 300 }), 'Half the time is left');
});

test('best test score is kept', async () => {
  await recordTest('sat', { score: 6, total: 10, secs: 400 });
  await recordTest('sat', { score: 9, total: 10, secs: 500 });
  await recordTest('sat', { score: 7, total: 10, secs: 300 });
  assert.equal(bestTest(await loadProgress('sat')).score, 9);
});

test('notebook: add, edit, search, delete and restore', async () => {
  const a = await addNote({ title: 'Concord', body: 'Each takes a singular verb.', tag: 'WAEC' });
  await addNote({ title: 'Semicolons', body: 'Join two full sentences.', tag: 'SAT' });
  await updateNote(a.id, { body: 'Each and every take a singular verb.' }, Date.now() + 1000);
  let list = await allNotes();
  assert.equal(list[0].id, a.id, 'last edited first');
  assert.equal(searchNotes(list, 'semicolon').length, 1);
  assert.equal(searchNotes(list, 'waec')[0].id, a.id);
  const gone = await deleteNote(a.id);
  assert.equal((await allNotes()).some((n) => n.id === a.id), false);
  await restoreNote(gone);
  assert.equal((await allNotes()).some((n) => n.id === a.id), true);
  const n = cardToNote({ title: 'T', body: 'B', examples: [{ text: 'good one', good: true }, { text: 'bad one', good: false }] }, 'Essays');
  assert.match(n.body, /✓ good one/); assert.match(n.body, /✗ bad one/);
});

test('writing formats: every format has a layout and rules; exam groups carry the official-guide note', async () => {
  const { FORMAT_GROUPS } = await import('../content/formats.js');
  const ids = new Set();
  for (const g of FORMAT_GROUPS) {
    if (['waec', 'ielts', 'sat'].includes(g.id)) assert.match(g.note, /official guide/);
    for (const f of g.formats) {
      assert.ok(!ids.has(f.id), `duplicate format ${f.id}`); ids.add(f.id);
      assert.ok(f.title && f.use && f.template.length >= 3 && f.rules.length >= 2 && f.mistake, `${f.id} incomplete`);
      assert.ok(!JSON.stringify(f).includes('—'), `${f.id} has an em dash`);
      if (f.practice) {
        const path = await loadPath(f.practice[0]);
        assert.ok(path && lessonsOf(path).some((l) => l.id === f.practice[1]), `${f.id} practice link is broken`);
      }
    }
  }
});
