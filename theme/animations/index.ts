/**
 * Animation components index
 * Maps story IDs to their respective animated background components
 */

import { FluidRibbonsBackground } from './FluidRibbonsBackground';
import { ParticleConstellationBackground } from './ParticleConstellationBackground';
import { BokehLightBackground } from './BokehLightBackground';
import { GeometricDanceBackground } from './GeometricDanceBackground';
import { HeartbeatPulseBackground } from './HeartbeatPulseBackground';
import { OrganicGrowthBackground } from './OrganicGrowthBackground';
import { FlowingSilkBackground } from './FlowingSilkBackground';
import { FractalExpansionBackground } from './FractalExpansionBackground';

export {
  FluidRibbonsBackground,
  ParticleConstellationBackground,
  BokehLightBackground,
  GeometricDanceBackground,
  HeartbeatPulseBackground,
  OrganicGrowthBackground,
  FlowingSilkBackground,
  FractalExpansionBackground,
};

export type { AnimatedBackgroundProps, AccentColor } from './shared/types';

/**
 * Map story IDs to their background components
 */
export const STORY_BACKGROUNDS = {
  'dance-videos': FluidRibbonsBackground,
  'welcome': ParticleConstellationBackground,
  'about-me': BokehLightBackground,
  'excellence': GeometricDanceBackground,
  'reps': HeartbeatPulseBackground,
  'teaching-philosophy': OrganicGrowthBackground,
  'life-is-a-dance': FlowingSilkBackground,
  'my-why': FractalExpansionBackground,
} as const;

export type StoryId = keyof typeof STORY_BACKGROUNDS;
