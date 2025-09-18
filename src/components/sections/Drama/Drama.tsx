import React from 'react';
import { Container } from '../../ui/Container';
import { useLanguage } from '../../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Drama() {
  const { t } = useLanguage();

  return (
    <section id="drama" className="py-20 bg-gray-900">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif mb-8 text-white">{t('drama.title')}</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('drama.journey.intro')}
            </p>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212"
                alt="Stage Performance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-yellow-500/20 rounded-lg" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-yellow-500/20 rounded-lg" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}