import React from 'react';
import { motion } from 'framer-motion';

interface GalleryImageProps {
  src: string;
  alt: string;
}

export function GalleryImage({ src, alt }: GalleryImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-screen aspect-[2/1] flex items-center justify-center"
    >
      <div className="absolute inset-6 rounded-lg overflow-hidden">
        <div className="w-full h-full">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
}