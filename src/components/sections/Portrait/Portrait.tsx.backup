import React from 'react';
import { PortraitIntro } from './PortraitIntro';
import { PortraitGallery } from './PortraitGallery';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useDebug } from '../../../contexts/DebugContext';
import { SectionWrapper } from '../../ui/SectionWrapper';
import { SectionContent } from '../../ui/SectionContent';
import { DecorativeElement } from '../../ui/DecorativeElement';
import { HoverCard } from '../../ui/HoverCard';

export function Portrait() {
  const { showDebugUI } = useDebug();
  
  return (
    <SectionWrapper id="portrait" background="white">
      {/* 装饰元素 */}
      <DecorativeElement 
        position="top-left" 
        size="lg" 
        color="blue" 
        delay={1.2}
        opacity={0.05}
      />
      
      {/* Portrait介绍从上方飞入 */}
      <SectionContent direction="down" delay={0.2} distance={120} duration={1.8}>
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <PortraitIntro />
          
          {/* 手动刷新按钮 - 仅在debug模式下显示 */}
          {showDebugUI && (
            <div className="text-center mt-8">
              <HoverCard scale={1.05} shadow={true} lift={true}>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  刷新相册数据
                </button>
              </HoverCard>
            </div>
          )}
        </div>
      </SectionContent>
      
      {/* 相册画廊从下方飞入 */}
      <SectionContent direction="up" delay={0.6} distance={100} duration={2.0}>
        <PortraitGallery />
      </SectionContent>
    </SectionWrapper>
  );
}