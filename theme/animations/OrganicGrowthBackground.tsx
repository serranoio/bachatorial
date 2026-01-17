import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Organic Growth Background - For Teaching Philosophy story
 * Branching tree-like structures that grow and extend organically
 * Represents nurturing, cultivation, and the growth of students
 */
export const OrganicGrowthBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'bronze',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  // Generate organic branch segments - REDUCED COUNT for less crowding
  const branches = Array.from({ length: 8 }, (_, i) => ({ // REDUCED: was 18
    id: i,
    delay: Math.random() * 1.5,
    duration: Math.random() * 4 + 6,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
  }));

  // Generate leaf/bloom particles - REDUCED COUNT for less crowding
  const blooms = Array.from({ length: 6 }, (_, i) => ({ // REDUCED: was 12
    id: i,
    size: scale(Math.random() * 12 + 8),
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  return (
    <div className={`organic-growth-background ${className}`}>
      <style>{`
        @keyframes branchGrow {
          0% {
            transform: scale(0, 0) rotate(0deg);
            opacity: 0;
          }
          30% {
            opacity: 0.7; /* ENHANCED: was 0.4 */
          }
          100% {
            transform: scale(1, 1) rotate(5deg);
            opacity: 0.65; /* ENHANCED: was 0.3 */
          }
        }

        @keyframes branchSway {
          0%, 100% {
            transform: rotate(-5deg) translateY(0); /* ENHANCED: was -2deg */
          }
          50% {
            transform: rotate(5deg) translateY(var(--sway-translate-y)); /* ENHANCED: was 2deg */
          }
        }

        @keyframes bloomUnfurl {
          0%, 100% {
            transform: scale(1.2) rotate(0deg); /* ENHANCED: was 0.8 */
            opacity: 0.6; /* ENHANCED: was 0.3 */
          }
          50% {
            transform: scale(1.8) rotate(180deg); /* ENHANCED: was 1.2 */
            opacity: 0.85; /* ENHANCED: was 0.7 */
          }
        }

        @keyframes rootPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5; /* ENHANCED: was 0.15 */
          }
          50% {
            transform: scale(1.5); /* ENHANCED: was 1.3 */
            opacity: 0.7; /* ENHANCED: was 0.25 */
          }
        }

        @keyframes organicFlow {
          0%, 100% {
            transform: translateY(0) scaleY(1);
            opacity: 0.5; /* ENHANCED: was 0.2 */
          }
          50% {
            transform: translateY(var(--flow-translate-y)) scaleY(1.25); /* ENHANCED: was 1.1 */
            opacity: 0.75; /* ENHANCED: was 0.35 */
          }
        }

        .organic-growth-background {
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

        .branch {
          position: absolute;
          width: ${scale(4)}px; /* ENHANCED: was 2px - DOUBLED */
          background: linear-gradient(180deg, currentColor, transparent);
          border-radius: ${scale(4)}px;
          transform-origin: bottom center;
          pointer-events: none;
          opacity: 0.65; /* ENHANCED: was 0.3 */
          box-shadow: 0 0 ${scale(10)}px currentColor; /* ENHANCED: added moderate glow */
          /* GPU acceleration and gradient smoothing */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .bloom {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 ${scale(15)}px currentColor, 0 0 ${scale(30)}px currentColor; /* ENHANCED: was 8px - better glow */
          /* GPU acceleration and gradient smoothing */
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          isolation: isolate;
        }

        .root-system {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.5; /* ENHANCED: was 0.2 */
          animation: rootPulse 6s ease-in-out infinite alternate; /* ENHANCED: was 8s */
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }

        .growth-ring {
          position: absolute;
          border-radius: 50%;
          border: 3px solid currentColor; /* ENHANCED: was 1px */
          pointer-events: none;
          opacity: 0.55; /* ENHANCED: was 0.15 */
          box-shadow: 0 0 ${scale(12)}px currentColor; /* ENHANCED: added moderate glow */
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .organic-vein {
          position: absolute;
          height: 3px; /* ENHANCED: was 1px */
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.6; /* ENHANCED: was 0.2 */
          transform-origin: left center;
          pointer-events: none;
          animation: organicFlow 4s ease-in-out infinite alternate; /* ENHANCED: was 6s */
          box-shadow: 0 0 ${scale(10)}px currentColor; /* ENHANCED: added moderate glow */
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Root system glow - ENHANCED */}
      <div
        className="root-system"
        style={{
          width: `${scale(450)}px`, /* ENHANCED: was 400px */
          height: `${scale(450)}px`,
          filter: `blur(${scale(40)}px)`, /* ENHANCED: was 60px - moderate blur */
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 40%, transparent 70%)`,
        }}
      />

      {/* Growth rings - concentric circles suggesting tree rings - ENHANCED */}
      <div
        className="growth-ring"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          color: colors.primary,
          animation: 'rootPulse 7s ease-in-out infinite alternate', /* ENHANCED: was 10s */
        }}
      />
      <div
        className="growth-ring"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          color: colors.secondary,
          animation: 'rootPulse 8s ease-in-out infinite 0.5s alternate', /* ENHANCED: was 12s 1s */
        }}
      />
      <div
        className="growth-ring"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${scale(400)}px`,
          height: `${scale(400)}px`,
          color: colors.tertiary,
          animation: 'rootPulse 9s ease-in-out infinite 1s alternate', /* ENHANCED: was 14s 2s */
        }}
      />

      {/* Organic branches - ENHANCED */}
      {branches.map((branch, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1][index % 4];

        return (
          <div
            key={branch.id}
            className="branch"
            style={{
              left: `${branch.startX}%`,
              top: `${branch.startY}%`,
              height: `${scale(50 + branch.scale * 50)}px`, /* ENHANCED: was 40+40 - 25% larger */
              color: color,
              animation: `branchGrow ${branch.duration}s ease-out ${branch.delay}s infinite alternate, branchSway 3s ease-in-out infinite alternate`, /* ENHANCED: sway was 4s */
              transform: `rotate(${branch.rotation}deg)`,
              '--sway-translate-y': `${scale(-10)}px`, /* ENHANCED: was -5px */
            } as React.CSSProperties}
          />
        );
      })}

      {/* Blooming particles */}
      {blooms.map((bloom, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1, colors.small2][index % 5];

        return (
          <div
            key={bloom.id}
            className="bloom"
            style={{
              left: `${bloom.startX}%`,
              top: `${bloom.startY}%`,
              width: `${bloom.size}px`,
              height: `${bloom.size}px`,
              backgroundColor: color,
              color: color,
              animation: `bloomUnfurl ${bloom.duration}s ease-in-out ${bloom.delay}s infinite alternate`,
            }}
          />
        );
      })}

      {/* Organic veins/connections */}
      <div
        className="organic-vein"
        style={{
          left: '15%',
          top: '25%',
          width: `${scale(120)}px`,
          transform: 'rotate(35deg)',
          color: colors.primary,
          animationDelay: '0s',
          '--flow-translate-y': `${scale(-20)}px`,
        } as React.CSSProperties}
      />
      <div
        className="organic-vein"
        style={{
          left: '60%',
          top: '40%',
          width: `${scale(100)}px`,
          transform: 'rotate(-25deg)',
          color: colors.secondary,
          animationDelay: '2s',
          '--flow-translate-y': `${scale(-20)}px`,
        } as React.CSSProperties}
      />
      <div
        className="organic-vein"
        style={{
          left: '30%',
          top: '65%',
          width: `${scale(140)}px`,
          transform: 'rotate(15deg)',
          color: colors.tertiary,
          animationDelay: '4s',
          '--flow-translate-y': `${scale(-20)}px`,
        } as React.CSSProperties}
      />
      <div
        className="organic-vein"
        style={{
          left: '70%',
          top: '55%',
          width: `${scale(90)}px`,
          transform: 'rotate(-45deg)',
          color: colors.small1,
          animationDelay: '1s',
          '--flow-translate-y': `${scale(-20)}px`,
        } as React.CSSProperties}
      />
    </div>
  );
};
