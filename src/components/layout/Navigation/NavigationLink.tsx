import React from 'react';
import { motion } from 'framer-motion';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export function NavigationLink({ href, children, isActive }: NavigationLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${
        isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
}