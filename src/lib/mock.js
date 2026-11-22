import { local } from './store.js';
import { get, put } from './db.js';
import { drawSet } from './bank.js';

// A full JAMB UTME mock: Use of English plus three subjects, answered like the computer-based test.
// Answers are only marked when the paper is submitted. Each subject is scored out of 100 (total 400).
export const MOCK_FORMATS = {
  full: { id: 'full', label: 'Full mock', english: 60, other: 40, secs: 2 * 60 * 60 },
  short: { id: 'short', label: 'Short mock', english: 20, other: 15, secs: 45 * 60 }
};
export const countFor = (format, subject) => (subject === 'english' ? format.english : format.other);
export const mockTotal = (format, subjects) => subjects.reduce((n, s) => n + countFor(format, s), 0);

// banks: [{ id, title, questions }] in paper order (English first). Never-seen questions come first.
export function buildMock(banks, formatId = 'full', seenBySubject = {}, rand = Math.random) {
  const format = MOCK_FORMATS[formatId] || MOCK_FORMATS.full;
  const ordered = [...banks].sort((a, b) => (a.id === 'english' ? -1 : b.id === 'english' ? 1 : 0));
  return ordered.map((b) => ({
    id: b.id, title: b.title,
    ids: drawSet(b.questions, countFor(format, b.id), seenBySubject[b.id] || {}, rand).map((q) => q.id)
  }));
}

// answers: { questionId: chosen option index }. A question's right answer is q.answer.
export function scoreMock(sections, byId, answers) {
  const subjects = sections.map((s) => {
    const right = s.ids.filter((id) => byId[id] && answers[id] === byId[id].answer).length;
    const answered = s.ids.filter((id) => answers[id] !== undefined).length;
    return { id: s.id, title: s.title, right, answered, total: s.ids.length, score: s.ids.length ? Math.round((100 * right) / s.ids.length) : 0 };
  });
  return { subjects, total: subjects.reduce((n, s) => n + s.score, 0), max: subjects.length * 100 };
}

// The countdown runs from a deadline, so it stays right if the phone sleeps or the tab is in the background.
export const clock = {
  start: (secs, now = Date.now()) => ({ deadline: now + secs * 1000, left: secs, paused: false, timed: true }),
  untimed: () => ({ deadline: null, left: null, paused: false, timed: false }),
  left: (c, now = Date.now()) => (!c.timed ? null : c.paused ? c.left : Math.max(0, Math.round((c.deadline - now) / 1000))),
  pause: (c, now = Date.now()) => (!c.timed ? c : c.paused ? { ...c, paused: false, deadline: now + c.left * 1000 } : { ...c, paused: true, left: clock.left(c, now) }),
  off: () => clock.untimed()
};
export const hms = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${h ? `${h}:` : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(sec).padStart(2, '0')}`;
};
// Spoken warnings at fixed points, for screen reader users who cannot glance at the clock.
export const warnAt = (left) => ({ 1800: '30 minutes left', 600: '10 minutes left', 300: '5 minutes left', 60: 'One minute left' })[left] || '';

// A paper in progress is kept on the device, so a reload, an update or a closed tab never loses it.
const RUN = 'lx-mock-run';
export function loadRun(storage = local()) {
  try { const r = JSON.parse(storage?.getItem(RUN) || 'null'); return r && Array.isArray(r.sections) ? r : null; } catch { return null; }
}
export function saveRun(run, storage = local()) { try { storage?.setItem(RUN, JSON.stringify(run)); } catch { /* storage full: the paper still works */ } }
export function clearRun(storage = local()) { try { storage?.removeItem(RUN); } catch { /* ignore */ } }
export const answeredCount = (run) => Object.keys(run?.answers || {}).length;
export const questionCount = (run) => (run?.sections || []).reduce((n, s) => n + s.ids.length, 0);

// Finished mocks, newest last.
const KEY = 'mock:jamb';
export async function loadMocks() { return (await get('kv', KEY).catch(() => null)) || { runs: [] }; }
export async function recordMock({ format, total, max, subjects, secs }, now = Date.now()) {
  const p = await loadMocks();
  const next = { runs: [...p.runs, { at: now, format, total, max, secs, subjects: Object.fromEntries(subjects.map((s) => [s.id, s.score])) }].slice(-30) };
  await put('kv', next, KEY);
  return next;
}
export const bestMock = (p) => (p.runs || []).reduce((b, r) => (!b || r.total / r.max > b.total / b.max ? r : b), null);
