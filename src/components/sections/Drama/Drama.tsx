import React from 'react';
import { Container } from '../../ui/Container';
import { useLanguage } from '../../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '../../ui/SectionWrapper';
import { SectionContent } from '../../ui/SectionContent';
import { DecorativeElement } from '../../ui/DecorativeElement';
import { HoverCard } from '../../ui/HoverCard';

export function Drama() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="drama" background="dark" padding="md">
      {/* 装饰元素 */}
      <DecorativeElement 
        position="top-right" 
        size="xl" 
        color="yellow" 
        delay={1.4}
        opacity={0.10}
      />
      <DecorativeElement 
        position="bottom-left" 
        size="md" 
        color="yellow" 
        delay={1.0}
        opacity={0.08}
      />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text 从左侧飞入 */}
          <SectionContent direction="left" delay={0.3} distance={150} duration={2.0}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
            <h2 className="text-4xl font-serif mb-8 text-white">{t('drama.title')}</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {t('drama.journey.intro')}
            </p>
            
            {/* Drama按钮 */}
            <HoverCard scale={1.05} shadow={true} glow={true}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-black font-medium transition-all duration-300"
                onClick={() => {
                  // 跳转到Drama页面
                  window.location.href = '/drama';
                }}
              >
                {/* 背景渐变 */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300" />
                
                {/* 内容 */}
                <span className="relative z-10 mr-3">{t('drama.exploreButton')}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* 悬停光效 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </HoverCard>
            </motion.div>
          </SectionContent>

          {/* Right side - Image 从右侧飞入 */}
          <SectionContent direction="right" delay={0.7} distance={150} duration={2.0}>
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
          </SectionContent>
        </div>
      </Container>
    </SectionWrapper>
  );
}