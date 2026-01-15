const styles = {
  paragraph: {
    color: 'var(--color-gold-warm)',
    fontSize: '19px',
    lineHeight: '1.9',
    fontWeight: '300',
    letterSpacing: '0.2px',
  },
};

export const myWhyStory = {
  id: 'my-why',
  title: 'Becoming the Dance',
  subtitle: 'How to become art',
  accentColor: 'coral',
  frames: [
    {
      id: 'frame-1',
      content: (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100%',
          padding: '40px 20px'
        }}>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            Indulging yourself in an art form does not mean falling victim to it. It does not mean being consumed by it.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            Indulging yourself in an art form means that you surrender to the journey. It happens when you commit yourself to uncover more depth to a skill, when you commit yourself to learn layers upon layers of technique, stylized in a multitude of energies, combined in an infinite possible ways.
          </p>
        </div>
      ),
    },
    {
      id: 'frame-2',
      content: (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100%',
          padding: '40px 20px'
        }}>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            This is because you can discover infinite joy. No longer would your brain deteriorate from sameness, instead, the newness would always be stimulating.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            This is when you become a vessel of expansion for the universe, a reflection of the universe's infinity as you go on a never ending journey into the universe's infinite depth.
          </p>
        </div>
      ),
    },
    {
      id: 'frame-3',
      content: (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100%',
          padding: '40px 20px'
        }}>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            The entirety of life can be lived as an artform: crafted, accepted despite the imperfections, and lived in its entirety. Even doing something as simple as walking, you can perfect the art of walking by learning to embrace it in its entirety.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            We are all artists and our lives are our canvas. Let's accept no less than to paint a masterpiece. I myself have taken my vows to indulge in life itself in every aspect this way. I hope you do too.
          </p>
        </div>
      ),
    },
    {
      id: 'frame-4',
      content: (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100%',
          padding: '40px 20px'
        }}>
          <p style={{ ...styles.paragraph, marginBottom: '24px' }}>
            Can you tell I am spiritual? If you like this, please read The Tao of Physics & The New Earth & please have a conversation with me.
          </p>
          <p style={{ ...styles.paragraph, margin: 0 }}>
            I am looking for like minded individuals who can push me to the next level.
          </p>
        </div>
      ),
    },
  ],
};
