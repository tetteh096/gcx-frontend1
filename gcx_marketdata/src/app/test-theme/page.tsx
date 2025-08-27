'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Card, Title, Text, Metric, Badge } from '@tremor/react';

export default function TestThemePage() {
  const { theme, actualTheme, toggleTheme } = useTheme();

  // Function to get computed CSS variables
  const getCSSVariable = (name: string) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(name);
    }
    return 'N/A';
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Theme Test Page</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Testing theme switching and CSS variable application
          </p>
          
          <button
            onClick={toggleTheme}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Toggle Theme (Current: {actualTheme})
          </button>
        </div>

        {/* Theme Info */}
        <Card className="bg-card text-card-foreground border-border">
          <Title className="text-card-foreground">Theme Information</Title>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Text className="text-muted-foreground">Theme Setting:</Text>
              <Text className="font-semibold">{theme}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">Actual Theme:</Text>
              <Text className="font-semibold">{actualTheme}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">HTML Class:</Text>
              <Text className="font-semibold">
                {typeof window !== 'undefined' ? document.documentElement.className : 'N/A'}
              </Text>
            </div>
            <div>
              <Text className="text-muted-foreground">Body Class:</Text>
              <Text className="font-semibold">
                {typeof window !== 'undefined' ? document.body.className : 'N/A'}
              </Text>
            </div>
          </div>
        </Card>

        {/* CSS Variables */}
        <Card className="bg-card text-card-foreground border-border">
          <Title className="text-card-foreground">CSS Variables</Title>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Text className="text-muted-foreground">--background:</Text>
              <Text className="font-mono text-sm">{getCSSVariable('--background')}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">--foreground:</Text>
              <Text className="font-mono text-sm">{getCSSVariable('--foreground')}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">--card:</Text>
              <Text className="font-mono text-sm">{getCSSVariable('--card')}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">--card-foreground:</Text>
              <Text className="font-mono text-sm">{getCSSVariable('--card-foreground')}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">--muted:</Text>
              <Text className="font-mono text-sm">{getCSSVariable('--muted')}</Text>
            </div>
            <div>
              <Text className="text-muted-foreground">--muted-foreground:</Text>
              <Text className="font-mono text-sm">{getCSSVariable('--muted-foreground')}</Text>
            </div>
          </div>
        </Card>

        {/* Tremor Component Test */}
        <Card className="bg-card text-card-foreground border-border">
          <Title className="text-card-foreground">Tremor Components Test</Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Text className="text-blue-700 dark:text-blue-300">Blue Text</Text>
              <Metric className="text-blue-900 dark:text-blue-100">Blue Metric</Metric>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Text className="text-green-700 dark:text-green-300">Green Text</Text>
              <Metric className="text-green-900 dark:text-green-100">Green Metric</Metric>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Text className="text-purple-700 dark:text-purple-300">Purple Text</Text>
              <Metric className="text-purple-900 dark:text-purple-100">Purple Metric</Metric>
            </div>
          </div>
        </Card>

        {/* Color Test */}
        <Card className="bg-card text-card-foreground border-border">
          <Title className="text-card-foreground">Color Classes Test</Title>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="p-4 bg-white text-gray-900 rounded-lg border">
              <Text className="text-gray-900">White Background</Text>
            </div>
            <div className="p-4 bg-gray-50 text-gray-900 rounded-lg border">
              <Text className="text-gray-900">Gray Background</Text>
            </div>
            <div className="p-4 bg-blue-50 text-blue-900 rounded-lg border">
              <Text className="text-blue-900">Blue Background</Text>
            </div>
            <div className="p-4 bg-green-50 text-green-900 rounded-lg border">
              <Text className="text-green-900">Green Background</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

