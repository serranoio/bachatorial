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

  const mp4OutputPath = outputPath.replace(/\.(mp4|webm)$/, '.mp4');
  const webmTempPath = mp4OutputPath.replace('.mp4', '.temp.webm');

  const tempDir = join(process.cwd(), '.temp-videos', `test-${Date.now()}`);
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

    console.log('  🔒 Closing browser...');
    try {
      await page.close();
      await Bun.sleep(500);
      await context.close();
      await Bun.sleep(500);
      await browser.close();
      await Bun.sleep(1000);
    } catch (e) {
      console.log('  ⚠️  Error closing browser:', e);
    }

    console.log('  ⏳ Waiting for video file...');
    await Bun.sleep(5000);

    const files = readdirSync(tempDir);
    console.log(`  📁 Files in temp dir: ${files.join(', ')}`);
    const webmFile = files.find((f: string) => f.endsWith('.webm'));

    if (webmFile) {
      const sourcePath = join(tempDir, webmFile);
      renameSync(sourcePath, webmTempPath);

      console.log('  🎞️  Converting to MP4...');
      const { spawnSync } = await import('child_process');
      const result = spawnSync('ffmpeg', [
        '-i', webmTempPath,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-an',
        '-y',
        mp4OutputPath
      ]);

      if (result.status !== 0) {
        console.error('FFmpeg stderr:', result.stderr?.toString());
        throw new Error(`FFmpeg conversion failed with status ${result.status}`);
      }

      rmSync(webmTempPath, { force: true });

      const stats = statSync(mp4OutputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  ✓ ${sizeMB} MB`);

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
  console.log('🎬 Test Two Videos\n');

  const exportHTMLPath = join(process.cwd(), 'export-real.html');
  const testDir = join(process.cwd(), 'test-export');
  if (!existsSync(testDir)) mkdirSync(testDir, { recursive: true });

  console.log('Video 1:');
  await captureAsVideo(
    `file://${exportHTMLPath}?story=welcome&cover=true`,
    join(testDir, 'test-one.mp4')
  );

  console.log('\nVideo 2:');
  await captureAsVideo(
    `file://${exportHTMLPath}?story=welcome&frame=0`,
    join(testDir, 'test-two.mp4')
  );

  console.log('\n✅ Done!');
  console.log('  open test-export/test-one.mp4');
  console.log('  open test-export/test-two.mp4');
}

main();
