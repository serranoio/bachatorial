import { YouTubeEmbed } from '../YouTubeEmbed';

export const danceVideosStory = {
  id: 'dance-videos',
  title: 'Dance Videos',
  subtitle: 'Watch my favorite bachata performances and tutorials',
  accentColor: 'coral',
  frames: [
    {
      id: 'intro',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: 'var(--color-gold-light)', fontSize: '42px', marginBottom: '20px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Dance Videos 💃
          </h2>
          <p style={{ color: 'var(--color-gold-warm)', fontSize: '18px', lineHeight: '1.8', maxWidth: '400px' }}>
            Here are some of my favorite bachata performances that inspire my teaching style and movement philosophy.
          </p>
          <p style={{ color: 'var(--color-coral)', fontSize: '14px', marginTop: '30px', opacity: 0.9 }}>
            Tap right to watch →
          </p>
        </div>
      ),
    },
  ],
};
