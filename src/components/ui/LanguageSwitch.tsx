import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      title={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === 'en' ? '中文' : 'EN'}</span>
    </motion.button>
  );
}