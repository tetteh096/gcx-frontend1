<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useRoute, useRouter } from 'vue-router'
import { isDarkMode } from '../utils/darkMode'
import { usePublications } from '../composables/usePublications'
import { useCareers } from '../composables/useCareers'
import { useCommodities } from '../composables/useCommodities'

const route = useRoute()
const { t } = useI18n()
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

// Use composables
const {
  publications,
  loading: publicationsLoading,
  error: publicationsError,
  pagination: publicationsPagination,
  searchQuery: publicationsSearch,
  categoryFilter: publicationsCategory,
  fetchPublications,
  searchPublications,
  filterByCategory: filterPublicationsByCategory,
  clearFilters: clearPublicationsFilters
} = usePublications()

const {
  careers,
  loading: careersLoading,
  error: careersError,
  pagination: careersPagination,
  searchQuery: careersSearch,
  categoryFilter: careersCategory,
  statusFilter: careersStatus,
  departmentFilter: careersDepartment,
  employmentTypeFilter: careersEmploymentType,
  experienceLevelFilter: careersExperienceLevel,
  fetchCareers,
  searchCareers,
  filterByCategory: filterCareersByCategory,
  filterByStatus: filterCareersByStatus,
  filterByDepartment: filterCareersByDepartment,
  filterByEmploymentType: filterCareersByEmploymentType,
  filterByExperienceLevel: filterCareersByExperienceLevel,
  clearFilters: clearCareersFilters
} = useCareers()

const {
  commodities,
  loading: commoditiesLoading,
  error: commoditiesError,
  pagination: commoditiesPagination,
  searchQuery: commoditiesSearch,
  categoryFilter: commoditiesCategory,
  statusFilter: commoditiesStatus,
  fetchCommodities,
  searchCommodities,
  filterByCategory: filterCommoditiesByCategory,
  filterByStatus: filterCommoditiesByStatus,
  clearFilters: clearCommoditiesFilters
} = useCommodities()

// Search and filter states
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedDepartment = ref('')
const selectedEmploymentType = ref('')
const selectedExperienceLevel = ref('')

// Computed properties for filtered data
const filteredPublications = computed(() => {
  if (!publications.value) return []
  
  let filtered = publications.value
  
  // Filter by category if active tab matches
  if (activeSection.value === 'publications' && activeTab.value) {
    const categoryMap: { [key: string]: string } = {
      'research': 'Research Papers',
      'annual': 'Annual Reports',
      'policy': 'Policy Documents'
    }
    const category = categoryMap[activeTab.value]
    if (category) {
      filtered = filtered.filter(pub => pub.category === category)
    }
  }
  
  return filtered
})

const filteredCareers = computed(() => {
  if (!careers.value) return []
  
  let filtered = careers.value
  
  // Filter by category if active tab matches
  if (activeSection.value === 'careers' && activeTab.value) {
    const categoryMap: { [key: string]: string } = {
      'openings': 'Job Openings',
      'internship': 'Internship',
      'functional': 'Job Functional Areas'
    }
    const category = categoryMap[activeTab.value]
    if (category) {
      filtered = filtered.filter(career => career.category === category)
    }
  }
  
  return filtered
})

const filteredCommodities = computed(() => {
  if (!commodities.value) return []
  return commodities.value
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
const navigateToSection = async (section: string, tab?: string) => {
  activeSection.value = section
  if (tab) {
    activeTab.value = tab
    router.replace({ path: '/resources', hash: tab })
  } else {
    router.replace({ path: '/resources' })
  }
  
  // Fetch data based on section
  await fetchDataForSection(section)
}

// Navigate to tab within current section
const navigateToTab = async (tab: string) => {
  activeTab.value = tab
  router.replace({ path: '/resources', hash: tab })
  
  // Fetch data for the current section
  await fetchDataForSection(activeSection.value)
}

// Fetch data for specific section
const fetchDataForSection = async (section: string) => {
  try {
    switch (section) {
      case 'publications':
        await fetchPublications()
        break
      case 'careers':
        await fetchCareers()
        break
      case 'commodities':
        await fetchCommodities()
        break
    }
  } catch (error) {
    console.error('Error fetching data for section:', section, error)
  }
}

// Search functions
const handleSearch = async () => {
  switch (activeSection.value) {
    case 'publications':
      await searchPublications(searchQuery.value)
      break
    case 'careers':
      await searchCareers(searchQuery.value)
      break
    case 'commodities':
      await searchCommodities(searchQuery.value)
      break
  }
}

// Filter functions
const handleCategoryFilter = async (category: string) => {
  selectedCategory.value = category
  switch (activeSection.value) {
    case 'publications':
      await filterPublicationsByCategory(category)
      break
    case 'careers':
      await filterCareersByCategory(category)
      break
    case 'commodities':
      await filterCommoditiesByCategory(category)
      break
  }
}

const handleStatusFilter = async (status: string) => {
  selectedStatus.value = status
  switch (activeSection.value) {
    case 'careers':
      await filterCareersByStatus(status)
      break
    case 'commodities':
      await filterCommoditiesByStatus(status)
      break
  }
}

const handleDepartmentFilter = async (department: string) => {
  selectedDepartment.value = department
  if (activeSection.value === 'careers') {
    await filterCareersByDepartment(department)
  }
}

const handleEmploymentTypeFilter = async (employmentType: string) => {
  selectedEmploymentType.value = employmentType
  if (activeSection.value === 'careers') {
    await filterCareersByEmploymentType(employmentType)
  }
}

const handleExperienceLevelFilter = async (experienceLevel: string) => {
  selectedExperienceLevel.value = experienceLevel
  if (activeSection.value === 'careers') {
    await filterCareersByExperienceLevel(experienceLevel)
  }
}

// Clear all filters
const clearAllFilters = async () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  selectedDepartment.value = ''
  selectedEmploymentType.value = ''
  selectedExperienceLevel.value = ''
  
  switch (activeSection.value) {
    case 'publications':
      await clearPublicationsFilters()
      break
    case 'careers':
      await clearCareersFilters()
      break
    case 'commodities':
      await clearCommoditiesFilters()
      break
  }
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Get category badge class
const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Research Papers':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    case 'Annual Reports':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    case 'Policy Documents':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    case 'Job Openings':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    case 'Internship':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    case 'Job Functional Areas':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
}

// Get status badge class
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Published':
    case 'Open':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    case 'Draft':
    case 'On Hold':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    case 'Archived':
    case 'Closed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    case 'Suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
}

onMounted(async () => {
  handleHashChange()
  await fetchDataForSection(activeSection.value)
})

watch(() => route.hash, handleHashChange)
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="{{ t('navigation.menu.resources') }}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/70"></div>
      </div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Latest Updates Available
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 text-white leading-tight animate-slide-up">
          {{ t('navigation.menu.resources') }}
        </h1>
        <p class="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto text-white/90 mb-12 leading-relaxed animate-slide-up delay-200 px-4">
          Access our comprehensive library of publications, career opportunities, and commodity information.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up delay-400">
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-white mb-2">150+</div>
            <div class="text-white/70">Research Papers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-white mb-2">25+</div>
            <div class="text-white/70">Annual Reports</div>
          </div>
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
            <div class="text-white/70">Policy Documents</div>
          </div>
        </div>
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

    <!-- Search and Filters Section -->
    <section class="py-12 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border dark:border-slate-700 backdrop-blur-sm">
          <!-- Enhanced Search Bar -->
          <div class="mb-8">
            <div class="relative max-w-4xl mx-auto">
              <div class="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                <svg class="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                :placeholder="`Search ${activeSection}...`"
                class="w-full pl-12 sm:pl-16 pr-20 sm:pr-24 py-3 sm:py-4 text-base sm:text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 dark:bg-slate-700 dark:text-white transition-all duration-300 shadow-lg"
              />
              <div class="absolute inset-y-0 right-0 pr-2 sm:pr-6 flex items-center">
                <button
                  @click="handleSearch"
                  class="bg-yellow-500 hover:bg-yellow-600 text-black px-3 sm:px-6 py-2 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  <span class="hidden sm:inline">Search</span>
                  <svg class="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Modern Filter Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <!-- Search Input -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Quick Search</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  type="text"
                  :placeholder="`Search ${activeSection}...`"
                  class="w-full pl-12 pr-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-300"
                />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Category</label>
              <div class="relative">
                <select
                  v-model="selectedCategory"
                  @change="handleCategoryFilter(selectedCategory)"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  <option v-if="activeSection === 'publications'" value="Research Papers">Research Papers</option>
                  <option v-if="activeSection === 'publications'" value="Annual Reports">Annual Reports</option>
                  <option v-if="activeSection === 'publications'" value="Policy Documents">Policy Documents</option>
                  <option v-if="activeSection === 'careers'" value="Job Openings">Job Openings</option>
                  <option v-if="activeSection === 'careers'" value="Internship">Internship</option>
                  <option v-if="activeSection === 'careers'" value="Job Functional Areas">Job Functional Areas</option>
                  <option v-if="activeSection === 'commodities'" value="Grains">Grains</option>
                  <option v-if="activeSection === 'commodities'" value="Oilseeds">Oilseeds</option>
                  <option v-if="activeSection === 'commodities'" value="Legumes">Legumes</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Status Filter (for careers and commodities) -->
            <div v-if="activeSection === 'careers' || activeSection === 'commodities'">
              <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Status</label>
              <select
                v-model="selectedStatus"
                @change="handleStatusFilter(selectedStatus)"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option v-if="activeSection === 'careers'" value="Open">Open</option>
                <option v-if="activeSection === 'careers'" value="Closed">Closed</option>
                <option v-if="activeSection === 'careers'" value="On Hold">On Hold</option>
                <option v-if="activeSection === 'commodities'" value="Open">Open</option>
                <option v-if="activeSection === 'commodities'" value="Closed">Closed</option>
                <option v-if="activeSection === 'commodities'" value="Suspended">Suspended</option>
              </select>
            </div>

            <!-- Additional Filters for Careers -->
            <div v-if="activeSection === 'careers'" class="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Department</label>
                <select
                  v-model="selectedDepartment"
                  @change="handleDepartmentFilter(selectedDepartment)"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="">All Departments</option>
                  <option value="Trading Operations">Trading Operations</option>
                  <option value="Technology">Technology</option>
                  <option value="Market Research">Market Research</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Employment Type</label>
                <select
                  v-model="selectedEmploymentType"
                  @change="handleEmploymentTypeFilter(selectedEmploymentType)"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Experience Level</label>
                <select
                  v-model="selectedExperienceLevel"
                  @change="handleExperienceLevelFilter(selectedExperienceLevel)"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              @click="handleSearch"
              class="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Publications
            </button>
            <button
              @click="clearAllFilters"
              class="px-8 py-3 bg-slate-500 hover:bg-slate-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear Filters
            </button>
          </div>
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

          <!-- Loading State -->
          <div v-if="publicationsLoading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading publications...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="publicationsError" class="text-center py-12">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-red-800 dark:text-red-200">Error loading publications</h3>
              <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ publicationsError }}</p>
            </div>
          </div>

          <!-- Publications Content -->
          <div v-else-if="filteredPublications.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="item in filteredPublications"
              :key="item.id"
              class="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border dark:border-slate-700 transform hover:-translate-y-2 hover:scale-105"
            >
              <!-- Publication Header with Gradient -->
              <div class="relative h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 overflow-hidden">
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="absolute top-4 left-4">
                  <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-slate-800 backdrop-blur-sm">
                    {{ item.category }}
                  </span>
                </div>
                <div class="absolute bottom-4 right-4">
                  <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {{ item.title }}
                </h3>
                
                <div class="flex items-center gap-2 mb-4">
                  <div class="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-slate-900 dark:text-white">{{ item.author }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatDate(item.publication_date) }}</p>
                  </div>
                </div>

                <p class="mb-6 text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {{ item.description }}
                </p>

                <!-- File Info Cards -->
                <div class="grid grid-cols-3 gap-2 mb-6">
                  <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Type</div>
                    <div class="text-sm font-semibold text-slate-900 dark:text-white">{{ item.file_type?.toUpperCase() || 'PDF' }}</div>
                  </div>
                  <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Size</div>
                    <div class="text-sm font-semibold text-slate-900 dark:text-white">{{ formatFileSize(item.file_size) }}</div>
                  </div>
                  <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                    <div class="text-xs text-slate-500 dark:text-slate-400 mb-1">Downloads</div>
                    <div class="text-sm font-semibold text-slate-900 dark:text-white">{{ item.download_count }}</div>
                  </div>
                </div>

                <!-- Download Button -->
                <a
                  :href="item.file_path"
                  target="_blank"
                  class="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Now
                </a>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-slate-900 dark:text-white">No publications found</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
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

          <!-- Loading State -->
          <div v-if="careersLoading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading career opportunities...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="careersError" class="text-center py-12">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-red-800 dark:text-red-200">Error loading careers</h3>
              <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ careersError }}</p>
            </div>
          </div>

          <!-- Careers Content -->
          <div v-else-if="filteredCareers.length > 0" class="space-y-6">
            <div
              v-for="career in filteredCareers"
              :key="career.id"
              class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border dark:border-slate-700 group"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {{ career.title }}
                </h3>
                <div class="flex gap-2">
                  <span class="inline-block px-3 py-1 text-xs font-medium rounded-full" :class="getCategoryBadgeClass(career.category)">
                    {{ career.category }}
                  </span>
                  <span class="inline-block px-3 py-1 text-xs font-medium rounded-full" :class="getStatusBadgeClass(career.status)">
                    {{ career.status }}
                  </span>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-slate-600 dark:text-slate-300">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span><strong class="text-slate-900 dark:text-white">Department:</strong> {{ career.department }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><strong class="text-slate-900 dark:text-white">Location:</strong> {{ career.location }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong class="text-slate-900 dark:text-white">Type:</strong> {{ career.employment_type }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span><strong class="text-slate-900 dark:text-white">Level:</strong> {{ career.experience_level }}</span>
                </div>
              </div>

              <p class="mb-4 text-slate-600 dark:text-slate-300 line-clamp-3">
                {{ career.description }}
              </p>

              <div v-if="career.salary_range" class="mb-4">
                <span class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {{ career.salary_range }}
                </span>
              </div>

              <div v-if="career.application_deadline" class="mb-4">
                <span class="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Apply by {{ formatDate(career.application_deadline) }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {{ career.application_count }} applications
                  </span>
                </div>
                <a
                  :href="`/careers/apply/${career.id}`"
                  class="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Apply Now
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-slate-900 dark:text-white">No career opportunities found</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
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

          <!-- Loading State -->
          <div v-if="commoditiesLoading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading commodities...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="commoditiesError" class="text-center py-12">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-red-800 dark:text-red-200">Error loading commodities</h3>
              <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ commoditiesError }}</p>
            </div>
          </div>

          <!-- Commodities Content -->
          <div v-else-if="filteredCommodities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="commodity in filteredCommodities"
              :key="commodity.id"
              class="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border dark:border-slate-700 group"
            >
              <!-- Commodity Image -->
              <div v-if="commodity.image_path" class="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img 
                  :src="commodity.image_path" 
                  :alt="commodity.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div v-else class="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 flex items-center justify-center">
                <svg class="w-16 h-16 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>

              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {{ commodity.name }}
                  </h3>
                  <div class="flex gap-2">
                    <span class="inline-block px-3 py-1 text-xs font-medium rounded-full" :class="getStatusBadgeClass(commodity.market_status)">
                      {{ commodity.market_status }}
                    </span>
                    <span class="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                      {{ commodity.code }}
                    </span>
                  </div>
                </div>

                <p class="mb-4 text-slate-600 dark:text-slate-300 line-clamp-3">
                  {{ commodity.description }}
                </p>

                <!-- Price Information -->
                <div class="mb-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Current Price</span>
                    <span class="text-lg font-bold text-slate-900 dark:text-white">
                      {{ commodity.price_unit }} {{ commodity.current_price.toLocaleString() }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-slate-600 dark:text-slate-400">Change</span>
                    <span 
                      class="font-medium"
                      :class="commodity.price_change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                    >
                      {{ commodity.price_change >= 0 ? '+' : '' }}{{ commodity.price_change.toFixed(2) }} 
                      ({{ commodity.price_change_percent >= 0 ? '+' : '' }}{{ commodity.price_change_percent.toFixed(2) }}%)
                    </span>
                  </div>
                </div>

                <!-- Trading Information -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong class="text-slate-900 dark:text-white">Trading Hours:</strong> {{ commodity.trading_hours }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span><strong class="text-slate-900 dark:text-white">Contract Size:</strong> {{ commodity.contract_size }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span><strong class="text-slate-900 dark:text-white">Volume:</strong> {{ commodity.trading_volume.toLocaleString() }}</span>
                  </div>
                </div>

                <!-- Price Range -->
                <div class="mb-6">
                  <h4 class="text-sm font-semibold mb-2 text-slate-900 dark:text-white">Price Range</h4>
                  <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span>Min: {{ commodity.price_unit }} {{ commodity.minimum_price.toLocaleString() }}</span>
                    <span>•</span>
                    <span>Max: {{ commodity.price_unit }} {{ commodity.maximum_price.toLocaleString() }}</span>
                  </div>
                </div>

                <!-- Additional Info -->
                <div v-if="commodity.category || commodity.origin_country || commodity.harvest_season" class="mb-6">
                  <h4 class="text-sm font-semibold mb-2 text-slate-900 dark:text-white">Additional Information</h4>
                  <div class="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <div v-if="commodity.category" class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span><strong>Category:</strong> {{ commodity.category }}</span>
                    </div>
                    <div v-if="commodity.origin_country" class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span><strong>Origin:</strong> {{ commodity.origin_country }}</span>
                    </div>
                    <div v-if="commodity.harvest_season" class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span><strong>Harvest Season:</strong> {{ commodity.harvest_season }}</span>
                    </div>
                  </div>
                </div>

                <a
                  :href="`/commodities/${commodity.id}`"
                  class="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-all duration-300"
                >
                  View Details
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-slate-900 dark:text-white">No commodities found</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-1000 {
  animation-delay: 1s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
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

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #1e293b;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
