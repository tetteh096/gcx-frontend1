'use client';

import React, { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Badge, AreaChart, BarChart, LineChart } from '@tremor/react';
import { 
  TrendingUp, TrendingDown, Filter, Search, Calendar, 
  MapPin, Activity, Volume2, DollarSign, RefreshCw, Radio,
  ArrowUpDown, Eye, Target, Bell, Zap, Clock, BarChart3,
  PieChart, Globe, Info, AlertTriangle, TrendingUpIcon, TrendingDownIcon,
  Download, FileText, Database, Calendar as CalendarIcon, BarChart as BarChartIcon
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';

// Historical GCX Commodity Data
const historicalData = {
  'Maize': {
    daily: [
      { date: '2025-08-01', open: 1850, high: 1870, low: 1840, close: 1865, volume: 2200, change: 0.81 },
      { date: '2025-08-02', open: 1865, high: 1880, low: 1855, close: 1875, volume: 2350, change: 0.54 },
      { date: '2025-08-03', open: 1875, high: 1890, low: 1865, close: 1880, volume: 2400, change: 0.27 },
      { date: '2025-08-04', open: 1880, high: 1895, low: 1870, close: 1885, volume: 2450, change: 0.27 },
      { date: '2025-08-05', open: 1885, high: 1900, low: 1875, close: 1890, volume: 2500, change: 0.27 },
      { date: '2025-08-06', open: 1890, high: 1910, low: 1880, close: 1905, volume: 2550, change: 0.79 },
      { date: '2025-08-07', open: 1905, high: 1920, low: 1895, close: 1915, volume: 2600, change: 0.52 },
      { date: '2025-08-08', open: 1915, high: 1930, low: 1900, close: 1925, volume: 2650, change: 0.52 },
      { date: '2025-08-09', open: 1925, high: 1940, low: 1915, close: 1935, volume: 2700, change: 0.52 },
      { date: '2025-08-10', open: 1935, high: 1950, low: 1925, close: 1945, volume: 2750, change: 0.52 }
    ],
    weekly: [
      { week: 'Week 1', open: 1850, high: 1890, low: 1840, close: 1880, volume: 12000, change: 1.62 },
      { week: 'Week 2', open: 1880, high: 1920, low: 1870, close: 1910, volume: 12500, change: 1.60 },
      { week: 'Week 3', open: 1910, high: 1950, low: 1900, close: 1940, volume: 13000, change: 1.57 },
      { week: 'Week 4', open: 1940, high: 1980, low: 1930, close: 1970, volume: 13500, change: 1.55 }
    ],
    monthly: [
      { month: 'May 2025', open: 1800, high: 1900, low: 1750, close: 1880, volume: 50000, change: 4.44 },
      { month: 'June 2025', open: 1880, high: 1950, low: 1850, close: 1920, volume: 52000, change: 2.13 },
      { month: 'July 2025', open: 1920, high: 2000, low: 1900, close: 1970, volume: 54000, change: 2.60 },
      { month: 'August 2025', open: 1970, high: 2050, low: 1950, close: 2020, volume: 56000, change: 2.54 }
    ]
  },
  'Soya Bean': {
    daily: [
      { date: '2025-08-01', open: 7380, high: 7400, low: 7360, close: 7395, volume: 750, change: 0.20 },
      { date: '2025-08-02', open: 7395, high: 7410, low: 7380, close: 7405, volume: 780, change: 0.14 },
      { date: '2025-08-03', open: 7405, high: 7420, low: 7395, close: 7410, volume: 790, change: 0.07 },
      { date: '2025-08-04', open: 7410, high: 7425, low: 7400, close: 7415, volume: 795, change: 0.07 },
      { date: '2025-08-05', open: 7415, high: 7430, low: 7410, close: 7420, volume: 800, change: 0.07 },
      { date: '2025-08-06', open: 7420, high: 7440, low: 7415, close: 7435, volume: 810, change: 0.20 },
      { date: '2025-08-07', open: 7435, high: 7450, low: 7425, close: 7440, volume: 820, change: 0.07 },
      { date: '2025-08-08', open: 7440, high: 7460, low: 7430, close: 7445, volume: 830, change: 0.07 },
      { date: '2025-08-09', open: 7445, high: 7470, low: 7435, close: 7450, volume: 840, change: 0.07 },
      { date: '2025-08-10', open: 7450, high: 7480, low: 7440, close: 7455, volume: 850, change: 0.07 }
    ],
    weekly: [
      { week: 'Week 1', open: 7380, high: 7420, low: 7360, close: 7410, volume: 3800, change: 0.41 },
      { week: 'Week 2', open: 7410, high: 7450, low: 7390, close: 7430, volume: 3900, change: 0.27 },
      { week: 'Week 3', open: 7430, high: 7470, low: 7410, close: 7450, volume: 4000, change: 0.27 },
      { week: 'Week 4', open: 7450, high: 7490, low: 7430, close: 7470, volume: 4100, change: 0.27 }
    ],
    monthly: [
      { month: 'May 2025', open: 7200, high: 7400, low: 7100, close: 7350, volume: 15000, change: 2.08 },
      { month: 'June 2025', open: 7350, high: 7500, low: 7300, close: 7450, volume: 15500, change: 1.36 },
      { month: 'July 2025', open: 7450, high: 7600, low: 7400, close: 7550, volume: 16000, change: 1.34 },
      { month: 'August 2025', open: 7550, high: 7700, low: 7500, close: 7650, volume: 16500, change: 1.32 }
    ]
  },
  'Milled Rice': {
    daily: [
      { date: '2025-08-01', open: 11090, high: 11100, low: 11080, close: 11095, volume: 480, change: 0.05 },
      { date: '2025-08-02', open: 11095, high: 11105, low: 11090, close: 11100, volume: 485, change: 0.05 },
      { date: '2025-08-03', open: 11100, high: 11110, low: 11095, close: 11105, volume: 490, change: 0.05 },
      { date: '2025-08-04', open: 11105, high: 11115, low: 11100, close: 11110, volume: 495, change: 0.05 },
      { date: '2025-08-05', open: 11110, high: 11120, low: 11105, close: 11115, volume: 500, change: 0.05 },
      { date: '2025-08-06', open: 11115, high: 11125, low: 11110, close: 11120, volume: 505, change: 0.05 },
      { date: '2025-08-07', open: 11120, high: 11130, low: 11115, close: 11125, volume: 510, change: 0.05 },
      { date: '2025-08-08', open: 11125, high: 11135, low: 11120, close: 11130, volume: 515, change: 0.05 },
      { date: '2025-08-09', open: 11130, high: 11140, low: 11125, close: 11135, volume: 520, change: 0.05 },
      { date: '2025-08-10', open: 11135, high: 11145, low: 11130, close: 11140, volume: 525, change: 0.05 }
    ],
    weekly: [
      { week: 'Week 1', open: 11090, high: 11110, low: 11080, close: 11105, volume: 2400, change: 0.14 },
      { week: 'Week 2', open: 11105, high: 11125, low: 11100, close: 11120, volume: 2450, change: 0.14 },
      { week: 'Week 3', open: 11120, high: 11140, low: 11115, close: 11135, volume: 2500, change: 0.14 },
      { week: 'Week 4', open: 11135, high: 11155, low: 11130, close: 11150, volume: 2550, change: 0.14 }
    ],
    monthly: [
      { month: 'May 2025', open: 10900, high: 11100, low: 10800, close: 11050, volume: 10000, change: 1.38 },
      { month: 'June 2025', open: 11050, high: 11200, low: 10950, close: 11150, volume: 10200, change: 0.90 },
      { month: 'July 2025', open: 11150, high: 11300, low: 11050, close: 11250, volume: 10400, change: 0.89 },
      { month: 'August 2025', open: 11250, high: 11400, low: 11150, close: 11350, volume: 10600, change: 0.89 }
    ]
  },
  'Sorghum': {
    daily: [
      { date: '2025-08-01', open: 1540, high: 1550, low: 1535, close: 1545, volume: 1200, change: 0.32 },
      { date: '2025-08-02', open: 1545, high: 1555, low: 1540, close: 1550, volume: 1220, change: 0.32 },
      { date: '2025-08-03', open: 1550, high: 1560, low: 1545, close: 1555, volume: 1240, change: 0.32 },
      { date: '2025-08-04', open: 1555, high: 1565, low: 1550, close: 1560, volume: 1260, change: 0.32 },
      { date: '2025-08-05', open: 1560, high: 1570, low: 1555, close: 1565, volume: 1280, change: 0.32 },
      { date: '2025-08-06', open: 1565, high: 1575, low: 1560, close: 1570, volume: 1300, change: 0.32 },
      { date: '2025-08-07', open: 1570, high: 1580, low: 1565, close: 1575, volume: 1320, change: 0.32 },
      { date: '2025-08-08', open: 1575, high: 1585, low: 1570, close: 1580, volume: 1340, change: 0.32 },
      { date: '2025-08-09', open: 1580, high: 1590, low: 1575, close: 1585, volume: 1360, change: 0.32 },
      { date: '2025-08-10', open: 1585, high: 1595, low: 1580, close: 1590, volume: 1380, change: 0.32 }
    ],
    weekly: [
      { week: 'Week 1', open: 1540, high: 1560, low: 1535, close: 1555, volume: 6000, change: 0.97 },
      { week: 'Week 2', open: 1555, high: 1575, low: 1550, close: 1570, volume: 6100, change: 0.96 },
      { week: 'Week 3', open: 1570, high: 1590, low: 1565, close: 1585, volume: 6200, change: 0.96 },
      { week: 'Week 4', open: 1585, high: 1605, low: 1580, close: 1600, volume: 6300, change: 0.95 }
    ],
    monthly: [
      { month: 'May 2025', open: 1500, high: 1550, low: 1480, close: 1530, volume: 25000, change: 2.00 },
      { month: 'June 2025', open: 1530, high: 1580, low: 1520, close: 1560, volume: 25500, change: 1.96 },
      { month: 'July 2025', open: 1560, high: 1610, low: 1550, close: 1590, volume: 26000, change: 1.92 },
      { month: 'August 2025', open: 1590, high: 1640, low: 1580, close: 1620, volume: 26500, change: 1.89 }
    ]
  },
  'Sesame': {
    daily: [
      { date: '2025-08-01', open: 3180, high: 3190, low: 3175, close: 3185, volume: 300, change: 0.16 },
      { date: '2025-08-02', open: 3185, high: 3195, low: 3180, close: 3190, volume: 305, change: 0.16 },
      { date: '2025-08-03', open: 3190, high: 3200, low: 3185, close: 3195, volume: 310, change: 0.16 },
      { date: '2025-08-04', open: 3195, high: 3205, low: 3190, close: 3200, volume: 315, change: 0.16 },
      { date: '2025-08-05', open: 3200, high: 3210, low: 3195, close: 3205, volume: 320, change: 0.16 },
      { date: '2025-08-06', open: 3205, high: 3215, low: 3200, close: 3210, volume: 325, change: 0.16 },
      { date: '2025-08-07', open: 3210, high: 3220, low: 3205, close: 3215, volume: 330, change: 0.16 },
      { date: '2025-08-08', open: 3215, high: 3225, low: 3210, close: 3220, volume: 335, change: 0.16 },
      { date: '2025-08-09', open: 3220, high: 3230, low: 3215, close: 3225, volume: 340, change: 0.16 },
      { date: '2025-08-10', open: 3225, high: 3235, low: 3220, close: 3230, volume: 345, change: 0.16 }
    ],
    weekly: [
      { week: 'Week 1', open: 3180, high: 3200, low: 3175, close: 3195, volume: 1500, change: 0.47 },
      { week: 'Week 2', open: 3195, high: 3215, low: 3190, close: 3210, volume: 1525, change: 0.47 },
      { week: 'Week 3', open: 3210, high: 3230, low: 3205, close: 3225, volume: 1550, change: 0.47 },
      { week: 'Week 4', open: 3225, high: 3245, low: 3220, close: 3240, volume: 1575, change: 0.47 }
    ],
    monthly: [
      { month: 'May 2025', open: 3100, high: 3200, low: 3080, close: 3170, volume: 6000, change: 2.26 },
      { month: 'June 2025', open: 3170, high: 3250, low: 3160, close: 3220, volume: 6100, change: 1.58 },
      { month: 'July 2025', open: 3220, high: 3300, low: 3210, close: 3270, volume: 6200, change: 1.55 },
      { month: 'August 2025', open: 3270, high: 3350, low: 3260, close: 3320, volume: 6300, change: 1.53 }
    ]
  }
};

export default function HistoricalDataPage() {
  const { isCollapsed } = useSidebar();
  const [selectedCommodity, setSelectedCommodity] = useState('Maize');
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const commodity = historicalData[selectedCommodity as keyof typeof historicalData];
  const commodities = Object.keys(historicalData);
  const timeframes = ['daily', 'weekly', 'monthly'];

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

  const exportData = (format: 'csv' | 'json' | 'excel') => {
    // Get the filtered data based on current selections
    const exportData = currentData.map((item: any) => ({
      commodity: selectedCommodity,
      timeframe: selectedTimeframe,
      period: selectedPeriod,
      date: item.date || item.week || item.month,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      change: item.change,
      changeAmount: item.close - item.open
    }));

    if (format === 'csv') {
      // Convert to CSV
      const headers = Object.keys(exportData[0]).join(',');
      const rows = exportData.map(row => Object.values(row).join(','));
      const csvContent = [headers, ...rows].join('\n');
      
      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedCommodity}_${selectedTimeframe}_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'json') {
      // Convert to JSON and download
      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedCommodity}_${selectedTimeframe}_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'excel') {
      // For Excel, we'll create a CSV with .xlsx extension (simplified approach)
      // In a real implementation, you'd use a library like xlsx or similar
      const headers = Object.keys(exportData[0]).join('\t');
      const rows = exportData.map(row => Object.values(row).join('\t'));
      const excelContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedCommodity}_${selectedTimeframe}_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.xlsx`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    console.log(`Exported ${exportData.length} records for ${selectedCommodity} in ${format} format`);
  };

  const exportAllCommodities = (format: 'csv' | 'json' | 'excel') => {
    // Collect data from all commodities
    const allData: any[] = [];
    
    Object.keys(historicalData).forEach(commodity => {
      const commodityData = historicalData[commodity as keyof typeof historicalData];
      const timeframeData = commodityData[selectedTimeframe as keyof typeof commodityData];
      
      timeframeData.forEach((item: any) => {
        allData.push({
          commodity: commodity,
          timeframe: selectedTimeframe,
          period: selectedPeriod,
          date: item.date || item.week || item.month,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
          change: item.change,
          changeAmount: item.close - item.open
        });
      });
    });

    if (format === 'csv') {
      const headers = Object.keys(allData[0]).join(',');
      const rows = allData.map(row => Object.values(row).join(','));
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `All_Commodities_${selectedTimeframe}_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(allData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `All_Commodities_${selectedTimeframe}_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    console.log(`Exported ${allData.length} records for all commodities in ${format} format`);
  };

  if (!commodity) return null;

  const currentData = commodity[selectedTimeframe as keyof typeof commodity];
  const chartData = currentData.map((item: any) => ({
    date: item.date || item.week || item.month,
    price: item.close,
    volume: item.volume,
    change: item.change
  }));

  // Calculate statistics
  const stats = {
    totalChange: currentData[currentData.length - 1]?.close - currentData[0]?.open || 0,
    totalChangePercent: ((currentData[currentData.length - 1]?.close - currentData[0]?.open) / currentData[0]?.open * 100) || 0,
    avgVolume: currentData.reduce((sum: number, item: any) => sum + item.volume, 0) / currentData.length,
    highestPrice: Math.max(...currentData.map((item: any) => item.high)),
    lowestPrice: Math.min(...currentData.map((item: any) => item.low)),
    volatility: Math.sqrt(currentData.reduce((sum: number, item: any) => sum + Math.pow(item.change, 2), 0) / currentData.length)
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar />
        
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
          <div className="w-full px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground">Historical Data</h1>
                  <p className="text-muted-foreground mt-1 font-medium">Comprehensive historical analysis and data export</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                    <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Historical Database</span>
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

            {/* Controls */}
            <div className="mb-6">
              <Card className="bg-card text-card-foreground border-border shadow-lg">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Text className="text-card-foreground font-medium">Data Selection:</Text>
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
                    <Text className="text-muted-foreground">Timeframe:</Text>
                    <select
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                    >
                      {timeframes.map(timeframe => (
                        <option key={timeframe} value={timeframe}>
                          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Text className="text-muted-foreground">Period:</Text>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                    >
                      <option value="1W">1 Week</option>
                      <option value="1M">1 Month</option>
                      <option value="3M">3 Months</option>
                      <option value="6M">6 Months</option>
                      <option value="1Y">1 Year</option>
                      <option value="ALL">All Time</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showVolume"
                      checked={showVolume}
                      onChange={(e) => setShowVolume(e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <label htmlFor="showVolume" className="text-sm text-muted-foreground">Show Volume</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Text className="text-muted-foreground">Start Date:</Text>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Text className="text-muted-foreground">End Date:</Text>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-card text-card-foreground"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-blue-100 font-medium">Total Change</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatCurrency(stats.totalChange)}
                    </Metric>
                    <div className="flex items-center space-x-2 mt-1">
                      {React.createElement(getChangeIcon(stats.totalChangePercent), { 
                        className: `w-4 h-4 ${getChangeColor(stats.totalChangePercent)}` 
                      })}
                      <span className={`text-sm font-medium ${getChangeColor(stats.totalChangePercent)}`}>
                        {stats.totalChangePercent >= 0 ? '+' : ''}{stats.totalChangePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="w-10 h-10 text-blue-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-green-100 font-medium">Average Volume</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {formatNumber(stats.avgVolume)} tons
                    </Metric>
                    <Text className="text-white font-medium">Per Period</Text>
                  </div>
                  <Volume2 className="w-10 h-10 text-green-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-purple-100 font-medium">Price Range</Text>
                    <Metric className="text-white font-bold text-xl">
                      {formatCurrency(stats.highestPrice - stats.lowestPrice)}
                    </Metric>
                    <Text className="text-white font-medium">High - Low</Text>
                  </div>
                  <BarChart3 className="w-10 h-10 text-purple-200" />
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-orange-100 font-medium">Volatility</Text>
                    <Metric className="text-white font-bold text-2xl">
                      {stats.volatility.toFixed(2)}%
                    </Metric>
                    <Text className="text-white font-medium">Price Movement</Text>
                  </div>
                  <Activity className="w-10 h-10 text-orange-200" />
                </div>
              </Card>
            </div>

            {/* Price Chart */}
            <div className="mb-6">
              <Card className="bg-card text-card-foreground border-border shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Title className="text-card-foreground font-bold">
                    {selectedCommodity} Price History - {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}
                  </Title>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => exportData('csv')}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Export CSV</span>
                    </button>
                    <button
                      onClick={() => exportData('json')}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Export JSON</span>
                    </button>
                  </div>
                </div>
                
                <AreaChart
                  data={chartData}
                  index="date"
                  categories={["price"]}
                  colors={["blue"]}
                  valueFormatter={(value) => formatCurrency(value)}
                  showLegend={false}
                  className="h-80"
                />
              </Card>
            </div>

            {/* Volume Chart */}
            {showVolume && (
              <div className="mb-6">
                <Card className="bg-card text-card-foreground border-border shadow-lg">
                  <Title className="text-card-foreground font-bold mb-4">
                    {selectedCommodity} Trading Volume - {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}
                  </Title>
                  <BarChart
                    data={chartData}
                    index="date"
                    categories={["volume"]}
                    colors={["green"]}
                    valueFormatter={(value) => formatNumber(value)}
                    showLegend={false}
                    className="h-64"
                  />
                </Card>
              </div>
            )}

            {/* Historical Data Table */}
            <div className="mb-6">
              <Card className="bg-card text-card-foreground border-border shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Title className="text-card-foreground font-bold">Historical Data Table</Title>
                    <Text className="text-muted-foreground font-medium">
                      {currentData.length} data points for {selectedCommodity}
                    </Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-blue-500" />
                    <Text className="text-blue-600 text-sm">Historical Records</Text>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {selectedTimeframe === 'daily' ? 'Date' : selectedTimeframe === 'weekly' ? 'Week' : 'Month'}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Open</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">High</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Low</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Close</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Volume</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Change</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {currentData.map((item: any, index: number) => (
                        <tr key={index} className="hover:bg-muted/30 transition-colors duration-200">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-card-foreground">
                              {item.date || item.week || item.month}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-card-foreground">{formatCurrency(item.open)}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600 dark:text-green-400 font-medium">{formatCurrency(item.high)}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-red-600 dark:text-red-400 font-medium">{formatCurrency(item.low)}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-card-foreground">{formatCurrency(item.close)}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-card-foreground">{formatNumber(item.volume)} tons</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>
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

            {/* Data Export Options */}
            <div className="mb-6">
              <Card className="bg-card text-card-foreground border-border shadow-lg">
                <Title className="text-card-foreground font-bold mb-6">Data Export & Download</Title>
                
                {/* Export Summary - Compact Design */}
                <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-card-foreground">Export Summary</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      Ready
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{currentData.length}</div>
                      <div className="text-xs text-muted-foreground">Data Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-card-foreground">{selectedCommodity}</div>
                      <div className="text-xs text-muted-foreground">Commodity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-card-foreground capitalize">{selectedTimeframe}</div>
                      <div className="text-xs text-muted-foreground">Timeframe</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-card-foreground">{selectedPeriod}</div>
                      <div className="text-xs text-muted-foreground">Period</div>
                    </div>
                  </div>
                </div>
                
                {/* Individual Export Options - Compact Cards */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Individual Export</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">CSV</span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                        Spreadsheet format
                      </p>
                      <button
                        onClick={() => exportData('csv')}
                        className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors font-medium"
                      >
                        Download
                      </button>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">JSON</span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mb-3">
                        API ready format
                      </p>
                      <button
                        onClick={() => exportData('json')}
                        className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors font-medium"
                      >
                        Download
                      </button>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <BarChartIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Excel</span>
                      </div>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mb-3">
                        Professional reports
                      </p>
                      <button
                        onClick={() => exportData('excel')}
                        className="w-full bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors font-medium"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Bulk Export Section - Compact Design */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Bulk Export - All Commodities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">All CSV</span>
                      </div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-3">
                        Complete dataset
                      </p>
                      <button
                        onClick={() => exportAllCommodities('csv')}
                        className="w-full bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Download All
                      </button>
                    </div>
                    
                    <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        <span className="text-xs font-medium text-teal-700 dark:text-teal-300">All JSON</span>
                      </div>
                      <p className="text-xs text-teal-600 dark:text-teal-400 mb-3">
                        Complete dataset
                      </p>
                      <button
                        onClick={() => exportAllCommodities('json')}
                        className="w-full bg-teal-600 text-white px-3 py-2 rounded text-sm hover:bg-teal-700 transition-colors font-medium"
                      >
                        Download All
                      </button>
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
