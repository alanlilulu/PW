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
  // 是否显示debug工具UI
  showDebugUI: boolean;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: ReactNode }) {
  const [debugMode, setDebugMode] = useState(false);

  // 检查URL参数和localStorage中的debug mode设置
  useEffect(() => {
    // 首先检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const urlDebugParam = urlParams.get('debug');
    
    if (urlDebugParam === 'true') {
      setDebugMode(true);
      // 如果通过URL参数激活，也保存到localStorage
      localStorage.setItem('debugMode', 'true');
    } else if (urlDebugParam === 'false') {
      setDebugMode(false);
      localStorage.setItem('debugMode', 'false');
    } else {
      // 如果没有URL参数，从localStorage读取
      const savedDebugMode = localStorage.getItem('debugMode');
      if (savedDebugMode !== null) {
        setDebugMode(JSON.parse(savedDebugMode));
      }
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
  
  // 检查是否应该显示debug工具UI（通过URL参数激活时才显示）
  const urlParams = new URLSearchParams(window.location.search);
  const showDebugUI = debugMode && urlParams.get('debug') === 'true';

  return (
    <DebugContext.Provider value={{ 
      debugMode, 
      toggleDebugMode, 
      setDebugMode: updateDebugMode,
      showPerformanceMetrics,
      showPhotoCounts,
      showConsoleLogs,
      showGitHubTokenConfig,
      showDebugUI
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
