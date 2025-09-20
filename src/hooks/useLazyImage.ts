import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
  fallback?: string;
}

export const useLazyImage = (src: string, options: UseLazyImageOptions = {}) => {
  const [imageSrc, setImageSrc] = useState<string>(options.fallback || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    fallback = ''
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        if (fallback) {
          setImageSrc(fallback);
        }
        setIsLoaded(true);
      };
    }
  }, [isInView, src, fallback]);

  return {
    imgRef,
    imageSrc,
    isLoaded,
    isInView
  };
};



