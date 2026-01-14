#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

/**
 * Add 'alternate' to infinite animations (except linear/rotate ones)
 */
async function fixAnimations() {
  const animationFiles = await glob('theme/animations/*.tsx');

  for (const file of animationFiles) {
    let content = readFileSync(file, 'utf-8');
    let changed = false;

    // Pattern: ease-in-out animations should alternate (not linear ones)
    // Match: "infinite" but NOT "infinite alternate" and NOT "infinite reverse"
    const patterns = [
      // Float, pulse, wave, flow, sway, glow, twinkle, ripple, beat animations
      {
        find: /(Float|Pulse|Wave|Flow|Sway|Glow|Twinkle|Ripple|Beat|Unfurl|Grow|Undulate|Shimmer)[^'"`]*\s+ease-in-out[^'"`]*infinite(?!\s+alternate)(?!\s+reverse)/gi,
        replace: (match: string) => match + ' alternate'
      },
      // Generic ease-in-out with infinite (not already alternate/reverse)
      {
        find: /ease-in-out[^'"`]*infinite(?!\s+alternate)(?!\s+reverse)(?!,)/g,
        replace: (match: string) => match + ' alternate'
      }
    ];

    for (const pattern of patterns) {
      const newContent = content.replace(pattern.find, pattern.replace as any);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(file, content, 'utf-8');
      console.log(`✓ Updated: ${file}`);
    } else {
      console.log(`  Skipped: ${file} (no changes needed)`);
    }
  }

  console.log('\n✅ All animation files processed!');
}

fixAnimations();
