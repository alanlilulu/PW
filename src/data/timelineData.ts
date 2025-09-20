export interface TimelineEvent {
  id: string;
  year: string;
  month?: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  location?: {
    en: string;
    zh: string;
  };
  imageUrl?: string;
  category: 'birth' | 'education' | 'career' | 'relocation' | 'achievement' | 'personal';
  icon: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'birth',
    year: '2000',
    month: 'April',
    title: {
      en: 'Born in Sichuan',
      zh: '出生于四川'
    },
    description: {
      en: 'Born in Sichuan, China, where my journey of exploration and creativity began.',
      zh: '在四川出生，开始了我的探索和创造之旅。'
    },
    location: {
      en: 'Sichuan, China',
      zh: '四川, 中国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'birth',
    icon: '👶'
  },
  {
    id: 'qingdao-move',
    year: '2001',
    title: {
      en: 'Moved to Qingdao',
      zh: '搬到青岛成长'
    },
    description: {
      en: 'Moved to Qingdao with family, spending childhood and teenage years in this beautiful coastal city.',
      zh: '随家人搬到青岛，在这个美丽的海滨城市度过了童年和青少年时光。'
    },
    location: {
      en: 'Qingdao, China',
      zh: '青岛, 中国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&crop=center',
    category: 'relocation',
    icon: '🌊'
  },
  {
    id: 'penn-state',
    year: '2018',
    month: 'August',
    title: {
      en: 'Penn State University',
      zh: '前往宾州州立大学'
    },
    description: {
      en: 'Started studying Computer Science and Mathematics at Penn State University, beginning my overseas education journey.',
      zh: '前往美国宾州州立大学 (Penn State) 攻读计算机与数学，开始了海外求学之路。'
    },
    location: {
      en: 'Pennsylvania, USA',
      zh: '宾夕法尼亚州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&crop=center',
    category: 'education',
    icon: '🏛️'
  },
  {
    id: 'first-theatre',
    year: '2018',
    month: 'December',
    title: {
      en: 'First Theatre Performance',
      zh: '首次登台演出'
    },
    description: {
      en: 'Made my theatrical debut in "Secret Love in Peach Blossom Land" and have been actively involved in theatre ever since.',
      zh: '首次登台，出演人生第一部话剧《暗恋桃花源》，自此持续活跃在话剧舞台。'
    },
    location: {
      en: 'Pennsylvania, USA',
      zh: '宾夕法尼亚州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
    category: 'personal',
    icon: '🎭'
  },
  {
    id: 'transfer-michigan',
    year: '2020',
    month: 'August',
    title: {
      en: 'Transferred to University of Michigan',
      zh: '转学至密歇根大学'
    },
    description: {
      en: 'Transferred to University of Michigan, Ann Arbor to continue my Computer Science studies.',
      zh: '转学至密歇根大学安娜堡分校 (University of Michigan, Ann Arbor)，继续计算机科学学习。'
    },
    location: {
      en: 'Ann Arbor, Michigan, USA',
      zh: '安娜堡, 密歇根州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=center',
    category: 'education',
    icon: '🎓'
  },
  {
    id: 'first-director',
    year: '2021',
    month: 'October',
    title: {
      en: 'First Directing Experience',
      zh: '首次担任导演'
    },
    description: {
      en: 'Made my directorial debut with the spy thriller "The Message", taking an important step in theatrical creation.',
      zh: '首次担任导演，执导谍战剧《风声》，在戏剧创作上迈出了重要一步。'
    },
    location: {
      en: 'Ann Arbor, Michigan, USA',
      zh: '安娜堡, 密歇根州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center',
    category: 'achievement',
    icon: '🎬'
  },
  {
    id: 'first-photography',
    year: '2022',
    month: 'May',
    title: {
      en: 'Photography Journey Begins',
      zh: '开启摄影师之路'
    },
    description: {
      en: 'Planned and shot my first graduation portrait session, officially starting my photography journey.',
      zh: '策划并拍摄第一组毕业照人像，正式开启了我的摄影师之路。'
    },
    location: {
      en: 'Ann Arbor, Michigan, USA',
      zh: '安娜堡, 密歇根州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=400&fit=crop&crop=center',
    category: 'personal',
    icon: '📸'
  },
  {
    id: 'graduation-lululemon',
    year: '2022',
    month: 'December',
    title: {
      en: 'Graduated & Joined Lululemon',
      zh: '毕业并入职Lululemon'
    },
    description: {
      en: 'Graduated from University of Michigan and joined Lululemon as a Software Engineer, starting a new chapter in my career.',
      zh: '从密歇根大学毕业，入职 Lululemon，担任软件工程师，开始了职业发展新篇章。'
    },
    location: {
      en: 'Ann Arbor, Michigan, USA',
      zh: '安娜堡, 密歇根州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center',
    category: 'career',
    icon: '💼'
  },
  {
    id: 'seattle-move',
    year: '2023',
    month: 'July',
    title: {
      en: 'Moved to Seattle',
      zh: '搬到西雅图'
    },
    description: {
      en: 'Moved to Seattle for work and life, continuing my dual identity as a software engineer and photographer in this tech city.',
      zh: '搬到西雅图工作与生活，在这个科技之城继续我的软件工程师和摄影师双重身份。'
    },
    location: {
      en: 'Seattle, Washington, USA',
      zh: '西雅图, 华盛顿州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'relocation',
    icon: '🌲'
  },
  {
    id: 'current',
    year: '2025',
    title: {
      en: 'Present Day',
      zh: '现在'
    },
    description: {
      en: 'Continuing to live in Seattle while developing multiple identities as a software engineer, photographer, and theatre director, perfectly combining technology with creativity.',
      zh: '继续在西雅图生活，同时发展软件工程、摄影和戏剧导演的多重身份，将技术与创意完美结合。'
    },
    location: {
      en: 'Seattle, Washington, USA',
      zh: '西雅图, 华盛顿州, 美国'
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center',
    category: 'achievement',
    icon: '🌟'
  }
];
