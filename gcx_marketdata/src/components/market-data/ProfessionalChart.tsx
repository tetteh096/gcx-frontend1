'use client';

import React from 'react';
import { LineChart, AreaChart, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Area, Bar } from 'recharts';

interface ChartData {
  date: string;
  [key: string]: any;
}

interface ProfessionalChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  type: 'line' | 'area' | 'bar' | 'candlestick';
  series: {
    key: string;
    name: string;
    color: string;
    type?: 'line' | 'area' | 'bar';
  }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  valueFormatter?: (value: any) => string;
}

export default function ProfessionalChart({
  data,
  title,
  subtitle,
  type,
  series,
  height = 400,
  showGrid = true,
  showLegend = true,
  valueFormatter = (value) => value?.toLocaleString()
}: ProfessionalChartProps) {
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-4 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-card-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-bold text-card-foreground">
                {valueFormatter ? valueFormatter(entry.value) : formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      width: undefined,
      height: undefined
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                strokeOpacity={0.5}
              />
            )}
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={valueFormatter || formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                dot={{ fill: s.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: s.color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                strokeOpacity={0.5}
              />
            )}
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={valueFormatter || formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                fill={s.color}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                strokeOpacity={0.5}
              />
            )}
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={valueFormatter || formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                fill={s.color}
                opacity={0.8}
              />
            ))}
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart() ?? <></>}
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="bg-muted px-6 py-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Data points: {data.length}</span>
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
