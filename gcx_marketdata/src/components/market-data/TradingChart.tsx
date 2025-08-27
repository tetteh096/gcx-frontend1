'use client';

import React, { useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, Zap, Globe } from 'lucide-react';

interface TradingChartProps {
  commodity: string;
  data: any[];
}

export default function TradingChart({ commodity = 'Maize', data }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('area');

  // Enhanced trading data with OHLCV structure
  const enhancedTradingData = [
    { time: '09:00', open: 3600, high: 3620, low: 3595, close: 3610, volume: 1200, price: 3610 },
    { time: '09:30', open: 3610, high: 3635, low: 3605, close: 3625, volume: 1800, price: 3625 },
    { time: '10:00', open: 3625, high: 3640, low: 3615, close: 3630, volume: 2100, price: 3630 },
    { time: '10:30', open: 3630, high: 3645, low: 3620, close: 3635, volume: 1900, price: 3635 },
    { time: '11:00', open: 3635, high: 3650, low: 3625, close: 3640, volume: 2300, price: 3640 },
    { time: '11:30', open: 3640, high: 3655, low: 3630, close: 3645, volume: 2000, price: 3645 },
    { time: '12:00', open: 3645, high: 3660, low: 3635, close: 3650, volume: 2400, price: 3650 },
    { time: '12:30', open: 3650, high: 3665, low: 3640, close: 3655, volume: 1700, price: 3655 },
    { time: '13:00', open: 3655, high: 3670, low: 3645, close: 3660, volume: 2200, price: 3660 },
    { time: '13:30', open: 3660, high: 3675, low: 3650, close: 3665, volume: 1900, price: 3665 },
    { time: '14:00', open: 3665, high: 3680, low: 3655, close: 3670, volume: 2100, price: 3670 },
    { time: '14:30', open: 3670, high: 3685, low: 3660, close: 3675, volume: 1800, price: 3675 },
  ];

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
  ];

  const chartTypes = [
    { label: 'Area', value: 'area', icon: Activity },
    { label: 'Line', value: 'line', icon: TrendingUp },
    { label: 'Volume', value: 'volume', icon: BarChart3 },
  ];

  const currentPrice = enhancedTradingData[enhancedTradingData.length - 1]?.close || 3675;
  const previousPrice = enhancedTradingData[0]?.open || 3600;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100);

  const formatCurrency = (value: number) => {
    return `₵${value.toLocaleString()}`;
  };

  const formatVolume = (value: number) => {
    return `${value.toLocaleString()} tons`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
          <p className="font-bold text-gray-900 mb-3 text-base">{label}</p>
          {chartType === 'volume' ? (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-blue-700 font-semibold">Volume: </span>
                <span className="font-bold text-gray-900">{formatVolume(data.volume)}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-700 font-semibold">Price: </span>
                <span className="font-bold text-gray-900">{formatCurrency(data.price)}</span>
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-green-700 font-semibold">Open: </span>
                <span className="font-bold text-gray-900">{formatCurrency(data.open)}</span>
              </p>
              <p className="text-sm">
                <span className="text-blue-700 font-semibold">High: </span>
                <span className="font-bold text-gray-900">{formatCurrency(data.high)}</span>
              </p>
              <p className="text-sm">
                <span className="text-red-700 font-semibold">Low: </span>
                <span className="font-bold text-gray-900">{formatCurrency(data.low)}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-900 font-semibold">Close: </span>
                <span className="font-bold text-gray-900">{formatCurrency(data.close)}</span>
              </p>
              <p className="text-sm">
                <span className="text-purple-700 font-semibold">Volume: </span>
                <span className="font-bold text-gray-900">{formatVolume(data.volume)}</span>
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={enhancedTradingData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeWidth={1} opacity={0.6} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="url(#lineGradient)" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4, stroke: '#ffffff' }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 3, fill: '#ffffff' }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'volume':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={enhancedTradingData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeWidth={1} opacity={0.6} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                yAxisId="volume"
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
                tickFormatter={formatVolume}
              />
              <YAxis 
                yAxisId="price"
                orientation="right"
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="volume"
                dataKey="volume" 
                fill="url(#volumeGradient)" 
                opacity={0.8}
                radius={[4, 4, 0, 0]}
                stroke="#1E40AF"
                strokeWidth={1}
              />
              <Line 
                yAxisId="price"
                type="monotone" 
                dataKey="price" 
                stroke="url(#priceGradient)" 
                strokeWidth={3}
                dot={false}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      default: // area
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enhancedTradingData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeWidth={1} opacity={0.6} />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                fontWeight={500}
                tickLine={{ stroke: '#D1D5DB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280' }}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke="url(#strokeGradient)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPrice)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
         <Card className="h-full bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-xl p-4">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 via-transparent to-blue-50/30 rounded-2xl"></div>
        
        <div className="relative z-10">
          {/* Chart Header */}
                     <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3">
                <Title className="text-gray-900 font-bold text-xl bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent">
                  {commodity} Trading Chart
                </Title>
                                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <Text className="text-green-600 text-sm font-medium">Live</Text>
                 </div>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">{formatCurrency(currentPrice)}</span>
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl ${
                    priceChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-semibold text-sm">
                      {priceChange >= 0 ? '+' : ''}{formatCurrency(priceChange)} ({percentChange.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart Controls */}
            <div className="flex items-center space-x-4">
              {/* Timeframe Selector */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1 shadow-sm">
                {timeframes.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => setTimeframe(tf.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      timeframe === tf.value
                        ? 'bg-white text-gray-900 shadow-md transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
              
              {/* Chart Type Selector */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1 shadow-sm">
                {chartTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setChartType(type.value)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        chartType === type.value
                          ? 'bg-white text-gray-900 shadow-md transform scale-105'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[400px]">
            {renderChart()}
          </div>

                     {/* Chart Summary */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-200">
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <Text className="text-green-700 text-sm font-medium">Today's High</Text>
              <Text className="font-bold text-green-900 text-lg">{formatCurrency(Math.max(...enhancedTradingData.map(d => d.high)))}</Text>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
              <Text className="text-red-700 text-sm font-medium">Today's Low</Text>
              <Text className="font-bold text-red-900 text-lg">{formatCurrency(Math.min(...enhancedTradingData.map(d => d.low)))}</Text>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <Text className="text-blue-700 text-sm font-medium">Total Volume</Text>
              <Text className="font-bold text-blue-900 text-lg">{formatVolume(enhancedTradingData.reduce((sum, d) => sum + d.volume, 0))}</Text>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <Text className="text-purple-700 text-sm font-medium">Avg Price</Text>
              <Text className="font-bold text-purple-900 text-lg">{formatCurrency(enhancedTradingData.reduce((sum, d) => sum + d.close, 0) / enhancedTradingData.length)}</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
