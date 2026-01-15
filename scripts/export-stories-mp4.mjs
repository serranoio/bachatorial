#!/usr/bin/env node

import { chromium } from 'playwright';
import { mkdirSync, existsSync, renameSync, statSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EXPORT_CONFIG = {
  width: 1080,
  height: 1920,
  duration: 15000,
  fps: 30,
};

async function captureAsVideo(url, options, browser) {
  console.log(`📸 ${options.outputPath.split('/').pop()}`);

  const mp4OutputPath = options.outputPath.replace(/\.(mp4|webm)$/, '.mp4');
  const webmTempPath = mp4OutputPath.replace('.mp4', '.temp.webm');

  const tempDir = join(process.cwd(), '.temp-videos', `export-${Date.now()}`);
  mkdirSync(tempDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
    recordVideo: {
      dir: tempDir,
      size: { width: EXPORT_CONFIG.width, height: EXPORT_CONFIG.height },
    },
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    await page.evaluate(() => {
      const root = document.getElementById('root');
      if (root) root.style.transform = 'none';
    });

    // Wait for animations to be truly ready (GPU compositing complete)
    console.log('    ⏳ Waiting for animations to composite...');
    try {
      await page.waitForFunction(
        () => document.body.getAttribute('data-animations-ready') === 'true',
        { timeout: 15000 }
      );
      console.log('    ✓ Animations ready');
    } catch (timeoutError) {
      console.log('    ⚠️  Timeout waiting for animations, proceeding anyway...');
      // Continue with export even if signal not received
    }

    // Additional stabilization time for GPU to finish all compositing
    await page.waitForTimeout(1000);

    // Now record the actual content (15 seconds)
    await page.waitForTimeout(EXPORT_CONFIG.duration);

    await page.close();
    await context.close();

    // Wait for video file to be written (Node.js handles this cleanly)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const files = readdirSync(tempDir);
    const webmFile = files.find(f => f.endsWith('.webm'));

    if (!webmFile) {
      throw new Error(`Video file was not created in ${tempDir}`);
    }

    const sourcePath = join(tempDir, webmFile);
    renameSync(sourcePath, webmTempPath);

    // Convert WebM to MP4 using ffmpeg
    console.log('  🎞️  Converting to MP4...');
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
    ], { stdio: 'pipe' });

    if (result.status !== 0) {
      throw new Error(`FFmpeg conversion failed: ${result.stderr?.toString()}`);
    }

    rmSync(webmTempPath, { force: true });

    const stats = statSync(mp4OutputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✓ ${sizeMB} MB`);

    rmSync(tempDir, { recursive: true, force: true });
  } catch (error) {
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
  // Load story metadata directly (TypeScript files can't be imported by Node.js)
  return [
    { id: 'welcome', title: 'Welcome', frames: [{}] },
    { id: 'why-everyone-can-dance', title: 'Why Everyone Can Dance', frames: [{}, {}, {}] },
    { id: 'about-me', title: 'About Me', frames: [{}, {}] },
    { id: 'teaching-philosophy', title: 'Teaching Philosophy', frames: [{}, {}, {}] },
    { id: 'my-why', title: 'My Why', frames: [{}, {}] },
    { id: 'philosophy', title: 'Philosophy', frames: [{}] },
  ];
}

async function main() {
  console.log('🎬 Instagram Story MP4 Export (Node.js)');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height} @ ${EXPORT_CONFIG.fps}fps`);
  console.log(`⏱️  ${EXPORT_CONFIG.duration / 1000}s duration per video\n`);

  const stories = await getStoryData();
  const exportHTMLPath = join(process.cwd(), 'export-real.html');

  // Launch browser ONCE and reuse for all videos
  // Enable GPU hardware acceleration for better gradient rendering
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--enable-gpu',
      '--use-gl=angle',
      '--use-angle=default',
      '--enable-accelerated-2d-canvas',
      '--enable-accelerated-video-decode',
      '--disable-gpu-driver-bug-workarounds',
      '--enable-features=VaapiVideoDecoder',
    ],
  });

  try {
    for (const story of stories) {
      try {
        console.log(`\n📚 ${story.title} (${story.id})`);

        const storyDir = join(process.cwd(), 'exports', story.id);
        if (!existsSync(storyDir)) mkdirSync(storyDir, { recursive: true });

        // Export cover
        await captureAsVideo(`file://${exportHTMLPath}?story=${story.id}&cover=true`, {
          storyId: story.id,
          frameIndex: null,
          outputPath: join(storyDir, `${story.id}-cover.mp4`),
        }, browser);

        // Export frames
        const frameCount = story.frames?.length || 0;
        for (let i = 0; i < frameCount; i++) {
          await captureAsVideo(`file://${exportHTMLPath}?story=${story.id}&frame=${i}`, {
            storyId: story.id,
            frameIndex: i,
            outputPath: join(storyDir, `${story.id}-frame-${i + 1}.mp4`),
          }, browser);
        }

        console.log(`  ✅ Complete`);
      } catch (storyError) {
        console.error(`  ❌ Failed to export ${story.id}: ${storyError.message}`);
        console.log(`  ⏩ Continuing with next story...`);
      }
    }

    console.log('\n✅ All stories exported!');
    console.log(`📁 exports/`);
  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await browser.close();

    // NUCLEAR CLEANUP: Kill any leftover processes
    spawnSync('pkill', ['-9', '-f', 'chromium'], { stdio: 'ignore' });
    spawnSync('pkill', ['-9', '-f', 'playwright'], { stdio: 'ignore' });
  }
}

main();
