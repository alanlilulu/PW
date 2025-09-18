import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        const largestContentfulPaint = paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0;
        
        // 计算累积布局偏移
        let cumulativeLayoutShift = 0;
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                  cumulativeLayoutShift += (entry as any).value;
                }
              }
            });
            observer.observe({ entryTypes: ['layout-shift'] });
          } catch (e) {
            console.warn('PerformanceObserver not supported');
          }
        }

        setMetrics({
          pageLoadTime,
          domContentLoaded,
          firstContentfulPaint,
          largestContentfulPaint,
          cumulativeLayoutShift
        });

        // 输出性能指标到控制台
        console.log('🚀 Performance Metrics:', {
          '页面加载时间': `${pageLoadTime.toFixed(2)}ms`,
          'DOM内容加载': `${domContentLoaded.toFixed(2)}ms`,
          '首次内容绘制': `${firstContentfulPaint.toFixed(2)}ms`,
          '最大内容绘制': `${largestContentfulPaint.toFixed(2)}ms`,
          '累积布局偏移': cumulativeLayoutShift.toFixed(3)
        });
      }
    };

    // 等待页面完全加载后测量性能
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  return metrics;
};

