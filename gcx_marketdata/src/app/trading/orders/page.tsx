'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Calendar, Download, RefreshCw,
  Clock, CheckCircle, XCircle, AlertCircle,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  FileText, Target
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Mock orders data
const orders = [
  {
    id: 'ORD-2025-001',
    symbol: 'GAPWM2',
    commodity: 'Maize - White Grade 1',
    type: 'buy',
    orderType: 'limit',
    quantity: 10,
    unit: 'tons',
    price: 1850.00,
    currentPrice: 1880.50,
    totalValue: 18500.00,
    status: 'pending',
    timeInForce: 'GTC',
    region: 'Greater Accra',
    createdAt: '2025-01-27 09:30:00',
    expiresAt: '2025-02-03 17:00:00',
    filled: 0,
    remaining: 10
  },
  {
    id: 'ORD-2025-002',
    symbol: 'GKUYSB3',
    commodity: 'Soya Bean - Grade 1',
    type: 'sell',
    orderType: 'market',
    quantity: 2,
    unit: 'tons',
    price: 7400.00,
    currentPrice: 7418.00,
    totalValue: 14800.00,
    status: 'completed',
    timeInForce: 'IOC',
    region: 'Northern',
    createdAt: '2025-01-27 08:15:00',
    completedAt: '2025-01-27 08:16:00',
    filled: 2,
    remaining: 0
  },
  {
    id: 'ORD-2025-003',
    symbol: 'GTAWSO3',
    commodity: 'Sorghum - Red Variety',
    type: 'buy',
    orderType: 'stop-limit',
    quantity: 5,
    unit: 'tons',
    price: 1580.00,
    stopPrice: 1570.00,
    currentPrice: 1550.00,
    totalValue: 7900.00,
    status: 'pending',
    timeInForce: 'DAY',
    region: 'Volta',
    createdAt: '2025-01-27 11:45:00',
    expiresAt: '2025-01-27 17:00:00',
    filled: 0,
    remaining: 5
  },
  {
    id: 'ORD-2025-004',
    symbol: 'GBOAMR2',
    commodity: 'Milled Rice - Jasmine',
    type: 'sell',
    orderType: 'limit',
    quantity: 1.5,
    unit: 'tons',
    price: 11200.00,
    currentPrice: 11110.00,
    totalValue: 16800.00,
    status: 'partially_filled',
    timeInForce: 'GTC',
    region: 'Brong Ahafo',
    createdAt: '2025-01-26 14:20:00',
    expiresAt: '2025-02-02 17:00:00',
    filled: 0.8,
    remaining: 0.7
  },
  {
    id: 'ORD-2025-005',
    symbol: 'GAPWM2',
    commodity: 'Maize - White Grade 1',
    type: 'buy',
    orderType: 'market',
    quantity: 8,
    unit: 'tons',
    price: 1875.00,
    currentPrice: 1880.50,
    totalValue: 15000.00,
    status: 'cancelled',
    timeInForce: 'IOC',
    region: 'Greater Accra',
    createdAt: '2025-01-26 10:30:00',
    cancelledAt: '2025-01-26 10:32:00',
    filled: 0,
    remaining: 8,
    cancelReason: 'User cancelled'
  }
];

const orderStats = {
  totalOrders: orders.length,
  pendingOrders: orders.filter(o => o.status === 'pending').length,
  completedOrders: orders.filter(o => o.status === 'completed').length,
  cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
  totalValue: orders.reduce((sum, order) => sum + order.totalValue, 0)
};

export default function OrdersPage() {
  const { isCollapsed } = useSidebar();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-800" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-800" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-800" />;
      case 'partially_filled':
        return <AlertCircle className="w-4 h-4 text-blue-800" />;
      default:
        return <Clock className="w-4 h-4 text-gray-800" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'completed':
        return 'badge-completed';
      case 'cancelled':
        return 'badge-cancelled';
      case 'partially_filled':
        return 'badge-partially-filled';
      default:
        return 'badge-pending';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'buy' ? (
      <ArrowDownRight className="w-4 h-4" />
    ) : (
      <ArrowUpRight className="w-4 h-4" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'buy' 
      ? 'badge-buy'
      : 'badge-sell';
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesType = selectedType === 'all' || order.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.commodity.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
            <div className="w-full px-6 lg:px-8 py-6">
            {/* Enhanced Header */}
            <div className="mb-8">
              <div className="bg-white dark:bg-card rounded-2xl shadow-xl border border-gray-200/60 dark:border-border overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-purple-50 dark:from-muted dark:to-muted/50 px-8 py-6 border-b border-gray-200/60 dark:border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">
                            Order Management
                          </h1>
                          <p className="text-gray-600 dark:text-muted-foreground">
                            Manage your trading orders and track execution status
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-secondary text-gray-700 dark:text-secondary-foreground rounded-lg hover:bg-gray-200 dark:hover:bg-secondary/80 transition-all duration-200 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                      <button
                        onClick={() => setShowNewOrderModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        <span>New Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white dark:bg-card rounded-xl shadow-lg border border-gray-200/60 dark:border-border p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{orderStats.totalOrders}</div>
                    <div className="text-sm text-muted-foreground">Total Orders</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{orderStats.pendingOrders}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{orderStats.completedOrders}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{orderStats.cancelledOrders}</div>
                    <div className="text-sm text-muted-foreground">Cancelled</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">{formatCurrency(orderStats.totalValue)}</div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6">
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search orders by symbol or commodity..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="sm:w-48">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="partially_filled">Partially Filled</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div className="sm:w-48">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
                    >
                      <option value="all">All Types</option>
                      <option value="buy">Buy Orders</option>
                      <option value="sell">Sell Orders</option>
                    </select>
                  </div>

                  {/* Export Button */}
                  <button className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Orders</h3>
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Symbol</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Total Value</th>
                      <th className="text-center py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/25 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-foreground">{order.id}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${getTypeColor(order.type)}`}>
                            {getTypeIcon(order.type)}
                            <span className="uppercase">{order.type}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 capitalize">
                            {order.orderType}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-foreground">{order.symbol}</div>
                            <div className="text-sm text-muted-foreground">{order.commodity}</div>
                            <div className="text-xs text-muted-foreground">{order.region}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-foreground">
                            {order.quantity} {order.unit}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(order.price)}
                          </div>
                          {order.stopPrice && (
                            <div className="text-xs text-muted-foreground">
                              Stop: {formatCurrency(order.stopPrice)}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(order.totalValue)}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="text-sm">
                            <div className="font-medium text-foreground">
                              {order.filled}/{order.quantity} {order.unit}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {((order.filled / order.quantity) * 100).toFixed(1)}% filled
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="py-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || selectedStatus !== 'all' || selectedType !== 'all'
                      ? 'Try adjusting your filters or search query.'
                      : 'Start trading by creating your first order.'}
                  </p>
                  <button
                    onClick={() => setShowNewOrderModal(true)}
                    className="mt-4 flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Order</span>
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
