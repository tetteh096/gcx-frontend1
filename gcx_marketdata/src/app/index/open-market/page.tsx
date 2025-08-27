'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, TrendingUp, TrendingDown, RefreshCw, AlertTriangle,
  ArrowUpRight, ArrowDownRight, DollarSign, Activity, 
  ExternalLink, Info, Target, BarChart3, Zap
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import PriceTable from '@/components/index/PriceTable';
import ProfessionalChart from '@/components/index/ProfessionalChart';
import MarketSummary from '@/components/index/MarketSummary';

// Local Ghanaian Market Data for comparison with GCX prices
// Using Ghana's major agricultural commodities and local markets
const localMarketData = [
  // Maize - White (Ghana's staple crop)
  {
    symbol: 'GCX-MAIZE-WHITE',
    commodity: 'Maize - White Grade 1',
    lastPrice: 3500.00,
    bid: 3495.00,
    ask: 3505.00,
    change: 85.50,
    changePercent: 2.50,
    volume: 12500,
    high: 3520.00,
    low: 3480.00,
    time: '16:35 GMT',
    region: 'Accra Warehouse',
    grade: 'Grade 1 - 14% moisture',
    localMarket: 'Techiman Market',
    localPrice: 3200.00,
    priceDifference: 3500.00 - 3200.00,
    percentageDifference: ((3500.00 - 3200.00) / 3200.00 * 100).toFixed(1)
  },
  {
    symbol: 'GCX-MAIZE-YELLOW',
    commodity: 'Maize - Yellow Grade 1',
    lastPrice: 3450.00,
    bid: 3445.00,
    ask: 3455.00,
    change: 92.30,
    changePercent: 2.75,
    volume: 8750,
    high: 3470.00,
    low: 3430.00,
    time: '16:35 GMT',
    region: 'Kumasi Warehouse',
    grade: 'Grade 1 - 14% moisture',
    localMarket: 'Kumasi Central Market',
    localPrice: 3180.00,
    priceDifference: 3450.00 - 3180.00,
    percentageDifference: ((3450.00 - 3180.00) / 3180.00 * 100).toFixed(1)
  },
  // Sorghum (Major Ghana crop)
  {
    symbol: 'GCX-SORGHUM',
    commodity: 'Sorghum - Red Grade 1',
    lastPrice: 2890.00,
    bid: 2885.00,
    ask: 2895.00,
    change: 67.80,
    changePercent: 2.40,
    volume: 6200,
    high: 2910.00,
    low: 2870.00,
    time: '16:35 GMT',
    region: 'Tamale Warehouse',
    grade: 'Grade 1 - 13% moisture',
    localMarket: 'Tamale Central Market',
    localPrice: 2650.00,
    priceDifference: 2890.00 - 2650.00,
    percentageDifference: ((2890.00 - 2650.00) / 2650.00 * 100).toFixed(1)
  },
  // Soya Bean (Growing Ghana crop)
  {
    symbol: 'GCX-SOYBEAN',
    commodity: 'Soya Bean - Grade 1',
    lastPrice: 8500.00,
    bid: 8490.00,
    ask: 8510.00,
    change: 215.40,
    changePercent: 2.60,
    volume: 4500,
    high: 8520.00,
    low: 8475.00,
    time: '16:35 GMT',
    region: 'Brong Ahafo Warehouse',
    grade: 'Grade 1 - 12% moisture',
    localMarket: 'Sunyani Market',
    localPrice: 8100.00,
    priceDifference: 8500.00 - 8100.00,
    percentageDifference: ((8500.00 - 8100.00) / 8100.00 * 100).toFixed(1)
  },
  // Rice (Local production)
  {
    symbol: 'GCX-RICE-LOCAL',
    commodity: 'Rice - Local Jasmine',
    lastPrice: 11110.00,
    bid: 11095.00,
    ask: 11125.00,
    change: 298.60,
    changePercent: 2.76,
    volume: 3200,
    high: 11140.00,
    low: 11080.00,
    time: '16:35 GMT',
    region: 'Northern Region',
    grade: 'Premium - 5% broken',
    localMarket: 'Bolgatanga Market',
    localPrice: 10500.00,
    priceDifference: 11110.00 - 10500.00,
    percentageDifference: ((11110.00 - 10500.00) / 10500.00 * 100).toFixed(1)
  },
  // Cowpea (Black-eyed peas - Major Ghana legume)
  {
    symbol: 'GCX-COWPEA',
    commodity: 'Cowpea - White Grade 1',
    lastPrice: 12250.00,
    bid: 12235.00,
    ask: 12265.00,
    change: 387.90,
    changePercent: 3.27,
    volume: 2800,
    high: 12280.00,
    low: 12220.00,
    time: '16:35 GMT',
    region: 'Upper East Warehouse',
    grade: 'Grade 1 - Clean',
    localMarket: 'Navrongo Market',
    localPrice: 11800.00,
    priceDifference: 12250.00 - 11800.00,
    percentageDifference: ((12250.00 - 11800.00) / 11800.00 * 100).toFixed(1)
  }
];

// Market Summary for GCX vs Local Markets Comparison
const localMarketSummary = [
  {
    title: 'GCX Maize vs Local Markets',
    value: '+8.5%',
    change: +270,
    changePercent: +8.5,
    subtitle: 'Price Premium',
    icon: 'trending-up' as const,
    color: 'green' as const
  },
  {
    title: 'GCX Sorghum vs Local',
    value: '+9.1%',
    change: +240,
    changePercent: +9.1,
    subtitle: 'Price Premium',
    icon: 'trending-up' as const,
    color: 'green' as const
  },
  {
    title: 'GCX Soya vs Local',
    value: '+4.9%',
    change: +400,
    changePercent: +4.9,
    subtitle: 'Price Premium',
    icon: 'trending-up' as const,
    color: 'green' as const
  },
  {
    title: 'Average Premium',
    value: 'GHS 303',
    change: 303,
    changePercent: 7.5,
    subtitle: 'vs Local Markets',
    icon: 'dollar' as const,
    color: 'blue' as const
  }
];

  // Chart data for GCX vs Local Market comparison by commodity
  const comparisonChartData = [
    { date: '2025-01-20', 'GCX Maize': 3480, 'Local Maize': 3180, 'GCX Sorghum': 2850, 'Local Sorghum': 2620, 'GCX Soya': 8450, 'Local Soya': 8050, 'GCX Rice': 11080, 'Local Rice': 10450 },
    { date: '2025-01-21', 'GCX Maize': 3490, 'Local Maize': 3190, 'GCX Sorghum': 2860, 'Local Sorghum': 2630, 'GCX Soya': 8460, 'Local Soya': 8060, 'GCX Rice': 11090, 'Local Rice': 10460 },
    { date: '2025-01-22', 'GCX Maize': 3485, 'Local Maize': 3185, 'GCX Sorghum': 2855, 'Local Sorghum': 2625, 'GCX Soya': 8455, 'Local Soya': 8055, 'GCX Rice': 11085, 'Local Rice': 10455 },
    { date: '2025-01-23', 'GCX Maize': 3495, 'Local Maize': 3195, 'GCX Sorghum': 2865, 'Local Sorghum': 2635, 'GCX Soya': 8465, 'Local Soya': 8065, 'GCX Rice': 11095, 'Local Rice': 10465 },
    { date: '2025-01-24', 'GCX Maize': 3500, 'Local Maize': 3200, 'GCX Sorghum': 2870, 'Local Sorghum': 2640, 'GCX Soya': 8470, 'Local Soya': 8070, 'GCX Rice': 11100, 'Local Rice': 10470 },
    { date: '2025-01-25', 'GCX Maize': 3490, 'Local Maize': 3190, 'GCX Sorghum': 2875, 'Local Sorghum': 2645, 'GCX Soya': 8475, 'Local Soya': 8075, 'GCX Rice': 11105, 'Local Rice': 10485 },
    { date: '2025-01-26', 'GCX Maize': 3485, 'Local Maize': 3185, 'GCX Sorghum': 2880, 'Local Sorghum': 2650, 'GCX Soya': 8485, 'Local Soya': 8085, 'GCX Rice': 11110, 'Local Rice': 10490 },
    { date: '2025-01-27', 'GCX Maize': 3495, 'Local Maize': 3195, 'GCX Sorghum': 2885, 'Local Sorghum': 2655, 'GCX Soya': 8490, 'Local Soya': 8090, 'GCX Rice': 11105, 'Local Rice': 10495 },
    { date: '2025-01-28', 'GCX Maize': 3490, 'Local Maize': 3190, 'GCX Sorghum': 2890, 'Local Sorghum': 2650, 'GCX Soya': 8495, 'Local Soya': 8095, 'GCX Rice': 11110, 'Local Rice': 10500 },
    { date: '2025-01-29', 'GCX Maize': 3500, 'Local Maize': 3200, 'GCX Sorghum': 2890, 'Local Sorghum': 2650, 'GCX Soya': 8500, 'Local Soya': 8100, 'GCX Rice': 11110, 'Local Rice': 10500 }
  ];

export default function OpenMarketPage() {
  const { isCollapsed } = useSidebar();
  const [selectedCommodity, setSelectedCommodity] = useState('Maize');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="flex">
          <Sidebar />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
            <div className="w-full px-6 lg:px-8 py-8">
              {/* Enhanced Professional Header with Gradient */}
              <div className="mb-8">
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                  
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Globe className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h1 className="text-4xl font-bold text-white drop-shadow-sm">
                            Local Market Intelligence
                          </h1>
                          <p className="text-xl text-white/90 mt-1">
                            GCX vs Traditional Markets • Real-time Comparison
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-white/80">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Home</span>
                        <span>/</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Index</span>
                        <span>/</span>
                        <span className="bg-white/30 px-3 py-1 rounded-full text-sm font-medium">Market Comparison</span>
                      </div>
                    </div>
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 disabled:opacity-50 border border-white/20"
                    >
                      <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="font-medium">Refresh Data</span>
                    </button>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-6 h-6 text-green-300" />
                        <div>
                          <div className="text-2xl font-bold text-white">+8.5%</div>
                          <div className="text-white/80 text-sm">Avg. GCX Premium</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-6 h-6 text-blue-300" />
                        <div>
                          <div className="text-2xl font-bold text-white">15</div>
                          <div className="text-white/80 text-sm">Markets Tracked</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-6 h-6 text-purple-300" />
                        <div>
                          <div className="text-2xl font-bold text-white">Live</div>
                          <div className="text-white/80 text-sm">Market Status</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Market Summary Cards */}
              <div className="mb-8">
                <MarketSummary data={localMarketSummary} title="" />
              </div>

              {/* Enhanced Commodity Overview Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Premium GCX Performance Card */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl border border-blue-200 dark:border-gray-600 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-4 right-4">
                    <div className="bg-blue-500 rounded-full p-2">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      GCX Platform Performance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Premium pricing vs traditional markets
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            GHS 3,500
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Maize (White Grade 1)
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                            +8.5%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            vs Techiman
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            GHS 8,500
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Soya Bean Grade 1
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                            +4.9%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            vs Sunyani
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            GHS 2,890
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Sorghum Grade 1
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                            +9.1%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            vs Tamale
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. Premium:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">GHS 303</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Market Status */}
                <div className="group relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl border border-green-200 dark:border-gray-600 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 rounded-full p-2 animate-pulse">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Live Market Status
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Real-time trading information
                    </p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-xl tracking-wide shadow-lg animate-pulse">
                      ● ACTIVE TRADING
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                          <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            Market Coverage
                          </div>
                          <div className="text-blue-600 dark:text-blue-400 text-xs">
                            85% premium over local markets
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2">
                          <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            Regional Coverage
                          </div>
                          <div className="text-purple-600 dark:text-purple-400 text-xs">
                            15 major markets tracked
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Last Updated: Jan 27, 2025 • 16:35 GMT
                    </div>
                  </div>
                </div>

                {/* Enhanced Market Intelligence */}
                <div className="group relative bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl border border-orange-200 dark:border-gray-600 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-500 rounded-full p-2">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Market Intelligence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Comprehensive market insights
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        Real-time pricing comparison with traditional markets across Ghana including 
                        <span className="font-semibold text-orange-600 dark:text-orange-400"> Techiman, Kumasi, Tamale</span> and other major trading centers.
                      </div>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Transparency</span>
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                          100%
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality Assurance</span>
                        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
                          Certified
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-xl font-medium text-sm hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto">
                      <ExternalLink className="w-4 h-4" />
                      <span>View Coverage Map</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Ghana Local Markets Table */}
              <div className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Ghana Commodity Exchange - Live Trading vs Local Markets
                    </h2>
                    <p className="text-blue-100">
                      Real-time comparison with traditional market prices across Ghana
                    </p>
                  </div>
                  <div className="p-0">
                    <PriceTable 
                      data={localMarketData} 
                      title=""
                      showRegion={true}
                      showGrade={true}
                    />
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* GCX vs Local Market Trend Chart */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      GCX vs Local Market Trends (10 Days)
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compare GCX commodity prices with traditional local markets in Ghana
                    </p>
                  </div>
                  
                  <ProfessionalChart
                    data={comparisonChartData}
                    title=""
                    type="line"
                    series={[
                      { key: 'GCX Maize', name: 'GCX Maize', color: '#3b82f6' },
                      { key: 'Local Maize', name: 'Local Maize', color: '#ef4444' },
                      { key: 'GCX Sorghum', name: 'GCX Sorghum', color: '#10b981' },
                      { key: 'Local Sorghum', name: 'Local Sorghum', color: '#f59e0b' },
                      { key: 'GCX Soya', name: 'GCX Soya Bean', color: '#8b5cf6' },
                      { key: 'Local Soya', name: 'Local Soya Bean', color: '#ec4899' }
                    ]}
                    height={350}
                    valueFormatter={(value) => `GHS ${value?.toLocaleString()}`}
                  />
                </div>

                {/* Price Premium Analysis */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      Price Premium Analysis - GCX vs Local Markets
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      {[
                        { 
                          exchange: 'GCX Maize vs Techiman Market', 
                          gcxPrice: '3,500', 
                          localPrice: '3,200', 
                          difference: '+300', 
                          percentage: '+8.5%', 
                          commodity: 'Maize (White)' 
                        },
                        { 
                          exchange: 'GCX Sorghum vs Tamale Market', 
                          gcxPrice: '2,890', 
                          localPrice: '2,650', 
                          difference: '+240', 
                          percentage: '+9.1%', 
                          commodity: 'Sorghum (Red)' 
                        },
                        { 
                          exchange: 'GCX Soya vs Sunyani Market', 
                          gcxPrice: '8,500', 
                          localPrice: '8,100', 
                          difference: '+400', 
                          percentage: '+4.9%', 
                          commodity: 'Soya Bean' 
                        }
                      ].map((item, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">{item.exchange}</h4>
                            <div className="px-3 py-1 rounded-lg text-sm font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {item.commodity}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <div><strong>GCX Price:</strong> GHS {item.gcxPrice}</div>
                            <div><strong>Local Market Price:</strong> GHS {item.localPrice}</div>
                            <div><strong>Premium:</strong> <span className="text-green-600">GHS {item.difference} ({item.percentage})</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Local Market Sources Overview */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Major Trading Centers in Ghana
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-400">
                    <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="font-bold text-blue-900 dark:text-blue-100">
                      Techiman Market
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Brong Ahafo Region</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Largest food market</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-600">
                    <ExternalLink className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="font-bold text-green-900 dark:text-green-100">
                      Kumasi Central
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">Ashanti Region</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">Major trading hub</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-600">
                    <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <div className="font-bold text-purple-900 dark:text-purple-100">
                      Tamale Market
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Northern Region</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Grains specialist</div>
                  </div>
                  
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-600">
                    <BarChart3 className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                    <div className="font-bold text-amber-900 dark:text-amber-100">
                      Accra Markets
                    </div>
                    <div className="text-sm text-amber-700 dark:text-amber-300">Greater Accra</div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Consumer markets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
