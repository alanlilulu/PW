import React from 'react';
import { Github, Linkedin, Mail, User } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">John Doe</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@example.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}