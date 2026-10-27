import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { BackIcon } from '../../app/icons.jsx';
import { Segmented } from '../../components/controls.jsx';
import { loadPrefs, savePrefs } from './session.js';
import { loadReviews, summary } from '../../lib/srs.js';
import { savedWords } from '../../lib/saved.js';
import './practice.css';
import './setup.css';

const TYPES = [['meaning', 'Meanings'], ['gap', 'Fill the gap'], ['spell', 'Spelling'], ['listen', 'Listening']];

export default function Setup() {
  usePage('Set up practice');
  const { route } = useLocation();
  const [p, setP] = useState(loadPrefs);
  const [counts, setCounts] = useState({ due: 0, all: 0 });
  useEffect(() => {
    Promise.all([loadReviews(), savedWords()]).then(([r, s]) => setCounts({ due: summary(r).due, all: new Set([...r.map((x) => x.id), ...s.map((x) => x.id)]).size })).catch(() => {});
  }, []);
  const set = (patch) => { const next = { ...p, ...patch }; setP(next); savePrefs(next); };
  const toggle = (t) => {
    const types = p.types.includes(t) ? p.types.filter((x) => x !== t) : [...p.types, t];
    if (types.length) set({ types });
  };
  const SOURCES = [
    ['due', 'Due for review', `${counts.due} word${counts.due === 1 ? '' : 's'}, best for memory`],
    ['goal', 'My goal', 'Words picked for what you are learning for'],
    ['all', 'All my words', `${counts.all} word${counts.all === 1 ? '' : 's'}, mixed`]
  ];

  return (
    <div class="ps">
      <div class="ps-top">
        <a class="ps-close" href="/learn" aria-label="Back to Learn"><BackIcon /></a>
        <h1>Set up practice</h1>
      </div>
      <p class="su-sub">Optional. “Start” on Learn already picks smart defaults.</p>

      <fieldset class="su-group">
        <legend>Words from</legend>
        {SOURCES.map(([k, title, desc]) => (
          <label key={k} class={`su-radio ${p.from === k ? 'on' : ''}`}>
            <input type="radio" name="from" value={k} checked={p.from === k} onChange={() => set({ from: k })} />
            <span><b>{title}</b><span>{desc}</span></span>
          </label>
        ))}
      </fieldset>

      <div class="lx-card lx-settings-group">
        <Segmented label="How many" value={String(p.size)} onChange={(v) => set({ size: Number(v) })} options={[['5', '5'], ['10', '10'], ['20', '20']]} />
      </div>

      <fieldset class="su-group">
        <legend>Question types</legend>
        <div class="su-types">
          {TYPES.map(([k, label]) => (
            <label key={k} class={`su-check ${p.types.includes(k) ? 'on' : ''}`}>
              <input type="checkbox" checked={p.types.includes(k)} onChange={() => toggle(k)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <p class="su-note">At least one type stays on.</p>
      </fieldset>

      <div class="ps-foot">
        <button type="button" class="lx-btn" onClick={() => route('/learn/quiz?mode=mix')}>Start · about {Math.max(1, Math.round(p.size * 0.45))} min</button>
      </div>
    </div>
  );
}
