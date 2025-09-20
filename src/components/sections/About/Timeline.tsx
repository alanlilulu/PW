import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent } from '../../../data/timelineData';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { TimelineMobile } from './TimelineMobile';
import { useLanguage } from '../../../contexts/LanguageContext';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const { language } = useLanguage();

  // 在移动端使用简化版本
  return (
    <>
      {/* 桌面端时间线 */}
      <div className="hidden lg:block">
        <TimelineDesktop events={events} hoveredEvent={hoveredEvent} setHoveredEvent={setHoveredEvent} language={language} />
      </div>
      
      {/* 移动端时间线 */}
      <div className="block lg:hidden">
        <TimelineMobile events={events} language={language} />
      </div>
    </>
  );
}

function TimelineDesktop({ events, hoveredEvent, setHoveredEvent, language }: TimelineProps & { hoveredEvent: string | null; setHoveredEvent: (id: string | null) => void; language: string }) {
  const getCategoryColor = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'birth': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'education': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'career': return 'bg-green-100 text-green-800 border-green-200';
      case 'relocation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'achievement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'personal': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'birth': return '👶';
      case 'education': return '🎓';
      case 'career': return '💼';
      case 'relocation': return '🚀';
      case 'achievement': return '🏆';
      case 'personal': return '❤️';
      default: return '⭐';
    }
  };

  // 添加CSS样式到页面
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .timeline-item-left .timeline-content { 
        margin-right: 2rem;
      }
      
      .timeline-item-right .timeline-content { 
        margin-left: 2rem;
      }
      
      .timeline-item-left .timeline-content > .flex { 
        flex-direction: row; 
        gap: 1.5rem; 
      }
      
      .timeline-item-right .timeline-content > .flex { 
        flex-direction: row; 
        gap: 1.5rem; 
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative">
      {/* 时间线中心线 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>
      
      {/* 时间线事件 */}
      <div className="space-y-20">
        {events.map((event, index) => {
          const isRight = index % 2 === 1; // 偶数左、奇数右
          
          return (
            <motion.div
              key={event.id}
              className={`relative flex items-center ${isRight ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* 时间信息 - 直接嵌入中心线 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                  className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 text-center min-w-[120px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                >
                  {/* 年份 - 大字体突出 */}
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {event.year}
                  </div>
                  
                  {/* 月份 */}
                  {event.month && (
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {event.month}
                    </div>
                  )}
                  
                  {/* 分类标签 */}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                    {getCategoryIcon(event.category)} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                </motion.div>
                
                {/* 时间线节点图标 - 在时间信息下方 */}
                <motion.div
                  className={`w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl mx-auto mt-4 ${
                    hoveredEvent === event.id ? 'scale-110' : 'scale-100'
                  } transition-transform duration-300`}
                  style={{
                    background: `linear-gradient(135deg, ${
                      event.category === 'birth' ? '#fce7f3, #f3e8ff' :
                      event.category === 'education' ? '#dbeafe, #e0e7ff' :
                      event.category === 'career' ? '#dcfce7, #ecfdf5' :
                      event.category === 'relocation' ? '#f3e8ff, #ede9fe' :
                      event.category === 'achievement' ? '#fef3c7, #fef7cd' :
                      '#e0e7ff, #e0f2fe'
                    })`
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {event.icon}
                </motion.div>
              </div>

              {/* 事件内容区域 - 占据左右各50%区域 */}
              <motion.div
                className={`${isRight ? 'pl-8' : 'pr-8'} w-1/2 max-w-xl`}
                initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              >
                <div className={`flex items-start gap-6 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* 文字内容 */}
                  <div className="flex-1">
                    <motion.div
                      className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
                        event.category === 'birth' ? 'border-pink-400' :
                        event.category === 'education' ? 'border-blue-400' :
                        event.category === 'career' ? 'border-green-400' :
                        event.category === 'relocation' ? 'border-purple-400' :
                        event.category === 'achievement' ? 'border-yellow-400' :
                        'border-indigo-400'
                      } hover:shadow-md transition-all duration-300`}
                      whileHover={{ y: -2 }}
                    >
                      {/* 事件标题 */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {event.title[language as 'en' | 'zh']}
                      </h3>
                      
                      {/* 事件描述 */}
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {event.description[language as 'en' | 'zh']}
                      </p>
                      
                      {/* 地点信息 */}
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">📍</span>
                          <span>{event.location[language as 'en' | 'zh']}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* 事件图片 */}
                  {event.imageUrl && (
                    <motion.div
                      className="flex-shrink-0 w-32 h-24"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    >
                      <OptimizedImage
                        src={event.imageUrl}
                        alt={event.title[language as 'en' | 'zh']}
                        className="w-full h-full rounded-lg shadow-sm object-cover"
                        placeholder="📷"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 128px"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
