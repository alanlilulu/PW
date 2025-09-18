import React from 'react';
import { Heart, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GalleryControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onToggleFavorite: () => void;
  onZoom: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isFavorite: boolean;
}

export function GalleryControls({
  onPrevious,
  onNext,
  onToggleFavorite,
  onZoom,
  hasPrevious,
  hasNext,
  isFavorite,
}: GalleryControlsProps) {
  return (
    <>
      {/* Navigation Arrows */}
      {hasPrevious && (
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </motion.button>
      )}
      {hasNext && (
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </motion.button>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} 
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={onZoom}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-colors"
        >
          <ZoomIn className="w-5 h-5 text-gray-900" />
        </motion.button>
      </div>
    </>
  );
}