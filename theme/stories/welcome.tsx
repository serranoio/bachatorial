export const welcomeStory = {
  id: 'welcome',
  title: 'Welcome',
  subtitle: 'Start your bachata journey with me',
  accentColor: 'gold',
  frames: [
    {
      id: 'intro',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: 'var(--color-gold-light)', fontSize: '48px', marginBottom: '20px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Welcome! 🎉
          </h2>
          <p style={{ color: 'var(--color-gold-warm)', fontSize: '20px', lineHeight: '1.8', maxWidth: '400px', marginBottom: '30px' }}>
            I'm so excited you're here! Let me show you what bachata is all about.
          </p>
        </div>
      ),
    },
    {
      id: 'what-is-bachata',
      content: (
        <div>
          <h3 style={{ color: 'var(--color-gold-light)', fontSize: '28px', marginBottom: '20px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            What is Bachata?
          </h3>
          <p style={{ color: 'var(--color-gold-warm)', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
            Bachata is more than just a dance—it's a way to express yourself, connect with others, and break through limiting beliefs.
          </p>
          <p style={{ color: 'var(--color-gold-warm)', fontSize: '16px', lineHeight: '1.8' }}>
            Originating in the Dominican Republic, bachata is characterized by romantic music, sensual movements, and a unique 4-beat pattern with a signature hip motion on the fourth count.
          </p>
        </div>
      ),
    },
    {
      id: 'what-youll-learn',
      content: (
        <div>
          <h3 style={{ color: 'var(--color-gold-lighter)', fontSize: '24px', marginBottom: '20px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            What You'll Learn
          </h3>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(232, 212, 168, 0.2)',
          }}>
            <ul style={{ color: 'var(--color-gold-warm)', fontSize: '16px', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
              <li>Basic bachata steps and rhythm</li>
              <li>Body isolations and movement quality</li>
              <li>How to feel the music</li>
              <li>Building confidence on the dance floor</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'quote',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--color-gold-light)', fontSize: '24px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '30px' }}>
            "The language of dance is universal. It defies age and gender boundaries."
          </p>
          <p style={{ color: 'var(--color-gold-warm)', fontSize: '20px', lineHeight: '1.8' }}>
            Anyone can dance—including you!
          </p>
        </div>
      ),
    },
  ],
};
