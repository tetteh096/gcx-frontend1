<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isDarkMode } from '../../utils/darkMode'

const router = useRouter()

const navigateToPartners = () => {
  router.push('/about/partnership')
}
</script>

<template>
  <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
    <div class="w-full px-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-3 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Our Trusted Partners</h2>
        <p class="text-lg mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Working together to transform Ghana's agricultural trading landscape</p>
        <button 
          @click="navigateToPartners"
          class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm"
        >
          View All Partners →
        </button>
      </div>
      
      <!-- Partners Slider - Single Row -->
      <div class="relative overflow-hidden">
        <div 
          class="flex animate-scroll hover:pause-animation"
          @mouseenter="(event) => (event.target as HTMLElement)?.classList.add('pause-animation')"
          @mouseleave="(event) => (event.target as HTMLElement)?.classList.remove('pause-animation')"
        >
          <!-- First set of partners -->
          <div class="flex items-center space-x-8 px-6">
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-grains-council-ggc.png" alt="Ghana Grains Council" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ipmc.jpg" alt="IPMC" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/africa-cashew-alliance.png" alt="Africa Cashew Alliance" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/6-ciag.jpg" alt="CIAG" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-exim-bank.jpg" alt="Ghana EXIM Bank" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-export-promotion-authority-gepa.png" alt="Ghana Export Promotion Authority" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-standard-authority-gsa.png" alt="Ghana Standard Authority" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/standard-chartered.jpg" alt="Standard Chartered" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/fidelity-bank.png" alt="Fidelity Bank" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ecobank.png" alt="Ecobank" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/giz-logo.gif" alt="GIZ" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/agra.png" alt="AGRA" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/1-ukaid.jpg" alt="UKAID" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/unido.png" alt="UNIDO" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/world-food-programme-wfp.jpg" alt="World Food Programme" class="max-w-full max-h-full object-contain" />
            </div>
          </div>
          
          <!-- Duplicate set for seamless loop -->
          <div class="flex items-center space-x-8 px-6">
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-grains-council-ggc.png" alt="Ghana Grains Council" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ipmc.jpg" alt="IPMC" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/africa-cashew-alliance.png" alt="Africa Cashew Alliance" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/6-ciag.jpg" alt="CIAG" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-exim-bank.jpg" alt="Ghana EXIM Bank" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-export-promotion-authority-gepa.png" alt="Ghana Export Promotion Authority" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ghana-standard-authority-gsa.png" alt="Ghana Standard Authority" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/standard-chartered.jpg" alt="Standard Chartered" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/fidelity-bank.png" alt="Fidelity Bank" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/ecobank.png" alt="Ecobank" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/giz-logo.gif" alt="GIZ" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/agra.png" alt="AGRA" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/1-ukaid.jpg" alt="UKAID" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/unido.png" alt="UNIDO" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex items-center justify-center w-28 h-16 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
              <img src="/Partners/world-food-programme-wfp.jpg" alt="World Food Programme" class="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.pause-animation {
  animation-play-state: paused;
}
</style>
