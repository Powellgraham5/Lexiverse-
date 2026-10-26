// End-to-end checks against the production build (vite preview).
// Usage: npm run e2e   (builds first). Screenshots go to tests/e2e/shots/.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const PORT = 4183;
const BASE = `http://localhost:${PORT}`;
const SHOTS = new URL('./shots/', import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });

const WIDTHS = [[390, 844], [768, 1024], [1024, 768], [1440, 900]];
const THEMES = ['light', 'dark'];
const ROUTES = [['/', 'today'], ['/search', 'search'], ['/words', 'words'], ['/learn', 'learn'], ['/me', 'me'], ['/nowhere', 'not-found']];

const results = [];
const check = async (name, fn) => {
  try { await fn(); results.push(['pass', name]); } catch (e) { results.push(['FAIL', name, e.message.split('\n')[0]]); }
};

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && resolve());
  server.on('exit', (c) => reject(new Error('preview exited ' + c)));
  setTimeout(() => reject(new Error('preview did not start')), 20000);
});

const browser = await chromium.launch();
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
  for (const el of document.querySelectorAll('#main *, .lx-nav *')) {
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
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const [route, name] of ROUTES) {
      await page.goto(BASE + route);
      await page.waitForSelector('#main h1');
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
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
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

await check('service worker installs and the app reloads offline', async () => {
  const c = await browser.newContext({ viewport: { width: 390, height: 844 } });
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
