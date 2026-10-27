import { CloseIcon } from '../../app/icons.jsx';

// Close, progress bar and counter at the top of every practice game.
export function SessionTop({ done, total, label }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div class="ps-top">
      <a class="ps-close" href="/learn" aria-label={`Close ${label}`}><CloseIcon /></a>
      <div class="ps-bar" role="progressbar" aria-label={`${label} progress`} aria-valuemin="0" aria-valuemax={total} aria-valuenow={done}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <span class="ps-count" aria-hidden="true">{done} / {total}</span>
    </div>
  );
}
