import { local } from './store.js';
import { dayKey } from './daily.js';

// The daily plan: three small tasks a day, ticked off as the learner does them.
// Each finished activity calls tick(task); the plan reads today's counts. Kept for two weeks.
const KEY = 'lx-plan';

export function loadTicks(storage = local()) {
  try { return JSON.parse(storage?.getItem(KEY) || '{}'); } catch { return {}; }
}
export function tick(task, storage = local(), today = dayKey()) {
  const all = loadTicks(storage);
  const day = { ...(all[today] || {}) };
  day[task] = (day[task] || 0) + 1;
  const keep = Object.keys(all).sort().slice(-13);
  const next = Object.fromEntries([...keep.map((k) => [k, all[k]]), [today, day]]);
  try { storage?.setItem(KEY, JSON.stringify(next)); } catch { /* storage blocked: the plan just won't tick */ }
  return next;
}
export const ticksToday = (storage = local(), today = dayKey()) => loadTicks(storage)[today] || {};

// Reminders: a free daily calendar event (.ics) with an alert, which phones and laptops all understand.
// No server and no account: the learner's own calendar does the reminding.
const REMIND = 'lx-reminder';
export function loadReminder(storage = local()) {
  try { return storage?.getItem(REMIND) || null; } catch { return null; }
}
export function saveReminder(time, storage = local()) {
  try { time ? storage?.setItem(REMIND, time) : storage?.removeItem(REMIND); } catch { /* ignore */ }
}

const pad = (n) => String(n).padStart(2, '0');
const stamp = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

// time is "HH:MM" in the learner's local time. The event starts on the next occurrence and repeats daily.
export function reminderIcs(time, url, now = new Date()) {
  const [h, m] = time.split(':').map(Number);
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
  if (start <= now) start.setDate(start.getDate() + 1);
  const local = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(h)}${pad(m)}00`;
  const end = new Date(start.getTime() + 10 * 60000);
  const localEnd = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`;
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lexiverse//Daily plan//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:lexiverse-daily-${local}@lexiverse`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${local}`,
    `DTEND:${localEnd}`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:Lexiverse: today\'s plan',
    `DESCRIPTION:Three small tasks keep your streak going. Open ${url}`,
    `URL:${url}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Time for your Lexiverse plan', 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', ''
  ].join('\r\n');
}

export function downloadReminder(time, url) {
  const blob = new Blob([reminderIcs(time, url)], { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lexiverse-reminder.ics';
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// Shows "6:00 pm" style times.
export function niceTime(time) {
  const [h, m] = time.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? 'am' : 'pm'}`;
}
