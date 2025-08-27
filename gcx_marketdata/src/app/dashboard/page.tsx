'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge } from '@tremor/react';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Activity, RefreshCw, 
  Radio, Clock, Volume2, ArrowUpRight, ArrowDownRight, MapPin,
  TrendingUpIcon, TrendingDownIcon
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const { isCollapsed } = useSidebar();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Market data
  const [marketData, setMarketData] = useState({
    totalVolume: 2847,
    totalValue: 45200000,
    activeTraders: 156,
    volatility: 3.2,
    marketOpen: true
  });

  // GCX Commodity data
  const gcxCommodityData = [
    { symbol: 'GAPWM2', name: 'Maize', region: 'Greater Accra', price: 1880.00, change: 0.27, volume: 2500, grade: 'Grade 1' },
    { symbol: 'GEJWM2', name: 'Maize', region: 'Eastern', price: 4030.00, change: 1.26, volume: 1800, grade: 'Grade 1' },
    { symbol: 'GKIWM3', name: 'Maize', region: 'Ashanti', price: 3970.00, change: 0.98, volume: 2200, grade: 'Grade 2' },
    { symbol: 'GKUWM2', name: 'Maize', region: 'Northern', price: 4645.00, change: 0.22, volume: 1500, grade: 'Grade 1' },
    { symbol: 'GKUYSB3', name: 'Soya Bean', region: 'Northern', price: 7418.00, change: 0.24, volume: 800, grade: 'Grade 1' },
    { symbol: 'GTAYSB2', name: 'Soya Bean', region: 'Volta', price: 10390.00, change: 1.37, volume: 600, grade: 'Grade 1' },
    { symbol: 'GWAYSB2', name: 'Soya Bean', region: 'Upper West', price: 7418.00, change: 0.27, volume: 450, grade: 'Grade 2' },
    { symbol: 'GTAWSO3', name: 'Sorghum', region: 'Volta', price: 1550.00, change: 0.98, volume: 1200, grade: 'Grade 1' },
    { symbol: 'GSAWSS4', name: 'Sesame', region: 'Upper East', price: 3200.00, change: 0.63, volume: 300, grade: 'Grade 1' },
    { symbol: 'GBOAMSMR2', name: 'Milled Rice', region: 'Brong Ahafo', price: 11110.00, change: 0.54, volume: 500, grade: 'Grade 1' },
  ];

  // Commodity performance
  const commodityPerformance = [
    { name: 'Maize', price: 3631.25, change: 1.2, volume: 8000, color: '#10B981', trend: 'up' },
    { name: 'Soya Bean', price: 8408.67, change: 2.8, volume: 1850, color: '#3B82F6', trend: 'up' },
    { name: 'Milled Rice', price: 11110.00, change: 0.5, volume: 500, color: '#8B5CF6', trend: 'up' },
    { name: 'Sesame', price: 3200.00, change: -0.3, volume: 300, color: '#F59E0B', trend: 'down' },
    { name: 'Sorghum', price: 1550.00, change: 0.8, volume: 1200, color: '#EF4444', trend: 'up' },
  ];

  // Market depth data
  const marketDepth = {
    bids: [
      { price: 3600, quantity: 150, total: 150 },
      { price: 3595, quantity: 230, total: 380 },
      { price: 3590, quantity: 180, total: 560 },
      { price: 3585, quantity: 290, total: 850 },
      { price: 3580, quantity: 340, total: 1190 },
    ],
    asks: [
      { price: 3615, quantity: 120, total: 120 },
      { price: 3620, quantity: 200, total: 320 },
      { price: 3625, quantity: 170, total: 490 },
      { price: 3630, quantity: 250, total: 740 },
      { price: 3635, quantity: 310, total: 1050 },
    ]
  };

  // Trading activity
  const [tradingActivity, setTradingActivity] = useState([
    { id: 1, time: '14:32:15', commodity: 'MAIZE', type: 'BUY', quantity: 50, price: 3600, trader: 'Accra Trading Co.' },
    { id: 2, time: '14:31:48', commodity: 'MAIZE', type: 'SELL', quantity: 75, price: 8200, trader: 'Northern Grains Ltd.' },
    { id: 3, time: '14:31:22', commodity: 'SOYA BEAN', type: 'BUY', quantity: 25, price: 8445, trader: 'Kumasi Commodities' },
    { id: 4, time: '14:30:56', commodity: 'MILLED RICE', type: 'SELL', quantity: 100, price: 9800, trader: 'Volta Rice Mills' },
    { id: 5, time: '14:30:33', commodity: 'SORGHUM', type: 'BUY', quantity: 40, price: 6750, trader: 'Upper East Traders' },
  ]);

  // Market performance data
  const marketPerformanceData = [
    { time: '09:00', Maize: 3600, 'Soya Bean': 8200, 'Milled Rice': 11000, Sorghum: 1540, Sesame: 3180 },
    { time: '10:00', Maize: 3610, 'Soya Bean': 8250, 'Milled Rice': 11050, Sorghum: 1545, Sesame: 3190 },
    { time: '11:00', Maize: 3620, 'Soya Bean': 8300, 'Milled Rice': 11080, Sorghum: 1548, Sesame: 3195 },
    { time: '12:00', Maize: 3625, 'Soya Bean': 8350, 'Milled Rice': 11100, Sorghum: 1550, Sesame: 3200 },
    { time: '13:00', Maize: 3628, 'Soya Bean': 8380, 'Milled Rice': 11105, Sorghum: 1549, Sesame: 3198 },
    { time: '14:00', Maize: 3631, 'Soya Bean': 8409, 'Milled Rice': 11110, Sorghum: 1550, Sesame: 3200 },
  ];

  // Volume distribution
  const volumeDistribution = commodityPerformance.map(commodity => ({
    name: commodity.name,
    value: commodity.volume,
    share: ((commodity.volume / commodityPerformance.reduce((sum, c) => sum + c.volume, 0)) * 100).toFixed(1)
  }));

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      if (Math.random() > 0.7) {
        const newTrade = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          commodity: ['MAIZE', 'SOYA BEAN', 'MILLED RICE', 'SORGHUM', 'SESAME'][Math.floor(Math.random() * 5)],
          type: Math.random() > 0.5 ? 'BUY' : 'SELL',
          quantity: Math.floor(Math.random() * 100) + 10,
          price: Math.floor(Math.random() * 1000) + 5000,
          trader: ['Accra Trading Co.', 'Kumasi Commodities', 'Northern Grains Ltd.', 'Volta Rice Mills'][Math.floor(Math.random() * 4)]
        };
        
        setTradingActivity(prev => [newTrade, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

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
    return 'bg-gray-100 text-foreground border-border bg-muted';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar />
        
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
          <div className="w-full px-6 lg:px-8 py-6">
            {/* Enhanced Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Market Data Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-2 text-lg font-medium">
                    Real-time Ghana Commodity Exchange data and analytics
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-700">Market Open</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Updated: {lastUpdate.toLocaleTimeString()}</span>
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

            {/* Enhanced Market Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-100 font-medium text-sm">Total Volume</Text>
                    <Metric className="text-white font-bold text-3xl">{formatNumber(marketData.totalVolume)} tons</Metric>
                    <div className="flex items-center space-x-2 mt-3">
                      <TrendingUp className="w-4 h-4 text-blue-200" />
                      <Text className="text-blue-100 font-medium text-sm">+12.5% from yesterday</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-blue-200" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-100 font-medium text-sm">Market Value</Text>
                    <Metric className="text-white font-bold text-3xl">{formatCurrency(marketData.totalValue)}</Metric>
                    <div className="flex items-center space-x-2 mt-3">
                      <TrendingUp className="w-4 h-4 text-green-200" />
                      <Text className="text-green-100 font-medium text-sm">+5.8% from yesterday</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-200" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-purple-100 font-medium text-sm">Active Traders</Text>
                    <Metric className="text-white font-bold text-3xl">{formatNumber(marketData.activeTraders)}</Metric>
                    <div className="flex items-center space-x-2 mt-3">
                      <TrendingUp className="w-4 h-4 text-purple-200" />
                      <Text className="text-purple-100 font-medium text-sm">+8.2% from yesterday</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-400/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-200" />
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-orange-100 font-medium text-sm">Volatility</Text>
                    <Metric className="text-white font-bold text-3xl">{marketData.volatility}%</Metric>
                    <div className="flex items-center space-x-2 mt-3">
                      <TrendingDown className="w-4 h-4 text-orange-200" />
                      <Text className="text-orange-100 font-medium text-sm">-1.1% from yesterday</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-400/20 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-200" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Live Prices Table */}
              <div className="lg:col-span-2">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Title className="text-card-foreground font-bold text-xl">Live Commodity Prices</Title>
                      <Text className="text-muted-foreground font-medium">Real-time GCX trading data</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio className="w-4 h-4 text-green-500 animate-pulse" />
                      <Text className="text-sm text-green-600 font-medium">Live Updates</Text>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Commodity</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price (GHC)</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Change</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Volume</th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {gcxCommodityData.map((item, index) => (
                          <tr key={index} className="hover:bg-muted/30 transition-colors duration-200">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-card-foreground">{item.symbol}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-3`} style={{
                                  backgroundColor: commodityPerformance.find(c => c.name === item.name)?.color || '#6B7280'
                                }}></div>
                                <div className="text-sm font-medium text-card-foreground">{item.name}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                                <div className="text-sm text-card-foreground">{item.region}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge className={`text-xs border ${getGradeColor(item.grade)}`}>
                                {item.grade}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-card-foreground">{formatCurrency(item.price)}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {React.createElement(getChangeIcon(item.change), { 
                                  className: `w-4 h-4 ${getChangeColor(item.change)}` 
                                })}
                                <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-card-foreground">{formatNumber(item.volume)} tons</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Market Depth */}
              <div>
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <Title className="mb-6 text-card-foreground font-bold text-lg">Market Depth - MAIZE</Title>
                  <div className="space-y-6">
                    <div>
                      <Text className="text-sm font-medium text-red-700 dark:text-red-400 mb-3 font-semibold flex items-center">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        ASKS (Sell Orders)
                      </Text>
                      <div className="space-y-2">
                        {marketDepth.asks.slice().reverse().map((ask, index) => (
                          <div key={index} className="flex justify-between text-sm bg-red-50/50 p-3 rounded-lg border border-red-200">
                            <span className="text-red-700 font-semibold">{formatCurrency(ask.price)}</span>
                            <span className="text-muted-foreground font-medium">{ask.quantity} tons</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <Text className="text-sm font-semibold text-green-700 mb-3 flex items-center">
                        <ArrowDownRight className="w-4 h-4 mr-2" />
                        BIDS (Buy Orders)
                      </Text>
                      <div className="space-y-2">
                        {marketDepth.bids.map((bid, index) => (
                          <div key={index} className="flex justify-between text-sm bg-green-50/50 p-3 rounded-lg border border-green-200">
                            <span className="text-green-700 font-semibold">{formatCurrency(bid.price)}</span>
                            <span className="text-muted-foreground font-medium">{bid.quantity} tons</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Market Performance Chart */}
              <div className="lg:col-span-2">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Title className="text-card-foreground font-bold text-xl">Today's Market Performance</Title>
                      <Text className="text-muted-foreground font-medium">GCX Trading Session</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <Text className="text-sm text-primary font-medium">Intraday</Text>
                    </div>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={marketPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="time" 
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                          tickFormatter={(value) => `GH₵${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--popover-foreground))'
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="Maize" 
                          stackId="1" 
                          stroke="#10B981" 
                          fill="#10B981" 
                          strokeWidth={3}
                          fillOpacity={0.8}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="Soya Bean" 
                          stackId="1" 
                          stroke="#3B82F6" 
                          fill="#3B82F6" 
                          strokeWidth={3}
                          fillOpacity={0.8}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="Milled Rice" 
                          stackId="1" 
                          stroke="#8B5CF6" 
                          fill="#8B5CF6" 
                          strokeWidth={3}
                          fillOpacity={0.8}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="Sorghum" 
                          stackId="1" 
                          stroke="#EF4444" 
                          fill="#EF4444" 
                          strokeWidth={3}
                          fillOpacity={0.8}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="Sesame" 
                          stackId="1" 
                          stroke="#F59E0B" 
                          fill="#F59E0B" 
                          strokeWidth={3}
                          fillOpacity={0.8}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Commodity Summary Cards */}
              <div className="space-y-6">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <Title className="text-card-foreground mb-6 font-bold text-lg">Top Performers</Title>
                  <div className="space-y-4">
                    {commodityPerformance
                      .sort((a, b) => b.change - a.change)
                      .slice(0, 3)
                      .map((commodity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: commodity.color }}
                            ></div>
                            <span className="text-sm font-semibold text-card-foreground">{commodity.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-card-foreground">{formatCurrency(commodity.price)}</p>
                            <p className={`text-xs font-medium ${getChangeColor(commodity.change)}`}>
                              {commodity.change >= 0 ? '+' : ''}{commodity.change}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>

                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <Title className="text-card-foreground mb-6 font-bold text-lg">Volume Distribution</Title>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={volumeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        >
                          {volumeDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"][index]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--card-foreground))'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>

            {/* Trading Activity */}
            <div className="mb-8">
              <Card className="bg-card text-card-foreground border-border shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <Title className="text-card-foreground font-bold text-xl">Live Trading Activity</Title>
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-primary animate-pulse" />
                    <Text className="text-sm text-primary font-medium">Live Feed</Text>
                  </div>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {tradingActivity.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          trade.type === 'BUY' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-card-foreground">{trade.commodity}</span>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              trade.type === 'BUY' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {trade.type}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium mt-1">{trade.trader}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-card-foreground">{trade.quantity} tons</p>
                        <p className="text-xs text-muted-foreground font-medium">{formatCurrency(trade.price)}</p>
                        <p className="text-xs text-muted-foreground">{trade.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
