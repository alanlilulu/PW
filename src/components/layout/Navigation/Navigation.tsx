import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { navigationItems } from './navigationItems';
import { NavigationLink } from './NavigationLink';
import { useLanguage } from '../../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // 处理页面跳转并滚动到顶部
  const handlePageNavigation = (path: string) => {
    navigate(path);
    // 延迟滚动确保页面已加载
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (!isHomePage) return; // 只在主页监听滚动

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const section = navigationItems.find(item => {
        const element = document.getElementById(item.href.slice(1));
        if (!element) return false;
        const { offsetTop, offsetHeight } = element;
        return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
      });

      setActiveSection(section ? section.href.slice(1) : '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <nav className="flex items-center space-x-8">
      {navigationItems.map((item) => {
        if (isHomePage) {
          // 主页：处理不同类型的链接
          if (item.href.startsWith('/')) {
            // 页面路由链接（如 /drama, /photo-management）
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => handlePageNavigation(item.href)}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {t(item.translationKey)}
                </button>
              </motion.div>
            );
          } else if (item.href === '#hero' || item.href === '#portrait') {
            // About 和 Portrait 标签跳转到独立页面
            const path = item.href === '#hero' ? '/about' : '/portrait';
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => handlePageNavigation(path)}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {t(item.translationKey)}
                </button>
              </motion.div>
            );
          } else {
            // 锚点链接（如 #career）
            return (
              <NavigationLink 
                key={item.name} 
                href={item.href}
                isActive={activeSection === item.href.slice(1)}
              >
                {t(item.translationKey)}
              </NavigationLink>
            );
          }
        } else {
          // 其他页面：所有标签都使用路由导航
          let path = '/';
          if (item.href === '#hero') path = '/about';
          else if (item.href === '#portrait') path = '/portrait';
          else if (item.href.startsWith('/')) path = item.href;
          
          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handlePageNavigation(path)}
                className={`text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ${
                  location.pathname === path ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : ''
                }`}
              >
                {t(item.translationKey)}
              </button>
            </motion.div>
          );
        }
      })}
    </nav>
  );
}