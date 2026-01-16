export const philosophyStory = {
  id: 'excellence',
  title: 'Pursuit of Excellence',
  subtitle: 'Critique me',
  accentColor: 'bronze',
  frames: [
    {
      id: 'frame-1',
      content: (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <p style={{
            color: 'var(--color-gold-warm)',
            fontSize: '28px',
            lineHeight: '1.8',
            marginBottom: '32px'
          }}>
            I welcome all criticism.
          </p>
          <p style={{
            color: 'var(--color-gold-warm)',
            fontSize: '28px',
            lineHeight: '1.8',
            marginBottom: '32px'
          }}>
            Positive feedback gives me a sense of completion, while criticism fuels my growth.
          </p>
          <p style={{
            color: 'var(--color-gold-warm)',
            fontSize: '28px',
            lineHeight: '1.8',
            marginBottom: '32px'
          }}>
            I'd rather you surface every flaw than keep me in ignorance.
          </p>
          <p style={{
            color: 'var(--color-gold-warm)',
            fontSize: '28px',
            lineHeight: '1.8'
          }}>
            Because only by becoming aware of my flaws can I become a better version of myself.
          </p>
        </div>
      ),
    },
  ],
};
