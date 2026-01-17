/**
 * Story Router Utilities
 * Manages hash-based URL routing for stories and frames
 */

export interface StoryRoute {
  storyId: string;
  frameIndex?: number;
}

/**
 * Parses the current hash into story route information
 * Expected formats:
 * - #/stories/{storyId}
 * - #/stories/{storyId}/frame/{frameIndex}
 */
export function parseStoryHash(hash: string = window.location.hash): StoryRoute | null {
  // Remove leading # if present
  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;

  // Match: /stories/{storyId} or /stories/{storyId}/frame/{frameIndex}
  const storyOnlyMatch = cleanHash.match(/^\/stories\/([^/]+)$/);
  const storyFrameMatch = cleanHash.match(/^\/stories\/([^/]+)\/frame\/(\d+)$/);

  if (storyFrameMatch) {
    return {
      storyId: storyFrameMatch[1],
      frameIndex: parseInt(storyFrameMatch[2], 10),
    };
  }

  if (storyOnlyMatch) {
    return {
      storyId: storyOnlyMatch[1],
      frameIndex: 0, // Default to first frame
    };
  }

  return null;
}

/**
 * Serializes story route information into a hash string
 */
export function serializeStoryHash(storyId: string, frameIndex?: number): string {
  if (frameIndex !== undefined && frameIndex !== 0) {
    return `#/stories/${storyId}/frame/${frameIndex}`;
  }
  return `#/stories/${storyId}`;
}

/**
 * Updates the browser URL hash without triggering a hashchange event
 * Uses replaceState to avoid adding to browser history for every frame change
 */
export function updateStoryHash(storyId: string, frameIndex: number, replace: boolean = true): void {
  const newHash = serializeStoryHash(storyId, frameIndex);

  if (replace) {
    // Replace current history entry (don't create new history for every frame)
    window.history.replaceState(null, '', newHash);
  } else {
    // Push new history entry
    window.location.hash = newHash;
  }
}

/**
 * Clears the story hash, returning to home
 */
export function clearStoryHash(): void {
  window.history.replaceState(null, '', window.location.pathname);
}

/**
 * Checks if the current URL has a story hash
 */
export function hasStoryHash(): boolean {
  return parseStoryHash() !== null;
}
