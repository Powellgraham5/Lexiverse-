import 'fake-indexeddb/auto';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tick, loadTicks, ticksToday, reminderIcs, niceTime } from './plan.js';
import { challengeUrl, readChallenge, challengeText, whatsappUrl } from './challenge.js';
import { recordBankSession, loadBankProgress, weakTopics, scoreHistory } from './bank.js';

const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };

test('plan ticks count per task per day and keep two weeks', () => {
  const s = mem();
  tick('lesson', s, '2026-11-01'); tick('lesson', s, '2026-11-01'); tick('mix', s, '2026-11-01');
  assert.deepEqual(ticksToday(s, '2026-11-01'), { lesson: 2, mix: 1 });
  assert.deepEqual(ticksToday(s, '2026-11-02'), {});
  for (let d = 1; d <= 20; d++) tick('bank', s, `2026-12-${String(d).padStart(2, '0')}`);
  assert.equal(Object.keys(loadTicks(s)).length, 14);
});

test('the daily reminder is a valid repeating calendar event with an alert', () => {
  const ics = reminderIcs('18:30', 'https://example.test/', new Date(2026, 10, 22, 9, 0));
  assert.match(ics, /BEGIN:VCALENDAR/);
  assert.match(ics, /DTSTART:20261122T183000/);
  assert.match(ics, /RRULE:FREQ=DAILY/);
  assert.match(ics, /BEGIN:VALARM/);
  assert.ok(ics.includes('\r\n'));
  // A time already passed today starts tomorrow.
  assert.match(reminderIcs('07:00', 'https://example.test/', new Date(2026, 10, 22, 9, 0)), /DTSTART:20261123T070000/);
  assert.equal(niceTime('18:05'), '6:05 pm');
  assert.equal(niceTime('00:30'), '12:30 am');
});

test('challenge links round-trip and reject junk', () => {
  const url = challengeUrl('https://x.test', { subject: 'biology', ids: ['bi3', 'bi17'], score: 1, total: 2, name: ' Ada ' });
  const q = Object.fromEntries(new URL(url).searchParams);
  const c = readChallenge(q);
  assert.deepEqual(c.ids, ['bi3', 'bi17']);
  assert.equal(c.score, 1); assert.equal(c.total, 2); assert.equal(c.name, 'Ada');
  assert.equal(readChallenge({}), null);
  assert.equal(readChallenge({ ch: '<script>' }), null);
  assert.equal(readChallenge({ ch: 'bi1', n: '<b>x</b>' }).name, 'bx/b');
  const mix = readChallenge(Object.fromEntries(new URL(challengeUrl('https://x.test', { subject: 'mix', ids: ['en1'], score: 0, total: 1, subs: ['english', 'physics'] })).searchParams));
  assert.deepEqual(mix.subs, ['english', 'physics']);
  assert.match(whatsappUrl(challengeText('Biology', 1, 2, url)), /^https:\/\/wa\.me\/\?text=I%20scored%201%2F2/);
});

test('bank sessions tally topics, find weak ones and keep a score history', async () => {
  await recordBankSession('physics', { score: 1, total: 5, secs: 60, ids: ['ph1'], results: [
    { topic: 'Waves', ok: false }, { topic: 'Waves', ok: false }, { topic: 'Waves', ok: true }, { topic: 'Waves', ok: false }, { topic: 'Motion', ok: true }
  ] }, 1000);
  await recordBankSession('physics', { score: 4, total: 5, secs: 60, ids: ['ph2'], results: [
    { topic: 'Motion', ok: true }, { topic: 'Motion', ok: true }, { topic: 'Motion', ok: true }, { topic: 'Optics', ok: false }
  ] }, 2000);
  const p = await loadBankProgress('physics');
  assert.deepEqual(p.topics.Waves, { right: 1, total: 4 });
  const weak = weakTopics(p);
  assert.equal(weak.length, 1);
  assert.equal(weak[0].topic, 'Waves');
  assert.deepEqual(scoreHistory(p).map((h) => h.pct), [20, 80]);
});
