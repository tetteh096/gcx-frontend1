'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge, AreaChart, BarChart, DonutChart } from '@tremor/react';
import { 
  TrendingUp, TrendingDown, Filter, Search, Calendar, 
  MapPin, Activity, Volume2, DollarSign, RefreshCw, Radio,
  ArrowUpDown, Eye, Target, Bell, Zap, Clock, BarChart3,
  PieChart, Globe, Info, AlertTriangle, TrendingUpIcon, TrendingDownIcon,
  Plus, Minus, DollarSign as DollarIcon, Briefcase, FileText, Shield
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Trading Data
const tradingData = {
  portfolio: {
    totalValue: 1250000,
    totalPnl: 45000,
    pnlPercent: 3.7,
    totalPositions: 8,
    marginUsed: 250000,
    availableBalance: 1000000,
    riskLevel: 'Moderate'
  },
  positions: [
    { 
      symbol: 'GAPWM2', 
      commodity: 'Maize', 
      quantity: 1000, 
      avgPrice: 1850, 
      currentPrice: 1880, 
      pnl: 30000, 
      pnlPercent: 1.62, 
      type: 'Long',
      region: 'Greater Accra'
    },
    { 
      symbol: 'GKUYSB3', 
      commodity: 'Soya Bean', 
      quantity: 500, 
      avgPrice: 7300, 
      currentPrice: 7418, 
      pnl: 59000, 
      pnlPercent: 1.62, 
      type: 'Long',
      region: 'Northern'
    },
    { 
      symbol: 'GTAWSO3', 
      commodity: 'Sorghum', 
      quantity: 800, 
      avgPrice: 1500, 
      currentPrice: 1550, 
      pnl: 40000, 
      pnlPercent: 2.67, 
      type: 'Long',
      region: 'Volta'
    },
    { 
      symbol: 'GBOAMSMR2', 
      commodity: 'Milled Rice', 
      quantity: 300, 
      avgPrice: 11000, 
      currentPrice: 11110, 
      pnl: 33000, 
      pnlPercent: 1.00, 
      type: 'Long',
      region: 'Brong Ahafo'
    }
  ],
  orders: [
    { 
      id: 'ORD001', 
      symbol: 'GAPWM2', 
      type: 'Buy', 
      quantity: 500, 
      price: 1890, 
      status: 'Pending', 
      time: '14:25:30',
      region: 'Greater Accra'
    },
    { 
      id: 'ORD002', 
      symbol: 'GKUYSB3', 
      type: 'Sell', 
      quantity: 200, 
      price: 7450, 
      status: 'Filled', 
      time: '14:20:15',
      region: 'Northern'
    },
    { 
      id: 'ORD003', 
      symbol: 'GTAWSO3', 
      type: 'Buy', 
      quantity: 400, 
      price: 1560, 
      status: 'Cancelled', 
      time: '14:15:45',
      region: 'Volta'
    }
  ],
  watchlist: [
    { symbol: 'GAPWM3', commodity: 'Maize', price: 1240, change: 0.40, volume: 1800 },
    { symbol: 'GEJWM1', commodity: 'Maize', price: 2622, change: 0.27, volume: 1900 },
    { symbol: 'GTAYSB1', commodity: 'Soya Bean', price: 2800, change: 0.36, volume: 450 }
  ],
  performance: [
    { date: '2025-08-01', value: 1200000, pnl: 0 },
    { date: '2025-08-02', value: 1210000, pnl: 10000 },
    { date: '2025-08-03', value: 1220000, pnl: 20000 },
    { date: '2025-08-04', value: 1230000, pnl: 30000 },
    { date: '2025-08-05', value: 1240000, pnl: 40000 },
    { date: '2025-08-06', value: 1250000, pnl: 45000 }
  ]
};

export default function TradingPage() {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('portfolio');
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

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filled': return 'green';
      case 'pending': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getPositionTypeColor = (type: string) => {
    return type === 'Long' ? 'green' : 'red';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const tabs = [
    { id: 'portfolio', name: 'Portfolio', icon: Briefcase },
    { id: 'orders', name: 'Orders', icon: FileText },
    { id: 'watchlist', name: 'Watchlist', icon: Eye },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

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
                  <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
                  <p className="text-gray-700 mt-1 font-medium">Manage your portfolio and trading activities</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Live Trading</span>
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

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-100 font-medium">Portfolio Value</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(tradingData.portfolio.totalValue)}
                    </Metric>
                    <Text className="text-white font-medium">Total Assets</Text>
                  </div>
                  <Briefcase className="w-10 h-10 text-blue-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-100 font-medium">Total P&L</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(tradingData.portfolio.totalPnl)}
                    </Metric>
                    <div className="flex items-center space-x-2 mt-1">
                      {React.createElement(getChangeIcon(tradingData.portfolio.pnlPercent), { 
                        className: `w-4 h-4 ${getChangeColor(tradingData.portfolio.pnlPercent)}` 
                      })}
                      <span className={`text-sm font-medium ${getChangeColor(tradingData.portfolio.pnlPercent)}`}>
                        {tradingData.portfolio.pnlPercent >= 0 ? '+' : ''}{tradingData.portfolio.pnlPercent}%
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-purple-100 font-medium">Available Balance</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(tradingData.portfolio.availableBalance)}
                    </Metric>
                    <Text className="text-white font-medium">For Trading</Text>
                  </div>
                  <DollarIcon className="w-10 h-10 text-purple-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-orange-100 font-medium">Risk Level</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {tradingData.portfolio.riskLevel}
                    </Metric>
                    <Text className="text-white font-medium">Portfolio Risk</Text>
                  </div>
                  <Shield className="w-10 h-10 text-orange-200" />
                </div>
              </Card>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6">
              <Card>
                <div className="flex space-x-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Tab Content */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {/* Portfolio Performance Chart */}
                <Card>
                  <Title className="text-gray-900 font-bold mb-4">Portfolio Performance</Title>
                  <AreaChart
                    data={tradingData.performance}
                    index="date"
                    categories={["value"]}
                    colors={["blue"]}
                    valueFormatter={(value) => formatCurrency(value)}
                    showLegend={false}
                    className="h-64"
                  />
                </Card>

                {/* Active Positions */}
                <Card>
                  <Title className="text-gray-900 font-bold mb-4">Active Positions</Title>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Commodity</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Avg Price</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Current Price</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">P&L</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tradingData.positions.map((position, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">{position.symbol}</div>
                              <div className="text-xs text-gray-500">{position.region}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{position.commodity}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge color={getPositionTypeColor(position.type) as any} className="text-xs">
                                {position.type}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatNumber(position.quantity)} tons</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatCurrency(position.avgPrice)}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">{formatCurrency(position.currentPrice)}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className={`text-sm font-bold ${getChangeColor(position.pnl)}`}>
                                {formatCurrency(position.pnl)}
                              </div>
                              <div className={`text-xs ${getChangeColor(position.pnlPercent)}`}>
                                {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="Close Position">
                                  <Minus className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-green-500 transition-colors" title="Add to Position">
                                  <Plus className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-purple-500 transition-colors" title="View Details">
                                  <Eye className="w-4 h-4" />
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
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <Title className="text-gray-900 font-bold">Order Management</Title>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Place New Order
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tradingData.orders.map((order, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">{order.id}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{order.symbol}</div>
                              <div className="text-xs text-gray-500">{order.region}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge color={order.type === 'Buy' ? 'green' : 'red'} className="text-xs">
                                {order.type}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatNumber(order.quantity)} tons</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">{formatCurrency(order.price)}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge color={getOrderStatusColor(order.status) as any} className="text-xs">
                                {order.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{order.time}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {order.status === 'Pending' && (
                                  <>
                                    <button className="p-1 text-gray-400 hover:text-green-500 transition-colors" title="Modify">
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Cancel">
                                      <Minus className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="View Details">
                                  <Info className="w-4 h-4" />
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
            )}

            {activeTab === 'watchlist' && (
              <div className="space-y-6">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <Title className="text-gray-900 font-bold">Watchlist</Title>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Symbol
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tradingData.watchlist.map((item, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-gray-900">{item.symbol}</div>
                            <div className="text-sm text-gray-600">{item.commodity}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{formatCurrency(item.price)}</div>
                            <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                              {item.change >= 0 ? '+' : ''}{item.change}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Volume: {formatNumber(item.volume)} tons</span>
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title="Place Order">
                              <Plus className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                              <Minus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Portfolio Allocation */}
                  <Card>
                    <Title className="text-foreground font-bold mb-4">Portfolio Allocation</Title>
                    <DonutChart
                      data={tradingData.positions.map(pos => ({
                        commodity: pos.commodity,
                        value: pos.quantity * pos.currentPrice
                      }))}
                      category="value"
                      index="commodity"
                      valueFormatter={(value) => formatCurrency(value)}
                      colors={["blue", "green", "yellow", "red"]}
                      className="h-64"
                    />
                  </Card>

                  {/* P&L by Commodity */}
                  <Card>
                    <Title className="text-foreground font-bold mb-4">P&L by Commodity</Title>
                    <BarChart
                      data={tradingData.positions.map(pos => ({
                        commodity: pos.commodity,
                        pnl: pos.pnl
                      }))}
                      index="commodity"
                      categories={["pnl"]}
                      colors={["blue"]}
                      valueFormatter={(value) => formatCurrency(value)}
                      className="h-64"
                    />
                  </Card>
                </div>

                {/* Risk Metrics */}
                <Card>
                  <Title className="text-gray-900 font-bold mb-4">Risk Metrics</Title>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">
                        {tradingData.portfolio.positions.length}
                      </div>
                      <div className="text-blue-700 font-medium">Open Positions</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">
                        {formatCurrency(tradingData.portfolio.marginUsed)}
                      </div>
                      <div className="text-green-700 font-medium">Margin Used</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-900">
                        {((tradingData.portfolio.marginUsed / tradingData.portfolio.totalValue) * 100).toFixed(1)}%
                      </div>
                      <div className="text-purple-700 font-medium">Margin Ratio</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
