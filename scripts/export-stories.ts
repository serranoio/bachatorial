#!/usr/bin/env bun

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Encoder } from 'modern-gif';
import { PNG } from 'pngjs';

// Story configuration
const STORIES = [
  { id: 'dance-videos', title: 'Dance Videos' },
  { id: 'welcome', title: 'Welcome' },
  { id: 'about-me', title: 'About Me' },
  { id: 'excellence', title: 'Philosophy' },
  { id: 'teaching-philosophy', title: 'Teaching Philosophy' },
  { id: 'my-why', title: 'My Why' },
  { id: 'reps', title: 'Reps' },
];

const EXPORT_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 10, // Reduced from 15 for faster export and smaller files
  duration: 2, // Reduced from 3 for faster export
  quality: 10, // GIF quality (1-30, lower is better quality but slower)
};

interface CaptureOptions {
  storyId: string;
  frameIndex: number | null; // null for cover
  outputPath: string;
}

/**
 * Captures canvas frames from the browser and compiles them into an animated GIF
 */
async function captureStoryAsGif(
  url: string,
  options: CaptureOptions
): Promise<void> {
  console.log(`📸 Capturing: ${options.outputPath}`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: {
      width: EXPORT_CONFIG.width,
      height: EXPORT_CONFIG.height,
    },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for the export view to be ready
    await page.waitForFunction(() => {
      return document.body.getAttribute('data-export-ready') === 'true';
    }, { timeout: 15000 });

    // Give animations more time to settle and ensure canvas is fully initialized
    await page.waitForTimeout(1000);

    console.log(`  ✓ Page loaded and ready`);

    // Calculate number of frames
    const totalFrames = EXPORT_CONFIG.fps * EXPORT_CONFIG.duration;
    const frameDelay = 1000 / EXPORT_CONFIG.fps; // ms per frame

    console.log(`  Capturing ${totalFrames} frames at ${EXPORT_CONFIG.fps} FPS...`);

    // Capture frames
    const frames: Buffer[] = [];
    for (let i = 0; i < totalFrames; i++) {
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: false,
        timeout: 60000, // 60 second timeout per screenshot
      });
      frames.push(screenshot);

      // Wait for next frame
      if (i < totalFrames - 1) {
        await page.waitForTimeout(frameDelay);
      }

      // Progress indicator
      if ((i + 1) % 15 === 0 || i === totalFrames - 1) {
        console.log(`  Progress: ${i + 1}/${totalFrames} frames`);
      }
    }

    console.log(`  ✓ Captured ${frames.length} frames`);
    console.log(`  📦 Generating GIF...`);

    // Create GIF using modern-gif
    const encoder = new Encoder({
      width: EXPORT_CONFIG.width,
      height: EXPORT_CONFIG.height,
      maxColors: 256,
    });

    // Process each frame
    for (let i = 0; i < frames.length; i++) {
      await encoder.encode({
        data: frames[i],
        delay: Math.round(1000 / EXPORT_CONFIG.fps),
      });

      if ((i + 1) % 15 === 0 || i === frames.length - 1) {
        console.log(`  GIF Progress: ${i + 1}/${frames.length} frames`);
      }
    }

    // Finalize GIF
    const buffer = await encoder.flush();

    // Write GIF file
    writeFileSync(options.outputPath, Buffer.from(buffer));

    const fileSizeMB = (buffer.byteLength / 1024 / 1024).toFixed(2);
    console.log(`  ✓ GIF created: ${options.outputPath} (${fileSizeMB} MB)`);
  } catch (error) {
    console.error(`  ❌ Error capturing ${options.outputPath}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Generate HTML for a specific story view
 */
function generateExportHTML(
  storyId: string,
  frameIndex: number | null
): string {
  const isCover = frameIndex === null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=${EXPORT_CONFIG.width}, initial-scale=1.0">
  <title>Export: ${storyId} - ${isCover ? 'Cover' : `Frame ${frameIndex}`}</title>
  <style>
    :root {
      --color-gold-light: #E8D4A8;
      --color-gold-warm: #D4AF88;
      --color-coral: #FF8B94;
      --color-gold-lighter: #FFE4B8;
      --color-gold-peachy: #DCBE8C;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #151515;
      font-family: Georgia, "Times New Roman", serif;
      width: ${EXPORT_CONFIG.width}px;
      height: ${EXPORT_CONFIG.height}px;
    }

    #root {
      width: 100%;
      height: 100%;
      position: relative;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 80px 60px;
      z-index: 10;
      color: white;
      display: ${isCover ? 'none' : 'flex'};
      flex-direction: column;
    }

    .content h2 { font-size: 72px !important; margin-bottom: 30px; }
    .content h3 { font-size: 48px !important; margin-bottom: 30px; }
    .content p { font-size: 32px !important; line-height: 1.6 !important; margin-bottom: 20px; }
    .content li { font-size: 28px !important; line-height: 2 !important; }
    .content strong { font-weight: bold; }
  </style>
</head>
<body data-story-id="${storyId}" data-frame-index="${frameIndex}" data-is-cover="${isCover}">
  <div id="root">
    <canvas id="animation-canvas" width="${EXPORT_CONFIG.width}" height="${EXPORT_CONFIG.height}"></canvas>
    <div class="content" id="frame-content"></div>
  </div>

  <script type="module">
    // Simple placeholder animation
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    let frame = 0;

    function animate() {
      frame++;
      // Draw a simple gradient background animation
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const hue = (frame * 2) % 360;
      gradient.addColorStop(0, \`hsl(\${hue}, 50%, 10%)\`);
      gradient.addColorStop(1, \`hsl(\${(hue + 60) % 360}, 50%, 15%)\`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    }

    animate();

    // Signal ready
    setTimeout(() => {
      document.body.setAttribute('data-export-ready', 'true');
    }, 500);
  </script>
</body>
</html>`;
}

/**
 * Export a single story
 */
async function exportStory(storyId: string, frameCount: number): Promise<void> {
  console.log(`\n📚 Exporting story: ${storyId}`);

  const storyDir = join(process.cwd(), 'exports', storyId);
  if (!existsSync(storyDir)) {
    mkdirSync(storyDir, { recursive: true });
  }

  // 1. Export cover
  const coverHTML = generateExportHTML(storyId, null);
  const coverHTMLPath = join(process.cwd(), 'exports', 'temp', `${storyId}-cover.html`);

  if (!existsSync(join(process.cwd(), 'exports', 'temp'))) {
    mkdirSync(join(process.cwd(), 'exports', 'temp'), { recursive: true });
  }

  writeFileSync(coverHTMLPath, coverHTML);

  await captureStoryAsGif(`file://${coverHTMLPath}`, {
    storyId,
    frameIndex: null,
    outputPath: join(storyDir, 'cover.gif'),
  });

  // 2. Export frames
  for (let i = 0; i < frameCount; i++) {
    const frameHTML = generateExportHTML(storyId, i);
    const frameHTMLPath = join(
      process.cwd(),
      'exports',
      'temp',
      `${storyId}-frame-${i}.html`
    );

    writeFileSync(frameHTMLPath, frameHTML);

    await captureStoryAsGif(`file://${frameHTMLPath}`, {
      storyId,
      frameIndex: i,
      outputPath: join(storyDir, `frame-${i + 1}.gif`),
    });
  }

  console.log(`✅ Exported ${storyId} (cover + ${frameCount} frames)`);
}

/**
 * Import story data to get frame counts
 */
async function getStoryData() {
  // Dynamically import story data
  const { storyData } = await import('../theme/stories/index.js');
  return storyData;
}

/**
 * Main export function
 */
async function main() {
  console.log('🎬 Starting Instagram Story Export');
  console.log(`📐 Dimensions: ${EXPORT_CONFIG.width}x${EXPORT_CONFIG.height}`);
  console.log(`🎞️  FPS: ${EXPORT_CONFIG.fps}`);
  console.log(`⏱️  Duration: ${EXPORT_CONFIG.duration}s`);
  console.log('');

  // Import story data
  console.log('📖 Loading story data...');
  const stories = await getStoryData();
  console.log(`✓ Found ${stories.length} stories\n`);

  const exportHTMLPath = join(process.cwd(), 'export-standalone.html');

  try {
    // Export each story
    for (const story of stories) {
      console.log(`\n📚 Exporting story: ${story.title} (${story.id})`);

      const storyDir = join(process.cwd(), 'exports', story.id);
      if (!existsSync(storyDir)) {
        mkdirSync(storyDir, { recursive: true });
      }

      // 1. Export cover (background only)
      console.log(`  📸 Capturing cover...`);
      await captureStoryAsGif(
        `file://${exportHTMLPath}?story=${story.id}&cover=true`,
        {
          storyId: story.id,
          frameIndex: null,
          outputPath: join(storyDir, 'cover.gif'),
        }
      );

      // 2. Export each frame
      const frameCount = story.frames?.length || 0;
      console.log(`  📸 Capturing ${frameCount} frames...`);

      for (let i = 0; i < frameCount; i++) {
        await captureStoryAsGif(
          `file://${exportHTMLPath}?story=${story.id}&frame=${i}`,
          {
            storyId: story.id,
            frameIndex: i,
            outputPath: join(storyDir, `frame-${i + 1}.gif`),
          }
        );
      }

      console.log(`  ✅ Exported ${story.title} (cover + ${frameCount} frames)`);
    }

    console.log('\n✅ All stories exported successfully!');
    console.log(`📁 Check the exports/ directory for all GIFs`);
  } catch (error) {
    console.error('\n❌ Export failed:', error);
    throw error;
  }
}

// Run the script
main();
