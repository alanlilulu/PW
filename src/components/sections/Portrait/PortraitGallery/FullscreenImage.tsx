import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortraitImage } from '../../../../types';

interface FullscreenImageProps {
  image: PortraitImage;
}

export function FullscreenImage({ image }: FullscreenImageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={image.src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-screen aspect-[2/1] flex items-center justify-center"
      >
        <div className="absolute inset-6 rounded-lg overflow-hidden">
          <div className="w-full h-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="max-w-7xl mx-auto px-6">
              <p className="text-white text-sm">{image.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}