import { Mail, Instagram, Linkedin } from 'lucide-react';

export const SOCIAL_LINKS = [
  {
    icon: Mail,
    href: 'mailto:hello@anulikajoy.com',
    label: 'Email'
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/anulika',
    label: 'LinkedIn'
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/anulika',
    label: 'Instagram'
  }
] as const;