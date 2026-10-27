// Learning paths: which exist, how to load them, and the learner's progress through them.
// Progress lives in IndexedDB kv under "path:<id>" so it never touches word or review data.
import { get, put } from './db.js';

// Every sub-path from the four goals. `load` is set only for paths that have lessons.
export const PATHS = [
  { id: 'waec', goal: 'x', focus: 'waec', title: 'WAEC / NECO English', sub: 'Lexis, comprehension, summary, essays and oral English', load: () => import('../content/paths/waec.js') },
  { id: 'ielts', goal: 'x', focus: 'ielts', title: 'IELTS', sub: 'Reading, writing, listening and speaking' },
  { id: 'sat', goal: 'x', focus: 'sat', title: 'SAT', sub: 'Reading and Writing: grammar and words in context' },
  { id: 'other-exams', goal: 'x', focus: 'other', title: 'Other exams', sub: 'JAMB, TOEFL and more' },
  { id: 'essays', goal: 'w', focus: 'essays', title: 'Essays', sub: 'Structure, essay types and strong sentences', load: () => import('../content/paths/essays.js') },
  { id: 'reports', goal: 'w', focus: 'reports', title: 'Reports', sub: 'Formal structure and clear, professional language' },
  { id: 'stories', goal: 'w', focus: 'stories', title: 'Stories', sub: 'Characters, plot, dialogue and description' },
  { id: 'emails', goal: 'k', focus: 'emails', title: 'Emails', sub: 'Clear, polite and professional emails', load: () => import('../content/paths/emails.js') },
  { id: 'meetings', goal: 'k', focus: 'meetings', title: 'Meetings', sub: 'Opinions, questions, agreeing and disagreeing' },
  { id: 'interviews', goal: 'k', focus: 'interviews', title: 'Interviews', sub: 'Introduce yourself and answer with confidence' }
];

export const pathById = (id) => PATHS.find((p) => p.id === id) || null;
export const isOpen = (p) => Boolean(p?.load);

export async function loadPath(id) {
  const p = pathById(id);
  if (!isOpen(p)) return null;
  return { ...p, ...(await p.load()).default };
}

// The path an onboarding focus points to (only paths that are open).
export function focusPath(goal, focus) {
  const p = PATHS.find((x) => x.goal === goal && x.focus === focus);
  return isOpen(p) ? p.id : null;
}

export const lessonsOf = (path) => path.units.flatMap((u) => u.lessons);

export async function loadProgress(id) {
  return (await get('kv', `path:${id}`).catch(() => null)) || { done: {} };
}

export async function markLessonDone(id, lessonId, { score = 0, total = 0 } = {}, now = Date.now()) {
  const p = await loadProgress(id);
  p.done = { ...p.done, [lessonId]: { score, total, at: now } };
  await put('kv', p, `path:${id}`);
  return p;
}

// { done, total, percent, next } for a loaded path and its progress record.
export function pathProgress(path, progress) {
  const all = lessonsOf(path);
  const done = all.filter((l) => progress.done[l.id]).length;
  return {
    done,
    total: all.length,
    percent: all.length ? Math.round((done / all.length) * 100) : 0,
    next: all.find((l) => !progress.done[l.id]) || null
  };
}
