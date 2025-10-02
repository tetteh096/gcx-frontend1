import axios from 'axios'

// Firebase endpoint base URL
const FIREBASE_BASE_URL = 'https://sserp-gcx-webservices-default-rtdb.firebaseio.com/7fc5499a-eccb-4bab-aa52-6ac0269a9dc3/marketdata'

// Market Data Types
export interface ClosingPriceData {
  ClosingPrice: string
  Commodity: string
  HighPrice: string
  LastTradeDate: string
  LowPrice: string
  OpeningPrice: string
  PriceChange: string
  Symbol: string
}

export interface CommoditySymbolData {
  Commodity: string
  DeliveryCentre: string
  Grade: string
}

export interface MarketDataResponse {
  data: Record<string, ClosingPriceData>
  header: {
    timestamp: string
  }
}

export interface ProcessedMarketData extends ClosingPriceData {
  DeliveryCentre?: string
  Grade?: string
  priceChangePercent?: number
  formattedPrice?: string
  isPositiveChange?: boolean
}

class MarketDataService {
  private readonly axiosInstance = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /**
   * Fetch closing prices from Firebase
   */
  async getClosingPrices(): Promise<MarketDataResponse> {
    try {
      const response = await this.axiosInstance.get<MarketDataResponse>(
        `${FIREBASE_BASE_URL}/closing_prices.json`
      )
      
      console.log('✅ Market data fetched successfully:', response.data.header?.timestamp)
      return response.data
    } catch (error) {
      console.error('❌ Error fetching closing prices:', error)
      throw new Error('Failed to fetch market data. Please try again later.')
    }
  }

  /**
   * Fetch commodity symbols from Firebase
   */
  async getCommoditySymbols(): Promise<Record<string, CommoditySymbolData>> {
    try {
      const response = await this.axiosInstance.get<Record<string, CommoditySymbolData>>(
        `${FIREBASE_BASE_URL}/commodity_symbols.json`
      )
      
      console.log('✅ Commodity symbols fetched successfully')
      return response.data
    } catch (error) {
      console.error('❌ Error fetching commodity symbols:', error)
      throw new Error('Failed to fetch commodity symbols. Please try again later.')
    }
  }

  /**
   * Get combined market data with symbol information
   */
  async getCombinedMarketData(): Promise<ProcessedMarketData[]> {
    try {
      const [closingPricesResponse, commoditySymbols] = await Promise.all([
        this.getClosingPrices(),
        this.getCommoditySymbols()
      ])

      const combinedData: ProcessedMarketData[] = []

      Object.entries(closingPricesResponse.data).forEach(([symbol, priceData]) => {
        const symbolInfo = commoditySymbols[symbol]
        
        // Calculate price change percentage
        const openingPrice = parseFloat(priceData.OpeningPrice) || 0
        const priceChange = parseFloat(priceData.PriceChange) || 0
        const priceChangePercent = openingPrice > 0 ? (priceChange / openingPrice) * 100 : 0

        const processedData: ProcessedMarketData = {
          ...priceData,
          DeliveryCentre: symbolInfo?.DeliveryCentre,
          Grade: symbolInfo?.Grade,
          priceChangePercent,
          formattedPrice: this.formatPrice(priceData.ClosingPrice),
          isPositiveChange: priceChange >= 0
        }

        combinedData.push(processedData)
      })

      // Sort by commodity name and then by delivery centre
      combinedData.sort((a, b) => {
        if (a.Commodity !== b.Commodity) {
          return a.Commodity.localeCompare(b.Commodity)
        }
        return (a.DeliveryCentre || '').localeCompare(b.DeliveryCentre || '')
      })

      return combinedData
    } catch (error) {
      console.error('❌ Error getting combined market data:', error)
      throw error
    }
  }

  /**
   * Get market data filtered by commodity type
   */
  async getMarketDataByCommodity(commodityType: string): Promise<ProcessedMarketData[]> {
    try {
      const allData = await this.getCombinedMarketData()
      return allData.filter(item => 
        item.Commodity.toLowerCase().includes(commodityType.toLowerCase())
      )
    } catch (error) {
      console.error('❌ Error filtering market data by commodity:', error)
      throw error
    }
  }

  /**
   * Get market data for a specific delivery centre
   */
  async getMarketDataByDeliveryCentre(centreName: string): Promise<ProcessedMarketData[]> {
    try {
      const allData = await this.getCombinedMarketData()
      return allData.filter(item => 
        item.DeliveryCentre?.toLowerCase().includes(centreName.toLowerCase())
      )
    } catch (error) {
      console.error('❌ Error filtering market data by delivery centre:', error)
      throw error
    }
  }

  /**
   * Get unique commodities list
   */
  async getUniqueCommodities(): Promise<string[]> {
    try {
      const allData = await this.getCombinedMarketData()
      const commodities = [...new Set(allData.map(item => item.Commodity))]
      return commodities.sort()
    } catch (error) {
      console.error('❌ Error getting unique commodities:', error)
      throw error
    }
  }

  /**
   * Get unique delivery centres list
   */
  async getUniqueDeliveryCentres(): Promise<string[]> {
    try {
      const allData = await this.getCombinedMarketData()
      const centres = [...new Set(allData.map(item => item.DeliveryCentre).filter(Boolean))]
      return centres.sort()
    } catch (error) {
      console.error('❌ Error getting unique delivery centres:', error)
      throw error
    }
  }

  /**
   * Search market data by symbol or commodity name
   */
  async searchMarketData(searchTerm: string): Promise<ProcessedMarketData[]> {
    try {
      const allData = await this.getCombinedMarketData()
      const term = searchTerm.toLowerCase()
      
      return allData.filter(item => 
        item.Symbol.toLowerCase().includes(term) ||
        item.Commodity.toLowerCase().includes(term) ||
        item.DeliveryCentre?.toLowerCase().includes(term)
      )
    } catch (error) {
      console.error('❌ Error searching market data:', error)
      throw error
    }
  }

  /**
   * Get market data statistics
   */
  async getMarketStatistics(): Promise<{
    totalSymbols: number
    totalCommodities: number
    totalDeliveryCentres: number
    lastUpdated: string
    topPerformers: ProcessedMarketData[]
    bottomPerformers: ProcessedMarketData[]
  }> {
    try {
      const [closingPricesResponse, allData] = await Promise.all([
        this.getClosingPrices(),
        this.getCombinedMarketData()
      ])

      // Sort by price change percentage
      const sortedByChange = [...allData].sort((a, b) => 
        (b.priceChangePercent || 0) - (a.priceChangePercent || 0)
      )

      return {
        totalSymbols: allData.length,
        totalCommodities: [...new Set(allData.map(item => item.Commodity))].length,
        totalDeliveryCentres: [...new Set(allData.map(item => item.DeliveryCentre).filter(Boolean))].length,
        lastUpdated: closingPricesResponse.header?.timestamp || '',
        topPerformers: sortedByChange.slice(0, 5),
        bottomPerformers: sortedByChange.slice(-5).reverse()
      }
    } catch (error) {
      console.error('❌ Error getting market statistics:', error)
      throw error
    }
  }

  /**
   * Format price with proper currency formatting
   */
  private formatPrice(price: string): string {
    const numPrice = parseFloat(price)
    if (isNaN(numPrice)) return price
    
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(numPrice)
  }

  /**
   * Format date to readable format
   */
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch (error) {
      return dateString
    }
  }
}

// Export singleton instance
export const marketDataService = new MarketDataService()
export default marketDataService