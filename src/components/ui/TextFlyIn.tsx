import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface TextFlyInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
  duration?: number;
}

export function TextFlyIn({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  stagger = 0.1,
  duration = 0.8
}: TextFlyInProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { 
        y: 60, 
        opacity: 0, 
        scale: 0.9,
        filter: 'blur(8px)'
      };
      case 'down': return { 
        y: -60, 
        opacity: 0, 
        scale: 0.9,
        filter: 'blur(8px)'
      };
      case 'left': return { 
        x: 60, 
        opacity: 0, 
        scale: 0.9,
        filter: 'blur(8px)'
      };
      case 'right': return { 
        x: -60, 
        opacity: 0, 
        scale: 0.9,
        filter: 'blur(8px)'
      };
      default: return { 
        y: 60, 
        opacity: 0, 
        scale: 0.9,
        filter: 'blur(8px)'
      };
    }
  };

  const getAnimatePosition = () => {
    return { 
      x: 0, 
      y: 0, 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)'
    };
  };

  // 如果children是字符串，按字符分割
  const textContent = typeof children === 'string' ? children : children;
  const isString = typeof children === 'string';

  if (isString) {
    const letters = children.split('');
    return (
      <motion.div ref={ref} className={className}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={getInitialPosition()}
            animate={isVisible ? getAnimatePosition() : getInitialPosition()}
            transition={{
              duration,
              delay: delay + (index * stagger),
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            style={{
              display: 'inline-block',
              transformStyle: "preserve-3d"
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
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
