import React from 'react';
import { Container } from '../../ui/Container';
import { useLanguage } from '../../../contexts/LanguageContext';
import { CareerCard } from './CareerCard';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../ui/SectionWrapper';
import { SectionContent } from '../../ui/SectionContent';
import { DecorativeElement } from '../../ui/DecorativeElement';
import { UnifiedButton } from '../../ui/UnifiedButton';
import { useNavigate } from 'react-router-dom';

export function Career() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <SectionWrapper id="career" background="gray">
      {/* 装饰元素 */}
      <DecorativeElement 
        position="top-right" 
        size="lg" 
        color="gray" 
        delay={1.6}
        opacity={0.08}
      />
      <DecorativeElement 
        position="bottom-left" 
        size="md" 
        color="gray" 
        delay={1.2}
        opacity={0.06}
      />
      
      <Container>
        {/* 标题从上方飞入 */}
        <SectionContent direction="down" delay={0.2} distance={100} duration={1.8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif mb-4">{t('career.title')}</h2>
          </motion.div>
        </SectionContent>
        
        {/* 职业卡片从左右两侧飞入 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <SectionContent direction="left" delay={0.6} distance={120} duration={1.8}>
            <CareerCard
              title={t('career.role1.title')}
              description={t('career.role1.description')}
              period={t('career.role1.period')}
              skills={t('career.role1.skills').split(',')}
              delay={0.2}
            />
          </SectionContent>
          <SectionContent direction="right" delay={0.8} distance={120} duration={1.8}>
            <CareerCard
              title={t('career.role2.title')}
              description={t('career.role2.description')}
              period={t('career.role2.period')}
              skills={t('career.role2.skills').split(',')}
              delay={0.4}
            />
          </SectionContent>
        </div>
        
        {/* Career按钮从下方飞入 */}
        <SectionContent direction="up" delay={1.0} distance={100} duration={1.8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <UnifiedButton
              variant="primary"
              size="lg"
              onClick={() => {
                navigate('/career');
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              className="shadow-lg hover:shadow-xl"
            >
              {t('career.exploreButton')}
            </UnifiedButton>
          </motion.div>
        </SectionContent>
      </Container>
    </SectionWrapper>
  );
}