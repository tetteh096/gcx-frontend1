<script setup lang="ts">
import { ChevronRightIcon, CalendarIcon, ClockIcon } from '@heroicons/vue/24/outline'
import { isDarkMode } from '../../utils/darkMode'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

const newsItems = [
  {
    title: "GCX Partners with World Vision for Agricultural Development",
    category: "Partnership",
    excerpt: "Landmark partnership to strengthen value chains and support smallholder farmers across Ghana. This collaboration will enhance market access and improve livelihoods for thousands of agricultural communities.",
    image: "/b(1).jpg",
    time: "2 hours ago",
    date: "January 25, 2025",
    author: "GCX Communications",
    color: "red"
  },
  {
    title: "Tanzania Delegation Visits GCX for Trade Collaboration",
    category: "International",
    excerpt: "Exploring regional commodity trading opportunities and knowledge sharing initiatives. The delegation discussed potential cross-border trading partnerships and technology transfer programs.",
    image: "/crop.jpg",
    time: "5 hours ago",
    date: "January 25, 2025",
    author: "GCX International",
    color: "yellow"
  },
  {
    title: "New Commodity Futures Launched",
    category: "Markets",
    excerpt: "Expanding market offerings with palm oil futures and enhanced trading instruments. This expansion provides traders with more hedging opportunities and market diversification.",
    image: "/trading.jpg",
    time: "1 day ago",
    date: "January 24, 2025",
    author: "GCX Markets",
    color: "green"
  }
]
</script>

<template>
  <section class="py-24 transition-colors duration-300" :class="isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'">
    <div class="max-w-[1600px] mx-auto px-8">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="text-5xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Latest News & Insights</h2>
        <p class="text-xl max-w-3xl mx-auto transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Stay informed with the latest developments from GCX</p>
      </div>
      
      <!-- Three News Cards Grid -->
      <div class="grid lg:grid-cols-3 gap-12">
        <div 
          v-for="(item, index) in newsItems" 
          :key="index"
          class="group rounded-3xl shadow-2xl overflow-hidden transition-all duration-500"
          :class="isDarkMode ? 'bg-slate-800' : 'bg-white'"
        >
          <!-- Image Section -->
          <div class="relative h-80 overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <!-- Category Badge -->
            <div class="absolute top-6 left-6">
              <span class="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg" :class="{
                'bg-red-500': item.color === 'red',
                'bg-yellow-500': item.color === 'yellow',
                'bg-green-500': item.color === 'green'
              }">
                {{ item.category }}
              </span>
            </div>
            <!-- Time Badge -->
            <div class="absolute top-6 right-6">
              <span class="px-3 py-2 rounded-lg text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
                {{ item.time }}
              </span>
            </div>
          </div>
          
          <!-- Content Section -->
          <div class="p-8">
            <div class="space-y-6">
              <!-- Meta Information -->
              <div class="flex items-center gap-4 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                <div class="flex items-center gap-2">
                  <CalendarIcon class="w-4 h-4" />
                  <span>{{ item.date }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <ClockIcon class="w-4 h-4" />
                  <span>{{ item.time }}</span>
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="text-2xl font-bold leading-tight transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ item.title }}
              </h3>
              
              <!-- Excerpt -->
              <p class="text-base leading-relaxed transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ item.excerpt }}
              </p>
              
              <!-- Author -->
              <div class="text-sm font-medium transition-colors duration-300" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                By {{ item.author }}
              </div>
              
              <!-- CTA Button -->
              <button class="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg text-base">
                Read Full Article
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All News Button -->
      <div class="text-center mt-16">
        <button class="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-lg">
          View All News & Insights →
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth transitions for news changes */
.transition-all {
  transition: all 0.5s ease-in-out;
}

/* Only image hover effect - no card movement */
.group:hover img {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg:grid-cols-3 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .gap-12 {
    gap: 2rem;
  }
  
  .py-24 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .mb-20 {
    margin-bottom: 3rem;
  }
  
  .mt-16 {
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .px-8 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .gap-12 {
    gap: 1.5rem;
  }
}
</style>
