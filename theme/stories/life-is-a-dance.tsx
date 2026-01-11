export const lifeIsADanceStory = {
  id: 'life-is-a-dance',
  title: 'Life is a Dance',
  subtitle: 'Dance lessons as life lessons',
  accentColor: 'gold',
  frames: [
    {
      id: 'frame-1',
      content: (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '40px 20px',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '500px'
          }}>
            <div style={{
              background: 'radial-gradient(circle at center, rgba(232, 212, 168, 0.2), transparent 70%)',
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              filter: 'blur(40px)',
              zIndex: -1
            }} />
            <h2 style={{
              color: 'var(--color-gold-lighter)',
              fontSize: '48px',
              marginBottom: '32px',
              textShadow: '0 4px 20px rgba(232, 212, 168, 0.6), 0 0 40px rgba(232, 212, 168, 0.3)',
              fontWeight: '300',
              letterSpacing: '2px',
              lineHeight: '1.2'
            }}>
              Life is a Dance
            </h2>
            <div style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(10px)',
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid rgba(232, 212, 168, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}>
              <p style={{
                color: 'var(--color-gold-warm)',
                fontSize: '20px',
                lineHeight: '1.8',
                margin: 0,
                fontWeight: '300'
              }}>
                Content coming soon...
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
