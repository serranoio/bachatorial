#!/usr/bin/env bun

import { chromium } from 'playwright';
import { join } from 'path';

async function debugExport() {
  console.log('🔍 Opening browser for debugging...\n');

  const browser = await chromium.launch({
    headless: false,
    devtools: true // Opens DevTools automatically
  });

  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
  });

  const page = await context.newPage();

  // Capture console logs
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  try {
    // Change this URL to test different stories/frames
    const storyId = 'about-me';
    const frameIndex = 1; // frame-2 is index 1
    const url = `file://${join(process.cwd(), 'export-real.html')}?story=${storyId}&frame=${frameIndex}`;

    console.log(`📖 Loading: ${storyId} - frame ${frameIndex + 1}`);
    console.log(`🔗 URL: ${url}\n`);

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.getAttribute('data-export-ready') === 'true', { timeout: 15000 });
    await page.waitForFunction(() => document.body.getAttribute('data-react-rendered') === 'true', { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Check computed styles of the first paragraph
    const textStyles = await page.evaluate(() => {
      const p = document.querySelector('.export-content p');
      if (!p) return 'No paragraph found';

      const computed = window.getComputedStyle(p);
      return {
        color: computed.color,
        webkitTextFillColor: computed.webkitTextFillColor,
        webkitTextStroke: computed.webkitTextStroke,
        webkitTextStrokeWidth: computed.webkitTextStrokeWidth,
        webkitTextStrokeColor: computed.webkitTextStrokeColor,
        backgroundImage: computed.backgroundImage,
        backgroundClip: computed.backgroundClip,
        webkitBackgroundClip: computed.webkitBackgroundClip,
        textContent: p.textContent?.substring(0, 50) + '...',
      };
    });

    console.log('\n📊 Text Styles:');
    console.log(JSON.stringify(textStyles, null, 2));

    console.log('\n✅ Browser will stay open for 5 minutes for inspection.');
    console.log('💡 Tips:');
    console.log('   - Right-click on text → Inspect to see computed styles');
    console.log('   - Check the Elements panel for applied CSS');
    console.log('   - Look for any overriding styles in the Styles panel\n');

    // Keep browser open for 5 minutes
    await page.waitForTimeout(300000);

  } catch (error) {
    console.error('\n❌ Error:', error);
    await page.waitForTimeout(60000); // Keep open 1 min on error
  } finally {
    await browser.close();
  }
}

debugExport();
