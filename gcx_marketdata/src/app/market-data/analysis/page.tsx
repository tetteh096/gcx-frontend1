'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge, AreaChart, BarChart, DonutChart, LineChart } from '@tremor/react';
import { 
  TrendingUp, TrendingDown, Filter, Search, Calendar, 
  MapPin, Activity, Volume2, DollarSign, RefreshCw, Radio,
  ArrowUpDown, Eye, Target, Bell, Zap, Clock, BarChart3,
  PieChart, Globe, Info, AlertTriangle, TrendingUpIcon, TrendingDownIcon
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Detailed GCX Commodity Data with Technical Indicators
const commodityData = {
  'Maize': {
    overview: {
      currentPrice: 1880.00,
      change: 0.27,
      volume: 2500,
      marketCap: 4700000,
      openInterest: 12500,
      volatility: 2.1,
      correlation: 0.85
    },
    technical: {
      rsi: 58.5,
      macd: 12.5,
      bollingerUpper: 1920,
      bollingerLower: 1840,
      movingAverage20: 1865,
      movingAverage50: 1820,
      support: 1850,
      resistance: 1910
    },
    fundamentals: {
      supply: 125000,
      demand: 118000,
      storage: 45000,
      quality: 'Premium Grade A',
      seasonality: 'Harvest Season',
      exportPotential: 'High'
    },
    regions: [
      { name: 'Greater Accra', price: 1880, volume: 2500, change: 0.27 },
      { name: 'Eastern', price: 2622, volume: 1900, change: 0.27 },
      { name: 'Ashanti', price: 1820, volume: 2100, change: 0.28 },
      { name: 'Northern', price: 4645, volume: 1500, change: 0.22 }
    ],
    priceHistory: [
      { date: '2025-08-01', price: 1850, volume: 2200 },
      { date: '2025-08-02', price: 1865, volume: 2350 },
      { date: '2025-08-03', price: 1870, volume: 2400 },
      { date: '2025-08-04', price: 1875, volume: 2450 },
      { date: '2025-08-05', price: 1880, volume: 2500 }
    ]
  },
  'Soya Bean': {
    overview: {
      currentPrice: 7418.00,
      change: 0.24,
      volume: 800,
      marketCap: 5934400,
      openInterest: 3200,
      volatility: 3.2,
      correlation: 0.72
    },
    technical: {
      rsi: 62.3,
      macd: 18.7,
      bollingerUpper: 7550,
      bollingerLower: 7286,
      movingAverage20: 7380,
      movingAverage50: 7250,
      support: 7300,
      resistance: 7500
    },
    fundamentals: {
      supply: 45000,
      demand: 42000,
      storage: 18000,
      quality: 'Grade 1',
      seasonality: 'Planting Season',
      exportPotential: 'Very High'
    },
    regions: [
      { name: 'Northern', price: 7418, volume: 800, change: 0.24 },
      { name: 'Volta', price: 2800, volume: 450, change: 0.36 },
      { name: 'Upper West', price: 4828, volume: 350, change: 0.27 }
    ],
    priceHistory: [
      { date: '2025-08-01', price: 7380, volume: 750 },
      { date: '2025-08-02', price: 7395, volume: 780 },
      { date: '2025-08-03', price: 7405, volume: 790 },
      { date: '2025-08-04', price: 7410, volume: 795 },
      { date: '2025-08-05', price: 7418, volume: 800 }
    ]
  },
  'Milled Rice': {
    overview: {
      currentPrice: 11110.00,
      change: 0.18,
      volume: 500,
      marketCap: 5555000,
      openInterest: 1800,
      volatility: 1.8,
      correlation: 0.68
    },
    technical: {
      rsi: 55.8,
      macd: 8.9,
      bollingerUpper: 11250,
      bollingerLower: 10970,
      movingAverage20: 11080,
      movingAverage50: 10950,
      support: 11000,
      resistance: 11200
    },
    fundamentals: {
      supply: 35000,
      demand: 38000,
      storage: 12000,
      quality: 'Premium Long Grain',
      seasonality: 'Year Round',
      exportPotential: 'Medium'
    },
    regions: [
      { name: 'Brong Ahafo', price: 11110, volume: 500, change: 0.18 }
    ],
    priceHistory: [
      { date: '2025-08-01', price: 11090, volume: 480 },
      { date: '2025-08-02', price: 11095, volume: 485 },
      { date: '2025-08-03', price: 11100, volume: 490 },
      { date: '2025-08-04', price: 11105, volume: 495 },
      { date: '2025-08-05', price: 11110, volume: 500 }
    ]
  }
};

export default function CommodityAnalysisPage() {
  const { isCollapsed } = useSidebar();
  const [selectedCommodity, setSelectedCommodity] = useState('Maize');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const commodity = commodityData[selectedCommodity as keyof typeof commodityData];
  const commodities = Object.keys(commodityData);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GH').format(num);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUpIcon : TrendingDownIcon;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  if (!commodity) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
          <div className="w-full px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Commodity Analysis</h1>
                  <p className="text-gray-700 mt-1 font-medium">Detailed insights and technical analysis for GCX commodities</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Live Data</span>
                  </div>
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span className="text-sm">Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Commodity Selector */}
            <div className="mb-6">
              <Card>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Text className="text-gray-700 font-medium">Analysis:</Text>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Text className="text-gray-600">Commodity:</Text>
                    <select
                      value={selectedCommodity}
                      onChange={(e) => setSelectedCommodity(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {commodities.map(commodity => (
                        <option key={commodity} value={commodity}>{commodity}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Text className="text-gray-600">Timeframe:</Text>
                    <select
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="1D">1 Day</option>
                      <option value="1W">1 Week</option>
                      <option value="1M">1 Month</option>
                      <option value="3M">3 Months</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            {/* Commodity Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-100 font-medium">Current Price</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(commodity.overview.currentPrice)}
                    </Metric>
                    <div className="flex items-center space-x-2 mt-1">
                      {React.createElement(getChangeIcon(commodity.overview.change), { 
                        className: `w-4 h-4 ${getChangeColor(commodity.overview.change)}` 
                      })}
                      <span className={`text-sm font-medium ${getChangeColor(commodity.overview.change)}`}>
                        {commodity.overview.change >= 0 ? '+' : ''}{commodity.overview.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <DollarSign className="w-10 h-10 text-blue-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-100 font-medium">Trading Volume</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatNumber(commodity.overview.volume)} tons
                    </Metric>
                    <Text className="text-white font-medium">Today's Activity</Text>
                  </div>
                  <Volume2 className="w-10 h-10 text-green-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-purple-100 font-medium">Market Cap</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(commodity.overview.marketCap)}
                    </Metric>
                    <Text className="text-white font-medium">Total Value</Text>
                  </div>
                  <BarChart3 className="w-10 h-10 text-purple-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-orange-100 font-medium">Volatility</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {commodity.overview.volatility}%
                    </Metric>
                    <Text className="text-white font-medium">Price Movement</Text>
                  </div>
                  <Activity className="w-10 h-10 text-orange-200" />
                </div>
              </Card>
            </div>

            {/* Technical Analysis & Fundamentals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Technical Indicators */}
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Technical Indicators</Title>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">RSI (14)</span>
                      <span className={`text-sm font-bold ${
                        commodity.technical.rsi > 70 ? 'text-red-600' : 
                        commodity.technical.rsi < 30 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {commodity.technical.rsi}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">MACD</span>
                      <span className={`text-sm font-bold ${
                        commodity.technical.macd > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {commodity.technical.macd}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">20 MA</span>
                      <span className="text-sm font-bold text-gray-600">
                        {formatCurrency(commodity.technical.movingAverage20)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">50 MA</span>
                      <span className="text-sm font-bold text-gray-600">
                        {formatCurrency(commodity.technical.movingAverage50)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Support</span>
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(commodity.technical.support)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Resistance</span>
                      <span className="text-sm font-bold text-red-600">
                        {formatCurrency(commodity.technical.resistance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">BB Upper</span>
                      <span className="text-sm font-bold text-gray-600">
                        {formatCurrency(commodity.technical.bollingerUpper)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">BB Lower</span>
                      <span className="text-sm font-bold text-gray-600">
                        {formatCurrency(commodity.technical.bollingerLower)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Fundamental Analysis */}
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Fundamental Analysis</Title>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Text className="text-blue-700 font-medium text-sm">Supply</Text>
                      <Metric className="text-blue-900 text-lg">{formatNumber(commodity.fundamentals.supply)} tons</Metric>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Text className="text-green-700 font-medium text-sm">Demand</Text>
                      <Metric className="text-green-900 text-lg">{formatNumber(commodity.fundamentals.demand)} tons</Metric>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <Text className="text-yellow-700 font-medium text-sm">Quality Grade</Text>
                    <Metric className="text-yellow-900 text-lg">{commodity.fundamentals.quality}</Metric>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Text className="text-purple-700 font-medium text-sm">Seasonality</Text>
                      <Metric className="text-purple-900 text-lg">{commodity.fundamentals.seasonality}</Metric>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Text className="text-orange-700 font-medium text-sm">Export Potential</Text>
                      <Metric className="text-orange-900 text-lg">{commodity.fundamentals.exportPotential}</Metric>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Regional Performance */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Regional Performance</Title>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Region</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Change</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {commodity.regions.map((region, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                              <div className="text-sm font-medium text-gray-900">{region.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{formatCurrency(region.price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatNumber(region.volume)} tons</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${getChangeColor(region.change)}`}>
                              {region.change >= 0 ? '+' : ''}{region.change.toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              color={region.change >= 0 ? 'green' : 'red'}
                              className="text-xs"
                            >
                              {region.change >= 0 ? 'Bullish' : 'Bearish'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Price History Chart */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Price History - {selectedCommodity}</Title>
                <AreaChart
                  data={commodity.priceHistory}
                  index="date"
                  categories={["price"]}
                  colors={["blue"]}
                  valueFormatter={(value) => formatCurrency(value)}
                  showLegend={false}
                  className="h-64"
                />
              </Card>
            </div>

            {/* Market Insights */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Market Insights & Recommendations</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900 mb-1">Technical Outlook</h4>
                          <p className="text-sm text-blue-700">
                            {commodity.technical.rsi > 70 ? 'Overbought conditions suggest potential reversal' :
                             commodity.technical.rsi < 30 ? 'Oversold conditions indicate buying opportunity' :
                             'Neutral momentum with balanced risk/reward'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-start">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-green-900 mb-1">Support Levels</h4>
                          <p className="text-sm text-green-700">
                            Strong support at {formatCurrency(commodity.technical.support)} with volume confirmation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-yellow-900 mb-1">Risk Factors</h4>
                          <p className="text-sm text-yellow-700">
                            Monitor {commodity.overview.volatility}% volatility and correlation with global markets
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-purple-900 mb-1">Price Target</h4>
                          <p className="text-sm text-purple-700">
                            Resistance at {formatCurrency(commodity.technical.resistance)} with breakout potential
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
