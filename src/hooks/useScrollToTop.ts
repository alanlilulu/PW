import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 页面路由变化时自动滚动到顶部
 */
export function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // 每次路由变化时滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
}
