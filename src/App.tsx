import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { LanguageProvider } from './contexts/LanguageContext';
import { DebugProvider } from './contexts/DebugContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { useScrollToTop } from './hooks/useScrollToTop';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer/Footer';
import { SkipLink } from './components/ui/SkipLink';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { PerformanceMonitor } from './components/ui/PerformanceMonitor';
import { LazyRoute } from './components/ui/LazyRoute';

// Pages - Lazy loaded for better performance
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PortraitPage } from './pages/PortraitPage';
import { DramaPage } from './pages/DramaPage';
import { CareerPage } from './pages/CareerPage';
import { PhotoManagementPage } from './pages/PhotoManagementPage';
import MetadataAlbumPage from './pages/MetadataAlbumPage';
import AssetFolderAlbumsPage from './pages/AssetFolderAlbumsPage';

// 内部组件，用于处理路由变化时的滚动
function AppContent() {
  useScrollToTop();
  
  return (
    <>
      <SkipLink />
      <div className="min-h-screen">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portrait" element={<PortraitPage />} />
            <Route path="/drama" element={<DramaPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/photo-management" element={<PhotoManagementPage />} />
            <Route path="/metadata-albums" element={<MetadataAlbumPage />} />
            <Route path="/asset-folder-albums" element={<AssetFolderAlbumsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      
      {/* Performance Monitor - Only in development */}
      <PerformanceMonitor />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <DebugProvider>
            <NavigationProvider>
              <Router>
                <AppContent />
              </Router>
            </NavigationProvider>
          </DebugProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;