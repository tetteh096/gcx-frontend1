'use client';

import React from 'react';
import { Card, Title } from '@tremor/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon, TrendingUp, Activity } from 'lucide-react';

interface VolumeDistributionChartProps {
  data: any[];
  title: string;
}

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
const COLORS_HOVER = ['#059669', '#2563EB', '#7C3AED', '#D97706', '#DC2626'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
        <p className="font-bold text-gray-900 mb-2">{data.name}</p>
        <p className="text-gray-700 font-semibold">
          Volume: <span className="text-gray-900 font-bold">{data.value.toLocaleString()} tons</span>
        </p>
        <p className="text-gray-600 text-sm">
          Share: <span className="font-semibold">{data.payload.share}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function VolumeDistributionChart({ data, title }: VolumeDistributionChartProps) {
  return (
         <Card className="h-full bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-xl p-4">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/20 via-transparent to-pink-50/20 rounded-2xl"></div>
        
        <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
            <div>
              <Title className="text-gray-900 font-bold text-xl bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
                {title}
              </Title>
                             <p className="text-gray-600 mt-1 font-medium flex items-center space-x-2">
                 <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                 <span>Live</span>
               </p>
            </div>
            
            {/* Total Volume */}
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Total Volume</p>
              <p className="text-lg font-bold text-purple-600">
                {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()} tons
              </p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <defs>
                <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15"/>
                </filter>
              </defs>
              
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                filter="url(#pieShadow)"
                className="transition-all duration-300 hover:scale-105"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 hover:fill-[#059669]"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              
              <Tooltip content={<CustomTooltip />} />
              
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                iconSize={12}
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
                     {/* Bottom Stats Grid */}
           <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-700 text-xs font-medium">Top Commodity</p>
              <p className="text-green-900 font-bold text-sm">
                {data.reduce((max, item) => item.value > max.value ? item : max).name}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-xs font-medium">Active Items</p>
              <p className="text-blue-900 font-bold text-sm">{data.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
