// "Share a word": draws a card on a canvas and shares it as an image (or downloads it).

const W = 1080, H = 1350;

function wrap(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

// Draws the card and returns the canvas. theme: 'light' | 'dark'.
export async function drawCard(canvas, { word, ipa, pos, def, theme = 'light' }) {
  const dark = theme === 'dark';
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  await document.fonts?.ready;
  ctx.fillStyle = dark ? '#07061A' : '#EEF0FF';
  ctx.fillRect(0, 0, W, H);
  if (dark) {
    for (let i = 0; i < 90; i++) {
      const x = (Math.sin(i * 127.1) * 43758.5453 % 1 + 1) % 1 * W;
      const y = (Math.sin(i * 311.7) * 43758.5453 % 1 + 1) % 1 * H;
      ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 5) / 10})`;
      ctx.beginPath(); ctx.arc(x, y, 1 + (i % 3), 0, Math.PI * 2); ctx.fill();
    }
  }
  // Orbit rings and planet
  ctx.strokeStyle = dark ? '#3A3670' : '#B9B4F5';
  ctx.lineWidth = 4; ctx.setLineDash([14, 12]);
  ctx.beginPath(); ctx.arc(W / 2, 400, 250, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = dark ? '#5B43F0' : '#4A2FE0';
  ctx.beginPath(); ctx.arc(W / 2, 400, 175, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FF8A65';
  ctx.beginPath(); ctx.arc(W / 2 + 250 * Math.cos(-0.6), 400 + 250 * Math.sin(-0.6), 26, 0, Math.PI * 2); ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#F2F0FF';
  ctx.font = '700 24px "Inter Variable", Inter, sans-serif';
  ctx.fillText('WORD I LEARNED', W / 2, 392);
  ctx.fillText('TODAY', W / 2, 426);
  const ink = dark ? '#F3F1FF' : '#14123A';
  const muted = dark ? '#B4B0DA' : '#3B3866';
  let size = 104;
  ctx.font = `700 ${size}px "Unbounded Variable", Unbounded, sans-serif`;
  while (ctx.measureText(word).width > W - 160 && size > 48) { size -= 4; ctx.font = `700 ${size}px "Unbounded Variable", Unbounded, sans-serif`; }
  ctx.fillStyle = ink;
  ctx.fillText(word, W / 2, 790);
  ctx.font = '500 40px "Inter Variable", Inter, sans-serif';
  ctx.fillStyle = muted;
  ctx.fillText([ipa, pos].filter(Boolean).join(' · '), W / 2, 860);
  ctx.font = '600 46px "Inter Variable", Inter, sans-serif';
  ctx.fillStyle = ink;
  wrap(ctx, def, W - 200).slice(0, 4).forEach((l, i) => ctx.fillText(l, W / 2, 960 + i * 62));
  ctx.font = '700 44px "Unbounded Variable", Unbounded, sans-serif';
  ctx.fillStyle = ink;
  const mark = 'lexi', verse = 'verse';
  const mw = ctx.measureText(mark + verse).width;
  ctx.textAlign = 'left';
  ctx.fillText(mark, W / 2 - mw / 2, H - 90);
  ctx.fillStyle = dark ? '#A99BFF' : '#4A2FE0';
  ctx.fillText(verse, W / 2 - mw / 2 + ctx.measureText(mark).width, H - 90);
  return canvas;
}

const toBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

export async function shareImage(canvas, word) {
  const blob = await toBlob(canvas);
  const file = new File([blob], `lexiverse-${word}.png`, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: word, text: `Word I learned today: ${word}` }); return 'shared'; } catch (e) {
      if (e?.name === 'AbortError') return 'cancelled';
    }
  }
  downloadBlob(blob, file.name);
  return 'downloaded';
}

export async function saveImage(canvas, word) {
  downloadBlob(await toBlob(canvas), `lexiverse-${word}.png`);
}

function downloadBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export const wordLink = (word) => `${location.origin}/word/${encodeURIComponent(word)}`;
