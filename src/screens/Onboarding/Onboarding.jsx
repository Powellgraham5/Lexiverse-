import { useEffect, useMemo, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { BackIcon, FlameIcon, ChatIcon, LearnIcon, PenIcon, CaseIcon } from '../../app/icons.jsx';
import { Switch } from '../../components/controls.jsx';
import { loadDaily, wordOfTheDay } from '../../lib/daily.js';
import { saveProfile, GOALS, LEVELS } from '../../lib/profile.js';
import { recordActivity } from '../../lib/streak.js';
import { GOAL_FLOW, focusLabel, levelSamples } from '../../lib/goals.js';
import { focusPath, pathById } from '../../lib/paths.js';
import './onboarding.css';

const GOAL_OPTIONS = [
  ['everyday', 'Everyday English', 'Talk and understand with confidence', 'var(--lx-opposite-bg)', ChatIcon],
  ['exam', 'Exam preparation', 'IELTS, WAEC, SAT and more', 'var(--lx-family-bg)', LearnIcon],
  ['writing', 'Better writing', 'Essays, reports and stories', 'var(--lx-note-bg)', PenIcon],
  ['work', 'Work and career', 'Emails, meetings and interviews', 'var(--lx-info-bg)', CaseIcon]
];
const LEVEL_KEYS = { 1: 'happy', 2: 'curious', 3: 'serendipity' };
// Steps: 1 welcome, 2 goal, 3 the goal's own question, 4 level, 5 comfort, 6 ready.
const STEP_NAMES = [null, 'welcome', 'goal', 'focus', 'level', 'comfort', 'ready'];
const PROGRESS = [0, 0, 20, 45, 70, 90, 100];
const GREETINGS = [['bonjour', 'fr', 'top'], ['báwo', 'yo', 'right'], ['sannu', 'ha', 'bottom'], ['hola', 'es', 'left']];

// Radio group with arrow-key movement, as screen reader and keyboard users expect.
function Choices({ label, value, onChange, options, render }) {
  const keys = options.map((o) => o[0]);
  const onKey = (e) => {
    const i = keys.indexOf(value);
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = keys[(Math.max(i, 0) + step + keys.length) % keys.length];
    onChange(next);
    e.currentTarget.querySelector(`[data-key="${next}"]`)?.focus();
  };
  return (
    <div role="radiogroup" aria-label={label} class="ob-choices" onKeyDown={onKey}>
      {options.map((o, i) => (
        <button key={o[0]} type="button" role="radio" data-key={o[0]} aria-checked={value === o[0]}
          tabIndex={value === o[0] || (!value && i === 0) ? 0 : -1}
          class={`ob-choice lx-rise lx-d${Math.min(i + 2, 4)} ${value === o[0] ? 'picked' : ''}`} onClick={() => onChange(o[0])}>
          {render(o)}
        </button>
      ))}
    </div>
  );
}

export default function Onboarding() {
  usePage('Welcome');
  const { route } = useLocation();
  const [settings, set] = useSettings();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(null);
  const [focus, setFocus] = useState(null);
  const [level, setLevel] = useState('curious');
  const [firstWord, setFirstWord] = useState(null);
  const [daily, setDaily] = useState([]);
  useEffect(() => { loadDaily().then(setDaily).catch(() => {}); }, []);
  const code = GOALS[goal || 'everyday'];
  const flow = GOAL_FLOW[code];
  const label = focusLabel(code, focus);
  const samples = useMemo(() => levelSamples(daily, code), [daily, code]);
  const pickGoal = (g) => { if (g !== goal) setFocus(null); setGoal(g); };

  const go = (n) => setStep(n);
  useEffect(() => {
    // usePage only focuses on mount; steps change inside one screen, so focus the new heading here.
    const h1 = document.querySelector('#main h1');
    if (step > 1 && h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    scrollTo(0, 0);
  }, [step]);

  async function finish() {
    const profile = { goal: code, focus, level: LEVELS[level], done: true, startedAt: Date.now() };
    saveProfile(profile);
    recordActivity('start');
    try {
      const words = await loadDaily();
      setFirstWord(wordOfTheDay(words, profile).w);
    } catch { setFirstWord(null); }
    go(6);
  }

  return (
    <div class={`ob step-${STEP_NAMES[step]}`}>
      {step > 1 && step < 6 && (
        <div class="ob-bar">
          <button type="button" class="ob-icon-btn" aria-label="Back" onClick={() => go(step - 1)}><BackIcon /></button>
          <div class="ob-progress" role="progressbar" aria-label="Setup progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={PROGRESS[step]}>
            <div style={{ width: `${PROGRESS[step]}%` }}><span /></div>
          </div>
        </div>
      )}

      {step === 1 && (
        <section class="ob-step">
          <p class="lx-wordmark lx-rise" aria-hidden="true">lexi<span>verse</span></p>
          <div class="ob-orbit" aria-hidden="true">
            <div class="ob-ring">
              {GREETINGS.map(([w, lang, pos], i) => (
                <span key={w} class={`ob-moon-wrap ${pos}`}><span class={`ob-moon tint-${i}`} lang={lang}>{w}</span></span>
              ))}
            </div>
            <div class="ob-ring2">
              <span class="ob-moon-wrap ne"><span class="ob-moon tint-2b" lang="ig">ndewo</span></span>
              <span class="ob-moon-wrap sw"><span class="ob-moon" lang="zh">你好</span></span>
            </div>
            <div class="ob-sun">hello</div>
          </div>
          <div class="ob-copy">
            <h1 class="lx-rise lx-d1">Every word is a world.</h1>
            <p class="ob-lead lx-rise lx-d2">Discover words, hear them, practise them and keep them, in English and the languages you love.</p>
            <div class="ob-actions lx-rise lx-d3">
              <button type="button" class="lx-btn" onClick={() => go(2)}>Let's go</button>
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section class="ob-step">
          <h1 class="lx-rise">What brings you to Lexiverse?</h1>
          <p class="ob-sub lx-rise lx-d1">We'll choose your daily words around it.</p>
          <Choices label="Your goal" value={goal} onChange={pickGoal} options={GOAL_OPTIONS} render={([, title, desc, planet, Icon]) => (
            <>
              <span class="ob-planet" style={{ background: planet }} aria-hidden="true"><Icon size={22} /></span>
              <span><b>{title}</b><span>{desc}</span></span>
            </>
          )} />
          <p class="lx-sr" aria-live="polite">{goal ? '' : 'Choose a goal to continue'}</p>
          <button type="button" class="lx-btn ob-next" aria-disabled={!goal} onClick={() => goal && go(3)}>Continue</button>
        </section>
      )}

      {step === 3 && (
        <section class="ob-step">
          <p class="ob-kicker lx-rise">{flow.name}</p>
          <h1 class="lx-rise">{flow.question}</h1>
          <p class="ob-sub lx-rise lx-d1">{flow.sub}</p>
          <Choices label={flow.question} value={focus} onChange={setFocus} options={flow.options} render={([, title, desc]) => (
            <span class="ob-level"><b class="ob-focus-title">{title}</b><span>{desc}</span></span>
          )} />
          <p class="lx-sr" aria-live="polite">{focus ? '' : 'Choose one to continue'}</p>
          <button type="button" class="lx-btn ob-next" aria-disabled={!focus} onClick={() => focus && go(4)}>Continue</button>
        </section>
      )}

      {step === 4 && (
        <section class="ob-step">
          <p class="ob-kicker lx-rise">{label}</p>
          <h1 class="lx-rise">{flow.levelTitle(label)}</h1>
          <p class="ob-sub lx-rise lx-d1">Pick the one you'd like to learn next. It sets your starting level.</p>
          <Choices label="Your level" value={level} onChange={setLevel} options={samples.map((x) => [LEVEL_KEYS[x.level], x.word, x.hint])} render={([, word, hint]) => (
            <span class="ob-level"><b>{word}</b><span>{hint}</span></span>
          )} />
          <button type="button" class="lx-btn ob-next" onClick={() => go(5)}>Continue</button>
        </section>
      )}

      {step === 5 && (
        <section class="ob-step">
          <h1 class="lx-rise">Make it comfortable</h1>
          <p class="ob-sub lx-rise lx-d1">Set it up for your {code === 'x' ? `${label} practice` : flow.name.toLowerCase()}. Change these any time in Me.</p>
          <div class="ob-preview lx-rise lx-d2" aria-hidden="true">
            <b>benevolent</b>
            <span>Kind and wanting to help other people.</span>
          </div>
          <div class="ob-size lx-rise lx-d3">
            <label for="ob-size"><span>Text size</span><span aria-hidden="true">{Math.round(settings.textScale * 100)}%</span></label>
            <input id="ob-size" type="range" min="1" max="2" step="0.1" value={settings.textScale}
              aria-valuetext={`${Math.round(settings.textScale * 100)}%`} onInput={(e) => set({ textScale: Number(e.currentTarget.value) })} />
          </div>
          <div class="lx-card lx-settings-group lx-rise lx-d4">
            <Switch label="Read words aloud" hint="Hear each word and meaning as it opens" checked={settings.readAloud} onChange={(readAloud) => set({ readAloud })} />
            <Switch label="High contrast" hint="Stronger colours and outlines" checked={settings.contrast} onChange={(contrast) => set({ contrast })} />
            <Switch label="Reduce motion" hint="Calmer screens with fewer animations" checked={settings.motion} onChange={(motion) => set({ motion })} />
          </div>
          <button type="button" class="lx-btn ob-next" onClick={finish}>Finish setup</button>
        </section>
      )}

      {step === 6 && (
        <section class="ob-step ob-ready">
          <div class="ob-burst" aria-hidden="true">
            {['#FF6B3D', '#3DDC97', '#FFD23F', '#FF9ECF', '#7AD7FF', '#4A2FE0', '#FF6B3D', '#3DDC97'].map((c, i) => <span key={i} class={`ob-spark s${i}`} style={{ background: c }} />)}
            <div class="ob-first">
              <span>{flow.ready(label).first}</span>
              <b>{firstWord || 'ready'}</b>
            </div>
          </div>
          <h1 class="lx-rise lx-d3">{flow.ready(label).title}</h1>
          <p class="ob-lead lx-rise lx-d4">{flow.ready(label).lead}</p>
          <p class="ob-streak lx-rise lx-d4"><span aria-hidden="true"><FlameIcon /></span>Day 1 streak started</p>
          {focusPath(code, focus) && <a class="lx-btn ob-next lx-rise lx-d4" href={`/learn/path/${focusPath(code, focus)}`}>Start your {pathById(focusPath(code, focus)).title.split(' ')[0]} path</a>}
          <button type="button" class={`lx-btn ob-next lx-rise lx-d4 ${focusPath(code, focus) ? 'secondary' : ''}`} onClick={() => route('/')}>Start exploring</button>
        </section>
      )}
    </div>
  );
}
