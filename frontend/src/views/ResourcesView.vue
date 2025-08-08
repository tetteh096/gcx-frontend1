<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../utils/darkMode'

const tabs = [
  { label: 'Trading Guides', key: 'guides' },
  { label: 'Market Analysis', key: 'analysis' },
  { label: 'Best Practices', key: 'practices' },
  { label: 'Training Materials', key: 'training' },
  { label: 'Research Papers', key: 'research' },
  { label: 'Annual Reports', key: 'reports' },
  { label: 'Policy Documents', key: 'policy' },
]

const activeTab = ref('guides')
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section -->
    <section class="relative py-14 lg:py-20 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/crop.jpg" alt="Resources" class="w-full h-full object-cover" />
        <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/40' : 'bg-white/40'"></div>
      </div>
      <div class="relative max-w-[1600px] mx-auto px-4 text-center">
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Resources</h1>
        <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Educational materials, research papers, and comprehensive trading resources.</p>
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
        <!-- Trading Guides Tab -->
        <div v-if="activeTab === 'guides'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Trading Guides</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Comprehensive trading tutorials and guides coming soon...</p>
        </div>

        <!-- Market Analysis Tab -->
        <div v-if="activeTab === 'analysis'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Market Analysis</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">In-depth market research and analysis coming soon...</p>
        </div>

        <!-- Best Practices Tab -->
        <div v-if="activeTab === 'practices'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Best Practices</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Industry best practices and standards coming soon...</p>
        </div>

        <!-- Training Materials Tab -->
        <div v-if="activeTab === 'training'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Training Materials</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Educational resources for traders coming soon...</p>
        </div>

        <!-- Research Papers Tab -->
        <div v-if="activeTab === 'research'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Research Papers</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Academic and industry research publications coming soon...</p>
        </div>

        <!-- Annual Reports Tab -->
        <div v-if="activeTab === 'reports'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Annual Reports</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">GCX annual performance reports coming soon...</p>
        </div>

        <!-- Policy Documents Tab -->
        <div v-if="activeTab === 'policy'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Policy Documents</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Regulatory and policy information coming soon...</p>
        </div>
      </div>
    </section>
  </div>
</template>
