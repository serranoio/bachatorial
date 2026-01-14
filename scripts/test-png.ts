#!/usr/bin/env bun

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function testPNG() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 540, height: 960 },
  });
  const page = await context.newPage();

  try {
    const url = `file://${join(process.cwd(), 'export-real.html')}?story=about-me&frame=1`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.getAttribute('data-export-ready') === 'true', { timeout: 15000 });
    await page.waitForFunction(() => document.body.getAttribute('data-react-rendered') === 'true', { timeout: 15000 });
    await page.waitForTimeout(2000);

    const screenshot = await page.screenshot({ type: 'png', fullPage: false });
    writeFileSync('test-about-me-frame2.png', screenshot);

    console.log('✅ PNG saved: test-about-me-frame2.png');
    console.log('📂 Open it to see if text renders correctly BEFORE GIF encoding');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

testPNG();
