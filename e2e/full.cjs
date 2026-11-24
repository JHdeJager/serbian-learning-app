// Plays through the WHOLE course (all lessons, unit tests, letter lessons, practice), answering correctly.
const { chromium } = require('playwright');
const { playSession } = require('./play.cjs');
const BASE = process.env.BASE || 'http://localhost:4173/';
const N = Number(process.env.REPEAT || 1);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(BASE);
  await page.evaluate(() => {
    localStorage.setItem('govori-progress', JSON.stringify({ state: { onboarded: true, name: 'Test', settings: { unlimitedHearts: true, cyrillic: process_cyr } }, version: 1 }).replace('process_cyr', 'false'));
  }).catch(() => {});
  await page.evaluate((cyr) => {
    localStorage.setItem('govori-progress', JSON.stringify({ state: { onboarded: true, name: 'Test', settings: { unlimitedHearts: true, cyrillic: cyr } }, version: 1 }));
  }, !!process.env.CYR);
  await page.reload();
  const finish = async () => {
    while (await page.locator('.center-screen').count()) {
      await page.getByRole('button', { name: 'Ga door' }).click();
      await page.waitForTimeout(80);
    }
  };
  for (let round = 0; round < N; round++) {
    // lessons in order
    const ids = await page.evaluate(() => null);
    let count = 0;
    for (;;) {
      const startBtn = page.locator('.node-start');
      if (!(await startBtn.count())) break;
      const node = page.locator('.node-wrap:has(.node-start) .node');
      await node.click();
      await page.getByRole('button', { name: /Start \+10 XP/ }).click();
      await playSession(page, null);
      await finish();
      count++;
      if (count % 5 === 0) console.log('lessons', count, new Date().toISOString());
      // unit tests that are open
      const test = page.locator('.node:not(.locked)[aria-label="Unit-toets"]');
      const n = await test.count();
      for (let i = 0; i < n; i++) {
        const t = page.locator('.node:not(.locked)[aria-label="Unit-toets"]').nth(i);
        const st = await t.evaluate((el) => el.getAttribute('style') || '');
        if (st.includes('locked')) continue; // already done
        await t.click();
        await page.getByRole('button', { name: /Start \+20 XP/ }).click();
        await playSession(page, null);
        await finish();
      }
    }
    console.log('round', round, 'lessons played', count);
    // replay a few lessons (hard mode)
    for (let i = 0; i < 6; i++) {
      const nodes = page.locator('.node[aria-label]:not(.locked)');
      const total = await nodes.count();
      const idx = Math.floor(Math.random() * total);
      const label = await nodes.nth(idx).getAttribute('aria-label');
      if (label === 'Schatkist' || label === 'Unit-toets') continue;
      await nodes.nth(idx).click();
      const btn = page.getByRole('button', { name: /Herhalen \+10 XP/ });
      if (!(await btn.count())) continue;
      await btn.click();
      await playSession(page, null);
      await finish();
    }
    // letters
    await page.getByRole('button', { name: /Letters/ }).first().click();
    for (let i = 0; i < 6; i++) {
      await page.locator('.list-item .btn:not([disabled])').filter({ hasText: /Start|Herhaal/ }).nth(i).click();
      await playSession(page, null);
      await finish();
    }
    // practice
    await page.getByRole('button', { name: /Oefenen/ }).first().click();
    for (let i = 0; i < 3; i++) {
      await page.locator('.card .btn').first().click();
      await playSession(page, null);
      await finish();
    }
    await page.getByRole('button', { name: /Leren/ }).first().click();
  }
  console.log('errors:', errors.slice(0, 10));
  await browser.close();
})().catch((e) => {
  console.error(e.message.slice(0, 1500));
  process.exit(1);
});
