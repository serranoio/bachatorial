# Export Stories System Architecture

## Overview

The export system converts React-based Instagram Stories into MP4 video files suitable for uploading to Instagram.

## Complete Workflow

### Step 1: Build Export HTML
**Script:** `scripts/build-export-html.ts`
**Command:** `bun run build:export`

Bundles all story components into a standalone HTML file:
1. Bundles `scripts/export-entry.tsx` with React/ReactDOM using Bun.build
2. Creates IIFE (Immediately Invoked Function Expression) format for browser
3. Inlines the bundle into `export-real-template.html` at `<!-- BUNDLE_PLACEHOLDER -->`
4. Outputs `export-real.html` (~1.1MB standalone file)

**When to run:** After modifying story content or components in `theme/stories/`

### Step 2: Export Stories to MP4
**Script:** `scripts/export-stories-mp4.ts`
**Command:** `bun run export:stories`

Converts stories to MP4 videos using Playwright + FFmpeg (see Architecture section below)

## Architecture

### Phase 1: WebM Export (`export-stories-webm.ts`)

Captures each story (cover + frames) as WebM video files using Playwright's native video recording API.

**Key Steps:**
1. Launch headless Chromium browser with video recording enabled
2. Navigate to HTML page with story rendered (via URL parameters)
3. Record for 15 seconds at 1080×1920 @ 30fps
4. Close browser and wait for Playwright to finalize video file
5. Move WebM file from temp directory to exports directory

### Phase 2: MP4 Conversion (`convert-webm-to-mp4.ts`)

Batch converts all WebM files to MP4 format using FFmpeg.

**Key Steps:**
1. Recursively find all `.webm` files in `exports/` directory
2. For each WebM file:
   - Convert to MP4 using H.264 codec with FFmpeg
   - Use fast preset, CRF 23, yuv420p pixel format
   - Add faststart flag for web streaming
   - Delete WebM file after successful conversion

## Critical Implementation Details

### The Busy-Wait Pattern

**Problem:** After closing the browser, Playwright writes the video file **asynchronously**. The file is not immediately available when `browser.close()` resolves.

**Wrong Solution (causes hanging):**
```typescript
await browser.close();
await new Promise(resolve => setTimeout(resolve, 2000)); // ❌ HANGS on 2nd iteration
```

**Why setTimeout Hangs:**
- Bun + Playwright interaction bug
- On the **second and subsequent** browser close operations, Playwright leaves internal state that blocks Bun's event loop
- `setTimeout` callbacks never fire because the event loop can't process timers
- This manifests as an infinite hang

**Attempted Solution (still hangs):**
```typescript
await Bun.sleep(2000); // ❌ Still hangs on 2nd iteration
```

**Why Bun.sleep Also Hangs:**
While `Bun.sleep()` is a native API that bypasses JavaScript timers, it still depends on the async runtime being healthy. Playwright's state pollution affects even native sleep operations.

**Correct Solution (synchronous busy-wait):**
```typescript
// Synchronous busy-wait for video file (Playwright writes asynchronously)
// We can't use setTimeout or Bun.sleep due to Bun+Playwright event loop issues
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
```

**Why This Works:**
- **No async operations** - Pure synchronous CPU spinning
- **Not affected by event loop state** - Doesn't yield control
- **Fast enough** - Video files typically appear within 100-500ms
- **Has timeout** - Won't hang forever (10 second max)
- **CPU intensive but brief** - Only runs for <1 second per video

### File Structure

```
exports/
├── story-id/
│   ├── cover.webm → cover.mp4
│   ├── frame-1.webm → frame-1.mp4
│   ├── frame-2.webm → frame-2.mp4
│   └── ...
└── another-story/
    └── ...
```

### Temp Directory Strategy

Each video export uses a **unique timestamped temp directory**:
```typescript
const tempDir = join(process.cwd(), `exports-temp-${Date.now()}`);
```

This prevents conflicts when sequential exports run and ensures cleanup is isolated.

## FFmpeg Conversion Settings

```bash
ffmpeg -i input.webm \
  -c:v libx264        # H.264 codec (universally compatible)
  -preset fast        # Fast encoding (medium quality/speed tradeoff)
  -crf 23            # Constant Rate Factor (lower = higher quality)
  -pix_fmt yuv420p   # Pixel format (required for Instagram)
  -movflags +faststart # Enable streaming (metadata at start of file)
  -an                # No audio track
  -y                 # Overwrite output file
  output.mp4
```

**Why these settings:**
- **libx264:** Instagram requires H.264
- **fast preset:** Good balance of speed and quality for 15s videos
- **CRF 23:** Visually lossless quality at reasonable file sizes (~140KB per 15s)
- **yuv420p:** Required for Instagram compatibility
- **faststart:** Allows video to start playing before fully downloaded
- **-an:** No audio needed for Instagram Stories

## Usage

### Full Export (WebM + MP4)
```bash
bun run export:stories
```
This runs both phases sequentially.

### Individual Phases
```bash
# Phase 1: Export to WebM
bun run export:webm

# Phase 2: Convert to MP4
bun run convert:mp4
```

### Testing
```bash
# Test with single story
bun run test:export
```

## Performance

- **Recording:** ~16 seconds per video (15s recording + 1s setup/teardown)
- **Conversion:** ~0.1 seconds per video
- **Total for 7 stories × 5 frames:** ~9 minutes for recording, ~3 seconds for conversion

## Error Handling

### Video Not Created
If the busy-wait loop times out (10 seconds) without finding a video file:
```typescript
if (!webmFile) {
  throw new Error('Video file was not created');
}
```

**Common causes:**
- Playwright failed to render the page
- Browser crashed during recording
- Disk write errors

### FFmpeg Conversion Failed
If FFmpeg exits with non-zero status:
```typescript
if (result.status !== 0) {
  throw new Error(`FFmpeg conversion failed: ${result.stderr?.toString()}`);
}
```

**Common causes:**
- FFmpeg not installed (`brew install ffmpeg`)
- Corrupted WebM file
- Disk space issues

## Why Two-Phase Design?

**Alternative considered:** Convert WebM → MP4 inline during export.

**Why it doesn't work:**
The same Bun+Playwright event loop issue that breaks `setTimeout` also affects sequential browser operations. After the first video export succeeds, the second browser instance hangs indefinitely.

**Two-phase approach:**
1. **Export all WebM files first** (works because we use synchronous busy-wait)
2. **Convert all WebM → MP4 in batch** (no Playwright involved, so no event loop issues)

This separation:
- ✅ Avoids event loop hang issues
- ✅ Makes FFmpeg conversion more efficient (batch processing)
- ✅ Allows keeping WebM files if desired
- ✅ Each phase can be run independently for debugging

## Known Issues

### Bun + Playwright Event Loop Pollution

**Issue:** After closing a Playwright browser instance, subsequent async operations (`setTimeout`, `Bun.sleep`) may hang indefinitely.

**Root cause:** Playwright leaves internal handles or state that prevents Bun's event loop from processing timers.

**Workaround:** Use synchronous busy-wait instead of async sleep operations.

**Status:** This appears to be a Bun runtime bug. May be fixed in future Bun versions.

### CPU Spinning During Busy-Wait

**Issue:** The synchronous busy-wait loop uses 100% CPU for ~1 second per video.

**Impact:** Minimal - only runs briefly and exports are batch operations.

**Alternative considered:** File system watching (inotify/FSEvents) - adds complexity for minimal benefit.

## Future Improvements

1. **Use Playwright's video.path() API** - Currently broken (Promise never resolves), but may be fixed in future versions
2. **Switch to Node.js runtime** - Doesn't have the same event loop issues with Playwright
3. **Add progress bar** - Show which video is being processed
4. **Parallel conversion** - Run multiple FFmpeg processes simultaneously
5. **Optimize encoding** - Experiment with different CRF/preset values for smaller files
