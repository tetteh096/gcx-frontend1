'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Briefcase, 
  PieChart, BarChart3, Activity, RefreshCw, Eye, 
  EyeOff, Plus, Search, Filter, Calendar, Download,
  ArrowUpRight, ArrowDownRight, Target, Clock, Percent, Package
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Mock portfolio data
const portfolioData = {
  totalValue: 125480.50,
  todayChange: 2845.75,
  todayChangePercent: 2.32,
  totalInvested: 110000.00,
  totalProfit: 15480.50,
  profitPercent: 14.07,
  cash: 8950.25,
  portfolioAllocation: [
    { name: 'Maize', value: 45600, percent: 36.3, color: '#10b981' },
    { name: 'Soya Bean', value: 32400, percent: 25.8, color: '#3b82f6' },
    { name: 'Rice', value: 28900, percent: 23.0, color: '#f59e0b' },
    { name: 'Sorghum', value: 10630, percent: 8.5, color: '#8b5cf6' },
    { name: 'Cash', value: 8950, percent: 7.1, color: '#6b7280' }
  ]
};

const positions = [
  {
    id: 1,
    symbol: 'GAPWM2',
    commodity: 'Maize - White Grade 1',
    quantity: 25,
    unit: 'tons',
    avgPrice: 1820.50,
    currentPrice: 1880.50,
    marketValue: 47012.50,
    pnl: 1500.00,
    pnlPercent: 3.30,
    region: 'Greater Accra',
    purchaseDate: '2025-01-15',
    status: 'active'
  },
  {
    id: 2,
    symbol: 'GKUYSB3',
    commodity: 'Soya Bean - Grade 1',
    quantity: 4.5,
    unit: 'tons',
    avgPrice: 7200.00,
    currentPrice: 7418.00,
    marketValue: 33381.00,
    pnl: 981.00,
    pnlPercent: 3.03,
    region: 'Northern',
    purchaseDate: '2025-01-20',
    status: 'active'
  },
  {
    id: 3,
    symbol: 'GBOAMR2',
    commodity: 'Milled Rice - Jasmine',
    quantity: 2.5,
    unit: 'tons',
    avgPrice: 10800.00,
    currentPrice: 11110.00,
    marketValue: 27775.00,
    pnl: 775.00,
    pnlPercent: 2.87,
    region: 'Brong Ahafo',
    purchaseDate: '2025-01-18',
    status: 'active'
  },
  {
    id: 4,
    symbol: 'GTAWSO3',
    commodity: 'Sorghum - Red Variety',
    quantity: 7,
    unit: 'tons',
    avgPrice: 1480.00,
    currentPrice: 1550.00,
    marketValue: 10850.00,
    pnl: 490.00,
    pnlPercent: 4.73,
    region: 'Volta',
    purchaseDate: '2025-01-22',
    status: 'active'
  }
];

const recentTransactions = [
  {
    id: 1,
    type: 'buy',
    symbol: 'GTAWSO3',
    commodity: 'Sorghum - Red Variety',
    quantity: 3,
    price: 1480.00,
    total: 4440.00,
    date: '2025-01-27 14:30',
    status: 'completed'
  },
  {
    id: 2,
    type: 'sell',
    symbol: 'GAPWM2',
    commodity: 'Maize - White Grade 1',
    quantity: 5,
    price: 1875.00,
    total: 9375.00,
    date: '2025-01-27 11:15',
    status: 'completed'
  },
  {
    id: 3,
    type: 'buy',
    symbol: 'GKUYSB3',
    commodity: 'Soya Bean - Grade 1',
    quantity: 1.5,
    price: 7400.00,
    total: 11100.00,
    date: '2025-01-26 16:45',
    status: 'completed'
  }
];

export default function PortfolioPage() {
  const { isCollapsed } = useSidebar();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showProfitLoss, setShowProfitLoss] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', { 
      style: 'currency', 
      currency: 'GHS',
      minimumFractionDigits: 2 
    }).format(amount);
  };

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="flex">
          <Sidebar />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
            <div className="w-full px-6 lg:px-8 py-8">
            {/* Enhanced Header with Professional Gradient */}
            <div className="mb-8">
              <div className="relative bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='11' y='11' width='10' height='10'/%3E%3Crect x='33' y='33' width='10' height='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white drop-shadow-sm">
                          Trading Portfolio
                        </h1>
                        <p className="text-xl text-white/90 mt-1">
                          Advanced Position Management • Real-time Performance Tracking
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                      <span className="text-white/80 text-sm">Show P&L:</span>
                      <button
                        onClick={() => setShowProfitLoss(!showProfitLoss)}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {showProfitLoss ? <Eye className="w-4 h-4 text-white" /> : <EyeOff className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 disabled:opacity-50 border border-white/20"
                    >
                      <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="font-medium">Refresh Portfolio</span>
                    </button>
                  </div>
                </div>
                
                {/* Floating Portfolio Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 text-green-300" />
                      <div>
                        <div className="text-2xl font-bold text-white">GHS {portfolioData.totalValue.toLocaleString()}</div>
                        <div className="text-white/80 text-sm">Total Value</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-blue-300" />
                      <div>
                        <div className="text-2xl font-bold text-white">GHS {portfolioData.totalProfit.toLocaleString()}</div>
                        <div className="text-white/80 text-sm">Total P&L</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <Percent className="w-6 h-6 text-purple-300" />
                      <div>
                        <div className="text-2xl font-bold text-white">{((portfolioData.totalProfit / portfolioData.totalInvested) * 100).toFixed(1)}%</div>
                        <div className="text-white/80 text-sm">Total Return</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <Package className="w-6 h-6 text-yellow-300" />
                      <div>
                        <div className="text-2xl font-bold text-white">{positions.length}</div>
                        <div className="text-white/80 text-sm">Active Positions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Portfolio Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Portfolio Value */}
              <div className="bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200/60 dark:border-border p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-foreground">
                      {formatCurrency(portfolioData.totalValue)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-muted-foreground">Total Value</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${getChangeColor(portfolioData.todayChange)}`}>
                    {React.createElement(getChangeIcon(portfolioData.todayChange), { className: 'w-4 h-4' })}
                    <span className="font-medium">
                      {formatCurrency(Math.abs(portfolioData.todayChange))}
                    </span>
                  </div>
                  <span className={`text-sm ${getChangeColor(portfolioData.todayChange)}`}>
                    ({formatPercentage(portfolioData.todayChangePercent)})
                  </span>
                </div>
              </div>

              {/* Total Profit/Loss */}
              <div className="bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200/60 dark:border-border p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {showProfitLoss ? formatCurrency(portfolioData.totalProfit) : '••••••'}
                    </div>
                    <div className="text-sm text-muted-foreground">Total P&L</div>
                  </div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {showProfitLoss ? formatPercentage(portfolioData.profitPercent) : '•••'} return
                </div>
              </div>

              {/* Cash Available */}
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(portfolioData.cash)}
                    </div>
                    <div className="text-sm text-muted-foreground">Available Cash</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {((portfolioData.cash / portfolioData.totalValue) * 100).toFixed(1)}% of portfolio
                </div>
              </div>

              {/* Active Positions */}
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {positions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Positions</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Across {new Set(positions.map(p => p.region)).size} regions
                </div>
              </div>
            </div>

            {/* Portfolio Allocation and Positions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Portfolio Allocation Chart */}
              <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                  <h3 className="text-lg font-bold text-foreground">Portfolio Allocation</h3>
                  <p className="text-sm text-muted-foreground">Asset distribution by value</p>
                </div>
                <div className="p-6">
                  {/* Simple allocation display */}
                  <div className="space-y-4">
                    {portfolioData.portfolioAllocation.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">
                            {formatCurrency(item.value)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.percent}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Positions */}
              <div className="lg:col-span-2 bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Current Positions</h3>
                      <p className="text-sm text-muted-foreground">Your active commodity holdings</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>New Position</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Symbol</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Quantity</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Avg Price</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Current Price</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Market Value</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">P&L</th>
                        <th className="text-center py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {positions.map((position) => (
                        <tr key={position.id} className="hover:bg-muted/25 transition-colors">
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-medium text-foreground">{position.symbol}</div>
                              <div className="text-sm text-muted-foreground">{position.commodity}</div>
                              <div className="text-xs text-muted-foreground">{position.region}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="font-medium text-foreground">
                              {position.quantity} {position.unit}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="font-medium text-foreground">
                              {formatCurrency(position.avgPrice)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="font-medium text-foreground">
                              {formatCurrency(position.currentPrice)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="font-medium text-foreground">
                              {formatCurrency(position.marketValue)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            {showProfitLoss ? (
                              <div className={`font-medium ${getChangeColor(position.pnl)}`}>
                                <div>{formatCurrency(position.pnl)}</div>
                                <div className="text-sm">
                                  ({formatPercentage(position.pnlPercent)})
                                </div>
                              </div>
                            ) : (
                              <div className="font-medium text-muted-foreground">••••••</div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs ${
                              position.status === 'active' ? 'badge-active' : 'badge-completed'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                position.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
                              }`}></div>
                              <span className="capitalize">{position.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Recent Transactions</h3>
                    <p className="text-sm text-muted-foreground">Your latest trading activity</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                      <Calendar className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Date & Time</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Symbol</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="text-center py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-muted/25 transition-colors">
                        <td className="py-4 px-6">
                          <div className="text-sm font-medium text-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs ${
                            transaction.type === 'buy' 
                              ? 'badge-buy'
                              : 'badge-sell'
                          }`}>
                            {transaction.type === 'buy' ? (
                              <ArrowDownRight className="w-3 h-3" />
                            ) : (
                              <ArrowUpRight className="w-3 h-3" />
                            )}
                            <span className="uppercase">{transaction.type}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-foreground">{transaction.symbol}</div>
                            <div className="text-sm text-muted-foreground">{transaction.commodity}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-foreground">
                            {transaction.quantity} tons
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(transaction.price)}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(transaction.total)}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="inline-flex items-center space-x-1 px-3 py-1 badge-completed rounded-lg text-xs">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Completed</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
