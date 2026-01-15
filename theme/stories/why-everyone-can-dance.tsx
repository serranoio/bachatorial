// Shared style constants with striking purple/cosmic background
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
    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.15), rgba(148, 0, 211, 0.18))',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
    zIndex: 0,
  },
  contentWrapper: {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
    maxWidth: '600px',
  },
  headerSection: {
    borderLeft: '6px solid rgba(186, 85, 211, 0.8)',
    paddingLeft: '28px',
    marginBottom: '32px',
  },
  title: {
    color: 'rgba(218, 112, 214, 1)',
    fontSize: '42px',
    marginBottom: '12px',
    textShadow: '0 0 40px rgba(186, 85, 211, 0.9), 0 0 80px rgba(138, 43, 226, 0.6), 0 4px 20px rgba(148, 0, 211, 0.5)',
    fontWeight: '600',
    lineHeight: '1.1',
    letterSpacing: '-0.5px',
  },
  titleUnderline: {
    width: '80px',
    height: '3px',
    background: 'linear-gradient(to right, rgba(186, 85, 211, 0.8), transparent)',
    marginTop: '16px',
  },
  textCard: {
    background: 'rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(10px)',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid rgba(186, 85, 211, 0.3)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
  },
  paragraph: {
    color: 'var(--color-gold-warm)',
    fontSize: '17px',
    lineHeight: '1.7',
    fontWeight: '300',
    letterSpacing: '0.2px',
  },
  factLabel: {
    color: 'rgba(218, 112, 214, 1)',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '14px',
    textShadow: '0 0 20px rgba(186, 85, 211, 0.6)',
  },
  citation: {
    color: 'rgba(200, 162, 200, 0.9)',
    fontSize: '14px',
    lineHeight: '1.6',
    fontStyle: 'italic',
    marginTop: '20px',
    paddingLeft: '16px',
    borderLeft: '3px solid rgba(186, 85, 211, 0.4)',
  },
};

// Helper component for frame structure
const StoryFrame = ({ title, children }: { title: string; children: React.ReactNode }) => (
  children
);

export const whyEveryoneCanDanceStory = {
  id: 'why-everyone-can-dance',
  title: 'Why Everyone Can Dance',
  subtitle: 'Breaking through mental barriers',
  accentColor: 'purple',
  frames: [
    {
      id: 'frame-1',
      content: (
        <StoryFrame>
          <p style={styles.factLabel}>
            Fact: The biggest barrier to dancing is mental, not physical.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            The universe does not label a dance move as "wrong." Only the mind does—through self-criticism, comparison, and overthinking.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            Dance move technique shapes how a movement is expressed, not whether it is allowed.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            Release the need for perfection, and the dance returns.
          </p>
        </StoryFrame>
      ),
    },
    {
      id: 'frame-2',
      content: (
        <StoryFrame >
          <p style={styles.factLabel}>
            Fact: Life is a dance—we've just forgotten.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '16px' }}>
            Every single day of life is a dance,
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '16px' }}>
            the good steps and the bad steps.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '16px' }}>
            the good days, the bad days.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            You're going to misstep, you're going to be offbeat.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '16px' }}>
            Embrace it.
          </p>
          <p style={{ ...styles.paragraph, margin: 0, fontWeight: '500' }}>
            So don't just half ass it, lose yourself in the dance.
          </p>
        </StoryFrame>
      ),
    },
    {
      id: 'frame-3',
      content: (
        <StoryFrame >
          <p style={styles.factLabel}>
            Fact: The language of dance is universal. It is within your nature.
          </p>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            It defies gender and age boundaries, all boundaries. It is the natural expression of the universe.
          </p>
          <div style={styles.citation}>
            <p style={{ margin: 0, marginBottom: '12px' }}>
              In <em>The Tao of Physics</em> (pp. 240–241), physicist Fritjof Capra explores the parallels between modern physics and Eastern mysticism, noting that many physicists independently arrive at the same metaphor when describing the nature of elementary particles: <strong>dance</strong>.
            </p>
            <p style={{ margin: 0 }}>
              He refers to a "dance of creation and destruction" and an "energy dance," explaining that <em>ideas of rhythm and dance naturally arise when one attempts to imagine the flow of energy through the patterns that make up the particle world.</em>
            </p>
          </div>
        </StoryFrame>
      ),
    },
  ],
};
