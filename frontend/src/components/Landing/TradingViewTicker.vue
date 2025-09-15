<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { isDarkMode } from '../../utils/darkMode'
import { useTickerVisibility } from '../../composables/useTickerVisibility'

// Real GCX commodity data with custom avatars
const { t } = useI18n()

const commodities = ref([
  {
    symbol: 'GAPWM2',
    name: 'White Maize',
    price: 1880.00,
    change: 30.00,
    changePercent: 1.62,
    volume: '2.4M MT',
    avatar: '🌽',
    color: 'bg-yellow-500'
  },
  {
    symbol: 'GAPYM2',
    name: 'Yellow Maize',
    price: 1200.00,
    change: -20.00,
    changePercent: -1.64,
    volume: '2.1M MT',
    avatar: '🌽',
    color: 'bg-yellow-400'
  },
  {
    symbol: 'GEJWM2',
    name: 'Soya Bean',
    price: 4030.00,
    change: 50.00,
    changePercent: 1.26,
    volume: '1.8M MT',
    avatar: '🫘',
    color: 'bg-green-500'
  },
  {
    symbol: 'GSAWM2',
    name: 'Sorghum',
    price: 4745.00,
    change: 25.00,
    changePercent: 0.53,
    volume: '890K MT',
    avatar: '🌾',
    color: 'bg-amber-500'
  },
  {
    symbol: 'GKUWM2',
    name: 'Sesame',
    price: 4645.00,
    change: 45.00,
    changePercent: 0.98,
    volume: '950K MT',
    avatar: '⚪',
    color: 'bg-slate-400'
  }
])

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
      <!-- Ticker Container -->
      <div 
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

      <!-- Menu Button -->
      <div class="absolute right-2 top-1/2 transform -translate-y-1/2">
        <button class="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl">
          <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
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
