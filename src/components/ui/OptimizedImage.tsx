import React, { useState, useEffect } from 'react';
import { useLazyImage } from '../../hooks/useLazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: React.ReactNode;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallback,
  className = '',
  style = {},
  placeholder,
  quality = 80,
  format = 'auto',
  sizes = '100vw',
  onLoad,
  onError
}) => {
  const [imageFormat, setImageFormat] = useState<string>('jpeg');
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [isFormatSupported, setIsFormatSupported] = useState<boolean>(false);
  
  const { imgRef, imageSrc, isLoaded, isInView } = useLazyImage(
    optimizedSrc || src, 
    { fallback }
  );

  // 检测浏览器支持的图片格式
  useEffect(() => {
    const detectFormat = async () => {
      try {
        if (format === 'auto' || format === 'webp') {
          const webpSupported = await testWebPSupport();
          if (webpSupported) {
            setImageFormat('webp');
            setIsFormatSupported(true);
            return;
          }
        }
        
        if (format === 'auto' || format === 'avif') {
          const avifSupported = await testAVIFSupport();
          if (avifSupported) {
            setImageFormat('avif');
            setIsFormatSupported(true);
            return;
          }
        }
        
        setImageFormat('jpeg');
        setIsFormatSupported(false);
      } catch (error) {
        console.warn('Format detection failed:', error);
        setImageFormat('jpeg');
        setIsFormatSupported(false);
      }
    };

    detectFormat();
  }, [format]);

  // 生成优化后的图片URL
  useEffect(() => {
    if (isFormatSupported && imageFormat !== 'jpeg') {
      const optimizedUrl = generateOptimizedUrl(src, imageFormat, quality);
      setOptimizedSrc(optimizedUrl);
    } else {
      setOptimizedSrc(src);
    }
  }, [src, imageFormat, quality, isFormatSupported]);

  const handleLoad = () => {
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (onError) onError();
  };

  return (
    <div className={className} style={style}>
      {!isLoaded && placeholder && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            fontSize: '14px',
            minHeight: '200px'
          }}
        >
          {placeholder}
        </div>
      )}
      
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: 'auto',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          ...style
        }}
      />
      
      {!isInView && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#9ca3af'
          }}
        >
          加载中...
        </div>
      )}
      
      {/* 格式信息提示 */}
      {isFormatSupported && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'monospace'
          }}
        >
          {imageFormat.toUpperCase()}
        </div>
      )}
    </div>
  );
};

// 测试WebP支持
const testWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      const dataURL = canvas.toDataURL('image/webp');
      resolve(dataURL !== 'data:,');
    } catch {
      resolve(false);
    }
  });
};

// 测试AVIF支持
const testAVIFSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      const dataURL = canvas.toDataURL('image/avif');
      resolve(dataURL !== 'data:,');
    } catch {
      resolve(false);
    }
  });
};

// 生成优化后的图片URL
const generateOptimizedUrl = (src: string, format: string, quality: number): string => {
  // 这里可以集成真实的图片优化服务
  // 目前返回原URL，实际使用时需要替换为真实的优化服务
  if (format === 'webp' && quality < 100) {
    return `${src}?format=webp&quality=${quality}`;
  }
  if (format === 'avif' && quality < 100) {
    return `${src}?format=avif&quality=${quality}`;
  }
  return src;
};

export default OptimizedImage;

