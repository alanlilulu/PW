import React from 'react';
import { Header } from '../components/layout/Header';

export function PortraitPageSimple() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32">
        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-bold text-gray-900">
              Portrait Photography
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Through the lens, I capture authentic emotions and unique moments, each frame a profound observation and artistic expression of life.
            </p>
          </div>
        </section>

        {/* 测试相册网格 */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 相册1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src="https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/tulip-portrait-1.jpg"
                  alt="西雅图郁金香人像摄影作品"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-medium text-gray-900 text-center mb-2">
                西雅图郁金香
              </h4>
            </div>

            {/* 相册2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src="https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/cherry-blossom/cherry-blossom-1.jpg"
                  alt="樱花人像摄影作品"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-medium text-gray-900 text-center mb-2">
                樱花系列
              </h4>
            </div>

            {/* 相册3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src="https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/california-ditto/california-portrait-1.jpg"
                  alt="加州Ditto人像摄影作品"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-medium text-gray-900 text-center mb-2">
                加州Ditto
              </h4>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 AL Photography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
