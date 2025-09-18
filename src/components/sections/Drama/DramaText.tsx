import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

export function DramaText() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-xl"
    >
      <p className="text-xl text-gray-300 leading-relaxed">
        {t('drama.journey.intro')}
      </p>
    </motion.div>
  );
}