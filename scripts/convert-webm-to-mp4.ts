#!/usr/bin/env bun

import { readdirSync, statSync, rmSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

function convertWebMToMP4(webmPath: string, mp4Path: string): void {
  console.log(`🎞️  Converting: ${webmPath.split('/').pop()}`);

  const result = spawnSync('ffmpeg', [
    '-i', webmPath,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '23',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    '-y',
    mp4Path
  ]);

  if (result.status !== 0) {
    console.error('FFmpeg stderr:', result.stderr?.toString());
    throw new Error(`FFmpeg conversion failed with status ${result.status}`);
  }

  const stats = statSync(mp4Path);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`  ✓ ${sizeMB} MB`);

  // Remove the WebM file after successful conversion
  rmSync(webmPath, { force: true });
}

function findWebMFiles(dir: string, files: string[] = []): string[] {
  const items = readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      findWebMFiles(fullPath, files);
    } else if (item.name.endsWith('.webm')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const exportsDir = join(process.cwd(), 'exports');

  console.log('🎬 Converting WebM files to MP4\n');

  const webmFiles = findWebMFiles(exportsDir);

  if (webmFiles.length === 0) {
    console.log('No WebM files found in exports/');
    return;
  }

  console.log(`Found ${webmFiles.length} WebM files\n`);

  for (const webmPath of webmFiles) {
    const mp4Path = webmPath.replace('.webm', '.mp4');
    convertWebMToMP4(webmPath, mp4Path);
  }

  console.log('\n✅ All files converted!');
}

main();
