import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function PortraitIntro() {
  const { t } = useLanguage();

  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-serif mb-8">{t('portrait.title')}</h2>
      <Link
        to="/portrait"
        className="group relative inline-flex items-center justify-center px-4 py-3 text-white font-medium text-sm transition-all duration-300 hover:scale-105"
      >
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300" />
        
        {/* 内容 */}
        <span className="relative z-10">{t('portrait.viewButton')}</span>
        
        {/* 悬停光效 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </motion.div>
  );
}