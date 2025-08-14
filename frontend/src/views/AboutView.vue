<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isDarkMode } from '../utils/darkMode';
import AboutGCX from '../components/AboutUs/AboutGCX.vue';
import VisionPurpose from '../components/AboutUs/VisionPurpose.vue';
import BoardDirectors from '../components/AboutUs/BoardDirectors.vue';
import ExecutiveManagement from '../components/AboutUs/ExecutiveManagement.vue';
import FunctionalHeads from '../components/AboutUs/FunctionalHeads.vue';

const route = useRoute()
const router = useRouter()

const tabs = [
  { label: 'About GCX', key: 'about' },
  { label: 'Mission', key: 'who' },
  { label: 'Vision & Purpose', key: 'vision' },
  { label: 'Board of Directors', key: 'board' },
  { label: 'Executive Management', key: 'exec' },
  { label: 'Functional Heads', key: 'func' },
];

const activeTab = ref('about');

const setActiveFromHash = () => {
  const hash = (route.hash || '').replace('#', '')
  if (tabs.some(tab => tab.key === hash)) {
    activeTab.value = hash
  } else {
    activeTab.value = 'about'
  }
}

const go = async (key: string) => {
  activeTab.value = key
  router.replace({ hash: `#${key}` })
  await nextTick()
  const el = document.getElementById(`tab-${key}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => setActiveFromHash())
watch(() => route.hash, setActiveFromHash)
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Compact Hero Section -->
    <section class="relative py-20 lg:py-32 transition-colors duration-300 overflow-hidden" :class="isDarkMode ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-yellow-50 via-white to-yellow-50'">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/trading dashboard.jpg" 
          alt="GCX Trading Platform" 
          class="w-full h-full object-cover opacity-60 dark:opacity-50"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-50/70 via-white/60 to-yellow-50/70 dark:from-slate-900/70 dark:via-slate-800/60 dark:to-slate-900/70"></div>
      </div>
      
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-10 left-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-pulse"></div>
        <div class="absolute top-0 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div class="relative max-w-[1600px] mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="mb-6">
            <span class="inline-block px-4 py-2 transition-colors duration-300 rounded-full text-sm font-semibold shadow-lg" :class="isDarkMode ? 'bg-yellow-900/80 text-yellow-200' : 'bg-yellow-100/90 text-yellow-800'">
              Ghana Commodity Exchange
            </span>
          </div>
          
          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-6xl font-bold mb-6 transition-colors duration-300 drop-shadow-lg" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            <span class="block bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              What is GCX
            </span>
          </h1>
          
          <!-- Description -->
          <p class="text-lg lg:text-xl font-bold transition-colors duration-300 leading-relaxed mb-8 drop-shadow-lg text-white">
            A regulated market that links buyers and sellers of commodities to trade by Rules, 
            while we assure the market quantity and quality, timely delivery and settlement.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Platform
            </button>
            <button class="px-6 py-3 border-2 border-yellow-500 font-semibold rounded-xl transition-all duration-300 shadow-lg" :class="isDarkMode ? 'text-yellow-400 hover:bg-yellow-900/20 bg-slate-900/50' : 'text-yellow-700 hover:bg-yellow-50 bg-white/80'">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Horizontal Tab Navigation -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-[1600px] mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-2 lg:gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="go(tab.key)"
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
        <!-- About GCX Tab -->
        <div id="tab-about" :class="activeTab === 'about' ? 'block' : 'hidden'">
          <AboutGCX />
        </div>

        <!-- Who We Are Tab -->
        <div id="tab-who" :class="activeTab === 'who' ? 'block' : 'hidden'" class="space-y-16">
          <div class="text-center mb-16">
            <h2 class="text-6xl font-bold mb-8 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Mission</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
            <p class="text-2xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              Ghana Commodity Exchange (GCX) is a leading commodity exchange platform dedicated to transforming agricultural trading in Ghana and West Africa.
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-10">
              <div>
                <h3 class="text-5xl font-bold mb-8 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Our Mission</h3>
                <p class="text-xl transition-colors duration-300 leading-relaxed mb-8" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  We provide innovative solutions for farmers, traders, and stakeholders, ensuring transparency, efficiency, and growth in the agricultural sector.
                </p>
                <p class="text-xl transition-colors duration-300 leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  Through our regulated marketplace, we connect agricultural producers with buyers, enabling fair pricing and secure transactions.
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="p-8 rounded-2xl border transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'">
                  <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl mb-6 flex items-center justify-center">
                    <div class="w-10 h-10 bg-white rounded-lg"></div>
                  </div>
                  <h4 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Transparency</h4>
                  <p class="text-lg transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                    Open and fair trading practices with clear pricing mechanisms
                  </p>
                </div>
                
                <div class="p-8 rounded-2xl border transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-6 flex items-center justify-center">
                    <div class="w-10 h-10 bg-white rounded-lg"></div>
                  </div>
                  <h4 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Efficiency</h4>
                  <p class="text-lg transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                    Streamlined processes for optimal market performance
                  </p>
                </div>
              </div>
            </div>
            
            <div class="relative">
              <img src="/crop.jpg" alt="Agricultural Trading" class="rounded-2xl shadow-2xl w-full" />
              <div class="absolute -bottom-6 -left-6 rounded-2xl p-8 shadow-xl border transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="text-4xl font-bold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">50K+</div>
                <div class="text-lg transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Farmers Connected</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vision & Purpose Tab -->
        <div id="tab-vision" :class="activeTab === 'vision' ? 'block' : 'hidden'">
          <VisionPurpose />
        </div>

        <!-- Board of Directors Tab -->
        <div id="tab-board" :class="activeTab === 'board' ? 'block' : 'hidden'">
          <BoardDirectors />
        </div>

        <!-- Executive Management Tab -->
        <div id="tab-exec" :class="activeTab === 'exec' ? 'block' : 'hidden'">
          <ExecutiveManagement />
        </div>

        <!-- Functional Heads Tab -->
        <div id="tab-func" :class="activeTab === 'func' ? 'block' : 'hidden'">
          <FunctionalHeads />
        </div>
      </div>
    </section>
  </div>
</template>
