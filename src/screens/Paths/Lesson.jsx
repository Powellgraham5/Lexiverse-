import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { CheckIcon, CloseIcon, ChevronIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { SessionTop } from '../Learn/SessionTop.jsx';
import { loadPath, lessonsOf, markLessonDone } from '../../lib/paths.js';
import { checkWriting, words } from '../../lib/writing.js';
import { recordActivity } from '../../lib/streak.js';
import { shuffle } from '../../lib/hash.js';
import '../../components/options.css';
import '../Learn/practice.css';
import './paths.css';

const KEYS = 'ABCDEF';
const scored = (x) => x.type !== 'write';

// Reading passages sit behind a toggle so the question stays in view on a phone.
function Passage({ text }) {
  return (
    <details class="ls-passage" open>
      <summary>Passage</summary>
      <p>{text}</p>
    </details>
  );
}

function Feedback({ ok, title, why, extra }) {
  return (
    <div class={`lx-feedback lx-rise ${ok ? 'right' : 'wrong'}`} role="status">
      <b>{title}</b>
      {extra}
      {why && <span>{why}</span>}
    </div>
  );
}

function Choice({ x, onDone }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  const ok = picked === x.answer;
  const gap = x.type === 'gap';
  return (
    <>
      {gap ? <h1 class="ls-q lx-rise">{x.q.split('___').map((part, i) => (i ? [<span key={i} class="ls-blank">{answered ? x.options[x.answer] : <span class="lx-sr">blank</span>}</span>, part] : part))}</h1>
        : <h1 class="ls-q lx-rise">{x.q}</h1>}
      <div role="group" aria-label="Answers" class={`lx-opts ${x.options.every((o) => o.length <= 40) ? 'short' : ''}`}>
        {x.options.map((o, k) => {
          const st = answered && k === x.answer ? 'right' : answered && k === picked ? 'wrong' : answered ? 'dim' : '';
          return (
            <button key={o} type="button" class={`lx-opt ${st}`} aria-disabled={answered} onClick={() => !answered && setPicked(k)}>
              <span class="lx-opt-key">{st === 'right' ? <><CheckIcon size={16} /><span class="lx-sr">{KEYS[k]}</span></> : KEYS[k]}</span>
              <span>{o}</span>
              {st === 'right' && <span class="lx-sr">, correct answer</span>}
              {st === 'wrong' && <span class="lx-sr">, your answer, not correct</span>}
            </button>
          );
        })}
      </div>
      {answered && <Foot><Feedback ok={ok} title={ok ? 'Brilliant!' : `Not quite. The answer is “${x.options[x.answer]}”`} why={x.why} /><Next onClick={() => onDone(ok, ok ? '' : `You chose “${x.options[picked]}”. ${x.why}`)} /></Foot>}
    </>
  );
}

function SpotError({ x, onDone }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  const ok = picked === x.answer;
  return (
    <>
      <h1 class="ls-q lx-rise">{x.q}</h1>
      <p class="ls-hint">Tap the part of the sentence that is wrong.</p>
      <div role="group" aria-label="Parts of the sentence" class="ls-parts">
        {x.parts.map((part, k) => {
          const st = answered && k === x.answer ? 'wrong-part' : answered && k === picked ? 'picked' : '';
          return (
            <button key={k} type="button" class={`ls-part ${st}`} aria-disabled={answered} onClick={() => !answered && setPicked(k)}>
              <span class="lx-sr">Part {KEYS[k]}: </span>{part}
              {answered && k === x.answer && <span class="lx-sr">, this is the mistake</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <Foot>
          <Feedback ok={ok} title={ok ? 'Well spotted!' : `Not quite. The mistake is “${x.parts[x.answer]}”`}
            extra={<span>Correct: <b>{x.fix}</b></span>} why={x.why} />
          <Next onClick={() => onDone(ok, ok ? '' : `The mistake was “${x.parts[x.answer]}”. ${x.why}`)} />
        </Foot>
      )}
    </>
  );
}

function Order({ x, seed, onDone }) {
  const start = useMemo(() => {
    let s = shuffle(x.parts, seed);
    if (s.every((p, i) => p === x.parts[i])) s = [...s.slice(1), s[0]];
    return s;
  }, [x]);
  const [items, setItems] = useState(start);
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState('');
  const ok = items.every((p, i) => p === x.parts[i]);
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    setMsg(`${next[j]} moved to position ${j + 1}`);
  };
  return (
    <>
      <h1 class="ls-q lx-rise">{x.q}</h1>
      <p class="ls-hint">Use the arrows to move each part into place, then check.</p>
      <ol class="ls-order" aria-label="Parts to put in order">
        {items.map((p, i) => (
          <li key={p} class={checked ? (p === x.parts[i] ? 'right' : 'wrong') : ''}>
            <span class="ls-order-n" aria-hidden="true">{i + 1}</span>
            <span class="ls-order-text">{p}{checked && <span class="lx-sr">{p === x.parts[i] ? ', in the right place' : ', in the wrong place'}</span>}</span>
            {!checked && (
              <span class="ls-order-btns">
                <button type="button" aria-label={`Move “${p}” up`} disabled={i === 0} onClick={() => move(i, -1)}><ChevronIcon size={18} /></button>
                <button type="button" aria-label={`Move “${p}” down`} disabled={i === items.length - 1} onClick={() => move(i, 1)}><ChevronIcon size={18} /></button>
              </span>
            )}
          </li>
        ))}
      </ol>
      <p class="lx-sr" aria-live="polite">{msg}</p>
      {!checked ? <div class="ps-foot"><button type="button" class="lx-btn" onClick={() => setChecked(true)}>Check order</button></div> : (
        <Foot>
          <Feedback ok={ok} title={ok ? 'Perfect order!' : 'Not quite. Here is the right order:'}
            extra={!ok && <ol class="ls-right-order">{x.parts.map((p) => <li key={p}>{p}</li>)}</ol>} why={x.why} />
          <Next onClick={() => onDone(ok, ok ? '' : `Right order: ${x.parts.join(' → ')}.`)} />
        </Foot>
      )}
    </>
  );
}

function Write({ x, onDone }) {
  const [text, setText] = useState('');
  const [checks, setChecks] = useState(null);
  const [model, setModel] = useState(false);
  const n = words(text).length;
  return (
    <>
      <span class="ps-tag lx-rise">Writing task</span>
      <h1 class="ls-q lx-rise">{x.q}</h1>
      <ul class="ls-checklist">{x.checklist.map((c) => <li key={c}>{c}</li>)}</ul>
      <label for="ls-write" class="lx-sr">Your answer</label>
      <textarea id="ls-write" class="ls-write" rows="10" value={text} placeholder="Write here…" onInput={(e) => { setText(e.currentTarget.value); setChecks(null); }} />
      <p class="ls-count" aria-live="polite">{n} words · aim for {x.minWords} to {x.maxWords}</p>
      <div class="ps-foot">
        <button type="button" class="lx-btn secondary" disabled={!text.trim()} onClick={() => setChecks(checkWriting(text, x))}>Check my writing</button>
        {checks && (
          <section class="ls-checks lx-rise" aria-labelledby="ls-checks-h">
            <h2 id="ls-checks-h">Automatic checks</h2>
            <p class="ls-hint">These look at length, layout and linking words. They can’t judge your ideas, so compare with the model answer too.</p>
            <ul>{checks.map((c) => <li key={c.label} class={c.ok ? 'ok' : 'bad'}>{c.ok ? <CheckIcon size={18} /> : <CloseIcon size={18} />}<span><b>{c.label}</b><span>{c.tip}</span></span></li>)}</ul>
          </section>
        )}
        {(checks || model) && <button type="button" class="lx-btn ghost" aria-expanded={model} onClick={() => setModel(!model)}>{model ? 'Hide model answer' : 'See a model answer'}</button>}
        {model && <div class="ls-model lx-card"><h2>Model answer</h2>{x.model.split('\n').map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}</div>}
        {checks && <Next onClick={() => onDone(null)} />}
      </div>
    </>
  );
}

const Foot = ({ children }) => <div class="ps-foot">{children}</div>;
// Continue takes focus as soon as feedback appears, so keyboard and screen reader users can go on.
function Next({ onClick }) {
  const ref = useRef(null);
  // After the frame, so the Enter that chose the answer does not also press Continue.
  useEffect(() => { const t = setTimeout(() => ref.current?.focus({ preventScroll: true }), 50); return () => clearTimeout(t); }, []);
  return <button type="button" class="lx-btn" ref={ref} onClick={onClick}>Continue</button>;
}

export default function Lesson() {
  const { params } = useRoute();
  const [path, setPath] = useState(undefined);
  useEffect(() => { loadPath(params.id).then(setPath).catch(() => setPath(null)); }, [params.id]);
  const lessons = path ? lessonsOf(path) : [];
  const lesson = lessons.find((l) => l.id === params.lesson);
  usePage(lesson?.title || 'Lesson');
  const [stage, setStage] = useState({ part: 'cards', i: 0 });
  const [log, setLog] = useState([]);
  const started = useRef(Date.now());

  useEffect(() => { setStage({ part: 'cards', i: 0 }); setLog([]); started.current = Date.now(); }, [params.lesson]);
  // Each new card or exercise moves focus to its heading, so screen readers start at the top.
  useEffect(() => { const h = document.querySelector('#main h1'); if (h && stage.i + (stage.part === 'cards' ? 0 : 1) > 0) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } scrollTo(0, 0); }, [stage]);

  const back = `/learn/path/${params.id}`;
  if (path === undefined) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Lesson" closeHref={back} /><h1 class="lx-sr">Lesson</h1></div>;
  if (!path || !lesson) return <div class="ps"><SessionTop done={0} total={0} label="Lesson" closeHref="/learn/paths" /><ErrorCard title="This lesson isn't here">Go back to the path and pick a lesson.</ErrorCard><a class="lx-btn" href="/learn/paths">All paths</a></div>;

  const steps = lesson.cards.length + lesson.exercises.length;
  const at = stage.part === 'cards' ? stage.i : lesson.cards.length + stage.i;
  const nextLesson = lessons[lessons.indexOf(lesson) + 1];

  async function finish(entries) {
    const graded = entries.filter((e) => e.ok !== null);
    const score = graded.filter((e) => e.ok).length;
    await markLessonDone(path.id, lesson.id, { score, total: graded.length }).catch(() => {});
    recordActivity('review', undefined, undefined, Math.max(1, Math.round((Date.now() - started.current) / 60000)));
    setStage({ part: 'done', i: 0 });
  }
  function exerciseDone(ok, detail = '') {
    const x = lesson.exercises[stage.i];
    const entries = [...log, { ok: scored(x) ? ok : null, word: x.q.length > 60 ? `${x.q.slice(0, 57)}…` : x.q, detail }];
    setLog(entries);
    if (stage.i + 1 >= lesson.exercises.length) finish(entries);
    else setStage({ part: 'ex', i: stage.i + 1 });
  }

  if (stage.part === 'done') {
    const graded = log.filter((e) => e.ok !== null);
    return (
      <div class="ps">
        <Results title="Lesson complete!" score={graded.filter((e) => e.ok).length} total={graded.length} unit="correct"
          missed={graded.filter((e) => !e.ok).map((e) => ({ word: e.word, detail: e.detail, link: false }))}
          onRetry={() => { setLog([]); setStage({ part: 'cards', i: 0 }); started.current = Date.now(); }} retryLabel="Do it again"
          doneHref={nextLesson ? `/learn/path/${path.id}/${nextLesson.id}` : back} doneLabel={nextLesson ? `Next: ${nextLesson.title}` : 'Back to the path'}
          extra={nextLesson && <a class="lx-btn ghost" href={back}>Back to the path</a>} />
      </div>
    );
  }

  if (stage.part === 'cards') {
    const card = lesson.cards[stage.i];
    const last = stage.i + 1 >= lesson.cards.length;
    return (
      <div class="ps">
        <SessionTop done={at} total={steps} label={lesson.title} closeHref={back} />
        <span class="ps-tag lx-rise">{lesson.title} · {stage.i + 1} of {lesson.cards.length}</span>
        <h1 class="lx-rise lx-d1">{card.title}</h1>
        <p class="ls-body lx-rise lx-d2">{card.body}</p>
        {card.examples?.length > 0 && (
          <ul class="ls-examples lx-rise lx-d3">
            {card.examples.map((e) => (
              <li key={e.text} class={e.good === false ? 'bad' : 'good'}>
                {e.good === false ? <CloseIcon size={18} /> : <CheckIcon size={18} />}
                <span><span class="lx-sr">{e.good === false ? 'Avoid: ' : 'Example: '}</span>{e.text}{e.note && <small>{e.note}</small>}</span>
              </li>
            ))}
          </ul>
        )}
        <div class="ps-foot">
          <button type="button" class="lx-btn" onClick={() => setStage(last ? { part: 'ex', i: 0 } : { part: 'cards', i: stage.i + 1 })}>{last ? 'Start the practice' : 'Next'}</button>
          {stage.i > 0 && <button type="button" class="lx-btn ghost" onClick={() => setStage({ part: 'cards', i: stage.i - 1 })}>Back</button>}
        </div>
      </div>
    );
  }

  const x = lesson.exercises[stage.i];
  const View = { choice: Choice, gap: Choice, error: SpotError, order: Order, write: Write }[x.type];
  return (
    <div class="ps">
      <SessionTop done={at} total={steps} label={lesson.title} closeHref={back} />
      {x.type !== 'write' && <span class="ps-tag lx-rise">Practice · {stage.i + 1} of {lesson.exercises.length}</span>}
      {x.passage && <Passage text={x.passage} />}
      <View key={`${lesson.id}-${stage.i}`} x={x} seed={`${lesson.id}${stage.i}`} onDone={exerciseDone} />
    </div>
  );
}
