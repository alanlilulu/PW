import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const variants = {
  primary: {
    background: 'bg-gradient-to-r from-gray-900 to-black',
    hoverBackground: 'group-hover:shadow-xl',
    lightEffect: 'via-white/5',
  },
  secondary: {
    background: 'bg-gradient-to-r from-gray-700 to-gray-800',
    hoverBackground: 'group-hover:shadow-xl',
    lightEffect: 'via-white/10',
  },
  accent: {
    background: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
    hoverBackground: 'group-hover:shadow-xl',
    lightEffect: 'via-white/20',
  },
  ghost: {
    background: 'bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30',
    hoverBackground: 'group-hover:from-white/30 group-hover:to-white/20',
    lightEffect: 'via-white/10',
  },
};

const sizes = {
  sm: 'px-6 py-3 text-sm',
  md: 'px-8 py-4 text-base',
  lg: 'px-10 py-5 text-lg',
};

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const buttonClasses = `
    group relative inline-flex items-center justify-center font-medium transition-all duration-300 
    hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${sizes[size]} ${className}
  `.trim();

  const variantStyles = variants[variant];

  const buttonContent = (
    <>
      {/* 背景渐变 */}
      <div className={`absolute inset-0 ${variantStyles.background} rounded-full shadow-lg ${variantStyles.hoverBackground} transition-all duration-300`} />
      
      {/* 内容 */}
      <span className="relative z-10 mr-3">{children}</span>
      <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      
      {/* 悬停光效 */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-transparent ${variantStyles.lightEffect} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
    >
      {buttonContent}
    </motion.button>
  );
}
