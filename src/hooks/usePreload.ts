import { useEffect, useRef } from 'react';

interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  type?: 'fetch' | 'preload' | 'prefetch';
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export const usePreload = () => {
  const preloadedResources = useRef<Set<string>>(new Set());

  const preloadResource = (
    url: string,
    options: PreloadOptions = {}
  ) => {
    const {
      priority = 'auto',
      type = 'preload',
      crossOrigin = 'anonymous'
    } = options;

    if (preloadedResources.current.has(url)) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      try {
        if (type === 'preload') {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = url;
          link.as = getResourceType(url);
          link.crossOrigin = crossOrigin;
          
          if (priority === 'high') {
            link.setAttribute('importance', 'high');
          }
          
          link.onload = () => {
            preloadedResources.current.add(url);
            resolve();
          };
          
          link.onerror = () => {
            reject(new Error(`Failed to preload: ${url}`));
          };
          
          document.head.appendChild(link);
        } else if (type === 'prefetch') {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          link.crossOrigin = crossOrigin;
          
          link.onload = () => {
            preloadedResources.current.add(url);
            resolve();
          };
          
          link.onerror = () => {
            reject(new Error(`Failed to prefetch: ${url}`));
          };
          
          document.head.appendChild(link);
        } else if (type === 'fetch') {
          fetch(url, { 
            method: 'GET',
            mode: 'cors',
            credentials: crossOrigin === 'use-credentials' ? 'include' : 'same-origin'
          })
            .then(() => {
              preloadedResources.current.add(url);
              resolve();
            })
            .catch(reject);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const preloadImage = (src: string, priority: 'high' | 'low' = 'low') => {
    return preloadResource(src, { 
      type: 'preload', 
      priority,
      crossOrigin: 'anonymous'
    });
  };

  const preloadScript = (src: string, priority: 'high' | 'low' = 'low') => {
    return preloadResource(src, { 
      type: 'preload', 
      priority,
      crossOrigin: 'anonymous'
    });
  };

  const preloadStyle = (href: string, priority: 'high' | 'low' = 'low') => {
    return preloadResource(href, { 
      type: 'preload', 
      priority,
      crossOrigin: 'anonymous'
    });
  };

  const prefetchResource = (url: string) => {
    return preloadResource(url, { type: 'prefetch' });
  };

  const isPreloaded = (url: string) => {
    return preloadedResources.current.has(url);
  };

  // 预加载关键资源
  useEffect(() => {
    // 预加载关键CSS
    preloadStyle('/static/css/main.css', 'high');
    
    // 预加载关键字体
    preloadResource('/fonts/inter-var.woff2', { 
      type: 'preload',
      priority: 'high'
    });
    
    // 预加载首屏图片
    preloadImage('/images/hero-bg.jpg', 'high');
    
    // 预取其他页面资源
    prefetchResource('/api/portrait-images');
    prefetchResource('/api/drama-works');
  }, []);

  return {
    preloadResource,
    preloadImage,
    preloadScript,
    preloadStyle,
    prefetchResource,
    isPreloaded
  };
};

// 根据URL判断资源类型
function getResourceType(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'css':
      return 'style';
    case 'js':
      return 'script';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'avif':
      return 'image';
    case 'woff':
    case 'woff2':
    case 'ttf':
    case 'otf':
      return 'font';
    case 'mp4':
    case 'webm':
    case 'ogg':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'audio';
    default:
      return 'fetch';
  }
}

