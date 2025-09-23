import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

interface UnifiedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: {
    base: 'bg-gray-900 text-white border-transparent',
    hover: 'hover:bg-gray-800',
    focus: 'focus:ring-gray-500',
    disabled: 'disabled:bg-gray-400',
  },
  secondary: {
    base: 'bg-gray-100 text-gray-900 border-transparent',
    hover: 'hover:bg-gray-200',
    focus: 'focus:ring-gray-500',
    disabled: 'disabled:bg-gray-100 disabled:text-gray-400',
  },
  ghost: {
    base: 'bg-transparent text-gray-700 border-transparent',
    hover: 'hover:bg-gray-100',
    focus: 'focus:ring-gray-500',
    disabled: 'disabled:text-gray-400',
  },
  outline: {
    base: 'bg-transparent text-gray-900 border-gray-300',
    hover: 'hover:bg-gray-50 hover:border-gray-400',
    focus: 'focus:ring-gray-500',
    disabled: 'disabled:border-gray-200 disabled:text-gray-400',
  },
};

const sizes = {
  sm: {
    button: 'px-4 py-2 text-sm',
    icon: 'w-4 h-4',
    spacing: 'gap-2',
  },
  md: {
    button: 'px-6 py-3 text-base',
    icon: 'w-5 h-5',
    spacing: 'gap-3',
  },
  lg: {
    button: 'px-8 py-4 text-lg',
    icon: 'w-6 h-6',
    spacing: 'gap-3',
  },
};

export function UnifiedButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: UnifiedButtonProps) {
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];
  
  const isDisabled = disabled || loading;

  const buttonClasses = `
    inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    ${variantStyles.base} ${variantStyles.hover} ${variantStyles.focus} ${variantStyles.disabled}
    ${sizeStyles.button} ${sizeStyles.spacing}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className={`${sizeStyles.icon} animate-spin`} />;
    }
    
    if (icon) {
      return <span className={sizeStyles.icon}>{icon}</span>;
    }
    
    if (variant === 'primary' && !loading) {
      return <ArrowRight className={`${sizeStyles.icon} group-hover:translate-x-1 transition-transform duration-300`} />;
    }
    
    return null;
  };

  return (
    <motion.button
      className={`group ${buttonClasses}`}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      <span className="relative z-10">{children}</span>
      {iconPosition === 'right' && renderIcon()}
    </motion.button>
  );
}
