<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../utils/darkMode'

const activeTab = ref('blog')
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section -->
    <section class="relative py-14 lg:py-20 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="Media" class="w-full h-full object-cover" />
        <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/40' : 'bg-white/40'"></div>
      </div>
      <div class="relative max-w-[1600px] mx-auto px-4 text-center">
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Media</h1>
        <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Blog insights, videos, and resources from GCX.</p>
      </div>
    </section>

    <!-- Simple Tab Navigation -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-[1600px] mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-6">
          <button
            @click="activeTab = 'blog'"
            class="px-8 py-3 text-base font-medium rounded-lg transition-all duration-300"
            :class="activeTab === 'blog' 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            Blog & Insights
          </button>
          <button
            @click="activeTab = 'videos'"
            class="px-8 py-3 text-base font-medium rounded-lg transition-all duration-300"
            :class="activeTab === 'videos' 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            Videos
          </button>
        </div>
      </div>
    </section>

    <!-- RTI Button Section -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-[1600px] mx-auto px-4 text-center">
        <a
          href="https://gcx.com.gh/gcxrti/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Right To Information (RTI) Portal
        </a>
      </div>
    </section>

    <!-- Tab Content -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
      <div class="max-w-[1600px] mx-auto px-4">
        <!-- Blog Tab -->
        <div v-if="activeTab === 'blog'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Blog & Insights</h3>
          <p class="text-lg mb-8" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Read our latest insights and analysis</p>
          <router-link
            to="/blog"
            class="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-all duration-300"
          >
            View Blog
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>

        <!-- Videos Tab -->
        <div v-if="activeTab === 'videos'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Videos</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Video content and presentations coming soon...</p>
        </div>
      </div>
    </section>
  </div>
</template>
