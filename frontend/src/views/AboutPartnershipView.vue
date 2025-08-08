<script setup lang="ts">
import { ref } from 'vue';
import { isDarkMode } from '../utils/darkMode';

const partnershipCategories = [
  { label: 'Strategic Partners', key: 'partners' },
  { label: 'Donor Agencies', key: 'donors' },
  { label: 'Financial Institutions', key: 'financial' },
  { label: 'Government Agencies', key: 'government' },
  { label: 'NGOs', key: 'ngos' },
  { label: 'Private Agencies', key: 'private' },
  { label: 'Tenders & Procurement', key: 'tenders' },
];

const activeCategory = ref('partners');
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Section -->
    <section class="relative py-12 lg:py-16 transition-colors duration-300 overflow-hidden bg-white dark:bg-slate-900">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img 
          src="/trading.jpg" 
          alt="GCX Trading Platform" 
          class="w-full h-full object-cover opacity-60 dark:opacity-30"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-white/70 via-white/60 to-white/70 dark:from-slate-900/85 dark:via-slate-800/80 dark:to-slate-900/85 backdrop-blur-sm"></div>
      </div>
      
      <div class="relative max-w-[1600px] mx-auto px-4 text-center">
        <div class="mb-6">
          <span class="inline-block px-3 py-1 transition-colors duration-300 rounded-full text-sm font-semibold shadow-lg" :class="isDarkMode ? 'bg-yellow-900/80 text-yellow-200' : 'bg-yellow-100/90 text-yellow-800'">
            GCX Partnership Network
          </span>
        </div>
        
        <h1 class="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">
          <span class="block bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
            Strategic Partnerships
          </span>
          <span class="block text-2xl lg:text-3xl mt-2" :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'">
            Driving Growth
          </span>
        </h1>
        
        <p class="text-lg lg:text-xl font-medium max-w-4xl mx-auto leading-relaxed mb-8" :class="isDarkMode ? 'text-slate-200' : 'text-slate-700'">
          Driving Growth Building sustainable agricultural commodity trading through strategic collaborations with leading institutions, 
          government agencies, and development partners across West Africa and beyond.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button class="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Partner With Us
          </button>
          <button class="px-6 py-3 border-2 border-yellow-600 font-semibold rounded-lg transition-all duration-300 shadow-lg" :class="isDarkMode ? 'text-yellow-400 hover:bg-yellow-900/20 bg-slate-900/50' : 'text-yellow-700 hover:bg-yellow-50 bg-white/90'">
            View Opportunities
          </button>
        </div>
      </div>
    </section>

    <div class="max-w-[1600px] mx-auto px-4 py-16">
      <!-- Partnership Categories Navigation -->
      <div class="mb-16">
        <div class="border-b transition-colors duration-300" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
          <nav class="flex justify-center">
            <div class="flex space-x-1 md:space-x-6 overflow-x-auto">
              <button
                v-for="category in partnershipCategories"
                :key="category.key"
                @click="activeCategory = category.key"
                :class="[
                  'relative py-3 md:py-4 px-3 md:px-4 font-medium text-sm whitespace-nowrap transition-all duration-300 focus:outline-none rounded-t-md',
                  activeCategory === category.key
                    ? 'text-yellow-700 dark:text-yellow-400 border-b-2 border-yellow-600 dark:border-yellow-400 bg-white dark:bg-slate-800'
                    : (isDarkMode ? 'text-slate-300 hover:text-yellow-400 hover:border-b-2 hover:border-yellow-600' : 'text-slate-600 hover:text-yellow-700 hover:border-b-2 hover:border-yellow-300')
                ]"
              >
                {{ category.label }}
                <span
                  v-if="activeCategory === category.key"
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                ></span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <!-- Partnership Content -->
      <div class="transition-all duration-300">
        <!-- Strategic Partners -->
        <div v-if="activeCategory === 'partners'">
          <section class="py-12">
            <div class="text-center mb-10 md:mb-16">
              <h2 class="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Strategic Partners</h2>
              <p class="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Our strategic partnerships form the backbone of our operations, enabling us to deliver comprehensive solutions and drive innovation in agricultural commodity trading.
              </p>
            </div>
            
            <!-- Partner Logos Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/fbn.png" alt="FBN" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">FBN</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/2-summit_vision_logo.png" alt="Summit Vision" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Summit Vision</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/1-success-4-people.jpg" alt="Success 4 People" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Success 4 People</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/swiss-confederration-a-edit.jpeg" alt="Swiss Confederation" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Swiss Confederation</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/15-uba.png" alt="UBA" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">UBA</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/13-umb.jpg" alt="UMB" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">UMB</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/standard-chartered.jpg" alt="Standard Chartered" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Standard Chartered</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/zenith-logo.png" alt="Zenith Bank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Zenith Bank</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/ecobank.png" alt="Ecobank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ecobank</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/adb.jpg" alt="ADB" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">ADB</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/ghana-commercial-bank.png" alt="Ghana Commercial Bank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Commercial Bank</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/arb-apex-bank-ltd-a-edit.jpeg" alt="ARB Apex Bank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">ARB Apex Bank</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/fidelity-bank.png" alt="Fidelity Bank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Fidelity Bank</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/stra.partners/3-nsoatereman-rural-bank.jpg" alt="Nsoatereman Rural Bank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Nsoatereman Rural Bank</h4>
                </div>
              </div>
            </div>
            
            <!-- Partnership Categories -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Financial Institutions</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Strategic partnerships with leading banks and financial institutions providing trade financing and risk management solutions.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Trade Finance</span>
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Risk Management</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Development Partners</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Collaboration with international development agencies and organizations to advance agricultural development.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Capacity Building</span>
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Technical Support</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Rural Banking</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Partnerships with rural banks and financial institutions to support agricultural financing at the grassroots level.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Rural Finance</span>
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Agricultural Credit</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Donor Agencies -->
        <div v-if="activeCategory === 'donors'">
          <section class="py-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Donor Agencies</h2>
              <p class="text-xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Working with international development agencies to advance agricultural development and poverty reduction across West Africa.
              </p>
            </div>
            
            <!-- Donor Logos Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/1-ukaid.jpg" alt="UKAID" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">UKAID</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/usaid.png" alt="USAID" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">USAID</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/agra.png" alt="AGRA" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">AGRA</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/ifc.png" alt="IFC" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">IFC</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/giz-logo.gif" alt="GIZ" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">GIZ</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/snv.png" alt="SNV" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">SNV</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/undp_100.png" alt="UNDP" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">UNDP</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/unido.png" alt="UNIDO" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">UNIDO</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/ifad-a-edit.png" alt="IFAD" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">IFAD</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Donors/world-food-programme-wfp.jpg" alt="World Food Programme" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">World Food Programme</h4>
                </div>
              </div>
            </div>
            
            <!-- Donor Categories -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">International Development</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Strategic partnerships with major international development agencies providing funding and technical expertise.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">Funding</span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">Technical Support</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Agricultural Development</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Collaboration with specialized agricultural development organizations to enhance farming practices and market access.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">Capacity Building</span>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">Market Access</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">UN Agencies</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Partnerships with United Nations agencies supporting sustainable development goals and humanitarian assistance.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">SDG Support</span>
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Humanitarian Aid</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Financial Institutions -->
        <div v-if="activeCategory === 'financial'">
          <section class="py-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Financial Institutions</h2>
              <p class="text-xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Strategic alliances with leading financial institutions to provide comprehensive financial services and risk management solutions.
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="transition-colors duration-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 class="text-lg font-bold transition-colors duration-300 mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Commercial Banks</h4>
                <p class="transition-colors duration-300 text-sm mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Partnership with major commercial banks for trade financing and working capital solutions.
                </p>
                <div class="flex flex-wrap gap-1 justify-center">
                  <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Trade Finance</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 class="text-lg font-bold transition-colors duration-300 mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Insurance Companies</h4>
                <p class="transition-colors duration-300 text-sm mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Risk management partnerships providing agricultural insurance and trade credit protection.
                </p>
                <div class="flex flex-wrap gap-1 justify-center">
                  <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Risk Management</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 class="text-lg font-bold transition-colors duration-300 mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Investment Firms</h4>
                <p class="transition-colors duration-300 text-sm mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Strategic investment partnerships supporting expansion and technological advancement.
                </p>
                <div class="flex flex-wrap gap-1 justify-center">
                  <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Investment</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Government Agencies -->
        <div v-if="activeCategory === 'government'">
          <section class="py-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Government Agencies</h2>
              <p class="text-xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Collaborative partnerships with government institutions to support policy development and regulatory compliance.
              </p>
            </div>
            
            <!-- Government Agency Logos Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/youth-in-agriculture-programme-yiap.png" alt="Youth in Agriculture Programme" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Youth in Agriculture Programme</h4>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/ghana-incentive-based-risk-sharing-system-for-agricultural-lending-girsal.png" alt="GIRSAL" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Incentive-Based Risk-Sharing System for Agricultural Lending</h4>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/ghana-investment-promotion-centregipc.png" alt="Ghana Investment Promotion Centre" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Investment Promotion Centre</h4>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/ghana-export-promotion-authority-gepa.png" alt="Ghana Export Promotion Authority" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Export Promotion Authority</h4>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/ghana-exim-bank.jpg" alt="Ghana EXIM Bank" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana EXIM Bank</h4>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/ministry-of-finance-and-economic-planning-100.png" alt="Ministry of Finance and Economic Planning" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ministry of Finance and Economic Planning</h4>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/government/ministry-of-trade-and-industry-moti-100.png" alt="Ministry of Trade and Industry" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ministry of Trade and Industry</h4>
                </div>
              </div>
            </div>
            
            <!-- Category Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Policy Development</h3>
                <p class="transition-colors duration-300 text-center mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Working closely with government ministries to align operations with national development policies and support government initiatives.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">Policy Alignment</span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">National Development</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Regulatory Compliance</h3>
                <p class="transition-colors duration-300 text-center mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Ensuring full compliance with financial market regulations and developing appropriate regulatory frameworks for commodity exchange operations.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">Regulatory Compliance</span>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">Market Oversight</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Economic Development</h3>
                <p class="transition-colors duration-300 text-center mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Supporting economic growth through strategic partnerships with investment promotion and export development agencies.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Investment Promotion</span>
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Export Development</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- NGOs -->
        <div v-if="activeCategory === 'ngos'">
          <section class="py-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Non-Governmental Organizations</h2>
              <p class="text-xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Collaborating with NGOs to drive sustainable development and support grassroots agricultural initiatives.
              </p>
            </div>
            
            <!-- NGO Logos Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/ghana-made.png" alt="Ghana Made" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Made</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/pef.png" alt="PEF" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">PEF</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/aflasafe2.png" alt="Aflasafe" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Aflasafe</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/socodevi.jpeg" alt="Socodevi" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Socodevi</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/ghana-national-chamber-of-commerce-and-industry.jpg" alt="Ghana National Chamber of Commerce and Industry" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana National Chamber</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/6-ciag.jpg" alt="CIAG" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">CIAG</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/africa-cashew-alliance.png" alt="Africa Cashew Alliance" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Africa Cashew Alliance</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/ghana-rice-inter-professional-body-grib.png" alt="Ghana Rice Inter-Professional Body" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Rice Inter-Professional</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/peasant-farmers-association-of-ghana-pfag.jpg" alt="Peasant Farmers Association of Ghana" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Peasant Farmers Association</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/the-john-a-kufuor-foundation.jpg" alt="The John A. Kufuor Foundation" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">John A. Kufuor Foundation</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/NGO/iita.png" alt="IITA" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">IITA</h4>
                </div>
              </div>
            </div>
            
            <!-- NGO Categories -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Rural Development</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Partnering with organizations focused on rural development, farmer education, and sustainable agricultural practices to create lasting impact in farming communities.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">Rural Development</span>
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">Education</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Women's Empowerment</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Supporting initiatives that empower women farmers and traders, promoting gender equality and inclusive economic growth in agricultural value chains.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">Women Empowerment</span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">Inclusion</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Industry Associations</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Collaborating with industry associations and professional bodies to strengthen sector representation and advocacy for agricultural development.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Industry Advocacy</span>
                  <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Sector Development</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Private Agencies -->
        <div v-if="activeCategory === 'private'">
          <section class="py-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Private Agencies</h2>
              <p class="text-xl transition-colors duration-300 max-w-4xl mx-auto leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                Strategic alliances with private sector organizations driving innovation and market efficiency.
              </p>
            </div>
            
            <!-- Private Agency Logos Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/dmt-collateral.png" alt="DMT Collateral" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">DMT Collateral</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/intervalle-geneve.png" alt="Intervalle Geneve" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Intervalle Geneve</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/wienco.jpg" alt="Wienco" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Wienco</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/tatf.png" alt="TATF" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">TATF</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/dess-inc.png" alt="DESS Inc" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">DESS Inc</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/ipmc.jpg" alt="IPMC" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">IPMC</h4>
                </div>
              </div>
              <div class="transition-colors duration-300 rounded-2xl p-6 shadow-lg border hover:shadow-xl hover:scale-105 transform transition-all duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:bg-slate-50'">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-4 flex items-center justify-center">
                    <img src="/Private/ghana-grains-council-ggc.png" alt="Ghana Grains Council" class="max-w-full max-h-full object-contain" />
                  </div>
                  <h4 class="text-sm font-semibold transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Ghana Grains Council</h4>
                </div>
              </div>
            </div>
            
            <!-- Private Agency Categories -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Agtech Companies</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Innovation partnerships with agricultural technology firms developing solutions for modern farming and digital agriculture.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">Innovation</span>
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">Technology</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Logistics Providers</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Strategic partnerships with logistics companies ensuring efficient commodity transportation and warehousing solutions.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">Logistics</span>
                  <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">Transportation</span>
                </div>
              </div>
              
              <div class="transition-colors duration-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'">
                <div class="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 2v10a2 2 0 002 2h6a2 2 0 002-2V6M7 6h10M10 9v6m4-6v6" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold transition-colors duration-300 mb-4 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Processing Companies</h3>
                <p class="transition-colors duration-300 text-center mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                  Collaboration with agricultural processing companies to enhance value chain integration and market linkages.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs rounded-full">Processing</span>
                  <span class="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs rounded-full">Value Chain</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Tenders & Procurement -->
        <div v-if="activeCategory === 'tenders'">
          <section class="py-12">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Tenders & Procurement Opportunities</h2>
              <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Current procurement opportunities and tender announcements for partners and service providers.
              </p>
            </div>
            
            <div class="space-y-8">
              <!-- Current Tenders -->
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700">
                <h3 class="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">Current Open Tenders</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">IT Infrastructure Upgrade</h4>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">Seeking technology partners for platform modernization and security enhancement.</p>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-blue-600 dark:text-blue-400 font-semibold">Deadline: March 30, 2024</span>
                      <button class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Warehouse Management Services</h4>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">Procurement of comprehensive warehouse management and logistics services.</p>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-green-600 dark:text-green-400 font-semibold">Deadline: April 15, 2024</span>
                      <button class="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Upcoming Opportunities -->
              <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 border border-green-200 dark:border-green-700">
                <h3 class="text-2xl font-bold text-green-800 dark:text-green-300 mb-6">Upcoming Procurement Opportunities</h3>
                <div class="space-y-4">
                  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Agricultural Extension Services</h4>
                        <p class="text-gray-600 dark:text-gray-300">Professional services for farmer training and agricultural extension programs.</p>
                      </div>
                      <div class="text-center lg:text-right">
                        <span class="text-sm text-yellow-600 dark:text-yellow-400 font-semibold block">Expected: May 2024</span>
                        <button class="mt-2 px-4 py-2 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 text-sm rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors">
                          Register Interest
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Market Research & Analysis</h4>
                        <p class="text-gray-600 dark:text-gray-300">Comprehensive market research services for agricultural commodity markets across West Africa.</p>
                      </div>
                      <div class="text-center lg:text-right">
                        <span class="text-sm text-purple-600 dark:text-purple-400 font-semibold block">Expected: June 2024</span>
                        <button class="mt-2 px-4 py-2 border-2 border-purple-500 text-purple-600 dark:text-purple-400 text-sm rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          Register Interest
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Partnership Call -->
              <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-700 text-center">
                <h3 class="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">Partnership Opportunities</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                  We are continuously seeking strategic partners to enhance our services and expand our impact. If you're interested in collaborating with GCX, we'd love to hear from you.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <button class="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Submit Partnership Proposal
                  </button>
                  <button class="px-8 py-3 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 font-semibold rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300">
                    Download Partnership Guidelines
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
