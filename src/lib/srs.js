// Spaced repetition: when each word comes back for review.
// Forgot -> later today, Almost -> in about 2 days, Got it -> in 7 days, then intervals grow by "ease".
import { get, put, all } from './db.js';

const MIN = 60 * 1000;
const DAY = 24 * 60 * MIN;
const EASE_START = 2.5;
const EASE_MIN = 1.3;

export const GRADES = ['forgot', 'almost', 'got'];

export function fresh(id, now = Date.now()) {
  return { id, interval: 0, ease: EASE_START, due: now, reps: 0, lapses: 0, last: null, seenAt: now };
}

// Returns the new state after a grade. Intervals are in days.
export function grade(state, g, now = Date.now()) {
  const s = { ...state, reps: state.reps + 1, last: g, reviewedAt: now };
  if (g === 'forgot') {
    s.interval = 0;
    s.ease = Math.max(EASE_MIN, s.ease - 0.2);
    s.lapses = state.lapses + 1;
    s.due = now + 10 * MIN;
  } else if (g === 'almost') {
    s.interval = Math.max(2, Math.round(state.interval * 1.2));
    s.ease = Math.max(EASE_MIN, s.ease - 0.15);
    s.due = now + s.interval * DAY;
  } else {
    s.interval = state.interval === 0 ? 7 : Math.round(state.interval * state.ease);
    s.due = now + s.interval * DAY;
  }
  return s;
}

// Human words for when a grade brings the word back ("later today", "in 2 days").
export function comesBack(state, g) {
  const next = grade(state, g, 0);
  if (next.due < DAY) return 'later today';
  const days = Math.round(next.due / DAY);
  return days === 1 ? 'tomorrow' : `in ${days} days`;
}

// A game result to a grade: right first time = got; right after a miss or hint = almost; wrong = forgot.
export const gradeFor = ({ correct, helped = false }) => (!correct ? 'forgot' : helped ? 'almost' : 'got');

// "Known" once a word has been got right with an interval of 21+ days.
export const isKnown = (s) => s.interval >= 21;

const startOfDay = (now) => { const d = new Date(now); d.setHours(0, 0, 0, 0); return d.getTime(); };

export async function loadReviews() { return all('reviews'); }
export async function getReview(id) { return get('reviews', id); }
export async function saveReview(state) { await put('reviews', state); return state; }

export async function record(id, g, now = Date.now()) {
  const prev = (await getReview(id)) || fresh(id, now);
  return saveReview(grade(prev, g, now));
}

export function summary(reviews, now = Date.now()) {
  const today = startOfDay(now);
  const due = reviews.filter((r) => r.due <= now);
  const upcoming = reviews.filter((r) => r.due > now).sort((a, b) => a.due - b.due);
  return {
    due: due.length,
    doneToday: reviews.filter((r) => r.reviewedAt >= today).length,
    known: reviews.filter(isKnown).length,
    nextDue: upcoming[0]?.due ?? null
  };
}
