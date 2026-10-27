import { usePage } from '../../app/usePage.js';
import { useSettings } from '../../app/settings-context.jsx';
import { Segmented, Switch, Range } from '../../components/controls.jsx';
import { ChevronIcon, StarIcon, WordsIcon } from '../../app/icons.jsx';
import './me.css';

export default function Me() {
  usePage('Me & settings');
  const [s, set] = useSettings();
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
