import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  background?: 'white' | 'gray' | 'dark' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  overflow?: boolean;
}

export function SectionWrapper({ 
  children, 
  id, 
  className = '',
  background = 'white',
  padding = 'lg',
  overflow = true
}: SectionWrapperProps) {
  const getBackgroundClass = () => {
    switch (background) {
      case 'white': return 'bg-white';
      case 'gray': return 'bg-gray-50';
      case 'dark': return 'bg-gray-900';
      case 'gradient': return 'bg-gradient-to-br from-gray-50 to-white';
      default: return 'bg-white';
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case 'sm': return 'py-16';
      case 'md': return 'py-20';
      case 'lg': return 'py-24';
      default: return 'py-24';
    }
  };

  return (
    <motion.section 
      id={id}
      className={`
        ${getBackgroundClass()} 
        ${getPaddingClass()} 
        ${overflow ? 'relative overflow-hidden' : 'relative'}
        ${className}
      `}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
