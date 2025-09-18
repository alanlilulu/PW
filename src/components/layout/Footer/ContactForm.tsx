import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder={t('footer.form.name')}
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder={t('footer.form.email')}
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-300"
          required
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder={t('footer.form.message')}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-white resize-none transition-colors duration-300"
          required
        />
      </div>
      <motion.button
        type="submit"
        className="w-full px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {t('footer.form.submit')}
      </motion.button>
    </motion.form>
  );
}