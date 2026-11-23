import { useEffect, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { ChevronIcon, CardsIcon, SlowIcon, SpeakerIcon, LearnIcon, TodayIcon, PenIcon } from '../../app/icons.jsx';
import { loadProfile } from '../../lib/profile.js';
import { homeFor } from '../../lib/home.js';
import { JAMB_SUBJECTS, mySubjects, loadBankProgress, seenCount, weakTopics } from '../../lib/bank.js';
import { loadReviews, summary } from '../../lib/srs.js';
import { pathById } from '../../lib/paths.js';
import '../Paths/paths.css';
import './practice.css';

const title = (id) => JAMB_SUBJECTS.find((s) => s.id === id)?.title || id;
const SHORT = { english: 'En', mathematics: 'Ma', biology: 'Bi', chemistry: 'Ch', physics: 'Ph', economics: 'Ec', government: 'Go', literature: 'Li', crs: 'CR', irs: 'IR' };

// Practice: every way to test yourself in one place. JAMB learners see their subjects first.
export default function Practice() {
  usePage('Practice');
  const profile = loadProfile();
  const home = homeFor(profile);
  const jamb = home.kind === 'jamb';
  const course = home.kind === 'course' ? pathById(home.id) : null;
  const mine = mySubjects();
  const [stats, setStats] = useState({});
  const [due, setDue] = useState(0);
  useEffect(() => {
    let live = true;
    if (jamb) {
      Promise.all(mine.map(async (id) => [id, await loadBankProgress(id).catch(() => null)]))
        .then((rows) => live && setStats(Object.fromEntries(rows.map(([id, p]) => [id, p && { seen: seenCount(p), weak: weakTopics(p)[0] }]))));
    }
    loadReviews().then((r) => live && setDue(summary(r).due)).catch(() => {});
    return () => { live = false; };
  }, []);

  return (
    <>
      <header class="pr-head">
        <p class="pr-eyebrow">{jamb ? 'JAMB UTME' : course ? course.title : 'Test yourself'}</p>
        <h1 class="lx-page-title">Practice</h1>
      </header>

      <div class="pr-big">
        <a class="pr-tile violet" href="/learn/mock">
          <SlowIcon size={30} />
          <b>JAMB mock exam</b>
          <span>180 questions · 2 hours · out of 400</span>
        </a>
        {course
          ? <a class="pr-tile lime" href={`/learn/path/${course.id}/test`}><PenIcon size={30} /><b>Practice test</b><span>{course.title} · timed or untimed</span></a>
          : <a class="pr-tile lime" href="/learn/bank/jamb/mix"><LearnIcon size={30} /><b>Mixed set</b><span>10 quick JAMB questions</span></a>}
      </div>

      {jamb && (
        <section aria-labelledby="pr-subj">
          <div class="pr-row-head"><h2 id="pr-subj">Your subjects</h2><a class="lx-btn ghost small" href="/learn/bank/jamb">All 10</a></div>
          <ul class="pr-list lx-card">
            {mine.map((id) => {
              const s = stats[id];
              return (
                <li key={id}>
                  <a class="pr-item" href={`/learn/bank/jamb/${id}`}>
                    <span class={`pr-badge b-${id}`} aria-hidden="true">{SHORT[id]}</span>
                    <span class="pr-text"><b>{title(id)}</b><span>{!s ? 'Loading…' : s.weak ? `Needs work: ${s.weak.topic}` : `${s.seen} questions seen`}</span></span>
                    {s?.weak ? <span class="pr-tag">Weak spot</span> : <ChevronIcon />}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {!jamb && (
        <a class="pd-test" href="/learn/bank/jamb"><LearnIcon /><span><b>JAMB practice questions</b><span>10 subjects, every answer explained</span></span><ChevronIcon /></a>
      )}

      <section aria-labelledby="pr-words">
        <h2 id="pr-words" class="pr-h2">Word practice</h2>
        <div class="pr-grid">
          <a class="pr-tile sky" href="/learn/flashcards"><CardsIcon size={26} /><b>Flashcards</b><span>{due ? `${due} word${due === 1 ? '' : 's'} due` : 'Review your words'}</span></a>
          <a class="pr-tile pink" href="/learn/quiz?size=5"><LearnIcon size={26} /><b>Quick quiz</b><span>5 questions</span></a>
          <a class="pr-tile sun" href="/learn/spell"><SpeakerIcon size={26} /><b>Listen and spell</b><span>Hear it, type it</span></a>
          <a class="pr-tile lime" href="/learn/match"><CardsIcon size={26} /><b>Word match</b><span>Pair words and meanings</span></a>
        </div>
      </section>

      <div class="pr-links">
        <a class="pd-test" href="/today"><TodayIcon /><span><b>Word of the day</b><span>A new word and a one-minute challenge</span></span><ChevronIcon /></a>
        <a class="pd-test" href="/learn/setup"><CardsIcon /><span><b>Set up practice</b><span>Choose words, size and question types</span></span><ChevronIcon /></a>
      </div>
    </>
  );
}
