'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SimpleThemeToggle } from '@/components/ui/ThemeToggle';

export default function DebugThemePage() {
  const { theme, actualTheme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Theme Debug Page</h1>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Current Theme State</h2>
            <p><strong>Theme:</strong> {theme}</p>
            <p><strong>Actual Theme:</strong> {actualTheme}</p>
            <p><strong>Document Classes:</strong> {typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</p>
            <p><strong>Has Dark Class:</strong> {typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') ? 'Yes' : 'No' : 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Theme Controls</h2>
            <div className="flex space-x-4 mb-4">
              <button 
                onClick={() => setTheme('light')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Set Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              >
                Set Dark
              </button>
              <button 
                onClick={() => setTheme('system')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Set System
              </button>
            </div>
            <SimpleThemeToggle />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Test Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card border border-border rounded">
                <h3 className="font-semibold text-foreground">Light/Dark Card</h3>
                <p className="text-muted-foreground">This card should change with theme</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">
                <h3 className="font-semibold text-foreground">Another Test Card</h3>
                <p className="text-muted-foreground">Testing dark mode styles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


