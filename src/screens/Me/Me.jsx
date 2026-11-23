import { useEffect, useState } from 'preact/hooks';
import { installed, canInstall, onInstallChange, promptInstall } from '../../app/sw.js';
import { isIOS } from '../../lib/speech.js';
import { usePage } from '../../app/usePage.js';
import { loadProfile, saveProfile } from '../../lib/profile.js';
import { GOAL_FLOW, LEVEL_NAMES } from '../../lib/goals.js';
import { useSettings } from '../../app/settings-context.jsx';
import { Segmented, Switch, Range } from '../../components/controls.jsx';
import { ChatIcon, ChevronIcon, StarIcon, WordsIcon, PenIcon, MeIcon, SettingsIcon } from '../../app/icons.jsx';
import { loadActivity, currentStreak } from '../../lib/streak.js';
import { loadName } from '../../lib/challenge.js';
import { dayKey } from '../../lib/daily.js';
import './me.css';

export default function Me() {
  usePage('Me');
  const [s, set] = useSettings();
  const [profile, setProfile] = useState(() => loadProfile() || { goal: 'e', level: 2, done: true });
  const flow = GOAL_FLOW[profile.goal] || GOAL_FLOW.e;
  const update = (patch) => { const p = { ...profile, ...patch }; saveProfile(p); setProfile(p); };
  const name = loadName();
  const activity = loadActivity();
  const streak = currentStreak(activity.days || []);
  const weekMinutes = Math.round(Array.from({ length: 7 }, (_, k) => { const d = new Date(); d.setDate(d.getDate() - k); return activity.minutes?.[dayKey(d)] || 0; }).reduce((a, b) => a + b, 0));
  const focusText = (flow.options || []).find(([id]) => id === profile.focus)?.[1] || flow.name;
  return (
    <>
      <div class="me-top"><h1 class="lx-rise lx-page-title">Me</h1><a class="lx-round me-gear" href="/settings" aria-label="Settings"><SettingsIcon /></a></div>

      <section class="me-profile lx-rise lx-d1" aria-label="Your profile">
        <span class="me-avatar" aria-hidden="true">{name ? name.trim()[0].toUpperCase() : <MeIcon size={30} />}</span>
        <div>
          <b>{name || 'Your profile'}</b>
          <span>{focusText} · {LEVEL_NAMES[profile.level] || 'Intermediate'}</span>
          <span class="me-local">Saved on this phone. Sign in to sync is coming soon.</span>
        </div>
      </section>

      <ul class="me-stats lx-rise lx-d1" aria-label="Your numbers">
        <li class="sun"><b>{streak}</b><span>day streak</span></li>
        <li class="sky"><b>{(activity.days || []).length}</b><span>days practised</span></li>
        <li class="pink"><b>{weekMinutes}</b><span>minutes this week</span></li>
      </ul>

      <Install />

      <nav class="me-links lx-rise lx-d1" aria-label="Your words and progress">
        <a href="/progress"><StarIcon /><span><b>Progress</b><span>Streak, scores, milestones and the word archive</span></span><ChevronIcon /></a>
        <a href="/words"><WordsIcon /><span><b>My Words</b><span>Saved words, lists and your notebook</span></span><ChevronIcon /></a>
        <a href="/words?tab=notebook"><PenIcon /><span><b>Notebook</b><span>Your notes from lessons and formats</span></span><ChevronIcon /></a>
        <a href="/settings"><SettingsIcon /><span><b>Settings</b><span>Goal, level, text size, contrast and sound</span></span><ChevronIcon /></a>
        <a href="/help"><ChatIcon /><span><b>Help and FAQs</b><span>Reminders, challenges, certificates and your data</span></span><ChevronIcon /></a>
      </nav>

    </>
  );
}

// Installing keeps Lexiverse on the home screen, opens it full screen and protects saved work.
function Install() {
  const [, redraw] = useState(0);
  useEffect(() => onInstallChange(() => redraw((n) => n + 1)), []);
  if (installed()) return null;
  if (canInstall()) {
    return (
      <section class="lx-card me-install lx-rise lx-d1" aria-labelledby="me-install">
        <h2 id="me-install">Install Lexiverse</h2>
        <p>Open it from your home screen, full screen and offline.</p>
        <button type="button" class="lx-btn" onClick={() => promptInstall()}>Install</button>
      </section>
    );
  }
  if (isIOS()) {
    return (
      <section class="lx-card me-install lx-rise lx-d1" aria-labelledby="me-install">
        <h2 id="me-install">Add Lexiverse to your home screen</h2>
        <p>Tap the Share button in Safari, then “Add to Home Screen”. It then opens full screen, works offline and keeps your words safe.</p>
      </section>
    );
  }
  return null;
}

