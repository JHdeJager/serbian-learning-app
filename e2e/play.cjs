// Drives the app through lessons, answering correctly (or wrongly on purpose) and taking screenshots.
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:4173/';
const OUT = process.env.OUT || '/tmp/shots';
require('fs').mkdirSync(OUT, { recursive: true });

async function answer(page, ex, wrong = false) {
  const tokenize = (s) => s.replace(/[.,!?;:"“”„«»()]/g, ' ').split(/\s+/).filter(Boolean);
  switch (ex.type) {
    case 'pictures': {
      const idx = ex.options.findIndex((o) => wrong ? !o.correct : o.correct);
      await page.locator('.picture').nth(idx).click();
      break;
    }
    case 'choice':
    case 'fill': {
      const idx = ex.options.findIndex((o) => wrong ? !o.correct : o.correct);
      await page.locator('.option').nth(idx).click();
      break;
    }
    case 'match': {
      for (const p of ex.pairs) {
        await page.locator('.match-col').nth(0).locator('.match-item:not(.done)', { hasText: new RegExp('^' + p.left.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }).first().click();
        await page.locator('.match-col').nth(1).locator('.match-item:not(.done)', { hasText: new RegExp('^' + p.right.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }).first().click();
        await page.waitForTimeout(300);
      }
      return 'auto';
    }
    case 'tiles': {
      const want = tokenize(ex.answer);
      if (wrong) want.reverse();
      for (const w of want) {
        const tiles = page.locator('.tile-bank .tile:not(.used)');
        const n = await tiles.count();
        let clicked = false;
        for (let i = 0; i < n; i++) {
          const t = (await tiles.nth(i).innerText()).trim();
          if (t.toLowerCase() === w.toLowerCase()) { await tiles.nth(i).click(); clicked = true; break; }
        }
        if (!clicked) throw new Error('tile not found: ' + w + ' in ' + JSON.stringify(ex.tiles));
      }
      break;
    }
    case 'type':
      await page.locator('textarea').fill(wrong ? 'xyz' : ex.accepted[0]);
      break;
    case 'speak':
      await page.getByText('Ik kan nu niet spreken').click();
      return 'auto';
  }
}

async function playSession(page, shotPrefix, { wrongAt = -1 } = {}) {
  for (let step = 0; step < 40; step++) {
    await page.waitForTimeout(50);
    if (await page.locator('.center-screen').count()) return true;
    const ex = await page.evaluate(() => window.__govoriEx);
    if (!ex) throw new Error('no exercise');
    if (shotPrefix && step < 30) await page.screenshot({ path: `${OUT}/${shotPrefix}-${String(step).padStart(2, '0')}-${ex.type}${ex.mode ? '-' + ex.mode : ''}.png` });
    const r = await answer(page, ex, step === wrongAt);
    if (r !== 'auto') {
      await page.getByRole('button', { name: 'Controleer' }).click();
    }
    await page.waitForTimeout(80);
    if (shotPrefix && step === wrongAt) await page.screenshot({ path: `${OUT}/${shotPrefix}-${String(step).padStart(2, '0')}-feedback-wrong.png` });
    if (shotPrefix && step === 1) await page.screenshot({ path: `${OUT}/${shotPrefix}-${String(step).padStart(2, '0')}-feedback-right.png` });
    const fb = page.locator('.lesson-footer.correct, .lesson-footer.wrong');
    const cnt = await fb.count();
    const isRight = await page.locator('.lesson-footer.correct').count();
    if (step !== wrongAt && cnt && !isRight && ex.type !== 'match') {
      throw new Error('Expected correct for ' + JSON.stringify(ex).slice(0, 400));
    }
    await page.getByRole('button', { name: 'Ga door' }).click();
  }
  throw new Error('session did not finish');
}

module.exports = { answer, playSession };

if (require.main === module) {
  (async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(BASE);
    await page.screenshot({ path: `${OUT}/00-welcome.png` });
    await page.getByRole('button', { name: 'Aan de slag' }).click();
    await page.locator('.name-input').fill('Mila');
    await page.getByRole('button', { name: 'Ga door' }).click();
    await page.screenshot({ path: `${OUT}/01-goal.png` });
    await page.getByRole('button', { name: 'Ga door' }).click();
    await page.getByRole('button', { name: 'Start mijn eerste les' }).click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/02-home.png` });
    await page.locator('.node').first().click();
    await page.screenshot({ path: `${OUT}/03-popover.png` });
    await page.getByRole('button', { name: /Start \+10 XP/ }).click();
    await playSession(page, 'L1', { wrongAt: 3 });
    await page.screenshot({ path: `${OUT}/10-result.png` });
    await page.getByRole('button', { name: 'Ga door' }).click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/11-streak.png` });
    while (await page.locator('.center-screen').count()) {
      await page.getByRole('button', { name: 'Ga door' }).click();
      await page.waitForTimeout(200);
    }
    await page.screenshot({ path: `${OUT}/12-home-after.png` });
    console.log('errors:', errors);
    await browser.close();
  })().catch((e) => { console.error(e); process.exit(1); });
}
