import React from 'react';
import { Container } from '../../ui/Container';
import { motion } from 'framer-motion';
import { useSectionInView } from '../../../hooks/useSectionInView';

export function About() {
  const { ref } = useSectionInView('about');

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16"
        >
          <div>
            <h2 className="text-2xl font-serif mb-6">About me</h2>
            <p className="text-gray-700 mb-4">
              I create great user interfaces iteratively and design wireframes 
              and prototypes experimentally from hypotheses to experiments and 
              draw conclusions based on data.
            </p>
            <p className="text-gray-700">
              I design visually appealing apps in compliance with industry HCI principles.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-serif mb-6">My Approach</h2>
            <p className="text-gray-700">
              I enjoy collaborating closely with cross-functional teams, iterating in the 
              development process. By practising industry standards, I am constantly 
              striving to create experiences and products that will truly make a positive 
              impact on their users.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}