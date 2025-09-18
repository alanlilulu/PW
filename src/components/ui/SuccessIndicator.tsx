import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessIndicatorProps {
  isVisible: boolean;
  message: string;
  onComplete?: () => void;
}

export function SuccessIndicator({ isVisible, message, onComplete }: SuccessIndicatorProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowSuccess(true);
      // 1.5秒后自动隐藏
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-6 right-6 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-3 flex items-center space-x-2 border-l-3 border-green-500">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-800">已打开相册</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
