import { useState, useEffect } from 'react';

interface UseLazyComponentOptions {
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export const useLazyComponent = <T extends React.ComponentType<any>>(
  componentLoader: () => Promise<{ default: T }>,
  options: UseLazyComponentOptions = {}
) => {
  const [Component, setComponent] = useState<T | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    threshold = 0.1,
    rootMargin = '100px',
    fallback = null
  } = options;

  useEffect(() => {
    if (isInView && !Component && !isLoaded) {
      setIsLoaded(true);
      
      componentLoader()
        .then((module) => {
          setComponent(() => module.default);
        })
        .catch((err) => {
          setError(err);
          console.error('Failed to load lazy component:', err);
        });
    }
  }, [isInView, Component, isLoaded, componentLoader]);

  const setInView = (inView: boolean) => {
    setIsInView(inView);
  };

  return {
    Component,
    isLoaded,
    isInView,
    error,
    setInView,
    fallback
  };
};



