import React from 'react';
import { SmoothFlyIn } from './SmoothFlyIn';

interface DecorativeElementProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size: 'sm' | 'md' | 'lg' | 'xl';
  color: 'blue' | 'purple' | 'yellow' | 'gray' | 'green';
  delay?: number;
  duration?: number;
  opacity?: number;
}

export function DecorativeElement({ 
  position, 
  size, 
  color, 
  delay = 1.0,
  duration = 2.0,
  opacity = 0.1
}: DecorativeElementProps) {
  const getPositionClass = () => {
    switch (position) {
      case 'top-left': return 'absolute top-20 left-10';
      case 'top-right': return 'absolute top-20 right-10';
      case 'bottom-left': return 'absolute bottom-20 left-10';
      case 'bottom-right': return 'absolute bottom-20 right-10';
      case 'center': return 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default: return 'absolute top-20 left-10';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-24 h-24';
      case 'md': return 'w-32 h-32';
      case 'lg': return 'w-48 h-48';
      case 'xl': return 'w-64 h-64';
      default: return 'w-32 h-32';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'blue': return `bg-gradient-to-r from-blue-500/${opacity * 100} to-blue-600/${opacity * 100}`;
      case 'purple': return `bg-gradient-to-r from-purple-500/${opacity * 100} to-purple-600/${opacity * 100}`;
      case 'yellow': return `bg-gradient-to-r from-yellow-500/${opacity * 100} to-yellow-600/${opacity * 100}`;
      case 'gray': return `bg-gradient-to-r from-gray-500/${opacity * 100} to-gray-600/${opacity * 100}`;
      case 'green': return `bg-gradient-to-r from-green-500/${opacity * 100} to-green-600/${opacity * 100}`;
      default: return `bg-gradient-to-r from-blue-500/${opacity * 100} to-blue-600/${opacity * 100}`;
    }
  };

  return (
    <SmoothFlyIn delay={delay} direction="center" duration={duration}>
      <div className={`
        ${getPositionClass()}
        ${getSizeClass()}
        ${getColorClass()}
        rounded-full blur-3xl
      `} />
    </SmoothFlyIn>
  );
}
