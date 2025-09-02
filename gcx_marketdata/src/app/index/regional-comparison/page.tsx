'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, TrendingUp, TrendingDown, Filter, RefreshCw, 
  ArrowUpRight, ArrowDownRight, DollarSign, Percent, 
  Target, Activity, CheckCircle
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import PriceTable from '@/components/market-data/PriceTable';
import ProfessionalChart from '@/components/market-data/ProfessionalChart';
import MarketSummary from '@/components/market-data/MarketSummary';



// Market Summary for Regional Comparison - will be calculated dynamically
const getRegionalMarketSummary = (availableRegions: RegionalPriceItem[], arbitrage: any) => [
  {
    title: 'Active Regions',
    value: availableRegions.length.toString(),
    subtitle: 'Trading Regions',
    icon: 'target' as const,
    color: 'blue' as const
  },
  {
    title: 'Price Spread',
    value: arbitrage ? `${arbitrage.profitPercent}%` : '0%',
    change: arbitrage ? Math.round(arbitrage.profit / 100) : 0,
    changePercent: arbitrage ? parseFloat(arbitrage.profitPercent) : 0,
    subtitle: 'Max vs Min',
    icon: 'activity' as const,
    color: 'purple' as const
  },
  {
    title: 'Best Arbitrage',
    value: arbitrage ? `GHS ${arbitrage.profit.toLocaleString()}` : 'GHS 0',
    change: arbitrage ? Math.round(arbitrage.profit / 100) : 0,
    changePercent: arbitrage ? parseFloat(arbitrage.profitPercent) : 0,
    subtitle: 'Profit Opportunity',
    icon: 'dollar' as const,
    color: 'green' as const
  },
  {
    title: 'Total Volume',
    value: availableRegions.reduce((sum: number, item: RegionalPriceItem) => sum + (Math.floor(Math.random() * 2000) + 500), 0).toLocaleString(),
    change: 1250,
    changePercent: 10.9,
    subtitle: 'Tons Today',
    icon: 'volume' as const,
    color: 'indigo' as const
  }
];

// Type definitions
interface RegionalPriceItem {
  region: string;
  price: number;
  symbol: string;
  grade: string;
  change: string;
}

type CommodityType = 'Maize' | 'Soya Bean' | 'Rice';

// Comprehensive regional price data for each commodity
const regionalPriceData: Record<CommodityType, RegionalPriceItem[]> = {
  'Maize': [
    { region: 'Greater Accra', price: 1880, symbol: 'GAPWM2', grade: 'Grade 1', change: '+15.50 (0.83%)' },
    { region: 'Eastern', price: 4030, symbol: 'GEJWM2', grade: 'Grade 2', change: '+45.25 (1.14%)' },
    { region: 'Ashanti', price: 3970, symbol: 'GKIWM3', grade: 'Grade 1', change: '+58.60 (1.50%)' },
    { region: 'Northern', price: 4645, symbol: 'GKUWM2', grade: 'Grade 2', change: '+41.25 (0.90%)' },
    { region: 'Volta', price: 3850, symbol: 'GTAWM2', grade: 'Grade 1', change: '-11.60 (-0.30%)' },
    { region: 'Upper East', price: 4200, symbol: 'GUEWM1', grade: 'Grade 1', change: '+32.40 (0.78%)' },
    { region: 'Brong Ahafo', price: 3900, symbol: 'GBRWM2', grade: 'Grade 2', change: '+28.90 (0.75%)' },
    { region: 'Upper West', price: 4100, symbol: 'GUWWM1', grade: 'Grade 1', change: '+45.20 (1.12%)' }
  ],
  'Soya Bean': [
    { region: 'Greater Accra', price: 0, symbol: 'N/A', grade: 'N/A', change: 'N/A' },
    { region: 'Eastern', price: 0, symbol: 'N/A', grade: 'N/A', change: 'N/A' },
    { region: 'Ashanti', price: 8500, symbol: 'GASB1', grade: 'Grade 1', change: '+125.50 (1.50%)' },
    { region: 'Northern', price: 7418, symbol: 'GKYSB3', grade: 'Grade 1', change: '+203.10 (2.80%)' },
    { region: 'Volta', price: 10390, symbol: 'GTAYSB2', grade: 'Grade 2', change: '+285.75 (2.83%)' },
    { region: 'Upper East', price: 8200, symbol: 'GUESB1', grade: 'Grade 1', change: '+156.80 (1.95%)' },
    { region: 'Brong Ahafo', price: 7800, symbol: 'GBRSB2', grade: 'Grade 2', change: '+98.40 (1.28%)' },
    { region: 'Upper West', price: 7418, symbol: 'GUWSB1', grade: 'Grade 1', change: '+167.20 (2.31%)' }
  ],
  'Rice': [
    { region: 'Greater Accra', price: 0, symbol: 'N/A', grade: 'N/A', change: 'N/A' },
    { region: 'Eastern', price: 11200, symbol: 'GERI1', grade: 'Grade 1', change: '+165.50 (1.50%)' },
    { region: 'Ashanti', price: 0, symbol: 'N/A', grade: 'N/A', change: 'N/A' },
    { region: 'Northern', price: 10800, symbol: 'GKURI2', grade: 'Grade 2', change: '+142.30 (1.33%)' },
    { region: 'Volta', price: 11500, symbol: 'GTARI1', grade: 'Grade 1', change: '+185.60 (1.64%)' },
    { region: 'Upper East', price: 10900, symbol: 'GUERI1', grade: 'Grade 1', change: '+156.80 (1.46%)' },
    { region: 'Brong Ahafo', price: 11110, symbol: 'GBOAMR2', grade: 'Grade 1', change: '+165.50 (1.51%)' },
    { region: 'Upper West', price: 0, symbol: 'N/A', grade: 'N/A', change: 'N/A' }
  ]
};

// Date ranges for filtering
const dateRanges = [
  { label: 'Today', value: 'today', days: 1 },
  { label: 'Past Week', value: 'week', days: 7 },
  { label: 'Past Month', value: 'month', days: 30 },
  { label: 'Past 3 Months', value: 'quarter', days: 90 }
];

export default function RegionalComparisonPage() {
  const { isCollapsed } = useSidebar();
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityType>('Maize');
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Get current commodity data
  const currentCommodityData = regionalPriceData[selectedCommodity] || [];
  
  // Filter out regions with no data (price = 0)
  const availableRegions = currentCommodityData.filter((item: RegionalPriceItem) => item.price > 0);
  
  // Calculate arbitrage opportunities
  const calculateArbitrage = () => {
    if (availableRegions.length < 2) return null;
    
    const sortedByPrice = [...availableRegions].sort((a, b) => a.price - b.price);
    const lowest = sortedByPrice[0];
    const highest = sortedByPrice[sortedByPrice.length - 1];
    
    return {
      buyRegion: lowest.region,
      buyPrice: lowest.price,
      sellRegion: highest.region,
      sellPrice: highest.price,
      profit: highest.price - lowest.price,
      profitPercent: ((highest.price - lowest.price) / lowest.price * 100).toFixed(1)
    };
  };
  
  const arbitrage = calculateArbitrage();
  
  // Prepare chart data for the selected commodity
  const chartData = availableRegions.map(item => ({
    date: item.region, // ProfessionalChart expects 'date' as X-axis key
    price: item.price,
    symbol: item.symbol,
    grade: item.grade
  }));

  // Debug logging
  console.log('Selected Commodity:', selectedCommodity);
  console.log('Available Regions:', availableRegions);
  console.log('Chart Data:', chartData);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
            <div className="w-full px-6 lg:px-8 py-8">
              {/* Enhanced Professional Header with Gradient */}
              <div className="mb-8">
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30l10-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                  
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h1 className="text-4xl font-bold text-white drop-shadow-sm">
                            Regional Price Intelligence
                          </h1>
                          <p className="text-xl text-white/90 mt-1">
                            Cross-Regional Arbitrage Analysis • Real-time Opportunities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-white/80">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Home</span>
                        <span>/</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Index</span>
                        <span>/</span>
                        <span className="bg-white/30 px-3 py-1 rounded-full text-sm font-medium">Regional Analysis</span>
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
                  

                </div>
              </div>

              {/* Enhanced Market Summary Cards */}
              <div className="mb-8">
                <MarketSummary data={getRegionalMarketSummary(availableRegions, arbitrage)} title="" />
              </div>

              {/* Enhanced Commodity & Date Selection */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Market Intelligence Dashboard
                    </h2>
                    <p className="text-indigo-100">
                      Select commodity and timeframe for comprehensive regional analysis
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                          <div className="bg-indigo-100 rounded-full p-2">
                            <Filter className="w-5 h-5 text-indigo-600" />
                          </div>
                          <span>Commodity Selection</span>
                        </h3>
                        <select 
                          value={selectedCommodity}
                          onChange={(e) => setSelectedCommodity(e.target.value as CommodityType)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 transition-all duration-300"
                        >
                          <option value="Maize">🌽 Maize - White Grade 1</option>
                          <option value="Soya Bean">🫘 Soya Bean - Grade 1</option>
                          <option value="Rice">🌾 Milled Rice - Jasmine</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                          <div className="bg-purple-100 rounded-full p-2">
                            <Activity className="w-5 h-5 text-purple-600" />
                          </div>
                          <span>Time Period</span>
                        </h3>
                        <select 
                          value={selectedDateRange}
                          onChange={(e) => setSelectedDateRange(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 transition-all duration-300"
                        >
                          {dateRanges.map(range => (
                            <option key={range.value} value={range.value}>
                              📅 {range.label}
                            </option>
                         ))}
                       </select>
                     </div>
                   </div>
                   
                   <div className="mt-4 text-center">
                     <div className="text-sm text-gray-600">Currently Analyzing</div>
                     <div className="text-2xl font-bold text-gray-900">
                       {selectedCommodity} across {availableRegions.length} regions
                     </div>
                     <div className="text-sm text-gray-500 mt-1">
                       Data for {dateRanges.find(r => r.value === selectedDateRange)?.label.toLowerCase()}
                     </div>
                   </div>
                 </div>
               </div>

              {/* Arbitrage Opportunity Alert */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="text-xl font-bold text-green-900">
                          Best Arbitrage Opportunity
                        </h3>
                        <p className="text-green-700 mt-1">
                          Buy {selectedCommodity} in <strong>Greater Accra</strong> at GHS 1,880, 
                          sell in <strong>Northern</strong> at GHS 4,645
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-200">
                            <span className="text-green-800 font-bold">
                              Potential Profit: GHS 2,765
                            </span>
                          </div>
                          <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                            <span className="text-blue-800 font-bold">
                              147% margin
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Price Table */}
              <div className="mb-6">
                <PriceTable 
                  data={availableRegions.map(item => ({
                    symbol: item.symbol,
                    commodity: `${selectedCommodity} - ${item.grade}`,
                    lastPrice: item.price,
                    bid: item.price * 0.995,
                    ask: item.price * 1.005,
                    change: 0,
                    changePercent: 0,
                    volume: Math.floor(Math.random() * 2000) + 500,
                    high: item.price * 1.02,
                    low: item.price * 0.98,
                    time: '16:35 Local Time',
                    region: item.region,
                    grade: item.grade
                  }))}
                  title={`${selectedCommodity} Regional Price Comparison - ${dateRanges.find(r => r.value === selectedDateRange)?.label}`}
                  showRegion={true}
                  showGrade={true}
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Regional Price Comparison Chart */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedCommodity} Prices Across Regions
                    </h3>
                    <p className="text-sm text-gray-600">
                      Compare {selectedCommodity} prices across {availableRegions.length} trading regions for {dateRanges.find(r => r.value === selectedDateRange)?.label.toLowerCase()}
                    </p>
                  </div>
                  
                   {chartData.length > 0 ? (
                     <ProfessionalChart
                       data={chartData}
                       title=""
                       type="bar"
                       series={[
                         { key: 'price', name: selectedCommodity, color: '#3b82f6' }
                       ]}
                       height={350}
                       valueFormatter={(value) => `GHS ${value?.toLocaleString()}`}
                     />
                   ) : (
                     <div className="p-6 flex items-center justify-center h-[350px] text-gray-500">
                       No data available for {selectedCommodity}
                     </div>
                   )}
                </div>

                {/* Price Spread Analysis */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                      Regional Price Analysis
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                                              {(() => {
                          const currentData = regionalPriceData[selectedCommodity] || [];
                          const availableData = currentData.filter((item: RegionalPriceItem) => item.price > 0);
                          if (availableData.length < 2) return null;
                          
                          const sortedByPrice = [...availableData].sort((a: RegionalPriceItem, b: RegionalPriceItem) => a.price - b.price);
                          const lowest = sortedByPrice[0];
                          const highest = sortedByPrice[sortedByPrice.length - 1];
                          const spread = ((highest.price - lowest.price) / lowest.price * 100).toFixed(1);
                          
                          return (
                            <div key="current" className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-gray-900">{selectedCommodity}</h4>
                                <div className="px-3 py-1 rounded-lg text-sm font-bold bg-blue-100 text-blue-800">
                                  {spread}% spread
                                </div>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div><strong>Highest:</strong> {highest.region} (GHS {highest.price.toLocaleString()})</div>
                                <div><strong>Lowest:</strong> {lowest.region} (GHS {lowest.price.toLocaleString()})</div>
                              </div>
                            </div>
                          );
                        })()}
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Regional Trading Insights */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    Regional Trading Insights
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-blue-900">
                        {arbitrage ? arbitrage.buyRegion : 'Best Region'}
                      </div>
                      <div className="text-sm text-blue-700">Best for Buying</div>
                      <div className="text-xs text-blue-600 mt-1">
                        {arbitrage ? `GHS ${arbitrage.buyPrice.toLocaleString()}` : 'Lowest prices'}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-green-900">
                        {arbitrage ? arbitrage.sellRegion : 'Best Region'}
                      </div>
                      <div className="text-sm text-green-700">Best for Selling</div>
                      <div className="text-xs text-green-600 mt-1">
                        {arbitrage ? `GHS ${arbitrage.sellPrice.toLocaleString()}` : 'Highest prices'}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-bold text-purple-900">
                        {availableRegions.length} Active Regions
                      </div>
                      <div className="text-sm text-purple-700">Trading Network</div>
                      <div className="text-xs text-purple-600 mt-1">
                        {availableRegions.reduce((sum: number, item: RegionalPriceItem) => sum + (Math.floor(Math.random() * 2000) + 500), 0).toLocaleString()} tons volume
                      </div>
                    </div>
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
