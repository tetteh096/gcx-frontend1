'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, RefreshCw, BarChart3, 
  Calendar, Info, Clock, Target, Activity, AlertTriangle, CheckCircle, FileText
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import PriceTable from '@/components/market-data/PriceTable';
import ProfessionalChart from '@/components/market-data/ProfessionalChart';
import MarketSummary from '@/components/market-data/MarketSummary';

// Comprehensive GCX Commodity Spot Price Data
const gcxPriceData = [
  {
    symbol: 'GAPWM2',
    commodity: 'Maize - White Grade 1',
    lastPrice: 1880.50,
    bid: 1878.25,
    ask: 1882.75,
    change: 15.50,
    changePercent: 0.83,
    volume: 2500,
    high: 1895.00,
    low: 1865.00,
    time: '16:35 Local Time',
    
    region: 'Greater Accra',
    grade: 'Grade 1'
  },
  {
    symbol: 'GEJWM2',
    commodity: 'Maize - White Grade 2',
    lastPrice: 4030.00,
    bid: 4025.50,
    ask: 4034.50,
    change: 45.25,
    changePercent: 1.14,
    volume: 1800,
    high: 4055.00,
    low: 3995.00,
    time: '16:35 Local Time',
    region: 'Eastern',
    grade: 'Grade 2'
  },
  {
    symbol: 'GKUYSB3',
    commodity: 'Soya Bean - Grade 1',
    lastPrice: 7418.00,
    bid: 7410.00,
    ask: 7426.00,
    change: 125.50,
    changePercent: 1.72,
    volume: 800,
    high: 7450.00,
    low: 7380.00,
    time: '16:35 Local Time',
    region: 'Northern',
    grade: 'Grade 1'
  },
  {
    symbol: 'GTAYSB2',
    commodity: 'Soya Bean - Standard',
    lastPrice: 10390.00,
    bid: 10375.00,
    ask: 10405.00,
    change: 285.75,
    changePercent: 2.83,
    volume: 600,
    high: 10420.00,
    low: 10325.00,
    time: '16:35 Local Time',
    region: 'Volta',
    grade: 'Standard'
  },
  {
    symbol: 'GBOAMR2',
    commodity: 'Milled Rice - Jasmine',
    lastPrice: 11110.00,
    bid: 11095.00,
    ask: 11125.00,
    change: 165.50,
    changePercent: 1.51,
    volume: 500,
    high: 11145.00,
    low: 11065.00,
    time: '16:35 Local Time',
    region: 'Brong Ahafo',
    grade: 'Grade 1'
  },
  {
    symbol: 'GTAWSO3',
    commodity: 'Sorghum - Red Variety',
    lastPrice: 1550.00,
    bid: 1547.50,
    ask: 1552.50,
    change: 32.25,
    changePercent: 2.13,
    volume: 1200,
    high: 1565.00,
    low: 1535.00,
    time: '16:35 Local Time',
    region: 'Volta',
    grade: 'Standard'
  }
];

// Professional GCX Index History - with proper line separation
const gcxIndexHistory = [
  { date: '2025-01-20', 'GCX Index': 411.25, 'External Benchmark': 425.80, 'Volume': 12500 },
  { date: '2025-01-21', 'GCX Index': 413.50, 'External Benchmark': 427.20, 'Volume': 13200 },
  { date: '2025-01-22', 'GCX Index': 409.75, 'External Benchmark': 423.90, 'Volume': 11800 },
  { date: '2025-01-23', 'GCX Index': 411.50, 'External Benchmark': 425.30, 'Volume': 14100 },
  { date: '2025-01-24', 'GCX Index': 415.25, 'External Benchmark': 429.60, 'Volume': 15600 },
  { date: '2025-01-25', 'GCX Index': 412.80, 'External Benchmark': 426.90, 'Volume': 13900 },
  { date: '2025-01-26', 'GCX Index': 411.50, 'External Benchmark': 425.75, 'Volume': 12800 },
  { date: '2025-01-27', 'GCX Index': 413.20, 'External Benchmark': 427.85, 'Volume': 14500 },
  { date: '2025-01-28', 'GCX Index': 410.90, 'External Benchmark': 425.20, 'Volume': 13100 },
  { date: '2025-01-29', 'GCX Index': 411.50, 'External Benchmark': 425.80, 'Volume': 12700 }
];

// Trading Recommendations for Spot Commodities
const tradingRecommendations = [
  {
    symbol: 'GAPWM2',
    commodity: 'Maize - White Grade 1',
    recommendation: 'BUY',
    signal: 'Prices are expected to increase soon due to supply-demand dynamics',
    lastUpdated: 'Jan 27, 2025',
    changedFrom: 'NEUTRAL',
    changeDate: 'Jan 15, 2025',
    targetPrice: 1950.00,
    stopLoss: 1820.00,
    confidence: 'High'
  },
  {
    symbol: 'GKUYSB3',
    commodity: 'Soya Bean - Grade 1',
    recommendation: 'HOLD',
    signal: 'Current levels are fair value, monitor for export demand signals',
    lastUpdated: 'Jan 27, 2025',
    changedFrom: 'BUY',
    changeDate: 'Jan 12, 2025',
    targetPrice: 7600.00,
    stopLoss: 7200.00,
    confidence: 'Medium'
  }
];

// Market Summary Data
const marketSummaryData = [
  {
    title: 'GCX Index Value',
    value: '411.50',
    change: 0.75,
    changePercent: 0.18,
    subtitle: 'Live Index',
    icon: 'chart',
    color: 'blue'
  },
  {
    title: 'Total Volume',
    value: '12,750',
    change: 850,
    changePercent: 7.15,
    subtitle: 'Contracts Today',
    icon: 'volume',
    color: 'green'
  },
  {
    title: 'Active Contracts',
    value: '23',
    subtitle: 'Futures & Spots',
    icon: 'activity',
    color: 'purple'
  },
  {
    title: 'Market Status',
    value: 'OPEN',
    subtitle: 'Trading Active',
    icon: 'target',
    color: 'green'
  }
];

export default function GCXIndexPage() {
  const { isCollapsed } = useSidebar();
  const [selectedPeriod, setSelectedPeriod] = useState('Past Year');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'bg-green-100 text-green-800 border-green-200';
      case 'SELL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
            <div className="w-full px-6 lg:px-8 py-6">
              {/* Professional Header like Corn Dashboard */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-foreground">
                        GCX Commodity Index: Price
                      </h1>
                                                 <div className="text-sm text-muted-foreground">
                             January 27, 2025
                           </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-blue-600 dark:text-blue-400">
                      <span>Home</span>
                      <span>/</span>
                      <span>GCX</span>
                      <span>/</span>
                      <span>Index</span>
                    </div>
                  </div>
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-medium">Refresh</span>
                  </button>
                </div>
              </div>

              {/* Market Summary Cards */}
              <div className="mb-6">
                <MarketSummary data={marketSummaryData} title="" />
              </div>

              {/* Main Content Grid - Index Value & Trading Recommendation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Index Value (like Corn Futures price) */}
                <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-card-foreground">
                      GCX Commodity Index, Spot Prices (GCX=I)
                    </h3>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-5xl font-bold text-card-foreground mb-2">
                      411.50
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium">0.18%</span>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium">$0.75</span>
                    </div>
                  </div>

                                           <div className="text-sm text-muted-foreground space-y-1">
                           <div>Last Updated: Jan 27, 2025 16:35 Local Time</div>
                           <div>52-week range: 365.50 - 425.80</div>
                         </div>
                </div>

                {/* Trading Recommendation (like your BUY recommendation) */}
                <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">
                    Our Trading Recommendation
                  </h3>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg border-2 text-2xl font-bold mb-4 ${getRecommendationColor('BUY')}`}>
                    <TrendingUp className="w-6 h-6 mr-2" />
                    BUY
                  </div>

                                     <div className="bg-secondary border border-border rounded-lg p-3 mb-4">
                     <div className="flex items-center text-primary text-sm">
                       <TrendingUp className="w-4 h-4 mr-2" />
                       Prices are expected to increase soon due to supply-demand dynamics
                     </div>
                   </div>

                                           <div className="text-sm text-muted-foreground space-y-1">
                           <div>Last Updated: Jan 27, 2025</div>
                           <div>Changed from <strong>NEUTRAL</strong> on Jan 15, 2025</div>
                         </div>
                </div>

                {/* About Trading Recommendation */}
                <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                  <h3 className="text-lg font-bold text-card-foreground mb-4">
                    About our Trading Recommendation
                  </h3>
                  
                                     <div className="text-sm text-muted-foreground space-y-3">
                     <p>
                       Our trading signals are based on comprehensive market analysis including supply-demand 
                       dynamics, seasonal patterns, and regional price variations. Please conduct your own 
                       research before making trading decisions.
                     </p>
                    
                    <div className="pt-2">
                      <a href="#" className="text-primary hover:underline text-sm">
                        Risk Disclosure Statement
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Price Table */}
              <div className="mb-6">
                <PriceTable 
                  data={gcxPriceData} 
                  title="GCX Commodity Spot Prices"
                  showRegion={true}
                  showGrade={true}
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Index Performance Chart (like WA%R chart) */}
                <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                  <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                                                   <h3 className="text-lg font-bold text-card-foreground">
                             GCX Index Performance Analysis
                           </h3>
                           <p className="text-sm text-muted-foreground">
                             Track GCX Index performance against external market benchmarks for price discovery and market positioning.
                           </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input type="radio" name="period" value="Past Month" className="text-blue-600" />
                          <label className="text-sm text-foreground">Past Month</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" name="period" value="Past 6 Months" className="text-blue-600" />
                          <label className="text-sm text-foreground">Past 6 Months</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" name="period" value="Past Year" defaultChecked className="text-primary" />
                          <label className="text-sm text-muted-foreground">Past Year</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ProfessionalChart
                    data={gcxIndexHistory}
                    title=""
                    type="line"
                    series={[
                      { key: 'GCX Index', name: 'GCX Index', color: '#3b82f6' },
                      { key: 'External Benchmark', name: 'External Benchmark', color: '#f59e0b' }
                    ]}
                    height={300}
                    valueFormatter={(value) => value?.toFixed(2)}
                  />
                  
                                     <div className="px-6 py-3 bg-muted border-t border-border">
                     <div className="flex items-center justify-between text-xs text-muted-foreground">
                       <span>AVG: 16.9% MAX: 33% MIN: 0.3%</span>
                       <span>2025</span>
                     </div>
                   </div>
                </div>

                {/* Regional Price Variations - Same Commodity Across Regions */}
                <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                  <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                    <h3 className="text-lg font-bold text-card-foreground">
                      Regional Price Variations - Maize Across Regions
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compare Maize prices across different regions for arbitrage opportunities
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-muted-foreground">Region</th>
                            <th className="text-right py-2 text-muted-foreground">Price (GHS)</th>
                            <th className="text-right py-2 text-muted-foreground">Symbol</th>
                            <th className="text-right py-2 text-muted-foreground">Change</th>
                            <th className="text-right py-2 text-muted-foreground">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="py-3 text-card-foreground">Greater Accra</td>
                            <td className="py-3 text-right text-card-foreground">GHS 1,880</td>
                            <td className="py-3 text-right text-muted-foreground">GAPWM2</td>
                            <td className="py-3 text-right text-green-600">+15.50 (0.83%)</td>
                            <td className="py-3 text-right text-muted-foreground">Grade 1</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-card-foreground">Eastern</td>
                            <td className="py-3 text-right text-card-foreground">GHS 4,030</td>
                            <td className="py-3 text-right text-muted-foreground">GEJWM2</td>
                            <td className="py-3 text-right text-green-600">+45.25 (1.14%)</td>
                            <td className="py-3 text-right text-muted-foreground">Grade 2</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-card-foreground">Ashanti</td>
                            <td className="py-3 text-right text-card-foreground">GHS 3,970</td>
                            <td className="py-3 text-right text-muted-foreground">GKIWM3</td>
                            <td className="py-3 text-right text-green-600">+58.60 (1.50%)</td>
                            <td className="py-3 text-right text-muted-foreground">Grade 1</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-card-foreground">Northern</td>
                            <td className="py-3 text-right text-card-foreground">GHS 4,645</td>
                            <td className="py-3 text-right text-muted-foreground">GKUWM2</td>
                            <td className="py-3 text-right text-green-600">+41.25 (0.90%)</td>
                            <td className="py-3 text-right text-muted-foreground">Grade 2</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-card-foreground">Volta</td>
                            <td className="py-3 text-right text-card-foreground">GHS 3,850</td>
                            <td className="py-3 text-right text-muted-foreground">GTAWM2</td>
                            <td className="py-3 text-right text-red-600">-11.60 (-0.30%)</td>
                            <td className="py-3 text-right text-muted-foreground">Grade 1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Arbitrage Summary */}
                    <div className="mt-4 p-4 bg-secondary border border-border rounded-lg">
                      <div className="text-sm text-primary">
                        <strong>Best Arbitrage Opportunity:</strong> Buy in Volta (GHS 3,850) → Sell in Northern (GHS 4,645) = <strong>GHS 795 profit</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Recommendations Section */}
              <div className="mb-6">
                <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
                  <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
                    <h3 className="text-lg font-bold text-card-foreground">
                      Active Trading Recommendations
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tradingRecommendations.map((rec, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-card-foreground">{rec.symbol}</h4>
                              <p className="text-sm text-muted-foreground">{rec.commodity}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-lg border-2 font-bold ${getRecommendationColor(rec.recommendation)}`}>
                              {rec.recommendation}
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-3">
                            {rec.signal}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-muted-foreground">Target:</span>
                              <span className="ml-2 font-medium text-foreground">
                                {new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(rec.targetPrice)}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Stop Loss:</span>
                              <span className="ml-2 font-medium text-foreground">
                                {new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(rec.stopLoss)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Updated:</span>
                              <span className="ml-2 font-medium">{rec.lastUpdated}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Confidence:</span>
                              <span className="ml-2 font-medium">{rec.confidence}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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
