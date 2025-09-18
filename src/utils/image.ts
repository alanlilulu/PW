export async function getImageAspectRatio(src: string): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width / img.height);
    img.src = src;
  });
}

export async function getImageDominantColor(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('rgb(0, 0, 0)');
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 20) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      resolve(`rgb(${r}, ${g}, ${b})`);
    };

    img.src = src;
  });
}