import React from 'react';

interface VideoPlayerProps {
  src: string;
  title?: string;
  aspectRatio?: '16/9' | '4/3' | 'auto';
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title = 'Video player',
  aspectRatio = '16/9',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false
}) => {
  const containerStyle: React.CSSProperties = aspectRatio === 'auto'
    ? {
        width: '100%',
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        overflow: 'hidden'
      }
    : {
        position: 'relative',
        width: '100%',
        paddingBottom: aspectRatio === '16/9' ? '56.25%' : '75%',
        height: 0,
        overflow: 'hidden',
        borderRadius: '8px',
        marginTop: '1rem',
        marginBottom: '1rem'
      };

  const videoStyle: React.CSSProperties = aspectRatio === 'auto'
    ? {
        width: '100%',
        height: 'auto',
        display: 'block'
      }
    : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      };

  return (
    <div style={containerStyle}>
      <video
        style={videoStyle}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        title={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
