import React from 'react';
import { Container } from '../../ui/Container';
import { useLanguage } from '../../../contexts/LanguageContext';
import { CareerCard } from './CareerCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '../../ui/SectionWrapper';
import { SectionContent } from '../../ui/SectionContent';
import { DecorativeElement } from '../../ui/DecorativeElement';
import { HoverCard } from '../../ui/HoverCard';

export function Career() {
  const { t } = useLanguage();

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
            <HoverCard scale={1.05} shadow={true} lift={true}>
              <button
                className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-medium transition-all duration-300"
                onClick={() => {
                  // 暂时滚动到页面顶部，将来可以跳转到Career页面
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {/* 背景渐变 */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300" />
                
                {/* 内容 */}
                <span className="relative z-10 mr-3">{t('career.exploreButton')}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* 悬停光效 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </HoverCard>
          </motion.div>
        </SectionContent>
      </Container>
    </SectionWrapper>
  );
}