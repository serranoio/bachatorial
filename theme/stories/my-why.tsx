// Shared style constants
const styles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    justifyContent: 'center' as const,
    height: '100%',
    padding: '40px 30px',
    position: 'relative' as const,
  },
  backgroundGradient: {
    background: 'linear-gradient(120deg, rgba(255, 127, 80, 0.12), rgba(255, 99, 71, 0.08))',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
    zIndex: 0,
  },
  contentWrapper: {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
    maxWidth: '600px',
  },
  headerSection: {
    borderLeft: '6px solid var(--color-coral)',
    paddingLeft: '28px',
    marginBottom: '32px',
  },
  title: {
    color: 'var(--color-coral)',
    fontSize: '42px',
    marginBottom: '12px',
    textShadow: '0 0 30px rgba(255, 127, 80, 0.8), 0 0 60px rgba(255, 127, 80, 0.5), 0 3px 15px rgba(255, 127, 80, 0.4)',
    fontWeight: '600',
    lineHeight: '1.1',
    letterSpacing: '-0.5px',
  },
  titleUnderline: {
    width: '80px',
    height: '3px',
    background: 'linear-gradient(to right, var(--color-coral), transparent)',
    marginTop: '16px',
  },
  textCard: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(8px)',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 127, 80, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  },
  paragraph: {
    color: 'var(--color-gold-warm)',
    fontSize: '19px',
    lineHeight: '1.9',
    fontWeight: '300',
    letterSpacing: '0.2px',
  },
};

// Helper component for frame structure
const StoryFrame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={styles.container}>
    <div style={styles.backgroundGradient} />
    <div style={styles.contentWrapper}>
      <header style={styles.headerSection}>
        <h2 style={styles.title}>{title}</h2>
        <div style={styles.titleUnderline} />
      </header>
      <div style={styles.textCard}>{children}</div>
    </div>
  </div>
);

export const myWhyStory = {
  id: 'my-why',
  title: 'Becoming the Dance',
  subtitle: 'How to become art',
  accentColor: 'coral',
  frames: [
    {
      id: 'frame-1',
      content: (
        <StoryFrame title="What Indulgence Really Means">
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            Indulging yourself in an art form does not mean falling victim to it. It does not mean being consumed by it.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            Indulging yourself in an art form means that you surrender to the journey. It happens when you commit yourself to uncover more depth to a skill, when you commit yourself to learn layers upon layers of technique, stylized in a multitude of energies, combined in an infinite possible ways.
          </p>
        </StoryFrame>
      ),
    },
    {
      id: 'frame-2',
      content: (
        <StoryFrame title="The Path of Infinite Joy">
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            This is because you can discover infinite joy. No longer would your brain deteriorate from sameness, instead, the newness would always be stimulating.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            This is when you become a vessel of expansion for the universe, a reflection of the universe's infinity as you go on a never ending journey into the universe's infinite depth.
          </p>
        </StoryFrame>
      ),
    },
    {
      id: 'frame-3',
      content: (
        <StoryFrame title="Life as Artform">
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            The entirety of life can be lived as an artform: crafted, accepted despite the imperfections, and lived in its entirety. Even doing something as simple as walking, you can perfect the art of walking by learning to embrace it in its entirety.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            We are all artists and our lives are our canvas. Let's accept no less than to paint a masterpiece. I myself have taken my vows to indulge in life itself in every aspect this way. I hope you do too.
          </p>
        </StoryFrame>
      ),
    },
    {
      id: 'frame-4',
      content: (
        <StoryFrame title="An Invitation">
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            Can you tell I am spiritual? If you like this, please read The Tao of Physics & The New Earth & please have a conversation with me.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            I am looking for like minded individuals who can push me to the next level.
          </p>
        </StoryFrame>
      ),
    },
  ],
};
