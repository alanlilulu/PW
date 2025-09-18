import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  sizes?: string;
  srcSet?: boolean;
}

interface OptimizedImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  format: string;
  optimized: boolean;
}

export const useImageOptimization = (
  originalSrc: string,
  options: ImageOptimizationOptions = {}
) => {
  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const {
    quality = 80,
    format = 'auto',
    sizes = '100vw',
    srcSet = true
  } = options;

  useEffect(() => {
    const optimizeImage = async () => {
      setIsOptimizing(true);
      
      try {
        // 检测浏览器支持的图片格式
        const supportedFormats = await detectSupportedFormats();
        
        // 选择最佳格式
        const bestFormat = format === 'auto' ? 
          (supportedFormats.avif ? 'avif' : supportedFormats.webp ? 'webp' : 'jpeg') : 
          format;
        
        // 生成优化后的图片URL
        const optimizedSrc = generateOptimizedUrl(originalSrc, bestFormat, quality);
        
        // 生成响应式srcSet
        let srcSetValue: string | undefined;
        if (srcSet) {
          srcSetValue = generateSrcSet(originalSrc, bestFormat, quality);
        }
        
        setOptimizedImage({
          src: optimizedSrc,
          srcSet: srcSetValue,
          sizes,
          format: bestFormat,
          optimized: bestFormat !== 'jpeg' || quality < 100
        });
      } catch (error) {
        console.warn('Image optimization failed:', error);
        setOptimizedImage({
          src: originalSrc,
          format: 'jpeg',
          optimized: false
        });
      } finally {
        setIsOptimizing(false);
      }
    };

    if (originalSrc) {
      optimizeImage();
    }
  }, [originalSrc, quality, format, sizes, srcSet]);

  return {
    optimizedImage,
    isOptimizing
  };
};

// 检测浏览器支持的图片格式
const detectSupportedFormats = async (): Promise<{ webp: boolean; avif: boolean }> => {
  const webpSupported = await testImageFormat('webp');
  const avifSupported = await testImageFormat('avif');
  
  return { webp: webpSupported, avif: avifSupported };
};

// 测试特定格式是否支持
const testImageFormat = (format: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      const dataURL = canvas.toDataURL(`image/${format}`);
      resolve(dataURL !== 'data:,');
    } catch {
      resolve(false);
    }
  });
};

// 生成优化后的图片URL
const generateOptimizedUrl = (src: string, format: string, quality: number): string => {
  // 这里可以集成真实的图片优化服务，如Cloudinary、ImageKit等
  // 目前返回原URL，实际使用时需要替换为真实的优化服务
  if (format === 'webp' && quality < 100) {
    return `${src}?format=webp&quality=${quality}`;
  }
  if (format === 'avif' && quality < 100) {
    return `${src}?format=avif&quality=${quality}`;
  }
  return src;
};

// 生成响应式srcSet
const generateSrcSet = (src: string, format: string, quality: number): string => {
  const widths = [320, 640, 960, 1280, 1920];
  const srcSetParts = widths.map(width => 
    `${generateOptimizedUrl(src, format, quality)}&w=${width} ${width}w`
  );
  return srcSetParts.join(', ');
};

