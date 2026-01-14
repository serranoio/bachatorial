import React, { useEffect, useState } from 'react';
import { StoryData } from './Story';
import { STORY_BACKGROUNDS, StoryId } from './animations';
import { ProportionalSizingProvider } from './contexts/ProportionalSizingContext';

interface ExportStoryViewProps {
  story: StoryData;
  frameIndex: number;
  showCover: boolean;
}

/**
 * ExportStoryView renders a story frame at Instagram Story dimensions (1080x1920)
 * for programmatic capture and export.
 */
export const ExportStoryView: React.FC<ExportStoryViewProps> = ({
  story,
  frameIndex,
  showCover,
}) => {
  const [isReady, setIsReady] = useState(false);
  const BackgroundComponent = STORY_BACKGROUNDS[story.id as StoryId];

  // Signal when component is fully mounted and ready to capture
  useEffect(() => {
    // Give the canvas animation a moment to initialize
    const timer = setTimeout(() => {
      setIsReady(true);
      // Add data attribute to body so Playwright knows we're ready
      document.body.setAttribute('data-export-ready', 'true');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const currentFrame = story.frames[frameIndex];

  return (
    <>
      <style>{`
        :root {
          --color-gold-light: #E8D4A8;
          --color-gold-lighter: #FFE4B8;
          --color-gold-medium: #C19A6B;
          --color-gold-dark: #D4A574;
          --color-gold-muted: #C5A87A;
          --color-gold-warm: #E5C8A0;
          --color-gold-peachy: #DCBE8C;
          --color-coral: #FF9B7F;
          --color-coral-light: #FFB89D;
          --color-peach: #FFB496;
          --color-bronze: #D4A574;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .export-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 1080px;
          height: 1920px;
          background: #151515;
          overflow: hidden;
          font-family: Georgia, "Times New Roman", serif;
        }

        .export-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .export-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          padding: 80px 60px;
          color: white;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .export-content * {
          font-family: inherit;
          -webkit-text-fill-color: initial !important;
          -webkit-text-stroke: 0 !important;
          -webkit-text-stroke-width: 0 !important;
          -webkit-text-stroke-color: transparent !important;
          background-clip: initial !important;
          -webkit-background-clip: initial !important;
          background-image: none !important;
        }

        /* Scale text appropriately for 1080px width */
        .export-content h2 {
          font-size: 72px !important;
        }

        .export-content h3 {
          font-size: 48px !important;
        }

        .export-content p {
          font-size: 32px !important;
          line-height: 1.6 !important;
        }

        .export-content li {
          font-size: 28px !important;
          line-height: 2 !important;
        }

        /* Hide scrollbar but keep functionality */
        .export-content::-webkit-scrollbar {
          width: 0;
          display: none;
        }
      `}</style>

      <div className="export-container">
        <ProportionalSizingProvider baseWidth={1080} baseHeight={1920}>
          {/* Animated Background */}
          {BackgroundComponent && (
            <div className="export-background">
              <BackgroundComponent accentColor={story.accentColor} />
            </div>
          )}

          {/* Content (only show if not cover) */}
          {!showCover && currentFrame && (
            <div className="export-content">{currentFrame.content}</div>
          )}

          {/* Ready indicator for debugging */}
          {isReady && (
            <div
              id="export-ready-indicator"
              style={{ display: 'none' }}
              data-ready="true"
            />
          )}
        </ProportionalSizingProvider>
      </div>
    </>
  );
};