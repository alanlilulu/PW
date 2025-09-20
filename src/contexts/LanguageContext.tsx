import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo, useRef } from 'react';
import { translations } from '../translations';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 全局语言状态，避免组件重新挂载时重置
let globalLanguage: Language = 'en';

// 从localStorage获取保存的语言设置，默认为英文
const getStoredLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    // 优先使用localStorage，如果没有则使用sessionStorage
    let stored = localStorage.getItem('preferred-language');
    if (!stored) {
      stored = sessionStorage.getItem('preferred-language');
    }
    const lang = (stored === 'zh' || stored === 'en') ? stored : 'en';
    globalLanguage = lang;
    console.log('LanguageContext: getStoredLanguage called, returning:', lang, 'from:', stored ? 'storage' : 'default');
    return lang;
  }
  return globalLanguage;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLang = getStoredLanguage();
    console.log('LanguageProvider: useState initializer called, language:', storedLang);
    return storedLang;
  });

  // 使用ref来跟踪是否已经初始化
  const isInitialized = useRef(false);

  // 初始化时从localStorage读取语言
  useEffect(() => {
    if (!isInitialized.current) {
      const storedLang = getStoredLanguage();
      if (storedLang !== language) {
        setLanguageState(storedLang);
      }
      isInitialized.current = true;
    }
  }, []);

  // 当语言改变时，保存到localStorage和全局状态
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized.current) {
      localStorage.setItem('preferred-language', language);
      sessionStorage.setItem('preferred-language', language);
      globalLanguage = language;
      console.log('LanguageProvider: Language changed to', language, 'saved to localStorage and sessionStorage');
    }
  }, [language]);

  // 使用useCallback确保setLanguage函数稳定
  const setLanguage = useCallback((lang: Language) => {
    console.log('LanguageProvider: setLanguage called with', lang);
    setLanguageState(lang);
    globalLanguage = lang;
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
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
