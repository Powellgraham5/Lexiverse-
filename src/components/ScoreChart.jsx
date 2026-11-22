import './score-chart.css';

const date = (at) => new Date(at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

// Score history: one bar per session (oldest on the left), with a 50% guide line.
// The bars are decoration for sighted learners; screen readers get the summary and a table.
export function ScoreChart({ points, title = 'Score history', id }) {
  if (!points || points.length < 2) return null;
  const W = 320, H = 132, top = 18, base = H - 22, gap = 6;
  const bw = Math.min(26, (W - 28 - gap * (points.length - 1)) / points.length);
  const span = points.length * bw + (points.length - 1) * gap;
  const x0 = 28 + (W - 28 - span) / 2;
  const y = (pct) => base - ((base - top) * pct) / 100;
  const first = points[0].pct, last = points.at(-1).pct;
  const avg = Math.round(points.reduce((a, p) => a + p.pct, 0) / points.length);
  const trend = last > first + 4 ? `up from ${first}%` : last < first - 4 ? `down from ${first}%` : 'steady';
  const summary = `Last ${points.length} sessions: latest ${last}%, ${trend}. Average ${avg}%.`;
  return (
    <figure class="sc" aria-labelledby={id}>
      <figcaption id={id}><b>{title}</b><span>{summary}</span></figcaption>
      <svg class="sc-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <line class={v === 50 ? 'sc-mid' : 'sc-grid'} x1="26" x2={W} y1={y(v)} y2={y(v)} />
            <text class="sc-axis" x="20" y={y(v) + 4} text-anchor="end">{v}</text>
          </g>
        ))}
        {points.map((p, i) => {
          const x = x0 + i * (bw + gap);
          const h = Math.max(3, base - y(p.pct));
          const latest = i === points.length - 1;
          return (
            <g key={p.at}>
              <rect class={latest ? 'sc-bar latest' : 'sc-bar'} x={x} y={base - h} width={bw} height={h} rx="5" />
              {latest && <text class="sc-label" x={x + bw / 2} y={base - h - 5} text-anchor="middle">{p.pct}%</text>}
            </g>
          );
        })}
        <text class="sc-axis" x={x0} y={H - 6}>{date(points[0].at)}</text>
        <text class="sc-axis" x={x0 + span} y={H - 6} text-anchor="end">{date(points.at(-1).at)}</text>
      </svg>
      <table class="lx-sr">
        <caption>{title}</caption>
        <thead><tr><th scope="col">Date</th><th scope="col">Score</th></tr></thead>
        <tbody>{points.map((p) => <tr key={p.at}><td>{date(p.at)}</td><td>{p.score} of {p.total} ({p.pct}%)</td></tr>)}</tbody>
      </table>
    </figure>
  );
}

// Weak-topic alert: the topics to work on next, each with a button to practise just that topic.
export function WeakTopics({ topics, hrefFor, id = 'weak' }) {
  if (!topics?.length) return null;
  return (
    <section class="sc-weak lx-card" aria-labelledby={id}>
      <h2 id={id}>Needs work</h2>
      <p class="sc-weak-sub">Topics where you get fewer than 6 in 10 right.</p>
      <ul>
        {topics.slice(0, 3).map((t) => (
          <li key={t.topic}>
            <span class="sc-weak-text"><b>{t.topic}</b><span>{t.right} of {t.total} right ({Math.round(t.rate * 100)}%)</span></span>
            {hrefFor && <a class="lx-btn secondary small" href={hrefFor(t)}>Practise<span class="lx-sr"> {t.topic}</span></a>}
          </li>
        ))}
      </ul>
    </section>
  );
}
