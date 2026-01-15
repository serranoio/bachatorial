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

  // Generate expanding geometric rings (proportional sizing)
  const expansionRings = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: scale(288 + i * 154), // Based on 15vw-55vw at 1920px base
    delay: i * 1.5,
    duration: 20 + i * 2,
  }));

  // Generate fractal particles (proportional sizing)
  const fractalPoints = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 20,
    distance: scale(192 + (i % 3) * 96), // 10vw-20vw at 1920px base
    size: scale(5.8 + (i % 4) * 1.9), // 0.3vw-0.6vw at 1920px base
    delay: i * 0.5,
  }));

  // Generate expanding mandala petals
  const mandalaPetals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    delay: i * 0.8,
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
            opacity: 0.4;
          }
          70% {
            opacity: 0.3;
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
            opacity: 0.35;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes fractalPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.6;
          }
        }

        @keyframes radialExpand {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
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
            opacity: 0.25;
          }
          100% {
            transform: scale(1) rotate(180deg);
            opacity: 0.2;
          }
        }

        @keyframes centerGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.3;
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
          border: 1px solid currentColor;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .expansion-ring-geometric {
          position: absolute;
          left: 50%;
          top: 50%;
          pointer-events: none;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .fractal-point {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 8px currentColor;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
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
          animation: centerGlow 12s ease-in-out infinite alternate;
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

      {/* Center glow - represents the source of infinite expansion */}
      <div
        className="center-glow"
        style={{
          width: `${scale(250)}px`,
          height: `${scale(250)}px`,
          filter: `blur(${scale(60)}px)`,
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

      {/* Expanding geometric shapes (star-like) */}
      <div
        className="expansion-ring-geometric"
        style={{
          width: `${scale(500)}px`,
          height: `${scale(500)}px`,
          background: colors.primary,
          opacity: 0.2,
          animation: 'expandRotate 24s ease-out infinite',
        }}
      />
      <div
        className="expansion-ring-geometric"
        style={{
          width: `${scale(700)}px`,
          height: `${scale(700)}px`,
          background: colors.secondary,
          opacity: 0.15,
          animation: 'expandRotate 28s ease-out 3s infinite',
        }}
      />
      <div
        className="expansion-ring-geometric"
        style={{
          width: `${scale(900)}px`,
          height: `${scale(900)}px`,
          background: colors.tertiary,
          opacity: 0.12,
          animation: 'expandRotate 32s ease-out 6s infinite',
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
              animation: `fractalPulse 4s ease-in-out ${point.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Mandala petals - subtle geometric patterns */}
      {mandalaPetals.map((petal, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1, colors.small2][index % 5];

        return (
          <div
            key={petal.id}
            className="mandala-petal"
            style={{
              width: `${scale(80)}px`,
              height: `${scale(20)}px`,
              filter: `blur(${scale(2)}px)`,
              color: color,
              transform: `translate(-50%, -50%) rotate(${petal.angle}deg)`,
              animation: `petalGrow 16s ease-out ${petal.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Rotating geometric layer for depth */}
      <div
        className="geometric-layer"
        style={{
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          border: `1px solid ${colors.primary}`,
          borderRadius: '50%',
          opacity: 0.15,
          animation: 'infiniteRotate 40s linear infinite',
        }}
      />
      <div
        className="geometric-layer"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          border: `1px solid ${colors.secondary}`,
          borderRadius: '50%',
          opacity: 0.12,
          animation: 'infiniteRotate 50s linear infinite reverse',
        }}
      />

      {/* Additional subtle expansion pulses */}
      <div
        className="expansion-ring"
        style={{
          width: `${scale(400)}px`,
          height: `${scale(400)}px`,
          color: colors.small1,
          opacity: 0.1,
          animation: 'radialExpand 18s ease-out 8s infinite',
        }}
      />
      <div
        className="expansion-ring"
        style={{
          width: `${scale(500)}px`,
          height: `${scale(500)}px`,
          color: colors.small2,
          opacity: 0.08,
          animation: 'radialExpand 22s ease-out 12s infinite',
        }}
      />
    </div>
  );
};
