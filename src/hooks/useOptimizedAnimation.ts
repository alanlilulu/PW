import { useMemo } from 'react';

interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export function useOptimizedAnimation(config: AnimationConfig) {
  return useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: config.duration,
      ease: config.ease,
      delay: config.delay || 0
    }
  }), [config.duration, config.ease, config.delay]);
}

export function useReducedMotion() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
}

export function useOptimizedHover() {
  return useMemo(() => ({
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }), []);
}
