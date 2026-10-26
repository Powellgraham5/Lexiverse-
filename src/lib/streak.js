// Streaks: a day counts when the learner finishes the daily challenge or a review.
// Days are local calendar dates (YYYY-MM-DD) so the streak follows the learner's clock.
import { dayKey } from './daily.js';

const KEY = 'lx-activity';

const prevDay = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d - 1));
};

// Consecutive active days ending today, or ending yesterday if today isn't done yet.
export function currentStreak(days, today = dayKey()) {
  const set = new Set(days);
  let day = set.has(today) ? today : prevDay(today);
  let n = 0;
  while (set.has(day)) { n++; day = prevDay(day); }
  return n;
}

export function loadActivity(storage = globalThis.localStorage) {
  try { return JSON.parse(storage?.getItem(KEY) || '{}'); } catch { return {}; }
}

// activity = { days: ['2026-10-26', ...], challenge: { '2026-10-26': true } }
export function recordActivity(kind, storage = globalThis.localStorage, today = dayKey()) {
  const a = loadActivity(storage);
  a.days = [...new Set([...(a.days || []), today])].slice(-400);
  if (kind === 'challenge') a.challenge = { ...(a.challenge || {}), [today]: true };
  try { storage?.setItem(KEY, JSON.stringify(a)); } catch { /* storage full or blocked */ }
  return a;
}

export const challengeDone = (a, today = dayKey()) => Boolean(a.challenge?.[today]);
