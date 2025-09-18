import React from 'react';
import { motion } from 'framer-motion';

interface CardFlipProps {
  children: [React.ReactNode, React.ReactNode];
  isFlipped: boolean;
  onFlip: () => void;
}

export function CardFlip({ children, isFlipped, onFlip }: CardFlipProps) {
  const [front, back] = children;
  return (
    <div className="aspect-[3/4] relative cursor-pointer overflow-hidden" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full absolute"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={onFlip}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {front}
        </div>
        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ 
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}