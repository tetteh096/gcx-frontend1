<script setup lang="ts">
// About page component - Who We Are
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
        Who We Are
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
        Ghana Commodity Exchange (GCX) is a leading commodity exchange platform dedicated to transforming agricultural trading in Ghana and West Africa.
      </p>
    </section>

    <!-- Vision & Purpose Section -->
    <section id="vision" class="py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Vision & Purpose</h2>
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6">
              <h3 class="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Our Vision</h3>
              <p class="text-gray-700 dark:text-gray-300">
                To become the premier commodity exchange in West Africa, providing efficient, transparent, and accessible trading platforms for agricultural commodities.
              </p>
            </div>
            <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
              <h3 class="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">Our Mission</h3>
              <p class="text-gray-700 dark:text-gray-300">
                To facilitate fair and transparent trading of agricultural commodities, enhance market efficiency, and improve the livelihoods of farmers and traders across Ghana.
              </p>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 class="text-2xl font-bold mb-4">Our Core Values</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Transparency and Integrity</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Innovation and Excellence</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Farmer Empowerment</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Sustainable Development</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">What We Do</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          GCX provides comprehensive trading solutions for agricultural commodities
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Trading Platform</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center">
            Electronic trading platform for spot and futures contracts in agricultural commodities
          </p>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Market Data</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center">
            Real-time market information, price discovery, and trading analytics
          </p>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Clearing & Settlement</h3>
          <p class="text-gray-600 dark:text-gray-300 text-center">
            Secure clearing and settlement services ensuring trade execution and delivery
          </p>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Impact</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Transforming agricultural trading in Ghana
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">50,000+</div>
          <div class="text-gray-600 dark:text-gray-300">Farmers Registered</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">$500M+</div>
          <div class="text-gray-600 dark:text-gray-300">Trading Volume</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
          <div class="text-gray-600 dark:text-gray-300">Commodities Traded</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100+</div>
          <div class="text-gray-600 dark:text-gray-300">Trading Partners</div>
        </div>
      </div>
    </section>
  </div>
</template> 