import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Particle Constellation Background - For Welcome story
 * Particles that form abstract shapes and gently orbit
 * Represents connection and welcoming energy in dance
 */
export const ParticleConstellationBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'gold',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  // Generate particle positions and animations
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: scale(Math.random() * 8 + 4),
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  return (
    <div
      className={`particle-constellation-background ${className}`}
      style={{
        // @ts-ignore - CSS custom properties
        '--orbit1-x1': `${scale(40)}px`,
        '--orbit1-y1': `${scale(-30)}px`,
        '--orbit1-x2': `${scale(20)}px`,
        '--orbit1-y2': `${scale(50)}px`,
        '--orbit1-x3': `${scale(-30)}px`,
        '--orbit1-y3': `${scale(20)}px`,
        '--orbit2-x1': `${scale(-35)}px`,
        '--orbit2-y1': `${scale(40)}px`,
        '--orbit2-x2': `${scale(25)}px`,
        '--orbit2-y2': `${scale(-25)}px`,
        '--orbit3-x1': `${scale(45)}px`,
        '--orbit3-y1': `${scale(35)}px`,
        '--orbit3-x2': `${scale(-20)}px`,
        '--orbit3-y2': `${scale(-40)}px`,
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes particleOrbit1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate(var(--orbit1-x1), var(--orbit1-y1));
            opacity: 0.8;
          }
          50% {
            transform: translate(var(--orbit1-x2), var(--orbit1-y2));
            opacity: 0.6;
          }
          75% {
            transform: translate(var(--orbit1-x3), var(--orbit1-y3));
            opacity: 0.7;
          }
        }

        @keyframes particleOrbit2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          33% {
            transform: translate(var(--orbit2-x1), var(--orbit2-y1));
            opacity: 0.75;
          }
          66% {
            transform: translate(var(--orbit2-x2), var(--orbit2-y2));
            opacity: 0.65;
          }
        }

        @keyframes particleOrbit3 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.35;
          }
          40% {
            transform: translate(var(--orbit3-x1), var(--orbit3-y1));
            opacity: 0.8;
          }
          80% {
            transform: translate(var(--orbit3-x2), var(--orbit3-y2));
            opacity: 0.7;
          }
        }

        @keyframes particlePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        @keyframes constellationGlow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .particle-constellation-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${baseGradient};
          overflow: hidden;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }

        .constellation-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.15;
          transform-origin: left center;
          pointer-events: none;
          animation: constellationGlow 4s ease-in-out infinite alternate;
        }

        .central-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.3;
        }
      `}</style>

      {/* Central glow */}
      <div
        className="central-glow"
        style={{
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          filter: `blur(${scale(80)}px)`,
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 50%, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {particles.map((particle, index) => {
        const orbitAnimation = ['particleOrbit1', 'particleOrbit2', 'particleOrbit3'][index % 3];
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1][index % 4];

        return (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: color,
              color: color,
              animation: `${orbitAnimation} ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate, particlePulse 3s ease-in-out infinite alternate`,
            }}
          />
        );
      })}

      {/* Constellation connection lines */}
      <div
        className="constellation-line"
        style={{
          left: '20%',
          top: '30%',
          width: `${scale(150)}px`,
          transform: 'rotate(25deg)',
          color: colors.primary,
        }}
      />
      <div
        className="constellation-line"
        style={{
          left: '50%',
          top: '45%',
          width: `${scale(120)}px`,
          transform: 'rotate(-45deg)',
          color: colors.secondary,
        }}
      />
      <div
        className="constellation-line"
        style={{
          left: '65%',
          top: '25%',
          width: `${scale(100)}px`,
          transform: 'rotate(60deg)',
          color: colors.tertiary,
        }}
      />
      <div
        className="constellation-line"
        style={{
          left: '30%',
          top: '60%',
          width: `${scale(140)}px`,
          transform: 'rotate(-15deg)',
          color: colors.small1,
        }}
      />
      <div
        className="constellation-line"
        style={{
          left: '70%',
          top: '70%',
          width: `${scale(90)}px`,
          transform: 'rotate(35deg)',
          color: colors.small2,
        }}
      />
    </div>
  );
};
