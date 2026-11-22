import { useEffect, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { ChevronIcon, LearnIcon, PenIcon, SlowIcon, CheckIcon } from '../../app/icons.jsx';
import { WeekStrip } from '../../components/WeekStrip.jsx';
import { FlameIcon } from '../../app/icons.jsx';
import { loadActivity, currentStreak } from '../../lib/streak.js';
import { loadProfile } from '../../lib/profile.js';
import { loadPath, loadProgress, pathProgress, bestTest, lessonsOf } from '../../lib/paths.js';
import { JAMB_SUBJECTS, mySubjects, saveMySubjects, loadBank, loadBankProgress, bestSession, seenCount, BANK_NOTE } from '../../lib/bank.js';
import { FORMAT_GROUP, Performance } from '../Paths/PathDetail.jsx';
import { CATEGORIES } from '../Paths/Paths.jsx';
import Today from '../Today/Today.jsx';
import '../Paths/paths.css';
import '../Bank/bank.css';
import './home.css';



// The top of every subject home: the category's planet, the title and the streak.
function HomeHead({ cat, eyebrow, title, sub }) {
  const streak = currentStreak(loadActivity().days || []);
  return (
    <header class="hm-head lx-rise">
      <div class="hm-title">
        <span class="pt-planet" style={{ background: cat.tint }} aria-hidden="true"><cat.Icon size={24} /></span>
        <span class="hm-title-text"><span class="pd-cat">{eyebrow}</span><h1 class="lx-page-title">{title}</h1></span>
        <a class="lx-streak-chip" href="/progress"><FlameIcon />{streak ? `${streak} day${streak === 1 ? '' : 's'}` : 'Start a streak'}<span class="lx-sr">{streak ? ' streak.' : '.'} See your progress</span></a>
      </div>
      <p class="pt-sub">{sub}</p>
    </header>
  );
}

function JambHome() {
  usePage('Home');
  const [mine, setMine] = useState(mySubjects);
  const [info, setInfo] = useState({});
  const [picking, setPicking] = useState(false);
  useEffect(() => {
    let live = true;
    // Only the learner's own subjects: the other banks load when they are opened.
    Promise.all(JAMB_SUBJECTS.filter((s) => mine.includes(s.id)).map(async (s) => {
      try {
        const [bank, prog] = await Promise.all([loadBank(s.id), loadBankProgress(s.id)]);
        const last = (prog.sessions || []).at(-1);
        return [s.id, { count: bank.questions.length, seen: seenCount(prog), best: bestSession(prog), last }];
      } catch { return [s.id, { failed: true }]; }
    })).then((rows) => live && setInfo((x) => ({ ...x, ...Object.fromEntries(rows) }))).catch(() => {});
    return () => { live = false; };
  }, [mine.join()]);
  const lastId = Object.entries(info).filter(([, i]) => i.last).sort((a, b) => b[1].last.at - a[1].last.at)[0]?.[0];
  const title = (id) => JAMB_SUBJECTS.find((s) => s.id === id)?.title;
  const toggle = (id) => {
    if (id === 'english') return;
    const next = mine.includes(id) ? mine.filter((x) => x !== id) : mine.length < 4 ? [...mine, id] : mine;
    setMine(next); saveMySubjects(next);
  };

  return (
    <div class="hm">
      <HomeHead cat={CATEGORIES.find((c) => c.goal === 'x')} eyebrow="JAMB (UTME)" title="Your JAMB practice" sub={mine.map(title).join(' · ')} />

      <section class="hm-hero lx-card lx-rise lx-d1" style={{ background: 'var(--lx-family-bg)' }} aria-labelledby="hm-daily">
        <h2 id="hm-daily">Today’s mixed set</h2>
        <p>10 questions across your four subjects, with every answer explained.</p>
        <div class="hm-row">
          <a class="lx-btn" href="/learn/bank/jamb/mix">Start today’s set</a>
          {lastId && <a class="lx-btn secondary" href={`/learn/bank/jamb/${lastId}`}>Continue {title(lastId)}</a>}
        </div>
      </section>

      <section class="pd-card lx-card lx-rise lx-d2" aria-labelledby="hm-mine">
        <div class="hm-between">
          <h2 id="hm-mine">Your subjects</h2>
          <button type="button" class="lx-btn ghost small" aria-expanded={picking} aria-disabled={picking && mine.length < 4} onClick={() => { if (!picking || mine.length === 4) setPicking(!picking); }}>{picking ? 'Done' : 'Change'}</button>
        </div>
        {picking && (
          <div class="hm-pick" role="group" aria-label="Choose your subjects (English and three more)">
            {JAMB_SUBJECTS.map((s) => (
              <button key={s.id} type="button" class="hm-chip" aria-pressed={mine.includes(s.id)} disabled={s.id === 'english' || (!mine.includes(s.id) && mine.length >= 4)} onClick={() => toggle(s.id)}>
                {mine.includes(s.id) && <CheckIcon size={14} />}{s.title}
              </button>
            ))}
            <p class="pt-desc" aria-live="polite">Use of English is compulsory. {mine.length < 4 ? `Choose ${4 - mine.length} more.` : 'You have chosen four subjects.'}</p>
          </div>
        )}
        <ul class="bk-subjects" aria-label="Your subjects">
          {mine.map((id) => {
            const i = info[id];
            return (
              <li key={id}>
                <a class="pt-row" href={`/learn/bank/jamb/${id}`}>
                  <span><b>{title(id)}</b><span>{!i ? 'Loading…' : i.failed ? 'Connect to the internet once to load this subject' : `${i.seen} of ${i.count} seen${i.best ? ` · best ${i.best.score}/${i.best.total}` : ''}`}</span></span>
                  <ChevronIcon />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <div class="pd-tools lx-rise lx-d2">
        <a class="pd-test" href="/learn/bank/jamb"><LearnIcon /><span><b>All ten subjects</b><span>Practise any subject, timed or untimed</span></span><ChevronIcon /></a>
        <a class="pd-test" href="/learn/path/jamb"><PenIcon /><span><b>Use of English lessons</b><span>Comprehension, grammar, oral forms and the set text</span></span><ChevronIcon /></a>
      </div>
      <WeekStrip id="hm-week" />
      <p class="pd-note">{BANK_NOTE}</p>
    </div>
  );
}

function CourseHome({ id }) {
  const [st, setSt] = useState(null);
  useEffect(() => {
    Promise.all([loadPath(id), loadProgress(id)]).then(([path, progress]) => setSt({ path, progress })).catch(() => setSt({ error: true }));
  }, [id]);
  usePage('Home');
  if (!st) return <div class="hm" aria-busy="true"><h1 class="lx-sr">Home</h1><span class="lx-skeleton pt-sk" /></div>;
  if (st.error) return <Today />;
  const { path, progress } = st;
  const p = pathProgress(path, progress);
  const best = bestTest(progress);
  const cat = CATEGORIES.find((c) => c.goal === path.goal);
  const upcoming = lessonsOf(path).filter((l) => !progress.done[l.id]).slice(0, 3);
  const writing = lessonsOf(path).find((l) => !progress.done[l.id] && l.exercises.some((x) => x.type === 'write' || x.type === 'speak'));
  const speaking = writing?.exercises.some((x) => x.type === 'speak') && !writing.exercises.some((x) => x.type === 'write');
  return (
    <div class="hm">
      <HomeHead cat={cat} eyebrow={cat.name} title={`Your ${path.title} course`} sub={path.sub} />

      <section class="hm-hero lx-card lx-rise lx-d1" style={{ background: cat.tint }} aria-labelledby="hm-next">
        <h2 id="hm-next">{p.next ? (p.done ? 'Pick up where you left off' : 'Start your course') : 'Course complete'}</h2>
        <div class="pd-prog">
          <span class="lx-bar" aria-hidden="true"><span style={{ width: `${p.percent}%` }} /></span>
          <span>{p.done} of {p.total} lessons done</span>
        </div>
        <div class="hm-row">
          {p.next ? <a class="lx-btn" href={`/learn/path/${path.id}/${p.next.id}`}>{p.done ? 'Continue' : 'Start'}: {p.next.title}</a>
            : <a class="lx-btn" href={`/learn/path/${path.id}`}>Review the course</a>}
          <a class="lx-btn secondary" href={`/learn/path/${path.id}`}>All lessons</a>
        </div>
      </section>

      {upcoming.length > 1 && (
        <section class="pd-card lx-card lx-rise lx-d2" aria-labelledby="hm-up">
          <h2 id="hm-up">Coming up</h2>
          <ol class="pd-lessons">
            {upcoming.map((l) => (
              <li key={l.id}><a class="pd-lesson" href={`/learn/path/${path.id}/${l.id}`}><span class="pd-dot" aria-hidden="true" /><span class="pd-lesson-text"><b>{l.title}</b><span>{l.minutes} min · {l.exercises.length} exercises</span></span><ChevronIcon /></a></li>
            ))}
          </ol>
        </section>
      )}

      <div class="pd-tools lx-rise lx-d2">
        {writing && (
          <a class="pd-test" href={`/learn/path/${path.id}/${writing.id}`}>
            <PenIcon />
            <span><b>{speaking ? 'Practise speaking' : 'Practise writing'}</b><span>{writing.title}: {speaking ? 'timed, with a checklist' : 'scored out of 10, with a model answer'}</span></span>
            <ChevronIcon />
          </a>
        )}
        <a class="pd-test" href={`/learn/path/${path.id}/test`}>
          <SlowIcon />
          <span><b>Practice test</b><span>Timed or untimed{best ? ` · Best: ${best.score}/${best.total}` : ''}</span></span>
          <ChevronIcon />
        </a>
        {FORMAT_GROUP[path.id] && (
          <a class="pd-test" href={`/learn/formats?group=${FORMAT_GROUP[path.id]}`}>
            <PenIcon />
            <span><b>Writing formats</b><span>Layouts, rules and templates</span></span>
            <ChevronIcon />
          </a>
        )}
      </div>
      <Performance path={path} progress={progress} />
      <WeekStrip id="hm-week" />
    </div>
  );
}

export default function SubjectHome({ kind, id }) {
  return kind === 'jamb' ? <JambHome /> : <CourseHome id={id} />;
}
