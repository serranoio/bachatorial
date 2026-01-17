import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Bokeh Light Background - For About Me story
 * Soft, out-of-focus light orbs that drift like fireflies
 * Creates a dreamy, romantic, personal atmosphere
 */
export const BokehLightBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'peach',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  // Generate bokeh orbs with varying sizes and depths
  const bokehOrbs = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: scale(Math.random() * 120 + 80),
    blur: scale(Math.random() * 40 + 60),
    delay: Math.random() * 6,
    duration: Math.random() * 12 + 20,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    zIndex: Math.floor(Math.random() * 3),
  }));

  return (
    <div
      className={`bokeh-light-background ${className}`}
      style={{
        // @ts-ignore - CSS custom properties
        '--float1-x1': `${scale(30)}px`,
        '--float1-y1': `${scale(-40)}px`,
        '--float1-x2': `${scale(-20)}px`,
        '--float1-y2': `${scale(30)}px`,
        '--float1-x3': `${scale(40)}px`,
        '--float1-y3': `${scale(20)}px`,
        '--float2-x1': `${scale(-35)}px`,
        '--float2-y1': `${scale(45)}px`,
        '--float2-x2': `${scale(25)}px`,
        '--float2-y2': `${scale(-30)}px`,
        '--float2-x3': `${scale(-15)}px`,
        '--float2-y3': `${scale(-20)}px`,
        '--float3-x1': `${scale(45)}px`,
        '--float3-y1': `${scale(35)}px`,
        '--float3-x2': `${scale(-30)}px`,
        '--float3-y2': `${scale(-35)}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes bokehFloat1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(var(--float1-x1), var(--float1-y1)) scale(1.2);
            opacity: 0.65;
          }
          50% {
            transform: translate(var(--float1-x2), var(--float1-y2)) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translate(var(--float1-x3), var(--float1-y3)) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes bokehFloat2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          30% {
            transform: translate(var(--float2-x1), var(--float2-y1)) scale(1.15);
            opacity: 0.6;
          }
          60% {
            transform: translate(var(--float2-x2), var(--float2-y2)) scale(0.85);
            opacity: 0.45;
          }
          90% {
            transform: translate(var(--float2-x3), var(--float2-y3)) scale(1.05);
            opacity: 0.55;
          }
        }

        @keyframes bokehFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          35% {
            transform: translate(var(--float3-x1), var(--float3-y1)) scale(1.25);
            opacity: 0.7;
          }
          70% {
            transform: translate(var(--float3-x2), var(--float3-y2)) scale(0.95);
            opacity: 0.5;
          }
        }

        @keyframes bokehPulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }

        @keyframes bokehTwinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .bokeh-light-background {
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

        .bokeh-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
          /* GPU acceleration and gradient smoothing */
          will-change: transform, filter, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .bokeh-layer-0 {
          z-index: 0;
        }

        .bokeh-layer-1 {
          z-index: 1;
        }

        .bokeh-layer-2 {
          z-index: 2;
        }
      `}</style>

      {/* Bokeh orbs floating at different depths */}
      {bokehOrbs.map((orb, index) => {
        const floatAnimation = ['bokehFloat1', 'bokehFloat2', 'bokehFloat3'][index % 3];
        const colorVariant = [
          colors.primary,
          colors.secondary,
          colors.tertiary,
          colors.small1,
          colors.small2,
        ][index % 5];

        return (
          <div
            key={orb.id}
            className={`bokeh-orb bokeh-layer-${orb.zIndex}`}
            style={{
              left: `${orb.startX}%`,
              top: `${orb.startY}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, ${colorVariant} 0%, ${colorVariant.replace('0.', '0.0')} 70%)`,
              filter: `blur(${orb.blur}px)`,
              animation: `${floatAnimation} ${orb.duration}s ease-in-out ${orb.delay}s infinite alternate, bokehPulse ${orb.duration * 0.6}s ease-in-out infinite alternate`,
            }}
          />
        );
      })}

      {/* Additional twinkling lights for atmosphere */}
      <div
        className="bokeh-orb bokeh-layer-2"
        style={{
          left: '15%',
          top: '20%',
          width: `${scale(150)}px`,
          height: `${scale(150)}px`,
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 60%)`,
          filter: `blur(${scale(70)}px)`,
          animation: 'bokehTwinkle 4s ease-in-out infinite alternate, bokehFloat1 18s ease-in-out infinite alternate',
        }}
      />

      <div
        className="bokeh-orb bokeh-layer-2"
        style={{
          right: '20%',
          bottom: '25%',
          width: `${scale(180)}px`,
          height: `${scale(180)}px`,
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 60%)`,
          filter: `blur(${scale(80)}px)`,
          animation: 'bokehTwinkle 5s ease-in-out 1s infinite alternate, bokehFloat2 22s ease-in-out infinite alternate',
        }}
      />

      <div
        className="bokeh-orb bokeh-layer-1"
        style={{
          left: '60%',
          top: '50%',
          width: `${scale(120)}px`,
          height: `${scale(120)}px`,
          background: `radial-gradient(circle, ${colors.tertiary} 0%, transparent 60%)`,
          filter: `blur(${scale(65)}px)`,
          animation: 'bokehTwinkle 3.5s ease-in-out 2s infinite alternate, bokehFloat3 20s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};
