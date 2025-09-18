import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isNavigating: boolean;
  setNavigating: (navigating: boolean) => void;
  navigationMessage: string;
  setNavigationMessage: (message: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationMessage, setNavigationMessage] = useState('');

  const setNavigating = (navigating: boolean) => {
    setIsNavigating(navigating);
    if (!navigating) {
      // 立即清除消息
      setNavigationMessage('');
    }
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        isNavigating, 
        setNavigating, 
        navigationMessage, 
        setNavigationMessage 
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
