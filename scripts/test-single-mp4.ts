#!/usr/bin/env bun

import { chromium } from 'playwright';
import { mkdirSync, existsSync, renameSync, statSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';

const EXPORT_CONFIG = {
  width: 1080,
  height: 1920,
  duration: 15000,
  fps: 30,
};

async function captureAsVideo(url: string, outputPath: string): Promise<void> {
  console.log(`🎬 Recording: ${outputPath.split('/').pop()}`);

  // Ensure output path has .mp4 extension
  const mp4OutputPath = outputPath.replace(/\.(mp4|webm)$/, '.mp4');
  const webmTempPath = mp4OutputPath.replace('.mp4', '.temp.webm');

  // Use unique temp directory for each video
  const tempDir = join(process.cwd(), `test-video-temp-${Date.now()}`);
  mkdirSync(tempDir, { recursive: true });

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

    await page.evaluate(() => {
      const root = document.getElementById('root');
      if (root) root.style.transform = 'none';
    });

    await page.waitForTimeout(1000);

    console.log('  ⏱️  Recording for 15 seconds...');
    await page.waitForTimeout(EXPORT_CONFIG.duration);

    await page.close();
    await context.close();
    await browser.close();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const files = readdirSync(tempDir);
    const webmFile = files.find((f: string) => f.endsWith('.webm'));

    if (webmFile) {
      const sourcePath = join(tempDir, webmFile);
      renameSync(sourcePath, webmTempPath);

      // Convert WebM to MP4 using ffmpeg
      const { spawnSync } = await import('child_process');
      const result = spawnSync('ffmpeg', [
        '-i', webmTempPath,
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-an', // no audio
        '-y',
        mp4OutputPath
      ], { stdio: 'pipe' });

      if (result.status !== 0) {
        throw new Error(`FFmpeg conversion failed: ${result.stderr?.toString()}`);
      }

      // Remove the WebM temp file after conversion
      rmSync(webmTempPath, { force: true });

      const stats = statSync(mp4OutputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  ✓ ${sizeMB} MB`);

      // Clean up temp directory
      rmSync(tempDir, { recursive: true, force: true });
    } else {
      throw new Error('Video file was not created');
    }
  } catch (error) {
    await browser.close().catch(() => {});
    try {
      rmSync(tempDir, { recursive: true, force: true });
    } catch {}
    try {
      rmSync(webmTempPath, { force: true });
    } catch {}
    console.error(`  ✗ Error: ${error}`);
    throw error;
  }
}

async function main() {
  console.log('🎬 Test MP4 Export (15s @ 30fps)');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height}\n`);

  const exportHTMLPath = join(process.cwd(), 'export-real.html');
  const testDir = join(process.cwd(), 'test-export');
  if (!existsSync(testDir)) mkdirSync(testDir, { recursive: true });

  console.log('📚 Testing Welcome Story\n');

  await captureAsVideo(
    `file://${exportHTMLPath}?story=welcome&cover=true`,
    join(testDir, 'welcome-cover.mp4')
  );

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
