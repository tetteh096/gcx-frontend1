'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
      setActualTheme('dark');
      console.log('Applied dark theme, classes:', root.className);
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
      setActualTheme('light');
      console.log('Applied light theme, classes:', root.className);
    } else if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
        setActualTheme('dark');
        console.log('Applied system dark theme, classes:', root.className);
      } else {
        root.classList.remove('dark');
        setActualTheme('light');
        console.log('Applied system light theme, classes:', root.className);
      }
    }
  };

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    console.log('Setting theme to:', newTheme);
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    
    // Debug: Check CSS variables after theme change
    setTimeout(() => {
      const root = document.documentElement;
      const background = getComputedStyle(root).getPropertyValue('--background');
      const foreground = getComputedStyle(root).getPropertyValue('--foreground');
      console.log('CSS Variables after theme change:', { background, foreground });
    }, 100);
  };

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme to:', newTheme);
    console.log('Current actualTheme:', actualTheme);
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const initialTheme = savedTheme || 'light';
      
      console.log('Initializing theme:', initialTheme);
      setThemeState(initialTheme);
      applyTheme(initialTheme);
      
      // Debug: Check initial CSS variables
      setTimeout(() => {
        const root = document.documentElement;
        const background = getComputedStyle(root).getPropertyValue('--background');
        const foreground = getComputedStyle(root).getPropertyValue('--foreground');
        console.log('Initial CSS Variables:', { background, foreground });
        console.log('Initial HTML classes:', root.className);
      }, 100);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
