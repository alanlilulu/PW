import React from 'react';
import { Container } from '../ui/Container';
import { Navigation } from './Navigation/Navigation';
import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-light text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">
            AL
          </Link>
          <Navigation />
          <div className="flex items-center space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:contact@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}