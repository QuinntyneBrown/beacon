// Beacon Kanban mock screenshot generator
// Renders each HTML page at mobile / tablet / desktop and saves PNGs into ./screenshots
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  'index.html',
  'login.html',
  'boards.html',
  'board.html',
  'card.html',
  'settings.html',
  'components.html',
];

const viewports = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 820,  height: 1180 },
  { name: 'desktop', width: 1440, height: 900 },
];

(async () => {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    for (const file of pages) {
      const url = 'file:///' + path.join(ROOT, file).replace(/\\/g, '/');
      await page.goto(url, { waitUntil: 'networkidle' });
      // Give web fonts and Material Symbols a moment to settle.
      await page.waitForTimeout(800);
      const stem = file.replace(/\.html$/, '');
      const out = path.join(OUT, `${stem}-${vp.name}.png`);
      await page.screenshot({ path: out, fullPage: true });
      console.log('wrote', path.relative(ROOT, out));
    }
    await ctx.close();
  }
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
