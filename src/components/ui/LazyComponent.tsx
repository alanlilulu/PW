import React, { useRef, useEffect } from 'react';
import { useLazyComponent } from '../../hooks/useLazyComponent';

interface LazyComponentProps<T extends React.ComponentType<any>> {
  componentLoader: () => Promise<{ default: T }>;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  [key: string]: any;
}

export const LazyComponent = <T extends React.ComponentType<any>>({
  componentLoader,
  fallback = <div>加载中...</div>,
  threshold = 0.1,
  rootMargin = '100px',
  onLoad,
  onError,
  ...props
}: LazyComponentProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    Component,
    isLoaded,
    isInView,
    error,
    setInView
  } = useLazyComponent(componentLoader, {
    threshold,
    rootMargin,
    fallback
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin, setInView]);

  useEffect(() => {
    if (isLoaded && Component && onLoad) {
      onLoad();
    }
  }, [isLoaded, Component, onLoad]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (error) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          color: '#ef4444',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px'
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
        <div>组件加载失败</div>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {Component ? (
        <Component {...props} />
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyComponent;



