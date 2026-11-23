// Course certificate drawn on a canvas (landscape, print friendly), saved or shared as a PNG.
const W = 1600, H = 1131;
const C = { bg: '#FFFFFF', paper: '#F6F5FF', primary: '#1F5BFF', deep: '#1440C9', coral: '#FF8A65', yellow: '#FFE08A', ink: '#14123A', muted: '#3B3866', orbit: '#B9B4F5' };
const font = (w, size, fam = 'body') => `${w} ${size}px ${fam === 'display' ? '"Space Grotesk Variable", "Space Grotesk"' : '"Inter Variable", Inter'}, sans-serif`;

function fit(ctx, text, max, w, size, fam) {
  let s = size;
  ctx.font = font(w, s, fam);
  while (ctx.measureText(text).width > max && s > 24) { s -= 2; ctx.font = font(w, s, fam); }
  return s;
}

export async function drawCertificate(canvas, { name, course, lessons, score, date }) {
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  await document.fonts?.ready;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  // Frame
  ctx.fillStyle = C.paper; ctx.fillRect(40, 40, W - 80, H - 80);
  ctx.strokeStyle = C.primary; ctx.lineWidth = 6; ctx.strokeRect(64, 64, W - 128, H - 128);
  ctx.strokeStyle = C.orbit; ctx.lineWidth = 2; ctx.strokeRect(80, 80, W - 160, H - 160);
  // Orbit mark
  const cx = W / 2, cy = 210;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.38);
  ctx.strokeStyle = C.coral; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.ellipse(0, 0, 92, 28, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
  ctx.fillStyle = C.primary; ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.38);
  ctx.strokeStyle = C.coral; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.ellipse(0, 0, 92, 28, 0, 0.05, Math.PI - 0.05); ctx.stroke();
  ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(80, 14, 12, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = C.primary; ctx.font = font(700, 26);
  ctx.fillText('CERTIFICATE OF COMPLETION', cx, 330);
  ctx.fillStyle = C.muted; ctx.font = font(500, 30);
  ctx.fillText('This is to certify that', cx, 410);
  ctx.fillStyle = C.ink;
  fit(ctx, name, W - 360, 700, 84, 'display');
  ctx.fillText(name, cx, 520);
  ctx.strokeStyle = C.orbit; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx - 420, 560); ctx.lineTo(cx + 420, 560); ctx.stroke();
  ctx.fillStyle = C.muted; ctx.font = font(500, 30);
  ctx.fillText('has completed the Lexiverse course', cx, 630);
  ctx.fillStyle = C.deep;
  fit(ctx, course, W - 360, 700, 58, 'display');
  ctx.fillText(course, cx, 715);
  ctx.fillStyle = C.ink; ctx.font = font(600, 30);
  ctx.fillText(`${lessons} lessons${score !== null ? ` · average lesson score ${score}%` : ''}`, cx, 790);

  // Date and wordmark
  ctx.textAlign = 'left'; ctx.fillStyle = C.muted; ctx.font = font(500, 24);
  ctx.fillText('Completed on', 170, 930);
  ctx.fillStyle = C.ink; ctx.font = font(700, 30);
  ctx.fillText(date, 170, 972);
  ctx.textAlign = 'right'; ctx.font = font(700, 40, 'display');
  const verse = 'verse';
  const vw = ctx.measureText(verse).width;
  ctx.fillStyle = C.primary; ctx.fillText(verse, W - 170, 972);
  ctx.fillStyle = C.ink; ctx.fillText('lexi', W - 170 - vw, 972);
  ctx.textAlign = 'center'; ctx.fillStyle = C.muted; ctx.font = font(500, 20);
  ctx.fillText('A Lexiverse practice course certificate. Not an official qualification.', cx, 1030);
  return canvas;
}

const toBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
const fileName = (course) => `lexiverse-certificate-${course.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`;

export async function downloadCertificate(canvas, course) {
  const blob = await toBlob(canvas);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = fileName(course);
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

export async function shareCertificate(canvas, course) {
  const blob = await toBlob(canvas);
  const file = new File([blob], fileName(course), { type: 'image/png' });
  if (!navigator.canShare?.({ files: [file] })) return 'unsupported';
  try { await navigator.share({ files: [file], title: `${course} certificate`, text: `I finished the ${course} course on Lexiverse!` }); return 'shared'; }
  catch (e) { return e?.name === 'AbortError' ? 'cancelled' : 'failed'; }
}
