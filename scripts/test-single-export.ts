#!/usr/bin/env bun

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Encoder } from 'modern-gif';
import sharp from 'sharp';

const EXPORT_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 8,
  duration: 2,
};

interface CaptureOptions {
  storyId: string;
  frameIndex: number | null;
  outputPath: string;
}

async function captureAsGif(
  page: any,
  url: string,
  options: CaptureOptions
): Promise<void> {
  console.log(`📸 ${options.outputPath.split('/').pop()}`);

  await page.goto(url, { waitUntil: 'load', timeout: 30000 });

  // Remove the CSS scale transform
  await page.evaluate(() => {
    const root = document.getElementById('root');
    if (root) root.style.transform = 'none';
  });

  await page.waitForTimeout(2000);

  const totalFrames = EXPORT_CONFIG.fps * EXPORT_CONFIG.duration;
  const frameDelay = 1000 / EXPORT_CONFIG.fps;

  const frames: Buffer[] = [];
  for (let i = 0; i < totalFrames; i++) {
    const screenshot = await page.screenshot({ type: 'png', fullPage: false, timeout: 60000 });
    frames.push(screenshot);
    if (i < totalFrames - 1) await page.waitForTimeout(frameDelay);
  }

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
  writeFileSync(options.outputPath, Buffer.from(buffer));

  const sizeMB = (buffer.byteLength / 1024 / 1024).toFixed(2);
  console.log(`  ✓ ${sizeMB} MB`);
}

async function main() {
  console.log('🎬 Testing Single Story Export');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height} @ ${EXPORT_CONFIG.fps}fps\n`);

  const exportHTMLPath = join(process.cwd(), 'export-real.html');
  const testDir = join(process.cwd(), 'test-export');
  if (!existsSync(testDir)) mkdirSync(testDir, { recursive: true });

  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
  });
  const page = await context.newPage();

  try {
    console.log('\n📚 Testing Welcome Story\n');

    // Export cover
    await captureAsGif(page, `file://${exportHTMLPath}?story=welcome&cover=true`, {
      storyId: 'welcome',
      frameIndex: null,
      outputPath: join(testDir, 'welcome-cover.gif'),
    });

    // Export first frame
    await captureAsGif(page, `file://${exportHTMLPath}?story=welcome&frame=0`, {
      storyId: 'welcome',
      frameIndex: 0,
      outputPath: join(testDir, 'welcome-frame-1.gif'),
    });

    console.log('\n✅ Test export complete!');
    console.log(`📁 Check: test-export/`);
    console.log('\nOpen files with:');
    console.log('  open test-export/welcome-cover.gif');
    console.log('  open test-export/welcome-frame-1.gif');
  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await browser.close();
  }
}

main();
