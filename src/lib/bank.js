import { local } from './store.js';
// JAMB practice question banks: one lazily loaded file per subject, drawn at random each session.
// Progress lives in IndexedDB kv under "bank:jamb:<subject>" as { seen: { id: at }, sessions: [...] }.
import { get, put } from './db.js';

export const BANK_NOTE = 'Practice questions written in the style of the JAMB UTME. They are not official past questions. Check the current JAMB syllabus for your year.';

export const JAMB_SUBJECTS = [
  { id: 'english', title: 'Use of English', load: () => import('../content/banks/jamb/english.js') },
  { id: 'mathematics', title: 'Mathematics', load: () => import('../content/banks/jamb/mathematics.js') },
  { id: 'biology', title: 'Biology', load: () => import('../content/banks/jamb/biology.js') },
  { id: 'chemistry', title: 'Chemistry', load: () => import('../content/banks/jamb/chemistry.js') },
  { id: 'physics', title: 'Physics', load: () => import('../content/banks/jamb/physics.js') },
  { id: 'economics', title: 'Economics', load: () => import('../content/banks/jamb/economics.js') },
  { id: 'government', title: 'Government', load: () => import('../content/banks/jamb/government.js') },
  { id: 'literature', title: 'Literature in English', load: () => import('../content/banks/jamb/literature.js') },
  { id: 'crs', title: 'Christian Religious Studies', load: () => import('../content/banks/jamb/crs.js') },
  { id: 'irs', title: 'Islamic Religious Studies', load: () => import('../content/banks/jamb/irs.js') }
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

// results: [{ topic, ok }] for each question, so weak topics can be spotted across sessions.
export async function recordBankSession(id, { score, total, secs, ids = [], results = [] }, now = Date.now()) {
  const p = await loadBankProgress(id);
  const seen = { ...p.seen };
  for (const q of ids) seen[q] = now;
  const topics = { ...(p.topics || {}) };
  for (const r of results) {
    if (!r.topic) continue;
    const t = topics[r.topic] || { right: 0, total: 0 };
    topics[r.topic] = { right: t.right + (r.ok ? 1 : 0), total: t.total + 1 };
  }
  const next = { seen, topics, sessions: [...(p.sessions || []), { score, total, secs, at: now }].slice(-30) };
  await put('kv', next, key(id));
  return next;
}

export const bestSession = (p) => (p.sessions || []).reduce((b, s) => (!b || s.score / s.total > b.score / b.total ? s : b), null);
export const seenCount = (p) => Object.keys(p.seen || {}).length;

// The learner's four UTME subjects (English is compulsory), kept on this device.
const MINE = 'lx-jamb-subjects';
export const DEFAULT_SUBJECTS = ['english', 'mathematics', 'biology', 'chemistry'];
export function mySubjects(storage = local()) {
  try {
    const ids = JSON.parse(storage?.getItem(MINE) || 'null');
    return Array.isArray(ids) && ids.length ? ['english', ...ids.filter((id) => id !== 'english' && subjectById(id))].slice(0, 4) : DEFAULT_SUBJECTS;
  } catch { return DEFAULT_SUBJECTS; }
}
export function saveMySubjects(ids, storage = local()) {
  try { storage?.setItem(MINE, JSON.stringify(ids)); } catch { /* private mode: defaults next time */ }
}

// A mixed set across several subjects: each question keeps its subject so progress is saved per subject.
export async function loadMix(ids) {
  const banks = (await Promise.all(ids.map(loadBank))).filter(Boolean);
  return {
    id: 'mix', title: 'Mixed practice', topics: banks.map((b) => b.title),
    questions: banks.flatMap((b) => b.questions.map((q) => ({ ...q, subject: b.id, topic: b.title })))
  };
}

// Draws n questions spread evenly across the subjects in a mixed bank.
export function drawMix(bank, n, seenBySubject = {}, rand = Math.random) {
  const ids = [...new Set(bank.questions.map((q) => q.subject))];
  const per = Math.ceil(n / ids.length);
  const picked = ids.flatMap((id) => drawSet(bank.questions.filter((q) => q.subject === id), per, seenBySubject[id] || {}, rand));
  return drawSet(picked, n, {}, rand);
}

// Topics answered at least 4 times with under 60% right, worst first.
export function weakTopics(p, min = 4, below = 0.6) {
  return Object.entries(p?.topics || {})
    .filter(([, t]) => t.total >= min && t.right / t.total < below)
    .map(([topic, t]) => ({ topic, right: t.right, total: t.total, rate: t.right / t.total }))
    .sort((a, b) => a.rate - b.rate || b.total - a.total);
}

// Session scores as percentages, oldest first, for the score history chart.
export const scoreHistory = (p, n = 10) => (p?.sessions || []).slice(-n).map((s) => ({ at: s.at, score: s.score, total: s.total, pct: s.total ? Math.round((100 * s.score) / s.total) : 0 }));
