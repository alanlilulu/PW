import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  count: number;
  isLiked: boolean;
  onToggle: () => void;
}

export function LikeButton({ count, isLiked, onToggle }: LikeButtonProps) {
  return (
    <motion.button
      className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ 
          scale: isLiked ? [1, 1.3, 1] : 1,
          color: isLiked ? '#ff4b4b' : 'white'
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
        />
      </motion.div>
      <span>{count}</span>
    </motion.button>
  );
}