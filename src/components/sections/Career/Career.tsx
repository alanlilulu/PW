import React from 'react';
import { Container } from '../../ui/Container';
import { useLanguage } from '../../../contexts/LanguageContext';
import { CareerCard } from './CareerCard';
import { motion } from 'framer-motion';

export function Career() {
  const { t } = useLanguage();

  return (
    <section id="career" className="py-24 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-4">{t('career.title')}</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <CareerCard
            title={t('career.role1.title')}
            description={t('career.role1.description')}
            period={t('career.role1.period')}
            skills={t('career.role1.skills').split(',')}
            delay={0.2}
          />
          <CareerCard
            title={t('career.role2.title')}
            description={t('career.role2.description')}
            period={t('career.role2.period')}
            skills={t('career.role2.skills').split(',')}
            delay={0.4}
          />
        </div>
      </Container>
    </section>
  );
}