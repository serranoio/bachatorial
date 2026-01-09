import React from 'react';

export type AccentColor = 'coral' | 'gold' | 'peach' | 'bronze' | 'gold-peachy';

interface AnimatedBackgroundProps {
  accentColor?: AccentColor;
  className?: string;
}

const getGlowColors = (accent: AccentColor) => {
  switch (accent) {
    case 'coral':
      return {
        primary: 'rgba(255, 155, 127, 0.38)',
        primary30: 'rgba(255, 155, 127, 0.23)',
        primary50: 'rgba(255, 155, 127, 0.13)',
        secondary: 'rgba(232, 212, 168, 0.35)',
        secondary30: 'rgba(232, 212, 168, 0.19)',
        secondary50: 'rgba(232, 212, 168, 0.1)',
        tertiary: 'rgba(212, 165, 116, 0.31)',
        tertiary30: 'rgba(212, 165, 116, 0.18)',
        tertiary50: 'rgba(212, 165, 116, 0.08)',
        small1: 'rgba(255, 180, 150, 0.29)',
        small1_40: 'rgba(255, 180, 150, 0.16)',
        small2: 'rgba(220, 190, 140, 0.25)',
        small2_40: 'rgba(220, 190, 140, 0.14)',
      };
    case 'gold':
      return {
        primary: 'rgba(232, 212, 168, 0.38)',
        primary30: 'rgba(232, 212, 168, 0.23)',
        primary50: 'rgba(232, 212, 168, 0.13)',
        secondary: 'rgba(255, 228, 184, 0.35)',
        secondary30: 'rgba(255, 228, 184, 0.19)',
        secondary50: 'rgba(255, 228, 184, 0.1)',
        tertiary: 'rgba(193, 154, 107, 0.31)',
        tertiary30: 'rgba(193, 154, 107, 0.18)',
        tertiary50: 'rgba(193, 154, 107, 0.08)',
        small1: 'rgba(212, 165, 116, 0.29)',
        small1_40: 'rgba(212, 165, 116, 0.16)',
        small2: 'rgba(197, 168, 122, 0.25)',
        small2_40: 'rgba(197, 168, 122, 0.14)',
      };
    case 'peach':
      return {
        primary: 'rgba(255, 180, 150, 0.38)',
        primary30: 'rgba(255, 180, 150, 0.23)',
        primary50: 'rgba(255, 180, 150, 0.13)',
        secondary: 'rgba(255, 155, 127, 0.35)',
        secondary30: 'rgba(255, 155, 127, 0.19)',
        secondary50: 'rgba(255, 155, 127, 0.1)',
        tertiary: 'rgba(232, 212, 168, 0.31)',
        tertiary30: 'rgba(232, 212, 168, 0.18)',
        tertiary50: 'rgba(232, 212, 168, 0.08)',
        small1: 'rgba(220, 190, 140, 0.29)',
        small1_40: 'rgba(220, 190, 140, 0.16)',
        small2: 'rgba(212, 165, 116, 0.25)',
        small2_40: 'rgba(212, 165, 116, 0.14)',
      };
    case 'bronze':
      return {
        primary: 'rgba(212, 165, 116, 0.38)',
        primary30: 'rgba(212, 165, 116, 0.23)',
        primary50: 'rgba(212, 165, 116, 0.13)',
        secondary: 'rgba(193, 154, 107, 0.35)',
        secondary30: 'rgba(193, 154, 107, 0.19)',
        secondary50: 'rgba(193, 154, 107, 0.1)',
        tertiary: 'rgba(232, 212, 168, 0.31)',
        tertiary30: 'rgba(232, 212, 168, 0.18)',
        tertiary50: 'rgba(232, 212, 168, 0.08)',
        small1: 'rgba(197, 168, 122, 0.29)',
        small1_40: 'rgba(197, 168, 122, 0.16)',
        small2: 'rgba(220, 190, 140, 0.25)',
        small2_40: 'rgba(220, 190, 140, 0.14)',
      };
    case 'gold-peachy':
      return {
        primary: 'rgba(220, 190, 140, 0.38)',
        primary30: 'rgba(220, 190, 140, 0.23)',
        primary50: 'rgba(220, 190, 140, 0.13)',
        secondary: 'rgba(232, 212, 168, 0.35)',
        secondary30: 'rgba(232, 212, 168, 0.19)',
        secondary50: 'rgba(232, 212, 168, 0.1)',
        tertiary: 'rgba(255, 180, 150, 0.31)',
        tertiary30: 'rgba(255, 180, 150, 0.18)',
        tertiary50: 'rgba(255, 180, 150, 0.08)',
        small1: 'rgba(212, 165, 116, 0.29)',
        small1_40: 'rgba(212, 165, 116, 0.16)',
        small2: 'rgba(197, 168, 122, 0.25)',
        small2_40: 'rgba(197, 168, 122, 0.14)',
      };
  }
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  accentColor = 'gold',
  className = '',
}) => {
  const colors = getGlowColors(accentColor);

  return (
    <div className={`animated-background ${className}`}>
      <style>{`
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

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animated-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #151515 0%, #1A1A1A 25%, #181818 50%, #1A1A1A 75%, #151515 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          overflow: hidden;
        }

        .animated-background-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      {/* Moving glow orbs - Layer 1 */}
      <div
        className="animated-background-glow"
        style={{
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.primary30} 30%, ${colors.primary50} 50%, transparent 70%)`,
          filter: 'blur(60px)',
          zIndex: 0,
          animation: 'moveGlow1 20s ease-in-out infinite',
        }}
      />

      {/* Moving glow orbs - Layer 2 */}
      <div
        className="animated-background-glow"
        style={{
          top: '50%',
          right: '15%',
          width: '450px',
          height: '450px',
          background: `radial-gradient(circle, ${colors.secondary} 0%, ${colors.secondary30} 30%, ${colors.secondary50} 50%, transparent 70%)`,
          filter: 'blur(50px)',
          zIndex: 0,
          animation: 'moveGlow2 18s ease-in-out infinite',
        }}
      />

      {/* Moving glow orbs - Layer 3 */}
      <div
        className="animated-background-glow"
        style={{
          bottom: '20%',
          left: '25%',
          width: '550px',
          height: '550px',
          background: `radial-gradient(circle, ${colors.tertiary} 0%, ${colors.tertiary30} 30%, ${colors.tertiary50} 50%, transparent 70%)`,
          filter: 'blur(70px)',
          zIndex: 0,
          animation: 'moveGlow3 22s ease-in-out infinite',
        }}
      />

      {/* Additional smaller moving glows for depth */}
      <div
        className="animated-background-glow"
        style={{
          top: '60%',
          left: '5%',
          width: '350px',
          height: '350px',
          background: `radial-gradient(circle, ${colors.small1} 0%, ${colors.small1_40} 40%, transparent 60%)`,
          filter: 'blur(45px)',
          zIndex: 0,
          animation: 'moveGlow1 16s ease-in-out infinite reverse',
        }}
      />

      <div
        className="animated-background-glow"
        style={{
          top: '10%',
          right: '8%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${colors.small2} 0%, ${colors.small2_40} 40%, transparent 60%)`,
          filter: 'blur(55px)',
          zIndex: 0,
          animation: 'moveGlow2 24s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
};
