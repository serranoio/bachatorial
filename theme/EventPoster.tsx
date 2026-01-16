import React, { useEffect, useRef } from 'react';

interface EventPosterProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  tagline?: string;
  noPartnerRequired?: boolean;
  learnTheBasics?: boolean;
  casualAttire?: boolean;
  logoSrc?: string;
  learnNowLink?: string;
  resourcesLink?: string;
  musicSrc?: string;
  autoPlayMusic?: boolean;
}

export const EventPoster: React.FC<EventPosterProps> = ({
  title = "Bachata Dance Lesson",
  date = "Jan 22nd",
  time = "2:00 PM",
  location = "SFO12",
  tagline = "Break limiting beliefs. You can dance.",
  noPartnerRequired = true,
  learnTheBasics = true,
  casualAttire = true,
  logoSrc = "/logo.png",
  learnNowLink = "http://localhost:3001/guide/learning/lesson.html",
  resourcesLink = "/guide/resources",
  musicSrc = "https://www.youtube.com/watch?v=ucZ6J-fXQeI",
  autoPlayMusic = true
}) => {
  const playerRef = useRef<any>(null);
  const hasClickedRef = useRef(false);

  useEffect(() => {
    if (!autoPlayMusic || !musicSrc) return;

    // Load YouTube IFrame API script
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Wait for API to load and create player
    const initPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        const videoId = musicSrc.split('v=')[1]?.split('&')[0];
        const player = new (window as any).YT.Player('youtube-player', {
          height: '0',
          width: '0',
          videoId: videoId,
          playerVars: {
            autoplay: 0, // Don't autoplay immediately
            loop: 1,
            playlist: videoId,
            controls: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              playerRef.current = event.target;
            },
          },
        });
      } else {
        setTimeout(initPlayer, 100);
      }
    };

    // Start playing on first click or scroll
    const handleUserInteraction = () => {
      if (!hasClickedRef.current && playerRef.current) {
        hasClickedRef.current = true;
        playerRef.current.playVideo();
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    const timeout = setTimeout(initPlayer, 100);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [autoPlayMusic, musicSrc]);

  return (
    <>
      <style>{`
        @keyframes floatDance {
          0%, 100% {
            transform: translate(-20%, 0) rotate(0deg);
          }
          25% {
            transform: translate(-35%, -20px) rotate(5deg);
          }
          50% {
            transform: translate(-25%, -10px) rotate(-5deg);
          }
          75% {
            transform: translate(-20%, -25px) rotate(3deg);
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

        .animated-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float linear infinite;
        }

        /* Responsive styles */
        .event-poster-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          max-height: 1200px;
          margin: 0 auto;
          padding: 40px 30px;
          background: linear-gradient(135deg, #151515 0%, #1A1A1A 25%, #181818 50%, #1A1A1A 75%, #151515 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(255, 155, 127, 0.1);
        }

        .event-logo-container {
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(232, 212, 168, 0.2);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .event-logo {
          width: 140px;
          height: 140px;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(255, 155, 127, 0.3));
        }

        .event-title {
          font-size: 44px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 2px transparent;
          background-image: linear-gradient(90deg, #E8D4A8 0%, #FFE4B8 25%, #E8D4A8 50%, #C19A6B 75%, #D4A574 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(232, 212, 168, 0.4)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
          font-family: Georgia, "Times New Roman", serif;
          line-height: 1.2;
          animation: shimmerMove 3s linear infinite;
        }

        .event-tagline {
          font-size: 20px;
          font-weight: 500;
          color: #E8D4A8;
          text-align: center;
          letter-spacing: 0.5px;
          font-style: italic;
          text-shadow: 0 2px 6px rgba(232, 212, 168, 0.3);
          line-height: 1.4;
        }

        .event-qr-code {
          width: 140px;
          height: 140px;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          background: white;
          padding: 10px;
        }

        .event-button-primary {
          padding: 14px 36px;
          font-size: 17px;
          font-weight: 700;
          color: var(--color-gold-warm) !important;
          background: linear-gradient(135deg, #8B6914 0%, #6B4E0F 100%);
          border: 2px solid rgba(232, 212, 168, 0.5);
          border-radius: 50px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          box-shadow: 0 8px 24px rgba(232, 212, 168, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }

        .event-button-secondary {
          padding: 14px 36px;
          font-size: 17px;
          font-weight: 700;
          color: var(--color-gold-warm) !important;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(232, 212, 168, 0.4);
          border-radius: 50px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .event-badge {
          position: absolute;
          padding: 6px 20px;
          background: linear-gradient(135deg, rgba(255, 155, 127, 0.15), rgba(212, 165, 116, 0.15));
          border: 2px solid rgba(232, 212, 168, 0.3);
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          color: #E8D4A8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          box-shadow: 0 4px 16px rgba(255, 155, 127, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        .event-badge-right {
          top: 30%;
          right: -5%;
          transform: rotate(2deg);
        }

        .event-content-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }

        .event-details-panel {
          padding: 35px 30px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(232, 212, 168, 0.15);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .event-button-subtitle {
          font-size: 13px;
          color: #E5C8A0;
          text-align: center;
          max-width: 280px;
          line-height: 1.4;
          opacity: 0.9;
        }

        .event-qr-caption {
          font-size: 14px;
          font-weight: 500;
          color: #E8D4A8;
          text-align: center;
          letter-spacing: 0.5px;
          font-style: italic;
        }

        .event-buttons-container {
          display: flex;
          gap: 24px;
          margin-top: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .event-poster-container {
            padding: 30px 20px;
            border-radius: 16px;
          }

          .event-content-container {
            gap: 24px;
          }

          .event-logo-container {
            padding: 20px;
            border-radius: 16px;
          }

          .event-logo {
            width: 100px;
            height: 100px;
          }

          .event-title {
            font-size: 32px;
            letter-spacing: 3px;
            line-height: 1.4;
          }

          .event-details-panel {
            padding: 32px 24px;
          }

          .event-tagline {
            font-size: 16px;
            letter-spacing: 0.3px;
          }

          .event-qr-code {
            width: 120px;
            height: 120px;
            padding: 8px;
          }

          .event-button-primary,
          .event-button-secondary {
            padding: 14px 32px;
            font-size: 16px;
            letter-spacing: 1px;
          }

          .event-buttons-container {
            gap: 16px;
          }

          .event-button-subtitle {
            font-size: 13px;
            max-width: 240px;
          }

          .event-badge {
            padding: 5px 12px;
            font-size: 10px;
            letter-spacing: 1px;
          }

          .event-badge-right {
            top: auto;
            bottom: '-15px';
            right: '5%';
            transform: rotate(-2deg);
          }
        }

        @media (max-width: 480px) {
          .event-poster-container {
            padding: 20px 16px;
          }

          .event-content-container {
            gap: 16px;
          }

          .event-logo-container {
            padding: 16px;
          }

          .event-logo {
            width: 80px;
            height: 80px;
          }

          .event-title {
            font-size: 24px;
            letter-spacing: 1.5px;
          }

          .event-details-panel {
            padding: 24px 16px;
          }

          .event-tagline {
            font-size: 14px;
          }

          .event-qr-code {
            width: 100px;
            height: 100px;
            padding: 6px;
          }

          .event-button-primary,
          .event-button-secondary {
            padding: 12px 24px;
            font-size: 14px;
          }

          .event-buttons-container {
            gap: 12px;
          }

          .event-button-subtitle {
            font-size: 12px;
            max-width: 200px;
          }

          .event-qr-caption {
            font-size: 12px;
          }

          .event-badge {
            padding: 4px 10px;
            font-size: 9px;
            letter-spacing: 0.5px;
          }
        }
      `}</style>

      <div className="event-poster-container">
        {/* Moving glow orbs - Layer 1 (Peachy glow) */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 155, 127, 0.38) 0%, rgba(255, 155, 127, 0.23) 30%, rgba(255, 155, 127, 0.13) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'moveGlow1 20s ease-in-out infinite'
        }} />

        {/* Moving glow orbs - Layer 2 (Golden glow) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(232, 212, 168, 0.35) 0%, rgba(232, 212, 168, 0.19) 30%, rgba(232, 212, 168, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'moveGlow2 18s ease-in-out infinite'
        }} />

        {/* Moving glow orbs - Layer 3 (Bronze glow) */}
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '25%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.31) 0%, rgba(212, 165, 116, 0.18) 30%, rgba(212, 165, 116, 0.08) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'moveGlow3 22s ease-in-out infinite'
        }} />

        {/* Additional smaller moving glows for depth */}
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 180, 150, 0.29) 0%, rgba(255, 180, 150, 0.16) 40%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'moveGlow1 16s ease-in-out infinite reverse'
        }} />

        <div style={{
          position: 'absolute',
          top: '10%',
          right: '8%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(220, 190, 140, 0.25) 0%, rgba(220, 190, 140, 0.14) 40%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'moveGlow2 24s ease-in-out infinite reverse'
        }} />

      {/* Content container */}
      <div className="event-content-container">

        {/* Title and Logo - Horizontal Layout */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Title - Left Side */}
          <div style={{
            flex: '1'
          }}>
            <h1 className="event-title" style={{
              textAlign: 'left',
              margin: 0
            }}>
              {title}
            </h1>
          </div>

          {/* Logo - Right Side */}
          <div className="event-logo-container" style={{
            flexShrink: 0,
            transform: 'translateX(60px)',
            animation: 'floatDance 6s ease-in-out infinite'
          }}>
            <img
              src={logoSrc}
              alt="Bachatorial Logo"
              className="event-logo"
            />
          </div>
        </div>

        {/* Event Details Glass Panel */}
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <div className="event-details-panel">
            {/* Tagline */}
            <div className="event-tagline">
              {tagline}
            </div>
          </div>

          {/* Badges Container - Outside and around the box */}
          {noPartnerRequired && (
            <div className="event-badge" style={{
              top: '-10px',
              left: '8%',
              transform: 'rotate(-3deg)'
            }}>
              No Partnerwork / no partner required
            </div>
          )}

          {learnTheBasics && (
            <div className="event-badge event-badge-right">
              Learn the Basics
            </div>
          )}

          {casualAttire && (
            <div className="event-badge" style={{
              bottom: '-15px',
              left: '3%',
              transform: 'rotate(-2deg)',
              textTransform: 'none'
            }}>
              Wear shoes that slide.
            </div>
          )}
        </div>

        {/* Date, Time & Location - At the bottom */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
          opacity: 0.8
        }}>
          <div style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#C5A87A',
            textAlign: 'center',
            letterSpacing: '0.5px',
            margin: "16px 0 0 0"
          }}>
            {date} • {time} • {location} • The 4th Floor Kitchen
          </div>
        </div>

        {/* QR Code and Buttons - Horizontal Layout */}
        <div style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          flexWrap: 'wrap-reverse'
        }}>
          {/* QR Code with Caption - Left Side */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}>
            <img
              src="/events-qr-code.png"
              alt="Event QR Code"
              className="event-qr-code"
            />
            <div className="event-qr-caption">
              Share with others!
            </div>
          </div>

          {/* Buttons - Right Side */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'flex-start'
          }}>
            {/* Learn Now Button with Subtitle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              color: "var(--color-gold-warm)",
              gap: '8px'
            }}>
              <a
                href={learnNowLink}
                className="event-button-primary"
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
              <div className="event-button-subtitle" style={{ textAlign: 'left' }}>
                The lesson is fully posted here if you'd like a head start
              </div>
            </div>

            {/* Bachata Resources Button with Subtitle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <a
                href={"calendar.html"}
                className="event-button-secondary"
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
                Public Bachata Events
              </a>
              <div className="event-button-subtitle" style={{ textAlign: 'left' }}>
                Start social dancing today with this list of bachata events in the Bay Area!!
              </div>
            </div>
          </div>
        </div>

        {/* Background Music Player - YouTube (Hidden) */}
        {musicSrc && (
          <div
            id="youtube-player"
            style={{
              position: 'fixed',
              bottom: '0',
              right: '0',
              width: '0',
              height: '0',
              visibility: 'hidden',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </div>
    </>
  );
};
