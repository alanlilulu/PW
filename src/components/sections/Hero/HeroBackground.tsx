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
        src="https://res.cloudinary.com/do0c7uhxc/image/upload/v1758270867/ChatGPT_Image_Sep_19_2025_01_34_06_AM_pvrbmo.png"
        alt="摄影师阿龙的个人作品"
        className="w-full h-full object-cover object-right md:object-center"
        onError={(e) => {
          // 如果图片加载失败，显示纯色背景
          e.currentTarget.style.display = 'none';
        }}
      />
      {/* 轻度的渐变遮罩，保持文字可读性 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
    </motion.div>
  );
}