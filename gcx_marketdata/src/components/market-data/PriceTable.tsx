'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Clock, Volume2 } from 'lucide-react';

interface PriceData {
  symbol: string;
  commodity: string;
  lastPrice: number;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  time: string;
  region?: string;
  grade?: string;
}

interface PriceTableProps {
  data: PriceData[];
  title: string;
  showRegion?: boolean;
  showGrade?: boolean;
}

export default function PriceTable({ data, title, showRegion = false, showGrade = false }: PriceTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GH').format(num);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 bg-green-50';
    if (change < 0) return 'text-red-600 bg-red-50';
    return 'text-muted-foreground bg-muted';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown;
  };

  const getBidAskSpread = (bid: number, ask: number) => {
    return ((ask - bid) / bid * 100).toFixed(2);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-muted to-muted/50 px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">Real-time commodity prices</p>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">LIVE</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Symbol / Commodity
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Last Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Bid
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Ask
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Spread
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                High / Low
              </th>
              {showRegion && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Region
                </th>
              )}
              {showGrade && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Grade
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {data.map((item, index) => {
              const ChangeIcon = getChangeIcon(item.change);
              return (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  {/* Symbol / Commodity */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-bold text-card-foreground">{item.symbol}</div>
                      <div className="text-xs text-muted-foreground">{item.commodity}</div>
                    </div>
                  </td>

                  {/* Last Price */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-lg font-bold text-card-foreground">
                      {formatCurrency(item.lastPrice)}
                    </div>
                  </td>

                  {/* Bid */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-blue-600">
                      {formatCurrency(item.bid)}
                    </div>
                  </td>

                  {/* Ask */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-red-600">
                      {formatCurrency(item.ask)}
                    </div>
                  </td>

                  {/* Spread */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-xs font-medium text-muted-foreground">
                      {getBidAskSpread(item.bid, item.ask)}%
                    </div>
                  </td>

                  {/* Change */}
                  <td className="px-6 py-4 text-right">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${getChangeColor(item.change)}`}>
                      <ChangeIcon className="w-3 h-3" />
                      <span>{formatCurrency(item.change)}</span>
                      <span>({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
                    </div>
                  </td>

                  {/* Volume */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Volume2 className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium text-card-foreground">
                        {formatNumber(item.volume)}
                      </span>
                    </div>
                  </td>

                  {/* High / Low */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-xs">
                      <div className="text-green-600 font-medium">
                        H: {formatCurrency(item.high)}
                      </div>
                      <div className="text-red-600 font-medium">
                        L: {formatCurrency(item.low)}
                      </div>
                    </div>
                  </td>

                  {/* Region */}
                  {showRegion && (
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-muted-foreground">
                        {item.region}
                      </div>
                    </td>
                  )}

                  {/* Grade */}
                  {showGrade && (
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-muted-foreground">
                        {item.grade}
                      </div>
                    </td>
                  )}

                  {/* Time */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-muted px-6 py-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {data.length} commodities</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
