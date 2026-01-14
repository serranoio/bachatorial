#!/usr/bin/env bun

import { chromium } from 'playwright';
import { join } from 'path';

async function testURL(url: string, name: string) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   URL: ${url}`);

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
  });

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 10000 });
    await page.waitForTimeout(2000);

    const title = await page.title();
    console.log(`   ✓ Page loaded: ${title}`);

    // Wait a bit to visually confirm
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error(`   ✗ Error: ${error}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const exportHTMLPath = join(process.cwd(), 'export-real.html');

  await testURL(`file://${exportHTMLPath}?story=welcome&cover=true`, 'Welcome Cover');
  await testURL(`file://${exportHTMLPath}?story=welcome&frame=0`, 'Welcome Frame 0');
  await testURL(`file://${exportHTMLPath}?story=welcome&frame=1`, 'Welcome Frame 1');
  await testURL(`file://${exportHTMLPath}?story=welcome&frame=2`, 'Welcome Frame 2');
  await testURL(`file://${exportHTMLPath}?story=welcome&frame=3`, 'Welcome Frame 3');

  console.log('\n✅ All tests complete!');
}

main();
