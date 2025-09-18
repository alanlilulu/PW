import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Sparkles } from 'lucide-react';
import { DramaHighlight } from './DramaHighlight';

export function DramaJourney() {
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
    <div className="space-y-10">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-4 px-4 py-2 bg-yellow-500/10 rounded-full"
        >
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500 font-medium">{t('drama.title')}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-serif leading-relaxed text-gray-300"
        >
          {t('drama.journey.intro')}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-8"
      >
        {highlights.map((highlight, index) => (
          <DramaHighlight
            key={index}
            title={highlight.title}
            description={highlight.description}
            delay={index * 0.1}
          />
        ))}
      </motion.div>
    </div>
  );
}