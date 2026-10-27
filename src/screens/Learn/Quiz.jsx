import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { SpeakerIcon, CheckIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { useSession, loadPrefs } from './session.js';
import { SessionTop } from './SessionTop.jsx';
import { buildQuiz, diffSpelling } from '../../lib/practice.js';
import { getReview, fresh, record, comesBack, gradeFor, isKnown } from '../../lib/srs.js';
import { recordActivity } from '../../lib/streak.js';
import { playAudioOr } from '../../lib/speech.js';
import '../../components/options.css';
import './practice.css';
import './spell.css';

const KEYS = 'ABCD';

export function SpellingFeedback({ word, typed }) {
  const parts = diffSpelling(word, typed);
  return (
    <span class="sp-letters" aria-label={`The spelling is ${word.split('').join(' ')}`}>
      {parts.map((p, i) => (
        <span key={i} class={`sp-l ${p.status}`} aria-hidden="true">{p.ch}</span>
      ))}
    </span>
  );
}

export default function Quiz() {
  const { query } = useLocation();
  const mixed = query.mode === 'mix';
  usePage(mixed ? 'Practice' : 'Quick quiz');
  const [settings] = useSettings();
  const prefs = loadPrefs();
  const [round, setRound] = useState(0);
  const { cards, daily, error } = useSession(mixed ? { size: prefs.size, from: prefs.from } : { size: 5 }, round);
  const questions = useMemo(() => cards && buildQuiz(cards, daily, `quiz${round}`, mixed ? prefs.size : 5, mixed ? prefs.types : ['meaning', 'gap']), [cards]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [typed, setTyped] = useState('');
  const [log, setLog] = useState([]);
  const input = useRef(null);
  const q = questions?.[i];
  const answered = picked !== null;
  const right = answered && (q.kind === 'typed' ? picked.trim().toLowerCase() === q.word : picked === q.answer);

  const hear = (rate = settings.speechRate) => q && playAudioOr(settings.accent === 'UK' ? q.card.audio?.uk : q.card.audio?.us, q.word, { accent: settings.accent, rate });
  useEffect(() => { if (q?.listen) hear(); if (q?.kind === 'typed') input.current?.focus(); }, [i, questions]);

  async function answer(value) {
    if (answered) return;
    setPicked(value);
    const ok = q.kind === 'typed' ? value.trim().toLowerCase() === q.word : value === q.answer;
    const before = (await getReview(q.word).catch(() => null)) || fresh(q.word);
    const g = gradeFor({ correct: ok });
    const after = await record(q.word, g).catch(() => null);
    setLog((l) => [...l, {
      word: q.word, ok, back: comesBack(before, g), known: !isKnown(before) && after && isKnown(after),
      detail: ok ? '' : q.kind === 'typed' ? `You typed “${value.trim()}”.` : `You chose “${q.options[value]}”. ${q.why}`
    }]);
  }
  function next() {
    setPicked(null); setTyped('');
    if (i + 1 >= questions.length) recordActivity('review');
    setI(i + 1);
  }

  const label = mixed ? 'Practice' : 'Quick quiz';
  if (error) return <div class="ps"><SessionTop done={0} total={0} label={label} /><ErrorCard title="Practice didn't load">Try again in a moment.</ErrorCard></div>;
  if (!questions) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label={label} /><h1 class="lx-sr">{label}</h1></div>;
  if (i >= questions.length) {
    const score = log.filter((x) => x.ok).length;
    return (
      <div class="ps">
        <Results score={score} total={log.length} known={log.filter((x) => x.known).length}
          missed={log.filter((x) => !x.ok)} onRetry={() => { setLog([]); setI(0); setRound(round + 1); }}
          doneHref="/learn" doneLabel="Done"
          extra={log.some((x) => !x.ok) && <p class="rs-sub">Words you missed will come back in your next review.</p>} />
      </div>
    );
  }

  return (
    <div class="ps">
      <SessionTop done={i} total={questions.length} label={label} />
      <span class="ps-tag lx-rise">{q.type}</span>
      <h1 class="lx-rise lx-d1">{q.text}</h1>
      {q.listen && (
        <div class="sp-hear lx-rise lx-d1">
          <button type="button" class="sp-big" aria-label="Hear the word" onClick={() => hear()}><SpeakerIcon size={36} /></button>
          <button type="button" class="ps-round" onClick={() => hear(0.6)}>Slower</button>
        </div>
      )}

      {q.kind === 'choice' && (
        <div role="group" aria-label="Answers" class={`lx-opts ${q.options.every((o) => o.length <= 40) ? 'short' : ''}`}>
          {q.options.map((o, k) => {
            const st = answered && k === q.answer ? 'right' : answered && k === picked ? 'wrong' : answered ? 'dim' : '';
            return (
              <button key={o} type="button" class={`lx-opt lx-rise lx-d${Math.min(k + 2, 4)} ${st}`} aria-disabled={answered} onClick={() => answer(k)}>
                <span class="lx-opt-key">{st === 'right' ? <><CheckIcon size={16} /><span class="lx-sr">{KEYS[k]}</span></> : KEYS[k]}</span>
                <span>{o}</span>
                {st === 'right' && <span class="lx-sr">, correct answer</span>}
                {st === 'wrong' && <span class="lx-sr">, your answer, not correct</span>}
              </button>
            );
          })}
        </div>
      )}

      {q.kind === 'typed' && (
        <form class="sp-form" onSubmit={(e) => { e.preventDefault(); if (typed.trim()) answer(typed); }}>
          <label for="sp-in">Your spelling</label>
          <input id="sp-in" ref={input} class={`sp-input ${answered ? (right ? 'right' : 'wrong') : ''}`} value={typed} readOnly={answered}
            autocomplete="off" autocapitalize="off" spellcheck={false} placeholder="Type here" onInput={(e) => setTyped(e.currentTarget.value)} />
          {!answered && <button type="submit" class="lx-btn" disabled={!typed.trim()}>Check</button>}
        </form>
      )}

      {answered && (
        <div class="ps-foot">
          <div class={`lx-feedback lx-rise ${right ? 'right' : 'wrong'}`} role="status">
            <b>{right ? 'Brilliant!' : q.kind === 'typed' ? 'Almost! Here is how it is spelled' : `Not quite. The answer is “${q.options[q.answer]}”`}</b>
            {q.kind === 'typed' && !right && <SpellingFeedback word={q.word} typed={picked} />}
            <span>{q.why}</span>
          </div>
          <button type="button" class="lx-btn" onClick={next} autofocus>{i + 1 >= questions.length ? 'See results' : 'Continue'}</button>
        </div>
      )}
    </div>
  );
}
