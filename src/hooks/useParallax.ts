import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options;
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      let transform = '';
      switch (direction) {
        case 'up':
          transform = `translateY(${rate}px)`;
          break;
        case 'down':
          transform = `translateY(${-rate}px)`;
          break;
        case 'left':
          transform = `translateX(${rate}px)`;
          break;
        case 'right':
          transform = `translateX(${-rate}px)`;
          break;
      }

      element.style.transform = transform;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始调用

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return { ref };
}
