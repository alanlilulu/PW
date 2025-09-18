import React from 'react';
import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <motion.div 
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <img
        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
    </motion.div>
  );
}