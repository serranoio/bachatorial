export const welcomeStory = {
  id: 'welcome',
  title: 'Welcome',
  subtitle: 'Start your bachata journey with me',
  accentColor: 'gold',
  frames: [
    {
      id: 'intro',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' }}>
          <h2 style={{ color: 'var(--color-gold-light)', fontSize: '48px', marginBottom: '30px', textShadow: '0 2px 8px rgba(0,0,0,0.8)', textAlign: 'center' }}>
            Welcome to my dance portfolio
          </h2>

          <div style={{ maxWidth: '500px', width: '100%' }}>
            <p style={{ color: 'var(--color-gold-warm)', fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
              In here you will find:
            </p>

            <ul style={{ color: 'var(--color-gold-warm)', fontSize: '18px', lineHeight: '2', listStyle: 'none', padding: 0, marginBottom: '40px' }}>
              <li style={{ marginBottom: '12px' }}>
                • <a href="/guide/learning/what-is-bachata.html" style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}>What is Bachata?</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                • <a href="/guide/learning/lesson.html" style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}>Introductory Bachata Lesson</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                • <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate-to-story', { detail: { storyId: 'my-why' } })); }} style={{ color: 'var(--color-gold-light)', textDecoration: 'underline', cursor: 'pointer' }}>Why everyone can dance?</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                • <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate-to-story', { detail: { storyId: 'my-why' } })); }} style={{ color: 'var(--color-gold-light)', textDecoration: 'underline', cursor: 'pointer' }}>How to become the dance</a>
              </li>
            </ul>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(232, 212, 168, 0.3)', margin: '32px 0' }} />

            <p style={{ color: 'var(--color-gold-warm)', fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', fontStyle: 'italic' }}>
              Moreover this serves as my journey into dance
            </p>

            <ul style={{ color: 'var(--color-gold-warm)', fontSize: '18px', lineHeight: '2', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                • My dance videos
              </li>
              <li style={{ marginBottom: '12px' }}>
                • Behind the scenes
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ],
};
