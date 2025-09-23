import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface UnifiedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants = {
  default: {
    base: 'bg-white border border-gray-300',
    focus: 'focus:border-gray-500 focus:ring-gray-500',
  },
  filled: {
    base: 'bg-gray-100 border border-transparent',
    focus: 'focus:bg-white focus:border-gray-300 focus:ring-gray-500',
  },
  outlined: {
    base: 'bg-transparent border-2 border-gray-300',
    focus: 'focus:border-gray-500 focus:ring-gray-500',
  },
};

const sizes = {
  sm: {
    input: 'px-3 py-2 text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'px-4 py-3 text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    input: 'px-5 py-4 text-lg',
    icon: 'w-6 h-6',
  },
};

export const UnifiedInput = forwardRef<HTMLInputElement, UnifiedInputProps>(
  ({
    label,
    error,
    helperText,
    variant = 'default',
    size = 'md',
    icon,
    iconPosition = 'left',
    className = '',
    ...props
  }, ref) => {
    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];
    
    const hasError = !!error;
    const errorStyles = hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';

    const inputClasses = `
      w-full rounded-lg transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variantStyles.base} ${variantStyles.focus}
      ${sizeStyles.input}
      ${hasError ? errorStyles : ''}
      ${icon && iconPosition === 'left' ? 'pl-10' : ''}
      ${icon && iconPosition === 'right' ? 'pr-10' : ''}
      ${className}
    `.trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className={sizeStyles.icon}>{icon}</span>
            </div>
          )}
          
          <motion.input
            ref={ref}
            className={inputClasses}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className={sizeStyles.icon}>{icon}</span>
            </div>
          )}
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

UnifiedInput.displayName = 'UnifiedInput';
