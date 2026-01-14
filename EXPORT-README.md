# Instagram Story Export System

## Overview

This system exports your interactive React-based stories to Instagram Stories format (1080x1920 animated GIFs).

## Features

- ✅ Automated batch export for all stories
- ✅ 3-second animated GIFs at 15 FPS
- ✅ 1080x1920 Instagram Story dimensions
- ✅ Organized folder structure
- ✅ Cover images (background only) for each story
- ✅ Individual frame exports

## Usage

```bash
# Export all stories
bun run export:stories
```

## Output Structure

```
exports/
  dance-videos/
    cover.gif          # Animated background (no text)
    frame-1.gif        # Frame 1 with content
    frame-2.gif        # Frame 2 with content
    ...
  welcome/
    cover.gif
    frame-1.gif
    ...
  about-me/
    cover.gif
    frame-1.gif
    ...
```

## Export Configuration

Located in `scripts/export-stories.ts`:

```typescript
const EXPORT_CONFIG = {
  width: 1080,        // Instagram Story width
  height: 1920,       // Instagram Story height
  fps: 15,            // Frames per second
  duration: 3,        // Duration in seconds
  quality: 10,        // GIF quality (1-30, lower = better)
};
```

## File Sizes

Each GIF is approximately **5-7 MB** (within Instagram's 8MB limit).

## Workflow for Uploading to Instagram

1. Run the export: `bun run export:stories`
2. Navigate to `exports/[story-name]/`
3. Upload files in order:
   - `cover.gif` - First post (background animation)
   - `frame-1.gif` - Second post
   - `frame-2.gif` - Third post
   - etc.

## Technical Details

### Technologies Used
- **Playwright**: Headless browser automation
- **modern-gif**: GIF encoding
- **pngjs**: PNG processing

### How It Works

1. Loads all story data from `theme/stories/`
2. For each story:
   - Renders export page with animated background
   - Captures 45 frames over 3 seconds
   - Compiles frames into animated GIF
   - Repeats for cover + each frame
3. Organizes output into story-based folders

### Export Page

The `export-standalone.html` file provides:
- Canvas-based animations
- Story-specific color schemes
- URL parameter support for different views
- Instagram Story dimensions (1080x1920)

## Customization

### Change Animation Duration
Edit `EXPORT_CONFIG.duration` in `scripts/export-stories.ts`

### Change Frame Rate
Edit `EXPORT_CONFIG.fps` (recommended: 10-15 FPS)

### Change Dimensions
Edit `EXPORT_CONFIG.width` and `EXPORT_CONFIG.height`

### Modify Animations
Edit color schemes in `export-standalone.html`

## Troubleshooting

### GIF File Too Large
- Reduce `EXPORT_CONFIG.duration` (e.g., 2 seconds)
- Reduce `EXPORT_CONFIG.fps` (e.g., 10 FPS)
- Increase `EXPORT_CONFIG.quality` number (lower visual quality)

### Export Takes Too Long
- Process runs in background
- Approximately 30-60 seconds per story
- Total time: ~5-10 minutes for all 7 stories

### Animation Looks Different
- Animations are simplified placeholders
- Real story components can be integrated by:
  - Building the site: `bun run build`
  - Using production build for export

## Future Enhancements

- [ ] Integrate real canvas background components
- [ ] Support for video frames (skip GIF conversion)
- [ ] Parallel processing for faster exports
- [ ] Progress bar UI
- [ ] Preview before export
- [ ] Custom text overlays
- [ ] Batch Instagram API upload

## Notes

- Each story must have `id`, `title`, and `frames` array
- Cover GIF shows animated background only (no text)
- Frame GIFs show background + content overlay
- All GIFs loop infinitely
