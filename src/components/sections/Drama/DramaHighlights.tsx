import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { DramaHighlight } from './DramaHighlight';

export function DramaHighlights() {
  const { t } = useLanguage();

  const highlights = [
    {
      title: t('drama.journey.highlight1.title'),
      description: t('drama.journey.highlight1.description'),
    },
    {
      title: t('drama.journey.highlight2.title'),
      description: t('drama.journey.highlight2.description'),
    },
    {
      title: t('drama.journey.highlight3.title'),
      description: t('drama.journey.highlight3.description'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {highlights.map((highlight, index) => (
        <DramaHighlight
          key={index}
          {...highlight}
          delay={index * 0.1}
        />
      ))}
    </motion.div>
  );
}