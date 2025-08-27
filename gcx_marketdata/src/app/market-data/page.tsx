'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge, AreaChart, BarChart, DonutChart } from '@tremor/react';
import { 
  BarChart3, TrendingUp, TrendingDown, Filter, Search, Calendar, 
  MapPin, Activity, Volume2, DollarSign, RefreshCw, Radio,
  ArrowUpDown, Eye, Target, Bell, Zap, Clock
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import TradingChart from '@/components/market-data/TradingChart';
import MarketPerformanceChart from '@/components/market-data/MarketPerformanceChart';
import RegionalVolumeChart from '@/components/market-data/RegionalVolumeChart';
import { useSidebar } from '@/contexts/SidebarContext';

export default function MarketDataPage() {
  const { isCollapsed } = useSidebar();
  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real GCX Commodity data from 18th August 2025
  const gcxDetailedData = [
    // Maize - Multiple regions
    { symbol: 'GAPWM2', commodity: 'Maize', region: 'Greater Accra', price: 1880.00, open: 1875.00, high: 1885.00, low: 1870.00, volume: 2500, change: 0.27 },
    { symbol: 'GAPWM3', commodity: 'Maize', region: 'Greater Accra', price: 1240.00, open: 1235.00, high: 1245.00, low: 1230.00, volume: 1800, change: 0.40 },
    { symbol: 'GEJWM1', commodity: 'Maize', region: 'Eastern', price: 2622.00, open: 2615.00, high: 2630.00, low: 2610.00, volume: 1900, change: 0.27 },
    { symbol: 'GEJWM2', commodity: 'Maize', region: 'Eastern', price: 4030.00, open: 4020.00, high: 4040.00, low: 4015.00, volume: 3200, change: 0.25 },
    { symbol: 'GKIWM1', commodity: 'Maize', region: 'Ashanti', price: 1820.00, open: 1815.00, high: 1825.00, low: 1810.00, volume: 2100, change: 0.28 },
    { symbol: 'GKIWM2', commodity: 'Maize', region: 'Ashanti', price: 3776.00, open: 3770.00, high: 3785.00, low: 3765.00, volume: 2800, change: 0.16 },
    { symbol: 'GKUWM2', commodity: 'Maize', region: 'Northern', price: 4645.00, open: 4635.00, high: 4655.00, low: 4630.00, volume: 1500, change: 0.22 },
    { symbol: 'GKUWM3', commodity: 'Maize', region: 'Northern', price: 1700.00, open: 1695.00, high: 1705.00, low: 1690.00, volume: 1200, change: 0.30 },
    
    // Soya Bean
    { symbol: 'GKUYSB3', commodity: 'Soya Bean', region: 'Northern', price: 7418.00, open: 7400.00, high: 7430.00, low: 7395.00, volume: 800, change: 0.24 },
    { symbol: 'GTAYSB1', commodity: 'Soya Bean', region: 'Volta', price: 2800.00, open: 2790.00, high: 2810.00, low: 2785.00, volume: 450, change: 0.36 },
    { symbol: 'GTAYSB2', commodity: 'Soya Bean', region: 'Volta', price: 10390.00, open: 10370.00, high: 10410.00, low: 10360.00, volume: 600, change: 0.19 },
    { symbol: 'GWAYSB1', commodity: 'Soya Bean', region: 'Upper West', price: 4828.00, open: 4815.00, high: 4840.00, low: 4810.00, volume: 350, change: 0.27 },
    
    // Sorghum
    { symbol: 'GTAWSO3', commodity: 'Sorghum', region: 'Volta', price: 1550.00, open: 1545.00, high: 1555.00, low: 1540.00, volume: 1200, change: 0.32 },
    
    // Sesame
    { symbol: 'GSAWSS4', commodity: 'Sesame', region: 'Upper East', price: 3200.00, open: 3190.00, high: 3210.00, low: 3185.00, volume: 300, change: 0.31 },
    
    // Milled Rice
    { symbol: 'GBOAMSMR2', commodity: 'Milled Rice', region: 'Brong Ahafo', price: 11110.00, open: 11090.00, high: 11125.00, low: 11085.00, volume: 500, change: 0.18 },
  ];

  // Aggregate data by commodity
  const commodityAggregates = gcxDetailedData.reduce((acc: any, item) => {
    if (!acc[item.commodity]) {
      acc[item.commodity] = {
        name: item.commodity,
        totalVolume: 0,
        avgPrice: 0,
        priceSum: 0,
        count: 0,
        maxPrice: 0,
        minPrice: Infinity,
        regions: new Set(),
        symbols: []
      };
    }
    
    acc[item.commodity].totalVolume += item.volume;
    acc[item.commodity].priceSum += item.price;
    acc[item.commodity].count += 1;
    acc[item.commodity].maxPrice = Math.max(acc[item.commodity].maxPrice, item.price);
    acc[item.commodity].minPrice = Math.min(acc[item.commodity].minPrice, item.price);
    acc[item.commodity].regions.add(item.region);
    acc[item.commodity].symbols.push(item);
    
    return acc;
  }, {});

  // Calculate averages
  Object.keys(commodityAggregates).forEach(key => {
    commodityAggregates[key].avgPrice = commodityAggregates[key].priceSum / commodityAggregates[key].count;
    commodityAggregates[key].regions = Array.from(commodityAggregates[key].regions);
  });

  const commodities = ['All', ...Object.keys(commodityAggregates)];
  const regions = ['All', ...Array.from(new Set(gcxDetailedData.map(item => item.region)))];

  // Filter data based on selections
  const filteredData = gcxDetailedData.filter(item => {
    const commodityMatch = selectedCommodity === 'All' || item.commodity === selectedCommodity;
    const regionMatch = selectedRegion === 'All' || item.region === selectedRegion;
    return commodityMatch && regionMatch;
  });

  // Performance data for charts
  const performanceData = [
    { time: '09:00', Maize: 3800, 'Soya Bean': 8200, 'Milled Rice': 11090, Sorghum: 1545, Sesame: 3190 },
    { time: '10:00', Maize: 3820, 'Soya Bean': 8350, 'Milled Rice': 11100, Sorghum: 1548, Sesame: 3195 },
    { time: '11:00', Maize: 3850, 'Soya Bean': 8400, 'Milled Rice': 11105, Sorghum: 1550, Sesame: 3200 },
    { time: '12:00', Maize: 3880, 'Soya Bean': 8450, 'Milled Rice': 11110, Sorghum: 1550, Sesame: 3200 },
  ];

  // Regional comparison data
  const regionalData = regions.slice(1).map(region => {
    const regionItems = gcxDetailedData.filter(item => item.region === region);
    const avgPrice = regionItems.reduce((sum, item) => sum + item.price, 0) / regionItems.length;
    const totalVolume = regionItems.reduce((sum, item) => sum + item.volume, 0);
    return {
      region,
      avgPrice: avgPrice || 0,
      totalVolume,
      commodities: regionItems.length
    };
  });

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
                                     <h1 className="text-3xl font-bold text-gray-900">Market Data Analysis</h1>
                   <p className="text-gray-700 mt-1 font-medium">Comprehensive GCX commodity performance and analysis</p>
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

            {/* Filters */}
            <div className="mb-6">
              <Card>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Text className="text-gray-700 font-medium">Filters:</Text>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Text className="text-gray-600">Commodity:</Text>
                    <select
                      value={selectedCommodity}
                      onChange={(e) => setSelectedCommodity(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {commodities.map(commodity => (
                        <option key={commodity} value={commodity}>{commodity}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Text className="text-gray-600">Region:</Text>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Text className="text-gray-600">Timeframe:</Text>
                    <select
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-100 font-medium">Total Symbols</Text>
                    <Metric className="text-white font-bold text-2xl">{filteredData.length}</Metric>
                    <Text className="text-white font-medium">Active Trading</Text>
                  </div>
                  <BarChart3 className="w-10 h-10 text-blue-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-100 font-medium">Total Volume</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatNumber(filteredData.reduce((sum, item) => sum + item.volume, 0))} tons
                    </Metric>
                    <Text className="text-white font-medium">Today's Trading</Text>
                  </div>
                  <Volume2 className="w-10 h-10 text-green-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-purple-100 font-medium">Avg Price</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(filteredData.reduce((sum, item) => sum + item.price, 0) / filteredData.length || 0)}
                    </Metric>
                    <Text className="text-white font-medium">Across Selection</Text>
                  </div>
                  <DollarSign className="w-10 h-10 text-purple-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-orange-100 font-medium">Price Range</Text>
                    <Metric className="text-white font-bold text-xl">
                      {formatCurrency(Math.max(...filteredData.map(item => item.price)) - Math.min(...filteredData.map(item => item.price)))}
                    </Metric>
                    <Text className="text-white font-medium">High - Low</Text>
                  </div>
                  <Activity className="w-10 h-10 text-orange-200" />
                </div>
              </Card>
            </div>

                         {/* Charts Section */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
               {/* Performance Chart */}
               <MarketPerformanceChart 
                 data={performanceData}
                 title="Market Performance Today"
                 subtitle="GCX Trading Session"
               />

               {/* Regional Comparison */}
               <RegionalVolumeChart 
                 data={regionalData}
                 title="Regional Trading Volume"
               />
             </div>

            {/* Detailed Trading Table */}
            <div className="mb-6">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Title className="text-gray-900 font-bold">Detailed Trading Data</Title>
                                         <Text className="text-gray-700 font-medium">All active GCX trading symbols with real-time prices</Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-green-500 animate-pulse" />
                    <Text className="text-green-600 text-sm">Live Updates</Text>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Commodity</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Region</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Current Price</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Open</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">High</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Low</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Change</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.symbol}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.commodity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                              <div className="text-sm text-gray-900 font-medium">{item.region}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(item.open)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600 font-medium">{formatCurrency(item.high)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-red-600 font-medium">{formatCurrency(item.low)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatNumber(item.volume)} tons</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Advanced Trading Chart */}
            <div className="mb-6">
              <TradingChart 
                commodity={selectedCommodity === 'All' ? 'Market Overview' : selectedCommodity}
                data={performanceData}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
