import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';

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

  // Generate bokeh orbs with varying sizes and depths
  const bokehOrbs = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: Math.random() * 120 + 80,
    blur: Math.random() * 40 + 60,
    delay: Math.random() * 6,
    duration: Math.random() * 12 + 20,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    zIndex: Math.floor(Math.random() * 3),
  }));

  return (
    <div className={`bokeh-light-background ${className}`}>
      <style>{`
        @keyframes bokehFloat1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(30px, -40px) scale(1.2);
            opacity: 0.65;
          }
          50% {
            transform: translate(-20px, 30px) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translate(40px, 20px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes bokehFloat2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          30% {
            transform: translate(-35px, 45px) scale(1.15);
            opacity: 0.6;
          }
          60% {
            transform: translate(25px, -30px) scale(0.85);
            opacity: 0.45;
          }
          90% {
            transform: translate(-15px, -20px) scale(1.05);
            opacity: 0.55;
          }
        }

        @keyframes bokehFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          35% {
            transform: translate(45px, 35px) scale(1.25);
            opacity: 0.7;
          }
          70% {
            transform: translate(-30px, -35px) scale(0.95);
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
        }

        .bokeh-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
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
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 60%)`,
          filter: 'blur(70px)',
          animation: 'bokehTwinkle 4s ease-in-out infinite alternate, bokehFloat1 18s ease-in-out infinite alternate',
        }}
      />

      <div
        className="bokeh-orb bokeh-layer-2"
        style={{
          right: '20%',
          bottom: '25%',
          width: '180px',
          height: '180px',
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 60%)`,
          filter: 'blur(80px)',
          animation: 'bokehTwinkle 5s ease-in-out 1s infinite alternate, bokehFloat2 22s ease-in-out infinite alternate',
        }}
      />

      <div
        className="bokeh-orb bokeh-layer-1"
        style={{
          left: '60%',
          top: '50%',
          width: '120px',
          height: '120px',
          background: `radial-gradient(circle, ${colors.tertiary} 0%, transparent 60%)`,
          filter: 'blur(65px)',
          animation: 'bokehTwinkle 3.5s ease-in-out 2s infinite alternate, bokehFloat3 20s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};
