import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';

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
    size: Math.random() * 4 + 2,
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
            transform: translateX(0%) translateY(-5px) scaleY(1.05);
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
            transform: translateY(-8px) scaleX(0.98);
          }
          50% {
            transform: translateY(0) scaleX(1);
          }
          75% {
            transform: translateY(8px) scaleX(0.98);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -40px);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -80px);
            opacity: 0.4;
          }
          75% {
            transform: translate(-40px, -40px);
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
            filter: blur(20px);
          }
          50% {
            opacity: 0.35;
            filter: blur(25px);
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
        }

        .silk-wave {
          position: absolute;
          width: 100%;
          height: 150px;
          pointer-events: none;
          opacity: 0.3;
        }

        .silk-ribbon {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, currentColor 20%, currentColor 80%, transparent);
          transform-origin: center;
          pointer-events: none;
          filter: blur(1px);
        }

        .flow-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 6px currentColor;
          filter: blur(1px);
        }

        .silk-shimmer {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(40px);
        }

        .central-flow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.25;
          animation: undulate 8s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Central flowing energy */}
      <div
        className="central-flow"
        style={{
          background: `radial-gradient(ellipse, ${colors.primary} 0%, ${colors.secondary} 40%, transparent 70%)`,
        }}
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
              color: color,
              animation: `waveFlow ${ribbon.duration}s ease-in-out ${ribbon.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Silk wave layers */}
      <div
        className="silk-wave"
        style={{
          top: '20%',
          background: `linear-gradient(90deg, transparent, ${colors.primary30}, transparent)`,
          animation: 'waveFlow 12s ease-in-out infinite alternate',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="silk-wave"
        style={{
          top: '45%',
          background: `linear-gradient(90deg, transparent, ${colors.secondary30}, transparent)`,
          animation: 'waveFlow 14s ease-in-out infinite 2s alternate',
          filter: 'blur(25px)',
        }}
      />
      <div
        className="silk-wave"
        style={{
          top: '70%',
          background: `linear-gradient(90deg, transparent, ${colors.tertiary30}, transparent)`,
          animation: 'waveFlow 16s ease-in-out infinite 4s alternate',
          filter: 'blur(30px)',
        }}
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
              animation: `particleFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Silk shimmer effects */}
      <div
        className="silk-shimmer"
        style={{
          left: '20%',
          top: '30%',
          width: '150px',
          height: '150px',
          background: colors.primary,
          animation: 'silkShimmer 6s ease-in-out infinite alternate',
        }}
      />
      <div
        className="silk-shimmer"
        style={{
          right: '25%',
          top: '55%',
          width: '120px',
          height: '120px',
          background: colors.secondary,
          animation: 'silkShimmer 7s ease-in-out infinite 2s alternate',
        }}
      />
      <div
        className="silk-shimmer"
        style={{
          left: '50%',
          bottom: '20%',
          width: '180px',
          height: '180px',
          background: colors.tertiary,
          animation: 'silkShimmer 8s ease-in-out infinite 4s alternate',
        }}
      />
    </div>
  );
};
