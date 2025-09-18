import React from 'react';
import { Heart, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageControlsProps {
  onToggleFavorite: () => void;
  onZoom: () => void;
  isFavorite: boolean;
}

export function ImageControls({ onToggleFavorite, onZoom, isFavorite }: ImageControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleFavorite}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <Heart 
          className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
        />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onZoom}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <ZoomIn className="w-5 h-5 text-gray-700" />
      </motion.button>
    </div>
  );
}