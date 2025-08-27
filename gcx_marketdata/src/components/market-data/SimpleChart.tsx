'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for demonstration
const data = [
  { name: 'Jan', price: 400 },
  { name: 'Feb', price: 300 },
  { name: 'Mar', price: 500 },
  { name: 'Apr', price: 450 },
  { name: 'May', price: 600 },
  { name: 'Jun', price: 550 },
  { name: 'Jul', price: 700 },
  { name: 'Aug', price: 650 },
  { name: 'Sep', price: 800 },
  { name: 'Oct', price: 750 },
  { name: 'Nov', price: 900 },
  { name: 'Dec', price: 850 },
];

export default function SimpleChart() {
  return (
    <div className="h-96 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Market Price Trends</h3>
        <p className="text-sm text-gray-600">
          Historical price movements and patterns
        </p>
      </div>
      <div className="p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
