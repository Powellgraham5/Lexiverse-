import { useId } from 'preact/hooks';
import './controls.css';

// Pill group of toggle buttons; exactly one is pressed.
export function Segmented({ label, hint, options, value, onChange, stretch }) {
  const id = useId();
  return (
    <div class={`lx-setting ${stretch ? 'stack' : ''}`}>
      <b id={id}>{label}</b>
      <div role="group" aria-labelledby={id} class={`lx-seg ${stretch ? 'stretch' : ''}`}>
        {options.map(([v, text]) => (
          <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>{text}</button>
        ))}
      </div>
      {hint && <span class="lx-setting-hint">{hint}</span>}
    </div>
  );
}

export function Switch({ label, hint, checked, onChange }) {
  const id = useId();
  return (
    <div class="lx-setting">
      <span class="lx-setting-text"><b id={id}>{label}</b>{hint && <span>{hint}</span>}</span>
      <button type="button" role="switch" aria-checked={checked} aria-labelledby={id} class="lx-switch" onClick={() => onChange(!checked)}>
        <span />
      </button>
    </div>
  );
}

export function Range({ label, min, max, step, value, onChange, format = (v) => v }) {
  const id = useId();
  return (
    <div class="lx-setting stack">
      <label for={id} class="lx-range-label"><span>{label}</span><span aria-hidden="true">{format(value)}</span></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} aria-valuetext={String(format(value))}
        onInput={(e) => onChange(Number(e.currentTarget.value))} />
    </div>
  );
}
