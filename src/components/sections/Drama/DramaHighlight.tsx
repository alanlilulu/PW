import React from 'react';
import { motion } from 'framer-motion';

interface DramaHighlightProps {
  title: string;
  description: string;
  delay?: number;
}

export function DramaHighlight({ title, description, delay = 0 }: DramaHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="relative pl-8">
        <div className="absolute left-0 top-[12px] w-4 h-[2px] bg-gray-500 group-hover:bg-yellow-500 group-hover:w-6 transition-all duration-300" />
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}