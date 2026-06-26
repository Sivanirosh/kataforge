import { chromium } from '@playwright/test';

const BASE = process.env.KATAFORGE_BASE_URL ?? 'http://localhost:4322';
const browser = await chromium.launch();

async function shotEl(path, url, { light = false, seedProgress = false, actions } = {}) {
  const page = await browser.newPage({ viewport: { width: 1180, height: 1000 } });
  page.on('pageerror', (e) => console.log('PAGEERROR', url, e.message));
  await page.addInitScript(
    ([light, seed]) => {
      if (light) localStorage.setItem('kataforge-theme', 'light');
      if (seed)
        localStorage.setItem(
          'kataforge:cursus-progress:applied-algorithms-coding-round',
          JSON.stringify({
            cursusId: 'applied-algorithms-coding-round',
            completedStepKeys: ['day1-foundations:1'],
            lastStepKey: 'day1-foundations:1',
            startedAt: Date.now(),
          }),
        );
    },
    [light, seedProgress],
  );
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  if (actions) await actions(page);
  await page.waitForTimeout(400);
  const el = await page.$('article.kf-ui');
  if (el) await el.screenshot({ path });
  else await page.screenshot({ path });
  console.log('shot', path);
  await page.close();
}

const L = `${BASE}/cursus/applied-algorithms-coding-round/step/0`;
const C = `${BASE}/cursus/applied-algorithms-coding-round/step/5`;

async function clickText(page, label) {
  for (const b of await page.$$('button')) {
    const t = (await b.textContent()) || '';
    if (t.includes(label)) {
      await b.click();
      return true;
    }
  }
  return false;
}

await shotEl('/tmp/el-lesson-dark.png', L);
await shotEl('/tmp/el-checkpoint-locked.png', C);
await shotEl('/tmp/el-checkpoint-q-dark.png', C, { seedProgress: true });
await shotEl('/tmp/el-checkpoint-q-light.png', C, { seedProgress: true, light: true });
await shotEl('/tmp/el-checkpoint-answered-dark.png', C, {
  seedProgress: true,
  actions: async (page) => {
    await page.$$('button.checkpoint-choice').then((cs) => cs[1]?.click());
    await page.waitForTimeout(400);
  },
});
await shotEl('/tmp/el-checkpoint-review-light.png', C, {
  seedProgress: true,
  light: true,
  actions: async (page) => {
    const cs = await page.$$('button.checkpoint-choice');
    if (cs[0]) await cs[0].click();
    await page.waitForTimeout(300);
    await clickText(page, 'Finish self-check');
    await page.waitForTimeout(400);
  },
});

await browser.close();
console.log('done');
