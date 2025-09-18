import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../contexts/NavigationContext';

export function NavigationOverlay() {
  const { isNavigating } = useNavigation();

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center"
        >
          {/* 简单的加载指示器 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
