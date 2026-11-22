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
  ['/learn/paths', 'paths'], ['/learn/path/waec', 'path-waec'], ['/learn/path/emails/email-start', 'lesson'], ['/learn/path/other-exams', 'path-soon'], ['/learn/path/letters', 'path-letters'], ['/learn/path/jamb', 'path-jamb'], ['/learn/bank/jamb', 'bank'], ['/today', 'today-word'], ['/learn/bank/jamb/english', 'bank-setup'], ['/learn/path/toefl', 'path-toefl'], ['/learn/path/ielts', 'path-ielts'], ['/learn/path/sat/test', 'test-intro'], ['/learn/formats', 'formats'], ['/words?tab=notebook', 'notebook'], ['/help', 'help'], ['/learn/mock', 'mock-setup'], ['/certificate/emails', 'certificate-locked'],
  ['/learn/flashcards', 'flashcards'], ['/learn/quiz', 'quiz'], ['/learn/spell', 'spell'], ['/learn/match', 'match'], ['/learn/setup', 'practice-setup']
];

// A context with the fake APIs and, unless fresh, a learner who has finished onboarding.
// Clicks through a lesson's teaching cards, however many it has, to the first exercise.
async function skipCards(p) {
  for (let i = 0; i < 15; i++) {
    const b = p.locator('.ps-foot .lx-btn:not(.ghost)');
    await b.waitFor();
    const text = await b.textContent();
    await b.click();
    if (text.includes('Start the practice')) return;
  }
  throw new Error('lesson has too many cards');
}

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
      // Screens that load data show a busy placeholder first; check the finished screen.
      await page.waitForFunction(() => !document.querySelector('[aria-busy="true"]'), null, { timeout: 8000 }).catch(() => {});
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
    // Screens that load data show a busy placeholder first; check the finished screen.
    await page.waitForFunction(() => !document.querySelector('[aria-busy="true"]'), null, { timeout: 8000 }).catch(() => {});
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
    // Screens that load data show a busy placeholder first; check the finished screen.
    await page.waitForFunction(() => !document.querySelector('[aria-busy="true"]'), null, { timeout: 8000 }).catch(() => {});
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

await check('onboarding: a subject with a course opens straight away; other choices see the ready screen', async () => {
  const direct = [
    ['Exam preparation', 'Which exam are you preparing for?', 'JAMB', '/learn/bank/jamb', 'JAMB practice questions', 'x'],
    ['Exam preparation', 'Which exam are you preparing for?', 'IELTS', '/learn/path/ielts', 'IELTS', 'x'],
    ['Better writing', 'What do you write most?', 'Letters', '/learn/path/letters', 'Letters', 'w'],
    ['Work and career', 'Where do you need English at work?', 'Emails', '/learn/path/emails', 'Emails', 'k']
  ];
  for (const [goal, question, focus, url, title, code] of direct) {
    const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
    const p = await c.newPage();
    await p.goto(BASE + '/welcome');
    await p.click('button:text("Let\'s go")');
    await p.click(`[role=radio]:has-text("${goal}")`);
    await p.click('button:text("Continue")');
    await p.waitForSelector(`h1:text("${question}")`);
    await p.click(`[role=radio]:has-text("${focus}")`);
    await p.click('button:text("Continue")');
    await p.waitForURL(`**${url}`);
    await p.waitForSelector(`#main h1:text-is("${title}")`);
    assert.ok(!(await p.isVisible('text=Make it comfortable')), `${focus}: no comfort step`);
    const prof = JSON.parse(await p.evaluate(() => localStorage.getItem('lx-profile')));
    assert.equal(prof.goal, code);
    assert.equal(prof.done, true);
    await c.close();
  }
  // Everyday English has no course, so it keeps the comfort and ready screens, with a word for that goal.
  const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
  const p = await c.newPage();
  await p.goto(BASE + '/welcome');
  await p.click('button:text("Let\'s go")');
  await p.click('[role=radio]:has-text("Everyday English")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Where do you use English most?")');
  await p.click('[role=radio]:has-text("Travel")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Make it comfortable")');
  await p.click('button:text("Finish setup")');
  await p.waitForSelector('h1:text("Your universe is ready")');
  const first = (await p.textContent('.ob-first b')).trim();
  const word = DAILY.find((w) => w.w === first);
  assert.ok(word && word.goals.includes('e'), `first word ${first} is not an everyday word`);
  await c.close();
});

await check('home: each subject has its own home; Everyday English keeps the word of the day', async () => {
  const visit = async (profile) => {
    const c = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
    await c.addInitScript((pr) => localStorage.setItem('lx-profile', JSON.stringify(pr)), profile);
    const p = await c.newPage();
    await p.goto(BASE + '/');
    return { c, p };
  };
  let { c, p } = await visit({ goal: 'x', focus: 'jamb', level: 2, done: true });
  await p.waitForSelector('h1:text("Your JAMB practice")');
  await p.waitForSelector('a.pt-row:has-text("seen")');
  await settle(p);
  assert.deepEqual(await overflow(p), [], 'JAMB home overflow');
  assert.deepEqual(await axe(p), [], 'JAMB home axe');
  assert.ok(!(await p.isVisible('.lx-orbit-planet')), 'no word of the day on the JAMB home');
  assert.equal(await p.locator('a.pt-row').count(), 4, 'English and three more subjects');
  await p.click('button:text("Change")');
  await p.click('.hm-chip:has-text("Chemistry")');
  await p.click('.hm-chip:has-text("Government")');
  await p.click('button:text("Done")');
  await p.waitForSelector('a.pt-row:has-text("Government")');
  await p.click('a.dp-task:has-text("Start today’s set")');
  await p.waitForSelector('h1:text("Mixed practice")');
  await p.click('button:text("Untimed: take your time")');
  for (let i = 0; i < 10; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
  await p.waitForSelector('h1:text("Session complete!")');
  await p.click('a:text("Back home")');
  await p.waitForSelector('a:has-text("Continue")');
  await p.waitForSelector('.dp-task.done:has-text("Start today’s set")');
  await c.close();

  ({ c, p } = await visit({ goal: 'k', focus: 'emails', level: 2, done: true }));
  await p.waitForSelector('h1:text("Your Emails course")');
  await settle(p);
  assert.deepEqual(await overflow(p), [], 'course home overflow');
  assert.deepEqual(await axe(p), [], 'course home axe');
  assert.ok(await p.isVisible('a.lx-btn:has-text("Start:")'), 'the next lesson is one tap away');
  assert.ok(await p.isVisible('a.pd-test:has-text("Practise writing")'));
  assert.ok(!(await p.isVisible('.lx-orbit-planet')));
  assert.equal(await p.getAttribute('.lx-nav a[href="/"]:not(.lx-brand)', 'aria-current'), 'page');
  await c.close();

  ({ c, p } = await visit({ goal: 'e', focus: 'travel', level: 2, done: true }));
  await p.waitForSelector('.lx-orbit-planet');
  await c.close();
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
  await p.waitForSelector('h1:text("Your IELTS course")');
  await p.goto(BASE + '/today');
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
  await p.click('[role=radio]:has-text("Everyday English")');
  await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Where do you use English most?")');
  await p.click('button:text("Continue")', { force: true });
  assert.ok(await p.isVisible('h1:text("Where do you use English most?")'), 'continue without a choice should not advance');
  await p.click('[role=radio]:has-text("School")');
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
  assert.deepEqual(JSON.parse(await p.evaluate(() => localStorage.getItem('lx-profile'))).level, 2);
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
  await p.click('button:text("Start a list")');
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
  for (const [name, desc] of [['Exam preparation', 'IELTS, WAEC, SAT and more'], ['Better writing', 'Essays, reports, stories and letters'], ['Work and career', 'Emails, meetings and interviews']]) {
    await p.waitForSelector(`.pt-cat:has(h2:text("${name}")):has-text("${desc}")`);
  }
  assert.equal(await p.locator('.pt-cat').count(), 3, 'exactly three categories');
  for (const row of ['IELTS', 'WAEC / NECO English', 'SAT', 'Essays', 'Reports', 'Stories', 'Letters', 'Emails', 'Meetings', 'Interviews']) {
    assert.equal(await p.locator(`a.pt-row:has-text("${row}")`).count() >= 1, true, `${row} opens a course`);
  }
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
  assert.ok(await p.locator('.pt-row.soon:has-text("More examinations")').count());
  await c.close();
});

await check('paths: a full WAEC lesson by keyboard, then progress shows', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/waec/waec-concord');
  await p.waitForSelector('h1:text("Find the real subject")');
  assert.ok(!(await p.isVisible('.lx-nav')), 'lessons are full screen');
  for (const heading of ['Each, every, one of', 'Either … or, neither … nor', 'Common mistakes']) {
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
  await skipCards(p);
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
  await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Lesson complete!")');
  assert.match(await p.textContent('.rs-sub'), /of 5 correct/);
  await p.click('.rs-actions a.lx-btn:not(.ghost)');
  await p.waitForURL('**/email-end');
  await skipCards(p);
  for (let i = 0; i < 3; i++) { await p.locator('.lx-opt, .ls-part').first().click(); await p.click('button:text("Continue")'); }
  await p.waitForSelector('#ls-write');
  await p.fill('#ls-write', 'Subject: Moving tomorrow’s meeting\n\nDear Mr Eze,\n\nCould we move tomorrow’s 10am meeting to 2pm? I have a client call in the morning that cannot be moved. Please let me know if that works for the team.');
  await p.click('button:text("Check my writing")');
  await p.waitForSelector('.ls-checks li.bad:has-text("Closing")');
  await p.fill('#ls-write', 'Subject: Moving tomorrow’s meeting\n\nDear Mr Eze,\n\nCould we move tomorrow’s 10am meeting to 2pm? I have a client call in the morning that cannot be moved, and I would like the whole team to be there. The afternoon also gives us more time to prepare the figures. Please let me know if that works for you.\n\nBest regards,\nFunmi');
  await p.click('button:text("Check my writing")');
  await p.waitForSelector('.ls-checks li.ok:has-text("Closing")');
  assert.equal(await p.locator('.ls-checks li.bad').count(), 0);
  await p.click('button:text("See a model answer")');
  await p.waitForSelector('.ls-model:has-text("Kind regards")');
  await c.close();
});

await check('paths: every course runs from an introduction to a final assessment that is marked', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/letters');
  await p.waitForSelector('.pd-unit');
  assert.match(await p.textContent('.pd-unit >> nth=0'), /What a letter is/);
  assert.match(await p.textContent('.pd-unit >> nth=-1'), /Final assessment/);
  assert.ok((await p.locator('.pd-lesson').count()) >= 12, 'a full course has 12 or more lessons');
  await p.click('.pd-lesson:has-text("Final assessment")');
  await p.waitForURL('**/learn/path/letters/letter-final');
  await skipCards(p);
  let answered = 0;
  while (!(await p.isVisible('h1:text("Lesson complete!")'))) {
    await p.waitForSelector('.ls-order, .lx-opt, .ls-part');
    if (await p.isVisible('.ls-order')) await p.click('button:text("Check order")');
    else await p.locator('.lx-opt, .ls-part').first().click();
    await p.click('button:text("Continue")');
    answered++;
    await p.waitForFunction(() => !document.querySelector('.lx-feedback'));
  }
  assert.ok(answered >= 12, `final assessment had ${answered} questions`);
  assert.match(await p.textContent('.rs-sub'), new RegExp(`of ${answered} correct`));
  await p.goto(BASE + '/learn/path/letters');
  await p.waitForSelector('.pd-lesson.done:has-text("Final assessment")');
  await c.close();
});

await check('jamb bank: subjects, a 20-question untimed set with explanations, then a new set and a timed set', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/paths');
  await p.click('a.pt-row:has-text("JAMB")');
  await p.waitForURL('**/learn/bank/jamb');
  await p.waitForSelector('a.pt-row:has-text("Mathematics"):has-text("questions")');
  assert.equal(await p.locator('.bk-subjects a.pt-row').count(), 10, 'all ten subjects are open');
  await p.click('a.pt-row:has-text("Mathematics")');
  await p.waitForSelector('h1:text("Mathematics")');
  await p.click('.lx-seg button:text("20")');
  await p.click('button:text("Untimed: take your time")');
  await p.waitForSelector('.pt-timer:has-text("Timer off")');
  const firstQ = await p.textContent('.ls-q');
  for (let i = 0; i < 20; i++) {
    await p.locator('.lx-opt').nth(1).click();
    await p.waitForSelector('.lx-feedback');
    await p.click('button:text("Continue")');
  }
  await p.waitForSelector('h1:text("Session complete!")');
  assert.match(await p.textContent('.rs-sub'), /of 20 correct/);
  await p.click('button:text("New set of questions")');
  await p.waitForSelector('.ls-q');
  assert.notEqual(await p.textContent('.ls-q'), firstQ, 'a new set starts with a different question');
  await p.goto(BASE + '/learn/bank/jamb');
  await p.waitForSelector('a.pt-row:has-text("Mathematics"):has-text("20 seen")');
  await p.click('a.pt-row:has-text("Use of English")');
  await p.click('button:has-text("Timed:")');
  await p.waitForSelector('[role=timer]');
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
  await p.waitForURL('**/learn/path/waec');
  await p.goto(BASE + '/learn');
  await p.waitForSelector('.ln-path:has-text("WAEC / NECO English"):has-text("Start: What the English paper tests")');
  await c.close();
  // JAMB, which onboarding already offered, now has its own course too.
  const c2 = await newContext({ viewport: { width: 390, height: 844 } }, { fresh: true });
  const p2 = await c2.newPage();
  await p2.goto(BASE + '/welcome');
  await p2.click('button:text("Let\'s go")');
  await p2.click('[role=radio]:has-text("Exam preparation")');
  await p2.click('button:text("Continue")');
  await p2.click('[role=radio]:has-text("JAMB")');
  await p2.click('button:text("Continue")');
  await p2.waitForURL('**/learn/bank/jamb');
  await p2.waitForSelector('h1:text("JAMB practice questions")');
  await c2.close();
});

await check('paths: screens with progress pass overflow, axe and 200% text', async () => {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    for (const theme of THEMES) {
      const c = await newContext({ viewport: { width: w, height: h }, colorScheme: theme });
      const p = await c.newPage();
      await p.goto(BASE + '/learn/path/essays/essay-shape');
      await skipCards(p);
      await p.locator('.lx-opt').nth(1).click();
      await p.waitForSelector('.lx-feedback');
      await settle(p);
      await p.screenshot({ path: `${SHOTS}lesson-feedback-${w}-${theme}.png`, fullPage: true });
      assert.deepEqual(await overflow(p), [], `lesson feedback ${w} ${theme}`);
      assert.deepEqual(await axe(p), [], `lesson feedback ${w} ${theme} axe`);
      await p.goto(BASE + '/learn/path/emails/email-end');
      await skipCards(p);
      for (let i = 0; i < 3; i++) { await p.locator('.lx-opt, .ls-part').first().click(); await p.click('button:text("Continue")'); }
      await p.fill('#ls-write', 'Hi, can we move it?');
      await p.click('button:text("Check my writing")');
      await p.click('button:text("See a model answer")');
      await settle(p);
      await p.screenshot({ path: `${SHOTS}lesson-write-${w}-${theme}.png`, fullPage: true });
      assert.deepEqual(await overflow(p), [], `write ${w} ${theme}`);
      assert.deepEqual(await axe(p), [], `write ${w} ${theme} axe`);
      await p.goto(BASE + '/learn/path/emails/email-start');
      await skipCards(p);
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
  assert.equal(await p.locator('.pt-cat .pt-how').count(), 3);
  for (const id of ['waec', 'ielts', 'sat', 'jamb', 'toefl', 'essays', 'reports', 'stories', 'letters', 'emails', 'meetings', 'interviews']) {
    await p.goto(BASE + `/learn/path/${id}`);
    await p.waitForSelector('.pd-guide li');
    assert.ok(await p.isVisible('a.pd-test:has-text("Practice test")'), `${id} has a test`);
    assert.ok(await p.isVisible('a.pd-test:has-text("Writing formats")'), `${id} links to formats`);
  }
  await p.click('.pd-guide summary');
  await p.waitForFunction(() => (localStorage.getItem('lx-guide-closed') || '').includes('interviews'));
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
  await p.waitForSelector('.lx-none');
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
  await p.click('button:has-text("Timed:")');
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
  await p.click('button:has-text("Timed:")');
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
  await skipCards(p);
  await p.click('button[aria-label="Play the recording"]');
  await p.waitForFunction(() => window.__spoken.some((x) => x.text.includes('Greenfield Sports Centre')));
  await p.click('button:text("Read the transcript")');
  await p.waitForSelector('.ls-script:has-text("Thursday evenings")');
  await p.click('.lx-opt:has-text("Thursday, 6.30")');
  await p.waitForSelector('.lx-feedback:has-text("Brilliant")');
  await p.goto(BASE + '/learn/path/ielts/ielts-speaking');
  await skipCards(p);
  for (let i = 0; i < 2; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
  await p.click('button:text("Start: 1:00 to prepare")');
  await p.waitForSelector('[role=timer]:has-text("1:00")');
  await c.clock.runFor(61000);
  await p.waitForSelector('[role=timer]:has-text("Speak now")');
  await c.clock.runFor(121000);
  await p.waitForSelector('.lx-feedback:has-text("Check yourself")');
  await c.close();
});


// Critique fixes: shared styles, focus, scroll memory, note saving, layout
await check('critique: path screens are styled on a fresh load (back button size, progress bar)', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/waec');
  await p.waitForSelector('.pd-lesson');
  const r = await p.evaluate(() => {
    const back = document.querySelector('.lx-round').getBoundingClientRect();
    const bar = document.querySelector('.pd-prog .lx-bar').getBoundingClientRect();
    return { w: back.width, h: back.height, bar: bar.height };
  });
  assert.ok(r.w >= 44 && r.h >= 44, `back button is ${r.w}x${r.h}`);
  assert.ok(r.bar >= 4, 'progress bar is visible');
  await c.close();
});

await check('critique: focus lands on the new heading after opening a path', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/paths');
  await p.click('a.pt-row:has-text("IELTS")');
  await p.waitForFunction(() => document.activeElement?.tagName === 'H1' && document.activeElement.textContent.includes('IELTS'), null, { timeout: 4000 });
  await c.close();
});

await check('critique: Back returns to the same scroll position', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/waec');
  await p.waitForSelector('.pd-lesson');
  await p.evaluate(() => scrollTo(0, 900));
  await p.waitForTimeout(150);
  const before = await p.evaluate(() => scrollY);
  await p.evaluate(() => document.querySelectorAll('.pd-lesson')[6].click()); // a real click, without Playwright scrolling first
  await p.waitForSelector('.ps-tag');
  await p.goBack();
  await p.waitForSelector('.pd-lesson');
  await p.waitForFunction((y) => Math.abs(scrollY - y) < 5, before, { timeout: 3000 });
  await c.close();
});

await check('critique: writing check moves focus to the results; a quick Back keeps a note edit', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/emails/email-end');
  await skipCards(p);
  for (let i = 0; i < 3; i++) { await p.locator('.lx-opt, .ls-part').first().click(); await p.click('button:text("Continue")'); }
  await p.fill('#ls-write', 'Hi, can we move it?');
  await p.click('button:text("Check my writing")');
  await p.waitForFunction(() => document.activeElement?.id === 'ls-checks-h');
  await p.goto(BASE + '/words?tab=notebook');
  await p.click('button:text("Write your first note")');
  await p.waitForURL('**/words/note/*');
  await p.fill('#ne-body', 'Typed just before leaving');
  await p.click('a[aria-label="Back to notebook"]');
  await p.waitForSelector('.nb-card:has-text("Typed just before leaving")');
  await c.close();
});

await check('critique: the Level control fits on one row on a phone, and Me has no build jargon', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/me');
  await p.waitForSelector('.lx-seg.stretch button');
  const tops = await p.$eval('.me-learning .lx-seg.stretch', (seg) => [...new Set([...seg.children].map((b) => Math.round(b.getBoundingClientRect().top)))]);
  assert.equal(tops.length, 1, 'all level buttons share one row');
  assert.ok(!(await p.textContent('#main')).includes('phase 5'));
  await c.close();
});

await check('critique: a toast stays while it has focus', async () => {
  const c = await clockContext();
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/sat/sat-punctuation');
  await p.waitForSelector('h1:text("Two complete sentences")');
  await p.click('button:text("Save to notebook")');
  await p.waitForSelector('.lx-toast button:text("Open")');
  await p.focus('.lx-toast button:text("Open")');
  await c.clock.runFor(15000);
  assert.ok(await p.isVisible('.lx-toast:has-text("Saved to your notebook")'), 'toast should wait while focused');
  await p.locator('.lx-toast button:text("Open")').blur();
  await c.clock.runFor(8000);
  await p.waitForSelector('.lx-toast', { state: 'detached' });
  await c.close();
});

await check('critique: the speaking timer runs after pausing in preparation', async () => {
  const c = await clockContext();
  await c.addInitScript(SPEECH_STUB);
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/ielts/ielts-speaking');
  await skipCards(p);
  for (let i = 0; i < 2; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
  await p.click('button:text("Start: 1:00 to prepare")');
  await p.click('.ls-timer button:text("Pause")');
  await p.click('.ls-timer button:text("Start speaking")');
  await p.waitForSelector('[role=timer]:has-text("Speak now")');
  await c.clock.runFor(5000);
  await p.waitForSelector('[role=timer]:has-text("1:55")');
  await c.close();
});


// Learning section restructure
await check('learning: a wrong answer offers the explanation again; tests can be untimed; writing gets a score', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/letters/letter-formal-layout');
  await skipCards(p);
  for (let i = 0; i < 6; i++) await p.click('button[aria-label^="Move"]:not([disabled])').catch(() => {});
  await p.click('button:text("Check order")');
  await p.click('button:text("Continue")');
  await p.click('.lx-opt:has-text("Yours sincerely,")');
  await p.click('button:text("Explain it again")');
  await p.waitForSelector('.ls-help-card:has-text("Matching greeting and ending")');
  await p.goto(BASE + '/learn/path/letters/test');
  await p.click('button:has-text("Untimed")');
  await p.waitForSelector('.pt-timer:has-text("Timer off")');
  await p.goto(BASE + '/learn/path/emails/email-end');
  await skipCards(p);
  for (let i = 0; i < 3; i++) { await p.locator('.lx-opt, .ls-part').first().click(); await p.click('button:text("Continue")'); }
  await p.fill('#ls-write', 'Hi, can we move it?');
  await p.click('button:text("Check my writing")');
  await p.waitForSelector('#ls-checks-h:has-text("/ 10")');
  await c.close();
});

await check('learning: the path page shows performance and how to improve after a lesson', async () => {
  const c = await newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await p.goto(BASE + '/learn/path/interviews/interview-star');
  await skipCards(p);
  for (let i = 0; i < 6; i++) await p.click('button[aria-label^="Move"]:not([disabled])').catch(() => {});
  await p.click('button:text("Check order")');
  await p.click('button:text("Continue")');
  for (let i = 0; i < 2; i++) { await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")'); }
  await p.click('button:text("Start: 1:00 to prepare")');
  await p.click('.ls-timer button:text("Start speaking")');
  await p.click('.ls-timer button:text("Finish")');
  await p.click('button:text("Continue")');
  await p.locator('.lx-opt').first().click(); await p.click('button:text("Continue")');
  await p.waitForSelector('h1:text("Lesson complete!")');
  await p.waitForSelector('.ls-improve li');
  await p.goto(BASE + '/learn/path/interviews');
  await p.waitForSelector('.pd-stats:has-text("lessons done")');
  await p.waitForSelector('#pd-improve');
  await c.close();
});

// Launch features: daily plan, reminders, score history, weak topics, challenges, certificates and help.
const seedKv = (p, key, val) => p.evaluate(([k, v]) => new Promise((res, rej) => {
  const r = indexedDB.open('lexiverse', 1);
  r.onsuccess = () => { const tx = r.result.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = () => { r.result.close(); res(); }; tx.onerror = rej; };
  r.onerror = rej;
}), [key, val]);

await check('launch: score history, weak topics and topic practice', async () => {
  const c = await newContext();
  await c.addInitScript(() => localStorage.setItem('lx-profile', JSON.stringify({ goal: 'x', focus: 'jamb', level: 2, done: true })));
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.waitForSelector('#hm-plan');
  const now = Date.now();
  await seedKv(p, 'bank:jamb:biology', { seen: {}, topics: { 'Cell biology': { right: 2, total: 8 }, Nutrition: { right: 7, total: 8 } }, sessions: [40, 55, 70].map((pct, i) => ({ score: pct / 5, total: 20, secs: 600, at: now - (3 - i) * 86400000 })) });
  await p.reload();
  await p.waitForSelector('.dp-task:has-text("Work on Cell biology")');
  await p.waitForSelector('.sc-weak:has-text("2 of 8 right")');
  await p.waitForSelector('#hm-scores');
  assert.match(await p.textContent('.sc figcaption'), /latest 70%, up from 40%/);
  assert.equal(await p.locator('.sc table tbody tr').count(), 3, 'chart has a table for screen readers');
  await settle(p);
  assert.deepEqual(await overflow(p), [], 'home overflow');
  assert.deepEqual(await axe(p), [], 'home axe');
  await p.goto(BASE + '/learn/bank/jamb/biology');
  await p.waitForSelector('.sc figcaption');
  await settle(p);
  assert.deepEqual(await axe(p), [], 'setup axe');
  await p.click('.sc-weak a');
  await p.waitForSelector('h1:has-text("Biology: Cell biology")');
  await p.click('button:text("Untimed: take your time")');
  await p.waitForSelector('.ps-tag:has-text("Cell biology")');
  await c.close();
});

await check('launch: challenge a friend with the same questions', async () => {
  const c = await newContext();
  await c.addInitScript(() => localStorage.setItem('lx-profile', JSON.stringify({ goal: 'x', focus: 'jamb', level: 2, done: true })));
  const p = await c.newPage();
  await p.goto(BASE + '/learn/bank/jamb/biology?ch=bi1.bi2.bi3&s=2-3&n=Ada');
  await p.waitForSelector('.bk-challenge:has-text("Ada challenged you")');
  assert.ok(!(await p.isVisible('.bk-size')), 'a challenge has a fixed set');
  await p.click('button:text("Untimed: take your time")');
  const asked = [];
  for (let i = 0; i < 3; i++) {
    await p.waitForSelector('.ps-q:not([hidden]) .lx-opt');
    asked.push(await p.textContent('.ps-q h1'));
    await p.locator('.ps-q .lx-opt').first().click();
    await p.click('button:text("Continue")');
  }
  await p.waitForSelector('#bk-ch');
  assert.match(await p.textContent('#rs-title'), /You win!|draw|Ada wins/);
  await p.fill('.bk-name input', 'Tunde');
  const href = await p.getAttribute('.bk-chrow a', 'href');
  assert.match(href, /^https:\/\/wa\.me\/\?text=/);
  const link = decodeURIComponent(href).match(/https?:\/\/[^\s]*\/learn\/bank\/jamb\/\S+/)[0];
  assert.match(link, /ch=bi1\.bi2\.bi3/);
  assert.match(link, /n=Tunde/);
  await settle(p);
  assert.deepEqual(await axe(p), [], 'results axe');
  await p.goto(BASE + '/learn/bank/jamb/biology?ch=zz9999');
  await p.waitForSelector('text=This challenge link doesn\'t work');
  await c.close();
});

await check('launch: daily plan reminder, certificate and help', async () => {
  const c = await newContext({ acceptDownloads: true });
  await c.addInitScript(() => localStorage.setItem('lx-profile', JSON.stringify({ goal: 'k', focus: 'emails', level: 2, done: true })));
  const p = await c.newPage();
  await p.goto(BASE + '/certificate/emails');
  await p.waitForSelector('text=Finish every lesson to unlock it');
  const ids = ["email-intro","email-start","email-end","email-tone","email-polite","email-etiquette","email-followup","email-apology","email-badnews","email-senior","email-application","email-internal","email-advanced","email-final"];
  const now = Date.now();
  await seedKv(p, 'path:emails', { done: Object.fromEntries(ids.map((id, i) => [id, { score: i % 4 === 0 ? 2 : 5, total: 5, at: now - i * 1000 }])), tests: [{ score: 5, total: 10, secs: 300, at: now - 3e8 }, { score: 8, total: 10, secs: 300, at: now - 1e8 }] });
  await p.goto(BASE + '/');
  await p.waitForSelector('#hm-plan');
  await p.waitForSelector('.pd-weak a');
  await p.waitForSelector('.dp-task:has-text("Redo:")');
  await p.click('.dp-remind button');
  await p.waitForSelector('dialog[open] input[type="time"]');
  await p.fill('dialog[open] input[type="time"]', '19:15');
  const dl = p.waitForEvent('download');
  await p.click('dialog[open] button:text("Add to my calendar")');
  const file = await dl;
  assert.equal(file.suggestedFilename(), 'lexiverse-reminder.ics');
  const ics = (await import('node:fs')).readFileSync(await file.path(), 'utf8');
  assert.match(ics, /RRULE:FREQ=DAILY/);
  assert.match(ics, /T191500/);
  await p.waitForSelector('.dp-remind:has-text("7:15 pm")');
  await p.click('a:text("Get your certificate")');
  await p.waitForSelector('.ct-name input');
  assert.ok(await p.isDisabled('button:has-text("Save image")'), 'nothing to save before a name');
  await p.fill('.ct-name input', 'Ada Okafor');
  await p.waitForSelector('.ct-preview img[alt*="Ada Okafor has completed the Lexiverse Emails course"]');
  const cert = p.waitForEvent('download');
  await p.click('button:has-text("Save image")');
  assert.match((await cert).suggestedFilename(), /lexiverse-certificate-emails\.png/);
  await settle(p);
  assert.deepEqual(await overflow(p), [], 'certificate overflow');
  assert.deepEqual(await axe(p), [], 'certificate axe');
  await p.goto(BASE + '/me');
  await p.click('a:has-text("Help and FAQs")');
  await p.waitForSelector('h1:text("Help and FAQs")');
  await p.click('summary:text("How do I challenge a friend?")');
  await p.waitForSelector('details[open] p:has-text("WhatsApp")');
  await settle(p);
  assert.deepEqual(await axe(p), [], 'help axe');
  await c.close();
});

await check('JAMB mock exam: sit, flag, leave, resume, submit and review', async () => {
  const c = await newContext();
  await c.addInitScript(() => localStorage.setItem('lx-profile', JSON.stringify({ goal: 'x', focus: 'jamb', level: 2, done: true })));
  const p = await c.newPage();
  await p.goto(BASE + '/');
  await p.click('a.mk-cta');
  await p.waitForSelector('h1:text("JAMB mock exam")');
  await settle(p);
  assert.deepEqual(await overflow(p), [], 'setup overflow');
  assert.deepEqual(await axe(p), [], 'setup axe');
  await p.click('.lx-seg button:has-text("Short")');
  await p.click('button:text("Start timed: 45 minutes")');
  await p.waitForSelector('.mk-q');
  assert.deepEqual(await p.$$eval('.mk-tab span', (t) => t.map((x) => x.textContent)), ['0/20', '0/15', '0/15', '0/15']);
  assert.match(await p.textContent('.mk-clock'), /45:00 left/);
  await p.locator('.mk-opt').nth(2).click();
  assert.equal(await p.locator('.mk-opt.chosen').count(), 1);
  assert.equal(await p.locator('.lx-opt.right, .lx-opt.wrong').count(), 0, 'no marking before submit');
  await p.click('button:text("Flag for review")');
  await p.click('button:text("Next")');
  await p.waitForFunction(() => document.activeElement?.classList.contains('mk-q'));
  await p.locator('.mk-opt').first().click();
  await p.waitForSelector('.mk-num[aria-label="Question 1, answered, flagged"]');
  await settle(p);
  assert.deepEqual(await overflow(p), [], 'paper overflow');
  assert.deepEqual(await axe(p), [], 'paper axe');
  await p.locator('.mk-tab').nth(1).click();
  await p.waitForSelector('.ps-tag:has-text("Question 1 of 15")');
  // Leaving asks first, then keeps the paper and pauses the clock.
  await p.click('.ps-close');
  await p.waitForSelector('dialog[open] h2:text("Leave the mock exam?")');
  await p.click('dialog[open] button:text("Leave")');
  await p.waitForURL(BASE + '/');
  await p.goto(BASE + '/learn/mock');
  await p.waitForSelector('.mk-resume:has-text("2 of 65 answered")');
  await p.click('button:text("Resume")');
  await p.waitForSelector('h1:text("Paused")');
  await p.click('.ps-empty button:text("Resume")');
  await p.click('.mk-submit');
  await p.waitForSelector('dialog[open] .mk-sum:has-text("63")');
  await p.click('dialog[open] button:text("Submit")');
  await p.waitForSelector('#mk-done:text("Paper submitted")');
  assert.match(await p.textContent('.rs-sub'), /out of 400/);
  assert.equal(await p.locator('.mk-scores li').count(), 4);
  await p.click('.mk-sec summary >> nth=1');
  await p.waitForSelector('.mk-sec[open] .mk-why');
  await settle(p);
  assert.deepEqual(await axe(p), [], 'results axe');
  assert.equal(await p.evaluate(() => localStorage.getItem('lx-mock-run')), null, 'the finished paper is cleared');
  await c.close();
});

await check('closing a practice set asks first (Keep going stays, Leave goes)', async () => {
  const c = await newContext();
  await c.addInitScript(() => localStorage.setItem('lx-profile', JSON.stringify({ goal: 'x', focus: 'jamb', level: 2, done: true })));
  const p = await c.newPage();
  await p.goto(BASE + '/learn/bank/jamb/english');
  await p.click('button:text("Untimed: take your time")');
  await p.locator('.lx-opt').first().click();
  await p.click('button:text("Continue")');
  await p.click('.ps-close');
  await p.waitForSelector('dialog[open] h2:text("Leave this set?")');
  await p.click('dialog[open] button:text("Keep going")');
  assert.match(p.url(), /\/learn\/bank\/jamb\/english$/);
  await p.click('.ps-close');
  await p.click('dialog[open] button:text("Leave")');
  await p.waitForURL(BASE + '/learn/bank/jamb');
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
