import React, { useRef } from 'react';

interface HeroVideoProps {
  videoSrc: string;
  buttonText?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoSrc,
  buttonText = "What if I told you that _anyone_ can dance?"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleButtonClick = () => {
    // Unmute and play the video with sound
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }

    // const strategySection = document.getElementById('strategy');
    // if (strategySection) {
    //   strategySection.scrollIntoView({ behavior: 'smooth' });
    // }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      overflow: 'hidden',
      backgroundColor: 'transparent'
    }}>
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 0
        }}
      >
        Your browser does not support the video tag.
      </video>

      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '24px 48px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '3px solid #fff',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '600px',
          textAlign: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
        }}
      >
        <span>
          {buttonText.split('_').map((part, index) =>
            index === 1 ? <em key={index}>{part}</em> : part
          )}
        </span>
        <style>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(8px);
            }
          }
        `}</style>
      </button>
    </div>
  );
};