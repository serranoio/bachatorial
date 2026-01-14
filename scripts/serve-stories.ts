#!/usr/bin/env bun

/**
 * Local development server for previewing stories
 *
 * Opens story-viewer.html in your default browser
 * Serves the current directory so all HTML files and assets are accessible
 */

const PORT = 3030;

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;

    // Default to story-viewer.html for root path
    if (filePath === '/') {
      filePath = '/story-viewer.html';
    }

    // Remove leading slash for file system path
    const fsPath = filePath.slice(1);

    try {
      const file = Bun.file(fsPath);
      return new Response(file);
    } catch (error) {
      return new Response('Not Found', { status: 404 });
    }
  },
});

console.log('🎬 Story Preview Server Started');
console.log(`📖 Story Viewer: http://localhost:${PORT}/story-viewer.html`);
console.log(`🎨 Export View: http://localhost:${PORT}/export-real.html?story=welcome&frame=0`);
console.log('\n💡 Press Ctrl+C to stop\n');

// Auto-open browser
const { spawn } = require('child_process');
const openCommand = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
spawn(openCommand, [`http://localhost:${PORT}/story-viewer.html`], { stdio: 'ignore', detached: true }).unref();