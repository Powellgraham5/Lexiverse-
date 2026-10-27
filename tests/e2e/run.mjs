// End-to-end checks against the production build (vite preview).
// Usage: npm run e2e   (builds first). Screenshots go to tests/e2e/shots/.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { mockApis, PROFILE } from './fixtures.mjs';
import { wordOfTheDay } from '../../src/lib/daily.js';

// A fixed date so the word of the day, and every screenshot, is the same on every machine and day.
const FIXED_NOW = new Date('2026-10-26T10:00:00');
const DAILY = JSON.parse(readFileSync(new URL('../../public/data/daily.json', import.meta.url))).words;

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const PORT = 4183;
const BASE = `http://localhost:${PORT}`;
const SHOTS = new URL('./shots/', import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });

const WIDTHS = [[390, 844], [768, 1024], [1024, 768], [1440, 900]];
const THEMES = ['light', 'dark'];
const ROUTES = [
  ['/', 'today'], ['/search', 'search'], ['/search?q=seren', 'search-results'], ['/search?q=serendipty', 'search-did-you-mean'],
  ['/search?mode=letters&q=stone', 'search-letters'], ['/search?mode=rhymes&q=bright', 'search-rhymes'], ['/search?mode=pattern&q=c%3Ft', 'search-pattern'],
  ['/search?q=qwizzle', 'search-empty'], ['/search?q=fail', 'search-error'], ['/challenge', 'challenge'], ['/welcome', 'welcome'],
  ['/words', 'words'], ['/learn', 'learn'], ['/me', 'me'], ['/word/serendipity', 'word-soon'], ['/nowhere', 'not-found']
];

// A context with the fake APIs and, unless fresh, a learner who has finished onboarding.
async function newContext(options = {}, { fresh = false } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: 'block', ...options });
  await ctx.clock.setFixedTime(FIXED_NOW);
  await mockApis(ctx);
  if (!fresh) await ctx.addInitScript((p) => { if (!localStorage.getItem('lx-profile')) localStorage.setItem('lx-profile', JSON.stringify(p)); }, PROFILE);
  return ctx;
}

const results = [];
const check = async (name, fn) => {
  try { await fn(); results.push(['pass', name]); } catch (e) { results.push(['FAIL', name, e.message.split('\n').filter(Boolean).slice(0, 4).join(' / ')]); }
};

const browser = await chromium.launch();
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && resolve());
  server.on('exit', (c) => reject(new Error('preview exited ' + c)));
  setTimeout(() => reject(new Error('preview did not start')), 20000);
});

// Wait for fonts and every finite entrance animation, so contrast is measured on the settled screen.
const settle = (page) => page.evaluate(async () => {
  await document.fonts.ready;
  const finite = () => document.getAnimations().filter((a) => a.effect?.getComputedTiming().endTime !== Infinity && a.playState !== 'finished');
  for (let i = 0; i < 3 && finite().length; i++) await Promise.all(finite().map((a) => a.finished.catch(() => {})));
}).catch(() => {});

// Content that sticks out sideways or gets cut off.
const overflow = (page) => page.evaluate(() => {
  const out = [];
  if (document.documentElement.scrollWidth > innerWidth + 1) out.push(`page scrolls sideways (${document.documentElement.scrollWidth}px)`);
  for (const el of document.querySelectorAll('#main *:not(.lx-sr), .lx-nav *')) {
    const r = el.getBoundingClientRect();
    if (r.width && (r.right > innerWidth + 1 || r.left < -1) && !el.closest('.lx-starfield')) out.push(`${el.tagName}.${el.className} at ${Math.round(r.left)}-${Math.round(r.right)}`);
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === 'hidden' && el.clientWidth) out.push(`${el.tagName}.${el.className} clips text`);
  }
  return out.slice(0, 5);
});

const axe = async (page) => {
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
  return r.violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => `${v.id}: ${v.nodes.length} node(s) e.g. ${v.nodes[0].target}`);
};

for (const [w, h] of WIDTHS) {
  for (const theme of THEMES) {
    const ctx = await newContext({ viewport: { width: w, height: h }, colorScheme: theme });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const [route, name] of ROUTES) {
      await page.goto(BASE + route);
      await page.waitForSelector('#main h1');
      // Search results arrive after the 250 ms debounce.
      if (route.includes('q=')) await page.waitForSelector('.sr-rows:not([aria-busy]), .sr-state, .lx-error-card, .sr-section h2', { timeout: 5000 }).catch(() => {});
      await settle(page);
      await page.screenshot({ path: `${SHOTS}${name}-${w}-${theme}.png`, fullPage: true });
      await check(`${name} ${w}px ${theme}: no overflow`, async () => assert.deepEqual(await overflow(page), []));
      if (w === 390 || w === 1440) await check(`${name} ${w}px ${theme}: axe has no serious issues`, async () => assert.deepEqual(await axe(page), []));
    }
    await check(`${w}px ${theme}: no script errors`, async () => assert.deepEqual(errors, []));
    await ctx.close();
  }
}

// Behaviour checks at phone size
const ctx = await newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'allow' });
const page = await ctx.newPage();

await check('skip link is the first tab stop and jumps to content', async () => {
  await page.goto(BASE + '/');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
});

await check('nav marks the current tab and moves focus to the new heading', async () => {
  await page.goto(BASE + '/');
  await page.click('.lx-nav a[href="/me"]');
  await page.waitForSelector('#main h1:text("Me")');
  assert.equal(await page.getAttribute('.lx-nav a[href="/me"]', 'aria-current'), 'page');
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H1');
  assert.equal(await page.title(), 'Me & settings · Lexiverse');
});

await check('theme setting applies, persists and survives reload without flashing', async () => {
  await page.goto(BASE + '/me');
  await page.click('button:text("Dark")');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  await page.reload();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(7, 6, 26)');
  assert.ok(await page.isVisible('.lx-starfield'));
  await page.click('button:text("Light")');
  assert.ok(!(await page.isVisible('.lx-starfield')));
});

await check('high contrast, reading font and reduce motion switch on', async () => {
  await page.goto(BASE + '/me');
  await page.click('[role=switch][aria-labelledby]:near(:text("High contrast"))');
  await page.click('button:text("Hyperlegible")');
  await page.click('[role=switch]:near(:text("Reduce motion"))');
  const d = await page.evaluate(() => ({ ...document.documentElement.dataset }));
  assert.equal(d.contrast, 'high'); assert.equal(d.font, 'reading'); assert.equal(d.motion, 'reduce');
  assert.match(await page.evaluate(() => getComputedStyle(document.body).fontFamily), /Atkinson/);
  await page.screenshot({ path: `${SHOTS}me-390-high-contrast.png`, fullPage: true });
  assert.deepEqual(await axe(page), []);
});

await check('200% text: layout holds and the nav still fits', async () => {
  await page.evaluate(() => localStorage.setItem('lx-settings', JSON.stringify({ textScale: 2 })));
  for (const [route, name] of ROUTES) {
    await page.goto(BASE + route);
    await page.waitForSelector('#main h1');
    await settle(page);
    assert.deepEqual(await overflow(page), [], `${name} overflows at 200%`);
  }
  await page.goto(BASE + '/me');
  await settle(page);
  await page.screenshot({ path: `${SHOTS}me-390-text-200.png`, fullPage: true });
  await page.evaluate(() => localStorage.clear());
});

await check('offline banner appears and clears', async () => {
  await page.goto(BASE + '/');
  await ctx.setOffline(true);
  await page.waitForSelector('.lx-offline');
  await settle(page);
  await page.screenshot({ path: `${SHOTS}today-390-offline.png` });
  await ctx.setOffline(false);
  await page.waitForSelector('.lx-offline', { state: 'detached' });
});
await ctx.close();

await check('onboarding: goal is required, choices work by keyboard, setup lands on Today with a streak', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.waitForURL('**/welcome');
  await p.click('button:text("Let\'s go")');
  await p.waitForSelector('h1:text("What brings you")');
  assert.equal(await p.evaluate(() => document.activeElement.tagName), 'H1');
  await p.click('button:text("Continue")', { force: true });
  assert.ok(await p.isVisible('h1:text("What brings you")'), 'continue without a goal should not advance');
  await p.click('[role=radio]:has-text("Exam preparation")');
  await p.keyboard.press('ArrowDown');
  assert.equal(await p.getAttribute('[role=radio]:has-text("Better writing")', 'aria-checked'), 'true');
  await p.click('button:text("Continue")');
  await p.click('[role=radio]:has-text("serendipity")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Make it comfortable")');
  await p.fill('#ob-size', '1.2');
  await p.click('[role=switch]:near(:text("High contrast"))');
  assert.equal(await p.evaluate(() => document.documentElement.dataset.contrast), 'high');
  await p.click('[role=switch]:near(:text("High contrast"))');
  await p.click('button:text("Finish setup")');
  await p.waitForSelector('h1:text("Your universe is ready")');
  const first = await p.textContent('.ob-first b');
  assert.ok(first && first !== 'ready', 'first word shown');
  assert.deepEqual(JSON.parse(await p.evaluate(() => localStorage.getItem('lx-profile'))).level, 3);
  await p.click('button:text("Start exploring")');
  await p.waitForSelector('.lx-orbit-planet');
  assert.equal((await p.textContent('.lx-orbit-planet b')).trim(), first.trim());
  assert.match(await p.textContent('.lx-streak-chip'), /1 day/);
  await c.close();
});

await check('daily challenge: answer, feedback, then Today shows done for the day', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.click('a:text("Daily challenge")');
  await p.waitForSelector('.ch-option');
  assert.ok(!(await p.isVisible('.lx-nav')), 'tab bar hidden in the challenge');
  const options = await p.$$('.ch-option');
  assert.equal(options.length, 3);
  await options[0].click();
  await p.waitForSelector('.ch-feedback');
  assert.equal(await p.locator('.ch-option.right').count(), 1);
  assert.match(await p.textContent('.ch-feedback b'), /Spot on!|Not quite/);
  const before = await p.locator('.ch-option.wrong, .ch-option.right').count();
  await options[2].click({ force: true });
  assert.equal(await p.locator('.ch-option.wrong, .ch-option.right').count(), before, 'answer is locked after the first pick');
  await p.click('button:text("Done · keep my streak")');
  await p.waitForSelector('.lx-done');
  assert.match(await p.textContent('.lx-done h2'), /done for today/);
  await settle(p);
  await p.screenshot({ path: `${SHOTS}today-390-done.png`, fullPage: true });
  await c.close();
});

await check('search: debounced results, did you mean, empty, error and Enter opens the word', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  let calls = 0;
  p.on('request', (r) => r.url().includes('datamuse') && calls++);
  await p.goto(BASE + '/search');
  await p.type('#q', 'seren', { delay: 30 });
  await p.waitForSelector('.sr-row b:text("serendipity")');
  assert.ok(calls <= 2, `typing should be debounced (${calls} calls)`);
  await p.fill('#q', 'serendipty');
  await p.waitForSelector('.sr-suggest a:text("serendipity")');
  await p.fill('#q', 'qwizzle');
  await p.waitForSelector('.sr-state h2:has-text("isn\'t in our universe")');
  await p.fill('#q', 'fail');
  await p.waitForSelector('.lx-error-card:has-text("Search isn\'t responding")', { timeout: 8000 });
  assert.match(await p.textContent('.lx-error-card'), /DICT-503/);
  await p.fill('#q', 'serene');
  await p.press('#q', 'Enter');
  await p.waitForURL('**/word/serene');
  await p.goto(BASE + '/search');
  assert.ok(await p.isVisible('.sr-recent a:text("serene")'), 'recent search remembered');
  await c.close();
});

await check('search modes: meaning, pattern, rhymes and offline letters', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/search');
  await p.waitForTimeout(1800);
  await p.click('.sr-modes button:text("Meaning")');
  await p.fill('#q', 'person who loves books');
  await p.waitForSelector('.sr-best');
  assert.match(await p.textContent('.sr-row:has(.sr-best) b'), /bibliophile/);
  await p.click('.sr-modes button:text("Pattern")');
  await p.fill('#q', 'c?t');
  await p.waitForSelector('.sr-row b:text("cot")');
  assert.equal(await p.locator('.sr-slots span').count(), 3);
  await p.click('.sr-modes button:text("Rhymes")');
  await p.fill('#q', 'bright');
  await p.waitForSelector('h2:text("2 syllables")');
  await c.setOffline(true);
  await p.click('.sr-modes button:text("Letters")');
  await p.fill('#q', 'stone');
  await p.waitForSelector('h2:text("Uses all 5 letters")');
  assert.ok(await p.isVisible('.lx-chip:text("notes")'));
  await p.click('.sr-modes button:text("Word")');
  await p.fill('#q', 'bene');
  await p.waitForSelector('.sr-state h2:text("You\'re offline")');
  await c.close();
});

await check('large text: the Today orbit becomes a list and nothing overflows', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(() => localStorage.setItem('lx-settings', JSON.stringify({ textScale: 2 })));
  const p = await c.newPage();
  for (const r of ['/', '/challenge', '/search?q=seren', '/welcome']) {
    await p.goto(BASE + r);
    await p.waitForSelector('#main h1');
    await p.waitForTimeout(400);
    await settle(p);
    assert.deepEqual(await overflow(p), [], `${r} overflows at 200%`);
  }
  await p.goto(BASE + '/');
  await p.waitForSelector('.lx-orbit-planet');
  await settle(p);
  await p.screenshot({ path: `${SHOTS}today-390-text-200.png`, fullPage: true });
  await c.close();
});

await check('the longest daily words fit at 200% text, even in a wide fallback font', async () => {
  // Words with the longest spelling or IPA, each shown on a day where it is the word of the day.
  const longest = [...DAILY].sort((a, b) => (b.w.length + (b.ipa || '').length) - (a.w.length + (a.ipa || '').length)).slice(0, 10);
  for (const w of longest) {
    let day = null;
    for (let i = 0; i < 400 && !day; i++) {
      const d = new Date(2026, 9, 26 + i, 10);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (wordOfTheDay(DAILY, { level: w.l, goal: 'e', day: key }).w === w.w) day = d;
    }
    assert.ok(day, `no day found for ${w.w}`);
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    await c.clock.setFixedTime(day);
    await mockApis(c);
    await c.addInitScript(([level]) => {
      localStorage.setItem('lx-profile', JSON.stringify({ goal: 'e', level, done: true }));
      localStorage.setItem('lx-settings', JSON.stringify({ textScale: 2 }));
    }, [w.l]);
    const p = await c.newPage();
    await p.goto(BASE + '/');
    await p.waitForSelector('.lx-orbit-planet');
    // Monospace is far wider than any real fallback font: if this fits, any device fits.
    await p.addStyleTag({ content: '* { font-family: "DejaVu Sans Mono", monospace !important; }' });
    await settle(p);
    assert.equal((await p.textContent('.lx-orbit-planet b')).trim(), w.w);
    assert.deepEqual(await overflow(p), [], `${w.w} overflows`);
    for (const r of ['/challenge']) {
      await p.goto(BASE + r);
      await p.waitForSelector('.ch-option');
      await p.addStyleTag({ content: '* { font-family: "DejaVu Sans Mono", monospace !important; }' });
      await settle(p);
      assert.deepEqual(await overflow(p), [], `${w.w} challenge overflows`);
    }
    await c.close();
  }
});

await check('service worker installs and the app reloads offline', async () => {
  const c = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript((pr) => localStorage.setItem('lx-profile', JSON.stringify(pr)), PROFILE);
  // Record toasts as they appear, since they leave after 4 s.
  await c.addInitScript(() => {
    window.__toasts = [];
    new MutationObserver(() => document.querySelectorAll('.lx-toast-text').forEach((t) => !__toasts.includes(t.textContent) && __toasts.push(t.textContent)))
      .observe(document, { childList: true, subtree: true });
  });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.waitForFunction(() => __toasts.includes('Lexiverse now works offline'), null, { timeout: 15000 });
  await c.setOffline(true);
  await p.goto(BASE + '/learn');
  await p.waitForSelector('#main h1:text("Learn")');
  await p.goto(BASE + '/');
  await p.waitForSelector('.lx-orbit-planet', { timeout: 8000 });
  await c.close();
});

await check('manifest is valid and installable', async () => {
  const p = await browser.newPage();
  await p.goto(BASE + '/');
  const cdp = await p.context().newCDPSession(p);
  assert.deepEqual((await cdp.send('Page.getAppManifest')).errors, []);
  assert.deepEqual((await cdp.send('Page.getInstallabilityErrors')).installabilityErrors, []);
  await p.close();
});

await browser.close();
server.kill();

const failed = results.filter((r) => r[0] === 'FAIL');
for (const r of failed) console.log(r.join('  '));
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed. Screenshots in tests/e2e/shots/`);
process.exit(failed.length ? 1 : 0);
