import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { loadPath, loadProgress, buildTest, TIMER, recordTest, bestTest } from '../../lib/paths.js';
import { recordActivity } from '../../lib/streak.js';
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
  const items = useMemo(() => (path ? buildTest(path) : []), [path]);
  const [phase, setPhase] = useState('intro'); // intro | run | done
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const [timer, setTimer] = useState(null);
  const [say, setSay] = useState('');
  const started = useRef(0);
  const back = `/learn/path/${params.id}`;

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
    const all = [...entries, ...items.slice(entries.length).map((x) => ({ ok: false, word: x.q, detail: 'Not answered in time.', link: false }))];
    setLog(all);
    setPhase('done');
    const score = all.filter((e) => e.ok).length;
    const secs = Math.round((Date.now() - started.current) / 1000);
    await recordTest(path.id, { score, total: items.length, secs }).catch(() => {});
    recordActivity('quiz', undefined, undefined, Math.max(1, Math.round(secs / 60)));
    if (timedOut) setSay('Time is up');
  }
  function onDone(ok, detail = '') {
    const x = items[i];
    const entries = [...log, { ok, word: x.q.length > 60 ? `${x.q.slice(0, 57)}…` : x.q, detail, link: false }];
    setLog(entries);
    if (i + 1 >= items.length) finish(entries);
    else setI(i + 1);
  }
  function start() {
    started.current = Date.now();
    setLog([]); setI(0);
    setTimer(TIMER.start(items.length * SECS_PER_QUESTION));
    setPhase('run');
  }

  if (path === undefined) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Practice test" closeHref={back} /><h1 class="lx-sr">Practice test</h1></div>;
  if (!path || !items.length) return <div class="ps"><SessionTop done={0} total={0} label="Practice test" closeHref="/learn/paths" /><ErrorCard title="This test isn't available">Pick another path.</ErrorCard></div>;

  if (phase === 'intro') {
    return (
      <div class="ps">
        <SessionTop done={0} total={items.length} label="Practice test" closeHref={back} />
        <span class="ps-tag lx-rise">{path.title}</span>
        <h1 class="lx-rise lx-d1">Timed practice test</h1>
        <ul class="ls-checklist lx-rise lx-d2">
          <li>{items.length} questions from across the path</li>
          <li>{items.length} minutes in total; you can pause or switch the timer off</li>
          <li>You see the answer after each question, and your score at the end</li>
        </ul>
        {best && <p class="pt-sub">Your best so far: {best.score}/{best.total}</p>}
        <p class="pd-note">{path.note}</p>
        <div class="ps-foot"><button type="button" class="lx-btn" onClick={start}>Start the test</button></div>
      </div>
    );
  }

  if (phase === 'done') {
    const score = log.filter((e) => e.ok).length;
    const secs = Math.round((Date.now() - started.current) / 1000);
    return (
      <div class="ps">
        <p class="lx-sr" aria-live="assertive">{say}</p>
        <Results title={say === 'Time is up' ? 'Time is up!' : 'Test complete!'} score={score} total={items.length} unit="correct"
          missed={log.filter((e) => !e.ok)} onRetry={start} retryLabel="Take it again" doneHref={back} doneLabel="Back to the path"
          extra={<p class="rs-sub">Time taken: {mmss(secs)}{best ? ` · Previous best: ${best.score}/${best.total}` : ''}</p>} />
      </div>
    );
  }

  const x = items[i];
  const View = VIEWS[x.type];
  return (
    <div class="ps">
      <SessionTop done={i} total={items.length} label="Practice test" closeHref={back} />
      <div class="pt-timer" role="group" aria-label="Timer">
        {timer.off ? <span>Timer off</span> : <span role="timer" aria-label="Time left"><b class={timer.left <= 60 ? 'low' : ''}>{mmss(timer.left)}</b> left{timer.paused ? ' (paused)' : ''}</span>}
        {!timer.off && <button type="button" class="ps-round" onClick={() => setTimer(TIMER.pause(timer))}>{timer.paused ? 'Resume' : 'Pause'}</button>}
        {!timer.off && <button type="button" class="ps-round" onClick={() => setTimer(TIMER.off(timer))}>Turn off timer</button>}
      </div>
      <p class="lx-sr" aria-live="polite">{say}</p>
      {timer.paused ? (
        <div class="ps-empty"><h1>Paused</h1><p>Take a breath. The question is hidden until you resume.</p><button type="button" class="lx-btn" onClick={() => setTimer(TIMER.pause(timer))}>Resume</button></div>
      ) : (
        <>
          <span class="ps-tag lx-rise">Question {i + 1} of {items.length}</span>
          {x.passage && <Passage text={x.passage} />}
          <View key={x.key} x={x} seed={x.key} onDone={onDone} />
        </>
      )}
    </div>
  );
}
