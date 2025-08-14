<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { isDarkMode } from '../../utils/darkMode'

interface Commodity {
  symbol: string
  name: string
  openingPrice: number
  closingPrice: number
  priceChange: number
  changePercent: number
  high: number
  low: number
  volume: string
  lastUpdate: string
  trend: 'up' | 'down' | 'neutral'
  avatar: string
  color: string
}

// Mock data based on the provided GCX data
const commodityPrices = ref<Commodity[]>([
  {
    symbol: 'GAPWM2',
    name: 'White Maize',
    openingPrice: 1880.00,
    closingPrice: 1880.00,
    priceChange: 0,
    changePercent: 0,
    high: 1880.00,
    low: 1880.00,
    volume: '1,250 MT',
    lastUpdate: '14:30 GMT',
    trend: 'up',
    avatar: '🌽',
    color: 'bg-yellow-500'
  },
  {
    symbol: 'GAPWM3',
    name: 'Yellow Maize',
    openingPrice: 1240.00,
    closingPrice: 1240.00,
    priceChange: 0,
    changePercent: 0,
    high: 1240.00,
    low: 1240.00,
    volume: '890 MT',
    lastUpdate: '14:30 GMT',
    trend: 'down',
    avatar: '🌽',
    color: 'bg-yellow-400'
  },
  {
    symbol: 'GEJWM2',
    name: 'Soya Bean',
    openingPrice: 1200.00,
    closingPrice: 1200.00,
    priceChange: 0,
    changePercent: 0,
    high: 1200.00,
    low: 1200.00,
    volume: '1,100 MT',
    lastUpdate: '14:30 GMT',
    trend: 'up',
    avatar: '🫘',
    color: 'bg-green-500'
  },
  {
    symbol: 'GEJWM1',
    name: 'Sorghum',
    openingPrice: 2622.00,
    closingPrice: 2622.00,
    priceChange: 0,
    changePercent: 0,
    high: 2622.00,
    low: 2622.00,
    volume: '2,340 MT',
    lastUpdate: '14:30 GMT',
    trend: 'up',
    avatar: '🌾',
    color: 'bg-amber-500'
  },
  {
    symbol: 'GSAWM1',
    name: 'Sesame',
    openingPrice: 3145.00,
    closingPrice: 3145.00,
    priceChange: 0,
    changePercent: 0,
    high: 3145.00,
    low: 3145.00,
    volume: '560 MT',
    lastUpdate: '14:30 GMT',
    trend: 'up',
    avatar: '⚪',
    color: 'bg-slate-400'
  },
  {
    symbol: 'GTAWM1',
    name: 'Milled Rice',
    openingPrice: 4440.00,
    closingPrice: 4440.00,
    priceChange: 0,
    changePercent: 0,
    high: 4440.00,
    low: 4440.00,
    volume: '3,200 MT',
    lastUpdate: '14:30 GMT',
    trend: 'up',
    avatar: '🍚',
    color: 'bg-blue-500'
  },
  {
    symbol: 'GTUWM2',
    name: 'Premium Rice',
    openingPrice: 5995.00,
    closingPrice: 5995.00,
    priceChange: 0,
    changePercent: 0,
    high: 5995.00,
    low: 5995.00,
    volume: '1,450 MT',
    lastUpdate: '14:30 GMT',
    trend: 'down',
    avatar: '🍚',
    color: 'bg-indigo-500'
  }
])

const selectedCommodity = ref<Commodity | null>(null)
const searchTerm = ref('')
const isUpdating = ref(false)

const filteredPrices = computed(() => {
  if (!searchTerm.value) return commodityPrices.value
  return commodityPrices.value.filter(item => 
    item.symbol.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const selectCommodity = (commodity: Commodity) => {
  selectedCommodity.value = commodity
}

const getPriceChangeClass = (change: number) => {
  if (change > 0) return 'text-green-500 bg-green-500/10 border-green-500/20'
  if (change < 0) return 'text-red-500 bg-red-500/10 border-red-500/20'
  return 'text-slate-500 bg-slate-500/10 border-slate-500/20'
}

const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
  if (trend === 'up') return '↗'
  if (trend === 'down') return '↘'
  return '→'
}

const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
  if (trend === 'up') return 'text-green-500'
  if (trend === 'down') return 'text-red-500'
  return 'text-slate-500'
}

// Simulate real-time updates with visual feedback
onMounted(() => {
  setInterval(() => {
    isUpdating.value = true
    commodityPrices.value = commodityPrices.value.map(item => {
      const change = (Math.random() - 0.5) * 100
      const newPrice = item.closingPrice + change
      const changePercent = (change / item.openingPrice) * 100
      const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
      
      return {
        ...item,
        closingPrice: newPrice,
        priceChange: change,
        changePercent: changePercent,
        lastUpdate: new Date().toLocaleTimeString('en-GB', { timeZone: 'GMT' }),
        trend: trend
      }
    })
    
    setTimeout(() => {
      isUpdating.value = false
    }, 500)
  }, 8000)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section with Live Indicator -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div class="flex items-center gap-3">
        <div>
          <h2 class="text-2xl lg:text-3xl font-bold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Live Commodity Prices
          </h2>
          <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
            Real-time prices for GCX traded commodities (GHC per Metric Tonne)
          </p>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-medium text-green-500">LIVE</span>
        </div>
      </div>
      
      <!-- Search Bar -->
      <div class="relative w-full lg:w-80">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search commodities..."
          class="w-full px-4 py-3 pl-10 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="isDarkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'"
        />
        <svg class="absolute left-3 top-3 w-4 h-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>

    <!-- Market Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-white hover:bg-slate-200'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Total Volume</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">12,580 MT</div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-white hover:bg-slate-200'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Active Contracts</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">8</div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-white hover:bg-slate-200'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Market Status</div>
            <div class="text-2xl font-bold text-green-500">OPEN</div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-white hover:bg-slate-200'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Last Update</div>
            <div class="text-lg font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ new Date().toLocaleTimeString('en-GB', { timeZone: 'GMT' }) }}
            </div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Price Table -->
    <div class="overflow-x-auto">
      <div class="rounded-xl border overflow-hidden shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
        <table class="w-full">
          <thead>
            <tr :class="isDarkMode ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700' : 'bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200'">
              <th class="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Symbol</th>
              <th class="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Commodity</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Opening</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Closing</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Change</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">High</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Low</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Volume</th>
              <th class="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredPrices"
              :key="item.symbol"
              @click="selectCommodity(item)"
              class="cursor-pointer transition-all duration-200 border-b group"
              :class="[
                isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-slate-200',
                isUpdating ? 'animate-pulse' : ''
              ]"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <!-- Commodity Avatar -->
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg" :class="item.color">
                    {{ item.avatar }}
                  </div>
                  <!-- Symbol -->
                  <span class="font-mono font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {{ item.symbol }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ item.name }}
                </span>
              </td>
              <td class="px-4 py-4 text-right">
                <span class="text-sm font-mono" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  {{ item.openingPrice.toLocaleString() }}
                </span>
              </td>
              <td class="px-4 py-4 text-right">
                <span class="text-sm font-mono font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ item.closingPrice.toLocaleString() }}
                </span>
              </td>
              <td class="px-4 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <span 
                    class="text-sm font-mono font-bold px-2 py-1 rounded-lg border"
                    :class="getPriceChangeClass(item.priceChange)"
                  >
                    {{ item.priceChange >= 0 ? '+' : '' }}{{ item.priceChange.toFixed(2) }}
                  </span>
                  <span 
                    class="text-xs font-semibold"
                    :class="item.priceChange >= 0 ? 'text-green-500' : 'text-red-500'"
                  >
                    ({{ item.changePercent.toFixed(2) }}%)
                  </span>
                </div>
              </td>
              <td class="px-4 py-4 text-right">
                <span class="text-sm font-mono" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  {{ item.high.toLocaleString() }}
                </span>
              </td>
              <td class="px-4 py-4 text-right">
                <span class="text-sm font-mono" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  {{ item.low.toLocaleString() }}
                </span>
              </td>
              <td class="px-4 py-4 text-right">
                <span class="text-sm font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  {{ item.volume }}
                </span>
              </td>
              <td class="px-4 py-4 text-right">
                <span 
                  class="text-lg font-bold"
                  :class="getTrendColor(item.trend)"
                >
                  {{ getTrendIcon(item.trend) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Selected Commodity Details -->
    <div v-if="selectedCommodity" class="mt-6">
      <div class="rounded-xl p-6 border shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <!-- Commodity Avatar -->
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg" :class="selectedCommodity.color">
              {{ selectedCommodity.avatar }}
            </div>
            <div>
              <h3 class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ selectedCommodity.symbol }} - {{ selectedCommodity.name }}
              </h3>
              <span 
                class="text-lg font-bold"
                :class="getTrendColor(selectedCommodity.trend)"
              >
                {{ getTrendIcon(selectedCommodity.trend) }}
              </span>
            </div>
          </div>
          <button 
            @click="selectedCommodity = null"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'">
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Current Price</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              GHC {{ selectedCommodity.closingPrice.toLocaleString() }}
            </div>
          </div>
          <div class="text-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'">
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Daily Change</div>
            <div class="text-2xl font-bold" :class="selectedCommodity.priceChange >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ selectedCommodity.priceChange >= 0 ? '+' : '' }}{{ selectedCommodity.priceChange.toFixed(2) }}
            </div>
          </div>
          <div class="text-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'">
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Volume</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ selectedCommodity.volume }}
            </div>
          </div>
          <div class="text-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'">
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Last Update</div>
            <div class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ selectedCommodity.lastUpdate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
