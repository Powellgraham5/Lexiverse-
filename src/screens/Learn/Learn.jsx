import { useEffect, useMemo, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { FlameIcon, ChevronIcon, CardsIcon, SpeakerIcon, CheckIcon } from '../../app/icons.jsx';
import { loadReviews, summary } from '../../lib/srs.js';
import { loadActivity, currentStreak } from '../../lib/streak.js';
import { WeekStrip } from '../../components/WeekStrip.jsx';
import './learn.css';

const GOAL = 10;

function when(ts, now = Date.now()) {
  if (!ts) return null;
  const mins = Math.round((ts - now) / 60000);
  if (mins < 60) return `in ${Math.max(1, mins)} minute${mins === 1 ? '' : 's'}`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `in ${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'tomorrow' : `in ${days} days`;
}

function Ring({ value, max }) {
  const r = 34, c = 2 * Math.PI * r, pct = Math.min(1, value / max);
  return (
    <span class="ln-ring" role="img" aria-label={`${value} of ${max} reviews done today`}>
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r={r} class="track" />
        <circle cx="40" cy="40" r={r} class="fill" stroke-dasharray={c} stroke-dashoffset={c * (1 - pct)} />
      </svg>
      <span aria-hidden="true"><b>{value}/{max}</b><small>today</small></span>
    </span>
  );
}

export default function Learn() {
  usePage('Learn');
  const [s, setS] = useState(null);
  useEffect(() => { loadReviews().then((r) => setS({ ...summary(r), total: r.length })).catch(() => setS({ due: 0, doneToday: 0, known: 0, nextDue: null, total: 0 })); }, []);
  const activity = useMemo(loadActivity, []);
  const streak = currentStreak(activity.days || []);
  const minutes = (n) => Math.max(1, Math.round(n * 0.4));

  return (
    <>
      <div class="ln-head">
        <h1 class="lx-page-title lx-rise">Learn</h1>
        <span class="lx-streak-chip" role="img" aria-label={streak ? `${streak} day streak` : 'No streak yet'}><FlameIcon />{streak ? `${streak} day${streak === 1 ? '' : 's'}` : 'Start a streak'}</span>
      </div>

      {s && (
        <section class="ln-hero lx-rise lx-d1" aria-labelledby="ln-hero-h">
          <Ring value={s.doneToday} max={GOAL} />
          <div>
            {s.due > 0 ? (
              <>
                <h2 id="ln-hero-h">{s.due} word{s.due === 1 ? ' is' : 's are'} ready to review</h2>
                <a class="lx-btn secondary small" href="/learn/flashcards">Start · {minutes(s.due)} min</a>
              </>
            ) : s.total === 0 ? (
              <>
                <h2 id="ln-hero-h">Start with a few new words</h2>
                <a class="lx-btn secondary small" href="/learn/flashcards">Start · 3 min</a>
              </>
            ) : (
              <>
                <h2 id="ln-hero-h" role="status"><span class="ln-check" aria-hidden="true"><CheckIcon size={18} /></span>All caught up!</h2>
                <p>{s.nextDue ? `Your next words are due ${when(s.nextDue)}. Your brain needs the gap.` : 'Nothing due right now.'}</p>
                <a class="lx-btn secondary small" href="/learn/flashcards">Learn 3 new words</a>
              </>
            )}
          </div>
        </section>
      )}

      <h2 class="ln-h2 lx-rise lx-d2">Practise your way</h2>
      <div class="ln-ways">
      <a class="ln-flash lx-rise lx-d2" href="/learn/flashcards">
        <span><span class="ln-rec">Recommended</span><b>Flashcards</b><span>{s?.due ? `${s.due} due · ${minutes(s.due)} min` : 'Flip, then rate yourself'}</span></span>
        <span class="ln-cards" aria-hidden="true"><span /><span /><span>Aa</span></span>
      </a>
      <div class="ln-tiles lx-rise lx-d3">
        <a class="ln-tile quiz" href="/learn/quiz"><span class="ln-ico" aria-hidden="true">?</span><b>Quick quiz</b><span>5 Qs · 2 min</span></a>
        <a class="ln-tile spell" href="/learn/spell"><span class="ln-ico" aria-hidden="true"><SpeakerIcon size={18} /></span><b>Listen &amp; spell</b><span>No reading</span></a>
        <a class="ln-tile match" href="/learn/match"><span class="ln-ico" aria-hidden="true"><CardsIcon size={18} /></span><b>Word match</b><span>Pair them up</span></a>
      </div>
      </div>
      <div class="ln-bottom">
        <a class="ln-setup lx-card" href="/learn/setup"><span><b>Set up practice</b><span>Choose words, how many and question types</span></span><ChevronIcon size={20} /></a>
        <WeekStrip id="ln-st" />
      </div>

    </>
  );
}
