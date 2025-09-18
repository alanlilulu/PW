import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { XiaohongshuIcon } from '../../ui/icons/XiaohongshuIcon';

const socialLinks = [
  {
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:hello@alanli.com',
    label: 'Email'
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://linkedin.com/in/alanli',
    label: 'LinkedIn'
  },
  {
    icon: <XiaohongshuIcon />,
    href: 'https://www.xiaohongshu.com/user/profile/alanli',
    label: 'Xiaohongshu'
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: 'https://instagram.com/alanli',
    label: 'Instagram'
  }
];

export function SocialLinks() {
  return (
    <div className="flex space-x-6">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}