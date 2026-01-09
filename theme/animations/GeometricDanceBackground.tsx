import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';

/**
 * Geometric Dance Background - For Philosophy story
 * Abstract geometric shapes that float and rotate
 * Represents the structure within improvisation, technique balanced with freedom
 */
export const GeometricDanceBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'bronze',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);

  return (
    <div className={`geometric-dance-background ${className}`}>
      <style>{`
        @keyframes geometricRotate1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(-40%, -60%) rotate(90deg) scale(1.3);
            opacity: 0.4;
          }
          50% {
            transform: translate(-60%, -40%) rotate(180deg) scale(0.9);
            opacity: 0.3;
          }
          75% {
            transform: translate(-50%, -55%) rotate(270deg) scale(1.15);
            opacity: 0.35;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
            opacity: 0.2;
          }
        }

        @keyframes geometricRotate2 {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) scale(1);
            opacity: 0.25;
          }
          33% {
            transform: translate(-55%, -45%) rotate(165deg) scale(1.2);
            opacity: 0.45;
          }
          66% {
            transform: translate(-45%, -55%) rotate(285deg) scale(0.95);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) rotate(405deg) scale(1);
            opacity: 0.25;
          }
        }

        @keyframes geometricFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.6;
          }
        }

        @keyframes geometricPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes lineStretch {
          0%, 100% {
            transform: scaleX(1) rotate(0deg);
            opacity: 0.15;
          }
          50% {
            transform: scaleX(1.5) rotate(5deg);
            opacity: 0.3;
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
        }

        .geometric-shape {
          position: absolute;
          pointer-events: none;
          border: 2px solid currentColor;
        }

        .geometric-circle {
          border-radius: 50%;
        }

        .geometric-triangle {
          width: 0;
          height: 0;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
          border-bottom: 86px solid currentColor;
          border-top: none;
          background: transparent;
        }

        .geometric-line {
          height: 2px;
          background: currentColor;
          border: none;
        }
      `}</style>

      {/* Large rotating circles */}
      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '30%',
          left: '25%',
          width: '200px',
          height: '200px',
          color: colors.primary,
          filter: 'blur(2px)',
          animation: 'geometricRotate1 24s linear infinite',
        }}
      />

      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '60%',
          right: '20%',
          width: '180px',
          height: '180px',
          color: colors.secondary,
          filter: 'blur(3px)',
          animation: 'geometricRotate2 20s linear infinite',
        }}
      />

      {/* Medium floating shapes */}
      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '45%',
          left: '60%',
          width: '120px',
          height: '120px',
          color: colors.tertiary,
          filter: 'blur(2px)',
          animation: 'geometricFloat 16s ease-in-out infinite',
        }}
      />

      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '20%',
          right: '30%',
          width: '100px',
          height: '100px',
          color: colors.small1,
          filter: 'blur(2.5px)',
          animation: 'geometricFloat 14s ease-in-out 2s infinite',
        }}
      />

      {/* Triangle shapes */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          color: colors.primary30,
          animation: 'geometricRotate1 28s linear infinite reverse',
        }}
      >
        <div className="geometric-triangle" style={{ filter: 'blur(3px)' }} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          color: colors.secondary30,
          animation: 'geometricRotate2 22s linear infinite',
        }}
      >
        <div className="geometric-triangle" style={{ filter: 'blur(2px)' }} />
      </div>

      {/* Geometric lines */}
      <div
        className="geometric-line"
        style={{
          top: '35%',
          left: '10%',
          width: '250px',
          color: colors.tertiary30,
          transformOrigin: 'center',
          animation: 'lineStretch 8s ease-in-out infinite',
        }}
      />

      <div
        className="geometric-line"
        style={{
          top: '65%',
          right: '10%',
          width: '200px',
          color: colors.small2,
          transformOrigin: 'center',
          animation: 'lineStretch 10s ease-in-out 2s infinite',
        }}
      />

      <div
        className="geometric-line"
        style={{
          top: '50%',
          left: '30%',
          width: '180px',
          color: colors.primary50,
          transformOrigin: 'center',
          transform: 'rotate(45deg)',
          animation: 'lineStretch 12s ease-in-out 4s infinite',
        }}
      />

      {/* Pulsing background shapes for depth */}
      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          color: colors.tertiary50,
          filter: 'blur(60px)',
          animation: 'geometricPulse 18s ease-in-out infinite',
        }}
      />

      <div
        className="geometric-shape geometric-circle"
        style={{
          top: '20%',
          left: '70%',
          width: '300px',
          height: '300px',
          color: colors.secondary50,
          filter: 'blur(70px)',
          animation: 'geometricPulse 22s ease-in-out 3s infinite',
        }}
      />
    </div>
  );
};
