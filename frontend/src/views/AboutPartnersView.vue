<script setup lang="ts">
// About Partners page component
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
        Partners & Opportunities
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
        Discover our strategic partnerships and procurement opportunities that drive agricultural development in Ghana.
      </p>
    </section>

    <!-- Partners Overview Section -->
    <section class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Partners</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Strategic collaborations that strengthen agricultural commodity trading in Ghana
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div id="donor" class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-8">
          <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Donor Agencies</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
            International development partners supporting agricultural market development and capacity building.
          </p>
          <div class="text-center">
            <span class="inline-block bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full text-sm font-medium">
              8 Partners
            </span>
          </div>
        </div>

        <div id="financial" class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Financial Institutions</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
            Banks and financial service providers enabling trade finance and investment in agricultural commodities.
          </p>
          <div class="text-center">
            <span class="inline-block bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
              12 Partners
            </span>
          </div>
        </div>

        <div id="government" class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Government Agencies</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
            Public sector institutions providing regulatory framework and policy support for commodity trading.
          </p>
          <div class="text-center">
            <span class="inline-block bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              6 Partners
            </span>
          </div>
        </div>

        <div id="ngo" class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-8">
          <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Non-Governmental Organizations</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
            Civil society organizations promoting sustainable agriculture and rural development initiatives.
          </p>
          <div class="text-center">
            <span class="inline-block bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
              15 Partners
            </span>
          </div>
        </div>

        <div id="private" class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-8">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Private Agencies</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
            Private sector companies and organizations driving innovation and market development.
          </p>
          <div class="text-center">
            <span class="inline-block bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-medium">
              25 Partners
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Partners Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Partners</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Key organizations supporting our mission
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
          <img src="/Partners/1-ukaid.jpg" alt="UKAID" class="w-full h-16 object-contain mb-4" />
          <h3 class="text-sm font-semibold text-center text-gray-900 dark:text-white">UKAID</h3>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
          <img src="/Partners/agra.png" alt="AGRA" class="w-full h-16 object-contain mb-4" />
          <h3 class="text-sm font-semibold text-center text-gray-900 dark:text-white">AGRA</h3>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
          <img src="/Partners/ecobank.png" alt="Ecobank" class="w-full h-16 object-contain mb-4" />
          <h3 class="text-sm font-semibold text-center text-gray-900 dark:text-white">Ecobank</h3>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
          <img src="/Partners/ghana-exim-bank.jpg" alt="Ghana EXIM Bank" class="w-full h-16 object-contain mb-4" />
          <h3 class="text-sm font-semibold text-center text-gray-900 dark:text-white">Ghana EXIM Bank</h3>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
          <img src="/Partners/ghana-standard-authority-gsa.png" alt="GSA" class="w-full h-16 object-contain mb-4" />
          <h3 class="text-sm font-semibold text-center text-gray-900 dark:text-white">Ghana Standards Authority</h3>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
          <img src="/Partners/world-food-programme-wfp.jpg" alt="WFP" class="w-full h-16 object-contain mb-4" />
          <h3 class="text-sm font-semibold text-center text-gray-900 dark:text-white">World Food Programme</h3>
        </div>
      </div>
    </section>

    <!-- Tenders Section -->
    <section id="tenders" class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Procurement Opportunities</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Current tenders and procurement opportunities at GCX
        </p>
      </div>
      
      <div class="space-y-6">
        <!-- Active Tender -->
        <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg border-l-4 border-yellow-500">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <span class="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium mr-4">
                  Active
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">Closing: Dec 15, 2024</span>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                IT Infrastructure Upgrade and Maintenance Services
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Provision of comprehensive IT infrastructure upgrade and ongoing maintenance services for GCX trading platforms and systems.
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Technology</span>
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Infrastructure</span>
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Maintenance</span>
              </div>
            </div>
            <div class="lg:ml-6">
              <button class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Active Tender -->
        <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg border-l-4 border-green-500">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium mr-4">
                  Active
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">Closing: Dec 30, 2024</span>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Warehouse Management System Implementation
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Development and implementation of an integrated warehouse management system for GCX's commodity storage facilities.
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Software Development</span>
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Warehouse Management</span>
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">System Integration</span>
              </div>
            </div>
            <div class="lg:ml-6">
              <button class="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Upcoming Tender -->
        <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-4">
                <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-4">
                  Upcoming
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">Opening: Jan 10, 2025</span>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Market Data Analytics Platform Development
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Development of an advanced market data analytics platform to provide real-time insights and market intelligence.
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Data Analytics</span>
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Platform Development</span>
                <span class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm">Business Intelligence</span>
              </div>
            </div>
            <div class="lg:ml-6">
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Register Interest
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tender Information -->
      <div class="mt-12 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-8">
        <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to Participate</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold text-lg">1</span>
            </div>
            <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Register</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Register as a supplier on our procurement portal
            </p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold text-lg">2</span>
            </div>
            <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Download</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Download tender documents and review requirements
            </p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold text-lg">3</span>
            </div>
            <h4 class="font-semibold mb-2 text-gray-900 dark:text-white">Submit</h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Submit your proposal before the closing deadline
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 