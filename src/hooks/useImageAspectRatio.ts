import { useState, useEffect } from 'react';

export function useImageAspectRatio(src: string) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };

    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return aspectRatio;
}