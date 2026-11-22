import { useEffect, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { Segmented } from '../../components/controls.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { TIMER } from '../../lib/paths.js';
import { BANK_NOTE, loadBank, loadBankProgress, drawSet, drawMix, loadMix, mySubjects, recordBankSession, bestSession, seenCount, weakTopics, scoreHistory } from '../../lib/bank.js';
import { readChallenge, challengeUrl, challengeText, whatsappUrl, loadName, saveName } from '../../lib/challenge.js';
import { tick } from '../../lib/plan.js';
import { ScoreChart, WeakTopics } from '../../components/ScoreChart.jsx';
import { toast } from '../../components/toast.jsx';
import { CopyIcon, ShareIcon } from '../../app/icons.jsx';
import { recordActivity } from '../../lib/streak.js';
import { VIEWS } from '../Paths/exercises.jsx';
import '../../components/options.css';
import '../Learn/practice.css';
import '../Paths/paths.css';
import './bank.css';

const SECS_PER_QUESTION = 45;
const SIZES = [['20', '20'], ['40', '40'], ['60', '60'], ['all', 'All']];
const MIX_SIZES = [['10', '10'], ['20', '20'], ['40', '40']];
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
const short = (q) => (q.length > 70 ? `${q.slice(0, 67)}…` : q);

// One subject's question bank: choose how many and whether to time it, answer, then review every answer.
export default function BankSession() {
  const { params, query } = useRoute();
  const challenge = readChallenge(query);
  const topic = query.topic ? String(query.topic) : '';
  const [bank, setBank] = useState(undefined);
  const [prog, setProg] = useState(null);
  const mix = params.subject === 'mix';
  const [seenBy, setSeenBy] = useState({});
  useEffect(() => {
    if (mix) {
      const ids = challenge?.subs.length ? challenge.subs : mySubjects();
      Promise.all([loadMix(ids), ...ids.map(loadBankProgress)])
        .then(([b, ...ps]) => {
          const by = Object.fromEntries(ids.map((id, k) => [id, ps[k].seen || {}]));
          setSeenBy(by);
          setBank(b);
          setProg({ seen: Object.assign({}, ...Object.values(by)), sessions: [] });
        }).catch(() => setBank(null));
      return;
    }
    Promise.all([loadBank(params.subject), loadBankProgress(params.subject)])
      .then(([b, p]) => { setBank(b); setProg(p); }).catch(() => setBank(null));
  }, [params.subject]);
  usePage(bank ? `JAMB ${bank.title}` : 'JAMB practice');

  const [size, setSize] = useState(mix ? '10' : '20');
  const [items, setItems] = useState([]);
  const [phase, setPhase] = useState('setup'); // setup | run | done
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const [timer, setTimer] = useState(null);
  const [say, setSay] = useState('');
  const picked = useRef({});
  const started = useRef(0);
  const took = useRef(0);
  const back = params.subject === 'mix' ? '/' : '/learn/bank/jamb';

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
  // A challenge replays the sender's exact questions; a topic session draws from one topic only.
  const challengeSet = () => challenge.ids.map((id) => bank.questions.find((q) => q.id === id)).filter(Boolean);
  const pool = !bank ? [] : topic ? bank.questions.filter((q) => q.topic === topic) : bank.questions;
  const fresh = (timed) => begin(
    challenge && phase === 'setup' ? challengeSet()
      : mix ? drawMix(bank, Number(size), seenBy)
      : drawSet(pool, size === 'all' ? pool.length : Math.min(Number(size), pool.length), prog.seen),
    timed);

  async function finish(entries, timedOut = false) {
    const all = [...entries, ...items.slice(entries.length).map((x, k) => {
      const a = picked.current[entries.length + k];
      return a ? { ...a, id: x.id, word: short(x.q), link: false } : { ok: false, id: x.id, word: short(x.q), detail: `Not answered in time. The answer is “${x.options[x.answer]}”. ${x.why}`, link: false };
    })];
    setLog(all);
    setPhase('done');
    const secs = Math.round((Date.now() - started.current) / 1000);
    took.current = secs;
    if (mix) {
      // Save each subject's share of the set to that subject's progress.
      for (const id of [...new Set(items.map((x) => x.subject))]) {
        const mine = items.map((x, k) => [x, all[k]]).filter(([x]) => x.subject === id);
        const saved = await recordBankSession(id, { score: mine.filter(([, e]) => e.ok).length, total: mine.length, secs: Math.round((secs * mine.length) / items.length), ids: mine.map(([x]) => x.id), results: mine.map(([x, e]) => ({ topic: x.topic, ok: e.ok })) }).catch(() => null);
        if (saved) setSeenBy((m) => ({ ...m, [id]: saved.seen }));
      }
    } else {
      const next = await recordBankSession(bank.id, { score: all.filter((e) => e.ok).length, total: items.length, secs, ids: items.map((x) => x.id), results: items.map((x, k) => ({ topic: x.topic, ok: all[k].ok })) }).catch(() => null);
      if (next) setProg(next);
    }
    recordActivity('quiz', undefined, undefined, Math.max(1, Math.round(secs / 60)));
    tick(mix ? 'mix' : 'bank');
    if (topic) tick('topic');
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

  if (phase === 'setup' && challenge && !challengeSet().length) {
    return <div class="ps"><SessionTop done={0} total={0} label="JAMB practice" closeHref={back} /><ErrorCard title="This challenge link doesn't work">It may have been cut short when it was shared. You can still practise this subject.</ErrorCard><a class="lx-btn" href={`/learn/bank/jamb/${params.subject}`}>Practise {bank.title}</a></div>;
  }
  if (phase === 'setup') {
    const best = bestSession(prog);
    const n = size === 'all' ? bank.questions.length : Math.min(Number(size), bank.questions.length);
    return (
      <div class="ps">
        <SessionTop done={0} total={0} label="JAMB practice" closeHref={back} />
        <span class="ps-tag lx-rise">JAMB · {mix ? bank.topics.join(', ') : `${bank.questions.length} questions`}</span>
        <h1 class="lx-rise lx-d1">{bank.title}{topic && !challenge ? `: ${topic}` : ''}</h1>
        {challenge && (
          <div class="bk-challenge lx-card lx-rise lx-d1" role="note">
            <b>{challenge.name || 'A friend'} challenged you</b>
            <span>{challenge.score !== null ? `They scored ${challenge.score}/${challenge.total}. ` : ''}Answer the same {challengeSet().length} questions to see who wins.</span>
          </div>
        )}
        <ul class="ls-checklist lx-rise lx-d2">
          <li>A new random set each time, starting with questions you have not seen</li>
          <li>The answer and an explanation after every question, and a full review at the end</li>
          <li>{mix ? 'Questions from each of your subjects, mixed together' : `Topics: ${bank.topics.join(', ')}`}</li>
        </ul>
        {!mix && <p class="pt-sub">{seenCount(prog)} of {bank.questions.length} seen{best ? ` · Best: ${best.score}/${best.total}` : ''}</p>}
        {!challenge && (
          <div class="bk-size lx-card lx-rise lx-d3">
            <Segmented label="How many questions?" value={size} onChange={setSize} options={mix ? MIX_SIZES : SIZES} />
          </div>
        )}
        {!mix && !challenge && !topic && <WeakTopics id="bk-weak" topics={weakTopics(prog)} hrefFor={(t) => `/learn/bank/jamb/${bank.id}?topic=${encodeURIComponent(t.topic)}`} />}
        {!mix && !challenge && scoreHistory(prog).length > 1 && <div class="lx-card bk-chart"><ScoreChart id="bk-chart" title="Your scores" points={scoreHistory(prog)} /></div>}
        <p class="pd-note">{BANK_NOTE}</p>
        <div class="ps-foot">
          <button type="button" class="lx-btn" onClick={() => fresh(true)}>Timed: {Math.ceil(((challenge ? challengeSet().length : topic ? Math.min(n, pool.length) : n) * SECS_PER_QUESTION) / 60)} minutes</button>
          <button type="button" class="lx-btn secondary" onClick={() => fresh(false)}>Untimed: take your time</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const score = log.filter((e) => e.ok).length;
    const secs = took.current;
    const missed = log.filter((e) => !e.ok);
    const timed = !timer?.off;
    const vs = challenge && challenge.score !== null
      ? (score > challenge.score ? 'You win!' : score === challenge.score ? "It's a draw!" : `${challenge.name || 'Your friend'} wins this time`)
      : null;
    return (
      <div class="ps">
        <p class="lx-sr" aria-live="assertive">{say}</p>
        <Results title={say === 'Time is up' ? 'Time is up!' : vs || 'Session complete!'} score={score} total={items.length} unit="correct"
          missed={missed} onRetry={() => fresh(timed)} retryLabel="New set of questions" doneHref={back} doneLabel={mix ? "Back home" : "All subjects"}
          extra={<>
            <p class="rs-sub">Time taken: {mmss(secs)}{vs ? ` · ${challenge.name || 'Your friend'} scored ${challenge.score}/${challenge.total}` : ''}</p>
            <ChallengeBox bank={bank} items={items} score={score} subs={mix ? [...new Set(items.map((x) => x.subject))] : []} />
            {missed.length > 0 && <button type="button" class="lx-btn secondary" onClick={() => begin(items.filter((x) => missed.some((m) => m.id === x.id)), timed)}>Retry the {missed.length} you missed</button>}
          </>} />
      </div>
    );
  }

  const x = items[i];
  const View = VIEWS.choice;
  return (
    <div class="ps">
      <SessionTop done={i} total={items.length} label={bank.title} closeHref={back} confirm={i > 0} />
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
          <span class="ps-tag lx-rise">Question {i + 1} of {items.length} · {x.topic}</span>
          <View key={x.key} x={x} onDone={onDone} onAnswer={(ok, detail) => { picked.current[i] = { ok, detail }; }} />
      </div>
    </div>
  );
}

// After a set: send the same questions to a friend on WhatsApp (or any app, or copy the link).
function ChallengeBox({ bank, items, score, subs }) {
  const [name, setName] = useState(loadName);
  const url = challengeUrl(location.origin, { subject: bank.id, ids: items.map((x) => x.id), score, total: items.length, name, subs });
  const text = challengeText(bank.title, score, items.length, url);
  const keep = () => saveName(name);
  const copy = async () => {
    keep();
    try { await navigator.clipboard.writeText(text); toast({ text: 'Challenge link copied', kind: 'success' }); }
    catch { toast({ text: "Couldn't copy the link", kind: 'error' }); }
  };
  const more = async () => { keep(); try { await navigator.share({ title: 'Lexiverse challenge', text }); } catch { /* cancelled */ } };
  return (
    <section class="bk-chbox lx-card" aria-labelledby="bk-ch">
      <h2 id="bk-ch">Challenge a friend</h2>
      <p>Send these same {items.length} questions. Your friend sees your score when they finish.</p>
      <label class="bk-name"><span>Your first name (optional)</span><input type="text" autocomplete="given-name" maxLength={20} value={name} onInput={(e) => setName(e.currentTarget.value)} /></label>
      <div class="bk-chrow">
        <a class="lx-btn" href={whatsappUrl(text)} target="_blank" rel="noopener" onClick={keep}><ShareIcon />Send on WhatsApp</a>
        <button type="button" class="lx-btn secondary" onClick={copy}><CopyIcon />Copy link</button>
        {typeof navigator !== 'undefined' && navigator.share && <button type="button" class="lx-btn secondary" onClick={more}>More apps</button>}
      </div>
    </section>
  );
}
