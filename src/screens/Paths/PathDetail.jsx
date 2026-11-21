import { useEffect, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { BackIcon, CheckIcon, ChevronIcon, SlowIcon, PenIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { loadPath, loadProgress, pathProgress, pathById, bestTest, buildTest } from '../../lib/paths.js';
import { CATEGORIES } from './Paths.jsx';
import './paths.css';

// Which Writing formats group fits each path.
export const FORMAT_GROUP = { waec: 'waec', ielts: 'ielts', sat: 'sat', jamb: 'waec', toefl: 'toefl', essays: 'writing', stories: 'writing', reports: 'writing', letters: 'letters', emails: 'emails', meetings: 'work', interviews: 'work' };
const GUIDE_KEY = 'lx-guide-closed';
const guideClosed = (id) => { try { return JSON.parse(localStorage.getItem(GUIDE_KEY) || '[]').includes(id); } catch { return false; } };
function setGuideClosed(id, closed) {
  try {
    const list = new Set(JSON.parse(localStorage.getItem(GUIDE_KEY) || '[]'));
    closed ? list.add(id) : list.delete(id);
    localStorage.setItem(GUIDE_KEY, JSON.stringify([...list]));
  } catch { /* private mode */ }
}

// How the learner is doing: lessons finished, their average lesson score, and recent tests.
function Performance({ path, progress }) {
  const done = Object.values(progress.done || {});
  const graded = done.filter((d) => d.total);
  const avg = graded.length ? Math.round((100 * graded.reduce((a, d) => a + d.score, 0)) / graded.reduce((a, d) => a + d.total, 0)) : null;
  const tests = [...(progress.tests || [])].reverse().slice(0, 5);
  if (!done.length && !tests.length) return null;
  return (
    <section class="pd-card lx-card" aria-labelledby="pd-perf">
      <h2 id="pd-perf">Your performance</h2>
      <ul class="pd-stats">
        <li><b>{done.length}</b><span>lessons done</span></li>
        <li><b>{avg === null ? '–' : `${avg}%`}</b><span>lesson score</span></li>
        <li><b>{(progress.tests || []).length}</b><span>tests taken</span></li>
      </ul>
      {tests.length > 0 && (
        <ol class="pd-tests" aria-label="Recent tests">
          {tests.map((t) => <li key={t.at}><span>{new Date(t.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span><b>{t.score}/{t.total}</b><span>{Math.round(t.secs / 60) || 1} min</span></li>)}
        </ol>
      )}
    </section>
  );
}

export default function PathDetail() {
  const { params } = useRoute();
  const meta = pathById(params.id);
  usePage(meta?.title || 'Path');
  const [state, setState] = useState(null);
  useEffect(() => {
    Promise.all([loadPath(params.id), loadProgress(params.id)])
      .then(([path, progress]) => setState(path ? { path, progress } : { missing: true }))
      .catch(() => setState({ error: true }));
  }, [params.id]);

  const top = <div class="lx-top"><a class="lx-round" href="/learn/paths" aria-label="Back to learning paths"><BackIcon /></a></div>;
  if (!state) return <>{top}<h1 class="lx-sr">{meta?.title || 'Path'}</h1><span class="lx-skeleton pt-sk" aria-busy="true" /></>;
  if (state.error) return <>{top}<ErrorCard title="This path didn't load">Check your connection and try again.</ErrorCard></>;
  if (state.missing) {
    return (
      <>{top}
        <section class="lx-empty lx-card" aria-labelledby="pd-gone">
          <h1 id="pd-gone" class="lx-page-title">{meta ? `${meta.title} is coming soon` : 'Path not found'}</h1>
          <p>{meta ? 'Lessons for this path are being written. Try another path for now.' : 'This path does not exist.'}</p>
          <a class="lx-btn" href="/learn/paths">See all paths</a>
        </section>
      </>
    );
  }

  const { path, progress } = state;
  const p = pathProgress(path, progress);
  const best = bestTest(progress);
  const testSize = buildTest(path).length;
  const cat = CATEGORIES.find((c) => c.goal === path.goal);
  return (
    <>
      {top}
      <div class="lx-split">
        <div class="lx-col lx-sticky">
          <header class="pd-head lx-rise">
            <span class="pt-planet big" style={{ background: cat.tint }} aria-hidden="true"><cat.Icon size={34} /></span>
            <p class="pd-cat">{cat.name}</p>
            <h1 class="lx-page-title">{path.title}</h1>
            <p class="pt-sub">{path.sub}</p>
            <div class="pd-prog">
              <span class="lx-bar" aria-hidden="true"><span style={{ width: `${p.percent}%` }} /></span>
              <span>{p.done} of {p.total} lessons done</span>
            </div>
            {p.next
              ? <a class="lx-btn" href={`/learn/path/${path.id}/${p.next.id}`}>{p.done ? 'Continue' : 'Start'}: {p.next.title}</a>
              : <p class="pd-done" role="status"><CheckIcon size={18} /> Path complete. Revisit any lesson to practise again.</p>}
          </header>
          <p class="pd-note">{path.note}</p>
          <Performance path={path} progress={progress} />
          {path.improve && (
            <section class="pd-card lx-card" aria-labelledby="pd-improve">
              <h2 id="pd-improve">How to improve</h2>
              <ul class="pd-improve">{path.improve.map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          )}
        </div>
        <div class="lx-col">
          {path.guide && (
            <details class="pd-guide lx-card lx-rise lx-d1" open={!guideClosed(path.id)} onToggle={(e) => setGuideClosed(path.id, !e.currentTarget.open)}>
              <summary>How to use this path</summary>
              <ol>{path.guide.map((g) => <li key={g}>{g}</li>)}</ol>
            </details>
          )}
          <div class="pd-tools lx-rise lx-d1">
            <a class="pd-test" href={`/learn/path/${path.id}/test`}>
              <SlowIcon />
              <span><b>Practice test</b><span>{testSize} questions · timed or untimed{best ? ` · Best: ${best.score}/${best.total}` : ''}</span></span>
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
          {path.units.map((u, ui) => (
            <section key={u.title} class="pd-unit lx-rise lx-d2" aria-labelledby={`pd-u${ui}`}>
              <h2 id={`pd-u${ui}`}><span class="pd-unit-n">Unit {ui + 1}</span>{u.title}</h2>
              <ol class="pd-lessons">
                {u.lessons.map((l) => {
                  const done = progress.done[l.id];
                  return (
                    <li key={l.id}>
                      <a class={`pd-lesson ${done ? 'done' : ''} ${p.next?.id === l.id ? 'next' : ''}`} href={`/learn/path/${path.id}/${l.id}`}>
                        <span class="pd-dot" aria-hidden="true">{done ? <CheckIcon size={16} /> : null}</span>
                        <span class="pd-lesson-text"><b>{l.title}</b><span>{l.minutes} min · {l.exercises.length} exercises{done ? ` · done${done.total ? `, ${done.score}/${done.total}` : ''}` : ''}</span></span>
                        <ChevronIcon />
                      </a>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
