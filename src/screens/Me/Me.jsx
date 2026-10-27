import { useState } from 'preact/hooks';
import { usePage } from '../../app/usePage.js';
import { loadProfile, saveProfile } from '../../lib/profile.js';
import { GOAL_FLOW, LEVEL_NAMES } from '../../lib/goals.js';
import { useSettings } from '../../app/settings-context.jsx';
import { Segmented, Switch, Range } from '../../components/controls.jsx';
import { ChevronIcon, StarIcon, WordsIcon } from '../../app/icons.jsx';
import './me.css';

export default function Me() {
  usePage('Me & settings');
  const [s, set] = useSettings();
  const [profile, setProfile] = useState(() => loadProfile() || { goal: 'e', level: 2, done: true });
  const flow = GOAL_FLOW[profile.goal] || GOAL_FLOW.e;
  const update = (patch) => { const p = { ...profile, ...patch }; saveProfile(p); setProfile(p); };
  return (
    <>
      <h1 class="lx-rise lx-page-title">Me</h1>

      <section class="lx-me-hero lx-rise lx-d1">
        <span class="lx-me-planet" aria-hidden="true"><span class="lx-me-ring"><span /></span></span>
        <div>
          <b>Learning on this device</b>
          <span>Sign in to sync is coming in build phase 5</span>
        </div>
      </section>

      <nav class="me-links lx-rise lx-d1" aria-label="Your words and progress">
        <a href="/progress"><StarIcon /><span><b>Your universe</b><span>Streak, recall and the word archive</span></span><ChevronIcon /></a>
        <a href="/words"><WordsIcon /><span><b>My Words</b><span>Saved words and lists</span></span><ChevronIcon /></a>
      </nav>

      <h2 class="lx-me-h2 lx-rise lx-d1" id="learning">Your learning</h2>
      <section class="lx-card lx-settings-group me-learning lx-rise lx-d1" aria-labelledby="learning">
        <div class="lx-setting stack">
          <label for="me-goal"><b>Goal</b></label>
          <select id="me-goal" class="me-select" value={profile.goal} onChange={(e) => update({ goal: e.currentTarget.value, focus: null })}>
            {Object.entries(GOAL_FLOW).map(([k, f]) => <option key={k} value={k}>{f.name}</option>)}
          </select>
        </div>
        <div class="lx-setting stack">
          <label for="me-focus"><b>{flow.question}</b></label>
          <select id="me-focus" class="me-select" value={profile.focus || ''} onChange={(e) => update({ focus: e.currentTarget.value || null })}>
            <option value="">Not set</option>
            {flow.options.map(([k, t]) => <option key={k} value={k}>{t}</option>)}
          </select>
        </div>
        <Segmented label="Level" stretch value={profile.level} onChange={(level) => update({ level })}
          options={[1, 2, 3].map((l) => [l, LEVEL_NAMES[l]])} hint="Your daily words follow your goal and level." />
      </section>

      <div class="lx-split even me-split">
      <div class="lx-col">
      <h2 class="lx-me-h2 lx-rise lx-d2" id="seeing">Seeing &amp; reading</h2>
      <section class="lx-card lx-settings-group lx-rise lx-d2" aria-labelledby="seeing">
        <Segmented label="Theme" value={s.theme} onChange={(theme) => set({ theme })}
          options={[['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']]} />
        <Range label="Text size" min={1} max={2} step={0.1} value={s.textScale}
          onChange={(textScale) => set({ textScale })} format={(v) => `${Math.round(v * 100)}%`} />
        <Segmented stretch label="Reading font" value={s.font} onChange={(font) => set({ font })}
          options={[['inter', 'Inter'], ['reading', 'Hyperlegible'], ['system', 'System']]}
          hint="Atkinson Hyperlegible is designed for low vision." />
        <Switch label="High contrast" hint="Stronger colours and outlines" checked={s.contrast} onChange={(contrast) => set({ contrast })} />
        <Switch label="Reduce motion" hint="Calmer screens, fewer animations" checked={s.motion} onChange={(motion) => set({ motion })} />
      </section>

      </div>
      <div class="lx-col">
      <h2 class="lx-me-h2" id="listening">Listening</h2>
      <section class="lx-card lx-settings-group" aria-labelledby="listening">
        <Switch label="Read words aloud" hint="Speak each word as it opens" checked={s.readAloud} onChange={(readAloud) => set({ readAloud })} />
        <Segmented label="Accent" value={s.accent} onChange={(accent) => set({ accent })} options={[['US', 'US'], ['UK', 'UK']]} />
        <Range label="Speaking speed" min={0.5} max={1.5} step={0.25} value={s.speechRate}
          onChange={(speechRate) => set({ speechRate })} format={(v) => `${v}×`} />
      </section>
      </div>
      </div>
    </>
  );
}
