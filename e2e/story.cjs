// Plays the first story, answering questions correctly.
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:4173/';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE);
  await page.evaluate(() => localStorage.setItem('govori-progress', JSON.stringify({ state: { onboarded: true, name: 'Mila', completed: { 'u1-l1': 1, 'u1-l2': 1, 'u1-l3': 1, 'u1-l4': 1 } }, version: 1 })));
  await page.reload();
  await page.locator('.nav button', { hasText: 'Oefenen' }).click();
  await page.screenshot({ path: '/tmp/shots/practice.png' });
  await page.getByRole('button', { name: 'Start' }).last().click();
  const { STORIES } = { STORIES: null };
  for (let i = 0; i < 30; i++) {
    if (await page.locator('.center-screen').count()) break;
    const q = page.locator('.card .option:not([disabled])');
    if (await q.count()) {
      // try options until correct
      const n = await q.count();
      for (let j = 0; j < n; j++) {
        const o = page.locator('.card .option:not([disabled])').nth(j);
        if (!(await o.count())) break;
        await o.click();
        await page.waitForTimeout(50);
        if (!(await page.locator('.lesson-footer .btn[disabled]').count())) break;
      }
    }
    if (i === 5) await page.screenshot({ path: '/tmp/shots/story.png' });
    await page.locator('.lesson-footer .btn').click();
    await page.waitForTimeout(50);
  }
  await page.screenshot({ path: '/tmp/shots/story-end.png' });
  console.log('finished:', await page.locator('.center-screen').count(), 'errors', errors);
  await browser.close();
})();
