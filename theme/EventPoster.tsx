import React from 'react';

interface EventPosterProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  tagline?: string;
  noPartnerRequired?: boolean;
  logoSrc?: string;
  learnNowLink?: string;
  resourcesLink?: string;
}

export const EventPoster: React.FC<EventPosterProps> = ({
  title = "Bachata Dance Lesson",
  date = "June 22nd",
  time = "2:00 PM",
  location = "The Kitchen",
  tagline = "Break limiting beliefs. You can dance.",
  noPartnerRequired = true,
  logoSrc = "/logo.png",
  learnNowLink = "/guide/lesson",
  resourcesLink = "/guide/resources"
}) => {
  return (
    <>
      <style>{`
        @keyframes floatDance {
          0%, 100% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          25% {
            transform: translate(-45%, -20px) rotate(5deg);
          }
          50% {
            transform: translate(-55%, -10px) rotate(-5deg);
          }
          75% {
            transform: translate(-50%, -25px) rotate(3deg);
          }
        }

        @keyframes shimmerMove {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.08;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.15;
            transform: translateX(-50%) scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(10px);
          }
          66% {
            transform: translateY(-5px) translateX(-10px);
          }
        }

        .animated-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float linear infinite;
        }
      `}</style>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 50%, #1F1F1F 100%)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(255, 155, 127, 0.1)',
      }}>
        {/* Animated floating particles */}
        <div className="animated-particle" style={{
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(255, 155, 127, 0.15), transparent)',
          top: '10%',
          left: '15%',
          animationDuration: '8s',
          animationDelay: '0s',
          filter: 'blur(30px)',
          zIndex: 0
        }} />
        <div className="animated-particle" style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(232, 212, 168, 0.12), transparent)',
          top: '60%',
          right: '10%',
          animationDuration: '10s',
          animationDelay: '2s',
          filter: 'blur(25px)',
          zIndex: 0
        }} />
        <div className="animated-particle" style={{
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1), transparent)',
          bottom: '15%',
          left: '20%',
          animationDuration: '12s',
          animationDelay: '4s',
          filter: 'blur(28px)',
          zIndex: 0
        }} />

        {/* Ambient glow overlay with pulse animation */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 155, 127, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulseGlow 4s ease-in-out infinite'
        }} />

      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}>

        {/* Logo with glass morphism and floating animation */}
        <div style={{
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(232, 212, 168, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          animation: 'floatDance 6s ease-in-out infinite',
          position: 'relative',
          left: '50%'
        }}>
          <img
            src={logoSrc}
            alt="Bachatorial Logo"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(255, 155, 127, 0.3))'
            }}
          />
        </div>

        {/* Title - Outlined Luxury Style with Shimmer */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '700',
          margin: '0',
          textAlign: 'center',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'transparent',
          WebkitTextStroke: '2px transparent',
          backgroundImage: 'linear-gradient(90deg, #E8D4A8 0%, #FFE4B8 25%, #E8D4A8 50%, #C19A6B 75%, #D4A574 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 20px rgba(232, 212, 168, 0.4)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: '1.2',
          animation: 'shimmerMove 3s linear infinite'
        }}>
          {title}
        </h1>

        {/* Event Details Glass Panel */}
        <div style={{
          width: '100%',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(232, 212, 168, 0.15)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          {/* Tagline */}
          <div style={{
            fontSize: '24px',
            fontWeight: '500',
            color: '#E8D4A8',
            textAlign: 'center',
            letterSpacing: '0.5px',
            fontStyle: 'italic',
            textShadow: '0 2px 6px rgba(232, 212, 168, 0.3)',
            lineHeight: '1.4'
          }}>
            {tagline}
          </div>

          {/* No Partner Required Badge */}
          {noPartnerRequired && (
            <div style={{
              marginTop: '10px',
              padding: '12px 32px',
              background: 'linear-gradient(135deg, rgba(255, 155, 127, 0.15), rgba(212, 165, 116, 0.15))',
              border: '2px solid rgba(232, 212, 168, 0.3)',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#E8D4A8',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              boxShadow: '0 4px 16px rgba(255, 155, 127, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              No Partner Required
            </div>
          )}
        </div>

        {/* Date, Time & Location - Below the center box */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center'
        }}>
          {/* Date & Time */}
          <div style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#FFB89D',
            textAlign: 'center',
            letterSpacing: '1px',
            textShadow: '0 2px 8px rgba(255, 184, 157, 0.3), 0 0 20px rgba(255, 184, 157, 0.2)'
          }}>
            {date} • {time}
          </div>

          {/* Location */}
          <div style={{
            fontSize: '24px',
            fontWeight: '500',
            color: '#E5C8A0',
            textAlign: 'center',
            letterSpacing: '0.5px',
            textShadow: '0 2px 6px rgba(229, 200, 160, 0.3)'
          }}>
            {location}
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '32px',
          marginTop: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Learn Now Button with Subtitle */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <a
              href={learnNowLink}
              style={{
                padding: '18px 48px',
                fontSize: '20px',
                fontWeight: '700',
                color: '#1F1F1F',
                background: 'linear-gradient(135deg, #E8D4A8 0%, #C19A6B 100%)',
                border: '2px solid rgba(232, 212, 168, 0.5)',
                borderRadius: '50px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                boxShadow: '0 8px 24px rgba(232, 212, 168, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(232, 212, 168, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(232, 212, 168, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
            >
              Learn Now
            </a>
            <div style={{
              fontSize: '14px',
              color: '#E5C8A0',
              textAlign: 'center',
              maxWidth: '280px',
              lineHeight: '1.4',
              opacity: 0.9
            }}>
              The lesson is fully posted here if you'd like to check it out before
            </div>
          </div>

          {/* Bachata Resources Button with Subtitle */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <a
              href={resourcesLink}
              style={{
                padding: '18px 48px',
                fontSize: '20px',
                fontWeight: '700',
                color: '#E8D4A8',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(232, 212, 168, 0.4)',
                borderRadius: '50px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'inline-block',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(232, 212, 168, 0.6)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(232, 212, 168, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(232, 212, 168, 0.4)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
              }}
            >
              Bachata Resources
            </a>
            <div style={{
              fontSize: '14px',
              color: '#E5C8A0',
              textAlign: 'center',
              maxWidth: '280px',
              lineHeight: '1.4',
              opacity: 0.9
            }}>
              Resources to help you start dancing today
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
