import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroTitle() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-[clamp(4rem,15vw,8rem)] leading-none font-serif text-white"
        variants={fadeInUp}
      >
        {t('hero.greeting')}
      </motion.h1>
      <motion.div 
        className="space-y-6"
        variants={fadeInUp}
      >
        <p className="text-3xl text-gray-200 font-light">
          {t('hero.intro')}
        </p>
        <h2 className="text-5xl text-white font-serif">
          {t('hero.title')}
        </h2>
        <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
          {t('hero.description')}
        </p>
        
        {/* About按钮 */}
        <motion.div
          variants={fadeInUp}
          className="pt-8"
        >
          <Link
            to="/about"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-medium transition-all duration-300 hover:scale-105"
          >
            {/* 背景渐变 */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full border border-white/30 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300" />
            
            {/* 内容 */}
            <span className="relative z-10 mr-3">{t('hero.aboutButton')}</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* 悬停光效 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}