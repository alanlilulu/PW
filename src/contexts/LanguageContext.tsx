import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 从localStorage获取保存的语言设置，默认为英文
const getStoredLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-language');
    console.log('LanguageProvider: Retrieved from localStorage:', stored);
    return (stored === 'zh' || stored === 'en') ? stored : 'en';
  }
  return 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = getStoredLanguage();
    console.log('LanguageProvider: Initializing with language:', storedLang);
    return storedLang;
  });

  // 调试日志
  useEffect(() => {
    console.log('LanguageProvider: Language changed to', language);
  }, [language]);

  // 当语言改变时，保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
      console.log('LanguageProvider: Saved language to localStorage:', language);
    }
  }, [language]);

  // 包装setLanguage函数，确保状态更新和持久化
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
