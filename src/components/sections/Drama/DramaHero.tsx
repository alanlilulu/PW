import React from 'react';
import { motion } from 'framer-motion';
import { useImageLoader } from '../../../hooks/useImageLoader';

export function DramaHero() {
  const { isLoaded } = useImageLoader("https://images.unsplash.com/photo-1507676184212-d03ab07a01bf");

  return (
    <div className="relative">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 1 }}
        className="relative aspect-[4/5] overflow-hidden rounded-lg"
      >
        <img
          src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf"
          alt="Drama Performance"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -bottom-6 -right-6 w-48 h-48 border border-yellow-500/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute -top-6 -left-6 w-32 h-32 border border-yellow-500/20"
      />
    </div>
  );
}