import { useState, useEffect } from 'react';

export function useImageOrientation(src: string) {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return isPortrait;
}