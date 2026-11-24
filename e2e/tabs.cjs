// Screenshots of the main tabs with some fake progress.
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:4173/';
const OUT = process.env.OUT || '/tmp/shots';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE);
  await page.evaluate((cyr) => {
    const completed = {};
    ['u1-l1','u1-l2','u1-l3','u1-l4','u2-l1','u2-l2','abc1'].forEach((id) => (completed[id] = 1));
    const xpByDay = {};
    const d = new Date();
    for (let i = 0; i < 4; i++) { const x = new Date(d); x.setDate(d.getDate() - i); xpByDay[x.toISOString().slice(0,10)] = 15 + i * 10; }
    localStorage.setItem('govori-progress', JSON.stringify({ state: { onboarded: true, name: 'Mila', completed, xp: 240, streak: 4, longestStreak: 4, lastActiveDay: new Date().toISOString().slice(0,10), xpByDay, lessonsDone: 7, settings: { cyrillic: cyr }, league: { week: '2000-01-03', tier: 0, xp: 0 } }, version: 1 }));
  }, !!process.env.CYR);
  await page.reload();
  await page.waitForTimeout(400);
  const tabs = ['Leren', 'Letters', 'Oefenen', 'Liga', 'Winkel', 'Profiel'];
  for (const t of tabs) {
    await page.locator('.nav button', { hasText: t }).click();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}/tab-${t}${process.env.CYR ? '-cyr' : ''}.png`, fullPage: false });
  }
  await page.locator('.nav button', { hasText: 'Leren' }).click();
  await page.locator('.guide-btn').first().click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/guide.png`, fullPage: false });
  await page.goto(BASE);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/desktop.png` });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.screenshot({ path: `${OUT}/desktop-dark.png` });
  console.log('errors', errors);
  await browser.close();
})();
