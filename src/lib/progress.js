// The numbers behind "Your universe": words, worlds (lists), streak, recall, quizzes,
// minutes this week, constellations (milestones) and the word-of-the-day archive.
import { currentStreak } from './streak.js';
import { dayKey, wordOfTheDay } from './daily.js';

const lastDays = (n, now) => Array.from({ length: n }, (_, k) => { const d = new Date(now); d.setDate(d.getDate() - (n - 1 - k)); return d; });

export function computeProgress({ reviews, saved, lists, activity, now = Date.now() }) {
  const words = new Set([...reviews.map((r) => r.id), ...saved.map((s) => s.id)]).size;
  const reviewed = reviews.filter((r) => r.reps > 0);
  const remembered = reviewed.filter((r) => r.last !== 'forgot').length;
  const week = lastDays(7, now);
  const weekKeys = new Set(week.map(dayKey));
  const quizzes = Object.values(activity.quizzes || {}).reduce((a, b) => a + b, 0);
  const quizzesThisWeek = Object.entries(activity.quizzes || {}).filter(([k]) => weekKeys.has(k)).reduce((a, [, n]) => a + n, 0);
  const streak = currentStreak(activity.days || [], dayKey(new Date(now)));
  const minutes = week.map((d) => ({ key: dayKey(d), label: d.toLocaleDateString('en-GB', { weekday: 'narrow' }), today: dayKey(d) === dayKey(new Date(now)), value: activity.minutes?.[dayKey(d)] || 0 }));
  return {
    words,
    worlds: lists.length,
    streak,
    recall: reviewed.length ? Math.round((remembered / reviewed.length) * 100) : null,
    quizzes,
    quizzesThisWeek,
    minutes,
    constellations: [
      { id: 'first-quiz', label: 'First quiz', done: quizzes >= 1, progress: Math.min(quizzes, 1), goal: 1 },
      { id: '10-words', label: '10 words', done: words >= 10, progress: Math.min(words, 10), goal: 10 },
      { id: '7-day', label: '7-day streak', done: streak >= 7, progress: Math.min(streak, 7), goal: 7 },
      { id: '100-words', label: '100 words', done: words >= 100, progress: Math.min(words, 100), goal: 100 }
    ]
  };
}

// Past words of the day for one month: learned (it's in reviews) or missed. Days before the
// learner started, and future days, are left out.
export function archiveMonth({ daily, profile, reviews, year, month, now = Date.now() }) {
  const known = new Set(reviews.map((r) => r.id));
  const start = profile?.startedAt ? new Date(profile.startedAt) : new Date(now);
  start.setHours(0, 0, 0, 0);
  const days = new Date(year, month + 1, 0).getDate();
  const out = [];
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d, 12);
    const key = dayKey(date);
    if (date > new Date(now) && key !== dayKey(new Date(now))) { out.push({ day: d, key, state: 'future' }); continue; }
    if (date < start) { out.push({ day: d, key, state: 'before' }); continue; }
    const w = wordOfTheDay(daily, { level: profile?.level || 2, goal: profile?.goal || 'e', day: key });
    out.push({ day: d, key, word: w.w, state: known.has(w.w) ? 'learned' : 'missed', today: key === dayKey(new Date(now)) });
  }
  return out;
}
