export interface PortraitPhoto {
  src: string;
  alt: string;
  description?: string;
}

export interface PortraitGroup {
  id: string;
  titleKey: string; // 使用翻译键
  mainPhoto: PortraitPhoto;
  photos: PortraitPhoto[];
  category: string;
  location: string;
  date: string;
  folderPath: string;
}

export const portraitGroups: PortraitGroup[] = [
  {
    id: 'seattle-tulips',
    titleKey: 'portrait.groups.seattleTulips',
    mainPhoto: {
      src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/没看过西雅图的郁金香，白活了！_1_阿龙📷_来自小红书网页版.jpg",
      alt: "西雅图郁金香人像摄影作品"
    },
    photos: [
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/没看过西雅图的郁金香，白活了！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "西雅图郁金香人像摄影作品 - 主图",
        description: "在郁金香花海中捕捉的清新人像"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/tulip-portrait-1.jpg",
        alt: "西雅图郁金香人像摄影作品 - 侧脸特写",
        description: "侧脸特写，突出人物轮廓和花朵背景"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/tulip-portrait-2.jpg",
        alt: "西雅图郁金香人像摄影作品 - 全身构图",
        description: "全身构图，展现人物与环境的和谐"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/tulip-portrait-3.jpg",
        alt: "西雅图郁金香人像摄影作品 - 花海漫步",
        description: "在郁金香花海中漫步的唯美瞬间"
      }
    ],
    category: "人像摄影",
    location: "西雅图",
    date: "2024年春季",
    folderPath: "portrait/seattle-tulips"
  },
  {
    id: 'california-ditto',
    titleKey: 'portrait.groups.californiaDitto',
    mainPhoto: {
      src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/california-ditto/是谁2024还在加州拍ditto呀！_1_阿龙📷_来自小红书网页版.jpg",
      alt: "加州 Ditto 人像摄影作品"
    },
    photos: [
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/california-ditto/是谁2024还在加州拍ditto呀！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "加州 Ditto 人像摄影作品 - 主图",
        description: "加州阳光下的清新人像"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/california-ditto/california-portrait-1.jpg",
        alt: "加州 Ditto 人像摄影作品 - 微笑特写",
        description: "捕捉人物自然微笑的瞬间"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/california-ditto/california-portrait-2.jpg",
        alt: "加州 Ditto 人像摄影作品 - 环境人像",
        description: "人物与加州风景的完美结合"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/california-ditto/california-portrait-3.jpg",
        alt: "加州 Ditto 人像摄影作品 - 阳光剪影",
        description: "加州阳光下的剪影效果"
      }
    ],
    category: "人像摄影",
    location: "加州",
    date: "2024年夏季",
    folderPath: "portrait/california-ditto"
  },
  {
    id: 'uw-graduation',
    titleKey: 'portrait.groups.uwGraduation',
    mainPhoto: {
      src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_1_阿龙📷_来自小红书网页版.jpg",
      alt: "UW 毕业季人像摄影作品"
    },
    photos: [
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_1_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 主图",
        description: "毕业典礼上的正式人像"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_2_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 校园留念",
        description: "在校园标志性建筑前的留念"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_3_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业帽特写",
        description: "毕业帽与笑容的特写镜头"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_4_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 校园漫步",
        description: "在校园中漫步的毕业学子"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_5_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 图书馆留念",
        description: "在图书馆前的毕业留念"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_6_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业典礼",
        description: "毕业典礼上的精彩瞬间"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_7_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 校园风景",
        description: "与校园风景的完美结合"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_8_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业仪式",
        description: "毕业仪式上的庄重时刻"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_9_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 校园回忆",
        description: "在校园中的美好回忆"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_10_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业喜悦",
        description: "毕业时刻的喜悦表情"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_11_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 校园时光",
        description: "记录校园时光的珍贵瞬间"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_12_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业梦想",
        description: "实现毕业梦想的激动时刻"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_13_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 校园告别",
        description: "与校园告别的深情瞬间"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_14_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业展望",
        description: "展望未来的毕业学子"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/uw-graduation/刘亦菲从UW毕业了_15_阿龙📷_来自小红书网页版.jpg",
        alt: "UW 毕业季人像摄影作品 - 毕业纪念",
        description: "珍贵的毕业纪念照片"
      }
    ],
    category: "毕业摄影",
    location: "华盛顿大学",
    date: "2024年春季",
    folderPath: "portrait/uw-graduation"
  },
  {
    id: 'cherry-blossom',
    titleKey: 'portrait.groups.cherryBlossom',
    mainPhoto: {
      src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/cherry-blossom/是谁拍到了2025最后的樱花！_1_阿龙📷_来自小红书网页版.jpg",
      alt: "2025 樱花季人像摄影作品"
    },
    photos: [
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/cherry-blossom/是谁拍到了2025最后的樱花！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "2025 樱花季人像摄影作品 - 主图",
        description: "樱花背景下的唯美人像"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/cherry-blossom/是谁拍到了2025最后的樱花！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "2025 樱花季人像摄影作品 - 花瓣飘落",
        description: "捕捉樱花花瓣飘落的瞬间"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/cherry-blossom/是谁拍到了2025最后的樱花！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "2025 樱花季人像摄影作品 - 近景特写",
        description: "人物与樱花的近景特写"
      }
    ],
    category: "季节摄影",
    location: "西雅图",
    date: "2025年春季",
    folderPath: "portrait/cherry-blossom"
  },
  {
    id: 'first-meeting',
    titleKey: 'portrait.groups.firstMeeting',
    mainPhoto: {
      src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/first-meeting/第一次见面看你不太顺眼_2_阿龙📷_来自小红书网页版.jpg",
      alt: "人像摄影作品 - 第一次见面"
    },
    photos: [
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/first-meeting/第一次见面看你不太顺眼_2_阿龙📷_来自小红书网页版.jpg",
        alt: "人像摄影作品 - 第一次见面 - 主图",
        description: "初次见面的自然状态捕捉"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/first-meeting/第一次见面看你不太顺眼_2_阿龙📷_来自小红书网页版.jpg",
        alt: "人像摄影作品 - 第一次见面 - 表情特写",
        description: "人物表情的细腻刻画"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/first-meeting/第一次见面看你不太顺眼_2_阿龙📷_来自小红书网页版.jpg",
        alt: "人像摄影作品 - 第一次见面 - 环境人像",
        description: "人物与环境的和谐构图"
      }
    ],
    category: "人像摄影",
    location: "西雅图",
    date: "2024年秋季",
    folderPath: "portrait/first-meeting"
  },
  {
    id: 'seattle-couples',
    titleKey: 'portrait.groups.seattleCouples',
    mainPhoto: {
      src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-couples/在西雅图情侣照这么拍真的很欲！_1_阿龙📷_来自小红书网页版.jpg",
      alt: "西雅图情侣照摄影作品"
    },
    photos: [
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-couples/在西雅图情侣照这么拍真的很欲！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "西雅图情侣照摄影作品 - 主图",
        description: "情侣间的温馨互动瞬间"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-couples/在西雅图情侣照这么拍真的很欲！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "西雅图情侣照摄影作品 - 牵手特写",
        description: "牵手细节的温馨特写"
      },
      {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-couples/在西雅图情侣照这么拍真的很欲！_1_阿龙📷_来自小红书网页版.jpg",
        alt: "西雅图情侣照摄影作品 - 背影构图",
        description: "情侣背影的浪漫构图"
      }
    ],
    category: "情侣摄影",
    location: "西雅图",
    date: "2024年冬季",
    folderPath: "portrait/seattle-couples"
  }
];
