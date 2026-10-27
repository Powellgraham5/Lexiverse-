// Words the learner looked up, newest first, with when (IndexedDB store "history").
import { put, all } from './db.js';

export const recordLookup = (word, at = Date.now()) => put('history', { id: word.toLowerCase(), at });
export async function recentLookups(limit = 20) {
  return (await all('history')).sort((a, b) => b.at - a.at).slice(0, limit);
}

// "2 min", "3 h", "Yesterday", "Mon", "12 Oct"
export function ago(at, now = Date.now()) {
  const mins = Math.floor((now - at) / 60000);
  if (mins < 1) return 'Now';
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const d = new Date(at), today = new Date(now);
  const sameDay = d.toDateString() === today.toDateString();
  if (sameDay) return `${hours} h`;
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  if (now - at < 6 * 86400000) return d.toLocaleDateString('en-GB', { weekday: 'short' });
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
