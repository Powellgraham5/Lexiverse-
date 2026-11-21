import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { Segmented } from '../../components/controls.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { TIMER } from '../../lib/paths.js';
import { BANK_NOTE, loadBank, loadBankProgress, drawSet, recordBankSession, bestSession, seenCount } from '../../lib/bank.js';
import { recordActivity } from '../../lib/streak.js';
import { VIEWS } from '../Paths/exercises.jsx';
import '../../components/options.css';
import '../Learn/practice.css';
import '../Paths/paths.css';
import './bank.css';

const SECS_PER_QUESTION = 45;
const SIZES = [['20', '20'], ['40', '40'], ['60', '60'], ['all', 'All']];
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
const short = (q) => (q.length > 70 ? `${q.slice(0, 67)}…` : q);

// One subject's question bank: choose how many and whether to time it, answer, then review every answer.
export default function BankSession() {
  const { params } = useRoute();
  const [bank, setBank] = useState(undefined);
  const [prog, setProg] = useState(null);
  useEffect(() => {
    Promise.all([loadBank(params.subject), loadBankProgress(params.subject)])
      .then(([b, p]) => { setBank(b); setProg(p); }).catch(() => setBank(null));
  }, [params.subject]);
  usePage(bank ? `JAMB ${bank.title}` : 'JAMB practice');

  const [size, setSize] = useState('20');
  const [items, setItems] = useState([]);
  const [phase, setPhase] = useState('setup'); // setup | run | done
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const [timer, setTimer] = useState(null);
  const [say, setSay] = useState('');
  const picked = useRef({});
  const started = useRef(0);
  const back = '/learn/bank/jamb';

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

  function begin(set, timed) {
    if (!set.length) return;
    setItems(set.map((q) => ({ ...q, type: 'choice', key: q.id })));
    picked.current = {};
    started.current = Date.now();
    setLog([]); setI(0); setSay('');
    const t = TIMER.start(set.length * SECS_PER_QUESTION);
    setTimer(timed ? t : TIMER.off(t));
    setPhase('run');
  }
  const fresh = (timed) => begin(drawSet(bank.questions, size === 'all' ? bank.questions.length : Number(size), prog.seen), timed);

  async function finish(entries, timedOut = false) {
    const all = [...entries, ...items.slice(entries.length).map((x, k) => {
      const a = picked.current[entries.length + k];
      return a ? { ...a, id: x.id, word: short(x.q), link: false } : { ok: false, id: x.id, word: short(x.q), detail: `Not answered in time. The answer is “${x.options[x.answer]}”. ${x.why}`, link: false };
    })];
    setLog(all);
    setPhase('done');
    const secs = Math.round((Date.now() - started.current) / 1000);
    const next = await recordBankSession(bank.id, { score: all.filter((e) => e.ok).length, total: items.length, secs, ids: items.map((x) => x.id) }).catch(() => null);
    if (next) setProg(next);
    recordActivity('quiz', undefined, undefined, Math.max(1, Math.round(secs / 60)));
    if (timedOut) setSay('Time is up');
  }
  function onDone(ok, detail = '') {
    const x = items[i];
    const entries = [...log, { ok, id: x.id, word: short(x.q), detail: ok ? '' : detail, link: false }];
    setLog(entries);
    if (i + 1 >= items.length) finish(entries);
    else setI(i + 1);
  }

  if (bank === undefined) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="JAMB practice" closeHref={back} /><h1 class="lx-sr">JAMB practice</h1></div>;
  if (!bank) return <div class="ps"><SessionTop done={0} total={0} label="JAMB practice" closeHref={back} /><ErrorCard title="This subject isn't ready yet">Pick another subject.</ErrorCard><a class="lx-btn" href={back}>All subjects</a></div>;

  if (phase === 'setup') {
    const best = bestSession(prog);
    const n = size === 'all' ? bank.questions.length : Math.min(Number(size), bank.questions.length);
    return (
      <div class="ps">
        <SessionTop done={0} total={0} label="JAMB practice" closeHref={back} />
        <span class="ps-tag lx-rise">JAMB · {bank.questions.length} questions</span>
        <h1 class="lx-rise lx-d1">{bank.title}</h1>
        <ul class="ls-checklist lx-rise lx-d2">
          <li>A new random set each time, starting with questions you have not seen</li>
          <li>The answer and an explanation after every question, and a full review at the end</li>
          <li>Topics: {bank.topics.join(', ')}</li>
        </ul>
        <p class="pt-sub">{seenCount(prog)} of {bank.questions.length} seen{best ? ` · Best: ${best.score}/${best.total}` : ''}</p>
        <div class="bk-size lx-card lx-rise lx-d3">
          <Segmented label="How many questions?" value={size} onChange={setSize} options={SIZES} />
        </div>
        <p class="pd-note">{BANK_NOTE}</p>
        <div class="ps-foot">
          <button type="button" class="lx-btn" onClick={() => fresh(true)}>Timed: {Math.ceil((n * SECS_PER_QUESTION) / 60)} minutes</button>
          <button type="button" class="lx-btn secondary" onClick={() => fresh(false)}>Untimed: take your time</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const score = log.filter((e) => e.ok).length;
    const secs = Math.round((Date.now() - started.current) / 1000);
    const missed = log.filter((e) => !e.ok);
    const timed = !timer?.off;
    return (
      <div class="ps">
        <p class="lx-sr" aria-live="assertive">{say}</p>
        <Results title={say === 'Time is up' ? 'Time is up!' : 'Session complete!'} score={score} total={items.length} unit="correct"
          missed={missed} onRetry={() => fresh(timed)} retryLabel="New set of questions" doneHref={back} doneLabel="All subjects"
          extra={<>
            <p class="rs-sub">Time taken: {mmss(secs)}</p>
            {missed.length > 0 && <button type="button" class="lx-btn secondary" onClick={() => begin(items.filter((x) => missed.some((m) => m.id === x.id)), timed)}>Retry the {missed.length} you missed</button>}
          </>} />
      </div>
    );
  }

  const x = items[i];
  const View = VIEWS.choice;
  return (
    <div class="ps">
      <SessionTop done={i} total={items.length} label={bank.title} closeHref={back} />
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
          <span class="ps-tag lx-rise">Question {i + 1} of {items.length} · {x.topic}</span>
          <View key={x.key} x={x} onDone={onDone} onAnswer={(ok, detail) => { picked.current[i] = { ok, detail }; }} />
        </>
      )}
    </div>
  );
}
