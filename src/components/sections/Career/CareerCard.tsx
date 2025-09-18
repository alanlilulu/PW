import React from 'react';
import { motion } from 'framer-motion';

interface CareerCardProps {
  title: string;
  description: string;
  period: string;
  skills: string[];
  delay?: number;
}

export function CareerCard({ title, description, period, skills, delay = 0 }: CareerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-serif">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-500 text-sm">{period}</p>
        <div className="flex flex-wrap gap-2 pt-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}