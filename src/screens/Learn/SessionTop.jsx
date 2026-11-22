import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { CloseIcon } from '../../app/icons.jsx';
import { Sheet } from '../../components/Sheet.jsx';

// Close, progress bar and counter at the top of every practice game. Once answers are at stake
// (confirm), Close asks first, so a stray tap never throws away a half-finished set.
export function SessionTop({ done, total, label, closeHref = "/learn", confirm = false }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const { route } = useLocation();
  const [asking, setAsking] = useState(false);
  const close = (e) => { if (confirm) { e.preventDefault(); setAsking(true); } };
  return (
    <div class="ps-top">
      <a class="ps-close" href={closeHref} aria-label={`Close ${label}`} onClick={close}><CloseIcon /></a>
      {total > 0 && <>
        <div class="ps-bar" role="progressbar" aria-label={`${label} progress`} aria-valuemin="0" aria-valuemax={total} aria-valuenow={done}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <span class="ps-count" aria-hidden="true">{done} / {total}</span>
      </>}
      <Sheet open={asking} title="Leave this set?" onClose={() => setAsking(false)}>
        <p class="lx-confirm-text">Your answers so far will not be saved.</p>
        <div class="lx-crash-row lx-confirm-row">
          <button type="button" class="lx-btn" onClick={() => setAsking(false)}>Keep going</button>
          <button type="button" class="lx-btn secondary" onClick={() => { setAsking(false); route(closeHref); }}>Leave</button>
        </div>
      </Sheet>
    </div>
  );
}
