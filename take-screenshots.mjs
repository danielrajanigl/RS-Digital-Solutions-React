import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sites = [
  { name: 'akkilinc', url: 'https://akkilinc-fq2f.vercel.app' },
  { name: 'antephaus', url: 'http://76.13.0.11' },
  { name: 'bera-gold', url: 'https://bera-gold-diamond.vercel.app' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  for (const site of sites) {
    console.log(`📸 Screenshot: ${site.name} (${site.url})…`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait a bit for hero animations to settle
      await new Promise((r) => setTimeout(r, 2500));
      await page.screenshot({
        path: join(__dirname, 'public', 'screenshots', `${site.name}.webp`),
        type: 'webp',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 810 }, // 16:9 hero crop
      });
      console.log(`  ✅ ${site.name}.webp gespeichert`);
    } catch (err) {
      console.error(`  ❌ ${site.name} Fehler:`, err.message);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n🎉 Fertig! Screenshots unter public/screenshots/');
})();
