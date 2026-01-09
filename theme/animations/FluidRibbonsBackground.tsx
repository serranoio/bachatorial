import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';

/**
 * Fluid Dance Ribbons Background - For Dance Videos story
 * Flowing, silk-like ribbons that elegantly swirl and dance across the card
 * Mimics the fluid movements of bachata dancers
 */
export const FluidRibbonsBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'coral',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);

  return (
    <div className={`fluid-ribbons-background ${className}`}>
      <style>{`
        @keyframes ribbonFlow1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scaleX(1) scaleY(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(-30%, -40%) rotate(90deg) scaleX(1.4) scaleY(0.8);
            opacity: 0.8;
          }
          50% {
            transform: translate(-20%, -60%) rotate(180deg) scaleX(1.1) scaleY(1.3);
            opacity: 0.7;
          }
          75% {
            transform: translate(-40%, -45%) rotate(270deg) scaleX(0.9) scaleY(1.1);
            opacity: 0.75;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scaleX(1) scaleY(1);
            opacity: 0.6;
          }
        }

        @keyframes ribbonFlow2 {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) scaleX(1) scaleY(1.2);
            opacity: 0.5;
          }
          30% {
            transform: translate(-60%, -30%) rotate(135deg) scaleX(1.3) scaleY(0.9);
            opacity: 0.7;
          }
          60% {
            transform: translate(-40%, -70%) rotate(225deg) scaleX(0.95) scaleY(1.4);
            opacity: 0.6;
          }
          90% {
            transform: translate(-55%, -40%) rotate(315deg) scaleX(1.2) scaleY(1);
            opacity: 0.65;
          }
          100% {
            transform: translate(-50%, -50%) rotate(405deg) scaleX(1) scaleY(1.2);
            opacity: 0.5;
          }
        }

        @keyframes ribbonFlow3 {
          0% {
            transform: translate(-50%, -50%) rotate(90deg) scaleX(1.1) scaleY(1);
            opacity: 0.55;
          }
          33% {
            transform: translate(-35%, -55%) rotate(180deg) scaleX(0.85) scaleY(1.35);
            opacity: 0.75;
          }
          66% {
            transform: translate(-65%, -40%) rotate(270deg) scaleX(1.25) scaleY(0.95);
            opacity: 0.65;
          }
          100% {
            transform: translate(-50%, -50%) rotate(450deg) scaleX(1.1) scaleY(1);
            opacity: 0.55;
          }
        }

        @keyframes ribbonWave {
          0%, 100% {
            transform: translateY(0%) scaleY(1);
          }
          50% {
            transform: translateY(-10%) scaleY(1.1);
          }
        }

        .fluid-ribbons-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${baseGradient};
          background-size: 400% 400%;
          overflow: hidden;
        }

        .ribbon {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          mix-blend-mode: screen;
        }

        .ribbon-wave {
          animation: ribbonWave 4s ease-in-out infinite;
        }
      `}</style>

      {/* Main flowing ribbon */}
      <div
        className="ribbon"
        style={{
          width: '120%',
          height: '40%',
          background: `linear-gradient(90deg, transparent 0%, ${colors.primary} 20%, ${colors.primary30} 50%, ${colors.primary} 80%, transparent 100%)`,
          animation: 'ribbonFlow1 20s ease-in-out infinite',
        }}
      />

      {/* Secondary ribbon */}
      <div
        className="ribbon"
        style={{
          width: '100%',
          height: '35%',
          background: `linear-gradient(90deg, transparent 0%, ${colors.secondary} 15%, ${colors.secondary30} 50%, ${colors.secondary} 85%, transparent 100%)`,
          animation: 'ribbonFlow2 18s ease-in-out infinite',
        }}
      />

      {/* Tertiary ribbon */}
      <div
        className="ribbon"
        style={{
          width: '110%',
          height: '45%',
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 25%, ${colors.tertiary30} 50%, ${colors.tertiary} 75%, transparent 100%)`,
          animation: 'ribbonFlow3 22s ease-in-out infinite',
        }}
      />

      {/* Accent wave ribbons for depth */}
      <div
        className="ribbon ribbon-wave"
        style={{
          width: '80%',
          height: '25%',
          top: '30%',
          background: `radial-gradient(ellipse, ${colors.small1} 0%, ${colors.small1_40} 40%, transparent 70%)`,
          animation: 'ribbonFlow1 16s ease-in-out infinite reverse, ribbonWave 4s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />

      <div
        className="ribbon ribbon-wave"
        style={{
          width: '85%',
          height: '30%',
          top: '60%',
          background: `radial-gradient(ellipse, ${colors.small2} 0%, ${colors.small2_40} 40%, transparent 70%)`,
          animation: 'ribbonFlow2 24s ease-in-out infinite reverse, ribbonWave 5s ease-in-out infinite',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
};
