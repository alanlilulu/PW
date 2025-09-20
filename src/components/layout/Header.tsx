import { Container } from '../ui/Container';
import { Navigation } from './Navigation/Navigation';
import { Instagram, Mail, Home, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="group relative flex items-center space-x-2 px-3 py-2 rounded-lg text-2xl font-light text-gray-900 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              title="回到首页"
            >
              <Home className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="group-hover:ml-0 transition-all duration-200">AL</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-200" />
            </Link>
          </motion.div>
          <Navigation />
          <div className="flex items-center space-x-4">
            {/* 语言切换按钮 */}
            <motion.button
              className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200 border border-gray-200 hover:border-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              title={language === 'en' ? '切换到中文' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span className="font-medium text-sm">
                {language === 'en' ? '中文' : 'EN'}
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-200" />
            </motion.button>
            
            {/* 社交媒体链接 */}
            <motion.a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href="mailto:contact@example.com" 
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </Container>
    </header>
  );
}