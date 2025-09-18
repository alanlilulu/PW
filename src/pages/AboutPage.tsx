import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Container } from '../components/ui/Container';
import { useLanguage } from '../contexts/LanguageContext';
import { useDebug } from '../contexts/DebugContext';

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
          <div className="grid md:grid-cols-2 gap-16">
            {/* 左侧：个人介绍 */}
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

            {/* 右侧：工作方法 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-serif mb-8 text-gray-900">
                {t('about.approachTitle')}
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>{t('about.approachDescription1')}</p>
                <p>{t('about.approachDescription2')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 技能和兴趣 */}
        <section className="bg-gray-50 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-serif mb-8 text-gray-900">
                {t('about.skillsTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('about.skillsDescription')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 技术技能 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {t('about.technicalSkills')}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• React & TypeScript</li>
                  <li>• User Experience Design</li>
                  <li>• Product Strategy</li>
                  <li>• Photography & Visual Arts</li>
                </ul>
              </motion.div>

              {/* 创作兴趣 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {t('about.creativeInterests')}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Portrait Photography</li>
                  <li>• Theater Performance</li>
                  <li>• Digital Art Creation</li>
                  <li>• Storytelling</li>
                </ul>
              </motion.div>

              {/* 工作理念 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {t('about.philosophy')}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• User-Centered Design</li>
                  <li>• Data-Driven Decisions</li>
                  <li>• Collaborative Innovation</li>
                  <li>• Continuous Learning</li>
                </ul>
              </motion.div>
            </div>
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
