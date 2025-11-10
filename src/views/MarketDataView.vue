<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useRoute, useRouter } from 'vue-router'
import { isDarkMode } from '../utils/darkMode'
import { marketDataService } from '../services/marketDataService'
import MarketOverview from '../components/MarketData/MarketOverview.vue'
import SubscriptionModal from '../components/SubscriptionModal.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const { t } = useI18n()
const router = useRouter()

const tabs = [
  { label: 'Market Overview', key: 'overview', description: 'Comprehensive market analysis and statistics' },
  { label: 'Market Reports', key: 'reports', description: 'Detailed market reports and analysis' },
]

const activeTab = ref('overview')
const selectedCommodity = ref({
  symbol: 'GAPWM2',
  name: 'White Maize'
})

// Demo mode state
const showDemo = ref(false)

// Subscription modal state
const showSubscriptionModal = ref(false)

// Market statistics from Firebase
const marketStats = ref({
  totalSymbols: 0,
  totalCommodities: 0,
  totalDeliveryCentres: 0,
  lastUpdated: ''
})

// Market status based on time
const marketStatus = computed(() => {
  const now = new Date()
  
  // Convert to GMT+0 (Accra/London time)
  const utcHour = now.getUTCHours()
  const utcDay = now.getUTCDay() // 0 = Sunday, 6 = Saturday
  
  // Market hours: Monday-Friday (1-5), 8 AM - 3 PM GMT+0
  const isWeekday = utcDay >= 1 && utcDay <= 5
  const isMarketHours = utcHour >= 8 && utcHour < 15 // 8 AM to 3 PM (15:00)
  
  return isWeekday && isMarketHours ? 'OPEN' : 'CLOSED'
})

// Load market statistics
const loadMarketStats = async () => {
  try {
    const statistics = await marketDataService.getMarketStatistics()
    marketStats.value = statistics
  } catch (error) {
    console.error('Failed to load market statistics:', error)
  }
}

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

onMounted(async () => {
  setActiveFromHash()
  await loadMarketStats()
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section -->
    <section class="relative py-14 lg:py-20 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/trading dashboard.jpg" alt="{{ t('navigation.menu.marketData') }}" class="w-full h-full object-cover" />
        <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/40' : 'bg-white/40'"></div>
      </div>
      <div class="relative max-w-[1600px] mx-auto px-4 text-center">
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ t('navigation.menu.marketData') }}</h1>
        <p class="text-lg max-w-3xl mx-auto mb-8" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Access premium market data, live prices, and advanced trading tools with our subscription service.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold text-green-500">{{ marketStats.totalSymbols }}</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Active Contracts</div>
          </div>
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ marketStats.totalDeliveryCentres }}</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Delivery Centres</div>
          </div>
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ marketStats.totalCommodities }}</div>
            <div class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Commodity Types</div>
          </div>
          <div class="p-4 rounded-xl border backdrop-blur-sm" :class="isDarkMode ? 'border-slate-600 bg-slate-800/80' : 'border-slate-200 bg-white/80'">
            <div class="flex items-center gap-2 justify-center mb-1">
              <div 
                class="w-3 h-3 rounded-full"
                :class="marketStatus === 'OPEN' ? 'bg-green-500 animate-pulse' : 'bg-red-500'"
              ></div>
              <div 
                class="text-2xl font-bold"
                :class="marketStatus === 'OPEN' ? 'text-green-500' : 'text-red-500'"
              >
                {{ marketStatus }}
              </div>
            </div>
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

        <!-- Market Overview Tab -->
        <div v-if="activeTab === 'overview'" id="md-overview" class="space-y-8">
          <!-- Demo Mode alert removed -->

          <!-- Demo Content (Real Market Data) -->
          <div v-if="showDemo">
            <MarketOverview />
          </div>

          <!-- Subscription Prompt -->
          <div v-else class="text-center py-16">
            <div class="max-w-4xl mx-auto">
              <div class="mb-8">
                <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h2 class="text-4xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  Premium Market Data
                </h2>
                <p class="text-xl mb-8" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Get comprehensive market overview with real-time data, commodity analysis, and trading insights.
                </p>
              </div>

              <!-- Features Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="p-6 rounded-xl border" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
                  <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Live Commodity Prices</h3>
                  <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Real-time price updates for all GCX commodities</p>
                </div>

                <div class="p-6 rounded-xl border" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
                  <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Advanced Charts</h3>
                  <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Technical analysis with interactive price charts</p>
                </div>

                <div class="p-6 rounded-xl border" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
                  <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-purple-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Market Reports</h3>
                  <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Detailed analysis and market insights</p>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  @click="showSubscriptionModal = true"
                  class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Subscribe Now - GHC 299/month
                </button>
                <button 
                  @click="showDemo = true"
                  class="px-8 py-4 border-2 border-yellow-500 text-yellow-500 font-bold rounded-xl hover:bg-yellow-500 hover:text-white transition-all duration-200"
                >
                  View GCX Market Data
                </button>
              </div>

              <p class="text-sm mt-6" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                * One-time yearly payment • Full access to market data platform
              </p>
            </div>
          </div>
        </div>


        <!-- Market Reports Tab -->
        <div v-if="activeTab === 'reports'" id="md-reports" class="space-y-8">
          <div class="text-center py-16">
            <div class="max-w-4xl mx-auto">
              <div class="mb-8">
                <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h2 class="text-4xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  Premium Market Reports
                </h2>
                <p class="text-xl mb-8" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Access detailed market analysis, weekly reports, and trading insights with our premium subscription.
                </p>
              </div>

              <!-- Sample Reports (Blurred) -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div class="rounded-xl border p-6 transition-all duration-200 relative overflow-hidden" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
                  <div class="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-600/20 backdrop-blur-sm flex items-center justify-center">
                    <span class="text-sm font-semibold text-slate-600">Premium Content</span>
                  </div>
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 rounded-lg bg-yellow-500/10">
                      <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Weekly Market Report</h3>
                      <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Latest Edition</p>
                    </div>
                  </div>
                  <p class="text-sm mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                    Comprehensive analysis of commodity price movements and market trends...
                  </p>
                </div>

                <div class="rounded-xl border p-6 transition-all duration-200 relative overflow-hidden" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
                  <div class="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-600/20 backdrop-blur-sm flex items-center justify-center">
                    <span class="text-sm font-semibold text-slate-600">Premium Content</span>
                  </div>
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 rounded-lg bg-blue-500/10">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Price Analysis</h3>
                      <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Daily Updates</p>
                    </div>
                  </div>
                  <p class="text-sm mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                    Detailed price analysis for all traded commodities with technical indicators...
                  </p>
                </div>

                <div class="rounded-xl border p-6 transition-all duration-200 relative overflow-hidden" :class="isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'">
                  <div class="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-600/20 backdrop-blur-sm flex items-center justify-center">
                    <span class="text-sm font-semibold text-slate-600">Premium Content</span>
                  </div>
                  <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 rounded-lg bg-green-500/10">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Volume Analysis</h3>
                      <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Real-time Data</p>
                    </div>
                  </div>
                  <p class="text-sm mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                    Trading volume analysis and liquidity assessment for all commodities...
                  </p>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          @click="showSubscriptionModal = true"
                          class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Subscribe Now - GHC 299/month
                        </button>
                <button class="px-8 py-4 border-2 border-blue-500 text-blue-500 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-200">
                  View Sample Report
                </button>
              </div>

                      <p class="text-sm mt-6" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                        * One-time yearly payment • Full access to market data platform
                      </p>
            </div>
          </div>
        </div>


      </div>
    </section>

    <!-- Subscription Modal -->
    <SubscriptionModal 
      :isOpen="showSubscriptionModal" 
      @close="showSubscriptionModal = false" 
    />
    
    <Footer />
  </div>
</template>
