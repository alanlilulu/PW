import React from 'react';
import { TextFlyIn } from './TextFlyIn';

interface SectionTitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  stagger?: number;
}

export function SectionTitle({ 
  children, 
  level = 2,
  className = '',
  direction = 'up',
  delay = 0.2,
  stagger = 0.05
}: SectionTitleProps) {
  const getTag = () => {
    switch (level) {
      case 1: return 'h1';
      case 2: return 'h2';
      case 3: return 'h3';
      default: return 'h2';
    }
  };

  const getDefaultClass = () => {
    switch (level) {
      case 1: return 'text-5xl font-bold text-gray-900 mb-6';
      case 2: return 'text-4xl font-serif text-gray-900 mb-8';
      case 3: return 'text-3xl font-semibold text-gray-800 mb-4';
      default: return 'text-4xl font-serif text-gray-900 mb-8';
    }
  };

  const Tag = getTag() as keyof JSX.IntrinsicElements;

  return (
    <TextFlyIn 
      direction={direction} 
      delay={delay} 
      stagger={stagger}
      className={`${getDefaultClass()} ${className}`}
    >
      <Tag>{children}</Tag>
    </TextFlyIn>
  );
}
