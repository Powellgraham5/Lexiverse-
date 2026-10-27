import { useEffect, useRef, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { SpeakerIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { Results } from '../../components/Results.jsx';
import { useSession } from './session.js';
import { SessionTop } from './SessionTop.jsx';
import { getReview, fresh, record, comesBack, isKnown } from '../../lib/srs.js';
import { recordActivity } from '../../lib/streak.js';
import { playAudioOr } from '../../lib/speech.js';
import './practice.css';
import './flashcards.css';

const GRADES = [['forgot', 'Forgot'], ['almost', 'Almost'], ['got', 'Got it']];

export default function Flashcards() {
  usePage('Flashcards');
  const [settings] = useSettings();
  const [round, setRound] = useState(0);
  const { cards, error } = useSession({}, round);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [state, setState] = useState(null);
  const [results, setResults] = useState([]);
  const card = cards?.[i];

  useEffect(() => { if (card) getReview(card.w).then((r) => setState(r || fresh(card.w))).catch(() => setState(fresh(card.w))); }, [card?.w]);

  async function grade(g) {
    // Works even if the word's review history hasn't loaded yet (a fast key press).
    const before = state || fresh(card.w);
    const after = await record(card.w, g).catch(() => null);
    const res = [...results, { word: card.w, grade: g, back: comesBack(before, g), known: !isKnown(before) && after && isKnown(after) }];
    setResults(res);
    setFlipped(false);
    if (i + 1 >= cards.length) recordActivity('review');
    setI(i + 1);
  }

  // Keys 1, 2, 3 grade a flipped card. One listener reads the latest state through a ref, so a key
  // pressed straight after flipping is never missed.
  const live = useRef(null);
  live.current = { flipped, grade };
  useEffect(() => {
    const onKey = (e) => {
      const { flipped: f, grade: gradeNow } = live.current;
      if (!f || e.target.closest('input, textarea')) return;
      const g = GRADES[Number(e.key) - 1];
      if (g) { e.preventDefault(); gradeNow(g[0]); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  if (error) return <div class="ps"><SessionTop done={0} total={0} label="Flashcards" /><ErrorCard title="Practice didn't load">Try again in a moment.</ErrorCard></div>;
  if (!cards) return <div class="ps" aria-busy="true"><SessionTop done={0} total={0} label="Flashcards" /><h1 class="lx-sr">Flashcards</h1><span class="lx-skeleton fc-sk" /></div>;

  if (i >= cards.length) {
    const missed = results.filter((r) => r.grade !== 'got');
    const counts = Object.fromEntries(GRADES.map(([g]) => [g, results.filter((r) => r.grade === g).length]));
    return (
      <div class="ps">
        <Results title="Your world grew!" score={counts.got} total={results.length} unit="got it"
          known={results.filter((r) => r.known).length}
          missed={missed.map((r) => ({ word: r.word, back: r.back, detail: r.grade === 'forgot' ? 'You chose Forgot.' : 'You chose Almost.' }))}
          onRetry={() => { setResults([]); setI(0); setRound(round + 1); }} retryLabel="Again"
          doneHref="/learn/quiz" doneLabel="Take a quiz" />
      </div>
    );
  }

  return (
    <div class="ps">
      <SessionTop done={i} total={cards.length} label="Flashcards" />
      <h1 class="lx-sr">Flashcards</h1>
      {/* Only the face you can see is readable, so the button's name always matches what is shown. */}
      <button type="button" class={`fc-card ${flipped ? 'flipped' : ''}`} aria-expanded={flipped} onClick={() => setFlipped(!flipped)}>
        <span class="fc-inner">
          <span class="fc-face fc-front" aria-hidden={flipped ? 'true' : undefined}>
            <span class="fc-kicker">What does it mean?</span>
            <b>{card.w}</b>
            <span class="fc-hint">Tap to flip</span>
          </span>
          <span class="fc-face fc-back" aria-hidden={flipped ? undefined : 'true'}>
            <b>{card.w}</b>
            <span class="fc-def">{card.def}</span>
            {card.ex && <span class="fc-ex">“{card.ex}”</span>}
          </span>
        </span>
      </button>
      <p class="lx-sr" aria-live="polite">{flipped ? `${card.def}${card.ex ? `. For example: ${card.ex}` : ''}` : ''}</p>
      <button type="button" class="ps-round fc-hear" onClick={() => playAudioOr(settings.accent === 'UK' ? card.audio?.uk : card.audio?.us, card.w, { accent: settings.accent, rate: settings.speechRate })}>
        <SpeakerIcon size={20} />Hear it
      </button>
      {flipped && state && (
        <div class="fc-grades" role="group" aria-label="How well did you know it?">
          {GRADES.map(([g, label], k) => (
            <button key={g} type="button" class={`fc-grade ${g}`} onClick={() => grade(g)} aria-keyshortcuts={String(k + 1)}>
              <b>{label}</b><span>{comesBack(state, g)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
