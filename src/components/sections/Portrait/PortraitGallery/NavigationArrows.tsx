import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function NavigationArrows({ onPrevious, onNext, hasPrevious, hasNext }: NavigationArrowsProps) {
  return (
    <>
      {hasPrevious && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </motion.button>
      )}
      {hasNext && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </motion.button>
      )}
    </>
  );
}