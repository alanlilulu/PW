import React from 'react';
import { motion } from 'framer-motion';

interface PortraitItemProps {
  src: string;
  alt: string;
}

export function PortraitItem({ src, alt }: PortraitItemProps) {
  return (
    <motion.div
      className="aspect-[3/4] relative overflow-hidden bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}