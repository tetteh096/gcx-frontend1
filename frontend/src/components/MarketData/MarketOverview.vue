<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { isDarkMode } from '../../utils/darkMode'

interface Commodity {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  status: 'active' | 'inactive'
  trend: 'up' | 'down' | 'neutral'
}

interface MarketCategory {
  category: string
  commodities: Commodity[]
}

// Mock market data based on GCX commodities
const { t } = useI18n()

const marketData = ref<MarketCategory[]>([
  {
    category: 'Soya Bean',
    commodities: [
      { symbol: 'GAPWM2', name: 'White Soya Bean', price: 1880.00, change: 45.50, volume: '1,250 MT', status: 'active', trend: 'up' },
      { symbol: 'GAPWM3', name: 'White Soya Bean', price: 1240.00, change: -12.30, volume: '890 MT', status: 'active', trend: 'down' },
      { symbol: 'GAPYM2', name: 'Yellow Soya Bean', price: 1200.00, change: 28.75, volume: '1,100 MT', status: 'active', trend: 'up' },
      { symbol: 'GAPYM4', name: 'Yellow Soya Bean', price: 1160.00, change: -5.20, volume: '750 MT', status: 'active', trend: 'down' }
    ]
  },
  {
    category: 'Sorghum',
    commodities: [
      { symbol: 'GEJWM1', name: 'White Sorghum', price: 2622.00, change: 67.80, volume: '2,340 MT', status: 'active', trend: 'up' },
      { symbol: 'GEJWM2', name: 'White Sorghum', price: 4030.00, change: -23.45, volume: '1,890 MT', status: 'active', trend: 'down' },
      { symbol: 'GEJWM3', name: 'White Sorghum', price: 2756.00, change: 34.20, volume: '1,650 MT', status: 'active', trend: 'up' },
      { symbol: 'GEJWM4', name: 'White Sorghum', price: 2560.00, change: -8.90, volume: '980 MT', status: 'active', trend: 'down' },
      { symbol: 'GEJYM2', name: 'Yellow Sorghum', price: 1200.00, change: 15.60, volume: '1,200 MT', status: 'active', trend: 'up' },
      { symbol: 'GEJYM3', name: 'Yellow Sorghum', price: 1000.00, change: -18.30, volume: '850 MT', status: 'active', trend: 'down' }
    ]
  },
  {
    category: 'Sesame',
    commodities: [
      { symbol: 'GSAWM1', name: 'White Sesame', price: 3145.00, change: 89.25, volume: '560 MT', status: 'active', trend: 'up' },
      { symbol: 'GSAWM2', name: 'White Sesame', price: 4745.00, change: -45.80, volume: '420 MT', status: 'active', trend: 'down' },
      { symbol: 'GSAWM3', name: 'White Sesame', price: 2684.00, change: 12.40, volume: '380 MT', status: 'active', trend: 'up' },
      { symbol: 'GSAYM1', name: 'Yellow Sesame', price: 3145.00, change: 56.70, volume: '320 MT', status: 'active', trend: 'up' },
      { symbol: 'GSAYM2', name: 'Yellow Sesame', price: 6290.00, change: -67.90, volume: '280 MT', status: 'active', trend: 'down' },
      { symbol: 'GSAYM3', name: 'Yellow Sesame', price: 2516.00, change: 23.15, volume: '240 MT', status: 'active', trend: 'up' }
    ]
  },
  {
    category: 'Milled Rice',
    commodities: [
      { symbol: 'GTAWM1', name: 'White Rice', price: 4440.00, change: 78.90, volume: '3,200 MT', status: 'active', trend: 'up' },
      { symbol: 'GTAWM2', name: 'White Rice', price: 4405.00, change: -34.20, volume: '2,800 MT', status: 'active', trend: 'down' },
      { symbol: 'GTAWM3', name: 'White Rice', price: 1920.00, change: 45.60, volume: '1,950 MT', status: 'active', trend: 'up' },
      { symbol: 'GTAWM4', name: 'White Rice', price: 1100.00, change: -12.80, volume: '1,600 MT', status: 'active', trend: 'down' },
      { symbol: 'GTAYM1', name: 'Yellow Rice', price: 1480.00, change: 67.30, volume: '1,400 MT', status: 'active', trend: 'up' },
      { symbol: 'GTAYM2', name: 'Yellow Rice', price: 5929.00, change: -89.45, volume: '1,200 MT', status: 'active', trend: 'down' },
      { symbol: 'GTAYM3', name: 'Yellow Rice', price: 1120.00, change: 23.90, volume: '1,000 MT', status: 'active', trend: 'up' },
      { symbol: 'GTUWM2', name: 'White Rice', price: 5995.00, change: 123.40, volume: '1,450 MT', status: 'active', trend: 'up' },
      { symbol: 'GTUYM2', name: 'Yellow Rice', price: 6090.00, change: -56.70, volume: '1,300 MT', status: 'active', trend: 'down' }
    ]
  }
])

const selectedCategory = ref('all')
const searchTerm = ref('')
const isUpdating = ref(false)

// Market statistics
const marketStats = computed(() => {
  const allCommodities = marketData.value.flatMap(cat => cat.commodities)
  const totalVolume = allCommodities.reduce((sum, item) => sum + parseInt(item.volume.replace(',', '')), 0)
  const avgPrice = allCommodities.reduce((sum, item) => sum + item.price, 0) / allCommodities.length
  const activeContracts = allCommodities.filter(item => item.status === 'active').length
  const totalChange = allCommodities.reduce((sum, item) => sum + item.change, 0)
  
  return {
    totalVolume: totalVolume.toLocaleString(),
    avgPrice: avgPrice.toFixed(2),
    activeContracts,
    totalCommodities: allCommodities.length,
    totalChange: totalChange.toFixed(2)
  }
})

// Filtered data
const filteredData = computed(() => {
  let data = marketData.value
  
  if (selectedCategory.value !== 'all') {
    data = data.filter(cat => cat.category === selectedCategory.value)
  }
  
  if (searchTerm.value) {
    data = data.map(cat => ({
      ...cat,
      commodities: cat.commodities.filter(item => 
        item.symbol.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })).filter(cat => cat.commodities.length > 0)
  }
  
  return data
})

// Top performers
const topPerformers = computed(() => {
  const allCommodities = marketData.value.flatMap(cat => cat.commodities)
  return allCommodities
    .sort((a, b) => b.volume.localeCompare(a.volume, undefined, { numeric: true }))
    .slice(0, 5)
})

// Market highlights
const marketHighlights = ref([
  {
    title: 'Soya Bean Prices Stable',
    description: 'White and yellow soya bean prices remain stable with consistent trading volumes.',
    type: 'info',
    date: '2025-01-25',
    icon: '📊'
  },
  {
    title: 'Rice Trading Volume Increases',
    description: 'Milled rice trading volume shows 15% increase compared to last week.',
    type: 'positive',
    date: '2025-01-25',
    icon: '📈'
  },
  {
    title: 'New Sorghum Contracts',
    description: 'New sorghum contracts to be introduced next month.',
    type: 'announcement',
    date: '2025-01-24',
    icon: '🎯'
  }
])

const getChangeClass = (change: number) => {
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

// Simulate real-time updates
onMounted(() => {
  setInterval(() => {
    isUpdating.value = true
    marketData.value = marketData.value.map(category => ({
      ...category,
      commodities: category.commodities.map(item => {
        const change = (Math.random() - 0.5) * 200
        const newPrice = item.price + change
        const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
        
        return {
          ...item,
          price: newPrice,
          change: change,
          trend: trend
        }
      })
    }))
    
    setTimeout(() => {
      isUpdating.value = false
    }, 500)
  }, 10000)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Market Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-6 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-750' : 'border-slate-200 bg-white hover:bg-slate-50'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Total Volume</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ marketStats.totalVolume }} MT
            </div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-750' : 'border-slate-200 bg-white hover:bg-slate-50'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Average Price</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              GHC {{ marketStats.avgPrice }}
            </div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-750' : 'border-slate-200 bg-white hover:bg-slate-50'">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Active Contracts</div>
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ marketStats.activeContracts }}
            </div>
          </div>
          <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="p-6 rounded-xl border transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-750' : 'border-slate-200 bg-white hover:bg-slate-50'">
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
    </div>

    <!-- Filters and Search -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div class="flex items-center gap-4">
        <!-- Category Filter -->
        <select
          v-model="selectedCategory"
          class="px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'"
        >
          <option value="all">All Categories</option>
          <option v-for="category in marketData" :key="category.category" :value="category.category">
            {{ category.category }}
          </option>
        </select>
      </div>

      <!-- Search -->
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

    <!-- Commodity Categories -->
    <div class="space-y-6">
      <div
        v-for="category in filteredData"
        :key="category.category"
        class="rounded-xl border overflow-hidden shadow-lg"
        :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'"
      >
        <div class="px-6 py-4 border-b" :class="isDarkMode ? 'border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800' : 'border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100'">
          <h3 class="text-lg font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            {{ category.category }}
          </h3>
          <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
            {{ category.commodities.length }} active contracts
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr :class="isDarkMode ? 'bg-slate-900 border-b border-slate-700' : 'bg-slate-50 border-b border-slate-200'">
                <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Symbol</th>
                <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Name</th>
                <th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Price (GHC)</th>
                <th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Change</th>
                <th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Volume</th>
                <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Trend</th>
                <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in category.commodities"
                :key="item.symbol"
                class="border-b transition-all duration-200 group"
                        :class="[
              isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-200',
              isUpdating ? 'animate-pulse' : ''
            ]"
              >
                <td class="px-6 py-4">
                  <span class="font-mono font-bold text-sm bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {{ item.symbol }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                    {{ item.name }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <span class="text-sm font-mono font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                    {{ item.price.toLocaleString() }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <span 
                      class="text-sm font-mono font-bold px-2 py-1 rounded-lg border"
                      :class="getChangeClass(item.change)"
                    >
                      {{ item.change >= 0 ? '+' : '' }}{{ item.change.toFixed(2) }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <span class="text-sm font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                    {{ item.volume }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span 
                    class="text-lg font-bold"
                    :class="getTrendColor(item.trend)"
                  >
                    {{ getTrendIcon(item.trend) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="item.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Market Highlights and Top Performers -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Market Highlights -->
      <div class="rounded-xl border p-6 shadow-lg transition-all duration-200 hover:shadow-xl" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
        <h3 class="text-lg font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Market Highlights</h3>
        <div class="space-y-4">
          <div
            v-for="highlight in marketHighlights"
            :key="highlight.title"
            class="p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md"
            :class="{
              'border-blue-500 bg-blue-50 dark:bg-blue-900/10': highlight.type === 'info',
              'border-green-500 bg-green-50 dark:bg-green-900/10': highlight.type === 'positive',
              'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10': highlight.type === 'announcement'
            }"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-3">
                <span class="text-2xl">{{ highlight.icon }}</span>
                <div>
                  <h4 class="font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                    {{ highlight.title }}
                  </h4>
                  <p class="text-sm mt-1" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                    {{ highlight.description }}
                  </p>
                </div>
              </div>
              <span class="text-xs font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                {{ highlight.date }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performers -->
      <div class="rounded-xl border p-6 shadow-lg transition-all duration-200 hover:shadow-xl" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
        <h3 class="text-lg font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Top Volume Performers</h3>
        <div class="space-y-3">
          <div
            v-for="(item, index) in topPerformers"
            :key="item.symbol"
            class="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:shadow-md"
            :class="isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-200'"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg">
                {{ index + 1 }}
              </div>
              <div>
                <div class="font-bold text-sm" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ item.symbol }}
                </div>
                <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ item.volume }}
              </div>
              <div class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                GHC {{ item.price.toLocaleString() }}
              </div>
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
