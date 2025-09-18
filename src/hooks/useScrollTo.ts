import { useCallback } from 'react';

export function useScrollTo() {
  const scrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const headerOffset = 80; // Height of fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  return scrollTo;
}