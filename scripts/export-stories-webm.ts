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

  // Output as WebM
  const webmOutputPath = options.outputPath.replace(/\.(mp4|webm)$/, '.webm');

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

    // Force kill any lingering Chromium processes
    const { spawnSync: killSpawn } = await import('child_process');
    killSpawn('pkill', ['-9', '-f', 'chromium']);

    // Synchronous busy-wait for video file (Playwright writes asynchronously)
    const maxWait = 10000;
    const startTime = Date.now();
    let webmFile: string | undefined;

    while (!webmFile && Date.now() - startTime < maxWait) {
      try {
        const files = readdirSync(tempDir);
        webmFile = files.find((f: string) => f.endsWith('.webm'));
      } catch {
        // Directory might not be ready yet
      }
    }

    if (webmFile) {
      const sourcePath = join(tempDir, webmFile);
      renameSync(sourcePath, webmOutputPath);

      const stats = statSync(webmOutputPath);
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
    console.error(`  ✗ Error: ${error}`);
    throw error;
  }
}

async function getStoryData() {
  const { storyData } = await import('../theme/stories/index.js');
  return storyData;
}

async function main() {
  console.log('🎬 Instagram Story WebM Export');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height} @ ${EXPORT_CONFIG.fps}fps`);
  console.log(`⏱️  ${EXPORT_CONFIG.duration / 1000}s duration per video\n`);
  console.log('Note: Run "bun run scripts/convert-webm-to-mp4.ts" after to convert to MP4\n');

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
        outputPath: join(storyDir, 'cover.webm'),
      });

      // Export frames
      const frameCount = story.frames?.length || 0;
      for (let i = 0; i < frameCount; i++) {
        await captureAsVideo(`file://${exportHTMLPath}?story=${story.id}&frame=${i}`, {
          storyId: story.id,
          frameIndex: i,
          outputPath: join(storyDir, `frame-${i + 1}.webm`),
        });
      }

      console.log(`  ✅ Complete`);
    }

    console.log('\n✅ All stories exported as WebM!');
    console.log(`📁 exports/`);
    console.log('\nTo convert to MP4:');
    console.log('  bun run scripts/convert-webm-to-mp4.ts');
  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

main();
