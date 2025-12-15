import React from 'react';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  aspectRatio?: '16/9' | '4/3';
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url,
  title = 'YouTube video player',
  aspectRatio = '16/9'
}) => {
  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        color: '#c33'
      }}>
        Invalid YouTube URL
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingBottom: aspectRatio === '16/9' ? '56.25%' : '75%',
      height: 0,
      overflow: 'hidden',
      borderRadius: '8px',
      marginTop: '1rem',
      marginBottom: '1rem'
    }}>
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
