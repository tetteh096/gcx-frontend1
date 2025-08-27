'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load TradingView script');
      setHasError(true);
      setIsLoading(false);
    };
    script.onload = () => {
      if (window.TradingView && container.current) {
        try {
          new window.TradingView.widget({
            autosize: true,
            symbol: 'NASDAQ:AAPL', // Use a valid symbol for testing
            interval: 'D',
            timezone: 'Africa/Accra',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_widget',
            width: '100%',
            height: '100%',
            studies: [
              'RSI@tv-basicstudies',
              'MACD@tv-basicstudies'
            ],
            disabled_features: [
              'use_localstorage_for_settings'
            ],
            enabled_features: [
              'study_templates'
            ]
          });
          setIsLoading(false);
        } catch (error) {
          console.error('TradingView widget initialization failed:', error);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="h-96 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Trading Chart</h3>
        <p className="text-sm text-gray-600">
          Professional charting with technical analysis tools
        </p>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading chart...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600">Failed to load chart</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-blue-600 hover:text-blue-500 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {!isLoading && !hasError && (
        <div 
          id="tradingview_widget" 
          ref={container}
          className="w-full h-full"
          style={{ height: 'calc(100% - 80px)' }}
        />
      )}
    </div>
  );
}
