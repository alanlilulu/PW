import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

interface LazyRouteProps {
  component: React.ComponentType<any>;
  fallback?: React.ReactNode;
}

const defaultFallback = (
  <motion.div
    className="flex items-center justify-center min-h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </motion.div>
);

export function LazyRoute({ component: Component, fallback = defaultFallback }: LazyRouteProps) {
  const LazyComponent = lazy(() => 
    Promise.resolve({ default: Component })
  );

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
}