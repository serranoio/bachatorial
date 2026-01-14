#!/usr/bin/env bun

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Encoder } from 'modern-gif';
import sharp from 'sharp';

const EXPORT_CONFIG = {
  width: 540,
  height: 960,
  fps: 8,
  duration: 2,
};

async function testSingleGIF() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
  });
  const page = await context.newPage();

  try {
    const url = `file://${join(process.cwd(), 'export-real.html')}?story=about-me&frame=1`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.getAttribute('data-export-ready') === 'true', { timeout: 15000 });
    await page.waitForFunction(() => document.body.getAttribute('data-react-rendered') === 'true', { timeout: 15000 });
    await page.waitForTimeout(2000);

    const frames: Buffer[] = [];
    const totalFrames = EXPORT_CONFIG.fps * EXPORT_CONFIG.duration;
    const frameDelay = 1000 / EXPORT_CONFIG.fps;

    for (let i = 0; i < totalFrames; i++) {
      const screenshot = await page.screenshot({ type: 'png', fullPage: false, timeout: 60000 });
      frames.push(screenshot);
      if (i < totalFrames - 1) await page.waitForTimeout(frameDelay);
    }

    console.log(`✓ Captured ${frames.length} frames`);

    const encoder = new Encoder({
      width: EXPORT_CONFIG.width,
      height: EXPORT_CONFIG.height,
      maxColors: 256,
    });

    for (const frame of frames) {
      const { data } = await sharp(frame)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      await encoder.encode({
        data: new Uint8ClampedArray(data),
        delay: Math.round(1000 / EXPORT_CONFIG.fps),
      });
    }

    const buffer = await encoder.flush();
    writeFileSync('test-about-me-frame2.gif', Buffer.from(buffer));

    const sizeMB = (buffer.byteLength / 1024 / 1024).toFixed(2);
    console.log(`✅ GIF created: test-about-me-frame2.gif (${sizeMB} MB)`);
    console.log(`📂 Open it to check if text renders correctly`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

testSingleGIF();
