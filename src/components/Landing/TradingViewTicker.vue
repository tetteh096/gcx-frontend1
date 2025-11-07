<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { isDarkMode } from '../../utils/darkMode'
import { useTickerVisibility } from '../../composables/useTickerVisibility'
import { globalMarketData, globalLoading, globalError, refreshMarketData } from '../../utils/marketDataUtils'
import type { ProcessedMarketData } from '../../services/marketDataService'

interface TickerCommodity {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  avatar: string
  color: string
}

// Real GCX commodity data with custom avatars
const { t } = useI18n()

const commodities = ref<TickerCommodity[]>([])

// Use global state
const isLoading = globalLoading
const error = globalError

// Commodity avatar mapping
const commodityAvatars: Record<string, { avatar: string; color: string }> = {
  'White Maize': { avatar: '🌽', color: 'bg-yellow-500' },
  'Yellow Maize': { avatar: '🌽', color: 'bg-yellow-400' },
  'Yellow Soya Bean': { avatar: '🫘', color: 'bg-green-500' },
  'White Soya Bean': { avatar: '🫘', color: 'bg-green-400' },
  'Aromatic Straight Millled Rice': { avatar: '🍚', color: 'bg-blue-500' },
  'White Sesame Seed': { avatar: '⚪', color: 'bg-slate-400' },
  'Sorghum': { avatar: '🌾', color: 'bg-amber-500' }
}

// Default avatar for unmapped commodities
const getDefaultAvatar = (commodity: string): { avatar: string; color: string } => {
  if (commodity.toLowerCase().includes('maize')) return { avatar: '🌽', color: 'bg-yellow-500' }
  if (commodity.toLowerCase().includes('soya')) return { avatar: '🫘', color: 'bg-green-500' }
  if (commodity.toLowerCase().includes('rice')) return { avatar: '🍚', color: 'bg-blue-500' }
  if (commodity.toLowerCase().includes('sesame')) return { avatar: '⚪', color: 'bg-slate-400' }
  if (commodity.toLowerCase().includes('sorghum')) return { avatar: '🌾', color: 'bg-amber-500' }
  return { avatar: '📦', color: 'bg-gray-500' }
}

// Convert Firebase data to ticker format
const convertToTickerFormat = (data: ProcessedMarketData[]): TickerCommodity[] => {
  // Get the most recent and actively traded commodities
  const prioritySymbols = ['GAPWM2', 'GAPYM2', 'GEJWM2', 'GSAWM2', 'GKUWM2', 'GKUYM2', 'GTAYSB2', 'GWAYSB2']
  
  // Filter and prioritize the data
  const priorityData = data.filter(item => prioritySymbols.includes(item.Symbol))
  const remainingData = data.filter(item => !prioritySymbols.includes(item.Symbol))
  
  // Combine priority items first, then fill with remaining
  const selectedData = [...priorityData, ...remainingData].slice(0, 8)
  
  return selectedData.map(item => {
    const avatarInfo = commodityAvatars[item.Commodity] || getDefaultAvatar(item.Commodity)
    
    return {
      symbol: item.Symbol,
      name: item.Commodity,
      price: parseFloat(item.ClosingPrice) || 0,
      change: parseFloat(item.PriceChange) || 0,
      changePercent: item.priceChangePercent || 0,
      volume: formatVolume(item.Symbol),
      avatar: avatarInfo.avatar,
      color: avatarInfo.color
    }
  })
}

// Format volume (simplified since Firebase doesn't provide volume data)
const formatVolume = (symbol: string): string => {
  const baseVolumes: Record<string, string> = {
    'GAPWM2': '2.4M MT',
    'GAPYM2': '1.8M MT', 
    'GEJWM2': '3.1M MT',
    'GSAWM2': '890K MT',
    'GKUWM2': '1.2M MT',
    'GKUYM2': '950K MT',
    'GTAYSB2': '1.5M MT',
    'GWAYSB2': '1.1M MT'
  }
  
  return baseVolumes[symbol] || '500K MT'
}

// Convert global market data to ticker format
const updateTickerData = () => {
  if (globalMarketData.value.length > 0) {
    commodities.value = convertToTickerFormat(globalMarketData.value)
  } else {
    // No data available
    commodities.value = []
  }
}

// Manual refresh function
const refreshData = async () => {
  await refreshMarketData()
  updateTickerData()
}

// Watch for changes in global market data
watch(globalMarketData, () => {
  updateTickerData()
}, { immediate: true })

const isPaused = ref(false)
const { isTickerVisible: isVisible } = useTickerVisibility()

// Pause scrolling on hover
const pauseScrolling = () => {
  isPaused.value = true
}

// Resume scrolling
const resumeScrolling = () => {
  isPaused.value = false
}

// Get change color class
const getChangeColor = (change: number) => {
  if (change > 0) return 'text-green-500'
  if (change < 0) return 'text-red-500'
  return 'text-slate-500'
}

// Get change icon
const getChangeIcon = (change: number) => {
  if (change > 0) return '↗'
  if (change < 0) return '↘'
  return '→'
}

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  }).format(price)
}

// Lifecycle hooks
onMounted(() => {
  updateTickerData()
})
</script>

<template>
  <div 
    class="fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out" 
    :class="[
      isVisible ? 'top-0' : '-top-12',
      isDarkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-slate-200'
    ]"
  >
    <!-- Custom Commodity Ticker -->
    <div class="relative overflow-hidden h-10 md:h-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center h-full px-4">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Loading market data...
          </span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center h-full px-4">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-red-500 rounded-full"></div>
          <span class="text-sm" :class="isDarkMode ? 'text-red-300' : 'text-red-600'">
            {{ error }}
          </span>
        </div>
      </div>

      <!-- Ticker Container -->
      <div 
        v-else-if="commodities.length > 0"
        class="flex items-center py-1 px-4 space-x-4 md:space-x-6 ticker-scroll h-full"
        :class="{ 'ticker-paused': isPaused }"
        @mouseenter="pauseScrolling"
        @mouseleave="resumeScrolling"
      >
        <!-- Commodities -->
        <div 
          v-for="commodity in commodities" 
          :key="commodity.symbol"
          class="flex items-center space-x-1.5 md:space-x-2 flex-shrink-0 group cursor-pointer transition-all duration-200 rounded-md px-1.5 py-0.5"
          :class="isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100'"
        >
          <!-- Commodity Avatar -->
          <div class="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg" :class="commodity.color">
            {{ commodity.avatar }}
          </div>
          
          <!-- Commodity Info -->
          <div class="flex flex-col">
            <div class="flex items-center space-x-1">
              <span class="font-bold text-xs md:text-xs" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ commodity.name }}
              </span>
              <span class="text-xs font-mono hidden md:inline" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                ({{ commodity.symbol }})
              </span>
            </div>
            <div class="flex items-center space-x-1">
              <span class="font-bold text-xs" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ formatPrice(commodity.price) }}
              </span>
              <span class="text-xs font-medium" :class="getChangeColor(commodity.change)">
                {{ getChangeIcon(commodity.change) }} {{ commodity.change > 0 ? '+' : '' }}{{ commodity.changePercent.toFixed(2) }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Duplicate set for seamless loop -->
        <div 
          v-for="commodity in commodities" 
          :key="`duplicate-${commodity.symbol}`"
          class="flex items-center space-x-1.5 md:space-x-2 flex-shrink-0 group cursor-pointer transition-all duration-200 rounded-md px-1.5 py-0.5"
          :class="isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100'"
        >
          <!-- Commodity Avatar -->
          <div class="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg" :class="commodity.color">
            {{ commodity.avatar }}
          </div>
          
          <!-- Commodity Info -->
          <div class="flex flex-col">
            <div class="flex items-center space-x-1">
              <span class="font-bold text-xs" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ commodity.name }}
              </span>
              <span class="text-xs font-mono hidden md:inline" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                ({{ commodity.symbol }})
              </span>
            </div>
            <div class="flex items-center space-x-1">
              <span class="font-bold text-xs" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ formatPrice(commodity.price) }}
              </span>
              <span class="text-xs font-medium" :class="getChangeColor(commodity.change)">
                {{ getChangeIcon(commodity.change) }} {{ commodity.change > 0 ? '+' : '' }}{{ commodity.changePercent.toFixed(2) }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Third set for even more seamless loop -->
        <div 
          v-for="commodity in commodities" 
          :key="`triplicate-${commodity.symbol}`"
          class="flex items-center space-x-1.5 md:space-x-2 flex-shrink-0 group cursor-pointer transition-all duration-200 rounded-md px-1.5 py-0.5"
          :class="isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100'"
        >
          <!-- Commodity Avatar -->
          <div class="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg" :class="commodity.color">
            {{ commodity.avatar }}
          </div>
          
          <!-- Commodity Info -->
          <div class="flex flex-col">
            <div class="flex items-center space-x-1">
              <span class="font-bold text-xs" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ commodity.name }}
              </span>
              <span class="text-xs font-mono hidden md:inline" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                ({{ commodity.symbol }})
              </span>
            </div>
            <div class="flex items-center space-x-1">
              <span class="font-bold text-xs" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ formatPrice(commodity.price) }}
              </span>
              <span class="text-xs font-medium" :class="getChangeColor(commodity.change)">
                {{ getChangeIcon(commodity.change) }} {{ commodity.change > 0 ? '+' : '' }}{{ commodity.changePercent.toFixed(2) }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Refresh Button -->
      <div class="absolute right-2 top-1/2 transform -translate-y-1/2">
        <button 
          @click="refreshData"
          :disabled="isLoading"
          class="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
          :class="isLoading ? 'bg-blue-500' : 'bg-green-500 hover:bg-green-600'"
          :title="isLoading ? 'Refreshing...' : 'Refresh data'"
        >
          <svg 
            v-if="!isLoading"
            class="w-2.5 h-2.5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <div v-else class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ticker scrolling animation */
@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
}

.ticker-scroll {
  animation: ticker-scroll 25s linear infinite;
  width: max-content;
}

.ticker-paused {
  animation-play-state: paused;
}

/* Live indicator animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .space-x-6 {
    column-gap: 1rem;
  }
  
  .space-x-2 {
    column-gap: 0.5rem;
  }
}
</style>
