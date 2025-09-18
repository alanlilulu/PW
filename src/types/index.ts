// Common types used across the application
export interface SectionProps {
  id: string;
  className?: string;
}

export interface ImageProps {
  src: string;
  alt: string;
}

export interface PortraitItem extends ImageProps {
  description: string;
}

export interface SocialLink {
  icon: React.FC<{ className?: string }>;
  href: string;
  label: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}