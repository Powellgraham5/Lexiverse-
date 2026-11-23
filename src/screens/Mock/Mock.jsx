import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { announce } from '../../app/announce.jsx';
import { Segmented } from '../../components/controls.jsx';
import { Sheet } from '../../components/Sheet.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { ScoreChart } from '../../components/ScoreChart.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { optionOrder } from '../../lib/paths.js';
import { BANK_NOTE, JAMB_SUBJECTS, loadBank, loadBankProgress, mySubjects, recordBankSession } from '../../lib/bank.js';
import { MOCK_FORMATS, mockTotal, buildMock, scoreMock, clock, hms, warnAt, loadRun, saveRun, clearRun, answeredCount, questionCount, loadMocks, recordMock, bestMock } from '../../lib/mock.js';
import { recordActivity } from '../../lib/streak.js';
import { tick } from '../../lib/plan.js';
import '../../components/options.css';
import '../Learn/practice.css';
import '../Paths/paths.css';
import '../Bank/bank.css';
import '../Help/help.css';
import './mock.css';

const KEYS = ['A', 'B', 'C', 'D'];
const title = (id) => JAMB_SUBJECTS.find((s) => s.id === id)?.title || id;

// The JAMB mock exam: set up, sit the paper like the CBT (move freely, flag, submit), then see the score out of 400.
export default function Mock() {
  usePage('JAMB mock exam');
  const [banks, setBanks] = useState(undefined);
  const [run, setRun] = useState(loadRun);
  const [result, setResult] = useState(null);
  // A saved paper waits on the setup screen until the learner chooses to resume it.
  const [resumed, setResumed] = useState(false);
  const [history, setHistory] = useState({ runs: [] });
  const subjects = run?.subjects || mySubjects();

  useEffect(() => {
    let live = true;
    Promise.all(subjects.map((id) => Promise.all([loadBank(id), loadBankProgress(id)])))
      .then((rows) => live && setBanks(rows.map(([b, p]) => ({ ...b, seen: p.seen || {} }))))
      .catch(() => live && setBanks(null));
    loadMocks().then((h) => live && setHistory(h)).catch(() => {});
    return () => { live = false; };
  }, [subjects.join()]);

  const byId = useMemo(() => Object.fromEntries((banks || []).flatMap((b) => b.questions.map((q) => [q.id, { ...q, subject: b.id }]))), [banks]);

  if (banks === undefined) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="JAMB mock exam" closeHref="/" /><h1 class="lx-sr">JAMB mock exam</h1></div>;
  if (!banks) return <div class="ps"><SessionTop done={0} total={0} label="JAMB mock exam" closeHref="/" /><ErrorCard title="The mock exam didn't load">Connect to the internet once so your subjects can download, then try again.</ErrorCard><a class="lx-btn" href="/">Back home</a></div>;

  if (result) return <Results result={result} byId={byId} history={history} onAgain={() => setResult(null)} />;
  if (run?.started && resumed) {
    return <Paper run={run} byId={byId} setRun={(r) => { setRun(r); saveRun(r); }} onSubmit={async (r, timedOut) => {
      const scored = scoreMock(r.sections, byId, r.answers);
      const secs = Math.round((Date.now() - r.startedAt - (r.pausedMs || 0)) / 1000);
      clearRun(); setRun(null);
      setResult({ ...scored, run: r, secs, timedOut });
      // Each subject's share also counts as practice in that subject, so weak topics and "seen" stay accurate.
      for (const s of r.sections) {
        await recordBankSession(s.id, {
          score: scored.subjects.find((x) => x.id === s.id).right, total: s.ids.length, secs: Math.round(secs / r.sections.length), ids: s.ids,
          results: s.ids.map((id) => ({ topic: byId[id]?.topic, ok: r.answers[id] === byId[id]?.answer }))
        }).catch(() => {});
      }
      const h = await recordMock({ format: r.format, total: scored.total, max: scored.max, subjects: scored.subjects, secs }).catch(() => null);
      if (h) setHistory(h);
      recordActivity('quiz', undefined, undefined, Math.max(1, Math.round(secs / 60)));
      tick('mock');
    }} />;
  }
  return <Setup banks={banks} subjects={subjects} saved={run?.started ? run : null} history={history} onStart={(formatId, timed) => {
    const r = {
      started: true, format: formatId, subjects, timed,
      sections: buildMock(banks, formatId, Object.fromEntries(banks.map((b) => [b.id, b.seen]))),
      answers: {}, flags: {}, pos: { s: 0, i: 0 }, startedAt: Date.now(), pausedMs: 0,
      clock: timed ? clock.start(MOCK_FORMATS[formatId].secs) : clock.untimed()
    };
    setRun(r); saveRun(r); setResumed(true);
  }} onResume={() => setResumed(true)} onDiscard={() => { clearRun(); setRun(null); }} />;
}

function Setup({ subjects, saved, history, onStart, onResume, onDiscard }) {
  const [format, setFormat] = useState('full');
  const f = MOCK_FORMATS[format];
  const best = bestMock(history);
  const points = (history.runs || []).slice(-10).map((r) => ({ at: r.at, score: r.total, total: r.max, pct: Math.round((100 * r.total) / r.max) }));
  return (
    <div class="ps">
      <SessionTop done={0} total={0} label="JAMB mock exam" closeHref="/" />
      <span class="ps-tag lx-rise">JAMB UTME · computer-based test practice</span>
      <h1 class="lx-rise lx-d1">JAMB mock exam</h1>
      {saved && (
        <section class="mk-resume lx-card lx-rise lx-d1" aria-labelledby="mk-resume">
          <h2 id="mk-resume">You have a mock in progress</h2>
          <p>{answeredCount(saved)} of {questionCount(saved)} answered{saved.clock?.timed ? ` · ${hms(clock.left(saved.clock))} left` : ''}.</p>
          <div class="mk-row">
            <button type="button" class="lx-btn" onClick={onResume}>Resume</button>
          </div>
        </section>
      )}
      <ul class="ls-checklist lx-rise lx-d2">
        <li>Your four subjects: {subjects.map(title).join(', ')}</li>
        <li>Move between questions and subjects, change answers and flag questions to come back to</li>
        <li>Answers are marked when you submit. Each subject is scored out of 100, for a total out of 400</li>
        <li>Your place is saved if you close the app, so you can resume</li>
      </ul>
      <p class="pt-sub">Change your subjects on your JAMB home.</p>
      <div class="bk-size lx-card lx-rise lx-d3">
        <Segmented label="Which paper?" value={format} onChange={setFormat} options={[['full', 'Full: 180 questions'], ['short', 'Short: 65 questions']]} stretch />
        <p class="mk-hint">{format === 'full' ? 'Like the real UTME: 60 Use of English and 40 in each other subject, in 2 hours.' : '20 Use of English and 15 in each other subject, in 45 minutes. Good for a quick check.'}</p>
      </div>
      {best && <p class="pt-sub">Best so far: <b>{best.total}/{best.max}</b></p>}
      {points.length > 1 && <div class="lx-card bk-chart"><ScoreChart id="mk-chart" title="Your mock scores" points={points} /></div>}
      <p class="pd-note">{BANK_NOTE}</p>
      <div class="ps-foot">
        {saved && <button type="button" class="lx-btn ghost" onClick={onDiscard}>Discard the mock in progress</button>}
        <button type="button" class="lx-btn" onClick={() => onStart(format, true)}>Start timed: {f.secs >= 3600 ? `${f.secs / 3600} hours` : `${f.secs / 60} minutes`}</button>
        <button type="button" class="lx-btn secondary" onClick={() => onStart(format, false)}>Start untimed</button>
      </div>
    </div>
  );
}

function Paper({ run, byId, setRun, onSubmit }) {
  const [now, setNow] = useState(Date.now());
  const [asking, setAsking] = useState(false);
  const heading = useRef(null);
  const { s, i } = run.pos;
  const section = run.sections[s];
  const id = section.ids[i];
  const q = byId[id];
  const total = questionCount(run);
  const done = answeredCount(run);
  const left = clock.left(run.clock, now);

  useEffect(() => {
    if (!run.clock.timed || run.clock.paused) return undefined;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [run.clock.timed, run.clock.paused]);
  const warned = useRef('');
  useEffect(() => {
    if (left === null) return;
    const w = warnAt(left);
    if (w && warned.current !== w) { warned.current = w; announce(w); }
    if (left <= 0 && !run.clock.paused && !warned.ended) { warned.ended = true; announce('Time is up. Your paper has been submitted.'); onSubmit(run, true); }
  }, [left]);
  // Moving to another question puts focus on it, so keyboard and screen reader users start there.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    heading.current?.focus({ preventScroll: false });
  }, [s, i]);

  // Leaving the paper (closing it, switching apps or a reload) pauses the clock, so time is never lost.
  const latest = useRef(run);
  latest.current = run;
  useEffect(() => {
    const hold = () => {
      const r = latest.current;
      if (r.clock.timed && !r.clock.paused) saveRun({ ...r, clock: clock.pause(r.clock), pausedAt: Date.now() });
    };
    addEventListener('pagehide', hold);
    return () => { removeEventListener('pagehide', hold); if (loadRun()) hold(); };
  }, []);

  const go = (ns, ni) => setRun({ ...run, pos: { s: ns, i: ni } });
  const next = () => (i + 1 < section.ids.length ? go(s, i + 1) : s + 1 < run.sections.length ? go(s + 1, 0) : setAsking(true));
  const prev = () => (i > 0 ? go(s, i - 1) : s > 0 ? go(s - 1, run.sections[s - 1].ids.length - 1) : null);
  const pick = (k) => setRun({ ...run, answers: { ...run.answers, [id]: k } });
  const flag = () => { const flags = { ...run.flags }; if (flags[id]) delete flags[id]; else flags[id] = true; setRun({ ...run, flags }); };
  const pause = () => {
    const paused = !run.clock.paused;
    setRun({ ...run, clock: clock.pause(run.clock), pausedAt: paused ? Date.now() : null, pausedMs: (run.pausedMs || 0) + (!paused && run.pausedAt ? Date.now() - run.pausedAt : 0) });
  };
  const flagged = Object.keys(run.flags).length;
  if (!q) return <div class="ps"><ErrorCard title="This question didn't load">Your answers are saved. Go back and resume.</ErrorCard><a class="lx-btn" href="/">Back home</a></div>;
  const order = optionOrder(q);

  return (
    <div class="ps mk">
      <SessionTop done={done} total={total} label="JAMB mock exam" closeHref="/" confirm confirmTitle="Leave the mock exam?" confirmText="Your answers are saved and the clock pauses. Come back to the mock exam to resume." />
      <div class="mk-bar">
        {run.clock.timed && (() => {
          const totalSecs = MOCK_FORMATS[run.format]?.secs || 7200;
          const pct = Math.max(0, Math.min(100, Math.round((100 * left) / totalSecs)));
          return <span class={`mk-ring ${left <= 300 ? 'low' : ''}`} style={{ '--p': pct }} aria-hidden="true"><span>{pct}%</span></span>;
        })()}
        <span role="timer" class="mk-clock">{run.clock.timed ? <><b class={left <= 300 ? 'low' : ''}>{hms(left)}</b> left{run.clock.paused ? ' (paused)' : ''}</> : 'Untimed'}</span>
        <button type="button" class="lx-btn small mk-submit" onClick={() => setAsking(true)}>Submit</button>
        {run.clock.timed && (
          <span class="mk-timer-ctl">
            <button type="button" class="ps-round" onClick={pause}>{run.clock.paused ? 'Resume' : 'Pause'}</button>
            <button type="button" class="ps-round" onClick={() => setRun({ ...run, clock: clock.off() })}>Turn off timer</button>
          </span>
        )}
      </div>

      <div class="mk-tabs" role="group" aria-label="Subjects">
        {run.sections.map((sec, k) => {
          const n = sec.ids.filter((x) => run.answers[x] !== undefined).length;
          return (
            <button key={sec.id} type="button" class="mk-tab" aria-current={k === s ? 'true' : undefined} onClick={() => go(k, 0)}>
              <b>{sec.title}</b><span>{n}/{sec.ids.length}</span>
            </button>
          );
        })}
      </div>

      {run.clock.paused ? (
        <div class="ps-empty"><h1>Paused</h1><p>The questions are hidden until you resume.</p><button type="button" class="lx-btn" onClick={pause}>Resume</button></div>
      ) : (
        <>
          <span class="ps-tag">{section.title} · Question {i + 1} of {section.ids.length}</span>
          <h1 class="mk-q" tabindex="-1" ref={heading}>{q.q}</h1>
          <fieldset class="mk-opts">
            <legend class="lx-sr">Choose an answer for question {i + 1}</legend>
            <div class="lx-opts">
              {order.map((k, n) => (
                <label key={k} class={`lx-opt mk-opt ${run.answers[id] === k ? 'chosen' : ''}`}>
                  <input type="radio" name={`mk-${id}`} class="mk-radio" checked={run.answers[id] === k} onChange={() => pick(k)} />
                  <span class="lx-opt-key" aria-hidden="true">{KEYS[n]}</span>
                  <span>{q.options[k]}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div class="mk-nav">
            <button type="button" class="lx-btn secondary" onClick={prev} disabled={s === 0 && i === 0}>Previous</button>
            <button type="button" class="lx-btn ghost mk-flag" aria-pressed={Boolean(run.flags[id])} onClick={flag}>{run.flags[id] ? 'Flagged' : 'Flag for review'}</button>
            <button type="button" class="lx-btn" onClick={next}>{s === run.sections.length - 1 && i === section.ids.length - 1 ? 'Finish' : 'Next'}</button>
          </div>
          <nav class="mk-palette" aria-label={`${section.title} questions`}>
            <ol>
              {section.ids.map((x, k) => {
                const a = run.answers[x] !== undefined, f = run.flags[x];
                return (
                  <li key={x}>
                    <button type="button" class={`mk-num ${a ? 'answered' : ''} ${f ? 'flagged' : ''}`} aria-current={k === i ? 'true' : undefined}
                      aria-label={`Question ${k + 1}${a ? ', answered' : ', not answered'}${f ? ', flagged' : ''}`} onClick={() => go(s, k)}>{k + 1}</button>
                  </li>
                );
              })}
            </ol>
            <p class="mk-key" aria-hidden="true"><span class="mk-dot answered" /> Answered <span class="mk-dot flagged" /> Flagged <span class="mk-dot" /> Not answered</p>
          </nav>
        </>
      )}

      <Sheet open={asking} title="Submit your paper?" onClose={() => setAsking(false)}>
        <ul class="mk-sum">
          <li><b>{done}</b> answered</li>
          <li><b>{total - done}</b> not answered</li>
          <li><b>{flagged}</b> flagged</li>
        </ul>
        <p class="lx-confirm-text">{total - done ? 'Unanswered questions count as wrong. ' : ''}You cannot change answers after submitting.</p>
        <div class="lx-crash-row lx-confirm-row">
          <button type="button" class="lx-btn secondary" onClick={() => setAsking(false)}>Keep going</button>
          <button type="button" class="lx-btn" onClick={() => { setAsking(false); onSubmit(run, false); }}>Submit</button>
        </div>
      </Sheet>
    </div>
  );
}

function Results({ result, byId, history, onAgain }) {
  const { subjects, total, max, run, secs, timedOut } = result;
  const [open, setOpen] = useState(null);
  const points = (history.runs || []).slice(-10).map((r) => ({ at: r.at, score: r.total, total: r.max, pct: Math.round((100 * r.total) / r.max) }));
  return (
    <div class="ps">
      <section class="rs" aria-labelledby="mk-done">
        <div class="rs-planet lx-rise" aria-hidden="true"><b>{total}</b><span>out of {max}</span></div>
        <h1 id="mk-done" class="lx-rise lx-d1" role="status">{timedOut ? 'Time is up!' : 'Paper submitted'}</h1>
        <p class="rs-sub lx-rise lx-d2">Your mock score is {total} out of {max}. Time used: {hms(Math.max(0, secs))}.</p>
      </section>
      <section class="pd-card lx-card mk-scores" aria-labelledby="mk-by">
        <h2 id="mk-by">By subject</h2>
        <ul>
          {subjects.map((x) => (
            <li key={x.id}>
              <div class="mk-srow"><b>{x.title}</b><span><b>{x.score}</b>/100</span></div>
              <span class="lx-bar" aria-hidden="true"><span style={{ width: `${x.score}%` }} /></span>
              <span class="mk-sub">{x.right} of {x.total} right{x.answered < x.total ? ` · ${x.total - x.answered} not answered` : ''}</span>
            </li>
          ))}
        </ul>
        <p class="pd-note">Universities and courses set their own cut-off marks, and they change each year. Check the current cut-off for the course you want.</p>
      </section>
      {points.length > 1 && <div class="lx-card bk-chart"><ScoreChart id="mk-res-chart" title="Your mock scores" points={points} /></div>}
      <section class="mk-review" aria-labelledby="mk-rev">
        <h2 id="mk-rev">Review your answers</h2>
        {run.sections.map((sec) => {
          const missed = sec.ids.filter((id) => run.answers[id] !== byId[id]?.answer);
          return (
            <details key={sec.id} class="hp-item lx-card mk-sec" open={open === sec.id} onToggle={(e) => e.currentTarget.open && setOpen(sec.id)}>
              <summary>{sec.title}: {missed.length ? `${missed.length} to review` : 'all correct'}</summary>
              <ol class="mk-missed">
                {missed.map((id) => {
                  const q = byId[id];
                  if (!q) return null;
                  const mine = run.answers[id];
                  return (
                    <li key={id}>
                      <p class="mk-mq">{q.q}</p>
                      <p>{mine === undefined ? 'Not answered.' : <>Your answer: <span class="mk-wrong">{q.options[mine]}</span>.</>} Correct answer: <b>{q.options[q.answer]}</b>.</p>
                      <p class="mk-why">{q.why}</p>
                    </li>
                  );
                })}
              </ol>
            </details>
          );
        })}
      </section>
      <div class="rs-actions">
        <button type="button" class="lx-btn secondary" onClick={onAgain}>Take another mock</button>
        <a class="lx-btn" href="/">Back home</a>
      </div>
    </div>
  );
}
