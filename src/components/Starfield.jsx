import './starfield.css';

// Deterministic star positions so the sky looks the same on every visit.
const rand = (i, n) => { const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return x - Math.floor(x); };
const STARS = Array.from({ length: 64 }, (_, i) => ({
  left: rand(i, 1) * 100,
  top: rand(i, 2) * 100,
  size: rand(i, 3) < 0.15 ? 'l' : rand(i, 3) < 0.55 ? 's' : '',
  tint: rand(i, 4) < 0.12 ? 'c' : rand(i, 4) < 0.2 ? 'w' : '',
  delay: (rand(i, 5) * 3).toFixed(2),
  layer: i % 2 ? 'far' : 'near'
}));

// Only visible in dark mode (see starfield.css), so it can always be mounted.
export function Starfield() {
  return (
    <div class="lx-starfield" aria-hidden="true">
      {['far', 'near'].map((layer) => (
        <div key={layer} class={`lx-sky ${layer}`}>
          {STARS.filter((s) => s.layer === layer).map((s, i) => (
            <span key={i} class={`lx-star ${s.size} ${s.tint}`} style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
          ))}
        </div>
      ))}
      <span class="lx-shoot" />
    </div>
  );
}
