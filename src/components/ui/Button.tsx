import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center px-6 py-3 rounded-none transition-colors text-sm font-medium';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-900',
    outline: 'border border-black text-black hover:bg-black hover:text-white'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}