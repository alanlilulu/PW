import React from 'react';
import { motion } from 'framer-motion';

interface UnifiedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const variants = {
  default: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-md border border-gray-100',
  outlined: 'bg-transparent border-2 border-gray-300',
  glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function UnifiedCard({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  onClick,
}: UnifiedCardProps) {
  const baseClasses = `
    rounded-xl transition-all duration-300
    ${variants[variant]}
    ${paddings[padding]}
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const CardComponent = onClick ? motion.div : motion.div;

  return (
    <CardComponent
      className={baseClasses}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </CardComponent>
  );
}
