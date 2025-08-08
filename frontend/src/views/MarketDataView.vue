<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../utils/darkMode'

const tabs = [
  { label: 'Live Prices', key: 'prices' },
  { label: 'Market Reports', key: 'reports' },
  { label: 'Trading Statistics', key: 'stats' },
  { label: 'Price History', key: 'history' },
]

const activeTab = ref('prices')
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
        <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Real-time market information, prices, reports, and trading statistics.</p>
      </div>
    </section>

    <!-- Tab Navigation -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-[1600px] mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-2 lg:gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="px-6 py-3 text-sm font-medium rounded-full transition-all duration-300"
            :class="activeTab === tab.key 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Tab Content -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
      <div class="max-w-[1600px] mx-auto px-4">
        <!-- Live Prices Tab -->
        <div v-if="activeTab === 'prices'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Live Prices</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Real-time commodity price updates coming soon...</p>
        </div>

        <!-- Market Reports Tab -->
        <div v-if="activeTab === 'reports'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Market Reports</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Comprehensive market analysis reports coming soon...</p>
        </div>

        <!-- Trading Statistics Tab -->
        <div v-if="activeTab === 'stats'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Trading Statistics</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Detailed trading performance data coming soon...</p>
        </div>

        <!-- Price History Tab -->
        <div v-if="activeTab === 'history'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Price History</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Historical price trends and analysis coming soon...</p>
        </div>
      </div>
    </section>
  </div>
</template>
