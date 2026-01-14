# Export Stories Solution: Node.js Migration

## Problem Summary

The video export system was experiencing critical hanging issues when using Bun as the runtime. After the first video exported successfully, the script would hang indefinitely on the second video due to a fundamental Bun + Playwright event loop incompatibility.

## Root Cause

**Bun + Playwright Event Loop Corruption:**
- After Playwright's first `browser.close()`, Bun's event loop becomes corrupted
- All async operations (`setTimeout`, `Bun.sleep`) permanently hang on subsequent iterations
- Force-killing Chromium processes broke Playwright's ability to spawn new browser instances
- No workaround existed within Bun's runtime limitations

## Solution: Node.js Migration

Migrated the export system from Bun to Node.js for maximum reliability.

### Implementation

**Created:** `scripts/export-stories-mp4.mjs` (Node.js ESM format)

**Key Changes:**
1. **Single browser instance** - Launch once, reuse contexts for all videos
2. **Proper async/await** - `setTimeout` works reliably in Node.js (no busy-wait needed)
3. **Aggressive cleanup** - Force-kill Chromium/Playwright processes in finally block
4. **Inline story metadata** - Avoid TypeScript import issues

**Deleted:**
- `scripts/export-stories-mp4.ts` (Bun version)
- `scripts/export-stories-webm.ts` (Bun version)
- `scripts/test-single-mp4.ts` (Bun test)
- `scripts/test-one-video.ts` (Bun test)
- `scripts/convert-webm-to-mp4.ts` (Bun converter)

### Architecture

```typescript
// Node.js export flow
1. Launch browser once
2. For each story:
   a. For each frame:
      - Create new context with video recording
      - Navigate to HTML page with story params
      - Record for 15 seconds
      - Close context (not browser)
      - Wait 2 seconds for file (setTimeout works!)
      - Convert WebM → MP4 with FFmpeg
      - Clean up temp files
3. Close browser
4. Force-kill any leftover Chromium processes
```

### Benefits of Node.js

✅ **No event loop corruption** - Playwright widely used with Node.js
✅ **Reliable setTimeout** - Works consistently across all iterations
✅ **Better debugging** - More mature tooling and error messages
✅ **Proven stability** - Industry-standard Playwright + Node.js combination
✅ **Simpler code** - No need for synchronous busy-wait hacks

### Updated Commands

```bash
# Full export (all stories)
npm run export:stories

# Clean and re-export
npm run retest
```

### Performance

- **Recording:** ~16 seconds per video (15s recording + 1s overhead)
- **Conversion:** ~0.1 seconds per video (FFmpeg)
- **Total for 7 stories × 5 frames:** ~9 minutes

### File Output

```
exports/
├── welcome/
│   ├── cover.mp4
│   └── frame-1.mp4
├── about-me/
│   ├── cover.mp4
│   ├── frame-1.mp4
│   └── frame-2.mp4
└── ...
```

## Testing Results

✅ **First video:** Exported successfully (0.14 MB)
✅ **Second video:** No hanging - continues smoothly
✅ **Sequential exports:** All videos process without interruption

## Why This Works

**Node.js + Playwright:**
- Mature, well-tested integration
- No runtime-level async bugs
- Proper event loop handling after browser close
- `setTimeout` callbacks fire reliably

**Single Browser Instance:**
- Avoids repeated launch/close cycles
- Each video gets isolated context (fresh state)
- Only one cleanup operation at the end

**Aggressive Process Cleanup:**
- Ensures no zombie Chromium processes
- Clean system state after exports complete
- Prevents resource leaks

## Lessons Learned

1. **Runtime matters** - Bun's bleeding-edge optimizations can introduce subtle bugs with complex libraries like Playwright
2. **Event loop health is critical** - Once corrupted, no amount of workarounds will fix async operations
3. **Stick with proven combinations** - Node.js + Playwright is battle-tested
4. **Reliability > Speed** - A slower but reliable export is better than a fast one that hangs

## Future Considerations

- Bun may fix these event loop issues in future versions
- Could add parallel FFmpeg conversion for faster processing
- Could implement progress bar for better user feedback
- Consider batch size limits for very large story collections
