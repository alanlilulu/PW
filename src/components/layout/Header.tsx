import { Container } from '../ui/Container';
import { Navigation } from './Navigation/Navigation';
import { Instagram, Mail, Home, Globe, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 处理移动端导航点击
  const handleMobileNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - 移动端优化 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="group relative flex items-center space-x-2 px-2 md:px-3 py-2 rounded-lg text-xl md:text-2xl font-light text-gray-900 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              title="回到首页"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="group-hover:ml-0 transition-all duration-200">AL</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-200" />
            </Link>
          </motion.div>
          
          {/* 导航栏 - 移动端隐藏，桌面端显示 */}
          <div className="hidden md:block">
            <Navigation />
          </div>
          
          {/* 右侧按钮组 - 移动端优化 */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* 语言切换按钮 - 移动端简化 */}
            <motion.button
              className="group relative flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200 border border-gray-200 hover:border-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              title={language === 'en' ? '切换到中文' : 'Switch to English'}
            >
              <Globe className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span className="font-medium text-xs md:text-sm">
                {language === 'en' ? '中文' : 'EN'}
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-200" />
            </motion.button>
            
            {/* 社交媒体链接 - 移动端隐藏 */}
            <div className="hidden md:flex items-center space-x-4">
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

            {/* 移动端菜单按钮 */}
            <motion.button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              title="菜单"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </Container>
    </header>

    {/* 移动端导航菜单 */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 md:hidden"
        >
          <Container>
            <div className="py-4 space-y-2">
              {/* 导航链接 */}
              <button
                onClick={() => handleMobileNavigation('/about')}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                About
              </button>
              <button
                onClick={() => handleMobileNavigation('/portrait')}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Portrait
              </button>
              <button
                onClick={() => handleMobileNavigation('/drama')}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Drama
              </button>
              <button
                onClick={() => handleMobileNavigation('/career')}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Career
              </button>
              
              {/* 社交媒体链接 */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 px-4">
                  <motion.a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.a 
                    href="mailto:contact@example.com" 
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="联系我"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}