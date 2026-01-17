#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Build script to create export-real.html with inlined React + story bundle
 *
 * This script:
 * 1. Bundles theme/stories/index.ts with React/ReactDOM
 * 2. Inlines the bundle into export-real.html
 * 3. Creates a self-contained HTML file for Playwright export
 */

async function buildExportHTML() {
  console.log('🔨 Building export bundle...');

  // First, load and display story metadata for debugging
  const { storyData } = await import('../theme/stories/index');
  console.log('\n📊 Story IDs and Frame Counts:');
  console.log('═'.repeat(50));
  storyData.forEach((story: any) => {
    const frameCount = story.frames?.length || 0;
    console.log(`  ${story.id.padEnd(30)} → ${frameCount} frame${frameCount !== 1 ? 's' : ''}`);
  });
  console.log('═'.repeat(50));
  console.log(`  Total stories: ${storyData.length}\n`);

  // Bundle the stories with React
  const result = await Bun.build({
    entrypoints: ['./scripts/export-entry.tsx'],
    format: 'iife',
    minify: false,
    target: 'browser',
  });

  if (!result.success) {
    console.error('❌ Build failed:', result.logs);
    process.exit(1);
  }

  const bundle = await result.outputs[0].text();
  console.log(`  ✓ Bundle created (${(bundle.length / 1024).toFixed(1)} KB)`);

  // Read the base HTML template
  const templatePath = join(process.cwd(), 'export-real-template.html');
  const template = readFileSync(templatePath, 'utf-8');

  // Inject the bundle
  const finalHTML = template.replace(
    '<!-- BUNDLE_PLACEHOLDER -->',
    `<script>${bundle}</script>`
  );

  // Write the final export HTML
  const outputPath = join(process.cwd(), 'export-real.html');
  writeFileSync(outputPath, finalHTML, 'utf-8');

  console.log(`  ✓ Export HTML created: export-real.html`);
  console.log(`  📦 Total size: ${(finalHTML.length / 1024).toFixed(1)} KB`);
}

buildExportHTML().catch(console.error);