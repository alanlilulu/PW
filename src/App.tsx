import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { DebugProvider, useDebug } from './contexts/DebugContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { PortraitPage } from './pages/PortraitPage';
import { AboutPage } from './pages/AboutPage';
import { PhotoManagementPage } from './pages/PhotoManagementPage';
import { Hero } from './components/sections/Hero/Hero';
import { Portrait } from './components/sections/Portrait/Portrait';
import { Drama } from './components/sections/Drama/Drama';
import { Career } from './components/sections/Career/Career';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { usePreload } from './hooks/usePreload';
import { NavigationOverlay } from './components/ui/NavigationOverlay';

// 性能监控组件
function PerformanceMonitor() {
  const metrics = usePerformanceMonitor();
  const { showPerformanceMetrics } = useDebug();

  // 只在 debug mode 开启时显示
  if (!showPerformanceMetrics || !metrics) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9998,
        maxWidth: '300px'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🚀 性能指标</div>
      <div>页面加载: {metrics.pageLoadTime.toFixed(0)}ms</div>
      <div>DOM加载: {metrics.domContentLoaded.toFixed(0)}ms</div>
      <div>首次绘制: {metrics.firstContentfulPaint.toFixed(0)}ms</div>
      <div>最大绘制: {metrics.largestContentfulPaint.toFixed(0)}ms</div>
      <div>布局偏移: {metrics.cumulativeLayoutShift.toFixed(3)}</div>
    </div>
  );
}

// 资源预加载组件
function ResourcePreloader() {
  const { preloadImage, preloadStyle, prefetchResource } = usePreload();

  React.useEffect(() => {
    // 预加载关键资源
    const preloadCriticalResources = async () => {
      try {
        // 预加载关键CSS
        await preloadStyle('/src/index.css', 'high');

        // 预加载首屏图片
        await preloadImage('/images/hero-bg.jpg', 'high');

        // 预取其他资源
        prefetchResource('/api/portrait-images');
        prefetchResource('/api/drama-works');

        console.log('✅ Critical resources preloaded');
      } catch (error) {
        console.warn('⚠️ Resource preloading failed:', error);
      }
    };

    preloadCriticalResources();
  }, [preloadImage, preloadStyle, prefetchResource]);

  return null; // 这个组件不渲染任何UI
}

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're working on fixing the problem.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 内联进度条组件
function InlineProgressBar() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      setProgress(scrollPercent);
    };

    // 初始调用一次
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: '#e5e7eb',
        zIndex: 50
      }}
    >
      <div
        style={{
          height: '100%',
          backgroundColor: '#3b82f6',
          width: `${progress}%`,
          transition: 'width 0.3s ease-out'
        }}
      />
    </div>
  );
}

// 跳过链接组件
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
    >
      Skip to main content
    </a>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DebugProvider>
          <NavigationProvider>
            <Router>
              <ResourcePreloader />
              <PerformanceMonitor />
              <SkipLink />
              <InlineProgressBar />
              <NavigationOverlay />
              <div className="min-h-screen bg-black">
                <Header />
                <main id="main-content">
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <Portrait />
                        <Drama />
                        <Career />
                      </>
                    } />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/portrait" element={<PortraitPage />} />
                    <Route path="/photo-management" element={<PhotoManagementPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </NavigationProvider>
        </DebugProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}