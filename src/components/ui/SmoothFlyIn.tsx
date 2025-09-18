import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SmoothFlyInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  distance?: number;
  duration?: number;
  stagger?: number;
}

export function SmoothFlyIn({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 100,
  duration = 1.5,
  stagger = 0
}: SmoothFlyInProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { 
        y: distance, 
        opacity: 0, 
        scale: 0.8,
        rotateX: 20,
        filter: 'blur(10px)'
      };
      case 'down': return { 
        y: -distance, 
        opacity: 0, 
        scale: 0.8,
        rotateX: -20,
        filter: 'blur(10px)'
      };
      case 'left': return { 
        x: distance, 
        opacity: 0, 
        scale: 0.8,
        rotateY: 20,
        filter: 'blur(10px)'
      };
      case 'right': return { 
        x: -distance, 
        opacity: 0, 
        scale: 0.8,
        rotateY: -20,
        filter: 'blur(10px)'
      };
      case 'center': return { 
        scale: 0.5, 
        opacity: 0,
        filter: 'blur(20px)'
      };
      default: return { 
        y: distance, 
        opacity: 0, 
        scale: 0.8,
        rotateX: 20,
        filter: 'blur(10px)'
      };
    }
  };

  const getAnimatePosition = () => {
    return { 
      x: 0, 
      y: 0, 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: 'blur(0px)'
    };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94], // 丝滑的缓动曲线
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 1
      }}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      }}
    >
      {children}
    </motion.div>
  );
}
