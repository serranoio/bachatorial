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

  // Generate particle positions and animations - ENHANCED for visibility
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: scale(Math.random() * 6 + 5), // BALANCED: was 12+8 (too big), now smaller
    delay: Math.random() * 4, // BALANCED: was 3, slowing down further
    duration: Math.random() * 10 + 15, // BALANCED: was 8+12 (too fast), now slower
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  return (
    <div
      className={`particle-constellation-background ${className}`}
      style={{
        // @ts-ignore - CSS custom properties - EXPANDED movement ranges (2-3x larger)
        '--orbit1-x1': `${scale(120)}px`, // Was 40px
        '--orbit1-y1': `${scale(-90)}px`, // Was -30px
        '--orbit1-x2': `${scale(60)}px`, // Was 20px
        '--orbit1-y2': `${scale(150)}px`, // Was 50px
        '--orbit1-x3': `${scale(-90)}px`, // Was -30px
        '--orbit1-y3': `${scale(60)}px`, // Was 20px
        '--orbit2-x1': `${scale(-105)}px`, // Was -35px
        '--orbit2-y1': `${scale(120)}px`, // Was 40px
        '--orbit2-x2': `${scale(75)}px`, // Was 25px
        '--orbit2-y2': `${scale(-75)}px`, // Was -25px
        '--orbit3-x1': `${scale(135)}px`, // Was 45px
        '--orbit3-y1': `${scale(105)}px`, // Was 35px
        '--orbit3-x2': `${scale(-60)}px`, // Was -20px
        '--orbit3-y2': `${scale(-120)}px`, // Was -40px
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes particleOrbit1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.7; /* ENHANCED: was 0.3 */
          }
          25% {
            transform: translate(var(--orbit1-x1), var(--orbit1-y1));
            opacity: 1; /* ENHANCED: was 0.8 */
          }
          50% {
            transform: translate(var(--orbit1-x2), var(--orbit1-y2));
            opacity: 0.85; /* ENHANCED: was 0.6 */
          }
          75% {
            transform: translate(var(--orbit1-x3), var(--orbit1-y3));
            opacity: 0.9; /* ENHANCED: was 0.7 */
          }
        }

        @keyframes particleOrbit2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.75; /* ENHANCED: was 0.4 */
          }
          33% {
            transform: translate(var(--orbit2-x1), var(--orbit2-y1));
            opacity: 0.95; /* ENHANCED: was 0.75 */
          }
          66% {
            transform: translate(var(--orbit2-x2), var(--orbit2-y2));
            opacity: 0.85; /* ENHANCED: was 0.65 */
          }
        }

        @keyframes particleOrbit3 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.7; /* ENHANCED: was 0.35 */
          }
          40% {
            transform: translate(var(--orbit3-x1), var(--orbit3-y1));
            opacity: 1; /* ENHANCED: was 0.8 */
          }
          80% {
            transform: translate(var(--orbit3-x2), var(--orbit3-y2));
            opacity: 0.9; /* ENHANCED: was 0.7 */
          }
        }

        @keyframes particlePulse {
          0%, 100% {
            transform: scale(1.2); /* ENHANCED: was 1 */
            opacity: 0.8; /* ENHANCED: was 0.6 */
          }
          50% {
            transform: scale(2.2); /* ENHANCED: was 1.5 */
            opacity: 1;
          }
        }

        @keyframes constellationGlow {
          0%, 100% {
            opacity: 0.5; /* ENHANCED: was 0.2 */
          }
          50% {
            opacity: 0.8; /* ENHANCED: was 0.4 */
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
          /* GPU acceleration */
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; /* ENHANCED: stronger glow */
          /* GPU acceleration */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .constellation-line {
          position: absolute;
          height: 3px; /* ENHANCED: was 1px */
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.5; /* ENHANCED: was 0.15 */
          transform-origin: left center;
          pointer-events: none;
          animation: constellationGlow 4s ease-in-out infinite alternate;
          /* GPU acceleration */
          will-change: opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .central-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.7; /* ENHANCED: was 0.3 */
          /* GPU acceleration */
          will-change: filter, opacity;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Central glow - ENHANCED */}
      <div
        className="central-glow"
        style={{
          width: `${scale(400)}px`, /* ENHANCED: was 300px */
          height: `${scale(400)}px`, /* ENHANCED: was 300px */
          filter: `blur(${scale(40)}px)`, /* ENHANCED: was 80px - less blur for more definition */
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 50%, transparent 70%)`,
        }}
      />

      {/* Particles - ENHANCED */}
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
              animation: `${orbitAnimation} ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate, particlePulse 3.5s ease-in-out infinite alternate`, /* BALANCED: pulse was 2.5s (still too fast), now 3.5s for slower pulse */
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
