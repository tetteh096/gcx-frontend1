<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

import { useTickerVisibility } from '../../composables/useTickerVisibility'
import { useI18n } from '../../composables/useI18n'
import { getImagePath } from '../../utils/imageUtils'
import NewsTicker from './NewsTicker.vue'

// Ticker visibility
const { isTickerVisible } = useTickerVisibility()
const { t } = useI18n()

// Dynamic hero height based on ticker visibility
const heroHeight = computed(() => {
  return isTickerVisible.value ? 'h-[calc(90vh-4rem)]' : 'h-[calc(90vh-3rem)]'
})

// Market stats
const marketStats = ref([
  { label: 'Value Settled', value: '₵2B+', description: 'Contracts cleared since launch' },
  { label: 'Warehouse Network', value: '9', description: 'Certified storage sites nationwide' },
  { label: 'Delivery Centres', value: '8+', description: 'Strategic hubs across Ghana' },
  { label: 'Active Commodities', value: '5', description: 'Maize, Rice, Soya, Sorghum, Sesame' }
])

// Commodity snapshot (T+1 indicative)
const commodityPrices = ref([
  { symbol: 'GAPWM2', name: 'White Maize', deliveryCentre: 'Afram Plains' },
  { symbol: 'GAPYM2', name: 'Yellow Maize', deliveryCentre: 'Afram Plains' },
  { symbol: 'GKUYM2', name: 'Yellow Soya Bean', deliveryCentre: 'Kumasi' },
  { symbol: 'GSRSM2', name: 'Sorghum', deliveryCentre: 'Saboba' },
  { symbol: 'GARRC2', name: 'Rice', deliveryCentre: 'Tamale' },
  { symbol: 'GSESM2', name: 'Sesame', deliveryCentre: 'Tamale' }
])

// Animated counter
const animatedValue = ref(0)
const targetValue = 2000000000 // 2.0B+

// Slider functionality
const currentSlide = ref(0)
let slideInterval: number | undefined

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 3
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? 2 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startSlideShow = () => {
  slideInterval = setInterval(nextSlide, 5000)
}

const stopSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = undefined
  }
}

const formatNumber = (num: number) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

onMounted(() => {
  // Animate the main counter
  const duration = 2000
  const increment = targetValue / (duration / 16)
  const timer = setInterval(() => {
    animatedValue.value += increment
    if (animatedValue.value >= targetValue) {
      animatedValue.value = targetValue
      clearInterval(timer)
    }
  }, 16)
  
  // Start slider
  startSlideShow()
})

onBeforeUnmount(() => {
  stopSlideShow()
})
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Slider Container -->
    <div class="relative transition-all duration-500 ease-in-out" :class="heroHeight">
      <!-- Slide 1: Trading Dashboard -->
      <div 
        class="absolute inset-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': currentSlide === 0, 'opacity-0': currentSlide !== 0 }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        <img :src="getImagePath('/trading dashboard.jpg')" alt="Trading Dashboard" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-6 lg:px-12">
            <div class="w-full">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-white">
                  <div class="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300 text-sm font-medium mb-6">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                    {{ t('pages.home.hero.features.realTimeData.title') }} • {{ t('common.status.online') }}
                  </div>
                  
                  <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    {{ t('pages.home.hero.title') }}
                  </h1>
                  
                  <p class="text-xl text-slate-300 mb-8 max-w-lg">
                    {{ t('pages.home.hero.subtitle') }}
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <RouterLink
                      to="/market-data"
                      class="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                      View Market Data
                    </RouterLink>
                    <RouterLink
                      to="/membership"
                      class="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all"
                    >
                      Membership Options
                    </RouterLink>
                  </div>

                  <!-- Animated Stats -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="text-center lg:text-left">
                      <div class="text-3xl font-bold text-yellow-400">₵{{ formatNumber(animatedValue) }}</div>
                      <div class="text-slate-400 text-sm">{{ t('pages.home.statistics.tradingVolume') }}</div>
                    </div>
                    <div class="text-center lg:text-left">
                      <div class="text-2xl font-semibold text-slate-300 uppercase tracking-wide">Warehouse Network</div>
                      <div class="text-3xl font-bold text-green-400 mt-2">Nine (9)</div>
                      <div class="text-slate-400 text-sm mt-1">Certified locations nationwide</div>
                    </div>
                  </div>
                </div>

                <!-- Right Content - Live Market Dashboard -->
                <div class="lg:mt-0 mt-12">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-lg">{{ t('pages.home.statistics.marketCap') }}</h3>
                      <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <!-- Market Stats Grid -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <div 
                        v-for="stat in marketStats" 
                        :key="stat.label"
                        class="bg-white/5 rounded-xl p-4 border border-white/10"
                      >
                        <div class="text-2xl font-bold text-white mb-1">{{ stat.value }}</div>
                        <div class="text-slate-300 text-xs mb-2">{{ stat.label }}</div>
                        <div class="text-slate-400 text-xs">
                          {{ stat.description }}
                        </div>
                      </div>
                    </div>

                    <!-- Quick Prices -->
                    <div class="space-y-2">
                      <div 
                        v-for="commodity in commodityPrices" 
                        :key="commodity.symbol"
                        class="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-black text-xs font-bold mr-3">
                            {{ commodity.symbol.slice(0, 2) }}
                          </div>
                          <div>
                            <div class="text-white font-medium text-sm">{{ commodity.name }}</div>
                            <div class="text-slate-400 text-xs">{{ commodity.symbol }}</div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-slate-300 text-xs">
                            {{ commodity.deliveryCentre }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 2: Farming -->
      <div 
        class="absolute inset-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': currentSlide === 1, 'opacity-0': currentSlide !== 1 }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-green-900/80"></div>
        <img :src="getImagePath('/crop.jpg')" alt="Agricultural Trading" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-6 lg:px-12">
            <div class="w-full">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-white">
                  <div class="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Agricultural Excellence
                  </div>
                  
                  <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Empowering 
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                      Farmers
                    </span>
                  </h1>
                  
                  <p class="text-xl text-slate-300 mb-8 max-w-lg">
                    Supporting Ghana's agricultural sector with transparent pricing, secure trading, and market access for farmers across the country.
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <RouterLink
                      to="/membership"
                      class="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                      Become a Member
                    </RouterLink>
                    <RouterLink
                      to="/commodities"
                      class="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all"
                    >
                      Browse Commodities
                    </RouterLink>
                  </div>
                </div>

                <!-- Right Content - Farming Stats -->
                <div class="lg:mt-0 mt-12">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-lg">Farmer Benefits</h3>
                      <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">✓</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Transparent Pricing</div>
                          <div class="text-slate-300 text-sm">Get fair market prices</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">✓</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Secure Payments</div>
                          <div class="text-slate-300 text-sm">Guaranteed payment system</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">✓</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Market Access</div>
                          <div class="text-slate-300 text-sm">Nationwide delivery network</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 3: Trading -->
      <div 
        class="absolute inset-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': currentSlide === 2, 'opacity-0': currentSlide !== 2 }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
        <img :src="getImagePath('/trading.jpg')" alt="Trading Platform" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-6 lg:px-12">
            <div class="w-full">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-white">
                  <div class="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                    Advanced Trading Platform
                  </div>
                  
                  <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Professional 
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      Trading
                    </span>
                  </h1>
                  
                  <p class="text-xl text-slate-300 mb-8 max-w-lg">
                    We provide market data, warehousing, quality assurance, and settlement services that connect farmers, traders, and buyers across Ghana.
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <RouterLink
                      to="/resources"
                      class="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                      Download Resources
                    </RouterLink>
                    <RouterLink
                      to="/contact"
                      class="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all"
                    >
                      Contact GCX
                    </RouterLink>
                  </div>
                </div>

                <!-- Right Content - Trading Features -->
                <div class="lg:mt-0 mt-12">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-lg">Exchange Services</h3>
                      <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">📈</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Market Information</div>
                          <div class="text-slate-300 text-sm">Daily price discovery & analytics</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">🏬</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Warehousing Network</div>
                          <div class="text-slate-300 text-sm">Certified storage & quality control</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">🤝</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Settlement Support</div>
                          <div class="text-slate-300 text-sm">Robust clearing & risk management</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <button
        @click="prevSlide"
        class="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all backdrop-blur-md"
      >
        <ChevronLeftIcon class="h-6 w-6 text-white" />
      </button>
      <button
        @click="nextSlide"
        class="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all backdrop-blur-md"
      >
        <ChevronRightIcon class="h-6 w-6 text-white" />
      </button>

      <!-- Slide Indicators -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        <button
          v-for="(slide, index) in 3"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-200"
          :class="index === currentSlide ? 'bg-yellow-500' : 'bg-white/50 hover:bg-white/75'"
        ></button>
      </div>
    </div>

    <!-- News Ticker -->
    <NewsTicker />
  </section>
</template>
