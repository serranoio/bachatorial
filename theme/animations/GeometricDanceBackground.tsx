import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Geometric Dance Background - For Philosophy story
 * Abstract geometric shapes that float and rotate
 * Represents the structure within improvisation, technique balanced with freedom
 * ENHANCED for bold visibility
 */
export const GeometricDanceBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'bronze',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  return (
    <div
      className={`geometric-dance-background ${className}`}
      style={{
        // @ts-ignore - CSS custom properties - ENHANCED: larger movement
        '--float-y': `${scale(-90)}px`, /* Was -30px */
        '--triangle-left': `${scale(50)}px`,
        '--triangle-right': `${scale(50)}px`,
        '--triangle-bottom': `${scale(86)}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes geometricRotate1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 0.6; /* ENHANCED: was 0.2 */
          }
          25% {
            transform: translate(-20%, -30%) rotate(90deg) scale(2.0); /* ENHANCED: larger movement & scale */
            opacity: 0.9; /* ENHANCED: was 0.4 */
          }
          50% {
            transform: translate(-30%, -10%) rotate(180deg) scale(1.5); /* ENHANCED: larger movement & scale */
            opacity: 0.75; /* ENHANCED: was 0.3 */
          }
          75% {
            transform: translate(-25%, -25%) rotate(270deg) scale(1.8); /* ENHANCED: larger movement & scale */
            opacity: 0.8; /* ENHANCED: was 0.35 */
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
            opacity: 0.6; /* ENHANCED: was 0.2 */
          }
        }

        @keyframes geometricRotate2 {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) scale(1);
            opacity: 0.65; /* ENHANCED: was 0.25 */
          }
          33% {
            transform: translate(-25%, -15%) rotate(165deg) scale(1.9); /* ENHANCED: larger movement & scale */
            opacity: 0.9; /* ENHANCED: was 0.45 */
          }
          66% {
            transform: translate(-15%, -25%) rotate(285deg) scale(1.6); /* ENHANCED: larger movement & scale */
            opacity: 0.75; /* ENHANCED: was 0.3 */
          }
          100% {
            transform: translate(-50%, -50%) rotate(405deg) scale(1);
            opacity: 0.65; /* ENHANCED: was 0.25 */
          }
        }

        @keyframes geometricFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7; /* ENHANCED: was 0.3 */
          }
          50% {
            transform: translateY(var(--float-y)) rotate(180deg);
            opacity: 0.95; /* ENHANCED: was 0.6 */
          }
        }

        @keyframes geometricPulse {
          0%, 100% {
            transform: scale(1.2); /* ENHANCED: was 1 */
            opacity: 0.6; /* ENHANCED: was 0.2 */
          }
          50% {
            transform: scale(1.6); /* ENHANCED: was 1.1 */
            opacity: 0.85; /* ENHANCED: was 0.5 */
          }
        }

        @keyframes lineStretch {
          0%, 100% {
            transform: scaleX(1) rotate(0deg);
            opacity: 0.5; /* ENHANCED: was 0.15 */
          }
          50% {
            transform: scaleX(2.5) rotate(15deg); /* ENHANCED: larger stretch & rotation */
            opacity: 0.8; /* ENHANCED: was 0.3 */
          }
        }

        .geometric-dance-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${baseGradient};
          overflow: hidden;
          /* GPU acceleration */
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .geometric-shape {
          position: absolute;
          pointer-events: none;
          border: 4px solid currentColor; /* ENHANCED: was 2px */
          box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; /* ENHANCED: added glow */
          /* GPU acceleration and gradient smoothing */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .geometric-circle {
          border-radius: 50%;
        }

        .geometric-triangle {
          width: 0;
          height: 0;
          border-left: var(--triangle-left) solid transparent;
          border-right: var(--triangle-right) solid transparent;
          border-bottom: var(--triangle-bottom) solid currentColor;
          border-top: none;
          background: transparent;
        }

        .geometric-line {
          height: 5px; /* ENHANCED: was 2px */
          background: currentColor;
          border: none;
          box-shadow: 0 0 15px currentColor, 0 0 30px currentColor; /* ENHANCED: added glow */
        }
      `}</style>

      {/* Large rotating circles - ENHANCED */}
      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '30%',
          left: '25%',
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          color: colors.primary,
          filter: `blur(${scale(1)}px)`, /* ENHANCED: was 2px */
          animation: 'geometricRotate1 12s linear infinite', /* ENHANCED: was 24s */
        }}
      />

      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '60%',
          right: '20%',
          width: `${scale(180)}px`,
          height: `${scale(180)}px`,
          color: colors.secondary,
          filter: `blur(${scale(1)}px)`, /* ENHANCED: was 3px */
          animation: 'geometricRotate2 10s linear infinite', /* ENHANCED: was 20s */
        }}
      />

      {/* Medium floating shapes - ENHANCED */}
      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '45%',
          left: '60%',
          width: `${scale(120)}px`,
          height: `${scale(120)}px`,
          color: colors.tertiary,
          filter: `blur(${scale(1)}px)`, /* ENHANCED: was 2px */
          animation: 'geometricFloat 8s ease-in-out infinite alternate', /* ENHANCED: was 16s */
        }}
      />

      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '20%',
          right: '30%',
          width: `${scale(100)}px`,
          height: `${scale(100)}px`,
          color: colors.small1,
          filter: `blur(${scale(1)}px)`, /* ENHANCED: was 2.5px */
          animation: 'geometricFloat 7s ease-in-out 1s infinite alternate', /* ENHANCED: was 14s 2s */
        }}
      />

      {/* Triangle shapes - ENHANCED */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          color: colors.primary30,
          animation: 'geometricRotate1 14s linear infinite reverse', /* ENHANCED: was 28s */
        }}
      >
        <div className="geometric-triangle" style={{ filter: `blur(${scale(1.5)}px)` }} /> {/* ENHANCED: was 3px */}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          color: colors.secondary30,
          animation: 'geometricRotate2 11s linear infinite', /* ENHANCED: was 22s */
        }}
      >
        <div className="geometric-triangle" style={{ filter: `blur(${scale(1)}px)` }} /> {/* ENHANCED: was 2px */}
      </div>

      {/* Geometric lines - ENHANCED */}
      <div
        className="geometric-line"
        style={{
          top: '35%',
          left: '10%',
          width: `${scale(250)}px`,
          color: colors.tertiary30,
          transformOrigin: 'center',
          animation: 'lineStretch 4s ease-in-out infinite alternate', /* ENHANCED: was 8s */
        }}
      />

      <div
        className="geometric-line"
        style={{
          top: '65%',
          right: '10%',
          width: `${scale(200)}px`,
          color: colors.small2,
          transformOrigin: 'center',
          animation: 'lineStretch 5s ease-in-out 1s infinite alternate', /* ENHANCED: was 10s 2s */
        }}
      />

      <div
        className="geometric-line"
        style={{
          top: '50%',
          left: '30%',
          width: `${scale(180)}px`,
          color: colors.primary50,
          transformOrigin: 'center',
          transform: 'rotate(45deg)',
          animation: 'lineStretch 6s ease-in-out 2s infinite alternate', /* ENHANCED: was 12s 4s */
        }}
      />

      {/* Pulsing background shapes for depth - ENHANCED */}
      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(400)}px`,
          height: `${scale(400)}px`,
          color: colors.tertiary50,
          filter: `blur(${scale(30)}px)`, /* ENHANCED: was 60px */
          animation: 'geometricPulse 9s ease-in-out infinite alternate', /* ENHANCED: was 18s */
        }}
      />

      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '20%',
          left: '70%',
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          color: colors.secondary50,
          filter: `blur(${scale(35)}px)`, /* ENHANCED: was 70px */
          animation: 'geometricPulse 11s ease-in-out 1.5s infinite alternate', /* ENHANCED: was 22s 3s */
        }}
      />
    </div>
  );
};
