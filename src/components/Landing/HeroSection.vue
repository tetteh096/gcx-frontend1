<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { ChevronRightIcon, ChevronLeftIcon, PhoneIcon, CheckCircleIcon, LockClosedIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
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
const isHovered = ref(false)
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
  if (!isHovered.value) {
    slideInterval = setInterval(nextSlide, 8000) // Slower transition: 8 seconds
  }
}

const stopSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = undefined
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
  stopSlideShow()
}

const handleMouseLeave = () => {
  isHovered.value = false
  startSlideShow()
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
    <div 
      class="relative transition-all duration-500 ease-in-out" 
      :class="heroHeight"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Slide 1: Trading Dashboard -->
      <div 
        class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
        :class="{ 'opacity-100 z-10': currentSlide === 0, 'opacity-0 z-0': currentSlide !== 0 }"
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
                      Become a Member
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

      <!-- Slide 2: Free SHS Feeding Program -->
      <div 
        class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
        :class="{ 'opacity-100 z-10': currentSlide === 1, 'opacity-0 z-0': currentSlide !== 1 }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-green-900/80"></div>
        <img :src="getImagePath('/964789397755_1639105501636.jpg')" alt="Free SHS Feeding Program" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-6 lg:px-12">
            <div class="w-full">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-white">
                  <div class="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Social Impact Initiative
                  </div>
                  
                  <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Free SHS 
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                      Feeding Program
                    </span>
                  </h1>
                  
                  <p class="text-xl text-slate-300 mb-8 max-w-lg">
                    Supporting Ghana's education sector by providing quality food supplies to Senior High Schools. Suppliers can apply to participate in this impactful program.
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <RouterLink
                      to="/membership"
                      class="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                      Learn More
                    </RouterLink>
                    <RouterLink
                      to="/commodities"
                      class="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all"
                    >
                      Browse Commodities
                    </RouterLink>
                  </div>
                </div>

                <!-- Right Content - Application Button -->
                <div class="lg:mt-0 mt-12 relative z-50">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 relative z-50">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-xl">Supplier Application</h3>
                      <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div class="space-y-6">
                      <div class="text-center">
                        <p class="text-slate-300 text-lg mb-6">
                          Are you a supplier interested in participating in the Free SHS Feeding Program?
                        </p>
                        <p class="text-slate-400 text-sm mb-8">
                          Submit your application to become a certified supplier and help feed Ghana's future leaders.
                        </p>
                      </div>
                      
                      <a
                        href="http://104.236.10.13" 
                        target="_blank"
                        rel="noopener noreferrer"
                        class="relative z-50 w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg text-lg cursor-pointer"
                        @click.stop
                      >
                        Apply as Supplier
                        <ChevronRightIcon class="ml-2 h-6 w-6" />
                      </a>
                      
                      <div class="pt-4 border-t border-white/10">
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span class="text-green-400 font-bold text-sm">✓</span>
                          </div>
                          <div>
                            <div class="text-white font-semibold text-sm mb-1">Quick Application Process</div>
                            <div class="text-slate-300 text-xs">Fill out the form on our application portal</div>
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

      <!-- Slide 3: USSD App -->
      <div 
        class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
        :class="{ 'opacity-100 z-10': currentSlide === 2, 'opacity-0 z-0': currentSlide !== 2 }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-800/70 to-red-900/80"></div>
        <img :src="getImagePath('/trading.jpg')" alt="USSD Trading App" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-6 lg:px-12">
            <div class="w-full">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-white">
                  <div class="inline-flex items-center px-4 py-2 bg-red-500/20 rounded-full text-red-300 text-sm font-medium mb-6">
                    <span class="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                    Mobile Trading Platform
                  </div>
                  
                  <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Trade Anywhere with Our
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                      USSD App
                    </span>
                  </h1>
                  
                  <p class="text-xl text-slate-300 mb-8 max-w-lg">
                    Buy and sell commodities directly from your mobile phone using our simple USSD platform. No internet required - just dial *998# and start trading.
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <RouterLink
                      to="/ussd-register"
                      class="relative z-50 inline-flex items-center justify-center bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                      @click.stop
                    >
                      Register Now
                      <ChevronRightIcon class="ml-2 h-5 w-5" />
                    </RouterLink>
                    <RouterLink
                      to="/market-data"
                      class="inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all"
                    >
                      View Market Data
                    </RouterLink>
                  </div>

                  <!-- Quick Info -->
                  <div class="flex items-center space-x-6 text-sm">
                    <div class="flex items-center">
                      <PhoneIcon class="h-5 w-5 text-red-400 mr-2" />
                      <span class="text-slate-300">Dial *998#</span>
                    </div>
                    <div class="flex items-center">
                      <CheckCircleIcon class="h-5 w-5 text-green-400 mr-2" />
                      <span class="text-slate-300">No Internet Required</span>
                    </div>
                  </div>
                </div>

                <!-- Right Content - USSD Features -->
                <div class="lg:mt-0 mt-12 relative z-50">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-xl">USSD Features</h3>
                      <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                          <PhoneIcon class="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <div class="text-white font-semibold">Easy Registration</div>
                          <div class="text-slate-300 text-sm">Simple 5-step process via USSD</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                          <ShoppingCartIcon class="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <div class="text-white font-semibold">Buy & Sell Commodities</div>
                          <div class="text-slate-300 text-sm">Trade maize, rice, soya, and more</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                          <LockClosedIcon class="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <div class="text-white font-semibold">Secure Transactions</div>
                          <div class="text-slate-300 text-sm">PIN-protected account & trades</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                          <CheckCircleIcon class="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <div class="text-white font-semibold">Works on Any Phone</div>
                          <div class="text-slate-300 text-sm">No smartphone or app needed</div>
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
        @click.stop="prevSlide"
        class="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all backdrop-blur-md z-50 cursor-pointer"
      >
        <ChevronLeftIcon class="h-6 w-6 text-white" />
      </button>
      <button
        @click.stop="nextSlide"
        class="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all backdrop-blur-md z-50 cursor-pointer"
      >
        <ChevronRightIcon class="h-6 w-6 text-white" />
      </button>

      <!-- Slide Indicators -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        <button
          v-for="(slide, index) in 3"
          :key="index"
          @click.stop="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-200 cursor-pointer"
          :class="index === currentSlide ? 'bg-yellow-500' : 'bg-white/50 hover:bg-white/75'"
        ></button>
      </div>
    </div>

    <!-- News Ticker -->
    <NewsTicker />
  </section>
</template>
