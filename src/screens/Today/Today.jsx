import { useEffect, useMemo } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useRequest } from '../../app/useRequest.js';
import { useSettings } from '../../app/settings-context.jsx';
import { SpeakerIcon, FlameIcon, ChevronIcon, CardsIcon } from '../../app/icons.jsx';
import { ErrorCard } from '../../components/ErrorCard.jsx';
import { loadDaily, wordOfTheDay } from '../../lib/daily.js';
import { loadProfile } from '../../lib/profile.js';
import { loadActivity, currentStreak, challengeDone } from '../../lib/streak.js';
import { playAudioOr } from '../../lib/speech.js';
import './today.css';

// Up to five related words placed around the orbit: similar (≈), opposite (≠), same family (+).
export function orbitChips(w) {
  const syn = w.syn.map((x) => ({ word: x, kind: 'similar', mark: '≈' }));
  const ant = w.ant.map((x) => ({ word: x, kind: 'opposite', mark: '≠' }));
  const fam = w.fam.map((x) => ({ word: x, kind: 'family', mark: '+' }));
  const slots = [syn[0], syn[1], ant[0], syn[2], fam[0]];
  const spare = [ant[1], fam[1]].filter(Boolean);
  return slots.map((c) => c || spare.shift()).filter(Boolean);
}
const KIND_LABEL = { similar: 'similar meaning', opposite: 'opposite meaning', family: 'same word family' };

export default function Today() {
  usePage('Today');
  const { route } = useLocation();
  const [settings] = useSettings();
  const profile = loadProfile();

  useEffect(() => { if (!profile?.done) route('/welcome', true); }, []);

  // Bundled with the app (and precached), so it loads even offline.
  const [req, retry] = useRequest(() => loadDaily(), [], { isOnline: () => true });
  const activity = useMemo(loadActivity, []);
  const streak = currentStreak(activity.days || []);
  const done = challengeDone(activity);
  const word = req.data && wordOfTheDay(req.data, { level: profile?.level || 2, goal: profile?.goal || 'e' });

  return (
    <>
      <h1 class="lx-sr">Today</h1>
      <header class="lx-today-head">
        <p class="lx-wordmark" aria-hidden="true">lexi<span>verse</span></p>
        <span class="lx-streak-chip" role="img" aria-label={streak ? `${streak} day streak` : 'No streak yet'}>
          <FlameIcon />{streak ? `${streak} day${streak === 1 ? '' : 's'}` : 'Start a streak'}
        </span>
      </header>

      {req.state === 'error' && (
        <ErrorCard title="Today's word didn't load" code={req.code || 'DICT-503'} onRetry={retry}>
          Check your connection and try again.
        </ErrorCard>
      )}

      {(req.state === 'loading' || req.state === 'idle') && (
        <div class="lx-today-skeleton" aria-busy="true" aria-label="Loading today's word">
          <span class="lx-skeleton lx-sk-planet" />
          <span class="lx-skeleton" style={{ width: '60%', height: '1rem' }} />
          <span class="lx-skeleton" style={{ width: '90%', height: '1.5rem' }} />
        </div>
      )}

      {word && (
        <>
          <p class="lx-today-hint">Today's world · tap a word to travel there</p>
          <section class="lx-orbit" aria-label={`Word of the day, ${word.w}, and its related words`}>
            <span class="lx-orbit-ring outer" aria-hidden="true" />
            <span class="lx-orbit-ring inner" aria-hidden="true" />
            <a class="lx-orbit-planet" href={`/word/${word.w}`}>
              <span>Word of the day</span>
              <b>{word.w}</b>
            </a>
            <ul class="lx-orbit-chips">
              {orbitChips(word).map((c, i) => (
                <li key={c.word} class={`slot-${i}`}>
                  <a class={`lx-chip ${c.kind}`} href={`/word/${c.word}`} aria-label={`${c.word}, ${KIND_LABEL[c.kind]}`}>{c.mark} {c.word}</a>
                </li>
              ))}
            </ul>
          </section>

          <div class="lx-today-def lx-rise lx-d2">
            <p class="lx-today-ipa">{word.ipa && <span lang="en-fonipa">{word.ipa}</span>}{word.ipa && ' · '}{word.pos}</p>
            <p class="lx-today-meaning">{word.def}</p>
            <p class="lx-today-legend" aria-hidden="true">≈ similar · ≠ opposite · + same family</p>
          </div>

          {done ? (
            <section class="lx-done lx-rise lx-d3" aria-labelledby="done-title">
              <span class="lx-done-flame" aria-hidden="true"><FlameIcon size={30} /></span>
              <h2 id="done-title" role="status">You're done for today!</h2>
              <p>You learned <b>{word.w}</b>{streak > 1 ? ` and kept a ${streak} day streak` : ''}. A new word lands tomorrow.</p>
              <a class="lx-btn secondary small" href="/learn">Practise more</a>
            </section>
          ) : (
            <div class="lx-today-actions lx-rise lx-d3">
              <button type="button" class="lx-listen" aria-label={`Listen to ${word.w}`}
                onClick={() => playAudioOr(settings.accent === 'UK' ? word.audio.uk || word.audio.us : word.audio.us || word.audio.uk, word.w, { accent: settings.accent, rate: settings.speechRate })}>
                <SpeakerIcon size={24} />
              </button>
              <a class="lx-btn" href="/challenge">Daily challenge · 1 min</a>
            </div>
          )}

          <a class="lx-card lx-today-card lx-rise lx-d4" href="/learn">
            <span class="lx-today-card-icon" aria-hidden="true"><CardsIcon size={20} /></span>
            <span><b>Practise your words</b><span>Flashcards, quizzes and games</span></span>
            <ChevronIcon size={20} />
          </a>
        </>
      )}
    </>
  );
}
