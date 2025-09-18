import React from 'react';
import { motion } from 'framer-motion';
import { PortraitImage } from '../../../../types';

interface ThumbnailsProps {
  images: PortraitImage[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function Thumbnails({ images, currentIndex, onSelect }: ThumbnailsProps) {
  return (
    <motion.div 
      className="px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(index)}
            className={`relative flex-shrink-0 h-16 aspect-square rounded-lg overflow-hidden
              ${currentIndex === index ? 'ring-2 ring-gray-900' : 'opacity-70 hover:opacity-100'}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}