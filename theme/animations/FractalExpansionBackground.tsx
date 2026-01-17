import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Fractal Expansion Background - For My Why story
 * Expanding geometric patterns suggesting infinite depth and expansion
 * Subtle and meditative - represents infinite joy and the universe's infinity
 */
export const FractalExpansionBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'coral',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  // Generate expanding geometric rings (proportional sizing) - ENHANCED for visibility
  const expansionRings = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: scale(288 + i * 154), // Based on 15vw-55vw at 1920px base
    delay: i * 0.75, // ENHANCED: was 1.5 - 50% faster
    duration: 10 + i, // ENHANCED: was 20+i*2 - 50% faster
  }));

  // Generate fractal particles (proportional sizing) - ENHANCED for visibility
  const fractalPoints = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 20,
    distance: scale(192 + (i % 3) * 96), // 10vw-20vw at 1920px base
    size: scale(8 + (i % 4) * 3), // ENHANCED: was 5.8+(i%4)*1.9 - larger particles
    delay: i * 0.25, // ENHANCED: was 0.5 - 50% faster
  }));

  // Generate expanding mandala petals - ENHANCED for visibility
  const mandalaPetals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    delay: i * 0.4, // ENHANCED: was 0.8 - 50% faster
  }));

  return (
    <div className={`fractal-expansion-background ${className}`}>
      <style>{`
        @keyframes expand {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          30% {
            opacity: 0.75; /* ENHANCED: was 0.4 */
          }
          70% {
            opacity: 0.65; /* ENHANCED: was 0.3 */
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }

        @keyframes expandRotate {
          0% {
            transform: translate(-50%, -50%) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          30% {
            opacity: 0.7; /* ENHANCED: was 0.35 */
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes fractalPulse {
          0%, 100% {
            transform: scale(1.2); /* ENHANCED: was 1 */
            opacity: 0.7; /* ENHANCED: was 0.4 */
          }
          50% {
            transform: scale(1.6); /* ENHANCED: was 1.15 */
            opacity: 0.9; /* ENHANCED: was 0.6 */
          }
        }

        @keyframes radialExpand {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6; /* ENHANCED: was 0.3 */
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes petalGrow {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            opacity: 0.6; /* ENHANCED: was 0.25 */
          }
          100% {
            transform: scale(1) rotate(180deg);
            opacity: 0.5; /* ENHANCED: was 0.2 */
          }
        }

        @keyframes centerGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5; /* ENHANCED: was 0.2 */
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2); /* ENHANCED: was 1.1 */
            opacity: 0.7; /* ENHANCED: was 0.3 */
          }
        }

        @keyframes infiniteRotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .fractal-expansion-background {
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

        .expansion-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          border: 3px solid currentColor; /* ENHANCED: was 1px */
          box-shadow: 0 0 15px currentColor; /* ENHANCED: added glow */
          pointer-events: none;
          /* GPU acceleration and gradient smoothing */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .expansion-ring-geometric {
          position: absolute;
          left: 50%;
          top: 50%;
          pointer-events: none;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          /* GPU acceleration and gradient smoothing */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .fractal-point {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; /* ENHANCED: was 8px - stronger glow */
          /* GPU acceleration and gradient smoothing */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .mandala-petal {
          position: absolute;
          left: 50%;
          top: 50%;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          border-radius: 50%;
          transform-origin: 0% 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .center-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          pointer-events: none;
          animation: centerGlow 6s ease-in-out infinite alternate; /* ENHANCED: was 12s - 50% faster */
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }

        .geometric-layer {
          position: absolute;
          left: 50%;
          top: 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Center glow - represents the source of infinite expansion - ENHANCED */}
      <div
        className="center-glow"
        style={{
          width: `${scale(250)}px`,
          height: `${scale(250)}px`,
          filter: `blur(${scale(30)}px)`, /* ENHANCED: was 60px - 50% reduction */
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 70%)`,
        }}
      />

      {/* Expanding circular rings */}
      {expansionRings.map((ring, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary][index % 3];

        return (
          <div
            key={ring.id}
            className="expansion-ring"
            style={{
              width: `${ring.size}px`,
              height: `${ring.size}px`,
              color: color,
              animation: `expand ${ring.duration}s ease-out ${ring.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Expanding geometric shapes (star-like) - ENHANCED */}
      <div
        className="expansion-ring-geometric"
        style={{
          width: `${scale(500)}px`,
          height: `${scale(500)}px`,
          background: colors.primary,
          opacity: 0.5, /* ENHANCED: was 0.2 */
          animation: 'expandRotate 12s ease-out infinite', /* ENHANCED: was 24s - 50% faster */
        }}
      />
      <div
        className="expansion-ring-geometric"
        style={{
          width: `${scale(700)}px`,
          height: `${scale(700)}px`,
          background: colors.secondary,
          opacity: 0.45, /* ENHANCED: was 0.15 */
          animation: 'expandRotate 14s ease-out 1.5s infinite', /* ENHANCED: was 28s 3s - 50% faster */
        }}
      />
      <div
        className="expansion-ring-geometric"
        style={{
          width: `${scale(900)}px`,
          height: `${scale(900)}px`,
          background: colors.tertiary,
          opacity: 0.4, /* ENHANCED: was 0.12 */
          animation: 'expandRotate 16s ease-out 3s infinite', /* ENHANCED: was 32s 6s - 50% faster */
        }}
      />

      {/* Fractal points arranged in circular patterns */}
      {fractalPoints.map((point, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1][index % 4];
        const radians = (point.angle * Math.PI) / 180;
        const x = Math.cos(radians) * point.distance;
        const y = Math.sin(radians) * point.distance;

        return (
          <div
            key={point.id}
            className="fractal-point"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`,
              backgroundColor: color,
              color: color,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              animation: `fractalPulse 2s ease-in-out ${point.delay}s infinite`, /* ENHANCED: was 4s - 50% faster */
            }}
          />
        );
      })}

      {/* Mandala petals - subtle geometric patterns - ENHANCED */}
      {mandalaPetals.map((petal, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1, colors.small2][index % 5];

        return (
          <div
            key={petal.id}
            className="mandala-petal"
            style={{
              width: `${scale(80)}px`,
              height: `${scale(20)}px`,
              filter: `blur(${scale(1)}px)`, /* ENHANCED: was 2px - 50% reduction */
              color: color,
              transform: `translate(-50%, -50%) rotate(${petal.angle}deg)`,
              animation: `petalGrow 8s ease-out ${petal.delay}s infinite`, /* ENHANCED: was 16s - 50% faster */
            }}
          />
        );
      })}

      {/* Rotating geometric layer for depth - ENHANCED */}
      <div
        className="geometric-layer"
        style={{
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          border: `2px solid ${colors.primary}`, /* ENHANCED: was 1px */
          borderRadius: '50%',
          opacity: 0.4, /* ENHANCED: was 0.15 */
          animation: 'infiniteRotate 20s linear infinite', /* ENHANCED: was 40s - 50% faster */
        }}
      />
      <div
        className="geometric-layer"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          border: `2px solid ${colors.secondary}`, /* ENHANCED: was 1px */
          borderRadius: '50%',
          opacity: 0.35, /* ENHANCED: was 0.12 */
          animation: 'infiniteRotate 25s linear infinite reverse', /* ENHANCED: was 50s - 50% faster */
        }}
      />

      {/* Additional subtle expansion pulses - ENHANCED */}
      <div
        className="expansion-ring"
        style={{
          width: `${scale(400)}px`,
          height: `${scale(400)}px`,
          color: colors.small1,
          opacity: 0.3, /* ENHANCED: was 0.1 */
          animation: 'radialExpand 9s ease-out 4s infinite', /* ENHANCED: was 18s 8s - 50% faster */
        }}
      />
      <div
        className="expansion-ring"
        style={{
          width: `${scale(500)}px`,
          height: `${scale(500)}px`,
          color: colors.small2,
          opacity: 0.25, /* ENHANCED: was 0.08 */
          animation: 'radialExpand 11s ease-out 6s infinite', /* ENHANCED: was 22s 12s - 50% faster */
        }}
      />
    </div>
  );
};
