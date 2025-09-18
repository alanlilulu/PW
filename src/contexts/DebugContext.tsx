import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DebugContextType {
  debugMode: boolean;
  toggleDebugMode: () => void;
  setDebugMode: (mode: boolean) => void;
  // 调试功能开关
  showPerformanceMetrics: boolean;
  showPhotoCounts: boolean;
  showConsoleLogs: boolean;
  showGitHubTokenConfig: boolean;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [debugMode, setDebugMode] = useState(false);

  // 从 localStorage 读取 debug mode 设置
  useEffect(() => {
    const savedDebugMode = localStorage.getItem('debugMode');
    if (savedDebugMode !== null) {
      setDebugMode(JSON.parse(savedDebugMode));
    }
  }, []);

  // 保存 debug mode 设置到 localStorage
  const toggleDebugMode = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    localStorage.setItem('debugMode', JSON.stringify(newDebugMode));
  };

  const updateDebugMode = (mode: boolean) => {
    setDebugMode(mode);
    localStorage.setItem('debugMode', JSON.stringify(mode));
  };

  // 调试功能开关 - 只在 debug mode 开启时启用
  const showPerformanceMetrics = debugMode;
  const showPhotoCounts = debugMode;
  const showConsoleLogs = debugMode;
  const showGitHubTokenConfig = debugMode;

  return (
    <DebugContext.Provider value={{ 
      debugMode, 
      toggleDebugMode, 
      setDebugMode: updateDebugMode,
      showPerformanceMetrics,
      showPhotoCounts,
      showConsoleLogs,
      showGitHubTokenConfig
    }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
}
