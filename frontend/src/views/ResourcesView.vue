<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isDarkMode } from '../utils/darkMode'

const route = useRoute()
const router = useRouter()

// Active section and tab
const activeSection = ref('publications')
const activeTab = ref('research')

// Publications tabs
const publicationsTabs = [
  { key: 'research', label: 'Research Papers', hash: '#research' },
  { key: 'annual', label: 'Annual Reports', hash: '#annual' },
  { key: 'policy', label: 'Policy Documents', hash: '#policy' }
]

// Careers tabs
const careersTabs = [
  { key: 'openings', label: 'Job Openings', hash: '#openings' },
  { key: 'internship', label: 'Internship', hash: '#internship' },
  { key: 'functional', label: 'Job Functional Areas', hash: '#functional' }
]

// Commodities tabs
const commoditiesTabs = [
  { key: 'maize', label: 'Maize', hash: '#maize' },
  { key: 'soybean', label: 'Soya Bean', hash: '#soybean' },
  { key: 'sorghum', label: 'Sorghum', hash: '#sorghum' },
  { key: 'sesame', label: 'Sesame', hash: '#sesame' },
  { key: 'rice', label: 'Rice', hash: '#rice' }
]

// Mock data for publications
const publications = ref({
  research: [
    {
      id: 1,
      title: "Agricultural Commodity Trading in West Africa: A Comprehensive Analysis",
      author: "Dr. Kwame Asante",
      date: "2025-01-15",
      type: "Research Paper",
      excerpt: "This comprehensive study analyzes the current state of agricultural commodity trading across West Africa, with particular focus on Ghana's role in regional market development.",
      pdf: "/documents/research-paper-1.pdf"
    },
    {
      id: 2,
      title: "Digital Transformation in Agricultural Markets: Case Study of GCX",
      author: "Sarah Mensah",
      date: "2025-01-10",
      type: "Research Paper",
      excerpt: "An in-depth analysis of how digital technologies are revolutionizing agricultural commodity trading and market access for smallholder farmers.",
      pdf: "/documents/research-paper-2.pdf"
    }
  ],
  annual: [
    {
      id: 1,
      title: "GCX Annual Report 2024",
      date: "2024-12-31",
      type: "Annual Report",
      excerpt: "Comprehensive overview of GCX's performance, achievements, and strategic initiatives throughout 2024.",
      pdf: "/documents/annual-report-2024.pdf"
    }
  ],
  policy: [
    {
      id: 1,
      title: "GCX Trading Rules and Regulations 2025",
      date: "2025-01-01",
      type: "Policy Document",
      excerpt: "Updated trading rules and regulations governing all transactions on the Ghana Commodity Exchange platform.",
      pdf: "/documents/trading-rules-2025.pdf"
    }
  ]
})

// Mock data for careers
const careers = ref({
  openings: [
    {
      id: 1,
      title: "Senior Trading Analyst",
      department: "Trading Operations",
      location: "Accra, Ghana",
      type: "Full-time",
      experience: "5+ years",
      description: "We are seeking an experienced Trading Analyst to join our dynamic trading operations team.",
      requirements: ["Bachelor's degree in Finance or related field", "5+ years experience in commodity trading", "Strong analytical skills"],
      applyLink: "/careers/apply/1"
    },
    {
      id: 2,
      title: "Market Data Specialist",
      department: "Technology",
      location: "Accra, Ghana",
      type: "Full-time",
      experience: "3+ years",
      description: "Join our technology team to develop and maintain real-time market data systems.",
      requirements: ["Computer Science degree", "Experience with real-time data systems", "Knowledge of financial markets"],
      applyLink: "/careers/apply/2"
    }
  ],
  internship: [
    {
      id: 1,
      title: "Summer Trading Intern",
      department: "Trading Operations",
      duration: "3 months",
      location: "Accra, Ghana",
      description: "Gain hands-on experience in commodity trading operations and market analysis.",
      requirements: ["Currently pursuing Finance/Economics degree", "Strong academic performance", "Interest in commodities"],
      applyLink: "/careers/internship/apply/1"
    }
  ],
  functional: [
    {
      name: "Trading Operations",
      description: "Core trading activities, market making, and trade execution",
      positions: ["Trading Analyst", "Trade Support Specialist", "Risk Manager"]
    },
    {
      name: "Technology & IT",
      description: "Platform development, system maintenance, and digital innovation",
      positions: ["Software Developer", "System Administrator", "Data Engineer"]
    },
    {
      name: "Market Development",
      description: "Client acquisition, market expansion, and strategic partnerships",
      positions: ["Business Development Manager", "Partnership Coordinator", "Market Analyst"]
    }
  ]
})

// Mock data for commodities
const commodities = ref({
  maize: {
    description: "Maize (corn) is one of Ghana's most important staple crops and a key commodity traded on GCX.",
    specifications: ["Grade A: Premium quality", "Grade B: Standard quality", "Grade C: Basic quality"],
    tradingInfo: "Trading hours: 9:00 AM - 4:00 PM GMT", 
    marketData: "Current price: GHS 2,450 per metric ton"
  },
  soybean: {
    description: "Soybean is a high-protein legume crop with growing demand in Ghana's feed and food industries.",
    specifications: ["Protein content: 35-40%", "Oil content: 18-22%", "Moisture: <13%"],
    tradingInfo: "Trading hours: 9:00 AM - 4:00 PM GMT",
    marketData: "Current price: GHS 3,200 per metric ton"
  },
  sorghum: {
    description: "Sorghum is a drought-resistant grain crop that plays a vital role in food security.",
    specifications: ["Grade 1: Premium", "Grade 2: Standard", "Grade 3: Basic"],
    tradingInfo: "Trading hours: 9:00 AM - 4:00 PM GMT",
    marketData: "Current price: GHS 1,800 per metric ton"
  },
  sesame: {
    description: "Sesame is a high-value oilseed crop with strong export potential.",
    specifications: ["Oil content: 45-55%", "Protein: 18-25%", "Purity: >99%"],
    tradingInfo: "Trading hours: 9:00 AM - 4:00 PM GMT",
    marketData: "Current price: GHS 8,500 per metric ton"
  },
  rice: {
    description: "Rice is a major staple food in Ghana with significant domestic production and import requirements.",
    specifications: ["Long grain", "Medium grain", "Short grain"],
    tradingInfo: "Trading hours: 9:00 AM - 4:00 PM GMT",
    marketData: "Current price: GHS 2,800 per metric ton"
  }
})

// Handle hash changes
const handleHashChange = () => {
  const hash = route.hash.replace('#', '')
  
  if (hash) {
    // Determine section and tab from hash
    if (['research', 'annual', 'policy'].includes(hash)) {
      activeSection.value = 'publications'
      activeTab.value = hash
    } else if (['openings', 'internship', 'functional'].includes(hash)) {
      activeSection.value = 'careers'
      activeTab.value = hash
    } else if (['maize', 'soybean', 'sorghum', 'sesame', 'rice'].includes(hash)) {
      activeSection.value = 'commodities'
      activeTab.value = hash
    }
  }
}

// Navigate to section and tab
const navigateToSection = (section: string, tab?: string) => {
  activeSection.value = section
  if (tab) {
    activeTab.value = tab
    router.replace({ path: '/resources', hash: tab })
  } else {
    router.replace({ path: '/resources' })
  }
}

// Navigate to tab within current section
const navigateToTab = (tab: string) => {
  activeTab.value = tab
  router.replace({ path: '/resources', hash: tab })
}

onMounted(() => {
  handleHashChange()
})

watch(() => route.hash, handleHashChange)
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section -->
    <section class="relative py-14 lg:py-20 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="Resources" class="w-full h-full object-cover" />
        <div class="absolute inset-0" :class="isDarkMode ? 'bg-slate-900/40' : 'bg-white/40'"></div>
      </div>
      <div class="relative max-w-[1600px] mx-auto px-4 text-center">
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Resources</h1>
        <p class="text-lg max-w-3xl mx-auto" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Access our comprehensive library of publications, career opportunities, and commodity information.</p>
      </div>
    </section>

    <!-- Section Navigation -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-[1600px] mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            @click="navigateToSection('publications')"
            class="px-8 py-3 text-base font-medium rounded-lg transition-all duration-300"
            :class="activeSection === 'publications' 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            Publications
          </button>
          <button
            @click="navigateToSection('careers')"
            class="px-8 py-3 text-base font-medium rounded-lg transition-all duration-300"
            :class="activeSection === 'careers' 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            Careers
          </button>
          <button
            @click="navigateToSection('commodities')"
            class="px-8 py-3 text-base font-medium rounded-lg transition-all duration-300"
            :class="activeSection === 'commodities' 
              ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
          >
            Commodities
          </button>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
      <div class="max-w-[1600px] mx-auto px-4">
        
        <!-- Publications Section -->
        <div v-if="activeSection === 'publications'">
          <!-- Publications Tabs -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              v-for="tab in publicationsTabs"
              :key="tab.key"
              @click="navigateToTab(tab.key)"
              class="px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              :class="activeTab === tab.key 
                ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
                : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Publications Content -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="item in publications[activeTab as keyof typeof publications]"
              :key="item.id"
              class="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border dark:border-slate-700"
            >
              <div class="p-6">
                <div class="mb-4">
                  <span class="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                    {{ item.type }}
                  </span>
                </div>
                <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {{ item.title }}
                </h3>
                <p class="text-sm mb-4 text-slate-600 dark:text-slate-300">
                  {{ 'author' in item && item.author ? `By ${item.author}` : '' }}{{ 'author' in item && item.author ? ' • ' : '' }}{{ new Date(item.date).toLocaleDateString() }}
                </p>
                <p class="mb-6 text-slate-600 dark:text-slate-300">
                  {{ item.excerpt }}
                </p>
                <a
                  :href="item.pdf"
                  target="_blank"
                  class="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Careers Section -->
        <div v-if="activeSection === 'careers'">
          <!-- Careers Tabs -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              v-for="tab in careersTabs"
              :key="tab.key"
              @click="navigateToTab(tab.key)"
              class="px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              :class="activeTab === tab.key 
                ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
                : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Careers Content -->
          <div v-if="activeTab === 'openings'" class="space-y-6">
            <div
              v-for="job in careers.openings"
              :key="job.id"
              class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border dark:border-slate-700"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                  {{ job.title }}
                </h3>
                <span class="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                  {{ job.type }}
                </span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-slate-600 dark:text-slate-300">
                <div><strong class="text-slate-900 dark:text-white">Department:</strong> {{ job.department }}</div>
                <div><strong class="text-slate-900 dark:text-white">Location:</strong> {{ job.location }}</div>
                <div><strong class="text-slate-900 dark:text-white">Experience:</strong> {{ job.experience }}</div>
              </div>
              <p class="mb-4 text-slate-600 dark:text-slate-300">
                {{ job.description }}
              </p>
              <div class="mb-4">
                <h4 class="font-semibold mb-2 text-slate-900 dark:text-white">Requirements:</h4>
                <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li v-for="req in job.requirements" :key="req">{{ req }}</li>
                </ul>
              </div>
              <a
                :href="job.applyLink"
                class="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
              >
                Apply Now
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <div v-if="activeTab === 'internship'" class="space-y-6">
            <div
              v-for="intern in careers.internship"
              :key="intern.id"
              class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border dark:border-slate-700"
            >
              <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                {{ intern.title }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-slate-600 dark:text-slate-300">
                <div><strong class="text-slate-900 dark:text-white">Department:</strong> {{ intern.department }}</div>
                <div><strong class="text-slate-900 dark:text-white">Duration:</strong> {{ intern.duration }}</div>
                <div><strong class="text-slate-900 dark:text-white">Location:</strong> {{ intern.location }}</div>
              </div>
              <p class="mb-4 text-slate-600 dark:text-slate-300">
                {{ intern.description }}
              </p>
              <div class="mb-4">
                <h4 class="font-semibold mb-2 text-slate-900 dark:text-white">Requirements:</h4>
                <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li v-for="req in intern.requirements" :key="req">{{ req }}</li>
                </ul>
              </div>
              <a
                :href="intern.applyLink"
                class="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
              >
                Apply for Internship
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <div v-if="activeTab === 'functional'" class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="area in careers.functional"
              :key="area.name"
              class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border dark:border-slate-700"
            >
              <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                {{ area.name }}
              </h3>
              <p class="mb-6 text-slate-600 dark:text-slate-300">
                {{ area.description }}
              </p>
              <div>
                <h4 class="font-semibold mb-2 text-slate-900 dark:text-white">Positions:</h4>
                <ul class="space-y-1 text-slate-600 dark:text-slate-300">
                  <li v-for="position in area.positions" :key="position" class="text-sm">• {{ position }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Commodities Section -->
        <div v-if="activeSection === 'commodities'">
          <!-- Commodities Tabs -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              v-for="tab in commoditiesTabs"
              :key="tab.key"
              @click="navigateToTab(tab.key)"
              class="px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              :class="activeTab === tab.key 
                ? (isDarkMode ? 'bg-yellow-500 text-black shadow-lg' : 'bg-yellow-500 text-white shadow-lg')
                : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Commodities Content -->
          <div v-if="activeTab && commodities[activeTab as keyof typeof commodities]" class="max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border dark:border-slate-700">
              <h3 class="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
                {{ commoditiesTabs.find(tab => tab.key === activeTab)?.label }}
              </h3>
              
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Description</h4>
                  <p class="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    {{ commodities[activeTab as keyof typeof commodities].description }}
                  </p>
                </div>

                <div>
                  <h4 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Specifications</h4>
                  <ul class="space-y-2 text-slate-600 dark:text-slate-300">
                    <li v-for="spec in commodities[activeTab as keyof typeof commodities].specifications" :key="spec" class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      {{ spec }}
                    </li>
                  </ul>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Trading Information</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                      {{ commodities[activeTab as keyof typeof commodities].tradingInfo }}
                    </p>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Market Data</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                      {{ commodities[activeTab as keyof typeof commodities].marketData }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>
