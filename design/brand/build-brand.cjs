// Generates the Lexiverse app icon, favicon, maskable icon and splash screens.
// Run: node design/brand/build-brand.cjs   (needs Playwright with Chromium)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..', '..');
const BRAND = __dirname;
const ICONS = path.join(ROOT, 'public', 'icons');
const SPLASH = path.join(ROOT, 'public', 'splash');
[ICONS, SPLASH].forEach((d) => fs.mkdirSync(d, { recursive: true }));

const C = { primary: '#1F5BFF', deep: '#1440C9', light: '#4F86FF', coral: '#FF5C39', yellow: '#FFC530', soft: '#E3EBFF', night: '#0A0F1E', bg: '#FFFCF5', ink: '#14123A' };

// The planet, its tilted ring and a moon. The ring's back half sits behind the planet, the front half in front.
const orbit = (id) => `
  <defs>
    <clipPath id="${id}-front"><rect x="0" y="256" width="512" height="256"/></clipPath>
    <radialGradient id="${id}-planet" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F1EEFF"/><stop offset="1" stop-color="#C9C0FF"/></radialGradient>
  </defs>
  <g transform="rotate(-22 256 256)">
    <ellipse cx="256" cy="256" rx="190" ry="58" fill="none" stroke="#D96A48" stroke-width="24"/>
  </g>
  <circle cx="256" cy="256" r="104" fill="url(#${id}-planet)"/>
  <g transform="rotate(-22 256 256)">
    <ellipse cx="256" cy="256" rx="190" ry="58" fill="none" stroke="${C.coral}" stroke-width="24" clip-path="url(#${id}-front)"/>
    <circle cx="420" cy="285" r="26" fill="${C.yellow}"/>
  </g>`;

const sparkle = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-10C1-3 3-1 10 0C3 1 1 3 0 10C-1 3-3 1-10 0C-3-1-1-3 0-10z" fill="${fill}"/>`;

const tile = (id) => `
  <defs><linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.light}"/><stop offset="1" stop-color="${C.deep}"/></linearGradient></defs>`;

const sparkles = sparkle(112, 116, 2.2, '#FFFFFF') + sparkle(404, 112, 1.3, C.yellow) + sparkle(392, 410, 1.6, '#FFFFFF');

// App icon with rounded corners (browsers, desktop install).
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${tile('i')}
  <rect width="512" height="512" rx="116" fill="url(#i-bg)"/>${sparkles}${orbit('i')}</svg>`;

// Maskable icon: full-bleed background, artwork scaled into the 80% safe zone so Android can crop it to any shape.
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${tile('m')}
  <rect width="512" height="512" fill="url(#m-bg)"/><g transform="translate(256 256) scale(.78) translate(-256 -256)">${sparkles}${orbit('m')}</g></svg>`;

// iOS draws its own rounded corners, so the touch icon is square and full-bleed.
const apple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${tile('a')}
  <rect width="512" height="512" fill="url(#a-bg)"/><g transform="translate(256 256) scale(.9) translate(-256 -256)">${sparkles}${orbit('a')}</g></svg>`;

// Favicon: no sparkles, thicker ring, so it still reads at 16 px.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${tile('f')}
  <rect width="512" height="512" rx="128" fill="url(#f-bg)"/>
  <g transform="translate(256 256) scale(1.12) translate(-256 -256)">${orbit('f').replace(/stroke-width="24"/g, 'stroke-width="34"')}</g></svg>`;

fs.writeFileSync(path.join(BRAND, 'icon.svg'), icon);
fs.writeFileSync(path.join(BRAND, 'icon-maskable.svg'), maskable);
fs.writeFileSync(path.join(BRAND, 'icon-apple.svg'), apple);
fs.writeFileSync(path.join(ROOT, 'public', 'favicon.svg'), favicon);

// Splash: icon artwork, wordmark and line, light and dark (dark gets the starfield).
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (n) => { const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return x - Math.floor(x); };
  const d = (2 + r(3) * 5).toFixed(1);
  return `<i style="left:${(r(1) * 100).toFixed(2)}%;top:${(r(2) * 100).toFixed(2)}%;width:${d}px;height:${d}px;opacity:${(0.25 + r(4) * 0.6).toFixed(2)}"></i>`;
}).join('');
const splashHtml = (w, h, dark, m = Math.min(w, h)) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700&family=Inter:wght@500&display=swap">
<style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:${dark ? C.night : C.bg}}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${m * 0.04}px}
.mark{width:${m * 0.42}px;height:${m * 0.42}px}
.word{font-family:Unbounded,sans-serif;font-weight:700;font-size:${m * 0.1}px;letter-spacing:-0.02em;color:${dark ? '#F3F1FF' : C.ink}}
.word span{color:${dark ? '#8FB0FF' : C.primary}}
.line{font-family:Inter,sans-serif;font-weight:500;font-size:${m * 0.037}px;color:${dark ? '#B4B0DA' : '#3B3866'}}
.sky i{position:absolute;border-radius:50%;background:#FFFFFF}</style></head><body>
${dark ? `<div class="sky">${stars}</div>` : ''}
<div class="wrap"><svg class="mark" viewBox="0 0 512 512">${dark ? sparkle(112, 116, 2.2, '#FFFFFF') + sparkle(404, 112, 1.3, C.yellow) : sparkle(112, 116, 2.2, C.primary) + sparkle(404, 112, 1.3, C.coral)}${orbit('s')}</svg>
<div class="word">lexi<span>verse</span></div><div class="line">Pass JAMB. Write like a pro.</div></div></body></html>`;

// iOS launch images: [css width, css height, pixel ratio]
const phones = [[375, 667, 2], [414, 896, 2], [375, 812, 3], [390, 844, 3], [393, 852, 3], [414, 896, 3], [428, 926, 3], [430, 932, 3], [402, 874, 3], [440, 956, 3]];
// iPads open the installed app in either orientation, so they get portrait and landscape images.
const ipads = [[744, 1133, 2], [768, 1024, 2], [810, 1080, 2], [820, 1180, 2], [834, 1112, 2], [834, 1194, 2], [834, 1210, 2], [1024, 1366, 2], [1032, 1376, 2]];
const devices = [...phones.map((d) => [...d, 'portrait']), ...ipads.flatMap((d) => [[...d, 'portrait'], [...d, 'landscape']])];
// IPAD_ONLY=1 renders just the iPad images (the phone images are already in public/splash).
const ONLY_IPAD = process.env.IPAD_ONLY === '1';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const png = async (svg, size, file) => {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
    await page.screenshot({ path: file, omitBackground: true });
  };
  if (!ONLY_IPAD) for (const s of [192, 512]) await png(icon, s, path.join(ICONS, `icon-${s}.png`));
  if (!ONLY_IPAD) for (const s of [192, 512]) await png(maskable, s, path.join(ICONS, `icon-maskable-${s}.png`));
  if (!ONLY_IPAD) await png(apple, 180, path.join(ICONS, 'apple-touch-icon.png'));
  if (!ONLY_IPAD) await png(favicon, 32, path.join(ICONS, 'favicon-32.png'));
  if (!ONLY_IPAD) await png(favicon, 16, path.join(ICONS, 'favicon-16.png'));

  const links = [];
  for (const [w, h, dpr, orient] of devices) {
    const land = orient === 'landscape';
    const pw = (land ? h : w) * dpr, ph = (land ? w : h) * dpr;
    for (const dark of [false]) {
      const name = `splash-${pw}x${ph}${dark ? '-dark' : ''}.png`;
      const isPad = ipads.some(([a, b]) => a === w && b === h);
      if (!ONLY_IPAD || isPad) {
        await page.setViewportSize({ width: pw, height: ph });
        await page.setContent(splashHtml(pw, ph, dark), { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: path.join(SPLASH, name) });
      }
      links.push(`<link rel="apple-touch-startup-image" media="(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: ${orient})" href="/splash/${name}">`);
    }
  }
  fs.writeFileSync(path.join(SPLASH, 'startup-links.html'), '<!-- Paste into <head> for iOS launch screens -->\n' + links.join('\n') + '\n');
  await browser.close();
  console.log('done');
})();
