#!/usr/bin/env bun

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Debug script to test Playwright screenshot rendering
 */
async function main() {
  console.log('🔍 Testing Playwright Screenshot Rendering\n');

  const exportHTMLPath = join(process.cwd(), 'export-real.html');
  const testUrl = `file://${exportHTMLPath}?story=welcome&frame=0`;

  const browser = await chromium.launch({ headless: true });

  // Test 1: Screenshot with current config (540x960)
  console.log('Test 1: Current config (540×960 viewport)');
  const context1 = await browser.newContext({
    viewport: { width: 540, height: 960 },
  });
  const page1 = await context1.newPage();
  try {
    await page1.goto(testUrl, { waitUntil: 'load', timeout: 10000 });
    await page1.waitForTimeout(3000);

    const screenshot1 = await page1.screenshot({ type: 'png' });
    writeFileSync(join(process.cwd(), 'test-540x960.png'), screenshot1);
    console.log('  ✓ Saved: test-540x960.png\n');
  } catch (e) {
    console.error('  ✗ Error:', e.message);
  }
  await context1.close();

  // Test 2: Screenshot with full size (1080x1920)
  console.log('Test 2: Full size (1080×1920 viewport)');
  const context2 = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
  });
  const page2 = await context2.newPage();
  try {
    await page2.goto(testUrl, { waitUntil: 'load', timeout: 10000 });
    await page2.waitForTimeout(3000);

    const screenshot2 = await page2.screenshot({ type: 'png' });
    writeFileSync(join(process.cwd(), 'test-1080x1920.png'), screenshot2);
    console.log('  ✓ Saved: test-1080x1920.png\n');
  } catch (e) {
    console.error('  ✗ Error:', e.message);
  }
  await context2.close();

  // Test 3: Remove the scale transform before screenshot
  console.log('Test 3: 1080×1920 viewport with scale removed via JS');
  const context3 = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
  });
  const page3 = await context3.newPage();
  try {
    await page3.goto(testUrl, { waitUntil: 'load', timeout: 10000 });
    await page3.waitForTimeout(2000);

    // Remove the scale transform
    await page3.evaluate(() => {
      const root = document.getElementById('root');
      if (root) {
        root.style.transform = 'none';
      }
    });

    await page3.waitForTimeout(1000);

    const screenshot3 = await page3.screenshot({ type: 'png' });
    writeFileSync(join(process.cwd(), 'test-no-scale.png'), screenshot3);
    console.log('  ✓ Saved: test-no-scale.png\n');
  } catch (e) {
    console.error('  ✗ Error:', e.message);
  }
  await context3.close();

  await browser.close();

  console.log('✅ Done! Check the test-*.png files to see which renders correctly.');
  console.log('\nOpen them with:');
  console.log('  open test-540x960.png');
  console.log('  open test-1080x1920.png');
  console.log('  open test-no-scale.png');
}

main();
