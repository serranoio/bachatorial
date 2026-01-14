import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';

interface ProportionalSizingContextValue {
  containerWidth: number;
  containerHeight: number;
  scale: (baseSize: number) => number;
  scaleWidth: (baseSize: number) => number;
  scaleHeight: (baseSize: number) => number;
}

const ProportionalSizingContext = createContext<ProportionalSizingContextValue | null>(null);

interface ProportionalSizingProviderProps {
  children: ReactNode;
  baseWidth?: number; // Reference width for scaling (default: 1920)
  baseHeight?: number; // Reference height for scaling (default: 1080)
}

export const ProportionalSizingProvider: React.FC<ProportionalSizingProviderProps> = ({
  children,
  baseWidth = 1920,
  baseHeight = 1080,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: baseWidth, height: baseHeight });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scale = (baseSize: number): number => {
    // Scale based on the average of width and height scaling factors
    const widthScale = dimensions.width / baseWidth;
    const heightScale = dimensions.height / baseHeight;
    return baseSize * ((widthScale + heightScale) / 2);
  };

  const scaleWidth = (baseSize: number): number => {
    return baseSize * (dimensions.width / baseWidth);
  };

  const scaleHeight = (baseSize: number): number => {
    return baseSize * (dimensions.height / baseHeight);
  };

  const value: ProportionalSizingContextValue = {
    containerWidth: dimensions.width,
    containerHeight: dimensions.height,
    scale,
    scaleWidth,
    scaleHeight,
  };

  return (
    <ProportionalSizingContext.Provider value={value}>
      <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </div>
    </ProportionalSizingContext.Provider>
  );
};

export const useProportionalSizing = (): ProportionalSizingContextValue => {
  const context = useContext(ProportionalSizingContext);
  if (!context) {
    throw new Error('useProportionalSizing must be used within a ProportionalSizingProvider');
  }
  return context;
};
