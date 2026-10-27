import { useMemo } from 'preact/hooks';
import { FlameIcon } from '../app/icons.jsx';
import { loadActivity, currentStreak } from '../lib/streak.js';
import { dayKey } from '../lib/daily.js';
import './week-strip.css';

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// The streak card: current streak plus the last seven days as planets.
export function WeekStrip({ id = 'week' }) {
  const activity = useMemo(loadActivity, []);
  const streak = currentStreak(activity.days || []);
  const week = useMemo(() => {
    const days = new Set(activity.days || []);
    return Array.from({ length: 7 }, (_, k) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - k));
      return { key: dayKey(d), letter: k === 6 ? 'Today' : DAY_LETTERS[d.getDay()], done: days.has(dayKey(d)), today: k === 6 };
    });
  }, []);
  return (
    <section class="ln-streak lx-card" aria-labelledby={id}>
      <div class="ln-streak-head">
        <span class="ln-flame" aria-hidden="true"><FlameIcon size={22} /></span>
        <span><b id={id}>{streak ? `${streak}-day streak` : 'No streak yet'}</b><span>{streak >= 7 ? 'A full week. Keep it going!' : streak === 6 ? 'One more day for a full week' : 'Practise a little every day'}</span></span>
      </div>
      <ol class="ln-week" aria-label="Last 7 days">
        {week.map((d) => (
          <li key={d.key} class={`${d.done ? 'done' : ''} ${d.today ? 'today' : ''}`}>
            <span class="dot" aria-hidden="true">{d.done && <FlameIcon size={14} />}</span>
            <span class="lab">{d.letter}<span class="lx-sr">{d.done ? ', practised' : ', not practised'}</span></span>
          </li>
        ))}
      </ol>
    </section>
  );
}
