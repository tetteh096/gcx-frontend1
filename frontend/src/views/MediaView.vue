<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../utils/darkMode'

const tabs = [
  { label: 'Latest News', key: 'news' },
  { label: 'Press Releases', key: 'press' },
  { label: 'Media Coverage', key: 'coverage' },
  { label: 'Photo Gallery', key: 'photos' },
  { label: 'Videos', key: 'videos' },
  { label: 'Webinars', key: 'webinars' },
]

const activeTab = ref('news')
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
        <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Latest news, press releases, and multimedia content from GCX.</p>
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
        <!-- Latest News Tab -->
        <div v-if="activeTab === 'news'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Latest News</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Recent news and announcements coming soon...</p>
        </div>

        <!-- Press Releases Tab -->
        <div v-if="activeTab === 'press'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Press Releases</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Official press releases and statements coming soon...</p>
        </div>

        <!-- Media Coverage Tab -->
        <div v-if="activeTab === 'coverage'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Media Coverage</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">GCX in the news and media coming soon...</p>
        </div>

        <!-- Photo Gallery Tab -->
        <div v-if="activeTab === 'photos'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Photo Gallery</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Event photos and visual content coming soon...</p>
        </div>

        <!-- Videos Tab -->
        <div v-if="activeTab === 'videos'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Videos</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Video content and presentations coming soon...</p>
        </div>

        <!-- Webinars Tab -->
        <div v-if="activeTab === 'webinars'" class="text-center py-12">
          <h3 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Webinars</h3>
          <p class="text-lg" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Educational webinars and events coming soon...</p>
        </div>
      </div>
    </section>
  </div>
</template>
