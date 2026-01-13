import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';

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

  // Generate organic branch segments
  const branches = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    duration: Math.random() * 8 + 12,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
  }));

  // Generate leaf/bloom particles
  const blooms = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 8,
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
            opacity: 0.4;
          }
          100% {
            transform: scale(1, 1) rotate(5deg);
            opacity: 0.3;
          }
        }

        @keyframes branchSway {
          0%, 100% {
            transform: rotate(-2deg) translateY(0);
          }
          50% {
            transform: rotate(2deg) translateY(-5px);
          }
        }

        @keyframes bloomUnfurl {
          0%, 100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.7;
          }
        }

        @keyframes rootPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.25;
          }
        }

        @keyframes organicFlow {
          0%, 100% {
            transform: translateY(0) scaleY(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) scaleY(1.1);
            opacity: 0.35;
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
        }

        .branch {
          position: absolute;
          width: 2px;
          height: 60px;
          background: linear-gradient(180deg, currentColor, transparent);
          border-radius: 2px;
          transform-origin: bottom center;
          pointer-events: none;
          opacity: 0.3;
        }

        .bloom {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 8px currentColor;
        }

        .root-system {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 400px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(60px);
          opacity: 0.2;
          animation: rootPulse 8s ease-in-out infinite alternate;
        }

        .growth-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid currentColor;
          pointer-events: none;
          opacity: 0.15;
        }

        .organic-vein {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.2;
          transform-origin: left center;
          pointer-events: none;
          animation: organicFlow 6s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Root system glow */}
      <div
        className="root-system"
        style={{
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 40%, transparent 70%)`,
        }}
      />

      {/* Growth rings - concentric circles suggesting tree rings */}
      <div
        className="growth-ring"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          color: colors.primary,
          animation: 'rootPulse 10s ease-in-out infinite alternate',
        }}
      />
      <div
        className="growth-ring"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          color: colors.secondary,
          animation: 'rootPulse 12s ease-in-out infinite 1s alternate',
        }}
      />
      <div
        className="growth-ring"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          color: colors.tertiary,
          animation: 'rootPulse 14s ease-in-out infinite 2s alternate',
        }}
      />

      {/* Organic branches */}
      {branches.map((branch, index) => {
        const color = [colors.primary, colors.secondary, colors.tertiary, colors.small1][index % 4];

        return (
          <div
            key={branch.id}
            className="branch"
            style={{
              left: `${branch.startX}%`,
              top: `${branch.startY}%`,
              height: `${40 + branch.scale * 40}px`,
              color: color,
              animation: `branchGrow ${branch.duration}s ease-out ${branch.delay}s infinite alternate, branchSway 4s ease-in-out infinite alternate`,
              transform: `rotate(${branch.rotation}deg)`,
            }}
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
          width: '120px',
          transform: 'rotate(35deg)',
          color: colors.primary,
          animationDelay: '0s',
        }}
      />
      <div
        className="organic-vein"
        style={{
          left: '60%',
          top: '40%',
          width: '100px',
          transform: 'rotate(-25deg)',
          color: colors.secondary,
          animationDelay: '2s',
        }}
      />
      <div
        className="organic-vein"
        style={{
          left: '30%',
          top: '65%',
          width: '140px',
          transform: 'rotate(15deg)',
          color: colors.tertiary,
          animationDelay: '4s',
        }}
      />
      <div
        className="organic-vein"
        style={{
          left: '70%',
          top: '55%',
          width: '90px',
          transform: 'rotate(-45deg)',
          color: colors.small1,
          animationDelay: '1s',
        }}
      />
    </div>
  );
};
