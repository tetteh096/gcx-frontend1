'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, Title, Text } from '@tremor/react';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface PriceData {
  date: string;
  maize: number;
  soybeans: number;
  rice: number;
  sorghum: number;
}

const mockPriceData: PriceData[] = [
  { date: '2024-01', maize: 1200, soybeans: 850, rice: 2000, sorghum: 950 },
  { date: '2024-02', maize: 1220, soybeans: 870, rice: 2050, sorghum: 960 },
  { date: '2024-03', maize: 1180, soybeans: 890, rice: 2100, sorghum: 940 },
  { date: '2024-04', maize: 1250, soybeans: 920, rice: 2150, sorghum: 980 },
  { date: '2024-05', maize: 1280, soybeans: 950, rice: 2200, sorghum: 1000 },
  { date: '2024-06', maize: 1320, soybeans: 980, rice: 2250, sorghum: 1020 },
  { date: '2024-07', maize: 1350, soybeans: 1000, rice: 2300, sorghum: 1050 },
  { date: '2024-08', maize: 1380, soybeans: 1020, rice: 2350, sorghum: 1080 },
  { date: '2024-09', maize: 1400, soybeans: 1050, rice: 2400, sorghum: 1100 },
  { date: '2024-10', maize: 1420, soybeans: 1080, rice: 2450, sorghum: 1120 },
  { date: '2024-11', maize: 1450, soybeans: 1100, rice: 2500, sorghum: 1150 },
  { date: '2024-12', maize: 1480, soybeans: 1120, rice: 2550, sorghum: 1180 }
];

const timeRanges = [
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' }
];

export default function PriceChart() {
  const [selectedRange, setSelectedRange] = useState('1Y');
  const [selectedCommodity, setSelectedCommodity] = useState('maize');

  const getFilteredData = () => {
    switch (selectedRange) {
      case '1M':
        return mockPriceData.slice(-1);
      case '3M':
        return mockPriceData.slice(-3);
      case '6M':
        return mockPriceData.slice(-6);
      case '1Y':
        return mockPriceData.slice(-12);
      default:
        return mockPriceData;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCommodityColor = (commodity: string) => {
    switch (commodity) {
      case 'maize': return '#3B82F6';
      case 'soybeans': return '#10B981';
      case 'rice': return '#8B5CF6';
      case 'sorghum': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  const getCommodityName = (commodity: string) => {
    switch (commodity) {
      case 'maize': return 'Maize';
      case 'soybeans': return 'Soybeans';
      case 'rice': return 'Rice';
      case 'sorghum': return 'Sorghum';
      default: return 'Maize';
    }
  };

  const filteredData = getFilteredData();
  const currentPrice = filteredData[filteredData.length - 1]?.[selectedCommodity as keyof PriceData] || 0;
  const previousPrice = filteredData[0]?.[selectedCommodity as keyof PriceData] || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? ((priceChange / previousPrice) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header with commodity selector and time range */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title className="text-lg font-semibold text-gray-900">
            {getCommodityName(selectedCommodity)} Price Chart
          </Title>
          <Text className="text-gray-600">
            Historical price movements and trends
          </Text>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="maize">Maize</option>
            <option value="soybeans">Soybeans</option>
            <option value="rice">Rice</option>
            <option value="sorghum">Sorghum</option>
          </select>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  selectedRange === range.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm text-gray-600">Current Price</Text>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(currentPrice)}
            </div>
          </div>
          <div className="text-right">
            <Text className="text-sm text-gray-600">Change</Text>
            <div className={`flex items-center gap-1 text-lg font-semibold ${
              priceChange > 0 ? 'text-green-600' : priceChange < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {priceChange > 0 ? <TrendingUp className="w-4 h-4" /> : priceChange < 0 ? <TrendingDown className="w-4 h-4" /> : null}
              {priceChange > 0 ? '+' : ''}{formatPrice(priceChange)} ({priceChangePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value + '-01');
                return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
              }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => formatPrice(value)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <p className="font-medium text-gray-900">{label}</p>
                      {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                          {getCommodityName(selectedCommodity)}: {formatPrice(entry.value)}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={selectedCommodity}
              stroke={getCommodityColor(selectedCommodity)}
              fill={getCommodityColor(selectedCommodity)}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
