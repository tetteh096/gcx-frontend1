<script setup lang="ts">

import { isDarkMode } from '../utils/darkMode'
import MembershipWidget from '../components/MembershipWidget.vue'

// Import new landing page components
import HeroSection from '../components/Landing/HeroSection.vue'

import ServicesSection from '../components/Landing/ServicesSection.vue'
import MarketDataSection from '../components/Landing/MarketDataSection.vue'
import NewsInsightsSection from '../components/Landing/NewsInsightsSection.vue'
import EventsSection from '../components/Landing/EventsSection.vue'
import PartnersSection from '../components/Landing/PartnersSection.vue'

import Footer from '../components/Footer.vue'


</script>

<style scoped>
/* Custom styles for the home page */
</style>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- 1. Market Slider - Live Market Data -->
    <HeroSection />
    
         <!-- 2. Why Join Us Section -->
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
     
     <!-- 7. Partners Section -->
     <PartnersSection />
     
     <!-- 8. News & Insights Section -->
     <NewsInsightsSection />
     
     <!-- 9. Upcoming Events Section -->
     <EventsSection />
     
     <!-- 10. CTA Section -->
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
    
    <Footer />
  </div>
</template> 