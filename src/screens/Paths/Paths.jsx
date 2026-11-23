import { useEffect, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { ChevronIcon, ChatIcon, LearnIcon, PenIcon, CaseIcon } from '../../app/icons.jsx';
import { PATHS, isOpen, loadPath, loadProgress, pathProgress, pathHome, focusPath, pathById } from '../../lib/paths.js';
import { loadProfile } from '../../lib/profile.js';
import './paths.css';

// The four goals, with the same names and descriptions as onboarding.
export const CATEGORIES = [
  { goal: 'e', name: 'Everyday English', desc: 'Talk and understand with confidence', Icon: ChatIcon, tint: 'var(--lx-opposite-bg)', how: 'Meet one new word a day, then review it with flashcards, quizzes, listening and spelling.' },
  { goal: 'x', name: 'Exam preparation', desc: 'IELTS, WAEC, SAT and more', Icon: LearnIcon, tint: 'var(--lx-family-bg)', how: 'Pick your exam, learn its format, practise each skill, then take a timed test.' },
  { goal: 'w', name: 'Better writing', desc: 'Essays, reports, stories and letters', Icon: PenIcon, tint: 'var(--lx-note-bg)', how: 'Learn the layout, study the examples, write your own piece and compare it with a model.' },
  { goal: 'k', name: 'Work and career', desc: 'Emails, meetings and interviews', Icon: CaseIcon, tint: 'var(--lx-info-bg)', how: 'Learn the parts and the tone, practise real situations, and keep templates you can reuse.' }
];

export default function Paths() {
  usePage('Courses');
  const profile = loadProfile();
  const mine = profile?.goal || 'e';
  const [progress, setProgress] = useState({});
  useEffect(() => {
    // One path failing to load (offline, not cached yet) must not hide the others' progress.
    Promise.all(PATHS.filter(isOpen).map(async (p) => { try { return [p.id, pathProgress(await loadPath(p.id), await loadProgress(p.id))]; } catch { return [p.id, null]; } }))
      .then((rows) => setProgress(Object.fromEntries(rows))).catch(() => {});
  }, []);
  // The learning section has three categories; Everyday English lives on Today and Learn.
  const ordered = CATEGORIES.filter((c) => c.goal !== 'e').sort((a, b) => (b.goal === mine) - (a.goal === mine));
  const [show, setShow] = useState('all');
  // The course to continue: the one furthest along but not finished, else the learner's own course.
  const started = Object.entries(progress).filter(([, p]) => p && p.done > 0 && p.next).sort((a, b) => b[1].done - a[1].done)[0];
  const contId = started?.[0] || focusPath(mine, profile?.focus);
  const cont = contId && progress[contId] ? { meta: pathById(contId), p: progress[contId] } : null;
  const FILTERS = [['all', 'All'], ['x', 'Exams'], ['w', 'Writing'], ['k', 'Work']];

  return (
    <>
      <header class="pt-head"><p class="pt-eyebrow">12 courses · lessons, tests, certificates</p><h1 class="lx-page-title lx-rise">Courses</h1></header>
      {cont?.p?.next && (
        <section class="pt-continue lx-rise lx-d1" aria-labelledby="pt-cont">
          <span class="pt-cont-tag">Continue</span>
          <h2 id="pt-cont">{cont.meta.title}</h2>
          <p>Lesson {cont.p.done + 1} of {cont.p.total} · {cont.p.next.title}</p>
          <span class="lx-bar" aria-hidden="true"><span style={{ width: `${cont.p.percent}%` }} /></span>
          <a class="pt-cont-btn" href={`/learn/path/${contId}/${cont.p.next.id}`}>Keep going</a>
        </section>
      )}
      <div class="lx-seg pt-filter lx-rise lx-d1" role="group" aria-label="Show courses for">
        {FILTERS.map(([id, label]) => <button key={id} type="button" aria-pressed={show === id} onClick={() => setShow(id)}>{label}</button>)}
      </div>
      <div class="pt-cats">
        {ordered.filter((c) => show === 'all' || c.goal === show).map((c, i) => (
          <section key={c.goal} class={`pt-cat lx-card lx-rise lx-d${Math.min(i + 1, 4)} ${c.goal === mine ? 'mine' : ''}`} aria-labelledby={`pt-${c.goal}`}>
            <div class="pt-cat-head">
              <span class="pt-planet" style={{ background: c.tint }} aria-hidden="true"><c.Icon size={22} /></span>
              <span><h2 id={`pt-${c.goal}`}>{c.name}</h2><span class="pt-desc">{c.desc}</span></span>
              {c.goal === mine && <span class="pt-mine">Your goal</span>}
            </div>
            <p class="pt-how"><b>How it works:</b> {c.how}</p>
            {c.goal === 'e' ? (
              <ul class="pt-list">
                <li><a class="pt-row" href="/learn"><span><b>Word of the day and practice</b><span>Daily words, flashcards, quizzes, listening and spelling</span></span><ChevronIcon /></a></li>
              </ul>
            ) : (
              <ul class="pt-list">
                {PATHS.filter((p) => p.goal === c.goal).map((p) => (
                  <li key={p.id}>
                    {isOpen(p) ? (
                      <a class="pt-row" href={pathHome(p.id)}>
                        <span><b>{p.title}</b><span>{p.sub}</span>
                          {progress[p.id] && <span class="pt-prog">{progress[p.id].done} of {progress[p.id].total} lessons</span>}
                        </span>
                        <ChevronIcon />
                      </a>
                    ) : (
                      <div class="pt-row soon"><span><b>{p.title}</b><span>{p.sub}</span></span><span class="pt-soon">Coming soon</span></div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <a class="pd-test lx-rise lx-d2" href="/learn/formats"><PenIcon /><span><b>Writing formats</b><span>Layouts for letters, essays, reports, stories, emails and exam tasks</span></span><ChevronIcon /></a>
    </>
  );
}
