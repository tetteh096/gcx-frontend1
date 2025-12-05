<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { isDarkMode } from '../utils/darkMode'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import USSDGuide from '../components/Landing/USSDGuide.vue'
import { PhoneIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()

onMounted(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="min-h-screen flex flex-col" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <Navbar />
    
    <!-- Hero Section -->
    <section 
      class="relative py-20 sm:py-24 lg:py-32 transition-colors duration-300"
      :class="isDarkMode ? 'bg-gradient-to-br from-green-900/20 via-slate-900 to-slate-900' : 'bg-gradient-to-br from-green-50 via-white to-white'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Icon -->
          <div class="flex justify-center mb-6">
            <div 
              class="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300"
              :class="isDarkMode ? 'bg-green-600/20 border-2 border-green-500/50' : 'bg-green-100 border-2 border-green-200'"
            >
              <PhoneIcon 
                class="w-10 h-10 transition-colors duration-300"
                :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
              />
            </div>
          </div>
          
          <!-- Title -->
          <h1 
            class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300"
            :class="isDarkMode ? 'text-white' : 'text-slate-900'"
          >
            <span>USSD Trading</span>
            <span class="text-green-600 ml-2">Registration</span>
          </h1>
          
          <!-- Subtitle -->
          <p 
            class="text-lg sm:text-xl text-center max-w-3xl mx-auto mb-8 transition-colors duration-300"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
          >
            Follow the simple steps below to register and start trading commodities via USSD. 
            No internet connection required - just dial <span class="font-bold text-green-600">*998#</span> on your mobile phone.
          </p>
          
          <!-- Quick Info Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full mb-8 transition-colors duration-300"
               :class="isDarkMode ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-200'">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span class="text-sm font-medium">Available 24/7 • Works on Any Phone</span>
          </div>
        </div>
      </div>
    </section>

    <!-- USSD Guide Component -->
    <USSDGuide />

    <!-- Call to Action Section -->
    <section 
      class="py-16 transition-colors duration-300"
      :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          class="text-3xl sm:text-4xl font-bold mb-4 transition-colors duration-300"
          :class="isDarkMode ? 'text-white' : 'text-slate-900'"
        >
          Ready to Start Trading?
        </h2>
        <p 
          class="text-lg mb-8 transition-colors duration-300"
          :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
        >
          Dial <span class="font-bold text-green-600 text-xl">*998#</span> on your mobile phone now to begin your registration.
        </p>
        <div 
          class="inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          :class="isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'"
        >
          <PhoneIcon class="w-5 h-5 mr-2" />
          <span>Dial *998# Now</span>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

