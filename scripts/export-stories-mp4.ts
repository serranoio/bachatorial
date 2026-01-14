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

interface CaptureOptions {
  storyId: string;
  frameIndex: number | null;
  outputPath: string;
}

async function captureAsVideo(url: string, options: CaptureOptions): Promise<void> {
  console.log(`📸 ${options.outputPath.split('/').pop()}`);

  // Ensure output path has .mp4 extension
  const mp4OutputPath = options.outputPath.replace(/\.(mp4|webm)$/, '.mp4');
  const webmTempPath = mp4OutputPath.replace('.mp4', '.temp.webm');

  // Use unique temp directory for each video
  const tempDir = join(process.cwd(), `exports-temp-${Date.now()}`);
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

async function getStoryData() {
  const { storyData } = await import('../theme/stories/index.js');
  return storyData;
}

async function main() {
  console.log('🎬 Instagram Story MP4 Export');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height} @ ${EXPORT_CONFIG.fps}fps`);
  console.log(`⏱️  ${EXPORT_CONFIG.duration / 1000}s duration per video\n`);

  const stories = await getStoryData();
  const exportHTMLPath = join(process.cwd(), 'export-real.html');

  try {
    for (const story of stories) {
      console.log(`\n📚 ${story.title} (${story.id})`);

      const storyDir = join(process.cwd(), 'exports', story.id);
      if (!existsSync(storyDir)) mkdirSync(storyDir, { recursive: true });

      // Export cover
      await captureAsVideo(`file://${exportHTMLPath}?story=${story.id}&cover=true`, {
        storyId: story.id,
        frameIndex: null,
        outputPath: join(storyDir, 'cover.mp4'),
      });

      // Export frames
      const frameCount = story.frames?.length || 0;
      for (let i = 0; i < frameCount; i++) {
        await captureAsVideo(`file://${exportHTMLPath}?story=${story.id}&frame=${i}`, {
          storyId: story.id,
          frameIndex: i,
          outputPath: join(storyDir, `frame-${i + 1}.mp4`),
        });
      }

      console.log(`  ✅ Complete`);
    }

    console.log('\n✅ All stories exported!');
    console.log(`📁 exports/`);
  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

main();
