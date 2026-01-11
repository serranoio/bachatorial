import React from 'react';

export const GlobalAnimatedBackground: React.FC = () => {
  return (
    <>
      <style>{`
        .global-animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
        }

        .global-glow-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        /* Glow orb animations */
        @keyframes moveGlow1 {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
            opacity: 0.31;
          }
          25% {
            transform: translate(30%, -20%) scale(1.3);
            opacity: 0.44;
          }
          50% {
            transform: translate(-20%, 40%) scale(0.9);
            opacity: 0.38;
          }
          75% {
            transform: translate(40%, 30%) scale(1.15);
            opacity: 0.35;
          }
        }

        @keyframes moveGlow2 {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
            opacity: 0.29;
          }
          33% {
            transform: translate(-40%, 30%) scale(1.25);
            opacity: 0.41;
          }
          66% {
            transform: translate(20%, -30%) scale(0.85);
            opacity: 0.31;
          }
        }

        @keyframes moveGlow3 {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
            opacity: 0.25;
          }
          40% {
            transform: translate(25%, 35%) scale(1.4);
            opacity: 0.38;
          }
          80% {
            transform: translate(-30%, -20%) scale(0.95);
            opacity: 0.29;
          }
        }
      `}</style>

      <div className="global-animated-background">
        {/* Moving glow orbs - Layer 1 (Coral glow) */}
        <div
          className="global-glow-orb"
          style={{
            top: '20%',
            left: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255, 155, 127, 0.38) 0%, rgba(255, 155, 127, 0.23) 30%, rgba(255, 155, 127, 0.13) 50%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'moveGlow1 20s ease-in-out infinite'
          }}
        />

        {/* Moving glow orbs - Layer 2 (Golden glow) */}
        <div
          className="global-glow-orb"
          style={{
            top: '50%',
            right: '15%',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(232, 212, 168, 0.35) 0%, rgba(232, 212, 168, 0.19) 30%, rgba(232, 212, 168, 0.1) 50%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'moveGlow2 18s ease-in-out infinite'
          }}
        />

        {/* Moving glow orbs - Layer 3 (Bronze glow) */}
        <div
          className="global-glow-orb"
          style={{
            bottom: '20%',
            left: '25%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(212, 165, 116, 0.31) 0%, rgba(212, 165, 116, 0.18) 30%, rgba(212, 165, 116, 0.08) 50%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'moveGlow3 22s ease-in-out infinite'
          }}
        />

        {/* Additional smaller moving glows for depth */}
        <div
          className="global-glow-orb"
          style={{
            top: '60%',
            left: '5%',
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(255, 180, 150, 0.29) 0%, rgba(255, 180, 150, 0.16) 40%, transparent 60%)',
            filter: 'blur(45px)',
            animation: 'moveGlow1 16s ease-in-out infinite reverse'
          }}
        />

        <div
          className="global-glow-orb"
          style={{
            top: '10%',
            right: '8%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(220, 190, 140, 0.25) 0%, rgba(220, 190, 140, 0.14) 40%, transparent 60%)',
            filter: 'blur(55px)',
            animation: 'moveGlow2 24s ease-in-out infinite reverse'
          }}
        />
      </div>
    </>
  );
};
