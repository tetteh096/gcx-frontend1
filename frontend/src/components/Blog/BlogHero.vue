<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { isDarkMode } from '../../utils/darkMode'

const email = ref('')
const { t } = useI18n()
const isSubscribing = ref(false)

const subscribe = () => {
  if (email.value) {
    isSubscribing.value = true
    // Simulate API call
    setTimeout(() => {
      isSubscribing.value = false
      email.value = ''
      alert('Thank you for subscribing to GCX Blog!')
    }, 1000)
  }
}
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <div class="absolute inset-0">
      <img src="/trading dashboard.jpg" alt="GCX Blog" class="w-full h-full object-cover" />
      <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/60' : 'bg-white/80'"></div>
    </div>
    <div class="relative max-w-[1600px] mx-auto px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <div class="mb-10">
          <div class="inline-block px-4 py-2 rounded-full mb-6" :class="isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'">
            <span class="text-base font-semibold">Our Blog</span>
          </div>
          <h1 class="text-5xl lg:text-6xl font-bold mb-6" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Stories and Insights
          </h1>
          <p class="text-xl max-w-3xl mx-auto mb-10" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            Subscribe to learn about new trading features, the latest in agricultural technology, market solutions, and industry updates.
          </p>
        </div>
        
        <!-- Subscription Form -->
        <div class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div class="flex-1">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              :class="isDarkMode ? 'bg-white/90 border-slate-300 text-slate-900 placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'"
            />
          </div>
          <button
            @click="subscribe"
            :disabled="isSubscribing"
            class="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
          </button>
        </div>
        
        <p class="text-sm mt-3" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          We care about your data in our 
          <a href="#" class="underline hover:text-yellow-500 transition-colors">privacy policy</a>
        </p>
      </div>
    </div>
  </section>
</template>
