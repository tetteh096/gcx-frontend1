'use client';

import React from 'react';
import { Card, Title } from '@tremor/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, TrendingUp, BarChart3 } from 'lucide-react';

interface RegionalVolumeChartProps {
  data: any[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
        <p className="font-bold text-gray-900 mb-3 text-base">{label}</p>
        <div className="flex items-center space-x-2 mb-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.color }}
          ></div>
          <span className="text-gray-700 font-semibold">Volume:</span>
          <span className="text-gray-900 font-bold">
            {data.value.toLocaleString()} tons
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function RegionalVolumeChart({ data, title }: RegionalVolumeChartProps) {
  const formatVolume = (value: number) => {
    return `${value.toLocaleString()} tons`;
  };

  return (
         <Card className="h-full bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-xl p-4">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 rounded-2xl"></div>
        
        <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
            <div>
              <Title className="text-gray-900 font-bold text-xl bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                {title}
              </Title>
              <p className="text-gray-600 mt-1 font-medium flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Regional trading activity</span>
              </p>
            </div>
            
            {/* Summary Stats */}
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Total Volume</p>
              <p className="text-lg font-bold text-blue-600">
                {data.reduce((sum, item) => sum + item.totalVolume, 0).toLocaleString()} tons
              </p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.9}/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.1"/>
                </filter>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                strokeWidth={1}
                opacity={0.6}
              />
              
              <XAxis 
                dataKey="region" 
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
                tickFormatter={formatVolume}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Bar 
                dataKey="totalVolume" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
                stroke="#1E40AF"
                strokeWidth={1}
                filter="url(#shadow)"
                className="hover:fill-[url(#barGradientHover)] transition-all duration-300"
              />
            </BarChart>
          </ResponsiveContainer>
          
                     {/* Bottom Stats */}
           <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-xs font-medium">Highest Volume</p>
              <p className="text-blue-900 font-bold">
                {Math.max(...data.map(item => item.totalVolume)).toLocaleString()} tons
              </p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-purple-700 text-xs font-medium">Regions Active</p>
              <p className="text-purple-900 font-bold">{data.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
