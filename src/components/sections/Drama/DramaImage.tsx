import React from 'react';
import { motion } from 'framer-motion';
import { useImageLoader } from '../../../hooks/useImageLoader';

export function DramaImage() {
  const { isLoaded } = useImageLoader("https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <motion.img
          src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212"
          alt="Stage Performance"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -bottom-4 -right-4 w-32 h-32 border border-yellow-500/20 rounded-lg"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute -top-4 -left-4 w-24 h-24 border border-yellow-500/20 rounded-lg"
      />
    </motion.div>
  );
}