import React, { useRef, useEffect, useState } from 'react';

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
}

interface RoadmapProps {
  steps: RoadmapStep[];
  videoSrc: string;
}

const RoadmapItem: React.FC<{ step: RoadmapStep; videoSrc: string; index: number }> = ({
  step,
  videoSrc,
  index
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (videoRef.current) {
              videoRef.current.play();
            }
          } else {
            setIsInView(false);
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0; // Reset video when out of view
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
        rootMargin: '0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        marginBottom: '48px',
        alignItems: 'center'
      }}
    >
      {/* Video Section - 2/3 width */}
      <div style={{
        flex: '2',
        position: 'relative',
        minWidth: 0
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          backgroundColor: '#000',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            Your browser does not support the video tag.
          </video>

          {/* Text overlay on video */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
            padding: '20px',
            width: '90%',
            zIndex: 5
          }}>
            {step.title}
          </div>
        </div>
      </div>

      {/* Text Section - 1/3 width */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Step {step.step}
        </div>
        <h3 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0',
          color: '#1a1a1a',
          lineHeight: '1.3'
        }}>
          {step.title}
        </h3>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#555',
          margin: '0'
        }}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

export const Roadmap: React.FC<RoadmapProps> = ({ steps, videoSrc }) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '80px auto',
      padding: '0 20px'
    }}>
      <div style={{
        marginBottom: '60px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          margin: '0 0 16px 0',
          color: '#1a1a1a'
        }}>
          The Strategy
        </h2>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#555',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Through this learning approach, ANYONE can become a dancer.
        </p>
      </div>

      {steps.map((step, index) => (
        <RoadmapItem
          key={step.step}
          step={step}
          videoSrc={videoSrc}
          index={index}
        />
      ))}
    </div>
  );
};
