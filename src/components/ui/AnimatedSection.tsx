import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 80,
  duration = 1.2
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { 
        y: distance, 
        opacity: 0, 
        scale: 0.95,
        rotateX: 15
      };
      case 'down': return { 
        y: -distance, 
        opacity: 0, 
        scale: 0.95,
        rotateX: -15
      };
      case 'left': return { 
        x: distance, 
        opacity: 0, 
        scale: 0.95,
        rotateY: 15
      };
      case 'right': return { 
        x: -distance, 
        opacity: 0, 
        scale: 0.95,
        rotateY: -15
      };
      default: return { 
        y: distance, 
        opacity: 0, 
        scale: 0.95,
        rotateX: 15
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
      rotateY: 0
    };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // 更丝滑的缓动函数
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  );
}
