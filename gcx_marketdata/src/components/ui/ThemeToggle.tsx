'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-secondary transition-colors">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'dark':
        return <Moon className="w-5 h-5 text-blue-400" />;
      case 'system':
        return <Monitor className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system preference';
      case 'system':
        return 'Switch to light mode';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      title={getTooltip()}
      className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      <div className="transition-transform duration-200">
        {getIcon()}
      </div>
      
      {/* Theme indicator */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-card border-2 flex items-center justify-center">
        <div 
          className={`w-1.5 h-1.5 rounded-full ${
            actualTheme === 'dark' 
              ? 'bg-blue-500' 
              : 'bg-yellow-500'
          }`}
        />
      </div>
    </button>
  );
}

// Simple theme toggle (just light/dark)
export function SimpleThemeToggle() {
  const { actualTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-secondary transition-colors">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      <div className="relative">
        <Sun className={`w-5 h-5 text-yellow-500 transition-all duration-300 ${
          actualTheme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        <Moon className={`w-5 h-5 text-blue-400 absolute inset-0 transition-all duration-300 ${
          actualTheme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`} />
      </div>
    </button>
  );
}


