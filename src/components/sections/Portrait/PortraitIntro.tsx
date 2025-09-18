import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
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
      <h2 className="text-3xl font-serif mb-3">{t('portrait.title')}</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
        探索我的人像摄影作品集，每一帧都捕捉着独特的瞬间与情感
      </p>
      <Link
        to="/portrait"
        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 group"
      >
        <span>查看详细作品集</span>
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </motion.div>
  );
}