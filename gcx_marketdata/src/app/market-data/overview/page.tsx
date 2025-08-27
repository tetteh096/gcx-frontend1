'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge, AreaChart, BarChart, DonutChart, LineChart } from '@tremor/react';
import { 
  TrendingUp, TrendingDown, Filter, Search, Calendar, 
  MapPin, Activity, Volume2, DollarSign, RefreshCw, Radio,
  ArrowUpDown, Eye, Target, Bell, Zap, Clock, BarChart3,
  PieChart, Globe, Info, AlertTriangle, TrendingUpIcon, TrendingDownIcon,
  Users, Building2, Truck, Factory, Leaf, Wheat, Coffee, Grain, Download
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Market Overview Data
const marketData = {
  summary: {
    totalCommodities: 15,
    activeSymbols: 23,
    totalVolume: 12500,
    totalValue: 45600000,
    marketCap: 89000000,
    activeTraders: 156,
    marketSentiment: 'Bullish',
    volatilityIndex: 2.8
  },
  sectorPerformance: [
    { sector: 'Grains', change: 2.4, volume: 6800, value: 24500000, commodities: ['Maize', 'Rice', 'Sorghum'] },
    { sector: 'Oilseeds', change: 1.8, volume: 3200, value: 12500000, commodities: ['Soya Bean', 'Groundnut'] },
    { sector: 'Cash Crops', change: 0.9, volume: 1500, value: 5600000, commodities: ['Cocoa', 'Coffee'] },
    { sector: 'Livestock', change: -0.5, volume: 1000, value: 3000000, commodities: ['Poultry', 'Cattle'] }
  ],
  topMovers: [
    { symbol: 'GAPWM2', commodity: 'Maize', change: 3.2, volume: 2500, price: 1880 },
    { symbol: 'GKUYSB3', commodity: 'Soya Bean', change: 2.8, volume: 800, price: 7418 },
    { symbol: 'GTAWSO3', commodity: 'Sorghum', change: 2.1, volume: 1200, price: 1550 },
    { symbol: 'GSAWSS4', commodity: 'Sesame', change: 1.9, volume: 300, price: 3200 },
    { symbol: 'GBOAMSMR2', commodity: 'Milled Rice', change: 1.5, volume: 500, price: 11110 }
  ],
  regionalActivity: [
    { region: 'Greater Accra', volume: 4500, change: 2.1, commodities: 8 },
    { region: 'Eastern', volume: 3800, change: 1.8, commodities: 6 },
    { region: 'Ashanti', volume: 2900, change: 1.5, commodities: 5 },
    { region: 'Northern', volume: 1300, change: 0.9, commodities: 4 }
  ],
  marketTrends: [
    { period: '09:00', grains: 2450, oilseeds: 12500, cashCrops: 5600, livestock: 3000 },
    { period: '10:00', grains: 2480, oilseeds: 12600, cashCrops: 5620, livestock: 3010 },
    { period: '11:00', grains: 2510, oilseeds: 12700, cashCrops: 5640, livestock: 3020 },
    { period: '12:00', grains: 2540, oilseeds: 12800, cashCrops: 5660, livestock: 3030 },
    { period: '13:00', grains: 2570, oilseeds: 12900, cashCrops: 5680, livestock: 3040 },
    { period: '14:00', grains: 2600, oilseeds: 13000, cashCrops: 5700, livestock: 3050 }
  ],
  news: [
    { title: 'Strong Harvest Season Boosts Maize Supply', impact: 'positive', category: 'Supply', time: '2 hours ago' },
    { title: 'Export Demand Drives Soya Bean Prices Higher', impact: 'positive', category: 'Demand', time: '4 hours ago' },
    { title: 'Weather Concerns Affect Northern Region Crops', impact: 'negative', category: 'Weather', time: '6 hours ago' },
    { title: 'New Trading Regulations Announced by GCX', impact: 'neutral', category: 'Regulation', time: '8 hours ago' }
  ]
};

export default function MarketOverviewPage() {
  const { isCollapsed } = useSidebar();
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'bullish': return 'text-green-600';
      case 'bearish': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'bullish': return 'green';
      case 'bearish': return 'red';
      default: return 'yellow';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

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
                  <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
                  <p className="text-gray-700 mt-1 font-medium">Comprehensive market summary and sector performance</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Live Market</span>
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

            {/* Market Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-100 font-medium">Market Cap</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(marketData.summary.marketCap)}
                    </Metric>
                    <Text className="text-white font-medium">Total Value</Text>
                  </div>
                  <Building2 className="w-10 h-10 text-blue-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-100 font-medium">Trading Volume</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatNumber(marketData.summary.totalVolume)} tons
                    </Metric>
                    <Text className="text-white font-medium">Today's Activity</Text>
                  </div>
                  <Volume2 className="w-10 h-10 text-green-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-purple-100 font-medium">Active Traders</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {marketData.summary.activeTraders}
                    </Metric>
                    <Text className="text-white font-medium">Online Now</Text>
                  </div>
                  <Users className="w-10 h-10 text-purple-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-orange-100 font-medium">Market Sentiment</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {marketData.summary.marketSentiment}
                    </Metric>
                    <Text className="text-white font-medium">Current Mood</Text>
                  </div>
                  <TrendingUp className="w-10 h-10 text-orange-200" />
                </div>
              </Card>
            </div>

            {/* Sector Performance */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Sector Performance</Title>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <DonutChart
                      data={marketData.sectorPerformance}
                      category="value"
                      index="sector"
                      valueFormatter={(value) => formatCurrency(value)}
                      colors={["blue", "green", "yellow", "red"]}
                      className="h-64"
                    />
                  </div>
                  <div className="space-y-4">
                    {marketData.sectorPerformance.map((sector, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <h4 className="font-semibold text-gray-900">{sector.sector}</h4>
                          </div>
                          <div className={`text-sm font-bold ${getChangeColor(sector.change)}`}>
                            {sector.change >= 0 ? '+' : ''}{sector.change}%
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Volume:</span>
                            <span className="ml-2 font-medium">{formatNumber(sector.volume)} tons</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Value:</span>
                            <span className="ml-2 font-medium">{formatCurrency(sector.value)}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-600 text-sm">Commodities: </span>
                          <span className="text-sm font-medium">{sector.commodities.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Market Trends Chart */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Market Trends - Today</Title>
                <LineChart
                  data={marketData.marketTrends}
                  index="period"
                  categories={["grains", "oilseeds", "cashCrops", "livestock"]}
                  colors={["blue", "green", "yellow", "red"]}
                  valueFormatter={(value) => formatCurrency(value)}
                  className="h-80"
                />
              </Card>
            </div>

            {/* Top Movers & Regional Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Top Movers */}
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Top Movers</Title>
                <div className="space-y-3">
                  {marketData.topMovers.map((mover, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{mover.symbol}</div>
                          <div className="text-sm text-gray-600">{mover.commodity}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(mover.price)}</div>
                        <div className={`text-sm font-medium ${getChangeColor(mover.change)}`}>
                          {mover.change >= 0 ? '+' : ''}{mover.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Regional Activity */}
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Regional Trading Activity</Title>
                <div className="space-y-3">
                  {marketData.regionalActivity.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{region.region}</div>
                          <div className="text-sm text-gray-600">{region.commodities} commodities</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatNumber(region.volume)} tons</div>
                        <div className={`text-sm font-medium ${getChangeColor(region.change)}`}>
                          {region.change >= 0 ? '+' : ''}{region.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Market News & Insights */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Market News & Insights</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketData.news.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          color={item.impact === 'positive' ? 'green' : item.impact === 'negative' ? 'red' : 'yellow'}
                          className="text-xs"
                        >
                          {item.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.impact === 'positive' ? 'bg-green-500' : 
                          item.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          item.impact === 'positive' ? 'text-green-600' : 
                          item.impact === 'negative' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Market Statistics */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Market Statistics</Title>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{marketData.summary.totalCommodities}</div>
                    <div className="text-blue-700 font-medium">Total Commodities</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">{marketData.summary.activeSymbols}</div>
                    <div className="text-green-700 font-medium">Active Symbols</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-purple-900">{marketData.summary.volatilityIndex}%</div>
                    <div className="text-purple-700 font-medium">Volatility Index</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <Card>
                <Title className="text-gray-900 font-bold mb-4">Quick Actions</Title>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-blue-900">View Charts</span>
                    </div>
                  </button>
                  
                  <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                    <div className="text-center">
                      <Bell className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-green-900">Set Alerts</span>
                    </div>
                  </button>
                  
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                    <div className="text-center">
                      <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-purple-900">Export Data</span>
                    </div>
                  </button>
                  
                  <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
                    <div className="text-center">
                      <Info className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-orange-900">Market Report</span>
                    </div>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
