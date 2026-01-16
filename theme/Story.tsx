import React, { useState, useEffect, useRef } from 'react';
import { AccentColor, STORY_BACKGROUNDS, StoryId } from './animations';
import { ProportionalSizingProvider } from './contexts/ProportionalSizingContext';
import './shared-styles.css';

export interface StoryFrame {
  id: string;
  content: React.ReactNode;
}

export interface StoryData {
  id: string;
  title: string;
  subtitle: string;
  accentColor: AccentColor;
  frames: StoryFrame[];
}

interface StoryProps {
  story: StoryData;
  onClose: () => void;
}

export const Story: React.FC<StoryProps> = ({ story, onClose }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Get the appropriate background component for this story
  const BackgroundComponent = STORY_BACKGROUNDS[story.id as StoryId];

  // Lock body scroll when story is open
  useEffect(() => {
    // Save the current scroll position
    const scrollY = window.scrollY;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Reset frame index when story changes
  useEffect(() => {
    setCurrentFrameIndex(0);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [story.id]);

  const currentFrame = story.frames[currentFrameIndex];
  const isLastFrame = currentFrameIndex === story.frames.length - 1;
  const isFirstFrame = currentFrameIndex === 0;

  const handleNextFrame = () => {
    if (isLastFrame) {
      // On last frame, close the story
      onClose();
    } else {
      setCurrentFrameIndex((prev) => prev + 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const handlePreviousFrame = () => {
    if (isFirstFrame) {
      // On first frame, close the story
      onClose();
    } else {
      setCurrentFrameIndex((prev) => prev - 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  // Track scroll events to detect momentum
  const handleScroll = () => {
    isScrolling.current = true;

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set a timeout to reset scrolling state after scroll stops
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 50);
  };

  // Add scroll listener
  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndTime = Date.now();
    const deltaY = Math.abs(touchEndY - touchStartY.current);
    const deltaTime = touchEndTime - touchStartTime.current;

    // If scrolling is active (momentum), ignore tap
    if (isScrolling.current) {
      return;
    }

    // Stricter thresholds: both duration AND movement must be within limits
    // Duration must be < 200ms AND vertical movement must be < 8px
    if (deltaY > 8 || deltaTime > 200) {
      return; // User was scrolling or holding, not tapping
    }

    // Prevent the synthetic click event from firing
    e.preventDefault();

    // Determine navigation direction based on horizontal position
    // Use the ENDING position to determine which side was tapped
    const tapX = touchEndX;
    const viewerWidth = e.currentTarget.clientWidth;
    const isLeftHalf = tapX < viewerWidth / 2;

    if (isLeftHalf) {
      handlePreviousFrame();
    } else {
      handleNextFrame();
    }
  };

  // Mouse click handler for desktop
  const handleClick = (e: React.MouseEvent) => {
    // Determine navigation direction based on horizontal position
    const clickX = e.clientX;
    const viewerRect = e.currentTarget.getBoundingClientRect();
    const relativeX = clickX - viewerRect.left;
    const isLeftHalf = relativeX < viewerRect.width / 2;

    if (isLeftHalf) {
      handlePreviousFrame();
    } else {
      handleNextFrame();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentFrameIndex === story.frames.length - 1) {
          // On last frame, close the story
          onClose();
        } else {
          setCurrentFrameIndex((prev) => prev + 1);
          if (contentRef.current) {
            contentRef.current.scrollTop = 0;
          }
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentFrameIndex === 0) {
          // On first frame, close the story
          onClose();
        } else {
          setCurrentFrameIndex((prev) => prev - 1);
          if (contentRef.current) {
            contentRef.current.scrollTop = 0;
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrameIndex, story.frames.length, onClose]);

  return (
    <>
      <style>{`
        /* Hide rspress navigation and UI when story is open */
        body:has(.story-container) .navContainer_d18b1,
        body:has(.story-container) .sidebar_dd719,
        body:has(.story-container) .aside-container_bc5fa,
        body:has(.story-container) nav {
          display: none !important;
        }

        .story-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 999999 !important;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .story-viewer {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 500px;
          background: #151515;
          overflow: hidden;
        }

        .story-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          gap: 4px;
          padding: 8px;
          z-index: 10;
        }

        .story-progress-segment {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .story-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 2px;
        }

        .story-header {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .story-title-container {
          flex: 1;
        }

        .story-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-gold-light);
          margin: 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          font-family: Georgia, "Times New Roman", serif;
        }

        .story-subtitle {
          font-size: 14px;
          color: var(--color-gold-warm);
          opacity: 0.9;
          margin: 4px 0 0 0;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
          font-family: Georgia, "Times New Roman", serif;
        }

        .story-close-button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .story-close-button:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .story-content {
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 20px;
          z-index: 1;
          -webkit-overflow-scrolling: touch;
          font-family: Georgia, "Times New Roman", serif;
        }

        .story-content * {
          font-family: inherit;
        }

        .story-content::-webkit-scrollbar {
          width: 4px;
        }

        .story-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        .story-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .story-interaction-layer {
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 5;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        @media (min-width: 768px) {
          .story-viewer {
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          }
        }
      `}</style>

      <div className="story-container" onClick={onClose}>
        <div className="story-viewer" onClick={(e) => e.stopPropagation()}>
          {BackgroundComponent && (
            <ProportionalSizingProvider>
              <BackgroundComponent accentColor={story.accentColor} />
            </ProportionalSizingProvider>
          )}

          {/* Progress Bar */}
          <div className="story-progress-bar">
            {story.frames.map((frame, index) => (
              <div key={frame.id} className="story-progress-segment">
                <div
                  className="story-progress-fill"
                  style={{
                    width: index < currentFrameIndex ? '100%' : index === currentFrameIndex ? '0%' : '0%',
                    transition: index === currentFrameIndex ? 'none' : 'width 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="story-header">
            <div className="story-title-container">
              <h2 className="story-title">{story.title}</h2>
              <p className="story-subtitle">{story.subtitle}</p>
            </div>
            <button className="story-close-button" onClick={onClose} aria-label="Close story">
              ×
            </button>
          </div>

          {/* Content */}
          <div className="story-content" ref={contentRef}>
            {currentFrame.content}
          </div>

          {/* Unified Interaction Layer */}
          <div
            className="story-interaction-layer"
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
    </>
  );
};
