import { useEffect, useMemo, useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { BackIcon, ChevronIcon, FlameIcon, CheckIcon, StarIcon } from '../../app/icons.jsx';
import { Segmented } from '../../components/controls.jsx';
import { ListPlanet } from '../../components/lists/ListPlanet.jsx';
import { computeProgress, archiveMonth } from '../../lib/progress.js';
import { loadActivity } from '../../lib/streak.js';
import { loadReviews } from '../../lib/srs.js';
import { savedWords } from '../../lib/saved.js';
import { allLists } from '../../lib/lists.js';
import { loadDaily } from '../../lib/daily.js';
import { loadProfile } from '../../lib/profile.js';
import './progress.css';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthName = (y, m) => new Date(y, m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
const dayName = (key) => new Date(`${key}T12:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

// When the learner started: onboarding time, or their first active day for older profiles.
function startOf(profile, activity) {
  if (profile?.startedAt) return profile.startedAt;
  const first = [...(activity.days || [])].sort()[0];
  return first ? new Date(`${first}T00:00`).getTime() : Date.now();
}

// Lists orbit the learner's sun. Up to 6 planets, spaced around two rings.
function Universe({ lists, words }) {
  const shown = lists.slice(0, 6);
  return (
    <div class="pg-universe" aria-hidden="true">
      <span class="pg-orbit o1" /><span class="pg-orbit o2" />
      <span class="pg-sun"><b>{words}</b><span>words</span></span>
      {shown.map((l, i) => {
        const ring = i % 2 ? 46 : 32;
        const angle = (i / Math.max(shown.length, 1)) * 2 * Math.PI - Math.PI / 2 + (i % 2 ? 0.5 : 0);
        return (
          <span key={l.id} class="pg-planet" style={{ left: `${50 + ring * Math.cos(angle)}%`, top: `${50 + ring * Math.sin(angle)}%` }}>
            <ListPlanet list={l} size={i % 2 ? 34 : 42} />
          </span>
        );
      })}
    </div>
  );
}

function Minutes({ days }) {
  const max = Math.max(10, ...days.map((d) => d.value));
  const total = Math.round(days.reduce((a, d) => a + d.value, 0));
  return (
    <section class="pg-card lx-card" aria-labelledby="pg-min">
      <div class="pg-card-head"><h2 id="pg-min">Minutes this week</h2><b class="pg-total">{total} min</b></div>
      <div class="pg-bars" aria-hidden="true">
        {days.map((d) => (
          <span key={d.key} class={`pg-bar ${d.today ? 'today' : ''}`}>
            <span class="fill" style={{ height: `${Math.max(d.value ? 6 : 2, (d.value / max) * 100)}%` }} />
            <span class="lbl">{d.label}</span>
          </span>
        ))}
      </div>
      <ul class="lx-sr">
        {days.map((d) => <li key={d.key}>{dayName(d.key)}{d.today ? ' (today)' : ''}: {Math.round(d.value)} minute{Math.round(d.value) === 1 ? '' : 's'}</li>)}
      </ul>
    </section>
  );
}

function Archive({ daily, profile, reviews, start }) {
  const now = new Date();
  const [ym, setYm] = useState([now.getFullYear(), now.getMonth()]);
  const [view, setView] = useState('calendar');
  const startDate = new Date(start);
  const first = [startDate.getFullYear(), startDate.getMonth()];
  const atStart = ym[0] < first[0] || (ym[0] === first[0] && ym[1] <= first[1]);
  const atEnd = ym[0] === now.getFullYear() && ym[1] === now.getMonth();
  const days = useMemo(() => archiveMonth({ daily, profile: { ...profile, startedAt: start }, reviews, year: ym[0], month: ym[1] }), [ym, daily, reviews]);
  const shown = days.filter((d) => d.word);
  const learned = shown.filter((d) => d.state === 'learned').length;
  const move = (n) => setYm(([y, m]) => { const d = new Date(y, m + n, 1); return [d.getFullYear(), d.getMonth()]; });
  const lead = (new Date(ym[0], ym[1], 1).getDay() + 6) % 7;

  return (
    <section class="pg-card lx-card pg-archive" aria-labelledby="pg-arc">
      <div class="pg-card-head"><h2 id="pg-arc">Word of the day archive</h2></div>
      <Segmented label="Show as" options={[['calendar', 'Calendar'], ['list', 'List']]} value={view} onChange={setView} />
      <div class="pg-month">
        <button type="button" class="pg-nav" aria-label="Previous month" disabled={atStart} onClick={() => move(-1)}><BackIcon /></button>
        <h3 aria-live="polite">{monthName(...ym)}</h3>
        <button type="button" class="pg-nav" aria-label="Next month" disabled={atEnd} onClick={() => move(1)}><ChevronIcon /></button>
      </div>
      <p class="pg-arc-sum">{shown.length ? `${learned} of ${shown.length} learned` : 'No words of the day this month yet.'}</p>
      {view === 'calendar' ? (
        <div class="pg-cal">
          {WEEKDAYS.map((w) => <span key={w} class="pg-wd" aria-hidden="true">{w[0]}</span>)}
          {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} aria-hidden="true" />)}
          {days.map((d) => d.word ? (
            <a key={d.key} href={`/word/${d.word}`} class={`pg-day ${d.state} ${d.today ? 'today' : ''}`}
              aria-label={`${dayName(d.key)}: ${d.word}, ${d.state === 'learned' ? 'learned' : 'missed'}`}>{d.day}</a>
          ) : <span key={d.key} class="pg-day off" aria-hidden="true">{d.day}</span>)}
        </div>
      ) : (
        <ol class="pg-arc-list">
          {[...shown].reverse().map((d) => (
            <li key={d.key}>
              <a href={`/word/${d.word}`}>
                <span class="pg-arc-date">{new Date(`${d.key}T12:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })}</span>
                <b>{d.word}</b>
                <span class={`pg-chip ${d.state}`}>{d.state === 'learned' ? 'Learned' : 'Missed'}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
      <p class="pg-legend" aria-hidden="true"><span class="k learned" />Learned <span class="k missed" />Missed</p>
    </section>
  );
}

export default function Progress() {
  usePage('Your universe');
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([loadReviews().catch(() => []), savedWords().catch(() => []), allLists().catch(() => []), loadDaily().catch(() => [])])
      .then(([reviews, saved, lists, daily]) => setData({ reviews, saved, lists, daily, activity: loadActivity(), profile: loadProfile() }));
  }, []);

  const back = (ev) => { if (history.length > 1) { ev.preventDefault(); history.back(); } };
  const top = <div class="ld-top pg-top"><a class="ld-round" href="/learn" aria-label="Back" onClick={back}><BackIcon /></a></div>;
  if (!data) return <>{top}<h1 class="lx-page-title">Your universe</h1><span class="lx-skeleton pg-sk" aria-busy="true" /></>;

  const p = computeProgress(data);
  const start = startOf(data.profile, data.activity);
  const fresh = p.words === 0 && !p.quizzes && !p.streak;

  return (
    <>
      {top}
      <div class="lx-split">
        <div class="lx-col lx-sticky">
          <header class="pg-head lx-rise">
            <h1 class="lx-page-title">Your universe</h1>
            <Universe lists={data.lists} words={p.words} />
            <p class="pg-sub">{p.words} word{p.words === 1 ? '' : 's'} in {p.worlds} world{p.worlds === 1 ? '' : 's'}</p>
          </header>
          {fresh && (
            <section class="pg-card lx-card pg-dayone lx-rise lx-d1" aria-labelledby="pg-d1">
              <h2 id="pg-d1">Day one</h2>
              <p>Your universe starts with a single word. Meet today's word or take a quick quiz, and your stars appear here.</p>
              <a class="lx-btn" href="/">Meet today's word</a>
            </section>
          )}
          <ul class="pg-tiles lx-rise lx-d1">
            <li class="pg-tile"><FlameIcon /><b>{p.streak}</b><span>day streak</span></li>
            <li class="pg-tile"><CheckIcon /><b>{p.recall === null ? '–' : `${p.recall}%`}</b><span>{p.recall === null ? 'recall after a review' : 'recall'}</span></li>
            <li class="pg-tile"><StarIcon /><b>{p.quizzes}</b><span>quiz{p.quizzes === 1 ? '' : 'zes'}{p.quizzesThisWeek ? ` · ${p.quizzesThisWeek} this week` : ''}</span></li>
          </ul>
        </div>

        <div class="lx-col">
          <Minutes days={p.minutes} />
          <section class="pg-card lx-card" aria-labelledby="pg-con">
            <div class="pg-card-head"><h2 id="pg-con">Constellations</h2><b class="pg-total">{p.constellations.filter((c) => c.done).length} / {p.constellations.length}</b></div>
            <ul class="pg-cons">
              {p.constellations.map((c) => (
                <li key={c.id} class={c.done ? 'done' : ''}>
                  <span class="pg-con-star" aria-hidden="true"><StarIcon size={22} /></span>
                  <span class="pg-con-text"><b>{c.label}</b><span>{c.done ? 'Unlocked' : `${c.progress} of ${c.goal}`}</span></span>
                  <span class="mw-bar" role="img" aria-label={`${Math.round((c.progress / c.goal) * 100)}% done`}><span style={{ width: `${(c.progress / c.goal) * 100}%` }} /></span>
                </li>
              ))}
            </ul>
          </section>
          {data.daily.length > 0 && <Archive daily={data.daily} profile={data.profile} reviews={data.reviews} start={start} />}
        </div>
      </div>
    </>
  );
}
