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

  // Create multiple wave rings with staggered delays - ENHANCED
  const waveRings = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.3, // ENHANCED: was 0.6 - faster delays
  }));

  return (
    <div className={`heartbeat-pulse-background ${className}`}>
      <style>{`
        @keyframes heartbeatPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1; /* ENHANCED: was 0.8 */
          }
          50% {
            transform: translate(-50%, -50%) scale(2.0); /* ENHANCED: was 1.5 */
            opacity: 0.7; /* ENHANCED: was 0.4 */
          }
          100% {
            transform: translate(-50%, -50%) scale(3.5); /* ENHANCED: was 2.5 */
            opacity: 0;
          }
        }

        @keyframes rhythmBeat {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7; /* ENHANCED: was 0.3 */
          }
          12.5% {
            transform: scale(1.15); /* ENHANCED: was 1.05 */
            opacity: 0.9; /* ENHANCED: was 0.5 */
          }
          25% {
            transform: scale(1);
            opacity: 0.7;
          }
          37.5% {
            transform: scale(1.15);
            opacity: 0.9;
          }
          50% {
            transform: scale(1);
            opacity: 0.7;
          }
          62.5% {
            transform: scale(1.15);
            opacity: 0.9;
          }
          75% {
            transform: scale(1.3); /* ENHANCED: was 1.1 */
            opacity: 1; /* ENHANCED: was 0.6 */
          }
          87.5% {
            transform: scale(1);
            opacity: 0.7;
          }
        }

        @keyframes waveRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.85; /* ENHANCED: was 0.6 */
          }
          100% {
            transform: translate(-50%, -50%) scale(3.0); /* ENHANCED: was 2.2 */
            opacity: 0;
          }
        }

        @keyframes energyFlow {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0.6; /* ENHANCED: was 0.2 */
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg);
            opacity: 0.85; /* ENHANCED: was 0.4 */
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

      {/* Central pulsing core - ENHANCED */}
      <div
        className="pulse-center"
        style={{
          width: `${scale(150)}px`, /* ENHANCED: was 100px */
          height: `${scale(150)}px`,
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 50%, transparent 70%)`,
          filter: `blur(${scale(20)}px)`, /* ENHANCED: was 30px */
          animation: 'rhythmBeat 4s ease-in-out infinite alternate',
        }}
      />

      {/* Heartbeat pulse rings - emanating outward - ENHANCED */}
      {waveRings.map((ring) => (
        <div
          key={ring.id}
          className="pulse-ring"
          style={{
            width: `${scale(100)}px`,
            height: `${scale(100)}px`,
            border: `${scale(5)}px solid currentColor`, /* ENHANCED: was 3px */
            color: ring.id % 2 === 0 ? colors.primary : colors.secondary,
            animation: `heartbeatPulse 1.8s ease-out ${ring.delay}s infinite`, /* ENHANCED: was 3.6s */
            boxShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
          }}
        />
      ))}

      {/* Wave ripples - softer, larger rings - ENHANCED */}
      <div
        className="wave-ring"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          background: `radial-gradient(circle, transparent 40%, ${colors.tertiary} 50%, transparent 60%)`,
          animation: 'waveRipple 2s ease-out infinite', /* ENHANCED: was 4s */
        }}
      />

      <div
        className="wave-ring"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          background: `radial-gradient(circle, transparent 40%, ${colors.small1} 50%, transparent 60%)`,
          animation: 'waveRipple 2s ease-out 0.5s infinite', /* ENHANCED: was 4s 1s */
        }}
      />

      <div
        className="wave-ring"
        style={{
          width: `${scale(200)}px`,
          height: `${scale(200)}px`,
          background: `radial-gradient(circle, transparent 40%, ${colors.small2} 50%, transparent 60%)`,
          animation: 'waveRipple 2s ease-out 1s infinite', /* ENHANCED: was 4s 2s */
        }}
      />

      {/* Energy orbs rotating around center - ENHANCED */}
      <div
        className="energy-orb"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(300)}px`,
          height: `${scale(300)}px`,
          filter: `blur(${scale(25)}px)`, /* ENHANCED: was 40px */
          background: `radial-gradient(circle, ${colors.primary50} 0%, transparent 60%)`,
          animation: 'energyFlow 10s linear infinite', /* ENHANCED: was 20s */
        }}
      />

      <div
        className="energy-orb"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(350)}px`,
          height: `${scale(350)}px`,
          filter: `blur(${scale(25)}px)`, /* ENHANCED: was 40px */
          background: `radial-gradient(circle, ${colors.secondary50} 0%, transparent 60%)`,
          animation: 'energyFlow 8s linear infinite reverse', /* ENHANCED: was 16s */
        }}
      />

      <div
        className="energy-orb"
        style={{
          top: '50%',
          left: '50%',
          width: `${scale(280)}px`,
          height: `${scale(280)}px`,
          filter: `blur(${scale(25)}px)`, /* ENHANCED: was 40px */
          background: `radial-gradient(circle, ${colors.tertiary50} 0%, transparent 60%)`,
          animation: 'energyFlow 9s linear 1s infinite', /* ENHANCED: was 18s 2s */
        }}
      />

      {/* Accent glow spots - ENHANCED */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: `${scale(150)}px`,
          height: `${scale(150)}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary30} 0%, transparent 70%)`,
          filter: `blur(${scale(30)}px)`, /* ENHANCED: was 50px */
          opacity: 0.7, /* ENHANCED: was 0.4 */
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
          filter: `blur(${scale(35)}px)`, /* ENHANCED: was 60px */
          opacity: 0.7, /* ENHANCED: was 0.4 */
          animation: 'rhythmBeat 4s ease-in-out 1.5s infinite',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
