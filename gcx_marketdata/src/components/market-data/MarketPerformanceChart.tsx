'use client';

import React from 'react';
import { Card, Title, Text } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MarketPerformanceChartProps {
  data: any[];
  title: string;
  subtitle: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
        <p className="font-bold text-gray-900 mb-3 text-base">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-700 font-semibold">{entry.name}:</span>
            <span className="text-gray-900 font-bold">
              GH₵{entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MarketPerformanceChart({ data, title, subtitle }: MarketPerformanceChartProps) {
  const formatCurrency = (value: number) => {
    return `GH₵${value.toLocaleString()}`;
  };

  return (
         <Card className="h-full bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-xl p-4">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-green-50/30 rounded-2xl"></div>
        
        <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
            <div>
              <Title className="text-gray-900 font-bold text-xl bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                {title}
              </Title>
              <Text className="text-gray-600 mt-1 font-medium flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </Text>
            </div>
            
            {/* Performance Indicator */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Today's Change</p>
                <p className="text-lg font-bold text-green-600">+3.2%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="maizeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="soyaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="riceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="sorghumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="sesameGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                strokeWidth={1}
                opacity={0.6}
              />
              
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
              
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                iconSize={12}
                wrapperStyle={{ paddingBottom: '20px' }}
              />
              
              {/* Main lines only - no duplicate areas */}
              <Line 
                type="monotone" 
                dataKey="Maize" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 3, fill: '#ffffff' }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Line 
                type="monotone" 
                dataKey="Soya Bean" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 3, fill: '#ffffff' }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Line 
                type="monotone" 
                dataKey="Milled Rice" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 3, fill: '#ffffff' }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Line 
                type="monotone" 
                dataKey="Sorghum" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
                activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 3, fill: '#ffffff' }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Line 
                type="monotone" 
                dataKey="Sesame" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
                activeDot={{ r: 8, stroke: '#EF4444', strokeWidth: 3, fill: '#ffffff' }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
