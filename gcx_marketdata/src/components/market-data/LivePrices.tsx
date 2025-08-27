'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Star, Eye, Bell, Share2 } from 'lucide-react';
import { Badge } from '@tremor/react';

interface CommodityPrice {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
  region: string;
  grade: string;
}

// Real GCX commodity data based on August 18th, 2025 trading
const gcxLiveData: CommodityPrice[] = [
  {
    id: '1',
    name: 'Maize',
    symbol: 'GEJWM2',
    currentPrice: 4030.00,
    previousPrice: 3980.00,
    change: 50.00,
    changePercent: 1.26,
    volume: 8000,
    lastUpdated: new Date().toLocaleTimeString(),
    region: 'Eastern',
    grade: 'Grade 1'
  },
  {
    id: '2',
    name: 'Soya Bean',
    symbol: 'GTAYSB2',
    currentPrice: 10390.00,
    previousPrice: 10250.00,
    change: 140.00,
    changePercent: 1.37,
    volume: 1850,
    lastUpdated: new Date().toLocaleTimeString(),
    region: 'Volta',
    grade: 'Grade 1'
  },
  {
    id: '3',
    name: 'Milled Rice',
    symbol: 'GBOAMSMR2',
    currentPrice: 11110.00,
    previousPrice: 11050.00,
    change: 60.00,
    changePercent: 0.54,
    volume: 500,
    lastUpdated: new Date().toLocaleTimeString(),
    region: 'Brong Ahafo',
    grade: 'Grade 1'
  },
  {
    id: '4',
    name: 'Sorghum',
    symbol: 'GTAWSO3',
    currentPrice: 1550.00,
    previousPrice: 1535.00,
    change: 15.00,
    changePercent: 0.98,
    volume: 1200,
    lastUpdated: new Date().toLocaleTimeString(),
    region: 'Volta',
    grade: 'Grade 1'
  },
  {
    id: '5',
    name: 'Sesame',
    symbol: 'GSAWSS4',
    currentPrice: 3200.00,
    previousPrice: 3180.00,
    change: 20.00,
    changePercent: 0.63,
    volume: 300,
    lastUpdated: new Date().toLocaleTimeString(),
    region: 'Upper East',
    grade: 'Grade 1'
  }
];

export default function LivePrices() {
  const [prices, setPrices] = useState<CommodityPrice[]>(gcxLiveData);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => ({
          ...price,
          lastUpdated: new Date().toLocaleTimeString(),
          // Simulate small price movements
          currentPrice: price.currentPrice + (Math.random() - 0.5) * 2,
          change: price.currentPrice - price.previousPrice,
          changePercent: ((price.currentPrice - price.previousPrice) / price.previousPrice) * 100
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GH').format(num);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('1') || grade.includes('Premium')) return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
    if (grade.includes('2')) return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
    if (grade.includes('3')) return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700';
    if (grade.includes('4')) return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700';
    return 'bg-gray-100 text-foreground border-border bg-muted';
  };

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(fav => fav !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="space-y-4">
      {prices.map((price) => (
        <div key={price.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-all duration-200">
          {/* Left side - Symbol and Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(price.symbol)}
                className="text-muted-foreground hover:text-yellow-500 transition-colors"
                title={favorites.includes(price.symbol) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star className={`w-4 h-4 ${favorites.includes(price.symbol) ? 'text-yellow-500 fill-current' : ''}`} />
              </button>
              <div className="text-left">
                <div className="font-bold text-card-foreground text-sm">{price.symbol}</div>
                <div className="text-xs text-muted-foreground">{price.name}</div>
              </div>
            </div>
            
            <div className="text-left">
              <div className="text-xs text-muted-foreground">Region</div>
              <div className="text-sm font-medium text-card-foreground">{price.region}</div>
            </div>
            
            <Badge className={`text-xs border ${getGradeColor(price.grade)}`}>
              {price.grade}
            </Badge>
          </div>

          {/* Center - Price and Change */}
          <div className="text-center">
            <div className="text-lg font-bold text-card-foreground">
              {formatPrice(price.currentPrice)}
            </div>
            <div className="flex items-center justify-center space-x-1 mt-1">
              {getChangeIcon(price.changePercent)}
              <span className={`text-sm font-medium ${getChangeColor(price.changePercent)}`}>
                {price.changePercent >= 0 ? '+' : ''}{price.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {price.change >= 0 ? '+' : ''}{formatPrice(price.change)}
            </div>
          </div>

          {/* Right side - Volume and Actions */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="text-sm font-medium text-card-foreground">{formatNumber(price.volume)} tons</div>
              <div className="text-xs text-muted-foreground">{price.lastUpdated}</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="View details">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Set alert">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
