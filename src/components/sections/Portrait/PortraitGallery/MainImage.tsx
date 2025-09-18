import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortraitImage } from '../../../../types';

interface MainImageProps {
  image: PortraitImage;
}

export function MainImage({ image }: MainImageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={image.src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[90%] mx-auto"
      >
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[75vh] w-auto mx-auto object-contain"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}