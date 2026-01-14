#!/usr/bin/env bun

import { chromium, Browser, Page } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Encoder } from 'modern-gif';
import sharp from 'sharp';

const EXPORT_CONFIG = {
  width: 1080,  // Full Instagram Story width
  height: 1920, // Full Instagram Story height
  fps: 8,
  duration: 2,
};

interface CaptureOptions {
  storyId: string;
  frameIndex: number | null;
  outputPath: string;
}

/**
 * Capture frames and create GIF (reuses page)
 */
async function captureAsGif(
  page: Page,
  url: string,
  options: CaptureOptions
): Promise<void> {
  console.log(`📸 ${options.outputPath.split('/').pop()}`);

  await page.goto(url, { waitUntil: 'load', timeout: 30000 });

  // Remove the CSS scale transform that's only needed for browser viewing
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
    maxColors: 256, // Use 256 for better quality
  });

  for (const frame of frames) {
    // Convert PNG buffer to raw RGBA pixels using sharp
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

/**
 * Import story data
 */
async function getStoryData() {
  const { storyData } = await import('../theme/stories/index.js');
  return storyData;
}

/**
 * Main export
 */
async function main() {
  console.log('🎬 Instagram Story Export (Real Animations)');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height} @ ${EXPORT_CONFIG.fps}fps\n`);

  const stories = await getStoryData();
  const exportHTMLPath = join(process.cwd(), 'export-real.html');

  // Launch browser once and reuse it
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
  });
  const page = await context.newPage();

  try {
    for (const story of stories) {
      console.log(`\n📚 ${story.title} (${story.id})`);

      const storyDir = join(process.cwd(), 'exports', story.id);
      if (!existsSync(storyDir)) mkdirSync(storyDir, { recursive: true });

      // Export cover
      await captureAsGif(page, `file://${exportHTMLPath}?story=${story.id}&cover=true`, {
        storyId: story.id,
        frameIndex: null,
        outputPath: join(storyDir, 'cover.gif'),
      });

      // Export frames
      const frameCount = story.frames?.length || 0;
      for (let i = 0; i < frameCount; i++) {
        await captureAsGif(page, `file://${exportHTMLPath}?story=${story.id}&frame=${i}`, {
          storyId: story.id,
          frameIndex: i,
          outputPath: join(storyDir, `frame-${i + 1}.gif`),
        });
      }

      console.log(`  ✅ Complete`);
    }

    console.log('\n✅ All stories exported!');
    console.log(`📁 exports/`);
  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await browser.close();
  }
}

main();
