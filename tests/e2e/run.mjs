// End-to-end checks against the production build (vite preview).
// Usage: npm run e2e   (builds first). Screenshots go to tests/e2e/shots/.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { mockApis, PROFILE, SPEECH_STUB } from './fixtures.mjs';
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
  ['/words', 'words'], ['/learn', 'learn'], ['/me', 'me'], ['/nowhere', 'not-found'],
  ['/word/serendipity', 'word'], ['/word/serendipty', 'word-not-found'], ['/word/fail', 'word-error'], ['/word/defenestrate', 'word-partial'],
  ['/translate', 'translator'], ['/share/serendipity', 'share'],
  ['/progress', 'progress'], ['/words/list/saved', 'list-empty'],
  ['/learn/paths', 'paths'], ['/learn/path/waec', 'path-waec'], ['/learn/path/emails/email-start', 'lesson'], ['/learn/path/meetings', 'path-soon'], ['/learn/path/ielts', 'path-ielts'], ['/learn/path/sat/test', 'test-intro'], ['/learn/formats', 'formats'], ['/words?tab=notebook', 'notebook'],
  ['/learn/flashcards', 'flashcards'], ['/learn/quiz', 'quiz'], ['/learn/spell', 'spell'], ['/learn/match', 'match'], ['/learn/setup', 'practice-setup']
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
      if (route.startsWith('/word/')) await page.waitForSelector('.wd-meaning, .wd-state', { timeout: 8000 }).catch(() => {});
      if (route.startsWith('/word/serendipity')) await page.waitForSelector('.wd-lang-result p', { timeout: 5000 }).catch(() => {});
      if (route.startsWith('/share/')) await page.waitForSelector('.sh-card img', { timeout: 8000 }).catch(() => {});
      if (route.startsWith('/learn')) await page.waitForSelector('.fc-card, .lx-opt, .sp-input, .mt-tile, .su-group, .ln-hero, .pt-cat, .pd-lesson, .ps-tag, .fm-card', { timeout: 8000 }).catch(() => {});
      await settle(page);
      await page.screenshot({ path: `${SHOTS}${name}-${w}-${theme}.png`, fullPage: true });
      await check(`${name} ${w}px ${theme}: no overflow`, async () => assert.deepEqual(await overflow(page), []));
      if (w === 390 || w === 1440) await check(`${name} ${w}px ${theme}: axe has no serious issues`, async () => assert.deepEqual(await axe(page), []));
    }
    await check(`${w}px ${theme}: no script errors`, async () => assert.deepEqual(errors, []));
    await ctx.close();
  }
}

// Laptop and big-screen sizes: overflow on every screen, and real two-column layouts.
for (const [w, h] of [[1280, 800], [1920, 1080]]) {
  const ctx = await newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  for (const [route, name] of ROUTES) {
    await page.goto(BASE + route);
    await page.waitForSelector('#main h1');
    if (route.includes('q=')) await page.waitForSelector('.sr-rows:not([aria-busy]), .sr-state, .lx-error-card, .sr-section h2', { timeout: 5000 }).catch(() => {});
    if (route.startsWith('/word/')) await page.waitForSelector('.wd-meaning, .wd-state', { timeout: 8000 }).catch(() => {});
    if (route.startsWith('/share/')) await page.waitForSelector('.sh-card img', { timeout: 8000 }).catch(() => {});
    if (route.startsWith('/learn')) await page.waitForSelector('.fc-card, .lx-opt, .sp-input, .mt-tile, .su-group, .ln-hero, .pt-cat, .pd-lesson, .ps-tag, .fm-card', { timeout: 8000 }).catch(() => {});
    await settle(page);
    await page.screenshot({ path: `${SHOTS}${name}-${w}-light.png`, fullPage: true });
    await check(`${name} ${w}px: no overflow`, async () => assert.deepEqual(await overflow(page), []));
  }
  for (const [route, sel] of [['/', '.today-split'], ['/word/serendipity', '.wd-split'], ['/translate', '.tr-split'], ['/me', '.me-split'], ['/share/serendipity', '.sh-split']]) {
    await check(`${route} ${w}px: uses the width in two columns`, async () => {
      await page.goto(BASE + route);
      await page.waitForSelector(`${sel} > :nth-child(2)`);
      await settle(page);
      const r = await page.evaluate((s) => {
        const main = document.querySelector('#main').getBoundingClientRect();
        const [a, b] = [...document.querySelector(s).children].map((el) => el.getBoundingClientRect());
        return { main: main.width, sideBySide: b.left >= a.right - 1, topGap: Math.abs(b.top - a.top) };
      }, sel);
      assert.ok(r.main >= 900, `content is only ${Math.round(r.main)}px wide`);
      assert.ok(r.sideBySide, 'second column is not beside the first');
    });
  }
  await ctx.close();
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

await check('onboarding: each goal leads to its own question, level title and ready screen', async () => {
  const cases = [
    ['Everyday English', 'Where do you use English most?', 'Travel', 'Which word feels just right?', 'Your universe is ready', 'e'],
    ['Exam preparation', 'Which exam are you preparing for?', 'IELTS', 'Which word would you want in your IELTS answer?', 'Your IELTS universe is ready', 'x'],
    ['Better writing', 'What do you write most?', 'Stories', 'Which word would you love to use in your stories?', 'Your writing universe is ready', 'w'],
    ['Work and career', 'Where do you need English at work?', 'Meetings', 'Which word would you use in your meetings?', 'Your career universe is ready', 'k']
  ];
  for (const [goal, question, focus, levelTitle, ready, code] of cases) {
    const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
    const p = await c.newPage();
    await p.goto(BASE + '/welcome');
    await p.click('button:text("Let\'s go")');
    await p.click(`[role=radio]:has-text("${goal}")`);
    await p.click('button:text("Continue")');
    await p.waitForSelector(`h1:text("${question}")`);
    await p.click(`[role=radio]:has-text("${focus}")`);
    await p.click('button:text("Continue")');
    await p.waitForSelector(`h1:text("${levelTitle}")`);
    await p.click('button:text("Continue")');
    await p.click('button:text("Finish setup")');
    await p.waitForSelector(`h1:text("${ready}")`);
    const first = (await p.textContent('.ob-first b')).trim();
    const word = DAILY.find((w) => w.w === first);
    assert.ok(word && word.goals.includes(code), `${goal}: first word ${first} is not tagged ${code}`);
    const prof = JSON.parse(await p.evaluate(() => localStorage.getItem('lx-profile')));
    assert.equal(prof.goal, code);
    assert.ok(prof.focus, 'focus saved');
    await c.close();
  }
});

await check('me: changing the goal changes Today\'s word and chip', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.waitForSelector('.lx-goal-chip');
  const before = (await p.textContent('.lx-orbit-planet b')).trim();
  await p.goto(BASE + '/me');
  await p.selectOption('#me-goal', 'x');
  await p.selectOption('#me-focus', 'ielts');
  await p.goto(BASE + '/');
  await p.waitForSelector('.lx-goal-chip:has-text("IELTS")');
  const after = (await p.textContent('.lx-orbit-planet b')).trim();
  assert.ok(DAILY.find((w) => w.w === after).goals.includes('x'), `${after} is not an exam word`);
  assert.notEqual(after, before);
  await c.close();
});

await check('onboarding: goal is required, choices work by keyboard, setup lands on Today with a streak', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.waitForURL('**/welcome');
  await p.click('button:text("Let\'s go")');
  await p.waitForSelector('h1:text("What brings you")');
  await p.waitForFunction(() => document.activeElement.tagName === 'H1', null, { timeout: 2000 });
  await p.click('button:text("Continue")', { force: true });
  assert.ok(await p.isVisible('h1:text("What brings you")'), 'continue without a goal should not advance');
  await p.click('[role=radio]:has-text("Exam preparation")');
  await p.keyboard.press('ArrowDown');
  assert.equal(await p.getAttribute('[role=radio]:has-text("Better writing")', 'aria-checked'), 'true');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("What do you write most?")');
  await p.click('button:text("Continue")', { force: true });
  assert.ok(await p.isVisible('h1:text("What do you write most?")'), 'continue without a choice should not advance');
  await p.click('[role=radio]:has-text("Essays")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Which word would you love to use in your essays?")');
  await p.click('[role=radio]:has-text("Advanced")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Make it comfortable")');
  await p.fill('#ob-size', '1.2');
  await p.click('[role=switch]:near(:text("High contrast"))');
  assert.equal(await p.evaluate(() => document.documentElement.dataset.contrast), 'high');
  await p.click('[role=switch]:near(:text("High contrast"))');
  await p.click('button:text("Finish setup")');
  await p.waitForSelector('h1:text("Your writing universe is ready")');
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
  await p.waitForSelector('.lx-opt');
  assert.ok(!(await p.isVisible('.lx-nav')), 'tab bar hidden in the challenge');
  const options = await p.$$('.lx-opt');
  assert.equal(options.length, 3);
  await options[0].click();
  await p.waitForSelector('.lx-feedback');
  assert.equal(await p.locator('.lx-opt.right').count(), 1);
  assert.match(await p.textContent('.lx-feedback b'), /Spot on!|Not quite/);
  const before = await p.locator('.lx-opt.wrong, .lx-opt.right').count();
  await options[2].click({ force: true });
  assert.equal(await p.locator('.lx-opt.wrong, .lx-opt.right').count(), before, 'answer is locked after the first pick');
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
  // Five keystrokes; debouncing allows at most two searches (two requests each), never one per key.
  assert.ok(calls <= 4, `typing should be debounced (${calls} calls)`);
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
    const goal = w.goals[0];
    let day = null;
    for (let i = 0; i < 400 && !day; i++) {
      const d = new Date(2026, 9, 26 + i, 10);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (wordOfTheDay(DAILY, { level: w.l, goal, day: key }).w === w.w) day = d;
    }
    assert.ok(day, `no day found for ${w.w}`);
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    await c.clock.setFixedTime(day);
    await mockApis(c);
    await c.addInitScript(([level, goal]) => {
      localStorage.setItem('lx-profile', JSON.stringify({ goal, level, done: true }));
      localStorage.setItem('lx-settings', JSON.stringify({ textScale: 2 }));
    }, [w.l, goal]);
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
      await p.waitForSelector('.lx-opt');
      await p.addStyleTag({ content: '* { font-family: "DejaVu Sans Mono", monospace !important; }' });
      await settle(p);
      assert.deepEqual(await overflow(p), [], `${w.w} challenge overflows`);
    }
    await c.close();
  }
});

await check('word page: meanings, level, origin, family, translation and accessible orbit', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipity');
  await p.waitForSelector('.wd-meaning');
  assert.equal((await p.textContent('.wd-planet h1')).trim(), 'serendipity');
  assert.match(await p.textContent('.wd-level'), /C2|C1|B2/);
  const first = await p.textContent('.wd-meaning .wd-def');
  assert.match(first, /Luck in finding good things by chance/, 'our learner meaning comes first');
  assert.ok((await p.locator('.wd-meaning').count()) >= 2);
  assert.equal(await p.textContent('.wd-example b'), 'serendipity');
  assert.match(await p.textContent('.wd-journey'), /Horace Walpole/);
  assert.ok(await p.isVisible('.wd-family a:text("serendipitous")'));
  await p.waitForSelector('.wd-lang-result p');
  assert.equal(await p.textContent('.wd-lang-result p'), '[yo] serendipity');
  assert.match(await p.textContent('.wd-lang'), /to be checked by a native speaker/);
  await p.click('.wd-lang-tabs button:text("French")');
  await p.waitForSelector('.wd-lang-result p:text("[fr] serendipity")');
  assert.ok(await p.isVisible('.wd-lang-result button[aria-label="Listen in French"]'), 'French has a voice in the stub');
  await c.close();
});

await check('word page: read all speaks the word, then each meaning; slow is slower', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipity');
  await p.waitForSelector('.wd-meaning');
  await p.evaluate(() => { window.__spoken = []; });
  await p.click('.wd-play button:has-text("Read all")');
  await p.waitForFunction(() => window.__spoken.length >= 3);
  await p.waitForSelector('.wd-play button.on', { state: 'detached' });
  const spoken = await p.evaluate(() => window.__spoken.map((x) => x.text));
  assert.equal(spoken[0], 'serendipity');
  assert.match(spoken[1], /^noun\. Luck in finding/);
  await p.evaluate(() => { window.__spoken = []; });
  await p.click('.wd-play button:has-text("Slow")');
  await p.waitForFunction(() => window.__spoken.length >= 1);
  assert.equal(await p.evaluate(() => window.__spoken[0].rate), 0.6);
  await c.close();
});

await check('today: sound starts during the tap even when recordings are down (the iPhone rule)', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  // Runs after the button's own click handler: whatever speech started by then started "inside the tap".
  await c.addInitScript(() => addEventListener('click', () => { window.__inTap = (window.__primes || 0) + window.__spoken.length; }));
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.waitForSelector('.lx-listen');
  const word = await p.evaluate(() => document.querySelector('.lx-listen').getAttribute('aria-label').replace('Listen to ', ''));
  await p.click('.lx-listen');
  assert.ok(await p.evaluate(() => window.__inTap >= 1), 'nothing was spoken or unlocked during the tap');
  await p.waitForFunction((w) => window.__spoken.some((x) => x.text === w), word, { timeout: 4000 });
  await p.waitForSelector('.lx-listen[aria-pressed="false"]');
  // Second tap: the recordings host is known to be down, so the word is spoken inside the tap itself.
  await p.evaluate(() => { window.__spoken = []; window.__primes = 0; });
  await p.click('.lx-listen');
  assert.equal(await p.evaluate(() => window.__inTap), 1, 'second tap should speak synchronously');
  assert.equal(await p.getAttribute('.lx-listen', 'aria-pressed'), 'true');
  await p.click('.lx-listen');
  await p.waitForSelector('.lx-listen[aria-pressed="false"]');
  await c.close();
});

await check('word page: Read all stops on a second tap, and another button takes over', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipity');
  await p.waitForSelector('.wd-meaning');
  await p.evaluate(() => { window.__spoken = []; });
  await p.click('.wd-play button:has-text("Read all")');
  await p.waitForFunction(() => window.__spoken.length >= 1);
  await p.click('.wd-play button[aria-pressed="true"]:has-text("Stop")');
  await p.waitForSelector('.wd-play button[aria-pressed="true"]', { state: 'detached' });
  const n = await p.evaluate(() => window.__spoken.length);
  await p.waitForTimeout(1500);
  assert.equal(await p.evaluate(() => window.__spoken.length), n, 'kept reading after Stop');
  assert.ok(await p.isVisible('.wd-play button:has-text("Read all")'));
  await p.click('.wd-play button:has-text("Read all")');
  await p.waitForFunction(() => window.__spoken.length > 0);
  await p.evaluate(() => { window.__spoken = []; });
  await p.click('.wd-play button:has-text("Slow")');
  await p.waitForTimeout(1500);
  const after = await p.evaluate(() => window.__spoken.map((x) => x.text));
  assert.deepEqual(after, ['serendipity'], `Read all kept going after Slow: ${after.join(' | ')}`);
  await c.close();
});

await check('word page: save, undo, note and offline reopening', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipity');
  await p.waitForSelector('.wd-meaning');
  await p.click('button[aria-label="Save to My Words"]');
  await p.click('dialog[open] button:text("Save to My Words")');
  await p.waitForSelector('.lx-toast:has-text("Saved")');
  assert.equal(await p.getAttribute('.wd-top-actions button', 'aria-pressed'), 'true');
  await p.fill('#wd-note', 'Sounds like serene dip');
  await p.waitForSelector('.wd-note-status:text("Note saved")');
  await p.reload();
  await p.waitForSelector('.wd-meaning');
  await p.waitForFunction(() => document.querySelector('.wd-top-actions button')?.getAttribute('aria-pressed') === 'true');
  assert.equal(await p.inputValue('#wd-note'), 'Sounds like serene dip');
  await p.click('button[aria-label="Saved to My Words"]');
  await p.click('dialog[open] button:text("Remove from My Words")');
  await p.waitForFunction(() => document.querySelector('.wd-top-actions button')?.getAttribute('aria-pressed') === 'false');
  await p.click('.lx-toast button:text("Undo")');
  await p.waitForFunction(() => document.querySelector('.wd-top-actions button')?.getAttribute('aria-pressed') === 'true');
  await c.close();
});

await check('word page reopens offline from the device (service worker + cached entry)', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'allow' });
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipity');
  await p.waitForSelector('.wd-meaning');
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.reload();
  await p.waitForFunction(() => navigator.serviceWorker.controller);
  await p.waitForSelector('.wd-meaning');
  await c.setOffline(true);
  await p.reload();
  await p.waitForSelector('.wd-meaning', { timeout: 10000 });
  assert.match(await p.textContent('.wd-planet h1'), /serendipity/);
  await c.close();
});

await check('word page states: not found with suggestion, error with code, partial without recording', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipty');
  await p.waitForSelector('h1:has-text("couldn\'t find")');
  await p.waitForSelector('.wd-sugs a:text("serendipity")');
  await p.goto(BASE + '/word/fail');
  await p.waitForSelector('h1:text("This word got lost in space")', { timeout: 10000 });
  assert.match(await p.textContent('.wd-code'), /DICT-503/);
  await p.goto(BASE + '/word/defenestrate');
  await p.waitForSelector('.wd-meaning');
  assert.match(await p.textContent('.wd-device-voice'), /No recording yet/);
  await c.close();
});

await check('translator: phrasebook, picker search, machine translation, RTL, quota and swap', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/translate');
  await p.click('.tr-phrases button:text("Thank you for your help")');
  await p.waitForSelector('.tr-out');
  assert.equal(await p.textContent('.tr-out'), 'Ẹ ṣé fún ìrànlọ́wọ́ yín');
  assert.match(await p.textContent('.tr-result'), /Phrasebook · to be checked/);
  assert.ok(await p.isVisible('button:text("No voice")'), 'no Yoruba voice in the stub');
  await p.click('button[aria-label^="Translate into"]');
  await p.waitForSelector('dialog[open]');
  await p.fill('#lp-q', 'sw');
  assert.deepEqual(await p.$$eval('.lp-row b', (b) => b.map((x) => x.textContent)), ['Swahili', 'Swedish']);
  // First Esc clears the search box (browser behaviour), the second closes the sheet.
  await p.keyboard.press('Escape');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(200);
  assert.ok(!(await p.isVisible('dialog[open]')), 'Esc closes the picker');
  await p.click('button[aria-label^="Translate into"]');
  await p.fill('#lp-q', 'arab');
  await p.click('.lp-row:has-text("Arabic")');
  await p.fill('#tr-text', 'Thank you for your help');
  await p.waitForSelector('.tr-out[dir="rtl"]');
  assert.equal(await p.textContent('.tr-out'), 'شكرًا لمساعدتك');
  await p.click('button[aria-label="Swap languages"]');
  assert.equal(await p.inputValue('#tr-text'), 'شكرًا لمساعدتك');
  assert.match(await p.getAttribute('button[aria-label^="Translate from"]', 'aria-label'), /Arabic/);
  await p.click('button[aria-label="Swap languages"]');
  await p.fill('#tr-text', 'quota please');
  await p.waitForSelector('.lx-error-card:has-text("free translations are used up")', { timeout: 8000 });
  assert.match(await p.textContent('.lx-error-card'), /TR-429/);
  await p.fill('#tr-text', 'x'.repeat(600));
  assert.equal((await p.inputValue('#tr-text')).length, 500);
  assert.match(await p.textContent('.tr-count'), /500 \/ 500/);
  await c.close();
});

await check('share: the card image is drawn and can be saved', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  const p = await c.newPage();
  await p.goto(BASE + '/share/serendipity');
  await p.waitForSelector('.sh-card img');
  assert.match(await p.getAttribute('.sh-card img', 'src'), /^data:image\/png/);
  assert.match(await p.getAttribute('.sh-card img', 'alt'), /Word I learned today, serendipity/);
  const [download] = await Promise.all([p.waitForEvent('download'), p.click('button:has-text("Save image")')]);
  assert.equal(download.suggestedFilename(), 'lexiverse-serendipity.png');
  await c.close();
});

await check('flashcards: flip and grade by keyboard, summary, then Learn is all caught up', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/learn');
  await p.waitForSelector('.ln-hero h2:text("Start with a few new words")');
  await p.goto(BASE + '/learn/flashcards');
  await p.waitForSelector('.fc-card');
  assert.ok(!(await p.isVisible('.lx-nav')), 'tab bar hidden while practising');
  const total = Number((await p.textContent('.ps-count')).split('/')[1]);
  assert.equal(total, 10);
  await p.focus('.fc-card');
  await p.keyboard.press('Enter');
  assert.equal(await p.getAttribute('.fc-card', 'aria-expanded'), 'true');
  assert.deepEqual(await p.$$eval('.fc-grade span', (s) => s.map((x) => x.textContent)), ['later today', 'in 2 days', 'in 7 days']);
  await p.keyboard.press('3');
  for (let k = 1; k < total; k++) {
    await p.waitForSelector('.fc-card[aria-expanded="false"]');
    await p.focus('.fc-card');
    await p.keyboard.press('Space');
    await p.waitForSelector('.fc-grade');
    await p.keyboard.press('3');
  }
  await p.waitForSelector('h1:text("Your world grew!")');
  assert.match(await p.textContent('.rs-sub'), /10 of 10 got it/);
  await p.goto(BASE + '/learn');
  await p.waitForSelector('.ln-hero h2:has-text("All caught up")');
  assert.match(await p.textContent('.ln-hero p'), /in 7 days/);
  assert.match(await p.getAttribute('.ln-ring', 'aria-label'), /^10 of 10/);
  assert.match(await p.textContent('.lx-streak-chip'), /1 day/);
  await settle(p);
  await p.screenshot({ path: `${SHOTS}learn-390-caught-up.png`, fullPage: true });
  await c.close();
});

await check('quick quiz: five questions, answers lock, score at the end', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/learn/quiz');
  for (let k = 0; k < 5; k++) {
    await p.waitForSelector(`.ps-count:text("${k} / 5")`);
    const opts = await p.$$('.lx-opt');
    assert.equal(opts.length, 4);
    await opts[0].click();
    await p.waitForSelector('.lx-feedback');
    const marked = await p.locator('.lx-opt.right, .lx-opt.wrong').count();
    await opts[1].click({ force: true });
    assert.equal(await p.locator('.lx-opt.right, .lx-opt.wrong').count(), marked, 'locked after the first pick');
    await p.click('.ps-foot .lx-btn');
  }
  await p.waitForSelector('.rs-planet');
  assert.match(await p.textContent('.rs-sub'), /of 5 correct/);
  await c.close();
});

await check('listen and spell: wrong spelling shows letter feedback; hint then the right spelling', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/learn/spell');
  await p.waitForSelector('#spell-in');
  await p.fill('#spell-in', 'qqq');
  await p.click('button:text("Check")');
  await p.waitForSelector('.sp-letters');
  assert.ok(await p.locator('.sp-l.wrong, .sp-l.missing').count() > 0);
  const spokenBefore = await p.evaluate(() => window.__spoken.length);
  await p.click('button:text("Next word")');
  await p.waitForSelector('#spell-in:not([readonly])');
  await p.waitForFunction((n) => window.__spoken.length > n, spokenBefore);
  const word = await p.evaluate(() => window.__spoken[window.__spoken.length - 1].text);
  await p.click('button:text("Hint")');
  assert.match(await p.textContent('.sp-hint'), new RegExp(`${word.length} letters, starts with ${word[0]}`));
  await p.fill('#spell-in', word);
  await p.press('#spell-in', 'Enter');
  await p.waitForSelector('.lx-feedback b:text("Got it, with a hint!")');
  await c.close();
});

await check('word match: complete it with the keyboard only', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/match');
  await p.waitForSelector('.mt-tile.word');
  // Pick the first unmatched word, then try meanings until it matches (keyboard only).
  for (let guard = 0; guard < 40 && !(await p.isVisible('h1:text("All matched!")')); guard++) {
    if (!(await p.locator('.mt-tile.word.sel').count())) {
      await p.locator('.mt-tile.word:not(.done)').first().focus();
      await p.keyboard.press('Enter');
    }
    const before = await p.locator('.mt-tile.done').count();
    const defs = p.locator('.mt-tile.def:not(.done)');
    for (let d = 0; d < await defs.count(); d++) {
      await defs.nth(d).focus();
      await p.keyboard.press('Enter');
      await p.waitForTimeout(60);
      if (await p.isVisible('h1:text("All matched!")') || await p.locator('.mt-tile.done').count() > before) break;
    }
  }
  await p.waitForSelector('h1:text("All matched!")');
  await c.close();
});

await check('practice setup: 5 spelling questions only', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/learn/setup');
  await p.click('.lx-seg button:text("5")');
  for (const t of ['Meanings', 'Fill the gap', 'Listening']) await p.click(`.su-check:has-text("${t}")`);
  assert.equal(await p.locator('.su-check.on').count(), 1);
  await p.click('button:has-text("Start")');
  await p.waitForSelector('.ps-tag:text("Spelling")');
  assert.match(await p.textContent('.ps-count'), /0 \/ 5/);
  await c.close();
});

await check('Today shows how many words are ready to review', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.waitForSelector('.lx-orbit-planet');
  await p.waitForTimeout(300);
  await p.reload();
  await p.waitForSelector('.lx-today-card b:text("1 word ready to review")');
  await c.close();
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


// Phase 4: lists, progress and the archive.
const SEED_WORDS = DAILY.filter((w) => w.l === 2).slice(0, 3).map((w) => w.w);
async function seed(p) {
  await p.goto(BASE + '/words');
  await p.waitForSelector('#main h1');
  await p.evaluate(async ({ words, now }) => {
    const db = await new Promise((res, rej) => { const r = indexedDB.open('lexiverse', 1); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    const put = (store, v) => new Promise((res, rej) => { const t = db.transaction(store, 'readwrite'); t.objectStore(store).put(v); t.oncomplete = res; t.onerror = () => rej(t.error); });
    const DAY = 86400000;
    await put('lists', { id: 'lexam', name: 'Exam prep', colour: '#FF8A65', icon: 'cap', createdAt: now - 3 * DAY, updatedAt: now });
    for (const [i, w] of words.entries()) {
      await put('words', { id: w, saved: true, savedAt: now - i * 1000, listIds: ['lexam'], updatedAt: now });
      await put('history', { id: w, at: now - i * 3600000 });
    }
    await put('reviews', { id: words[0], interval: 0.007, ease: 2.3, due: now - 60000, reps: 2, lapses: 1, last: 'forgot' });
    await put('reviews', { id: words[1], interval: 30, ease: 2.5, due: now + 20 * DAY, reps: 4, lapses: 0, last: 'got' });
    const day = (n) => { const d = new Date(now - n * DAY); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
    localStorage.setItem('lx-activity', JSON.stringify({ days: [day(2), day(1), day(0)], minutes: { [day(1)]: 6, [day(0)]: 4 }, quizzes: { [day(0)]: 1 } }));
  }, { words: SEED_WORDS, now: FIXED_NOW.getTime() });
}

await check('lists: create, rename, delete and undo', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/words');
  await p.click('button:text("Create a list first")');
  await p.click('dialog[open] button:text("Create list")', { force: true });
  assert.equal(await p.isVisible('dialog[open]'), true, 'create without a name should do nothing');
  await p.fill('#lf-name', 'Exam prep');
  await p.click('dialog[open] button:text("Create list")');
  await p.waitForURL('**/words/list/*');
  await p.waitForSelector('h1:text("Exam prep")');
  await p.waitForSelector('h2:text("No words in this list yet")');
  await p.click('button[aria-label="List options"]');
  await p.click('dialog[open] button:text("Rename")');
  await p.fill('#rn-name', 'Finals');
  await p.click('dialog[open] button:text("Save")');
  await p.waitForSelector('h1:text("Finals")');
  const url = p.url();
  await p.click('button[aria-label="List options"]');
  await p.click('dialog[open] button:text("Delete list")');
  await p.click('dialog[open] button:text("Delete list")');
  await p.waitForURL(BASE + '/words');
  await p.click('.lx-toast button:text("Undo")');
  await p.waitForURL(url);
  await p.waitForSelector('h1:text("Finals")');
  await c.close();
});

await check('word page: save into a new list from the sheet', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/word/serendipity');
  await p.waitForSelector('.wd-meaning');
  await p.click('button[aria-label="Save to My Words"]');
  await p.click('dialog[open] button:text("New list")');
  await p.fill('#lf-name', 'Lovely words');
  await p.click('dialog[open] button:text("Create list")');
  await p.waitForSelector('dialog[open] .ss-row.on:has-text("Lovely words")');
  await p.click('dialog[open] button:text("Save to 1 list")');
  await p.waitForSelector('.lx-toast:has-text("Lovely words")');
  await p.goto(BASE + '/words');
  await p.waitForSelector('.mw-card:has-text("Lovely words"):has-text("1 word")');
  await p.click('.mw-card:has-text("Lovely words")');
  await p.waitForSelector('.ld-row:has-text("serendipity")');
  await p.goto(BASE + '/words');
  await p.waitForSelector('.mw-timeline:has-text("serendipity")');
  await p.fill('#mw-q', 'seren');
  await p.waitForSelector('.mw-row:has-text("serendipity")');
  await c.close();
});

await check('list detail: sort, remove with undo, and review just this list', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await seed(p);
  await p.goto(BASE + '/words/list/lexam');
  await p.waitForSelector('.ld-row');
  assert.match(await p.textContent('.ld-row:first-child .ld-status'), /Due/);
  await p.click('.lx-seg button:text("A to Z")');
  const names = await p.$$eval('.ld-word b', (bs) => bs.map((b) => b.textContent));
  assert.deepEqual(names, [...SEED_WORDS].sort());
  await p.click(`button[aria-label="Remove ${SEED_WORDS[2]} from this list"]`);
  await p.waitForFunction(() => document.querySelectorAll('.ld-row').length === 2);
  await p.click('.lx-toast button:text("Undo")');
  await p.waitForFunction(() => document.querySelectorAll('.ld-row').length === 3);
  await p.click('a:text("Review 1 due")');
  await p.waitForURL('**/learn/flashcards?list=lexam');
  await p.waitForSelector('.fc-card');
  assert.equal((await p.textContent('.ps-count')).replace(/\s/g, ''), `0/${SEED_WORDS.length}`);
  const first = await p.textContent('.fc-card');
  assert.ok(first.includes(SEED_WORDS[0]), 'the due word comes first');
  await c.close();
});

await check('progress: numbers, chart text, constellations and the archive', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await seed(p);
  await p.goto(BASE + '/learn');
  await p.click('a.lx-streak-chip');
  await p.waitForURL('**/progress');
  await p.waitForSelector('.pg-tile');
  assert.match(await p.textContent('.pg-sub'), /^3 words in 1 world$/);
  const tiles = await p.$$eval('.pg-tile b', (bs) => bs.map((b) => b.textContent));
  assert.deepEqual(tiles, ['3', '50%', '1']);
  assert.match(await p.textContent('#pg-min + .pg-total, .pg-total'), /10 min/);
  assert.match(await p.textContent('.pg-card ul.lx-sr'), /Monday 26 October \(today\): 4 minutes/);
  assert.match(await p.textContent('.pg-cons li.done'), /First quiz/);
  await p.waitForSelector('.pg-cal a.pg-day.today');
  assert.match(await p.getAttribute('.pg-cal a.pg-day.today', 'aria-label'), /Monday 26 October: \w+, (learned|missed)/);
  await p.click('.lx-seg button:text("List")');
  await p.waitForSelector('.pg-arc-list li');
  await c.close();
});

await check('phase 4 screens with data: overflow, axe and 200% text', async () => {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    for (const theme of THEMES) {
      const c = await newContext({ viewport: { width: w, height: h }, colorScheme: theme });
      const p = await c.newPage();
      await seed(p);
      for (const [route, name] of [['/words', 'words-full'], ['/words/list/lexam', 'list-detail'], ['/progress', 'progress-full']]) {
        await p.goto(BASE + route);
        await p.waitForSelector('.mw-card, .ld-row, .pg-tile');
        await settle(p);
        await p.screenshot({ path: `${SHOTS}${name}-${w}-${theme}.png`, fullPage: true });
        assert.deepEqual(await overflow(p), [], `${name} ${w} ${theme} overflows`);
        assert.deepEqual(await axe(p), [], `${name} ${w} ${theme} axe`);
      }
      if (w === 390 && theme === 'light') {
        await p.evaluate(() => localStorage.setItem('lx-settings', JSON.stringify({ textScale: 2 })));
        for (const route of ['/words', '/words/list/lexam', '/progress']) {
          await p.goto(BASE + route);
          await p.waitForSelector('.mw-card, .ld-row, .pg-tile');
          await settle(p);
          assert.deepEqual(await overflow(p), [], `${route} overflows at 200%`);
        }
        await p.screenshot({ path: `${SHOTS}progress-390-text-200.png`, fullPage: true });
      }
      await c.close();
    }
  }
});


// Learning paths
await check('paths: four categories, each with its own destination', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn');
  await p.click('a:text("Explore learning paths")');
  await p.waitForURL('**/learn/paths');
  for (const [name, desc] of [['Everyday English', 'Talk and understand with confidence'], ['Exam preparation', 'IELTS, WAEC, SAT and more'], ['Better writing', 'Essays, reports and stories'], ['Work and career', 'Emails, meetings and interviews']]) {
    await p.waitForSelector(`.pt-cat:has(h2:text("${name}")):has-text("${desc}")`);
  }
  assert.equal(await p.getAttribute('.pt-cat:has(h2:text("Everyday English")) a', 'href'), '/learn');
  const titles = {};
  for (const [cat, row, id] of [['Exam preparation', 'WAEC / NECO English', 'waec'], ['Better writing', 'Essays', 'essays'], ['Work and career', 'Emails', 'emails']]) {
    await p.goto(BASE + '/learn/paths');
    await p.click(`.pt-cat:has(h2:text("${cat}")) a.pt-row:has-text("${row}")`);
    await p.waitForURL(`**/learn/path/${id}`);
    await p.waitForSelector('.pd-lesson');
    titles[id] = (await p.textContent('#main h1')).trim();
  }
  assert.equal(new Set(Object.values(titles)).size, 3, 'each path is different');
  await p.goto(BASE + '/learn/paths');
  assert.equal(await p.locator('.pt-row.soon a, a.pt-row.soon').count(), 0, 'coming-soon items are not links');
  assert.ok(await p.locator('.pt-row.soon:has-text("Meetings")').count());
  await c.close();
});

await check('paths: a full WAEC lesson by keyboard, then progress shows', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/waec/waec-concord');
  await p.waitForSelector('h1:text("Find the real subject")');
  assert.ok(!(await p.isVisible('.lx-nav')), 'lessons are full screen');
  for (const heading of ['Each, every, one of', 'Either … or, neither … nor']) {
    await p.click('.ps-foot button:text-is("Next")');
    await p.waitForSelector(`h1:text("${heading}")`);
  }
  await p.click('button:text("Start the practice")');
  // 1: gap, answer "is" (right). 2: "has". 3: wrong on purpose ("was"). 4: "lives". 5: error part "are". 6: "is".
  const pick = async (text) => { await p.waitForFunction(() => document.activeElement?.tagName === 'H1'); const b = p.locator(`.lx-opt:has-text("${text}")`).first(); await b.focus(); await p.keyboard.press('Enter'); await p.waitForSelector('.lx-feedback'); await p.waitForFunction(() => document.activeElement?.textContent === 'Continue'); await p.keyboard.press('Enter'); };
  await p.waitForSelector('.ls-blank'); await pick('is');
  await p.waitForSelector('h1:has-text("Each of the students")'); await pick('has');
  await p.waitForSelector('h1:has-text("Neither the principal")'); await pick('was');
  await p.waitForSelector('h1:has-text("One of my brothers")'); await pick('lives');
  await p.waitForSelector('.ls-part');
  await p.click('.ls-part:text-is("are")');
  await p.waitForSelector('.lx-feedback:has-text("Correct: is")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:has-text("Mathematics")'); await pick('is');
  await p.waitForSelector('h1:text("Lesson complete!")');
  assert.match(await p.textContent('.rs-sub'), /5 of 6 correct/);
  assert.ok(await p.isVisible('.rs-missed:has-text("Neither the principal")'));
  await p.goto(BASE + '/learn/path/waec');
  await p.waitForSelector('.pd-lesson.done:has-text("Concord")');
  await p.goto(BASE + '/learn/paths');
  await p.waitForSelector('a.pt-row:has-text("WAEC"):has-text("1 of")');
  await c.close();
});

await check('paths: order and write tasks (email checks flag a missing closing)', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/emails/email-start');
  for (let i = 0; i < 3; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
  for (let i = 0; i < 3; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
  // Order task: sort by repeatedly moving the right item up.
  const want = ['Subject line', 'Greeting', 'Purpose of the email', 'Details', 'Closing line or request', 'Sign-off and your name'];
  for (let target = 0; target < want.length; target++) {
    let items = await p.$$eval('.ls-order-text', (els) => els.map((e) => e.textContent));
    let at = items.indexOf(want[target]);
    while (at > target) { await p.click(`button[aria-label="Move “${want[target]}” up"]`); at--; }
  }
  await p.click('button:text("Check order")');
  await p.waitForSelector('.lx-feedback:has-text("Perfect order!")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Lesson complete!")');
  assert.match(await p.textContent('.rs-sub'), /4 of 4 correct/);
  await p.click('.rs-actions a.lx-btn:not(.ghost)');
  await p.waitForURL('**/email-end');
  for (let i = 0; i < 2; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
  for (let i = 0; i < 3; i++) { await p.locator('.lx-opt, .ls-part').first().click(); await p.click('button:text("Continue")'); }
  await p.waitForSelector('#ls-write');
  await p.fill('#ls-write', 'Subject: Moving tomorrow’s meeting\n\nDear Mr Eze,\n\nCould we move tomorrow’s 10am meeting to 2pm? I have a client call in the morning that cannot be moved. Please let me know if that works for the team.');
  await p.click('button:text("Check my writing")');
  await p.waitForSelector('.ls-checks li.bad:has-text("Closing")');
  await p.fill('#ls-write', 'Subject: Moving tomorrow’s meeting\n\nDear Mr Eze,\n\nCould we move tomorrow’s 10am meeting to 2pm? I have a client call in the morning that cannot be moved, and I would like the whole team to be there. Please let me know if that works for you.\n\nBest regards,\nFunmi');
  await p.click('button:text("Check my writing")');
  await p.waitForSelector('.ls-checks li.ok:has-text("Closing")');
  assert.equal(await p.locator('.ls-checks li.bad').count(), 0);
  await p.click('button:text("See a model answer")');
  await p.waitForSelector('.ls-model:has-text("Kind regards")');
  await c.close();
});

await check('paths: onboarding with Exam then WAEC offers the WAEC path, and Learn shows it', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
  const p = await c.newPage();
  await p.goto(BASE + '/welcome');
  await p.click('button:text("Let\'s go")');
  await p.click('[role=radio]:has-text("Exam preparation")');
  await p.click('button:text("Continue")');
  await p.click('[role=radio]:has-text("WAEC")');
  await p.click('button:text("Continue")');
  await p.click('button:text("Continue")');
  await p.click('button:text("Finish setup")');
  await p.click('a:text("Start your WAEC path")');
  await p.waitForURL('**/learn/path/waec');
  await p.goto(BASE + '/learn');
  await p.waitForSelector('.ln-path:has-text("WAEC / NECO English"):has-text("Start: What the English paper tests")');
  await c.close();
});

await check('paths: screens with progress pass overflow, axe and 200% text', async () => {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    for (const theme of THEMES) {
      const c = await newContext({ viewport: { width: w, height: h }, colorScheme: theme });
      const p = await c.newPage();
      await p.goto(BASE + '/learn/path/essays/essay-shape');
      for (let i = 0; i < 3; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
      await p.locator('.lx-opt').nth(1).click();
      await p.waitForSelector('.lx-feedback');
      await settle(p);
      await p.screenshot({ path: `${SHOTS}lesson-feedback-${w}-${theme}.png`, fullPage: true });
      assert.deepEqual(await overflow(p), [], `lesson feedback ${w} ${theme}`);
      assert.deepEqual(await axe(p), [], `lesson feedback ${w} ${theme} axe`);
      await p.goto(BASE + '/learn/path/emails/email-end');
      for (let i = 0; i < 2; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
      for (let i = 0; i < 3; i++) { await p.locator('.lx-opt, .ls-part').first().click(); await p.click('button:text("Continue")'); }
      await p.fill('#ls-write', 'Hi, can we move it?');
      await p.click('button:text("Check my writing")');
      await p.click('button:text("See a model answer")');
      await settle(p);
      await p.screenshot({ path: `${SHOTS}lesson-write-${w}-${theme}.png`, fullPage: true });
      assert.deepEqual(await overflow(p), [], `write ${w} ${theme}`);
      assert.deepEqual(await axe(p), [], `write ${w} ${theme} axe`);
      await p.goto(BASE + '/learn/path/emails/email-start');
      for (let i = 0; i < 3; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
      for (let i = 0; i < 3; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
      await p.waitForSelector('.ls-order');
      await settle(p);
      assert.deepEqual(await overflow(p), [], `order ${w} ${theme}`);
      assert.deepEqual(await axe(p), [], `order ${w} ${theme} axe`);
      if (w === 390 && theme === 'light') {
        await p.evaluate(() => localStorage.setItem('lx-settings', JSON.stringify({ textScale: 2 })));
        for (const route of ['/learn/paths', '/learn/path/waec', '/learn/path/waec/waec-comprehension', '/learn']) {
          await p.goto(BASE + route);
          await p.waitForSelector('#main h1');
          await settle(p);
          assert.deepEqual(await overflow(p), [], `${route} overflows at 200%`);
        }
      }
      await c.close();
    }
  }
});


// Round 2: guides, formats, notebook and timed tests
await check('guides: every category and path explains how to use it', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/paths');
  await p.waitForSelector('.pt-cat');
  assert.equal(await p.locator('.pt-cat .pt-how').count(), 4);
  for (const id of ['waec', 'ielts', 'sat', 'essays', 'reports', 'stories', 'emails']) {
    await p.goto(BASE + `/learn/path/${id}`);
    await p.waitForSelector('.pd-guide li');
    assert.ok(await p.isVisible('a.pd-test:has-text("Timed practice test")'), `${id} has a test`);
    assert.ok(await p.isVisible('a.pd-test:has-text("Writing formats")'), `${id} links to formats`);
  }
  await p.click('.pd-guide summary');
  await p.waitForFunction(() => (localStorage.getItem('lx-guide-closed') || '').includes('emails'));
  await p.reload();
  await p.waitForSelector('.pd-guide');
  assert.equal(await p.getAttribute('.pd-guide', 'open'), null, 'closed guide stays closed');
  await c.close();
});

await check('formats: open a layout, copy it, save it to the notebook and find it there', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/paths');
  await p.click('a.pd-test:has-text("Writing formats")');
  await p.waitForURL('**/learn/formats');
  await p.click('.fm-chip:text("IELTS")');
  assert.equal(await p.locator('.fm-group').count(), 1);
  await p.click('.fm-head:has-text("Writing Task 2")');
  await p.waitForSelector('.fm-template');
  assert.match(await p.textContent('.fm-template'), /Introduction: paraphrase the question/);
  await p.click('button:text("Copy template")');
  await p.waitForSelector('.lx-toast:has-text("Template copied")');
  assert.match(await p.evaluate(() => navigator.clipboard.readText()), /Body paragraph 1/);
  await p.click('button:text("Save to notebook")');
  await p.waitForSelector('.lx-toast:has-text("Saved to your notebook")');
  await p.goto(BASE + '/words?tab=notebook');
  await p.waitForSelector('.nb-card:has-text("Writing Task 2")');
  await c.close();
});

await check('notebook: write, autosave, reload, search, delete and undo; tabs work by keyboard', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/words');
  await p.waitForSelector('[role=tab][aria-selected=true]:text("Words")');
  await p.focus('[role=tab]:text("Words")');
  await p.keyboard.press('ArrowRight');
  await p.waitForURL('**/words?tab=notebook');
  await p.waitForFunction(() => document.activeElement?.id === 'mw-tab-notebook');
  await p.waitForSelector('h2:text("Your notebook is empty")');
  await p.click('button:text("Write your first note")');
  await p.waitForURL('**/words/note/*');
  await p.fill('#ne-title', 'Concord rules');
  await p.fill('#ne-body', 'Each and every take a singular verb.\nNeither ... nor: the verb agrees with the nearer subject.');
  await p.waitForSelector('.ne-status:text("Saved")');
  const url = p.url();
  await p.reload();
  await p.waitForFunction(() => document.querySelector('#ne-body')?.value.includes('nearer subject'));
  assert.equal(await p.inputValue('#ne-title'), 'Concord rules');
  await p.goto(BASE + '/words?tab=notebook');
  await p.fill('#nb-q', 'nearer');
  await p.waitForSelector('.nb-card:has-text("Concord rules")');
  await p.fill('#nb-q', 'zzz');
  await p.waitForSelector('.mw-none');
  await p.goto(url);
  await p.click('button[aria-label="Delete note"]');
  await p.waitForURL('**/words?tab=notebook');
  await p.click('.lx-toast button:text("Undo")');
  await p.waitForURL(url);
  await p.waitForFunction(() => document.querySelector('#ne-title')?.value === 'Concord rules');
  await c.close();
});

await check('lessons: save a teaching card to the notebook', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/sat/sat-punctuation');
  await p.waitForSelector('h1:text("Two complete sentences")');
  await p.click('button:text("Save to notebook")');
  await p.waitForSelector('.lx-toast:has-text("Saved to your notebook")');
  await p.goto(BASE + '/words?tab=notebook');
  await p.waitForSelector('.nb-card:has-text("Two complete sentences"):has-text("SAT")');
  await c.close();
});

// A context whose timers are under test control (clock.install), for timed tests.
async function clockContext() {
  const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
  await ctx.clock.install({ time: FIXED_NOW });
  await mockApis(ctx);
  await ctx.addInitScript((pr) => localStorage.setItem('lx-profile', JSON.stringify(pr)), PROFILE);
  return ctx;
}

await check('timed test: countdown, pause, timer off, and time running out', async () => {
  let c = await clockContext();
  let p = await c.newPage();
  await p.goto(BASE + '/learn/path/sat/test');
  await p.click('button:text("Start the test")');
  await p.waitForSelector('[role=timer]:has-text("10:00")');
  await c.clock.runFor(5000);
  await p.waitForSelector('[role=timer]:has-text("9:55")');
  await p.click('button:text("Pause")');
  await p.waitForSelector('h1:text("Paused")');
  await c.clock.runFor(5000);
  await p.click('.ps-empty button:text("Resume")');
  await p.waitForSelector('[role=timer]:has-text("9:55")');
  await p.locator('.lx-opt').first().click();
  await p.click('button:text("Continue")');
  await c.clock.runFor(10 * 60 * 1000);
  await p.waitForSelector('h1:text("Time is up!")');
  assert.match(await p.textContent('.rs-missed'), /Not answered in time/);
  await p.goto(BASE + '/learn/path/sat');
  await p.waitForSelector('a.pd-test:has-text("Best:")');
  await c.close();

  c = await clockContext();
  p = await c.newPage();
  await p.goto(BASE + '/learn/path/emails/test');
  await p.click('button:text("Start the test")');
  await p.click('button:text("Turn off timer")');
  await p.waitForSelector('.pt-timer:has-text("Timer off")');
  assert.equal(await p.locator('[role=timer]').count(), 0);
  await c.clock.runFor(30 * 60 * 1000);
  assert.ok(!(await p.isVisible('h1:text("Time is up!")')), 'no time limit once the timer is off');
  for (let i = 0; i < 10; i++) {
    if (await p.isVisible('h1:text("Test complete!")')) break;
    await p.locator('.lx-opt, .ls-part').first().click();
    await p.click('button:text("Continue")');
  }
  await p.waitForSelector('h1:text("Test complete!")');
  await c.close();
});

await check('IELTS: listening plays the script and the speaking cue card counts down', async () => {
  const c = await clockContext();
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/ielts/ielts-listening');
  for (let i = 0; i < 3; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
  await p.click('button[aria-label="Play the recording"]');
  await p.waitForFunction(() => window.__spoken.some((x) => x.text.includes('Greenfield Sports Centre')));
  await p.click('button:text("Read the transcript")');
  await p.waitForSelector('.ls-script:has-text("Thursday evenings")');
  await p.click('.lx-opt:has-text("Thursday, 6.30")');
  await p.waitForSelector('.lx-feedback:has-text("Brilliant")');
  await p.goto(BASE + '/learn/path/ielts/ielts-speaking');
  for (let i = 0; i < 3; i++) await p.click('.ps-foot .lx-btn:not(.ghost)');
  for (let i = 0; i < 2; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
  await p.click('button:text("Start: 1:00 to prepare")');
  await p.waitForSelector('[role=timer]:has-text("1:00")');
  await c.clock.runFor(61000);
  await p.waitForSelector('[role=timer]:has-text("Speak now")');
  await c.clock.runFor(121000);
  await p.waitForSelector('.lx-feedback:has-text("Check yourself")');
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
