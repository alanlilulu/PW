import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { useLanguage } from '../contexts/LanguageContext';
import { SEO } from '../components/ui/SEO';
import { DramaWork } from '../components/sections/Drama/DramaWork';
import { DramaWorkModal } from '../components/sections/Drama/DramaWorkModal';

export function DramaPage() {
  const { t } = useLanguage();
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorkClick = (work: any) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  // 作品详细数据
  const dramaWorks = {
    'Charlotte\'s Troubles (夏洛特烦恼)': {
      title: 'Charlotte\'s Troubles (夏洛特烦恼)',
      role: 'Xia Luo (夏洛)',
      year: '2025 Spring',
      description: '现代喜剧作品，饰演主角夏洛，展现从中年失意到青春活力的巨大转变。',
      emoji: '🎭',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '张导演',
        venue: '西雅图中文剧院',
        duration: '120分钟',
        genre: '喜剧'
      }
    },
    'Matchmaker Tavern (月老酒馆)': {
      title: 'Matchmaker Tavern (月老酒馆)',
      role: 'Zhou Ran (周然) - Young & Old',
      year: '2024 Summer',
      description: '浪漫喜剧，饰演周然，在同一场演出中展现青年和老年两个不同的人生阶段。',
      emoji: '🍷',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '李导演',
        venue: '校园剧场',
        duration: '90分钟',
        genre: '浪漫喜剧'
      }
    },
    'And Then There Were None (无人生还)': {
      title: 'And Then There Were None (无人生还)',
      role: 'Judge',
      year: '2024 Spring',
      description: '悬疑剧，改编自阿加莎·克里斯蒂经典小说，饰演法官角色。',
      emoji: '⚖️',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '王导演',
        venue: '西雅图剧院',
        duration: '150分钟',
        genre: '悬疑剧'
      }
    },
    'The Patient (病人)': {
      title: 'The Patient (病人)',
      role: 'Director',
      year: '2024 Fall',
      description: '执导的第一部大型话剧，改编自阿加莎·克里斯蒂悬疑作品。',
      emoji: '🎬',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: 'Alan Li (阿龙)',
        venue: '校园剧场',
        duration: '120分钟',
        genre: '悬疑剧'
      }
    },
    'Make a Name (扬名立万)': {
      title: 'Make a Name (扬名立万)',
      role: 'Qi Leshan (齐乐山)',
      year: '2022 Fall',
      description: '悬疑喜剧，饰演神秘角色齐乐山，在悬疑和喜剧之间找到平衡。',
      emoji: '🎬',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '陈导演',
        venue: '校园剧场',
        duration: '110分钟',
        genre: '悬疑喜剧'
      }
    },
    'Never Say Die (羞羞的铁拳)': {
      title: 'Never Say Die (羞羞的铁拳)',
      role: 'Deputy Leader (沈腾原版角色)',
      year: '2021 Spring',
      description: '喜剧作品，改编自开心麻花经典剧目，饰演副掌门角色。',
      emoji: '👊',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '李导演',
        venue: '校园剧场',
        duration: '100分钟',
        genre: '喜剧'
      }
    },
    'Accidental Death of an Anarchist': {
      title: 'Accidental Death of an Anarchist',
      role: 'Police Chief',
      year: '2021 Winter',
      description: '荒诞剧，饰演警察局长，在荒诞剧情中展现角色的复杂性和讽刺意味。',
      emoji: '👮',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '王导演',
        venue: '校园剧场',
        duration: '90分钟',
        genre: '荒诞剧'
      }
    },
    'Chaos Citizens (乱民全讲)': {
      title: 'Chaos Citizens (乱民全讲)',
      role: 'Multiple Characters',
      year: '2019 Winter',
      description: '群像戏，饰演多个角色，在不同角色之间快速切换。',
      emoji: '👥',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '张导演',
        venue: '校园剧场',
        duration: '120分钟',
        genre: '群像戏'
      }
    },
    'Secret Love in Peach Blossom Land (暗恋桃花源)': {
      title: 'Secret Love in Peach Blossom Land (暗恋桃花源)',
      role: 'Lao Tao (老陶)',
      year: '2018 Fall',
      description: '经典话剧，饰演充满诗意的老陶角色，在古典和现代之间找到平衡。',
      emoji: '🌸',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '李导演',
        venue: '校园剧场',
        duration: '130分钟',
        genre: '经典话剧'
      }
    },
    'The Message (风声)': {
      title: 'The Message (风声)',
      role: 'Director',
      year: '2021 Fall',
      description: '执导的第二部大型话剧，改编自谍战小说。',
      emoji: '🕵️',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: 'Alan Li (阿龙)',
        venue: '校园剧场',
        duration: '140分钟',
        genre: '谍战剧'
      }
    },
    'No Love Here (此处不样恋爱)': {
      title: 'No Love Here (此处不样恋爱)',
      role: 'Guo Danian (郭大年)',
      year: '2025 Seattle Comedy Festival',
      description: '2025年西雅图喜剧节演出，饰演充满喜剧色彩的郭大年角色。',
      emoji: '💕',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '喜剧节导演',
        venue: '西雅图喜剧节',
        duration: '60分钟',
        genre: '喜剧'
      }
    },
    'Code Name: Sweet and Sour Pork (代号锅包又)': {
      title: 'Code Name: Sweet and Sour Pork (代号锅包又)',
      role: 'Male Agent',
      year: '2025 Seattle Comedy Festival',
      description: '2025年西雅图喜剧节演出，饰演充满喜剧色彩的男特工角色。',
      emoji: '🥘',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'
      ],
      details: {
        director: '喜剧节导演',
        venue: '西雅图喜剧节',
        duration: '60分钟',
        genre: '喜剧'
      }
    }
  };

  return (
    <>
      <SEO 
        title={t('drama.pageTitle') || 'Drama Journey'}
        description={t('drama.pageDescription') || 'Explore my journey in theater and drama performance'}
      />
      
      <motion.div 
        className="min-h-screen bg-gray-50 pt-16 md:pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section - 移动端优化 */}
        <motion.section 
          className="py-12 md:py-20 bg-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Container>
            <div className="text-center px-4">
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4 md:mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {t('drama.pageTitle') || '🎭 Alan (阿龙) Drama Portfolio'}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {t('drama.pageDescription') || 'Explore my theatrical journey as an actor and director in Seattle\'s Chinese theater community'}
              </motion.p>
            </div>
          </Container>
        </motion.section>

        {/* Drama Journey Section - 移动端优化 */}
        <motion.section 
          className="py-12 md:py-20 bg-gray-50"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Container>
            <motion.div
              className="text-center mb-12 md:mb-16 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-serif mb-6 md:mb-8 text-gray-900">
                  {t('drama.journey.title') || 'My Drama Journey'}
                </h2>
              <motion.div 
                className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-gray-600 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-lg md:text-xl">
                  {t('drama.journey.intro') || 'I am both an actor and director, and the stage is where I explore humanity and storytelling. Over the years, I have portrayed dozens of characters through different genres of plays and directed two major theatrical productions.'}
                </p>
                  <p className="text-base md:text-lg">
                  {t('drama.journey.description1') || 'Alan is an active Chinese theater actor and director in Seattle and campus theater circles, with over 7 years of stage experience.'}
                  </p>
                  <p className="text-base md:text-lg">
                  {t('drama.journey.description2') || 'He excels at portraying distinctive, multi-layered characters and explores relationships and inner worlds through performance.'}
                  </p>
                  <p className="text-base md:text-lg">
                  {t('drama.journey.description3') || 'His theatrical journey spans from absurdist plays and comedies to suspense dramas, while also serving as a director for mystery and spy thrillers.'}
                  </p>
                </motion.div>
            </motion.div>
          </Container>
        </motion.section>

        {/* Recent Performances - 移动端优化 */}
        <motion.section 
          className="py-12 md:py-20 bg-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Container>
            <motion.div
              className="text-center mb-12 md:mb-16 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-serif mb-4 md:mb-6 text-gray-900">
                Recent Works (2024-2025)
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Key roles and productions in my theatrical career
              </p>
            </motion.div>

                <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <DramaWork
                title="Charlotte's Troubles (夏洛特烦恼)"
                role="Xia Luo (夏洛)"
                year="2025 Spring"
                description="喜剧作品，饰演主角夏洛"
                emoji="🎭"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Charlotte\'s Troubles (夏洛特烦恼)'])}
              />
              
              <DramaWork
                title="Matchmaker Tavern (月老酒馆)"
                role="Zhou Ran (周然) - Young & Old"
                year="2024 Summer"
                description="爱情喜剧，青年与老年角色转换"
                emoji="🍷"
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Matchmaker Tavern (月老酒馆)'])}
              />
              
              <DramaWork
                title="And Then There Were None (无人生还)"
                role="Judge"
                year="2024 Spring"
                description="悬疑剧，饰演法官角色"
                emoji="⚖️"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['And Then There Were None (无人生还)'])}
              />
            </motion.div>
          </Container>
        </motion.section>

        {/* Classic Performances - 移动端优化 */}
        <motion.section 
          className="py-12 md:py-20 bg-gray-50"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Container>
            <motion.div 
              className="text-center mb-12 md:mb-16 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-serif mb-4 md:mb-6 text-gray-900">
                Classic Productions (2018-2022)
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <DramaWork
                title="Make a Name (扬名立万)"
                role="Qi Leshan (齐乐山)"
                year="2022 Fall"
                description="悬疑喜剧，饰演齐乐山"
                emoji="🎬"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Make a Name (扬名立万)'])}
              />
              
              <DramaWork
                title="Never Say Die (羞羞的铁拳)"
                role="Deputy Leader (沈腾原版角色)"
                year="2021 Spring"
                description="喜剧作品，饰演副掌门"
                emoji="👊"
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Never Say Die (羞羞的铁拳)'])}
              />
              
              <DramaWork
                title="Accidental Death of an Anarchist"
                role="Police Chief"
                year="2021 Winter"
                description="荒诞剧，饰演警察局长"
                emoji="👮"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Accidental Death of an Anarchist'])}
              />
              
              <DramaWork
                title="Chaos Citizens (乱民全讲)"
                role="Multiple Characters"
                year="2019 Winter"
                description="群像戏，饰演多个角色"
                emoji="👥"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Chaos Citizens (乱民全讲)'])}
              />
              
              <DramaWork
                title="Secret Love in Peach Blossom Land (暗恋桃花源)"
                role="Lao Tao (老陶)"
                year="2018 Fall"
                description="经典话剧，饰演老陶"
                emoji="🌸"
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Secret Love in Peach Blossom Land (暗恋桃花源)'])}
              />
            </motion.div>
          </Container>
        </motion.section>

        {/* Directing Experience */}
        <motion.section 
          className="py-20 bg-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <Container>
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                Directing Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Productions I have successfully directed
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <DramaWork
                title="The Patient (病人)"
                role="Director"
                year="2024 Fall"
                description="阿加莎悬疑剧改编，担任导演"
                emoji="🎬"
                isLarge={true}
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['The Patient (病人)'])}
              />
              
              <DramaWork
                title="The Message (风声)"
                role="Director"
                year="2021 Fall"
                description="谍战剧，担任导演"
                emoji="🕵️"
                isLarge={true}
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['The Message (风声)'])}
              />
            </motion.div>
          </Container>
        </motion.section>

        {/* Festival Performances */}
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Container>
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                Festival Performances
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Special performances at theater festivals
                  </p>
                </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎪</div>
                <h3 className="text-3xl font-semibold mb-2">2025 Seattle Comedy Festival</h3>
                <p className="text-gray-300">Multiple comedy performances</p>
            </div>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <DramaWork
                title="No Love Here (此处不样恋爱)"
                role="Guo Danian (郭大年)"
                year="2025 Seattle Comedy Festival"
                description="喜剧节演出，饰演郭大年"
                emoji="💕"
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['No Love Here (此处不样恋爱)'])}
              />
              
              <DramaWork
                title="Code Name: Sweet and Sour Pork (代号锅包又)"
                role="Male Agent"
                year="2025 Seattle Comedy Festival"
                description="喜剧节演出，饰演男特工"
                emoji="🥘"
                imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                onClick={() => handleWorkClick(dramaWorks['Code Name: Sweet and Sour Pork (代号锅包又)'])}
              />
            </motion.div>
          </Container>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section 
          className="py-20 bg-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <Container>
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif mb-8 text-gray-900">
                My Drama Philosophy
              </h2>
              <blockquote className="text-2xl text-gray-600 italic leading-relaxed mb-8">
                "Theater is not just entertainment; it's a mirror to society and a window to the human soul."
              </blockquote>
              <p className="text-lg text-gray-500">
                Through drama, I believe in the power of storytelling to create empathy, understanding, and positive change in our world.
              </p>
            </motion.div>
          </Container>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          <Container>
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                Experience the Drama
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Ready to explore more of my creative journey?
              </p>
              <motion.button
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
            </motion.div>
          </Container>
        </motion.section>
      </motion.div>

      {/* Drama Work Modal */}
      <DramaWorkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        work={selectedWork}
      />
    </>
  );
}
