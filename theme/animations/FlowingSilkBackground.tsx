import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Flowing Silk Background - For Life is a Dance story
 * Smooth, continuous flowing motion like silk ribbons
 * Represents the grace, fluidity, and sensuality of dance
 */
export const FlowingSilkBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'gold',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  // Generate silk ribbon paths
  const ribbons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 1.5,
    duration: 15 + i * 2,
    offsetY: i * 15,
  }));

  // Generate flowing particles
  const flowParticles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: scale(Math.random() * 4 + 2),
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 15,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  return (
    <div className={`flowing-silk-background ${className}`}>
      <style>{`
        @keyframes silkFlow1 {
          0% {
            d: path("M 0,50 Q 25,30 50,50 T 100,50");
            opacity: 0.25;
          }
          25% {
            d: path("M 0,50 Q 25,70 50,50 T 100,50");
            opacity: 0.35;
          }
          50% {
            d: path("M 0,50 Q 25,40 50,50 T 100,50");
            opacity: 0.4;
          }
          75% {
            d: path("M 0,50 Q 25,60 50,50 T 100,50");
            opacity: 0.35;
          }
          100% {
            d: path("M 0,50 Q 25,30 50,50 T 100,50");
            opacity: 0.25;
          }
        }

        @keyframes waveFlow {
          0% {
            transform: translateX(-10%) translateY(0) scaleY(1);
            opacity: 0.3;
          }
          50% {
            transform: translateX(0%) translateY(var(--wave-translate-y)) scaleY(1.05);
            opacity: 0.45;
          }
          100% {
            transform: translateX(10%) translateY(0) scaleY(1);
            opacity: 0.3;
          }
        }

        @keyframes undulate {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          25% {
            transform: translateY(var(--undulate-translate-y-neg)) scaleX(0.98);
          }
          50% {
            transform: translateY(0) scaleX(1);
          }
          75% {
            transform: translateY(var(--undulate-translate-y-pos)) scaleX(0.98);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate(var(--float-x1), var(--float-y1));
            opacity: 0.6;
          }
          50% {
            transform: translate(var(--float-x2), var(--float-y2));
            opacity: 0.4;
          }
          75% {
            transform: translate(var(--float-x3), var(--float-y3));
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
        }

        @keyframes silkShimmer {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.35;
          }
        }

        .flowing-silk-background {
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

        .silk-wave {
          position: absolute;
          width: 100%;
          pointer-events: none;
          opacity: 0.3;
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }

        .silk-ribbon {
          position: absolute;
          width: 100%;
          background: linear-gradient(90deg, transparent, currentColor 20%, currentColor 80%, transparent);
          transform-origin: center;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .flow-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .silk-shimmer {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: filter, opacity;
          backface-visibility: hidden;
        }

        .central-flow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.25;
          animation: undulate 8s ease-in-out infinite alternate;
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Central flowing energy */}
      <div
        className="central-flow"
        style={{
          width: `${scale(500)}px`,
          height: `${scale(300)}px`,
          filter: `blur(${scale(80)}px)`,
          background: `radial-gradient(ellipse, ${colors.primary} 0%, ${colors.secondary} 40%, transparent 70%)`,
          '--undulate-translate-y-neg': `${scale(-8)}px`,
          '--undulate-translate-y-pos': `${scale(8)}px`,
        } as React.CSSProperties}
      />

      {/* Silk ribbons - horizontal flowing lines */}
      {ribbons.map((ribbon, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1][index % 4];
        const yPosition = 15 + ribbon.offsetY;

        return (
          <div
            key={ribbon.id}
            className="silk-ribbon"
            style={{
              top: `${yPosition}%`,
              height: `${scale(2)}px`,
              filter: `blur(${scale(1)}px)`,
              color: color,
              animation: `waveFlow ${ribbon.duration}s ease-in-out ${ribbon.delay}s infinite`,
              '--wave-translate-y': `${scale(-5)}px`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Silk wave layers */}
      <div
        className="silk-wave"
        style={{
          top: '20%',
          height: `${scale(150)}px`,
          background: `linear-gradient(90deg, transparent, ${colors.primary30}, transparent)`,
          animation: 'waveFlow 12s ease-in-out infinite alternate',
          filter: `blur(${scale(20)}px)`,
          '--wave-translate-y': `${scale(-5)}px`,
        } as React.CSSProperties}
      />
      <div
        className="silk-wave"
        style={{
          top: '45%',
          height: `${scale(150)}px`,
          background: `linear-gradient(90deg, transparent, ${colors.secondary30}, transparent)`,
          animation: 'waveFlow 14s ease-in-out infinite 2s alternate',
          filter: `blur(${scale(25)}px)`,
          '--wave-translate-y': `${scale(-5)}px`,
        } as React.CSSProperties}
      />
      <div
        className="silk-wave"
        style={{
          top: '70%',
          height: `${scale(150)}px`,
          background: `linear-gradient(90deg, transparent, ${colors.tertiary30}, transparent)`,
          animation: 'waveFlow 16s ease-in-out infinite 4s alternate',
          filter: `blur(${scale(30)}px)`,
          '--wave-translate-y': `${scale(-5)}px`,
        } as React.CSSProperties}
      />

      {/* Flowing particles */}
      {flowParticles.map((particle, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1, colors.small2][index % 5];

        return (
          <div
            key={particle.id}
            className="flow-particle"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: color,
              color: color,
              boxShadow: `0 0 ${scale(6)}px currentColor`,
              filter: `blur(${scale(1)}px)`,
              animation: `particleFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
              '--float-x1': `${scale(30)}px`,
              '--float-y1': `${scale(-40)}px`,
              '--float-x2': `${scale(-10)}px`,
              '--float-y2': `${scale(-80)}px`,
              '--float-x3': `${scale(-40)}px`,
              '--float-y3': `${scale(-40)}px`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Silk shimmer effects */}
      <div
        className="silk-shimmer"
        style={{
          left: '20%',
          top: '30%',
          width: `${scale(150)}px`,
          height: `${scale(150)}px`,
          filter: `blur(${scale(40)}px)`,
          background: colors.primary,
          animation: 'silkShimmer 6s ease-in-out infinite alternate',
        }}
      />
      <div
        className="silk-shimmer"
        style={{
          right: '25%',
          top: '55%',
          width: `${scale(120)}px`,
          height: `${scale(120)}px`,
          filter: `blur(${scale(40)}px)`,
          background: colors.secondary,
          animation: 'silkShimmer 7s ease-in-out infinite 2s alternate',
        }}
      />
      <div
        className="silk-shimmer"
        style={{
          left: '50%',
          bottom: '20%',
          width: `${scale(180)}px`,
          height: `${scale(180)}px`,
          filter: `blur(${scale(40)}px)`,
          background: colors.tertiary,
          animation: 'silkShimmer 8s ease-in-out infinite 4s alternate',
        }}
      />
    </div>
  );
};
