import React from 'react';
import { motion } from 'framer-motion';
import { usePortraitData } from './portraitData';

export function PortraitGrid() {
  const images = usePortraitData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="aspect-[4/3] rounded-lg overflow-hidden"
        >
          <motion.img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}