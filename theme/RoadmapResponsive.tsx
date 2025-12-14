import React from 'react';

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
}

interface RoadmapProps {
  steps: RoadmapStep[];
}

const RoadmapItem: React.FC<{ step: RoadmapStep }> = ({ step }) => {
  return (
    <div
      style={{
        marginBottom: '60px'
      }}
    >
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--rp-c-text-3)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '16px'
      }}>
        Step {step.step}
      </div>
      <h3 style={{
        fontSize: '48px',
        fontWeight: '800',
        margin: '0 0 20px 0',
        color: 'var(--rp-c-text-1)',
        lineHeight: '1.2',
        letterSpacing: '-0.02em'
      }}>
        {step.title}
      </h3>
      <p style={{
        fontSize: '18px',
        lineHeight: '1.8',
        color: 'var(--rp-c-text-2)',
        margin: '0',
        maxWidth: '800px'
      }}>
        {step.description}
      </p>
    </div>
  );
};

export const Roadmap: React.FC<RoadmapProps> = ({ steps }) => {
  return (
    <div
      id="strategy"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '80px auto',
        padding: '0 20px'
      }}
    >
      <div style={{
        marginBottom: '60px',
        textAlign: 'center'
      }}>
      </div>

      {steps.map((step) => (
        <RoadmapItem
          key={step.step}
          step={step}
        />
      ))}
    </div>
  );
};
