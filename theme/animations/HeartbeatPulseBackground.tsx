import React from 'react';
import { AnimatedBackgroundProps } from './shared/types';
import { getColorPalette, baseGradient } from './shared/animationUtils';
import { useProportionalSizing } from '../contexts/ProportionalSizingContext';

/**
 * Heartbeat Pulse Background - For Reps story
 * Rhythmic pulses emanating from the center
 * Synchronized to bachata's 4-beat pattern, represents practice and rhythm
 */
export const HeartbeatPulseBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'gold-peachy',
  className = '',
}) => {
  const colors = getColorPalette(accentColor);
  const { scale } = useProportionalSizing();

  // Create multiple wave rings with staggered delays
  const waveRings = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.6, // Staggered delays for wave effect
  }));

  return (
    <div className={`heartbeat-pulse-background ${className}`}>
      <style>{`
        @keyframes heartbeatPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }

        @keyframes rhythmBeat {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          12.5% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          25% {
            transform: scale(1);
            opacity: 0.3;
          }
          37.5% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 0.3;
          }
          62.5% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          75% {
            transform: scale(1.1);
            opacity: 0.6;
          }
          87.5% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        @keyframes waveRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }

        @keyframes energyFlow {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg);
            opacity: 0.4;
          }
        }

        .heartbeat-pulse-background {
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

        .pulse-center {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .wave-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .energy-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          /* GPU acceleration */
          will-change: transform, filter, opacity;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Central pulsing core */}
      <div
        className="pulse-center"
        style={{
          width: `${scale(100)}px`,
          height: `${scale(100)}px`,
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 50%, transparent 70%)`,
          filter: `blur(${scale(30)}px)`,
          animation: 'rhythmBeat 4s ease-in-out infinite alternate',
        }}
      />

      {/* Heartbeat pulse rings - emanating outward */}
      {waveRings.map((ring) => (
        <div
          key={ring.id}
          className="pulse-ring"
          style={{
            width: `${scale(100)}px`,
            height: `${scale(100)}px`,
            border: `${scale(3)}px solid currentColor`,
            color: ring.id % 2 === 0 ? colors.primary : colors.secondary,
            animation: `heartbeatPulse 3.6s ease-out ${ring.delay}s infinite`,
          }}
        />
      ))}

      {/* Wave ripples - softer, larger rings */}
      <div
        className="wave-ring"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          background: `radial-gradient(circle, transparent 40%, ${colors.tertiary} 50%, transparent 60%)`,
          animation: 'waveRipple 4s ease-out infinite',
        }}
      />

      <div
        className="wave-ring"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          background: `radial-gradient(circle, transparent 40%, ${colors.small1} 50%, transparent 60%)`,
          animation: 'waveRipple 4s ease-out 1s infinite',
        }}
      />

      <div
        className="wave-ring"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          background: `radial-gradient(circle, transparent 40%, ${colors.small2} 50%, transparent 60%)`,
          animation: 'waveRipple 4s ease-out 2s infinite',
        }}
      />

      {/* Energy orbs rotating around center */}
      <div
        className="energy-orb"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          filter: `blur(${scale(40)}px)`,
          background: `radial-gradient(circle, ${colors.primary50} 0%, transparent 60%)`,
          animation: 'energyFlow 20s linear infinite',
        }}
      />

      <div
        className="energy-orb"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(350)}px`,
          height: `${scale(350)}px`,
          filter: `blur(${scale(40)}px)`,
          background: `radial-gradient(circle, ${colors.secondary50} 0%, transparent 60%)`,
          animation: 'energyFlow 16s linear infinite reverse',
        }}
      />

      <div
        className="energy-orb"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(280)}px`,
          height: `${scale(280)}px`,
          filter: `blur(${scale(40)}px)`,
          background: `radial-gradient(circle, ${colors.tertiary50} 0%, transparent 60%)`,
          animation: 'energyFlow 18s linear 2s infinite',
        }}
      />

      {/* Accent glow spots */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: `${scale(150)}px`,
          height: `${scale(150)}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary30} 0%, transparent 70%)`,
          filter: `blur(${scale(50)}px)`,
          opacity: 0.4,
          animation: 'rhythmBeat 4s ease-in-out 0.5s infinite',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '25%',
          width: `${scale(180)}px`,
          height: `${scale(180)}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary30} 0%, transparent 70%)`,
          filter: `blur(${scale(60)}px)`,
          opacity: 0.4,
          animation: 'rhythmBeat 4s ease-in-out 1.5s infinite',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
