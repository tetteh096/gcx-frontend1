<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { isDarkMode } from '../utils/darkMode'
import Footer from '../components/Footer.vue'

const { t } = useI18n()

// Active tab state
const activeTab = ref('maize')

// Modal state
const showModal = ref(false)
const selectedCommodity = ref(null)

// Commodity data with real prices (T+1)
const commodityData = {
  maize: {
    name: 'Maize',
    description: 'Maize, also known as corn, has become a staple food in all parts of the world with total production surpassing that of rice or wheat. It is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago.',
    fullDescription: 'Maize, also known as corn, has become a staple food in all parts of the world with total production surpassing that of rice or wheat. It is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. The maize crop serves a number of purposes, from being used as animal feed or for products such as corn starch and corn syrup. In Ghana, maize is a critical food security crop and a major source of income for smallholder farmers. The crop is grown in all agro-ecological zones of the country and is used for both human consumption and animal feed. Maize production in Ghana has been increasing steadily due to improved varieties, better farming practices, and government support programs. The commodity exchange provides a platform for farmers to access better prices and reduce post-harvest losses through proper storage and marketing.',
    image: '/maize.jpg',
    fallbackImage: '/maize.jpg',
    category: 'Grains',
    contracts: [
      { code: 'GAPWM2', price: 1880, change: 15, volume: 1250 },
      { code: 'GAPWM3', price: 1240, change: -8, volume: 890 },
      { code: 'GAPYM2', price: 1200, change: 22, volume: 2100 },
      { code: 'GAPYM4', price: 1160, change: -5, volume: 750 },
    ],
    specifications: {
      contractSize: '50 bags (50kg each)',
      tradingHours: '9:00 AM - 4:00 PM',
      deliveryMonths: 'March, May, July, September',
      minimumPrice: 'GHS 800 per metric ton',
      maximumPrice: 'GHS 3000 per metric ton'
    },
    contractFile: '/gcx-online-trading-member.pdf'
  },
  rice: {
    name: 'Rice',
    description: 'Rice is one of the most important staple foods for a large part of the world\'s human population, especially in Asia and Africa. It is the agricultural commodity with the third-highest worldwide production after sugarcane and maize.',
    fullDescription: 'Rice is one of the most important staple foods for a large part of the world\'s human population, especially in Asia and Africa. It is the agricultural commodity with the third-highest worldwide production after sugarcane and maize. Rice cultivation is well-suited to countries and regions with low labor costs and high rainfall. In Ghana, rice is a major staple food and its consumption has been increasing rapidly due to urbanization and changing dietary habits. The country has significant potential for rice production, with both upland and lowland rice cultivation systems. The government has implemented various programs to boost rice production and reduce import dependency. Rice trading on the commodity exchange provides price discovery and market access for both producers and consumers, ensuring food security and fair pricing.',
    image: '/crop.jpg',
    fallbackImage: '/crop.jpg',
    category: 'Grains',
    contracts: [
      { code: 'GKIWM1', price: 1820, change: 12, volume: 980 },
      { code: 'GKIWM2', price: 3776, change: -18, volume: 1450 },
      { code: 'GKIWM3', price: 3970, change: 8, volume: 2200 },
      { code: 'GKIWM4', price: 1100, change: -3, volume: 650 },
      { code: 'GKIYM2', price: 7355, change: 25, volume: 3200 },
      { code: 'GKIYM3', price: 1120, change: -7, volume: 890 },
    ],
    specifications: {
      contractSize: '40 bags (50kg each)',
      tradingHours: '9:00 AM - 4:00 PM',
      deliveryMonths: 'April, June, August, October',
      minimumPrice: 'GHS 1000 per metric ton',
      maximumPrice: 'GHS 8000 per metric ton'
    },
    contractFile: '/gcx-online-trading-member.pdf'
  },
  sesame: {
    name: 'Sesame',
    description: 'Sesame is a flowering plant in the genus Sesamum, also called benne. Numerous wild relatives occur in Africa and a smaller number in India. It is widely naturalized in tropical regions around the world.',
    fullDescription: 'Sesame is a flowering plant in the genus Sesamum, also called benne. Numerous wild relatives occur in Africa and a smaller number in India. It is widely naturalized in tropical regions around the world and is cultivated for its edible seeds, which grow in pods. Sesame seeds are rich in oil, protein, and various nutrients, making them valuable for both culinary and industrial purposes. In Ghana, sesame is an important cash crop, particularly in the northern regions where it thrives in the dry climate. The crop is drought-resistant and requires minimal inputs, making it suitable for smallholder farmers. Sesame oil is used in cooking, cosmetics, and pharmaceuticals. The commodity exchange provides a platform for sesame farmers to access better markets and pricing, contributing to rural development and poverty reduction.',
    image: '/crop.jpg',
    fallbackImage: '/crop.jpg',
    category: 'Oilseeds',
    contracts: [
      { code: 'GSAWM1', price: 3145, change: 18, volume: 1100 },
      { code: 'GSAWM2', price: 4745, change: -12, volume: 1850 },
      { code: 'GSAWM3', price: 2684, change: 6, volume: 920 },
      { code: 'GSAWSS4', price: 3200, change: -9, volume: 750 },
      { code: 'GSAYM1', price: 3145, change: 14, volume: 1300 },
      { code: 'GSAYM2', price: 6290, change: 21, volume: 2800 },
      { code: 'GSAYM3', price: 2516, change: -4, volume: 680 },
    ],
    specifications: {
      contractSize: '30 bags (50kg each)',
      tradingHours: '9:00 AM - 4:00 PM',
      deliveryMonths: 'February, April, June, August',
      minimumPrice: 'GHS 2000 per metric ton',
      maximumPrice: 'GHS 7000 per metric ton'
    },
    contractFile: '/gcx-online-trading-member.pdf'
  },
  sorghum: {
    name: 'Sorghum',
    description: 'Sorghum is a genus of flowering plants in the grass family Poaceae. It is a drought-tolerant crop that can be grown in arid and semi-arid regions.',
    fullDescription: 'Sorghum is a genus of flowering plants in the grass family Poaceae. It is a drought-tolerant crop that can be grown in arid and semi-arid regions. Sorghum is used for food, animal feed, and the production of alcoholic beverages and biofuels. In Ghana, sorghum is particularly important in the northern regions where rainfall is limited and unpredictable. The crop is highly resilient to climate change and provides food security for many rural communities. Sorghum grains are used to make traditional foods like porridge and local beverages. The crop also serves as an important source of fodder for livestock. The commodity exchange facilitates better market access for sorghum farmers, helping them get fair prices for their produce and contributing to food security in the region.',
    image: '/sorghum.jpg',
    fallbackImage: '/sorghum.jpg',
    category: 'Grains',
    contracts: [
      { code: 'GKUWM1', price: 1480, change: 7, volume: 850 },
      { code: 'GKUWM2', price: 4645, change: -15, volume: 1650 },
      { code: 'GKUWM3', price: 1700, change: 3, volume: 720 },
      { code: 'GKUWM4', price: 1700, change: -2, volume: 680 },
      { code: 'GKUYM1', price: 1480, change: 9, volume: 920 },
      { code: 'GKUYM2', price: 4150, change: 16, volume: 2100 },
      { code: 'GKUYM3', price: 6515, change: -11, volume: 1850 },
      { code: 'GKUYM4', price: 1700, change: 5, volume: 750 },
      { code: 'GKUYSB3', price: 7418, change: 19, volume: 3200 },
    ],
    specifications: {
      contractSize: '50 bags (50kg each)',
      tradingHours: '9:00 AM - 4:00 PM',
      deliveryMonths: 'March, May, July, September',
      minimumPrice: 'GHS 1200 per metric ton',
      maximumPrice: 'GHS 8000 per metric ton'
    },
    contractFile: '/gcx-online-trading-member.pdf'
  },
  soybean: {
    name: 'Soya Bean',
    description: 'The soybean, soy bean, or soya bean is a species of legume native to East Asia, widely grown for its edible bean, which has numerous uses.',
    fullDescription: 'The soybean, soy bean, or soya bean is a species of legume native to East Asia, widely grown for its edible bean, which has numerous uses. Traditional unfermented food uses of soybeans include soy milk, from which tofu and tofu skin are made. Soybeans are also processed into oil, flour, and protein isolates used in various food products. In Ghana, soybean cultivation has been growing due to its high protein content and versatility. The crop is particularly important for improving soil fertility through nitrogen fixation. Soybeans are used in animal feed production, contributing to the livestock industry. The commodity exchange provides a platform for soybean farmers to access better markets and pricing, supporting the development of the legume sector and contributing to food security and nutrition.',
    image: '/crop.jpg',
    fallbackImage: '/crop.jpg',
    category: 'Legumes',
    contracts: [
      { code: 'GTAWM1', price: 4440, change: 13, volume: 1650 },
      { code: 'GTAWM2', price: 4405, change: -6, volume: 1200 },
      { code: 'GTAWM3', price: 1920, change: 4, volume: 850 },
      { code: 'GTAWM4', price: 1100, change: -8, volume: 650 },
      { code: 'GTAWSO3', price: 1550, change: 11, volume: 920 },
      { code: 'GTAYM1', price: 1480, change: -3, volume: 750 },
      { code: 'GTAYM2', price: 5929, change: 17, volume: 2800 },
      { code: 'GTAYM3', price: 1120, change: 7, volume: 890 },
      { code: 'GTAYSB1', price: 2800, change: -9, volume: 1100 },
      { code: 'GTAYSB2', price: 10390, change: 23, volume: 4200 },
      { code: 'GTUWM2', price: 5995, change: 15, volume: 1850 },
      { code: 'GTUYM2', price: 5690, change: 400, volume: 3200 },
    ],
    specifications: {
      contractSize: '40 bags (50kg each)',
      tradingHours: '9:00 AM - 4:00 PM',
      deliveryMonths: 'April, June, August, October',
      minimumPrice: 'GHS 1000 per metric ton',
      maximumPrice: 'GHS 12000 per metric ton'
    },
    contractFile: '/gcx-online-trading-member.pdf'
  }
}

// Computed properties
const activeCommodity = computed(() => commodityData[activeTab.value])
const commodityTabs = computed(() => Object.keys(commodityData))

// Functions
const formatPrice = (price: number) => {
  return `GHS ${price.toLocaleString()}`
}

const getPriceChangeColor = (change: number) => {
  if (change > 0) return 'text-green-600 dark:text-green-400'
  if (change < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const commodity = activeCommodity.value
  if (commodity && commodity.fallbackImage) {
    img.src = commodity.fallbackImage
  }
}

const downloadContract = (commodity: any) => {
  if (commodity.contractFile) {
    const link = document.createElement('a')
    link.href = commodity.contractFile
    link.download = `${commodity.name}-Contract-Specifications.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const openModal = (commodity: any) => {
  selectedCommodity.value = commodity
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCommodity.value = null
}

onMounted(() => {
  // Initialize with first commodity
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="Commodities Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-green-900/80 via-slate-800/70 to-yellow-900/90"></div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Live Market Data (T+1)
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Commodities
        </h1>
        <p class="text-xl lg:text-2xl max-w-4xl mx-auto text-white/80 mb-12 leading-relaxed">
          Access real-time commodity prices, market data, and trading information for agricultural products across Ghana.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">{{ commodityTabs.length }}</div>
            <div class="text-white/70 text-sm">Active Commodities</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">24/7</div>
            <div class="text-white/70 text-sm">Market Access</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">Real-time</div>
            <div class="text-white/70 text-sm">Price Updates</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Commodity Tabs Section -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Tab Navigation -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-center mb-8" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Commodity Markets
          </h2>
          
          <!-- Tabs -->
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button
              v-for="tab in commodityTabs"
              :key="tab"
              @click="activeTab = tab"
              class="px-6 py-3 font-semibold rounded-xl transition-all duration-300 capitalize"
              :class="activeTab === tab 
                ? 'bg-yellow-500 text-black shadow-lg' 
                : isDarkMode 
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                  : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'"
            >
              {{ commodityData[tab].name }}
            </button>
          </div>
        </div>

        <!-- Active Commodity Content -->
        <div v-if="activeCommodity" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Commodity Information -->
          <div class="space-y-8">
            <!-- Image -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                :src="activeCommodity.image"
                :alt="activeCommodity.name"
                @error="handleImageError"
                class="w-full h-80 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-white">
                <div class="flex items-center gap-3 mb-2">
                  <span class="px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-full">
                    {{ activeCommodity.category }}
                  </span>
                </div>
                <h3 class="text-3xl font-bold">{{ activeCommodity.name }}</h3>
              </div>
            </div>

            <!-- Description -->
            <div class="rounded-2xl p-8 shadow-lg" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
              <h4 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                About {{ activeCommodity.name }}
              </h4>
              <p class="text-lg leading-relaxed mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                {{ activeCommodity.description }}
              </p>
              <button 
                @click="openModal(activeCommodity)"
                class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors duration-200"
              >
                <span>Read More</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Specifications -->
            <div class="rounded-2xl p-8 shadow-lg" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
              <div class="flex justify-between items-center mb-6">
                <h4 class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  Contract Specifications
                </h4>
                <button 
                  @click="downloadContract(activeCommodity)"
                  class="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Contract
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(value, key) in activeCommodity.specifications" :key="key" class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                  <span class="font-medium capitalize" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                    {{ String(key).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}:
                  </span>
                  <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                    {{ value }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Data -->
          <div class="space-y-8">
            <!-- Current Prices Header -->
            <div class="text-center">
              <h4 class="text-3xl font-bold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                Current Prices (T+1)
              </h4>
              <p class="text-lg" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                Live commodity prices for {{ activeCommodity.name }}
              </p>
            </div>

            <!-- Contracts Table -->
            <div class="rounded-2xl shadow-2xl overflow-hidden" :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'">
              <div class="p-6">
                <h5 class="text-xl font-bold mb-6" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  Active Contracts
                </h5>
                
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="border-b" :class="isDarkMode ? 'border-slate-600' : 'border-gray-200'">
                      <tr>
                        <th class="text-left py-3 px-2 font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Contract Code</th>
                        <th class="text-right py-3 px-2 font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Closing Price (GHS)</th>
                        <th class="text-right py-3 px-2 font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Change</th>
                        <th class="text-right py-3 px-2 font-semibold" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Volume</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y" :class="isDarkMode ? 'divide-slate-600' : 'divide-gray-200'">
                      <tr v-for="contract in activeCommodity.contracts" :key="contract.code" class="hover:bg-opacity-50 transition-colors" :class="isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50'">
                        <td class="py-4 px-2">
                          <span class="font-mono font-semibold px-3 py-1 rounded-lg text-sm" :class="isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-slate-800'">
                            {{ contract.code }}
                          </span>
                        </td>
                        <td class="py-4 px-2 text-right">
                          <span class="text-lg font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                            {{ formatPrice(contract.price) }}
                          </span>
                        </td>
                        <td class="py-4 px-2 text-right">
                          <div class="flex items-center justify-end gap-1">
                            <svg v-if="contract.change > 0" class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                            <svg v-else-if="contract.change < 0" class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-9.2 9.2M7 7v10h10" />
                            </svg>
                            <span class="font-semibold" :class="getPriceChangeColor(contract.change)">
                              {{ contract.change >= 0 ? '+' : '' }}{{ contract.change }}
                            </span>
                          </div>
                        </td>
                        <td class="py-4 px-2 text-right">
                          <span class="font-medium" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                            {{ contract.volume.toLocaleString() }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Trading Actions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button class="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Start Trading
              </button>
              <button class="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Market Data
              </button>
            </div>

            <!-- Market Status -->
            <div class="text-center p-6 rounded-2xl" :class="isDarkMode ? 'bg-slate-700' : 'bg-gray-50'">
              <div class="flex items-center justify-center gap-2 mb-2">
                <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Market Status: Open</span>
              </div>
              <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                Trading hours: 9:00 AM - 4:00 PM (GMT)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeModal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'" @click.stop>
          <div class="px-6 py-4 border-b" :class="isDarkMode ? 'border-slate-700' : 'border-gray-200'">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                About {{ selectedCommodity?.name }}
              </h3>
              <button 
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="px-6 py-6">
            <div class="mb-6">
              <img 
                :src="selectedCommodity?.image" 
                :alt="selectedCommodity?.name"
                @error="handleImageError"
                class="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-full">
                  {{ selectedCommodity?.category }}
                </span>
              </div>
            </div>
            
            <div class="prose prose-lg max-w-none" :class="isDarkMode ? 'prose-invert' : ''">
              <p class="text-lg leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                {{ selectedCommodity?.fullDescription }}
              </p>
            </div>

            <!-- Contract Specifications in Modal -->
            <div class="mt-8 p-6 rounded-lg" :class="isDarkMode ? 'bg-slate-700' : 'bg-gray-50'">
              <h4 class="text-xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                Contract Specifications
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(value, key) in selectedCommodity?.specifications" :key="key" class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                  <span class="font-medium capitalize text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                    {{ String(key).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }}:
                  </span>
                  <span class="font-semibold text-sm" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                    {{ value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-4 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-gray-200'">
            <div class="flex justify-end gap-3">
              <button 
                @click="downloadContract(selectedCommodity)"
                class="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Contract
              </button>
              <button 
                @click="closeModal"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-track {
  background: #1e293b;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animation for floating elements */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
