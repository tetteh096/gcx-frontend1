<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { isDarkMode } from '../../utils/darkMode'

// Market stats
const marketStats = ref([
  { label: "Total Volume", value: "₵2.4B", change: "+12.5%", positive: true },
  { label: "Active Traders", value: "1,247", change: "+8.2%", positive: true },
  { label: "Commodities Listed", value: "15", change: "+2", positive: true },
  { label: "Market Cap", value: "₵8.9B", change: "+5.1%", positive: true }
])

// Live prices
const commodityPrices = ref([
  { symbol: "GAPWM2", name: "Maize", price: 1880, change: 0, volume: "2.4M" },
  { symbol: "GEJWM2", name: "Soybean", price: 4030, change: +125, volume: "1.8M" },
  { symbol: "GKIYM2", name: "Cocoa", price: 7335, change: -85, volume: "3.1M" },
  { symbol: "GSAWM2", name: "Sorghum", price: 4745, change: +67, volume: "890K" }
])

// Animated counter
const animatedValue = ref(0)
const targetValue = 2400000000 // 2.4B

// Slider functionality
const currentSlide = ref(0)
let slideInterval: number

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
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Slider Container -->
    <div class="relative h-[80vh]">
      <!-- Slide 1: Trading Dashboard -->
      <div 
        class="absolute inset-0 transition-opacity duration-1000"
        :class="{ 'opacity-100': currentSlide === 0, 'opacity-0': currentSlide !== 0 }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
        <img src="/trading dashboard.jpg" alt="Trading Dashboard" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center">
          <div class="w-full px-6 lg:px-12">
            <div class="w-full">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="text-white">
                  <div class="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300 text-sm font-medium mb-6">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                    Live Trading • Market Open
                  </div>
                  
                  <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Ghana's Premier 
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                      Commodity Exchange
                    </span>
                  </h1>
                  
                  <p class="text-xl text-slate-300 mb-8 max-w-lg">
                    Connecting markets, empowering traders, and driving Ghana's agricultural transformation through innovative trading solutions.
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <button class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                      Start Trading Today
                    </button>
                    <button class="border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all">
                      View Market Data
                    </button>
                  </div>

                  <!-- Animated Stats -->
                  <div class="grid grid-cols-2 gap-6">
                    <div class="text-center lg:text-left">
                      <div class="text-3xl font-bold text-yellow-400">₵{{ formatNumber(animatedValue) }}</div>
                      <div class="text-slate-400 text-sm">Total Trading Volume</div>
                    </div>
                    <div class="text-center lg:text-left">
                      <div class="text-3xl font-bold text-green-400">1,247+</div>
                      <div class="text-slate-400 text-sm">Active Members</div>
                    </div>
                  </div>
                </div>

                <!-- Right Content - Live Market Dashboard -->
                <div class="lg:mt-0 mt-12">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-lg">Live Market Overview</h3>
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
                        <div :class="stat.positive ? 'text-green-400' : 'text-red-400'" class="text-sm font-medium">
                          {{ stat.change }}
                        </div>
                      </div>
                    </div>

                    <!-- Quick Prices -->
                    <div class="space-y-2">
                      <div 
                        v-for="(commodity, index) in commodityPrices.slice(0, 4)" 
                        :key="commodity.symbol"
                        class="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-black text-xs font-bold mr-3">
                            {{ commodity.symbol.slice(0, 2) }}
                          </div>
                          <div>
                            <div class="text-white font-medium text-sm">{{ commodity.name }}</div>
                            <div class="text-slate-400 text-xs">{{ commodity.volume }} vol</div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-white font-bold">₵{{ commodity.price.toLocaleString() }}</div>
                          <div :class="commodity.change > 0 ? 'text-green-400' : commodity.change < 0 ? 'text-red-400' : 'text-slate-400'" class="text-xs">
                            {{ commodity.change > 0 ? '+' : '' }}{{ commodity.change }}
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
        <img src="/crop.jpg" alt="Agricultural Trading" class="w-full h-full object-cover" />
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
                    <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                      Join as Farmer
                    </button>
                    <button class="border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all">
                      Learn More
                    </button>
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
                          <div class="text-slate-300 text-sm">Connect with buyers nationwide</div>
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
        <img src="/trading.jpg" alt="Trading Platform" class="w-full h-full object-cover" />
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
                    Access cutting-edge trading technology with real-time data, advanced analytics, and secure execution for professional traders.
                  </p>
                  
                  <!-- CTA Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                      Start Trading
                    </button>
                    <button class="border-2 border-white/30 hover:border-white/60 text-white font-semibold py-4 px-8 rounded-xl transition-all">
                      View Platform
                    </button>
                  </div>
                </div>

                <!-- Right Content - Trading Features -->
                <div class="lg:mt-0 mt-12">
                  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div class="flex items-center justify-between mb-6">
                      <h3 class="text-white font-bold text-lg">Platform Features</h3>
                      <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">⚡</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Real-time Data</div>
                          <div class="text-slate-300 text-sm">Live market updates</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">📊</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Advanced Analytics</div>
                          <div class="text-slate-300 text-sm">Professional charts & tools</div>
                        </div>
                      </div>
                      
                      <div class="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span class="text-white font-bold">🔒</span>
                        </div>
                        <div>
                          <div class="text-white font-semibold">Secure Execution</div>
                          <div class="text-slate-300 text-sm">Bank-grade security</div>
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
  </section>
</template>
