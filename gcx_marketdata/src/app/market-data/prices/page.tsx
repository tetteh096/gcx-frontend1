'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge, AreaChart, BarChart } from '@tremor/react';
import { 
  TrendingUp, TrendingDown, Filter, Search, Calendar, 
  MapPin, Activity, Volume2, DollarSign, RefreshCw, Radio,
  ArrowUpDown, Eye, Target, Bell, Zap, Clock, BarChart3,
  PieChart, Globe, Info, AlertTriangle, TrendingUpIcon, TrendingDownIcon,
  Star, Bookmark, Share2, Download
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Real-time GCX Commodity Price Data
const livePriceData = [
  // Maize - Multiple regions and grades
  { 
    symbol: 'GAPWM2', 
    commodity: 'Maize', 
    region: 'Greater Accra', 
    grade: 'Grade 1',
    currentPrice: 1880.00, 
    open: 1875.00, 
    high: 1885.00, 
    low: 1870.00, 
    volume: 2500, 
    change: 0.27,
    changeAmount: 5.00,
    bid: 1878.00,
    ask: 1882.00,
    spread: 4.00,
    lastUpdate: '14:30:25',
    status: 'active',
    favorite: false
  },
  { 
    symbol: 'GAPWM3', 
    commodity: 'Maize', 
    region: 'Greater Accra', 
    grade: 'Grade 2',
    currentPrice: 1240.00, 
    open: 1235.00, 
    high: 1245.00, 
    low: 1230.00, 
    volume: 1800, 
    change: 0.40,
    changeAmount: 5.00,
    bid: 1238.00,
    ask: 1242.00,
    spread: 4.00,
    lastUpdate: '14:30:22',
    status: 'active',
    favorite: false
  },
  { 
    symbol: 'GEJWM1', 
    commodity: 'Maize', 
    region: 'Eastern', 
    grade: 'Grade 1',
    currentPrice: 2622.00, 
    open: 2615.00, 
    high: 2630.00, 
    low: 2610.00, 
    volume: 1900, 
    change: 0.27,
    changeAmount: 7.00,
    bid: 2620.00,
    ask: 2624.00,
    spread: 4.00,
    lastUpdate: '14:30:18',
    status: 'active',
    favorite: true
  },
  { 
    symbol: 'GEJWM2', 
    commodity: 'Maize', 
    region: 'Eastern', 
    grade: 'Grade 2',
    currentPrice: 4030.00, 
    open: 4020.00, 
    high: 4040.00, 
    low: 4015.00, 
    volume: 3200, 
    change: 0.25,
    changeAmount: 10.00,
    bid: 4028.00,
    ask: 4032.00,
    spread: 4.00,
    lastUpdate: '14:30:15',
    status: 'active',
    favorite: false
  },
  { 
    symbol: 'GKIWM1', 
    commodity: 'Maize', 
    region: 'Ashanti', 
    grade: 'Grade 1',
    currentPrice: 1820.00, 
    open: 1815.00, 
    high: 1825.00, 
    low: 1810.00, 
    volume: 2100, 
    change: 0.28,
    changeAmount: 5.00,
    bid: 1818.00,
    ask: 1822.00,
    spread: 4.00,
    lastUpdate: '14:30:12',
    status: 'active',
    favorite: false
  },
  { 
    symbol: 'GKUWM2', 
    commodity: 'Maize', 
    region: 'Northern', 
    grade: 'Grade 1',
    currentPrice: 4645.00, 
    open: 4635.00, 
    high: 4655.00, 
    low: 4630.00, 
    volume: 1500, 
    change: 0.22,
    changeAmount: 10.00,
    bid: 4643.00,
    ask: 4647.00,
    spread: 4.00,
    lastUpdate: '14:30:08',
    status: 'active',
    favorite: false
  },
  
  // Soya Bean
  { 
    symbol: 'GKUYSB3', 
    commodity: 'Soya Bean', 
    region: 'Northern', 
    grade: 'Grade 1',
    currentPrice: 7418.00, 
    open: 7400.00, 
    high: 7430.00, 
    low: 7395.00, 
    volume: 800, 
    change: 0.24,
    changeAmount: 18.00,
    bid: 7416.00,
    ask: 7420.00,
    spread: 4.00,
    lastUpdate: '14:30:05',
    status: 'active',
    favorite: true
  },
  { 
    symbol: 'GTAYSB1', 
    commodity: 'Soya Bean', 
    region: 'Volta', 
    grade: 'Grade 2',
    currentPrice: 2800.00, 
    open: 2790.00, 
    high: 2810.00, 
    low: 2785.00, 
    volume: 450, 
    change: 0.36,
    changeAmount: 10.00,
    bid: 2798.00,
    ask: 2802.00,
    spread: 4.00,
    lastUpdate: '14:30:02',
    status: 'active',
    favorite: false
  },
  
  // Sorghum
  { 
    symbol: 'GTAWSO3', 
    commodity: 'Sorghum', 
    region: 'Volta', 
    grade: 'Grade 1',
    currentPrice: 1550.00, 
    open: 1545.00, 
    high: 1555.00, 
    low: 1540.00, 
    volume: 1200, 
    change: 0.32,
    changeAmount: 5.00,
    bid: 1548.00,
    ask: 1552.00,
    spread: 4.00,
    lastUpdate: '14:29:58',
    status: 'active',
    favorite: false
  },
  
  // Sesame
  { 
    symbol: 'GSAWSS4', 
    commodity: 'Sesame', 
    region: 'Upper East', 
    grade: 'Grade 1',
    currentPrice: 3200.00, 
    open: 3190.00, 
    high: 3210.00, 
    low: 3185.00, 
    volume: 300, 
    change: 0.31,
    changeAmount: 10.00,
    bid: 3198.00,
    ask: 3202.00,
    spread: 4.00,
    lastUpdate: '14:29:55',
    status: 'active',
    favorite: false
  },
  
  // Milled Rice
  { 
    symbol: 'GBOAMSMR2', 
    commodity: 'Milled Rice', 
    region: 'Brong Ahafo', 
    grade: 'Premium Long Grain',
    currentPrice: 11110.00, 
    open: 11090.00, 
    high: 11125.00, 
    low: 11085.00, 
    volume: 500, 
    change: 0.18,
    changeAmount: 20.00,
    bid: 11108.00,
    ask: 11112.00,
    spread: 4.00,
    lastUpdate: '14:29:52',
    status: 'active',
    favorite: true
  }
];

export default function LivePricesPage() {
  const { isCollapsed } = useSidebar();
  const [prices, setPrices] = useState(livePriceData);
  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const commodities = ['All', ...Array.from(new Set(prices.map(item => item.commodity)))];
  const regions = ['All', ...Array.from(new Set(prices.map(item => item.region)))];
  const grades = ['All', ...Array.from(new Set(prices.map(item => item.grade)))];

  // Filter data based on selections
  const filteredPrices = prices.filter(item => {
    const commodityMatch = selectedCommodity === 'All' || item.commodity === selectedCommodity;
    const regionMatch = selectedRegion === 'All' || item.region === selectedRegion;
    const gradeMatch = selectedGrade === 'All' || item.grade === selectedGrade;
    return commodityMatch && regionMatch && gradeMatch;
  });

  // Sort data
  const sortedPrices = [...filteredPrices].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a];
    let bValue: any = b[sortBy as keyof typeof b];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
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

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUpIcon : TrendingDownIcon;
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1') || grade.includes('Premium')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (grade.includes('2')) return 'bg-green-100 text-green-800 border-green-200';
    if (grade.includes('3')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (grade.includes('4')) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Market summary data
  const marketSummary = {
    totalSymbols: prices.length,
    totalVolume: prices.reduce((sum, item) => sum + item.volume, 0),
    avgPrice: prices.reduce((sum, item) => sum + item.currentPrice, 0) / prices.length,
    activeSymbols: prices.filter(item => item.status === 'active').length,
    topGainers: prices.filter(item => item.change > 0).length,
    topLosers: prices.filter(item => item.change < 0).length
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          <Sidebar />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
            <div className="w-full px-6 lg:px-8 py-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Live Prices</h1>
                    <p className="text-muted-foreground mt-1 font-medium">Real-time commodity prices and market data</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">Live Data</span>
                    </div>
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="text-sm font-medium">Refresh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Market Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-blue-100 font-medium">Active Symbols</Text>
                      <Metric className="text-white font-bold text-2xl">{marketSummary.activeSymbols}</Metric>
                      <Text className="text-white font-medium">Trading Now</Text>
                    </div>
                    <BarChart3 className="w-10 h-10 text-blue-200" />
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-green-100 font-medium">Total Volume</Text>
                      <Metric className="text-white font-bold text-2xl">
                        {formatNumber(marketSummary.totalVolume)} tons
                      </Metric>
                      <Text className="text-white font-medium">Today's Trading</Text>
                    </div>
                    <Volume2 className="w-10 h-10 text-green-200" />
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-purple-100 font-medium">Avg Price</Text>
                      <Metric className="text-white font-bold text-2xl">
                        {formatCurrency(marketSummary.avgPrice)}
                      </Metric>
                      <Text className="text-white font-medium">Market Average</Text>
                    </div>
                    <DollarSign className="w-10 h-10 text-purple-200" />
                  </div>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-orange-100 font-medium">Market Sentiment</Text>
                      <Metric className="text-white font-bold text-2xl">
                        {marketSummary.topGainers > marketSummary.topLosers ? 'Bullish' : 'Bearish'}
                      </Metric>
                      <Text className="text-white font-medium">
                        {marketSummary.topGainers}↑ {marketSummary.topLosers}↓
                      </Text>
                    </div>
                    <TrendingUp className="w-10 h-10 text-orange-200" />
                  </div>
                </Card>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <Text className="text-card-foreground font-medium">Filters:</Text>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Text className="text-muted-foreground">Commodity:</Text>
                      <select
                        value={selectedCommodity}
                        onChange={(e) => setSelectedCommodity(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                      >
                        {commodities.map(commodity => (
                          <option key={commodity} value={commodity}>{commodity}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Text className="text-muted-foreground">Region:</Text>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Text className="text-muted-foreground">Grade:</Text>
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                      >
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Live Prices Table */}
              <div className="mb-6">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Title className="text-card-foreground font-bold">Live Commodity Prices</Title>
                      <Text className="text-muted-foreground font-medium">
                        Real-time pricing for {filteredPrices.length} active symbols
                      </Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio className="w-4 h-4 text-green-500 animate-pulse" />
                      <Text className="text-green-600 dark:text-green-400 text-sm">Live Updates</Text>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('symbol')}>
                            <div className="flex items-center space-x-1">
                              <span>Symbol</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('commodity')}>
                            <div className="flex items-center space-x-1">
                              <span>Commodity</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('region')}>
                            <div className="flex items-center space-x-1">
                              <span>Region</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('grade')}>
                            <div className="flex items-center space-x-1">
                              <span>Grade</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('currentPrice')}>
                            <div className="flex items-center space-x-1">
                              <span>Current Price</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('change')}>
                            <div className="flex items-center space-x-1">
                              <span>Change</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('volume')}>
                            <div className="flex items-center space-x-1">
                              <span>Volume</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('bid')}>
                            <div className="flex items-center space-x-1">
                              <span>Bid/Ask</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors" onClick={() => handleSort('lastUpdate')}>
                            <div className="flex items-center space-x-1">
                              <span>Last Update</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </div>
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {sortedPrices.map((item, index) => (
                          <tr key={index} className="hover:bg-muted/30 transition-colors duration-200">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-card-foreground">{item.symbol}</div>
                                {favorites.includes(item.symbol) && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-card-foreground">{item.commodity}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                                <div className="text-sm text-card-foreground font-medium">{item.region}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge className={`text-xs border ${getGradeColor(item.grade)}`}>
                                {item.grade}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-card-foreground">{formatCurrency(item.currentPrice)}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {React.createElement(getChangeIcon(item.change), { 
                                  className: `w-4 h-4 ${getChangeColor(item.change)}` 
                                })}
                                <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                                </div>
                                <div className={`text-xs ${getChangeColor(item.change)}`}>
                                  ({item.changeAmount >= 0 ? '+' : ''}{formatCurrency(item.changeAmount)})
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-card-foreground">{formatNumber(item.volume)} tons</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-xs">
                                <div className="text-green-600 dark:text-green-400 font-medium">{formatCurrency(item.bid)}</div>
                                <div className="text-red-600 dark:text-red-400 font-medium">{formatCurrency(item.ask)}</div>
                                <div className="text-muted-foreground">Spread: {formatCurrency(item.spread)}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-xs text-muted-foreground">{item.lastUpdate}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => toggleFavorite(item.symbol)}
                                  className="p-1 text-muted-foreground hover:text-yellow-500 transition-colors"
                                  title={favorites.includes(item.symbol) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                  <Star className={`w-4 h-4 ${favorites.includes(item.symbol) ? 'text-yellow-500 fill-current' : ''}`} />
                                </button>
                                <button className="p-1 text-muted-foreground hover:text-primary transition-colors" title="View details">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-muted-foreground hover:text-green-500 transition-colors" title="Set alert">
                                  <Bell className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-muted-foreground hover:text-purple-500 transition-colors" title="Share">
                                  <Share2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Market Activity Summary */}
              <div className="mb-6">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <Title className="text-card-foreground font-bold mb-4">Market Activity Summary</Title>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Text className="text-card-foreground font-medium mb-2">Top Gainers</Text>
                      <div className="space-y-2">
                        {sortedPrices
                          .filter(item => item.change > 0)
                          .sort((a, b) => b.change - a.change)
                          .slice(0, 3)
                          .map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <span className="text-sm font-medium text-card-foreground">{item.symbol}</span>
                              <span className="text-sm font-bold text-green-600 dark:text-green-400">+{item.change.toFixed(2)}%</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <Text className="text-card-foreground font-medium mb-2">Top Losers</Text>
                      <div className="space-y-2">
                        {sortedPrices
                          .filter(item => item.change < 0)
                          .sort((a, b) => a.change - b.change)
                          .slice(0, 3)
                          .map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <span className="text-sm font-medium text-card-foreground">{item.symbol}</span>
                              <span className="text-sm font-bold text-red-600 dark:text-red-400">{item.change.toFixed(2)}%</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <Text className="text-card-foreground font-medium mb-2">Highest Volume</Text>
                      <div className="space-y-2">
                        {sortedPrices
                          .sort((a, b) => b.volume - a.volume)
                          .slice(0, 3)
                          .map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <span className="text-sm font-medium text-card-foreground">{item.symbol}</span>
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatNumber(item.volume)} tons</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}


