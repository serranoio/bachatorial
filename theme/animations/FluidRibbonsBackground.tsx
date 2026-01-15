import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Fluid Dance Ribbons Background - For Dance Videos story
 * Flowing, silk-like ribbons that elegantly swirl and dance across the card
 * Mimics the fluid movements of bachata dancers
 */
export const FluidRibbonsBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'coral',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  return (
    <div className={`fluid-ribbons-background ${className}`}>
      <style>{`
        @keyframes ribbonFlow1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scaleX(1) scaleY(1);
            opacity: 0.8; /* ENHANCED: was 0.6 */
          }
          25% {
            transform: translate(-10%, -20%) rotate(90deg) scaleX(2.0) scaleY(1.4); /* ENHANCED: larger movement and scale */
            opacity: 1; /* ENHANCED: was 0.8 */
          }
          50% {
            transform: translate(10%, -30%) rotate(180deg) scaleX(1.6) scaleY(2.0); /* ENHANCED: larger movement and scale */
            opacity: 0.9; /* ENHANCED: was 0.7 */
          }
          75% {
            transform: translate(-20%, -15%) rotate(270deg) scaleX(1.5) scaleY(1.8); /* ENHANCED: larger movement and scale */
            opacity: 0.95; /* ENHANCED: was 0.75 */
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scaleX(1) scaleY(1);
            opacity: 0.8; /* ENHANCED: was 0.6 */
          }
        }

        @keyframes ribbonFlow2 {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) scaleX(1) scaleY(1.2);
            opacity: 0.75; /* ENHANCED: was 0.5 */
          }
          30% {
            transform: translate(-30%, 0%) rotate(135deg) scaleX(1.9) scaleY(1.5); /* ENHANCED: larger movement and scale */
            opacity: 0.9; /* ENHANCED: was 0.7 */
          }
          60% {
            transform: translate(-10%, -35%) rotate(225deg) scaleX(1.6) scaleY(2.2); /* ENHANCED: larger movement and scale */
            opacity: 0.85; /* ENHANCED: was 0.6 */
          }
          90% {
            transform: translate(-25%, -10%) rotate(315deg) scaleX(1.8) scaleY(1.6); /* ENHANCED: larger movement and scale */
            opacity: 0.9; /* ENHANCED: was 0.65 */
          }
          100% {
            transform: translate(-50%, -50%) rotate(405deg) scaleX(1) scaleY(1.2);
            opacity: 0.75; /* ENHANCED: was 0.5 */
          }
        }

        @keyframes ribbonFlow3 {
          0% {
            transform: translate(-50%, -50%) rotate(90deg) scaleX(1.1) scaleY(1);
            opacity: 0.8; /* ENHANCED: was 0.55 */
          }
          33% {
            transform: translate(-5%, -25%) rotate(180deg) scaleX(1.5) scaleY(2.1); /* ENHANCED: larger movement and scale */
            opacity: 0.95; /* ENHANCED: was 0.75 */
          }
          66% {
            transform: translate(-35%, -5%) rotate(270deg) scaleX(2.0) scaleY(1.6); /* ENHANCED: larger movement and scale */
            opacity: 0.9; /* ENHANCED: was 0.65 */
          }
          100% {
            transform: translate(-50%, -50%) rotate(450deg) scaleX(1.1) scaleY(1);
            opacity: 0.8; /* ENHANCED: was 0.55 */
          }
        }

        @keyframes ribbonWave {
          0%, 100% {
            transform: translateY(0%) scaleY(1);
          }
          50% {
            transform: translateY(-25%) scaleY(1.4); /* ENHANCED: larger wave movement */
          }
        }

        .fluid-ribbons-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${baseGradient};
          background-size: 400% 400%;
          overflow: hidden;
          /* GPU acceleration */
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .ribbon {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }

        .ribbon-wave {
          animation: ribbonWave 4s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Main flowing ribbon - ENHANCED */}
      <div
        className="ribbon"
        style={{
          width: '120%',
          height: '40%',
          filter: `blur(${scale(35)}px)`, /* ENHANCED: was 80px */
          background: `linear-gradient(90deg, transparent 0%, ${colors.primary} 20%, ${colors.primary30} 50%, ${colors.primary} 80%, transparent 100%)`,
          animation: 'ribbonFlow1 10s ease-in-out infinite alternate', /* ENHANCED: was 20s */
        }}
      />

      {/* Secondary ribbon - ENHANCED */}
      <div
        className="ribbon"
        style={{
          width: '100%',
          height: '35%',
          filter: `blur(${scale(35)}px)`, /* ENHANCED: was 80px */
          background: `linear-gradient(90deg, transparent 0%, ${colors.secondary} 15%, ${colors.secondary30} 50%, ${colors.secondary} 85%, transparent 100%)`,
          animation: 'ribbonFlow2 9s ease-in-out infinite alternate', /* ENHANCED: was 18s */
        }}
      />

      {/* Tertiary ribbon - ENHANCED */}
      <div
        className="ribbon"
        style={{
          width: '110%',
          height: '45%',
          filter: `blur(${scale(35)}px)`, /* ENHANCED: was 80px */
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 25%, ${colors.tertiary30} 50%, ${colors.tertiary} 75%, transparent 100%)`,
          animation: 'ribbonFlow3 11s ease-in-out infinite alternate', /* ENHANCED: was 22s */
        }}
      />

      {/* Accent wave ribbons for depth - ENHANCED */}
      <div
        className="ribbon ribbon-wave"
        style={{
          width: '80%',
          height: '25%',
          top: '30%',
          background: `radial-gradient(ellipse, ${colors.small1} 0%, ${colors.small1_40} 40%, transparent 70%)`,
          animation: 'ribbonFlow1 8s ease-in-out infinite alternate reverse, ribbonWave 2s ease-in-out infinite alternate', /* ENHANCED: was 16s and 4s */
          filter: `blur(${scale(30)}px)`, /* ENHANCED: was 60px */
        }}
      />

      <div
        className="ribbon ribbon-wave"
        style={{
          width: '85%',
          height: '30%',
          top: '60%',
          background: `radial-gradient(ellipse, ${colors.small2} 0%, ${colors.small2_40} 40%, transparent 70%)`,
          animation: 'ribbonFlow2 12s ease-in-out infinite alternate reverse, ribbonWave 2.5s ease-in-out infinite alternate', /* ENHANCED: was 24s and 5s */
          filter: `blur(${scale(30)}px)`, /* ENHANCED: was 70px */
        }}
      />
    </div>
  );
};
