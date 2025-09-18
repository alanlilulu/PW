import React from 'react';
import { SmoothFlyIn } from './SmoothFlyIn';

interface SectionContentProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}

export function SectionContent({ 
  children, 
  direction = 'up',
  delay = 0.2,
  distance = 100,
  duration = 1.8,
  className = ''
}: SectionContentProps) {
  return (
    <SmoothFlyIn 
      delay={delay} 
      direction={direction} 
      distance={distance} 
      duration={duration}
      className={className}
    >
      {children}
    </SmoothFlyIn>
  );
}
