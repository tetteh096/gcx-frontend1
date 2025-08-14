<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isDarkMode } from '../utils/darkMode'
import LivePrices from '../components/MarketData/LivePrices.vue'
import PriceChart from '../components/MarketData/PriceChart.vue'
import MarketOverview from '../components/MarketData/MarketOverview.vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { label: 'Live Prices', key: 'prices', description: 'Real-time commodity price updates' },
  { label: 'Market Overview', key: 'overview', description: 'Comprehensive market analysis and statistics' },
  { label: 'Price Charts', key: 'charts', description: 'Technical analysis and price charts' },
  { label: 'Market Reports', key: 'reports', description: 'Detailed market reports and analysis' },
  { label: 'Trading Statistics', key: 'stats', description: 'Trading performance and volume data' },
  { label: 'Price History', key: 'history', description: 'Historical price trends and analysis' },
]

const activeTab = ref('prices')
const selectedCommodity = ref({
  symbol: 'GAPWM2',
  name: 'Soya Bean White'
})

// Set active tab from route hash
const setActiveFromHash = () => {
  const hash = route.hash.replace('#', '')
  if (hash && tabs.find(tab => tab.key === hash)) {
    activeTab.value = hash
  }
}

const go = async (key: string) => {
  activeTab.value = key
  router.replace({ hash: `#${key}` })
  await Promise.resolve()
  const el = document.getElementById(`md-${key}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => setActiveFromHash())
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section -->
    <section class="relative py-14 lg:py-20 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/trading dashboard.jpg" alt="Market Data" class="w-full h-full object-cover" />
        <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/40' : 'bg-white/40'"></div>
      </div>
      <div class="relative max-w-[1600px] mx-auto px-4 text-center">
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Market Data</h1>
        <p class="text-lg max-w-3xl mx-auto mb-8" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Real-time market information, prices, reports, and trading statistics for GCX commodities.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold text-green-500">29</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Active Contracts</div>
          </div>
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">12,580</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Total Volume (MT)</div>
          </div>
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">4</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Commodity Types</div>
          </div>
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold text-green-500">OPEN</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Market Status</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tab Navigation -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-[1600px] mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-2 lg:gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="go(tab.key)"
            class="group relative px-6 py-3 text-sm font-medium rounded-full transition-all duration-300"
            :class="activeTab === tab.key 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            {{ tab.label }}
            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                 :class="isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-800 text-white'">
              {{ tab.description }}
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                   :class="isDarkMode ? 'border-t-slate-700' : 'border-t-slate-800'"></div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="relative py-12 overflow-hidden">
      <!-- Background layer -->
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <img src="/trading dashboard.jpg" alt="Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/30' : 'bg-white/60'"></div>
      </div>
      
      <div class="max-w-[1600px] mx-auto px-4">
        <!-- Live Prices Tab -->
        <div v-if="activeTab === 'prices'" id="md-prices" class="space-y-8">
          <LivePrices />
        </div>

        <!-- Market Overview Tab -->
        <div v-if="activeTab === 'overview'" id="md-overview" class="space-y-8">
          <MarketOverview />
        </div>

        <!-- Price Charts Tab -->
        <div v-if="activeTab === 'charts'" id="md-charts" class="space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              Technical Analysis
            </h2>
            <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              Advanced price charts with technical indicators for informed trading decisions.
            </p>
          </div>
          
          <!-- Commodity Selector -->
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <button
              v-for="commodity in [
                { symbol: 'GAPWM2', name: 'Soya Bean White' },
                { symbol: 'GEJWM1', name: 'Sorghum White' },
                { symbol: 'GSAWM1', name: 'Sesame White' },
                { symbol: 'GTAWM1', name: 'Milled Rice White' }
              ]"
              :key="commodity.symbol"
              @click="selectedCommodity = commodity"
              class="px-6 py-3 rounded-lg font-medium transition-all duration-200"
              :class="selectedCommodity.symbol === commodity.symbol
                ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
                : (isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-50')"
            >
              {{ commodity.symbol }}
            </button>
          </div>
          
          <PriceChart :symbol="selectedCommodity.symbol" :commodity-name="selectedCommodity.name" />
        </div>

        <!-- Market Reports Tab -->
        <div v-if="activeTab === 'reports'" id="md-reports" class="space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              Market Reports
            </h2>
            <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              Comprehensive market analysis reports and insights.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="rounded-xl border p-6 transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:border-yellow-500' : 'border-slate-200 bg-white hover:border-yellow-400'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 rounded-lg" :class="isDarkMode ? 'bg-yellow-600/20' : 'bg-yellow-500/10'">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Weekly Market Report</h3>
                  <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">January 20-26, 2025</p>
                </div>
              </div>
              <p class="text-sm mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Comprehensive analysis of commodity price movements, trading volumes, and market trends.
              </p>
              <button class="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                Download PDF →
              </button>
            </div>

            <div class="rounded-xl border p-6 transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:border-yellow-500' : 'border-slate-200 bg-white hover:border-yellow-400'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 rounded-lg" :class="isDarkMode ? 'bg-blue-600/20' : 'bg-blue-500/10'">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Price Analysis</h3>
                  <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">January 25, 2025</p>
                </div>
              </div>
              <p class="text-sm mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Detailed price analysis for all traded commodities with technical indicators.
              </p>
              <button class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View Report →
              </button>
            </div>

            <div class="rounded-xl border p-6 transition-all duration-200 hover:shadow-lg" :class="isDarkMode ? 'border-slate-700 bg-slate-800 hover:border-yellow-500' : 'border-slate-200 bg-white hover:border-yellow-400'">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 rounded-lg" :class="isDarkMode ? 'bg-green-600/20' : 'bg-green-500/10'">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Volume Analysis</h3>
                  <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">January 25, 2025</p>
                </div>
              </div>
              <p class="text-sm mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Trading volume analysis and liquidity assessment for all commodities.
              </p>
              <button class="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                View Report →
              </button>
            </div>
          </div>
        </div>

        <!-- Trading Statistics Tab -->
        <div v-if="activeTab === 'stats'" id="md-stats" class="space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              Trading Statistics
            </h2>
            <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              Detailed trading performance data and market statistics.
            </p>
          </div>
          
          <div class="text-center py-12">
            <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Trading Statistics</h3>
            <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Detailed trading performance data coming soon...</p>
          </div>
        </div>

        <!-- Price History Tab -->
        <div v-if="activeTab === 'history'" id="md-history" class="space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl lg:text-4xl font-extrabold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              Price History
            </h2>
            <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              Historical price trends and analysis for all commodities.
            </p>
          </div>
          
          <div class="text-center py-12">
            <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Price History</h3>
            <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Historical price trends and analysis coming soon...</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
