import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { CheckIcon, CloseIcon, ChevronIcon } from '../../app/icons.jsx';
import { checkWriting, words } from '../../lib/writing.js';
import { speak, stopSpeaking, canSpeak } from '../../lib/speech.js';
import { SpeakerIcon } from '../../app/icons.jsx';
import '../Learn/spell.css';
import { shuffle } from '../../lib/hash.js';
import '../../components/options.css';
import '../Learn/practice.css';
import './paths.css';

// Exercise views shared by lessons and timed practice tests. Each calls onDone(ok, detail);
// ok is null for tasks that are not scored (writing, speaking).
const KEYS = 'ABCDEF';
export const scored = (x) => !['write', 'speak'].includes(x.type);

// Reading passages sit behind a toggle so the question stays in view on a phone.
export function Passage({ text }) {
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

// Listening: the device voice reads a short script, then a choice question. A transcript is
// always available, so deaf and hard-of-hearing learners can still do the exercise.
function Listen({ x, onDone }) {
  const [played, setPlayed] = useState(0);
  const [script, setScript] = useState(!canSpeak());
  useEffect(() => () => stopSpeaking(), []);
  const play = (rate = 0.95) => { setPlayed((n) => n + 1); speak(x.script, { accent: x.accent || 'UK', rate }); };
  return (
    <>
      <span class="ps-tag lx-rise">Listening</span>
      <div class="ls-listen lx-rise">
        <button type="button" class="sp-big" aria-label="Play the recording" onClick={() => play()} disabled={!canSpeak()}><SpeakerIcon size={36} /></button>
        <button type="button" class="ps-round" onClick={() => play(0.7)} disabled={!canSpeak()}>Slower</button>
        <button type="button" class="ps-round" aria-expanded={script} onClick={() => setScript(!script)}>{script ? 'Hide transcript' : 'Read the transcript'}</button>
      </div>
      {!canSpeak() && <p class="ls-hint">Your device has no voice, so the transcript is shown.</p>}
      {played > 0 && <p class="ls-hint">Played {played} time{played === 1 ? '' : 's'}. In the real test you hear it once.</p>}
      {script && <p class="ls-passage ls-script">{x.script}</p>}
      <Choice x={{ ...x, type: 'choice' }} onDone={onDone} />
    </>
  );
}

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// Speaking: a cue card with 1 minute to prepare and 2 minutes to talk, like IELTS Speaking Part 2.
// Nothing is recorded; the learner checks themselves against the list.
function Speak({ x, onDone }) {
  const [phase, setPhase] = useState('ready'); // ready | prep | talk | done
  const [left, setLeft] = useState(x.prep || 60);
  const [paused, setPaused] = useState(false);
  const [say, setSay] = useState('');
  useEffect(() => {
    if (!['prep', 'talk'].includes(phase) || paused) return undefined;
    const t = setInterval(() => setLeft((n) => n - 1), 1000);
    return () => clearInterval(t);
  }, [phase, paused]);
  useEffect(() => {
    if (left > 0) { if (left === 10) setSay('10 seconds left'); return; }
    if (phase === 'prep') { setPhase('talk'); setLeft(x.talk || 120); setSay('Start speaking now'); }
    else if (phase === 'talk') { setPhase('done'); setSay('Time is up'); }
  }, [left]);
  return (
    <>
      <span class="ps-tag lx-rise">Speaking</span>
      <h1 class="ls-q lx-rise">{x.q}</h1>
      <div class="ls-cue lx-card">
        <p>You should say:</p>
        <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
      </div>
      <p class="lx-sr" aria-live="assertive">{say}</p>
      {phase === 'ready' && <div class="ps-foot"><button type="button" class="lx-btn" onClick={() => { setPhase('prep'); setLeft(x.prep || 60); setSay('One minute to prepare'); }}>Start: {mmss(x.prep || 60)} to prepare</button></div>}
      {(phase === 'prep' || phase === 'talk') && (
        <div class="ls-timer lx-rise" role="timer" aria-label={phase === 'prep' ? 'Preparation time left' : 'Speaking time left'}>
          <span class="ls-timer-label">{phase === 'prep' ? 'Prepare: make notes' : 'Speak now'}</span>
          <b>{mmss(left)}</b>
          <div class="ls-timer-btns">
            <button type="button" class="ps-round" onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
            <button type="button" class="ps-round" onClick={() => setLeft(0)}>{phase === 'prep' ? 'Start speaking' : 'Finish'}</button>
          </div>
        </div>
      )}
      {phase === 'done' && (
        <Foot>
          <div class="lx-feedback right" role="status"><b>Well done. Check yourself:</b><ul class="ls-checklist">{x.checklist.map((c) => <li key={c}>{c}</li>)}</ul></div>
          <Next onClick={() => onDone(null)} />
        </Foot>
      )}
    </>
  );
}

export const VIEWS = { choice: Choice, gap: Choice, error: SpotError, order: Order, write: Write, listen: Listen, speak: Speak };
