import { useEffect, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { BackIcon, ChevronIcon, ChatIcon, LearnIcon, PenIcon, CaseIcon } from '../../app/icons.jsx';
import { PATHS, isOpen, loadPath, loadProgress, pathProgress } from '../../lib/paths.js';
import { loadProfile } from '../../lib/profile.js';
import './paths.css';

// The four goals, with the same names and descriptions as onboarding.
export const CATEGORIES = [
  { goal: 'e', name: 'Everyday English', desc: 'Talk and understand with confidence', Icon: ChatIcon, tint: 'var(--lx-opposite-bg)', how: 'Meet one new word a day, then review it with flashcards, quizzes, listening and spelling.' },
  { goal: 'x', name: 'Exam preparation', desc: 'IELTS, WAEC, SAT and more', Icon: LearnIcon, tint: 'var(--lx-family-bg)', how: 'Pick your exam, learn its format, practise each skill, then take a timed test.' },
  { goal: 'w', name: 'Better writing', desc: 'Essays, reports and stories', Icon: PenIcon, tint: 'var(--lx-note-bg)', how: 'Learn the layout, study the examples, write your own piece and compare it with a model.' },
  { goal: 'k', name: 'Work and career', desc: 'Emails, meetings and interviews', Icon: CaseIcon, tint: 'var(--lx-info-bg)', how: 'Learn the parts and the tone, practise real situations, and keep templates you can reuse.' }
];

export default function Paths() {
  usePage('Learning paths');
  const profile = loadProfile();
  const mine = profile?.goal || 'e';
  const [progress, setProgress] = useState({});
  useEffect(() => {
    Promise.all(PATHS.filter(isOpen).map(async (p) => [p.id, pathProgress(await loadPath(p.id), await loadProgress(p.id))]))
      .then((rows) => setProgress(Object.fromEntries(rows))).catch(() => {});
  }, []);
  const ordered = [...CATEGORIES].sort((a, b) => (b.goal === mine) - (a.goal === mine));

  return (
    <>
      <div class="ld-top"><a class="ld-round" href="/learn" aria-label="Back to Learn"><BackIcon /></a></div>
      <h1 class="lx-page-title lx-rise">Learning paths</h1>
      <p class="pt-sub lx-rise lx-d1">Pick a path for step-by-step lessons and practice. Your goal comes first.</p>
      <a class="pd-test lx-rise lx-d1" href="/learn/formats"><PenIcon /><span><b>Writing formats</b><span>Letters, essays, IELTS tasks, reports, stories and emails</span></span><ChevronIcon /></a>
      <div class="pt-cats">
        {ordered.map((c, i) => (
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
                      <a class="pt-row" href={`/learn/path/${p.id}`}>
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
    </>
  );
}
