import { useEffect, useRef, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { SpeakerIcon, SlowIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { useSession, minutesSince } from './session.js';
import { SessionTop } from './SessionTop.jsx';
import { SpellingFeedback } from './Quiz.jsx';
import { getReview, fresh, record, comesBack, gradeFor, isKnown } from '../../lib/srs.js';
import { recordActivity } from '../../lib/streak.js';
import { playAudioOr } from '../../lib/speech.js';
import '../../components/options.css';
import './practice.css';
import './spell.css';

const ROUNDS = 5;

export default function Spell() {
  usePage('Listen & spell');
  const [settings] = useSettings();
  const [round, setRound] = useState(0);
  const { cards, error, startedAt } = useSession({ size: ROUNDS }, round);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState(null);
  const [hint, setHint] = useState(false);
  const [log, setLog] = useState([]);
  const input = useRef(null);
  const c = cards?.[i];

  const hear = (rate = settings.speechRate) => c && playAudioOr(settings.accent === 'UK' ? c.audio?.uk : c.audio?.us, c.w, { accent: settings.accent, rate });
  useEffect(() => { if (c) { hear(); input.current?.focus(); } }, [c?.w]);

  async function check(e) {
    e.preventDefault();
    if (!typed.trim() || checked !== null) return;
    const ok = typed.trim().toLowerCase() === c.w;
    setChecked(typed);
    const before = (await getReview(c.w).catch(() => null)) || fresh(c.w);
    const g = gradeFor({ correct: ok, helped: hint });
    const after = await record(c.w, g).catch(() => null);
    setLog((l) => [...l, { word: c.w, ok, back: comesBack(before, g), known: !isKnown(before) && after && isKnown(after), detail: ok ? '' : `You typed “${typed.trim()}”.` }]);
  }
  function next() {
    setTyped(''); setChecked(null); setHint(false);
    if (i + 1 >= cards.length) recordActivity('review', undefined, undefined, minutesSince(startedAt));
    setI(i + 1);
  }

  if (error) return <div class="ps"><SessionTop done={0} total={0} label="Listen and spell" /><ErrorCard title="Practice didn't load">Try again in a moment.</ErrorCard></div>;
  if (!cards) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Listen and spell" /><h1 class="lx-sr">Listen and spell</h1></div>;
  if (i >= cards.length) {
    return (
      <div class="ps">
        <Results score={log.filter((x) => x.ok).length} total={log.length} unit="spelled right" known={log.filter((x) => x.known).length}
          missed={log.filter((x) => !x.ok)} onRetry={() => { setLog([]); setI(0); setRound(round + 1); }} />
      </div>
    );
  }
  const right = checked !== null && checked.trim().toLowerCase() === c.w;

  return (
    <div class="ps">
      <SessionTop done={i} total={cards.length} label="Listen and spell" />
      <span class="ps-tag">Listen &amp; spell</span>
      <h1>Type the word you hear</h1>
      <div class="sp-hear">
        <button type="button" class="sp-big" aria-label="Hear the word again" onClick={() => hear()}><SpeakerIcon size={40} /></button>
        <div class="sp-tools">
          <button type="button" class="ps-round" onClick={() => hear(0.6)}><SlowIcon size={18} />Slower</button>
          <button type="button" class="ps-round" aria-expanded={hint} onClick={() => setHint(true)} disabled={hint}>Hint</button>
        </div>
      </div>
      {hint && (
        <p class="sp-hint" role="status">
          {c.w.length} letters, starts with <b>{c.w[0]}</b>. It means: {c.def}
        </p>
      )}
      <form class="sp-form" onSubmit={check}>
        <label for="spell-in">Your spelling</label>
        <input id="spell-in" ref={input} class={`sp-input ${checked !== null ? (right ? 'right' : 'wrong') : ''}`} value={typed} readOnly={checked !== null}
          autocomplete="off" autocapitalize="off" spellcheck={false} placeholder="Type here" onInput={(e) => setTyped(e.currentTarget.value)} />
        {checked === null && <button type="submit" class="lx-btn sp-check" disabled={!typed.trim()}>Check</button>}
      </form>
      {checked !== null && (
        <div class="ps-foot">
          <div class={`lx-feedback lx-rise ${right ? 'right' : 'wrong'}`} role="status">
            <b>{right ? (hint ? 'Got it, with a hint!' : 'Spot on!') : 'Almost! Here is how it is spelled'}</b>
            {!right && <SpellingFeedback word={c.w} typed={checked} />}
            <span>{c.syl ? c.syl.join(' · ') : c.w}: {c.def}</span>
          </div>
          <button type="button" class="lx-btn" onClick={next}>{i + 1 >= cards.length ? 'See results' : 'Next word'}</button>
        </div>
      )}
    </div>
  );
}
