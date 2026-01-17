import React, { useState, useEffect } from 'react';
import { Story, StoryData } from './Story';
import { AccentColor } from './animations';
import { STORY_BACKGROUNDS, StoryId } from './animations';
import { ProportionalSizingProvider } from './contexts/ProportionalSizingContext';
import { parseStoryHash, clearStoryHash, updateStoryHash } from './storyRouter';
import './shared-styles.css';

interface StoriesHubProps {
  stories: StoryData[];
  hideHeader?: boolean;
  hideCardText?: boolean;
}

const getAccentColorValue = (color: AccentColor): string => {
  switch (color) {
    case 'coral':
      return '#FF9B7F';
    case 'gold':
      return '#E8D4A8';
    case 'peach':
      return '#FFB496';
    case 'bronze':
      return '#D4A574';
    case 'gold-peachy':
      return '#DCBE8C';
    default:
      return '#E8D4A8'; // Default to gold
  }
};

export const StoriesHub: React.FC<StoriesHubProps> = ({ stories, hideHeader = false, hideCardText = false }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [initialFrameIndex, setInitialFrameIndex] = useState<number>(0);

  // Handle initial URL hash on mount
  useEffect(() => {
    const route = parseStoryHash();
    if (route) {
      const storyIndex = stories.findIndex(s => s.id === route.storyId);
      if (storyIndex !== -1) {
        setActiveStoryIndex(storyIndex);
        setInitialFrameIndex(route.frameIndex ?? 0);
      } else {
        // Invalid story ID, clear hash
        clearStoryHash();
      }
    }
  }, [stories]);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseStoryHash();

      if (!route) {
        // No story in URL, close any open story
        setActiveStoryIndex(null);
        return;
      }

      const storyIndex = stories.findIndex(s => s.id === route.storyId);
      if (storyIndex !== -1) {
        setActiveStoryIndex(storyIndex);
        setInitialFrameIndex(route.frameIndex ?? 0);
      } else {
        // Invalid story ID, close story and clear hash
        setActiveStoryIndex(null);
        clearStoryHash();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [stories]);

  const handleStoryClick = (index: number) => {
    const story = stories[index];
    setActiveStoryIndex(index);
    setInitialFrameIndex(0);
    updateStoryHash(story.id, 0, false); // Push to history
  };

  const handleCloseStory = () => {
    setActiveStoryIndex(null);
    clearStoryHash();
  };

  return (
    <>
      <style>{`
        .stories-hub-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .stories-hub-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .stories-hub-title {
          font-size: 56px;
          font-weight: 700;
          margin: 0 0 16px 0;
          text-align: center;
          letter-spacing: 2px;
          text-transform: uppercase;
          background-image: linear-gradient(90deg, #E8D4A8 0%, #FFE4B8 25%, #E8D4A8 50%, #C19A6B 75%, #D4A574 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: Georgia, "Times New Roman", serif;
          line-height: 1.2;
        }

        .stories-hub-description {
          font-size: 20px;
          color: var(--color-gold-warm);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-family: Georgia, "Times New Roman", serif;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .story-card {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #151515 0%, #1A1A1A 100%);
          border: 2px solid rgba(232, 212, 168, 0.2);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .story-card:hover {
          transform: translateY(-8px);
          border-color: rgba(232, 212, 168, 0.5);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
        }

        .story-card-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .story-card:hover .story-card-background {
          opacity: 0.8;
        }

        .story-card-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
        }

        .story-card-title {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          font-family: Georgia, "Times New Roman", serif;
        }

        .story-card-subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
          line-height: 1.4;
          font-family: Georgia, "Times New Roman", serif;
        }

        .story-card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 12px currentColor;
          z-index: 2;
        }

        .story-card-click-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          border: 1px solid rgba(232, 212, 168, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .story-card:hover .story-card-click-indicator {
          opacity: 1;
        }

        .story-card-click-icon {
          width: 32px;
          height: 32px;
          color: var(--color-gold-warm);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }

        .story-card-click-text {
          font-size: 14px;
          font-weight: 600;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          font-family: Georgia, "Times New Roman", serif;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .stories-hub-title {
            font-size: 36px;
            letter-spacing: 1.5px;
          }

          .stories-hub-description {
            font-size: 16px;
          }

          .stories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .story-card-title {
            font-size: 18px;
          }

          .story-card-subtitle {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .stories-hub-container {
            padding: 20px 16px;
          }

          .stories-grid {
            display: flex;
            overflow-x: auto;
            gap: 16px;
            grid-template-columns: none;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 8px;
          }

          .stories-grid::-webkit-scrollbar {
            display: none;
          }

          .story-card {
            flex: 0 0 140px;
            width: 140px;
            min-width: 140px;
          }

          .story-card-content {
            padding: 16px;
          }

          .story-card-title {
            font-size: 16px;
          }

          .story-card-subtitle {
            font-size: 11px;
          }

          .story-card-click-indicator {
            padding: 12px 16px;
          }

          .story-card-click-icon {
            width: 24px;
            height: 24px;
          }

          .story-card-click-text {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="stories-hub-container">
        {!hideHeader && (
          <div className="stories-hub-header">
            <h1 className="stories-hub-title">Stories</h1>
          </div>
        )}

        <div className="stories-grid">
          {stories.map((story, index) => {
            const BackgroundComponent = STORY_BACKGROUNDS[story.id as StoryId];

            return (
              <div
                key={story.id}
                className="story-card"
                onClick={() => handleStoryClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStoryClick(index);
                  }
                }}
              >
                <div
                  className="story-card-badge"
                  style={{ color: getAccentColorValue(story.accentColor) }}
                />
                <ProportionalSizingProvider>
                  {BackgroundComponent && (
                    <BackgroundComponent
                      accentColor={story.accentColor}
                      className="story-card-background"
                    />
                  )}
                </ProportionalSizingProvider>
                <div className="story-card-click-indicator">
                  <svg className="story-card-click-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  <span className="story-card-click-text">Click to View</span>
                </div>
                {!hideCardText && (
                  <div className="story-card-content">
                    <h3 className="story-card-title">{story.title}</h3>
                    <p className="story-card-subtitle">{story.subtitle}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {activeStoryIndex !== null && (
        <Story
          story={stories[activeStoryIndex]}
          onClose={handleCloseStory}
          initialFrameIndex={initialFrameIndex}
        />
      )}
    </>
  );
};
