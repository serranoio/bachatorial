# Story Export Animation Quality Diagnosis

**Date:** 2026-01-14
**Issue:** Low-quality animations in exported story videos with specific gradient and rendering problems

---

## Issues Identified

### 1. **Black Frame at Video Start (Frame 0)**
**Severity:** High
**Impact:** Every exported video starts with a completely black frame

#### Root Cause Analysis:
- **Playwright recording starts immediately** when `recordVideo` context is created
- **React rendering is asynchronous** - the page navigates, loads, mounts React, and only then renders content
- **1000ms delay before content recording** ([export-stories-mp4.mjs:47](scripts/export-stories-mp4.mjs#L47)) is insufficient
- The video recording captures the **black background during page load** before React hydration completes

#### Evidence:
- Frame 0 (0.000s): Completely black (captured from exports)
- Frame ~6 (0.200s): Still mostly black with minimal particles appearing
- Frame ~30 (1.000s): Particles visible but gradients still very dark
- Frame ~90 (3.000s): Particles more visible but still no gradient glow/bloom effects

#### Technical Flow:
```
1. Browser context created with recordVideo → Recording starts immediately
2. page.goto() → Black screen while loading
3. React bundle loads and parses (hundreds of ms)
4. React renders to DOM (additional ms)
5. CSS animations initialize (more ms)
6. Gradient blur effects render (even more ms)
7. setTimeout(1000) expires ← We wait here, but it's too early
8. Recording continues for 15 seconds from step 1 (includes black frames!)
```

---

### 2. **Gradients Not Fully Rendered / Not Combining**
**Severity:** Critical
**Impact:** The beautiful gradient glow effects are barely visible, appearing as dim particles on near-black backgrounds

#### Root Cause Analysis:

##### A. **CSS Filter Blur Performance Issues**
The gradient glow effects rely heavily on `filter: blur()` which is:
- **GPU-intensive** and takes time to render in headless Chrome
- **Not composited properly** during video recording startup
- **Delayed in paint cycles** when animations are starting

Example from [ParticleConstellationBackground.tsx](theme/animations/ParticleConstellationBackground.tsx):
```tsx
filter: `blur(${scale(80)}px)`,  // 80px blur is expensive!
background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 50%, transparent 70%)`
```

##### B. **Radial Gradient Rendering Lag**
- Each background has **multiple radial gradients** (5+ overlapping glows)
- Each uses **multiple color stops** with transparency
- Browser must **composite all layers** with blur before rendering
- This compositing happens **after** the 1000ms wait expires

##### C. **Animation State Not Stabilized**
- CSS animations start at `0%` keyframe when DOM mounts
- Glows at 0% keyframe often have **lower opacity** (e.g., `opacity: 0.3`)
- The recording captures **before animations reach visible states**

Example from [ParticleConstellationBackground.tsx:51-67](theme/animations/ParticleConstellationBackground.tsx#L51-L67):
```css
@keyframes particleOrbit1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;  /* ← Very dim at start! */
  }
  25% {
    opacity: 0.8;  /* ← Much brighter later */
  }
}
```

##### D. **Missing CSS Compositing Hints**
The animated elements don't have performance hints like:
- `will-change: transform, opacity, filter`
- `transform: translateZ(0)` for GPU layer promotion
- `backface-visibility: hidden`

These hints would force GPU acceleration and better layer management.

##### E. **Linear Gradient Background Not Rendering**
The base gradient background is defined but may not be fully painted:

[ParticleConstellationBackground.tsx:125](theme/animations/ParticleConstellationBackground.tsx#L125):
```tsx
background: ${baseGradient};
// baseGradient = "linear-gradient(135deg, #151515 0%, #1A1A1A 25%, #181818 50%, #1A1A1A 75%, #151515 100%)"
```

This gradient is **very subtle** (dark gray tones) and may not be visible due to:
- Video encoding compression (dark colors compress to black)
- The `animation: gradientShift 15s` not being captured in its visual state

---

### 3. **WebM to MP4 Conversion Quality Loss**
**Severity:** Medium
**Impact:** Additional quality degradation during format conversion

#### Current FFmpeg Settings ([export-stories-mp4.mjs:68-78](scripts/export-stories-mp4.mjs#L68-L78)):
```bash
ffmpeg -i input.webm \
  -c:v libx264 \
  -preset fast \       # ← Fast preset sacrifices quality
  -crf 23 \           # ← CRF 23 is lossy (0 = lossless, 51 = worst)
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  -y output.mp4
```

#### Issues:
- **CRF 23** causes visible compression artifacts in dark gradients
- **Fast preset** skips advanced encoding optimizations
- **No bitrate control** means dark scenes get under-allocated bits
- **yuv420p chroma subsampling** reduces color detail (4:2:0 instead of 4:4:4)

---

## System Architecture Context

### Export Pipeline:
```
1. [build-export-html.ts] → Bundles React + stories → export-real.html (1.1MB)
2. [export-stories-mp4.mjs] → Playwright opens export-real.html with recordVideo
3. Playwright records WebM video for 15s (includes black frames at start)
4. FFmpeg converts WebM → MP4 with compression
5. Final MP4 saved to exports/{story-id}/
```

### Key Files:
- [scripts/export-stories-mp4.mjs](scripts/export-stories-mp4.mjs) - Main export script
- [scripts/export-entry.tsx](scripts/export-entry.tsx) - React entry point for export HTML
- [theme/ExportStoryView.tsx](theme/ExportStoryView.tsx) - Wrapper component with 500ms ready delay
- [theme/animations/ParticleConstellationBackground.tsx](theme/animations/ParticleConstellationBackground.tsx) - Example background with gradient issues
- [theme/animations/shared/animationUtils.ts](theme/animations/shared/animationUtils.ts) - Shared gradient definitions

---

## Proposed Solutions

### Fix 1: Eliminate Black Frame at Start
**Priority:** P0 (Critical)

#### Option A: Trim First N Frames with FFmpeg (Quick Fix)
Add frame trimming to the FFmpeg conversion:
```bash
ffmpeg -i input.webm \
  -vf "select='gte(n,10)',setpts=N/FRAME_RATE/TB" \  # Skip first 10 frames
  -c:v libx264 ...
```

**Pros:** Immediate fix, no code changes
**Cons:** Loses actual content if animations start early

#### Option B: Wait for Composite Signal (Proper Fix)
1. Add a `data-animations-ready` attribute set by animations after first paint
2. Wait for this signal before starting actual recording
3. Use Playwright's `page.waitForFunction()` to detect readiness

In [ExportStoryView.tsx](theme/ExportStoryView.tsx):
```tsx
useEffect(() => {
  // Wait for multiple animation frames to ensure GPU compositing is done
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.setAttribute('data-animations-ready', 'true');
      });
    });
  });
}, []);
```

In [export-stories-mp4.mjs](scripts/export-stories-mp4.mjs):
```javascript
await page.goto(url, { waitUntil: 'load' });
await page.evaluate(() => { /* reset transform */ });

// NEW: Wait for animations to be truly ready
await page.waitForFunction(() =>
  document.body.getAttribute('data-animations-ready') === 'true',
  { timeout: 5000 }
);

// Additional compositor stabilization time
await page.waitForTimeout(500);

// NOW start recording...
```

**Pros:** Clean, reliable, captures actual ready state
**Cons:** Requires code changes in multiple files

---

### Fix 2: Improve Gradient Rendering Quality
**Priority:** P0 (Critical)

#### Solution A: Add CSS Compositing Hints
Update all animation components to include performance directives:

```tsx
.particle-constellation-background {
  /* Existing styles */
  will-change: transform, filter;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.central-glow {
  /* Existing styles */
  will-change: filter, opacity;
  transform: translateZ(0);
}

.particle {
  /* Existing styles */
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

#### Solution B: Increase Stabilization Delay
Change the current 1000ms delay to 3000ms to allow GPU compositing:

[export-stories-mp4.mjs:47-48](scripts/export-stories-mp4.mjs#L47-L48):
```javascript
await page.waitForTimeout(3000);  // Changed from 1000
```

#### Solution C: Force Paint Cycle Before Recording
Add explicit paint forcing:

```javascript
await page.goto(url, { waitUntil: 'networkidle' });  // Changed from 'load'
await page.evaluate(() => {
  // Force reflow and repaint
  document.body.offsetHeight;

  // Force GPU layer creation
  const elements = document.querySelectorAll('[style*="blur"]');
  elements.forEach(el => {
    el.style.willChange = 'filter, transform';
    el.offsetHeight;  // Force layout
  });
});
await page.waitForTimeout(2000);
```

#### Solution D: Increase Animation Initial Opacity
Update keyframe `0%` states to have higher opacity:

[ParticleConstellationBackground.tsx:51-54](theme/animations/ParticleConstellationBackground.tsx#L51-L54):
```css
@keyframes particleOrbit1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.6;  /* Changed from 0.3 */
  }
}
```

Apply to all animation components.

---

### Fix 3: Improve Video Encoding Quality
**Priority:** P1 (High)

Update FFmpeg parameters for better gradient preservation:

[export-stories-mp4.mjs:68-78](scripts/export-stories-mp4.mjs#L68-L78):
```javascript
const result = spawnSync('ffmpeg', [
  '-i', webmTempPath,
  '-c:v', 'libx264',
  '-preset', 'slow',        // Changed from 'fast' - better quality
  '-crf', '18',             // Changed from 23 - higher quality (lower number)
  '-pix_fmt', 'yuv420p',
  '-profile:v', 'high',     // NEW: Use high profile
  '-level', '4.2',          // NEW: Specify level
  '-movflags', '+faststart',
  '-an',
  '-y',
  mp4OutputPath
], { stdio: 'pipe' });
```

**Quality improvements:**
- `preset slow`: Better motion estimation and compression
- `crf 18`: Near-transparent quality (23 is default, 18 is high quality)
- `profile:v high`: Enables advanced H.264 features
- `level 4.2`: Supports high bitrates for 1080p+

**Trade-offs:**
- Slower encoding (may 2-3x encoding time)
- Larger file sizes (~30-50% larger)

---

## Recommended Implementation Order

1. **Phase 1 (Immediate):** Fix black frame issue
   - Implement Fix 1 Option B (wait for composite signal)
   - Increase timeout from 1000ms to 2000ms as safety buffer

2. **Phase 2 (Same session):** Improve gradient rendering
   - Add CSS `will-change` hints (Fix 2 Solution A)
   - Force paint cycle before recording (Fix 2 Solution C)
   - Increase initial animation opacity (Fix 2 Solution D)

3. **Phase 3 (Quality pass):** Improve encoding
   - Update FFmpeg parameters (Fix 3)
   - Test file sizes and visual quality

4. **Phase 4 (Validation):**
   - Run full export on all stories
   - Verify no black frames
   - Verify gradients are vibrant and fully blended
   - Check file sizes are acceptable

---

## Test Plan

After implementing fixes:

1. **Visual Inspection:**
   - Extract frame 0 from each video → Should show gradient, not black
   - Extract frame at 1s → Should show full gradient glow effects
   - Play video → Should see smooth animations from frame 0

2. **Automated Checks:**
   ```bash
   # Check if frame 0 is black (pixel analysis)
   ffmpeg -i video.mp4 -vf "select=eq(n\,0)" -vframes 1 frame0.png
   # Analyze pixel brightness (should be > 5% if not black)
   ```

3. **Gradient Quality Check:**
   - Verify multiple gradient glows are visible and overlapping
   - Verify blur effects are rendered (not sharp edges)
   - Verify colors match the accent color palette

---

## Additional Notes

- **Video recording resolution:** 1080x1920 (Instagram Story dimensions)
- **Frame rate:** 30 FPS
- **Duration:** 15 seconds per video
- **Current file sizes:** ~2-3 MB per 15s video (will increase with better quality)
- **Total export time:** ~2-3 minutes for all stories (will increase with slower encoding)

---

## Files Requiring Changes

### Must Change:
1. [scripts/export-stories-mp4.mjs](scripts/export-stories-mp4.mjs) - Recording timing and FFmpeg params
2. [theme/ExportStoryView.tsx](theme/ExportStoryView.tsx) - Ready signal implementation
3. [theme/animations/ParticleConstellationBackground.tsx](theme/animations/ParticleConstellationBackground.tsx) - CSS compositing hints
4. [theme/animations/FluidRibbonsBackground.tsx](theme/animations/FluidRibbonsBackground.tsx) - CSS compositing hints
5. [theme/animations/BokehLightBackground.tsx](theme/animations/BokehLightBackground.tsx) - CSS compositing hints
6. [theme/animations/OrganicGrowthBackground.tsx](theme/animations/OrganicGrowthBackground.tsx) - CSS compositing hints
7. [theme/animations/HeartbeatPulseBackground.tsx](theme/animations/HeartbeatPulseBackground.tsx) - CSS compositing hints
8. [theme/animations/FlowingSilkBackground.tsx](theme/animations/FlowingSilkBackground.tsx) - CSS compositing hints
9. [theme/animations/FractalExpansionBackground.tsx](theme/animations/FractalExpansionBackground.tsx) - CSS compositing hints
10. [theme/animations/GeometricDanceBackground.tsx](theme/animations/GeometricDanceBackground.tsx) - CSS compositing hints

### Consider Changing:
1. [theme/animations/shared/animationUtils.ts](theme/animations/shared/animationUtils.ts) - Shared gradient utilities if needed
2. [export-real-template.html](export-real-template.html) - Add global CSS performance hints

---

## Summary

The animation quality issues stem from **timing problems** (recording starts too early) and **GPU compositing delays** (gradient blur effects take time to render). The fixes focus on:

1. **Waiting longer** for animations to be truly ready
2. **Forcing GPU acceleration** with CSS hints
3. **Improving video encoding quality** to preserve gradients

Expected results after fixes:
- ✅ No black frames at video start
- ✅ Full gradient glow effects visible from frame 0
- ✅ Smooth, high-quality animations throughout
- ✅ Multiple gradients properly blended and composited
