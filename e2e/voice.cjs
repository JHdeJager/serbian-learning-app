// Runs lessons with a fake Serbian voice so listening exercises appear; takes screenshots.
const { chromium } = require('playwright');
const { playSession } = require('./play.cjs');
const BASE = process.env.BASE || 'http://localhost:4173/';
const OUT = process.env.OUT || '/tmp/shots';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    const fake = [{ name: 'Fake Srpski', lang: 'sr-RS', localService: true, default: false, voiceURI: 'fake' }];
    const spoken = [];
    window.__spoken = spoken;
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        getVoices: () => fake,
        speak: (u) => spoken.push(u.text),
        cancel: () => {},
        addEventListener: () => {}
      }
    });
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
  });
  await page.goto(BASE);
  await page.evaluate((cyr) => {
    localStorage.setItem('govori-progress', JSON.stringify({ state: { onboarded: true, name: 'Mila', settings: { cyrillic: cyr }, completed: { 'u1-l1': 1, 'u1-l2': 1, 'u1-l3': 1, 'u1-l4': 1, 'u2-l1': 1, 'u2-l2': 1, 'u2-l3': 1, 'u2-l4': 1, 'u2-l5': 1 } }, version: 1 }));
  }, !!process.env.CYR);
  await page.reload();
  await page.waitForTimeout(300);
  await page.locator('.node-wrap:has(.node-start) .node').click();
  await page.getByRole('button', { name: /Start \+10 XP/ }).click();
  await playSession(page, process.env.CYR ? 'V-cyr' : 'V', { wrongAt: 5 });
  console.log('spoken sample:', (await page.evaluate(() => window.__spoken)).slice(0, 5));
  console.log('errors', errors);
  await browser.close();
})().catch((e) => { console.error(e.message.slice(0, 800)); process.exit(1); });
