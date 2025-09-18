import React from 'react';
import { motion } from 'framer-motion';
import { useImageAspectRatio } from '../../../hooks/useImageAspectRatio';

interface PortraitImageProps {
  src: string;
  alt: string;
}

export function PortraitImage({ src, alt }: PortraitImageProps) {
  const aspectRatio = useImageAspectRatio(src);
  const isLandscape = aspectRatio ? aspectRatio > 1 : false;

  return (
    <motion.div
      className={`relative overflow-hidden bg-gray-100 ${
        isLandscape ? 'col-span-2 md:col-span-1' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative" style={{ paddingBottom: `${(1 / (aspectRatio || 1)) * 100}%` }}>
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
}