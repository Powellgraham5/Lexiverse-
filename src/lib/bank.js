// JAMB practice question banks: one lazily loaded file per subject, drawn at random each session.
// Progress lives in IndexedDB kv under "bank:jamb:<subject>" as { seen: { id: at }, sessions: [...] }.
import { get, put } from './db.js';

export const BANK_NOTE = 'Practice questions written in the style of the JAMB UTME. They are not official past questions. Check the current JAMB syllabus for your year.';

export const JAMB_SUBJECTS = [
  { id: 'english', title: 'Use of English', load: () => import('../content/banks/jamb/english.js') },
  { id: 'mathematics', title: 'Mathematics', load: () => import('../content/banks/jamb/mathematics.js') },
  { id: 'biology', title: 'Biology' },
  { id: 'chemistry', title: 'Chemistry' },
  { id: 'physics', title: 'Physics' },
  { id: 'economics', title: 'Economics' },
  { id: 'government', title: 'Government' },
  { id: 'literature', title: 'Literature in English' },
  { id: 'crs', title: 'Christian Religious Studies' },
  { id: 'irs', title: 'Islamic Religious Studies' }
];

export const subjectById = (id) => JAMB_SUBJECTS.find((s) => s.id === id) || null;

export async function loadBank(id) {
  const s = subjectById(id);
  if (!s?.load) return null;
  return { ...s, ...(await s.load()).default };
}

const key = (id) => `bank:jamb:${id}`;
export async function loadBankProgress(id) {
  return (await get('kv', key(id)).catch(() => null)) || { seen: {}, sessions: [] };
}

// n questions: ones never seen first, then the longest ago, ties broken at random; shown in a random order.
export function drawSet(questions, n, seen = {}, rand = Math.random) {
  const ranked = questions.map((q) => ({ q, at: seen[q.id] || 0, r: rand() })).sort((a, b) => a.at - b.at || a.r - b.r);
  return ranked.slice(0, Math.min(n, questions.length)).map((x) => ({ q: x.q, r: rand() })).sort((a, b) => a.r - b.r).map((x) => x.q);
}

export async function recordBankSession(id, { score, total, secs, ids = [] }, now = Date.now()) {
  const p = await loadBankProgress(id);
  const seen = { ...p.seen };
  for (const q of ids) seen[q] = now;
  const next = { seen, sessions: [...(p.sessions || []), { score, total, secs, at: now }].slice(-30) };
  await put('kv', next, key(id));
  return next;
}

export const bestSession = (p) => (p.sessions || []).reduce((b, s) => (!b || s.score / s.total > b.score / b.total ? s : b), null);
export const seenCount = (p) => Object.keys(p.seen || {}).length;
