'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, Volume2, Clock, Target, BarChart3 } from 'lucide-react';

interface MarketSummaryData {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: 'trending-up' | 'trending-down' | 'activity' | 'dollar' | 'volume' | 'clock' | 'target' | 'chart';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
}

interface MarketSummaryProps {
  data: MarketSummaryData[];
  title?: string;
  layout?: 'grid' | 'list';
  showBorder?: boolean;
}

export default function MarketSummary({ 
  data, 
  title = "Market Summary", 
  layout = 'grid',
  showBorder = true 
}: MarketSummaryProps) {
  
  const getIcon = (iconType: string) => {
    const iconProps = { className: "w-8 h-8" };
    switch (iconType) {
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'trending-down': return <TrendingDown {...iconProps} />;
      case 'activity': return <Activity {...iconProps} />;
      case 'dollar': return <DollarSign {...iconProps} />;
      case 'volume': return <Volume2 {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'target': return <Target {...iconProps} />;
      case 'chart': return <BarChart3 {...iconProps} />;
      default: return <Activity {...iconProps} />;
    }
  };

  const getColorClasses = (color: string = 'blue', trend: string = 'neutral') => {
    const baseClasses = {
      blue: {
        bg: 'from-blue-500 to-blue-600',
        text: 'text-blue-100',
        icon: 'text-blue-200',
        border: 'border-blue-300',
        bgLight: 'bg-blue-50/80'
      },
      green: {
        bg: 'from-green-500 to-green-600',
        text: 'text-green-100',
        icon: 'text-green-200',
        border: 'border-green-300',
        bgLight: 'bg-green-50/80'
      },
      red: {
        bg: 'from-red-500 to-red-600',
        text: 'text-red-100',
        icon: 'text-red-200',
        border: 'border-red-300',
        bgLight: 'bg-red-50/80'
      },
      yellow: {
        bg: 'from-yellow-500 to-yellow-600',
        text: 'text-yellow-100',
        icon: 'text-yellow-200',
        border: 'border-yellow-300',
        bgLight: 'bg-yellow-50/80'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        text: 'text-purple-100',
        icon: 'text-purple-200',
        border: 'border-purple-300',
        bgLight: 'bg-purple-50/80'
      },
      indigo: {
        bg: 'from-indigo-500 to-indigo-600',
        text: 'text-indigo-100',
        icon: 'text-indigo-200',
        border: 'border-indigo-300',
        bgLight: 'bg-indigo-50/80'
      }
    };

    return baseClasses[color as keyof typeof baseClasses] || baseClasses.blue;
  };

  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value);
    }
    return value;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  if (layout === 'list') {
    return (
      <div className={`bg-card rounded-xl shadow-lg ${showBorder ? 'border border-border' : ''} overflow-hidden`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
          <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
        </div>

        {/* List Items */}
        <div className="divide-y divide-border">
          {data.map((item, index) => {
            const colors = getColorClasses(item.color, item.trend);
            const ChangeIcon = item.change !== undefined ? getChangeIcon(item.change) : null;
            
            return (
              <div key={index} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${colors.bgLight}`}>
                      <div className={`text-${item.color}-600`}>
                        {getIcon(item.icon || 'activity')}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground">{item.title}</h4>
                      {item.subtitle && (
                        <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-card-foreground">
                      {formatValue(item.value)}
                    </div>
                    {item.change !== undefined && ChangeIcon && (
                      <div className={`flex items-center justify-end space-x-1 text-sm font-medium ${getChangeColor(item.change)}`}>
                        <ChangeIcon className="w-4 h-4" />
                        <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}</span>
                        {item.changePercent !== undefined && (
                          <span>({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => {
          const colors = getColorClasses(item.color, item.trend);
          const ChangeIcon = item.change !== undefined ? getChangeIcon(item.change) : null;
          
          return (
            <div
              key={index}
              className={`bg-gradient-to-r ${colors.bg} rounded-xl shadow-lg border-0 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm font-medium ${colors.text} opacity-90`}>
                    {item.title}
                  </div>
                  <div className={`text-2xl font-bold ${colors.text} mt-1`}>
                    {formatValue(item.value)}
                  </div>
                  {item.subtitle && (
                    <div className={`text-xs ${colors.text} opacity-75 mt-1`}>
                      {item.subtitle}
                    </div>
                  )}
                  {item.change !== undefined && ChangeIcon && (
                    <div className={`flex items-center space-x-1 text-sm font-medium ${colors.text} opacity-90 mt-2`}>
                      <ChangeIcon className="w-4 h-4" />
                      <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}</span>
                      {item.changePercent !== undefined && (
                        <span>({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
                      )}
                    </div>
                  )}
                </div>
                <div className={colors.icon}>
                  {getIcon(item.icon || 'activity')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
