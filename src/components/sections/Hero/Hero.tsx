import React from 'react';
import { Container } from '../../ui/Container';
import { motion } from 'framer-motion';
import { staggerChildren } from '../../../utils/animations';
import { HeroTitle } from './HeroTitle';
import { HeroBackground } from './HeroBackground';
import { SectionWrapper } from '../../ui/SectionWrapper';
import { SectionContent } from '../../ui/SectionContent';
import { DecorativeElement } from '../../ui/DecorativeElement';
import { useParallax } from '../../../hooks/useParallax';

export function Hero() {
  const { ref: parallaxRef } = useParallax({ speed: 0.3, direction: 'up' });

  return (
    <SectionWrapper 
      id="hero" 
      background="gradient" 
      className="min-h-screen pt-20 flex items-center"
    >
      <HeroBackground />
      
      {/* 装饰元素 */}
      <DecorativeElement 
        position="top-left" 
        size="sm" 
        color="blue" 
        delay={1.0}
        opacity={0.15}
      />
      <DecorativeElement 
        position="top-right" 
        size="md" 
        color="purple" 
        delay={1.4}
        opacity={0.20}
      />
      
      <Container className="relative z-10">
        <SectionContent direction="up" delay={0.3} distance={150} duration={2.0}>
          <motion.div 
            className="max-w-3xl"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <HeroTitle />
          </motion.div>
        </SectionContent>
      </Container>
    </SectionWrapper>
  );
}