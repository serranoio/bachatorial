import React from 'react';
import { createRoot } from 'react-dom/client';
import { storyData } from '../theme/stories/index';
import { ExportStoryView } from '../theme/ExportStoryView';

/**
 * Render story using ExportStoryView component
 */
function renderStoryContent() {
  const params = new URLSearchParams(window.location.search);
  const storyId = params.get('story') || 'dance-videos';
  const frameIndex = params.get('frame') ? parseInt(params.get('frame')) : 0;
  const isCover = params.get('cover') === 'true';

  const story = storyData.find(s => s.id === storyId);

  if (!story) {
    console.error(`Story not found: ${storyId}`);
    return;
  }

  const rootEl = document.getElementById('root');
  if (!rootEl) {
    console.error('Root element not found!');
    return;
  }

  // Render using ExportStoryView component
  const root = createRoot(rootEl);
  root.render(
    <ExportStoryView
      story={story}
      frameIndex={frameIndex}
      showCover={isCover}
    />
  );

  // Mark as rendered for Playwright detection
  setTimeout(() => {
    document.body.setAttribute('data-react-rendered', 'true');
  }, 100);
}

// Auto-render when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderStoryContent);
} else {
  renderStoryContent();
}
