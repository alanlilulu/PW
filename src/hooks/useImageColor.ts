import { useState, useEffect } from 'react';

export function useImageColor(src: string) {
  const [dominantColor, setDominantColor] = useState('rgb(0, 0, 0)');

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0, count = 0;

      // Sample pixels for average color
      for (let i = 0; i < imageData.length; i += 20) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      // Calculate average
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      setDominantColor(`rgb(${r}, ${g}, ${b})`);
    };

    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src]);

  return dominantColor;
}