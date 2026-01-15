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

  // Generate silk ribbon paths - ENHANCED for visibility
  const ribbons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.75, // ENHANCED: was 1.5 - faster delays
    duration: 8 + i, // ENHANCED: was 15+i*2 - 50% faster
    offsetY: i * 15,
  }));

  // Generate flowing particles - ENHANCED for visibility
  const flowParticles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: scale(Math.random() * 8 + 4), // ENHANCED: was 4+2 - doubled size
    delay: Math.random() * 4, // ENHANCED: was 8 - faster start
    duration: Math.random() * 5 + 8, // ENHANCED: was 10+15 - 50% faster
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  return (
    <div className={`flowing-silk-background ${className}`}>
      <style>{`
        @keyframes silkFlow1 {
          0% {
            d: path("M 0,50 Q 25,30 50,50 T 100,50");
            opacity: 0.5; /* ENHANCED: was 0.25 */
          }
          25% {
            d: path("M 0,50 Q 25,70 50,50 T 100,50");
            opacity: 0.7; /* ENHANCED: was 0.35 */
          }
          50% {
            d: path("M 0,50 Q 25,40 50,50 T 100,50");
            opacity: 0.8; /* ENHANCED: was 0.4 */
          }
          75% {
            d: path("M 0,50 Q 25,60 50,50 T 100,50");
            opacity: 0.7; /* ENHANCED: was 0.35 */
          }
          100% {
            d: path("M 0,50 Q 25,30 50,50 T 100,50");
            opacity: 0.5; /* ENHANCED: was 0.25 */
          }
        }

        @keyframes waveFlow {
          0% {
            transform: translateX(-20%) translateY(0) scaleY(1); /* ENHANCED: was -10% - larger movement */
            opacity: 0.6; /* ENHANCED: was 0.3 */
          }
          50% {
            transform: translateX(0%) translateY(var(--wave-translate-y)) scaleY(1.15); /* ENHANCED: was 1.05 - larger scale */
            opacity: 0.8; /* ENHANCED: was 0.45 */
          }
          100% {
            transform: translateX(20%) translateY(0) scaleY(1); /* ENHANCED: was 10% - larger movement */
            opacity: 0.6; /* ENHANCED: was 0.3 */
          }
        }

        @keyframes undulate {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          25% {
            transform: translateY(var(--undulate-translate-y-neg)) scaleX(0.95); /* ENHANCED: was 0.98 - larger scale variation */
          }
          50% {
            transform: translateY(0) scaleX(1);
          }
          75% {
            transform: translateY(var(--undulate-translate-y-pos)) scaleX(0.95); /* ENHANCED: was 0.98 - larger scale variation */
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 0.6; /* ENHANCED: was 0.3 */
          }
          25% {
            transform: translate(var(--float-x1), var(--float-y1));
            opacity: 0.9; /* ENHANCED: was 0.6 */
          }
          50% {
            transform: translate(var(--float-x2), var(--float-y2));
            opacity: 0.75; /* ENHANCED: was 0.4 */
          }
          75% {
            transform: translate(var(--float-x3), var(--float-y3));
            opacity: 0.85; /* ENHANCED: was 0.5 */
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.6; /* ENHANCED: was 0.3 */
          }
        }

        @keyframes silkShimmer {
          0%, 100% {
            opacity: 0.5; /* ENHANCED: was 0.2 */
          }
          50% {
            opacity: 0.75; /* ENHANCED: was 0.35 */
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
          opacity: 0.6; /* ENHANCED: was 0.3 */
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
          box-shadow: 0 0 15px currentColor; /* ENHANCED: added glow */
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
          opacity: 0.6; /* ENHANCED: was 0.25 */
          animation: undulate 4s ease-in-out infinite alternate; /* ENHANCED: was 8s - 50% faster */
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Central flowing energy - ENHANCED */}
      <div
        className="central-flow"
        style={{
          width: `${scale(500)}px`,
          height: `${scale(300)}px`,
          filter: `blur(${scale(40)}px)`, /* ENHANCED: was 80px - 50% reduction */
          background: `radial-gradient(ellipse, ${colors.primary} 0%, ${colors.secondary} 40%, transparent 70%)`,
          '--undulate-translate-y-neg': `${scale(-20)}px`, /* ENHANCED: was -8px - larger movement */
          '--undulate-translate-y-pos': `${scale(20)}px`, /* ENHANCED: was 8px - larger movement */
        } as React.CSSProperties}
      />

      {/* Silk ribbons - horizontal flowing lines - ENHANCED */}
      {ribbons.map((ribbon, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1][index % 4];
        const yPosition = 15 + ribbon.offsetY;

        return (
          <div
            key={ribbon.id}
            className="silk-ribbon"
            style={{
              top: `${yPosition}%`,
              height: `${scale(4)}px`, /* ENHANCED: was 2px - doubled thickness */
              filter: `blur(${scale(0.5)}px)`, /* ENHANCED: was 1px - 50% reduction */
              color: color,
              animation: `waveFlow ${ribbon.duration}s ease-in-out ${ribbon.delay}s infinite`,
              '--wave-translate-y': `${scale(-15)}px`, /* ENHANCED: was -5px - 3x movement */
            } as React.CSSProperties}
          />
        );
      })}

      {/* Silk wave layers - ENHANCED */}
      <div
        className="silk-wave"
        style={{
          top: '20%',
          height: `${scale(150)}px`,
          background: `linear-gradient(90deg, transparent, ${colors.primary30}, transparent)`,
          animation: 'waveFlow 6s ease-in-out infinite alternate', /* ENHANCED: was 12s - 50% faster */
          filter: `blur(${scale(15)}px)`, /* ENHANCED: was 20px - 25% reduction */
          '--wave-translate-y': `${scale(-15)}px`, /* ENHANCED: was -5px - 3x movement */
        } as React.CSSProperties}
      />
      <div
        className="silk-wave"
        style={{
          top: '45%',
          height: `${scale(150)}px`,
          background: `linear-gradient(90deg, transparent, ${colors.secondary30}, transparent)`,
          animation: 'waveFlow 7s ease-in-out infinite 1s alternate', /* ENHANCED: was 14s 2s - 50% faster */
          filter: `blur(${scale(15)}px)`, /* ENHANCED: was 25px - 40% reduction */
          '--wave-translate-y': `${scale(-15)}px`, /* ENHANCED: was -5px - 3x movement */
        } as React.CSSProperties}
      />
      <div
        className="silk-wave"
        style={{
          top: '70%',
          height: `${scale(150)}px`,
          background: `linear-gradient(90deg, transparent, ${colors.tertiary30}, transparent)`,
          animation: 'waveFlow 8s ease-in-out infinite 2s alternate', /* ENHANCED: was 16s 4s - 50% faster */
          filter: `blur(${scale(20)}px)`, /* ENHANCED: was 30px - 33% reduction */
          '--wave-translate-y': `${scale(-15)}px`, /* ENHANCED: was -5px - 3x movement */
        } as React.CSSProperties}
      />

      {/* Flowing particles - ENHANCED */}
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
              boxShadow: `0 0 ${scale(15)}px currentColor, 0 0 ${scale(30)}px currentColor`, /* ENHANCED: was 6px - stronger glow */
              filter: `blur(${scale(0.5)}px)`, /* ENHANCED: was 1px - 50% reduction */
              animation: `particleFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
              '--float-x1': `${scale(60)}px`, /* ENHANCED: was 30px - 2x movement */
              '--float-y1': `${scale(-80)}px`, /* ENHANCED: was -40px - 2x movement */
              '--float-x2': `${scale(-20)}px`, /* ENHANCED: was -10px - 2x movement */
              '--float-y2': `${scale(-160)}px`, /* ENHANCED: was -80px - 2x movement */
              '--float-x3': `${scale(-80)}px`, /* ENHANCED: was -40px - 2x movement */
              '--float-y3': `${scale(-80)}px`, /* ENHANCED: was -40px - 2x movement */
            } as React.CSSProperties}
          />
        );
      })}

      {/* Silk shimmer effects - ENHANCED */}
      <div
        className="silk-shimmer"
        style={{
          left: '20%',
          top: '30%',
          width: `${scale(150)}px`,
          height: `${scale(150)}px`,
          filter: `blur(${scale(25)}px)`, /* ENHANCED: was 40px - 38% reduction */
          background: colors.primary,
          animation: 'silkShimmer 3s ease-in-out infinite alternate', /* ENHANCED: was 6s - 50% faster */
        }}
      />
      <div
        className="silk-shimmer"
        style={{
          right: '25%',
          top: '55%',
          width: `${scale(120)}px`,
          height: `${scale(120)}px`,
          filter: `blur(${scale(25)}px)`, /* ENHANCED: was 40px - 38% reduction */
          background: colors.secondary,
          animation: 'silkShimmer 3.5s ease-in-out infinite 1s alternate', /* ENHANCED: was 7s 2s - 50% faster */
        }}
      />
      <div
        className="silk-shimmer"
        style={{
          left: '50%',
          bottom: '20%',
          width: `${scale(180)}px`,
          height: `${scale(180)}px`,
          filter: `blur(${scale(25)}px)`, /* ENHANCED: was 40px - 38% reduction */
          background: colors.tertiary,
          animation: 'silkShimmer 4s ease-in-out infinite 2s alternate', /* ENHANCED: was 8s 4s - 50% faster */
        }}
      />
    </div>
  );
};
