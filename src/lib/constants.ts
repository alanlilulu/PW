export const APP_CONFIG = {
  siteTitle: 'Alan Li - Software Engineer & Artist',
  headerHeight: 80,
  smoothScrollDuration: 800,
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'About', href: '#hero', translationKey: 'nav.about' },
  { name: 'Portrait', href: '#portrait', translationKey: 'nav.portrait' },
  { name: 'Drama', href: '#drama', translationKey: 'nav.drama' },
  { name: 'Career', href: '#career', translationKey: 'nav.career' },
] as const;

export const SOCIAL_LINKS = [
  { href: 'mailto:hello@alanli.com', label: 'Email' },
  { href: 'https://linkedin.com/in/alanli', label: 'LinkedIn' },
  { href: 'https://instagram.com/alanli', label: 'Instagram' },
] as const;