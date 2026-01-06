import React from 'react';

interface EventPosterProps {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
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
  noPartnerRequired = true,
  logoSrc = "/logo.png",
  learnNowLink = "/guide/lesson",
  resourcesLink = "/guide/resources"
}) => {
  return (
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
      {/* Ambient glow overlay */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 155, 127, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
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

        {/* Logo with glass morphism */}
        <div style={{
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(232, 212, 168, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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

        {/* Title - Outlined Luxury Style */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '700',
          margin: '0',
          textAlign: 'center',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'transparent',
          WebkitTextStroke: '2px transparent',
          backgroundImage: 'linear-gradient(135deg, #E8D4A8 0%, #C19A6B 50%, #D4A574 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 20px rgba(232, 212, 168, 0.4)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: '1.2'
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
          {/* Date & Time */}
          <div style={{
            fontSize: '32px',
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
            fontSize: '28px',
            fontWeight: '500',
            color: '#E5C8A0',
            textAlign: 'center',
            letterSpacing: '0.5px',
            textShadow: '0 2px 6px rgba(229, 200, 160, 0.3)'
          }}>
            {location}
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

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginTop: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Learn Now Button */}
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

          {/* Bachata Resources Button */}
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
        </div>
      </div>
    </div>
  );
};
