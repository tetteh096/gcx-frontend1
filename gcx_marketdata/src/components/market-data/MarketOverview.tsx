'use client';

import { Card, Title, Text, Metric } from '@tremor/react';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Users } from 'lucide-react';

interface MarketMetric {
  title: string;
  value: string;
  change: number;
  changePercent: number;
  icon: React.ReactNode;
  color: string;
}

const marketMetrics: MarketMetric[] = [
  {
    title: 'Total Trading Volume',
    value: '₵ 45.2M',
    change: 2.1,
    changePercent: 4.8,
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'blue'
  },
  {
    title: 'Active Commodities',
    value: '12',
    change: 0,
    changePercent: 0,
    icon: <Activity className="w-6 h-6" />,
    color: 'green'
  },
  {
    title: 'Market Cap',
    value: '₵ 128.7M',
    change: 5.3,
    changePercent: 4.3,
    icon: <DollarSign className="w-6 h-6" />,
    color: 'purple'
  },
  {
    title: 'Active Traders',
    value: '1,247',
    change: 12,
    changePercent: 1.0,
    icon: <Users className="w-6 h-6" />,
    color: 'orange'
  }
];

export default function MarketOverview() {
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getCardColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'green': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'purple': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700';
      case 'orange': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700';
      default: return 'bg-gray-50 dark:bg-gray-700 border-border';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'purple': return 'text-purple-600';
      case 'orange': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {marketMetrics.map((metric, index) => (
        <Card 
          key={index} 
          className={`${getCardColor(metric.color)} border-2`}
        >
          <div className="flex items-center justify-between">
            <div>
              <Title className="text-muted-foreground text-sm font-medium">
                {metric.title}
              </Title>
              <Metric className="text-2xl font-bold text-foreground mt-2">
                {metric.value}
              </Metric>
              <div className="flex items-center gap-2 mt-2">
                {getChangeIcon(metric.change)}
                <Text className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                </Text>
                <Text className="text-xs text-muted-foreground">
                  from last week
                </Text>
              </div>
            </div>
            <div className={`p-3 rounded-lg bg-card ${getIconColor(metric.color)}`}>
              {metric.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
