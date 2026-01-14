#!/usr/bin/env bun

import { chromium } from 'playwright';
import { mkdirSync, existsSync, renameSync, statSync } from 'fs';
import { join } from 'path';

const EXPORT_CONFIG = {
  width: 1080,
  height: 1920,
  duration: 15000, // 15 seconds
  fps: 30,
};

async function captureAsVideo(url: string, outputPath: string): Promise<void> {
  console.log(`🎬 Recording: ${outputPath.split('/').pop()}`);

  const tempDir = join(process.cwd(), 'test-video-temp');
  if (!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
    recordVideo: {
      dir: tempDir,
      size: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
    },
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });

    // Remove scale transform
    await page.evaluate(() => {
      const root = document.getElementById('root');
      if (root) root.style.transform = 'none';
    });

    await page.waitForTimeout(1000);

    // Record for 15 seconds
    console.log('  ⏱️  Recording for 15 seconds...');
    await page.waitForTimeout(EXPORT_CONFIG.duration);

    await page.close();

    const videoPath = await page.video()?.path();

    if (videoPath) {
      renameSync(videoPath, outputPath);

      const stats = statSync(outputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  ✓ ${sizeMB} MB - ${outputPath}`);
    }
  } catch (error) {
    console.error(`  ✗ Error: ${error}`);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

async function main() {
  console.log('🎬 Test MP4 Export (15s @ 30fps)');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height}\n`);

  const exportHTMLPath = join(process.cwd(), 'export-real.html');
  const testDir = join(process.cwd(), 'test-export');
  if (!existsSync(testDir)) mkdirSync(testDir, { recursive: true });

  console.log('📚 Testing Welcome Story\n');

  // Test cover
  await captureAsVideo(
    `file://${exportHTMLPath}?story=welcome&cover=true`,
    join(testDir, 'welcome-cover.mp4')
  );

  // Test first frame
  await captureAsVideo(
    `file://${exportHTMLPath}?story=welcome&frame=0`,
    join(testDir, 'welcome-frame-1.mp4')
  );

  console.log('\n✅ Test complete!');
  console.log('\nOpen videos with:');
  console.log('  open test-export/welcome-cover.mp4');
  console.log('  open test-export/welcome-frame-1.mp4');
}

main();
