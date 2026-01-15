import { AccentColor, ColorPalette } from './types';

/**
 * Get color palette with opacity variants for a given accent color
 */
export const getColorPalette = (accent: AccentColor): ColorPalette => {
  switch (accent) {
    case 'coral':
      return {
        primary: 'rgba(255, 155, 127, 0.38)',
        primary30: 'rgba(255, 155, 127, 0.23)',
        primary50: 'rgba(255, 155, 127, 0.13)',
        secondary: 'rgba(232, 212, 168, 0.35)',
        secondary30: 'rgba(232, 212, 168, 0.19)',
        secondary50: 'rgba(232, 212, 168, 0.1)',
        tertiary: 'rgba(212, 165, 116, 0.31)',
        tertiary30: 'rgba(212, 165, 116, 0.18)',
        tertiary50: 'rgba(212, 165, 116, 0.08)',
        small1: 'rgba(255, 180, 150, 0.29)',
        small1_40: 'rgba(255, 180, 150, 0.16)',
        small2: 'rgba(220, 190, 140, 0.25)',
        small2_40: 'rgba(220, 190, 140, 0.14)',
      };
    case 'gold':
      return {
        primary: 'rgba(232, 212, 168, 0.38)',
        primary30: 'rgba(232, 212, 168, 0.23)',
        primary50: 'rgba(232, 212, 168, 0.13)',
        secondary: 'rgba(255, 228, 184, 0.35)',
        secondary30: 'rgba(255, 228, 184, 0.19)',
        secondary50: 'rgba(255, 228, 184, 0.1)',
        tertiary: 'rgba(193, 154, 107, 0.31)',
        tertiary30: 'rgba(193, 154, 107, 0.18)',
        tertiary50: 'rgba(193, 154, 107, 0.08)',
        small1: 'rgba(212, 165, 116, 0.29)',
        small1_40: 'rgba(212, 165, 116, 0.16)',
        small2: 'rgba(197, 168, 122, 0.25)',
        small2_40: 'rgba(197, 168, 122, 0.14)',
      };
    case 'peach':
      return {
        primary: 'rgba(255, 180, 150, 0.38)',
        primary30: 'rgba(255, 180, 150, 0.23)',
        primary50: 'rgba(255, 180, 150, 0.13)',
        secondary: 'rgba(255, 155, 127, 0.35)',
        secondary30: 'rgba(255, 155, 127, 0.19)',
        secondary50: 'rgba(255, 155, 127, 0.1)',
        tertiary: 'rgba(232, 212, 168, 0.31)',
        tertiary30: 'rgba(232, 212, 168, 0.18)',
        tertiary50: 'rgba(232, 212, 168, 0.08)',
        small1: 'rgba(220, 190, 140, 0.29)',
        small1_40: 'rgba(220, 190, 140, 0.16)',
        small2: 'rgba(212, 165, 116, 0.25)',
        small2_40: 'rgba(212, 165, 116, 0.14)',
      };
    case 'bronze':
      return {
        primary: 'rgba(212, 165, 116, 0.38)',
        primary30: 'rgba(212, 165, 116, 0.23)',
        primary50: 'rgba(212, 165, 116, 0.13)',
        secondary: 'rgba(193, 154, 107, 0.35)',
        secondary30: 'rgba(193, 154, 107, 0.19)',
        secondary50: 'rgba(193, 154, 107, 0.1)',
        tertiary: 'rgba(232, 212, 168, 0.31)',
        tertiary30: 'rgba(232, 212, 168, 0.18)',
        tertiary50: 'rgba(232, 212, 168, 0.08)',
        small1: 'rgba(197, 168, 122, 0.29)',
        small1_40: 'rgba(197, 168, 122, 0.16)',
        small2: 'rgba(220, 190, 140, 0.25)',
        small2_40: 'rgba(220, 190, 140, 0.14)',
      };
    case 'gold-peachy':
      return {
        primary: 'rgba(220, 190, 140, 0.38)',
        primary30: 'rgba(220, 190, 140, 0.23)',
        primary50: 'rgba(220, 190, 140, 0.13)',
        secondary: 'rgba(232, 212, 168, 0.35)',
        secondary30: 'rgba(232, 212, 168, 0.19)',
        secondary50: 'rgba(232, 212, 168, 0.1)',
        tertiary: 'rgba(255, 180, 150, 0.31)',
        tertiary30: 'rgba(255, 180, 150, 0.18)',
        tertiary50: 'rgba(255, 180, 150, 0.08)',
        small1: 'rgba(212, 165, 116, 0.29)',
        small1_40: 'rgba(212, 165, 116, 0.16)',
        small2: 'rgba(197, 168, 122, 0.25)',
        small2_40: 'rgba(197, 168, 122, 0.14)',
      };
    case 'purple':
      return {
        primary: 'rgba(186, 85, 211, 0.38)',
        primary30: 'rgba(186, 85, 211, 0.23)',
        primary50: 'rgba(186, 85, 211, 0.13)',
        secondary: 'rgba(218, 112, 214, 0.35)',
        secondary30: 'rgba(218, 112, 214, 0.19)',
        secondary50: 'rgba(218, 112, 214, 0.1)',
        tertiary: 'rgba(147, 112, 219, 0.31)',
        tertiary30: 'rgba(147, 112, 219, 0.18)',
        tertiary50: 'rgba(147, 112, 219, 0.08)',
        small1: 'rgba(200, 162, 200, 0.29)',
        small1_40: 'rgba(200, 162, 200, 0.16)',
        small2: 'rgba(176, 132, 200, 0.25)',
        small2_40: 'rgba(176, 132, 200, 0.14)',
      };
  }
};

/**
 * Generate unique CSS class names to avoid collisions
 */
export const generateAnimationId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Base background gradient shared across all animations
 */
export const baseGradient = 'linear-gradient(135deg, #151515 0%, #1A1A1A 25%, #181818 50%, #1A1A1A 75%, #151515 100%)';
