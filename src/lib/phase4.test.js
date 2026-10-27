import 'fake-indexeddb/auto';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createList, updateList, deleteList, restoreList, addToList, removeFromList, wordsInList, allLists, listStats, statusOf, toCSV } from './lists.js';
import { saveWord, getRecord } from './saved.js';
import { recordLookup, recentLookups, ago } from './history.js';
import { computeProgress, archiveMonth } from './progress.js';
import { recordActivity, loadActivity } from './streak.js';
import { clear, resetDB } from './db.js';

const DAILY = JSON.parse(readFileSync(new URL('../../public/data/daily.json', import.meta.url))).words;
const DAY = 86400000;
beforeEach(async () => { resetDB(); for (const s of ['lists', 'words', 'history']) await clear(s); });

test('create, rename and list lists; names are trimmed and required', async () => {
  const a = await createList({ name: '  Exam   prep ' });
  assert.equal(a.name, 'Exam prep');
  await assert.rejects(createList({ name: '   ' }));
  const b = await updateList(a.id, { name: 'Exam preparation' });
  assert.equal(b.name, 'Exam preparation');
  await assert.rejects(updateList(a.id, { name: '' }));
  assert.equal((await allLists()).length, 1);
  assert.equal((await createList({ name: 'x'.repeat(60) })).name.length, 40);
});

test('words join and leave lists; deleting a list keeps the words; undo restores it', async () => {
  const l = await createList({ name: 'Writing' });
  await addToList('eloquent', l.id);
  await addToList('lucid', l.id);
  assert.deepEqual((await wordsInList(l.id)).map((w) => w.id).sort(), ['eloquent', 'lucid']);
  await removeFromList('lucid', l.id);
  assert.deepEqual((await wordsInList(l.id)).map((w) => w.id), ['eloquent']);
  assert.ok((await getRecord('lucid')).saved, 'still saved after leaving the list');
  const snap = await deleteList(l.id);
  assert.equal((await allLists()).length, 0);
  assert.ok((await getRecord('eloquent')).saved);
  await restoreList(snap);
  assert.deepEqual((await wordsInList(l.id)).map((w) => w.id), ['eloquent']);
});

test('"saved" means every saved word', async () => {
  await saveWord('one');
  const l = await createList({ name: 'L' });
  await addToList('two', l.id);
  assert.deepEqual((await wordsInList('saved')).map((w) => w.id).sort(), ['one', 'two']);
});

test('list stats and statuses', () => {
  const now = 100 * DAY;
  const reviews = [
    { id: 'a', reps: 3, interval: 30, due: now + DAY },
    { id: 'b', reps: 1, interval: 7, due: now - 1 },
    { id: 'c', reps: 1, interval: 7, due: now + DAY }
  ];
  assert.deepEqual(listStats(['a', 'b', 'c', 'd'], reviews, now), { count: 4, known: 25, due: 1, fresh: 1 });
  assert.equal(statusOf(reviews[0], now), 'known');
  assert.equal(statusOf(reviews[1], now), 'due');
  assert.equal(statusOf(reviews[2], now), 'learning');
  assert.equal(statusOf(undefined, now), 'new');
});

test('CSV export escapes quotes and commas', () => {
  assert.equal(toCSV([{ word: 'a', def: 'say "hi", wave', status: 'new' }]), 'word,meaning,status\n"a","say ""hi"", wave","new"');
});

test('lookups come back newest first, one per word', async () => {
  await recordLookup('serendipity', 1000);
  await recordLookup('resilient', 2000);
  await recordLookup('Serendipity', 3000);
  assert.deepEqual((await recentLookups()).map((x) => x.id), ['serendipity', 'resilient']);
});

test('ago() reads naturally', () => {
  const now = new Date(2026, 9, 27, 12).getTime();
  assert.equal(ago(now - 2 * 60000, now), '2 min');
  assert.equal(ago(now - 3 * 3600000, now), '3 h');
  assert.equal(ago(now - DAY, now), 'Yesterday');
});

test('activity records quizzes and minutes per day', () => {
  const m = new Map(); const s = { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
  recordActivity('quiz', s, '2026-10-27', 2.5);
  recordActivity('quiz', s, '2026-10-27', 1);
  const a = loadActivity(s);
  assert.equal(a.quizzes['2026-10-27'], 2);
  assert.equal(a.minutes['2026-10-27'], 3.5);
});

test('progress: words, recall, quizzes this week, minutes and constellations', () => {
  const now = new Date(2026, 9, 27, 12).getTime();
  const reviews = [{ id: 'a', reps: 2, last: 'got' }, { id: 'b', reps: 1, last: 'forgot' }, { id: 'c', reps: 0, last: null }];
  const p = computeProgress({ reviews, saved: [{ id: 'a' }, { id: 'z' }], lists: [{}, {}], activity: { days: ['2026-10-26', '2026-10-27'], quizzes: { '2026-10-27': 2, '2026-09-01': 1 }, minutes: { '2026-10-27': 4 } }, now });
  assert.equal(p.words, 4);
  assert.equal(p.worlds, 2);
  assert.equal(p.recall, 50);
  assert.equal(p.quizzes, 3);
  assert.equal(p.quizzesThisWeek, 2);
  assert.equal(p.streak, 2);
  assert.equal(p.minutes.length, 7);
  assert.equal(p.minutes[6].value, 4);
  assert.ok(p.minutes[6].today);
  assert.deepEqual(p.constellations.map((c) => c.done), [true, false, false, false]);
});

test('archive marks learned and missed days since the learner started', () => {
  const now = new Date(2026, 9, 27, 12).getTime();
  const profile = { level: 2, goal: 'e', startedAt: new Date(2026, 9, 20).getTime() };
  const first = archiveMonth({ daily: DAILY, profile, reviews: [], year: 2026, month: 9, now }).find((d) => d.day === 21);
  const days = archiveMonth({ daily: DAILY, profile, reviews: [{ id: first.word }], year: 2026, month: 9, now });
  assert.equal(days.length, 31);
  assert.equal(days.find((d) => d.day === 19).state, 'before');
  assert.equal(days.find((d) => d.day === 21).state, 'learned');
  assert.equal(days.find((d) => d.day === 22).state, 'missed');
  assert.ok(days.find((d) => d.day === 27).today);
  assert.equal(days.find((d) => d.day === 28).state, 'future');
});

test('pickWords from a list only practises that list, due words first', async () => {
  const { pickWords } = await import('./practice.js');
  const now = 1_000_000;
  const reviews = [{ id: 'b', due: now - 10, reps: 1 }, { id: 'z', due: now - 50, reps: 1 }];
  const daily = [{ w: 'fresh', l: 2, goals: ['e'] }];
  const ids = pickWords({ reviews, saved: [], daily, profile: { level: 2 }, from: 'list:l1', listWords: ['a', 'b', 'c'], size: 8, now });
  assert.deepEqual(ids, ['b', 'a', 'c']);
});
