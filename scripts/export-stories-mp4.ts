#!/usr/bin/env bun

import { chromium } from 'playwright';
import { mkdirSync, existsSync, renameSync, statSync } from 'fs';
import { join } from 'path';

const EXPORT_CONFIG = {
  width: 1080,      // Instagram Story width
  height: 1920,     // Instagram Story height
  duration: 15000,  // 15 seconds in milliseconds
  fps: 30,          // 30fps for smooth video
};

interface CaptureOptions {
  storyId: string;
  frameIndex: number | null;
  outputPath: string;
}

/**
 * Capture story as MP4 video using Playwright's video recording
 */
async function captureAsVideo(
  url: string,
  options: CaptureOptions
): Promise<void> {
  console.log(`🎬 ${options.outputPath.split('/').pop()}`);

  // Create a temporary directory for video recording
  const tempDir = join(process.cwd(), 'exports-temp');
  if (!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true });

  // Launch browser with video recording enabled
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
    // Navigate to the story
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });

    // Remove the CSS scale transform
    await page.evaluate(() => {
      const root = document.getElementById('root');
      if (root) root.style.transform = 'none';
    });

    // Wait a moment for animations to start
    await page.waitForTimeout(1000);

    // Record for the full duration
    await page.waitForTimeout(EXPORT_CONFIG.duration);

    // Close the page to finalize the video
    await page.close();

    // Get the video file path
    const videoPath = await page.video()?.path();

    if (videoPath) {
      // Move the video to the final destination
      renameSync(videoPath, options.outputPath);

      // Get file size
      const stats = statSync(options.outputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  ✓ ${sizeMB} MB`);
    } else {
      throw new Error('Video file was not created');
    }
  } catch (error) {
    console.error(`  ✗ Error recording video: ${error}`);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
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

      // Export cover video (background only)
      await captureAsVideo(`file://${exportHTMLPath}?story=${story.id}&cover=true`, {
        storyId: story.id,
        frameIndex: null,
        outputPath: join(storyDir, 'cover.mp4'),
      });

      // Export frame videos
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

    console.log('\n✅ All stories exported as MP4!');
    console.log(`📁 exports/`);
    console.log('\n💡 Upload these videos to Instagram Stories!');
  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

main();
