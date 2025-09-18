import React from 'react';
import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  shadow?: boolean;
  glow?: boolean;
  lift?: boolean;
}

export function HoverCard({ 
  children, 
  className = '',
  scale = 1.05,
  rotate = 0,
  shadow = true,
  glow = false,
  lift = true
}: HoverCardProps) {
  return (
    <motion.div
      className={`transition-all duration-500 ease-out ${className}`}
      initial={{ 
        scale: 1,
        rotate: 0,
        y: 0,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
      whileHover={{
        scale,
        rotate,
        y: lift ? -8 : 0,
        boxShadow: shadow ? '0 25px 50px rgba(0,0,0,0.15)' : undefined,
        filter: glow ? 'brightness(1.1) saturate(1.1)' : undefined
      }}
      whileTap={{ 
        scale: 0.98,
        y: lift ? -4 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  );
}
