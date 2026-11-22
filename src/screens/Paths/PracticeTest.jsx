import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { loadPath, loadProgress, buildTest, TIMER, recordTest, bestTest, lessonsOf } from '../../lib/paths.js';
import { recordActivity } from '../../lib/streak.js';
import { tick } from '../../lib/plan.js';
import { VIEWS, Passage } from './exercises.jsx';
import '../../components/options.css';
import '../Learn/practice.css';
import './paths.css';

const SECS_PER_QUESTION = 60;
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

// A timed test from across a path. The timer can be paused or switched off (WCAG 2.2.1), and
// when it runs out the unanswered questions count as missed.
export default function PracticeTest() {
  const { params } = useRoute();
  const [path, setPath] = useState(undefined);
  const [best, setBest] = useState(null);
  useEffect(() => {
    Promise.all([loadPath(params.id), loadProgress(params.id)])
      .then(([p, prog]) => { setPath(p); setBest(bestTest(prog)); }).catch(() => setPath(null));
  }, [params.id]);
  usePage(path ? `${path.title}: practice test` : 'Practice test');
  // Each attempt shuffles anew, so a retake is not the same sequence of questions.
  const [attempt, setAttempt] = useState(0);
  const items = useMemo(() => (path ? buildTest(path, 10, `test${attempt}`) : []), [path, attempt]);
  const picked = useRef({});
  const untimedRef = useRef(false);
  const [phase, setPhase] = useState('intro'); // intro | run | done
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const [timer, setTimer] = useState(null);
  const [say, setSay] = useState('');
  const started = useRef(0);
  const took = useRef(0);
  const back = `/learn/path/${params.id}`;

  // Each new question (and the results) moves focus to its heading, so keyboard and screen reader
  // users start at the question instead of the top of the page.
  useEffect(() => {
    if (phase === 'setup' || phase === 'intro') return;
    const t = setTimeout(() => {
      const h = document.querySelector('.ps-q:not([hidden]) h1, .ps h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }, 60);
    return () => clearTimeout(t);
  }, [phase, i]);
  useEffect(() => {
    if (phase !== 'run' || !timer || timer.paused || timer.off) return undefined;
    const t = setInterval(() => setTimer((x) => TIMER.tick(x)), 1000);
    return () => clearInterval(t);
  }, [phase, timer?.paused, timer?.off]);
  useEffect(() => {
    if (phase !== 'run' || !timer) return;
    const a = TIMER.announce(timer);
    if (a) setSay(a);
    if (TIMER.expired(timer)) finish(log, true);
  }, [timer?.left]);

  async function finish(entries, timedOut = false) {
    // An answer picked but not yet continued past still counts when time runs out.
    const all = [...entries, ...items.slice(entries.length).map((x, k) => {
      const a = picked.current[entries.length + k];
      return a ? { ...a, word: x.q, link: false } : { ok: false, word: x.q, detail: 'Not answered in time.', link: false };
    })];
    setLog(all);
    setPhase('done');
    const score = all.filter((e) => e.ok).length;
    const secs = Math.round((Date.now() - started.current) / 1000);
    took.current = secs;
    await recordTest(path.id, { score, total: items.length, secs }).catch(() => {});
    recordActivity('quiz', undefined, undefined, Math.max(1, Math.round(secs / 60)));
    tick('test');
    if (timedOut) setSay('Time is up');
  }
  function onDone(ok, detail = '') {
    const x = items[i];
    const entries = [...log, { ok, word: x.q.length > 60 ? `${x.q.slice(0, 57)}…` : x.q, detail, link: false }];
    setLog(entries);
    if (i + 1 >= items.length) finish(entries);
    else setI(i + 1);
  }
  function start(again = false, untimed = untimedRef.current) {
    untimedRef.current = untimed;
    if (again) setAttempt((n) => n + 1);
    picked.current = {};
    started.current = Date.now();
    setLog([]); setI(0);
    const t = TIMER.start(items.length * SECS_PER_QUESTION);
    setTimer(untimed ? TIMER.off(t) : t);
    setPhase('run');
  }

  if (path === undefined) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Practice test" closeHref={back} /><h1 class="lx-sr">Practice test</h1></div>;
  if (!path || !items.length) return <div class="ps"><SessionTop done={0} total={0} label="Practice test" closeHref="/learn/paths" /><ErrorCard title="This test isn't available">Pick another path.</ErrorCard></div>;

  if (phase === 'intro') {
    return (
      <div class="ps">
        <SessionTop done={0} total={items.length} label="Practice test" closeHref={back} />
        <span class="ps-tag lx-rise">{path.title}</span>
        <h1 class="lx-rise lx-d1">Practice test</h1>
        <ul class="ls-checklist lx-rise lx-d2">
          <li>{items.length} questions from across the path, in a new order each time</li>
          <li>You see the answer and explanation after each question, and your score at the end</li>
        </ul>
        {best && <p class="pt-sub">Your best so far: {best.score}/{best.total}</p>}
        <p class="pd-note">{path.note}</p>
        <div class="ps-foot">
          <button type="button" class="lx-btn" onClick={() => start()}>Timed: {items.length} minutes</button>
          <button type="button" class="lx-btn secondary" onClick={() => start(false, true)}>Untimed: take your time</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const score = log.filter((e) => e.ok).length;
    const secs = took.current;
    return (
      <div class="ps">
        <p class="lx-sr" aria-live="assertive">{say}</p>
        <Results title={say === 'Time is up' ? 'Time is up!' : 'Test complete!'} score={score} total={items.length} unit="correct"
          missed={log.filter((e) => !e.ok)} onRetry={() => start(true)} retryLabel="Take it again" doneHref={back} doneLabel="Back to the path"
          extra={<p class="rs-sub">Time taken: {mmss(secs)}{best ? ` · Previous best: ${best.score}/${best.total}` : ''}</p>} />
      </div>
    );
  }

  const x = items[i];
  const View = VIEWS[x.type];
  return (
    <div class="ps">
      <SessionTop done={i} total={items.length} label="Practice test" closeHref={back} confirm={i > 0} />
      <div class="pt-timer" role="group" aria-label="Timer">
        {timer.off ? <span>Timer off</span> : <span role="timer"><b class={timer.left <= 60 ? 'low' : ''}>{mmss(timer.left)}</b> left{timer.paused ? ' (paused)' : ''}</span>}
        {!timer.off && <button type="button" class="ps-round" onClick={() => setTimer(TIMER.pause(timer))}>{timer.paused ? 'Resume' : 'Pause'}</button>}
        {!timer.off && <button type="button" class="ps-round" onClick={() => setTimer(TIMER.off(timer))}>Turn off timer</button>}
      </div>
      <p class="lx-sr" aria-live="polite">{say}</p>
      {timer.paused && (
        <div class="ps-empty"><h1>Paused</h1><p>Take a breath. The question is hidden until you resume.</p><button type="button" class="lx-btn" onClick={() => setTimer(TIMER.pause(timer))}>Resume</button></div>
      )}
      {/* Kept mounted while paused, so an answer already chosen is not lost or changed. */}
      <div class="ps-q" hidden={timer.paused}>
          <span class="ps-tag lx-rise">Question {i + 1} of {items.length}</span>
          {x.passage && <Passage text={x.passage} />}
          <View key={x.key} x={x} seed={x.key} onDone={onDone} help={lessonsOf(path).find((l) => x.key.startsWith(`${l.id}#`))?.cards} onAnswer={(ok, detail) => { picked.current[i] = { ok, detail }; }} />
      </div>
    </div>
  );
}
