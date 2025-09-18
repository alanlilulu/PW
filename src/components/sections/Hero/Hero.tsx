import React from 'react';
import { Container } from '../../ui/Container';
import { motion } from 'framer-motion';
import { staggerChildren } from '../../../utils/animations';
import { HeroTitle } from './HeroTitle';
import { HeroBackground } from './HeroBackground';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-20 flex items-center">
      <HeroBackground />
      <Container className="relative z-10">
        <motion.div 
          className="max-w-3xl"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <HeroTitle />
        </motion.div>
      </Container>
    </section>
  );
}