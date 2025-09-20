import { PortraitIntro } from './PortraitIntro';
import { PortraitGallery } from './PortraitGallery';
import { RefreshCw } from 'lucide-react';
import { useDebug } from '../../../contexts/DebugContext';
import { SectionWrapper } from '../../ui/SectionWrapper';
import { SectionContent } from '../../ui/SectionContent';
import { DecorativeElement } from '../../ui/DecorativeElement';
import { HoverCard } from '../../ui/HoverCard';
import { useDynamicCloudinaryPortrait } from '../../../hooks/useDynamicCloudinaryPortrait';
import { LoadingSpinner } from '../../ui/LoadingSpinner';

export function Portrait() {
  const { showDebugUI } = useDebug();
  const { portraitGroups, loading: isLoading, error } = useDynamicCloudinaryPortrait();
  
  return (
    <SectionWrapper id="portrait" background="white">
      {/* 装饰元素 */}
      <DecorativeElement 
        position="top-left" 
        size="lg" 
        color="blue" 
        delay={0.2}
      />

      {/* 主要内容 */}
      <SectionContent direction="down" delay={0.1}>
        <PortraitIntro />
      </SectionContent>

      {/* 照片画廊 */}
      <SectionContent direction="up" delay={0.3}>
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner />
            <span className="ml-2 text-gray-600">加载照片中...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p>加载照片失败: {error}</p>
            <p className="text-sm text-gray-500 mt-2">
              请检查Cloudinary配置或网络连接
            </p>
          </div>
        ) : (
          <PortraitGallery groups={portraitGroups} />
        )}
      </SectionContent>

      {/* 调试工具 */}
      {showDebugUI && (
        <HoverCard className="fixed top-32 right-6 z-20">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="刷新照片数据"
          >
            <RefreshCw className="w-4 h-4" />
            <span>刷新照片</span>
          </button>
        </HoverCard>
      )}
    </SectionWrapper>
  );
}
