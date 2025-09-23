import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Container } from '../components/ui/Container';
import { useLanguage } from '../contexts/LanguageContext';
import { useDebug } from '../contexts/DebugContext';
import { Timeline } from '../components/sections/About/Timeline';
import { timelineEvents } from '../data/timelineData';

export function AboutPage() {
  const { t } = useLanguage();
  const { showDebugUI } = useDebug();

  return (
    <div className="min-h-screen bg-white">
      {/* 使用统一的 Header 组件 */}
      <Header />

      {/* Debug Mode 开关和配置 - 仅在通过URL参数激活时显示 */}
      {showDebugUI && (
        <div className="fixed top-24 right-6 z-20 flex flex-col gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
            <p className="text-xs text-gray-500 mb-2">Debug Mode Active</p>
            <p className="text-sm text-gray-700">About page debug tools</p>
          </div>
        </div>
      )}

      {/* 主要内容区域 */}
      <main className="pt-32">
        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center justify-between">
            {/* 左侧主标题 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-900">
                {t('about.pageTitle')}
              </h1>
            </motion.div>
            
            {/* 右侧副标题 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-right max-w-md"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.pageDescription')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* About 内容 */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            {/* 个人介绍 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-serif mb-8 text-gray-900">
                {t('about.personalTitle')}
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>{t('about.personalDescription1')}</p>
                <p>{t('about.personalDescription2')}</p>
                <p>{t('about.personalDescription3')}</p>
              </div>
            </motion.div>
          </div>
        </section>


        {/* 人生时间线 */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                {t('about.timelineTitle') || 'My Life Journey'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('about.timelineDescription') || 'From Sichuan to Qingdao, from Penn State to University of Michigan, from first theatre performance to becoming a director, from photographer to software engineer - these key moments have shaped who I am today.'}
              </p>
            </motion.div>

            {/* 时间线组件 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Timeline events={timelineEvents} />
            </motion.div>
          </Container>
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
