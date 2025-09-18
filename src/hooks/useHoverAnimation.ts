import { useState, useRef, useEffect } from 'react';

interface UseHoverAnimationOptions {
  scale?: number;
  rotate?: number;
  duration?: number;
  ease?: string;
}

export function useHoverAnimation(options: UseHoverAnimationOptions = {}) {
  const {
    scale = 1.05,
    rotate = 0,
    duration = 0.3,
    ease = 'ease-out'
  } = options;

  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const style = {
    transform: isHovered 
      ? `scale(${scale}) ${rotate ? `rotate(${rotate}deg)` : ''}`.trim()
      : 'scale(1) rotate(0deg)',
    transition: `transform ${duration}s ${ease}`,
    cursor: 'pointer'
  };

  return { ref, isHovered, style };
}
