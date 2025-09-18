import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../../utils/animations';
import { useLanguage } from '../../../contexts/LanguageContext';

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
      </motion.div>
    </div>
  );
}