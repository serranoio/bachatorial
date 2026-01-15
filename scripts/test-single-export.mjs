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
    ignoreHTTPSErrors: true,
    bypassCSP: true,
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
    await page.waitForFunction(
      () => document.body.getAttribute('data-animations-ready') === 'true',
      { timeout: 10000 }
    );

    // Additional stabilization time for GPU to finish all compositing
    await page.waitForTimeout(500);
    console.log('    ✓ Animations ready');

    // Now record the actual content (15 seconds)
    await page.waitForTimeout(EXPORT_CONFIG.duration);

    await page.close();
    await context.close();

    // Wait for video file to be written
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

async function main() {
  console.log('🎬 Test Export - Welcome Story');
  console.log(`📐 ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height} @ ${EXPORT_CONFIG.fps}fps`);
  console.log(`⏱️  ${EXPORT_CONFIG.duration / 1000}s duration per video\n`);

  const exportHTMLPath = join(process.cwd(), 'export-real.html');

  // Launch browser with GPU acceleration
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
    const storyDir = join(process.cwd(), 'exports', 'welcome');
    if (!existsSync(storyDir)) mkdirSync(storyDir, { recursive: true });

    // Export cover
    await captureAsVideo(`file://${exportHTMLPath}?story=welcome&cover=true`, {
      storyId: 'welcome',
      frameIndex: null,
      outputPath: join(storyDir, `welcome-cover.mp4`),
    }, browser);

    console.log('\n✅ Test export complete!');
    console.log(`📁 exports/welcome/`);
  } catch (error) {
    console.error('\n❌ Error:', error);
  } finally {
    await browser.close();

    // Cleanup
    spawnSync('pkill', ['-9', '-f', 'chromium'], { stdio: 'ignore' });
    spawnSync('pkill', ['-9', '-f', 'playwright'], { stdio: 'ignore' });
  }
}

main();
