import React from 'react';
import { PortraitIntro } from './PortraitIntro';
import { PortraitGallery } from './PortraitGallery';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export function Portrait() {
  return (
    <motion.section 
      id="portrait" 
      className="py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <PortraitIntro />
        
        {/* 手动刷新按钮 */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            刷新相册数据
          </button>
        </div>
      </div>
      <PortraitGallery />
    </motion.section>
  );
}