import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavigationButtonProps {
  onClick: () => void;
  Icon: LucideIcon;
  direction: 'left' | 'right';
}

export function NavigationButton({ onClick, Icon, direction }: NavigationButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute ${direction === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors`}
    >
      <Icon className="w-6 h-6 text-gray-900" />
    </motion.button>
  );
}