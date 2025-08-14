<script setup lang="ts">

import { isDarkMode } from '../utils/darkMode'
import MembershipWidget from '../components/MembershipWidget.vue'

// Import new landing page components
import HeroSection from '../components/Landing/HeroSection.vue'
import PartnersSection from '../components/Landing/PartnersSection.vue'
import ServicesSection from '../components/Landing/ServicesSection.vue'
import MarketDataSection from '../components/Landing/MarketDataSection.vue'
import NewsInsightsSection from '../components/Landing/NewsInsightsSection.vue'
import EventsSection from '../components/Landing/EventsSection.vue'
import TradingViewTicker from '../components/Landing/TradingViewTicker.vue'
import Footer from '../components/Footer.vue'


</script>

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

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- 1. Market Slider - Live Market Data -->
    <HeroSection />
    
    <!-- 2. Partnership Bar -->
    <section class="py-4 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="w-full px-6">
        <div class="relative overflow-hidden">
          <div 
            class="flex animate-scroll hover:pause-animation"
            @mouseenter="(event) => (event.target as HTMLElement)?.classList.add('pause-animation')"
            @mouseleave="(event) => (event.target as HTMLElement)?.classList.remove('pause-animation')"
          >
            <!-- First set of partners -->
            <div class="flex items-center space-x-8 px-6">
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-grains-council-ggc.png" alt="Ghana Grains Council" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ipmc.jpg" alt="IPMC" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/africa-cashew-alliance.png" alt="Africa Cashew Alliance" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/6-ciag.jpg" alt="CIAG" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-exim-bank.jpg" alt="Ghana EXIM Bank" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-export-promotion-authority-gepa.png" alt="Ghana Export Promotion Authority" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-standard-authority-gsa.png" alt="Ghana Standard Authority" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/standard-chartered.jpg" alt="Standard Chartered" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/fidelity-bank.png" alt="Fidelity Bank" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ecobank.png" alt="Ecobank" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/giz-logo.gif" alt="GIZ" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/agra.png" alt="AGRA" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/1-ukaid.jpg" alt="UKAID" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/unido.png" alt="UNIDO" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/world-food-programme-wfp.jpg" alt="World Food Programme" class="max-w-full max-h-full object-contain" />
              </div>
            </div>
            
            <!-- Duplicate set for seamless loop -->
            <div class="flex items-center space-x-8 px-6">
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-grains-council-ggc.png" alt="Ghana Grains Council" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ipmc.jpg" alt="IPMC" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/africa-cashew-alliance.png" alt="Africa Cashew Alliance" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/6-ciag.jpg" alt="CIAG" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-exim-bank.jpg" alt="Ghana EXIM Bank" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-export-promotion-authority-gepa.png" alt="Ghana Export Promotion Authority" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ghana-standard-authority-gsa.png" alt="Ghana Standard Authority" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/standard-chartered.jpg" alt="Standard Chartered" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/fidelity-bank.png" alt="Fidelity Bank" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/ecobank.png" alt="Ecobank" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/giz-logo.gif" alt="GIZ" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/agra.png" alt="AGRA" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/1-ukaid.jpg" alt="UKAID" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/unido.png" alt="UNIDO" class="max-w-full max-h-full object-contain" />
              </div>
              <div class="flex items-center justify-center w-24 h-12 rounded-lg shadow-sm border hover:shadow-md transition-shadow" :class="isDarkMode ? 'bg-slate-700 border-slate-600 hover:shadow-md hover:shadow-slate-900/50' : 'bg-white border-slate-200 hover:shadow-md'">
                <img src="/Partners/world-food-programme-wfp.jpg" alt="World Food Programme" class="max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- View All Partners Button -->
        <div class="text-center mt-4">
          <button 
            @click="() => $router.push('/about/partnership')"
            class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            View All Partners →
          </button>
        </div>
      </div>
    </section>
    



    
         <!-- 3. Why Join Us Section -->
     <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-white to-yellow-50'">
       <div class="max-w-7xl mx-auto px-6">
         <div class="text-center mb-12">
           <h2 class="text-4xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Why Join The Ghana Commodity Exchange?</h2>
           <p class="text-xl mb-2 transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Connecting Markets, Connecting People, Providing Opportunities</p>
         </div>
         
         <div class="grid lg:grid-cols-3 gap-8">
           <!-- What is GCX -->
           <div class="rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-slate-900/50' : 'bg-white border-yellow-100 hover:shadow-xl'">
             <div class="w-full h-48 mb-6 rounded-xl overflow-hidden">
               <img src="/trading dashboard.jpg" alt="Trading Platform" class="w-full h-full object-cover" />
             </div>
             <h3 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">What is GCX?</h3>
             <p class="leading-relaxed transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
               Simply put, GCX is a marketplace or a platform for buying and selling listed commodities. Starting with spot contracts for physical products, GCX will later trade in futures and options contracts for the listed commodities.
             </p>
           </div>
           
           <!-- Benefits to Members -->
           <div class="rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-slate-900/50' : 'bg-white border-yellow-100 hover:shadow-xl'">
             <div class="w-full h-48 mb-6 rounded-xl overflow-hidden">
               <img src="/crop.jpg" alt="Agricultural Trading" class="w-full h-full object-cover" />
             </div>
             <h3 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Benefits to Members</h3>
             <p class="leading-relaxed transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
               As a member, you gain access to a wide range of market actors (buyers and sellers) thereby creating opportunities for you to increase your revenue stream in a simplified manner, and without risk.
             </p>
           </div>
           
           <!-- Benefits to Society -->
           <div class="rounded-2xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-slate-900/50' : 'bg-white border-yellow-100 hover:shadow-xl'">
             <div class="w-full h-48 mb-6 rounded-xl overflow-hidden">
               <img src="/trading.jpg" alt="Trading Platform" class="w-full h-full object-cover" />
             </div>
             <h3 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Benefits to Society</h3>
             <p class="leading-relaxed transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
               Apart from job creation, agricultural economic transformation will occur through the myriad of opportunities for value chain actors to achieve high levels of sustainable and equitable growth, from farmers who receive a premium on quality grains to traders who are guaranteed the right quality, with cash and contract settlement within a few days.
             </p>
           </div>
         </div>
       </div>
     </section>
     
     <!-- 4. Services Section -->
     <ServicesSection />
     
     <!-- 5. Market Data Section with Graphs -->
     <MarketDataSection />
     
     <!-- 6. Join the Exchange Section -->
     <MembershipWidget />
     
     <!-- 7. News & Insights Section -->
     <NewsInsightsSection />
     
     <!-- 8. Upcoming Events Section -->
     <EventsSection />
     
     <!-- 9. CTA Section -->
    <section class="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-black mb-4">GHANA COMMODITY EXCHANGE</h1>
          <p class="text-2xl text-black/80 mb-2">Connecting Markets, Connecting People, Providing Opportunities</p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Register Section -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 class="text-3xl font-bold text-black mb-4">Register to become a member</h2>
            <p class="text-xl text-black/80 mb-6">And be part of a growing network</p>
            <button class="bg-black hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
              Become a Member
            </button>
          </div>
          
          <!-- Download Forms Section -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 class="text-3xl font-bold text-black mb-4">Download Forms and Other resources</h2>
            <p class="text-xl text-black/80 mb-6">Get access to much more information</p>
            <button class="bg-white/20 hover:bg-white/30 text-black font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- TradingView Ticker Widget -->
    <TradingViewTicker />
    
    <Footer />
  </div>
</template> 