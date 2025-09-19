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

// Active tab (only publications now)
const activeTab = ref('research')

// Modal state
const selectedItem = ref(null)
const isModalOpen = ref(false)

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
  fetchPublications,
  searchPublications,
  filterByCategory: filterPublicationsByCategory,
  clearFilters: clearPublicationsFilters
} = usePublications()

const {
  careers,
  loading: careersLoading,
  error: careersError,
  fetchCareers,
  searchCareers,
  filterByCategory: filterCareersByCategory,
  clearFilters: clearCareersFilters
} = useCareers()

const {
  commodities,
  loading: commoditiesLoading,
  error: commoditiesError,
  fetchCommodities,
  searchCommodities,
  filterByCategory: filterCommoditiesByCategory,
  clearFilters: clearCommoditiesFilters
} = useCommodities()

// Search and filter states
const searchQuery = ref('')
const selectedCategory = ref('')

// Fallback images for different resource types
const fallbackImages = {
  publications: {
    'Research Papers': '/crop.jpg',
    'Annual Reports': '/trading dashboard.jpg',
    'Policy Documents': '/trading.jpg',
    default: '/maize.jpg'
  },
  careers: {
    'Job Openings': '/trading dashboard.jpg',
    'Internship': '/crop.jpg',
    'Job Functional Areas': '/trading.jpg',
    default: '/maize.jpg'
  },
  commodities: {
    default: '/maize.jpg'
  }
}

// Computed properties for filtered publications
const filteredData = computed(() => {
  if (!publications.value) return []
  
  let filtered = publications.value
  
  // Filter by active tab
  if (activeTab.value) {
    const categoryMap = {
      'research': 'Research Papers',
      'annual': 'Annual Reports',
      'policy': 'Policy Documents'
    }
    
    const category = categoryMap[activeTab.value]
    if (category) {
      filtered = filtered.filter(item => item.category === category)
    }
  }
  
  return filtered
})

const isLoading = computed(() => {
  return publicationsLoading.value
})

const currentError = computed(() => {
  return publicationsError.value
})

// Get fallback image for item
const getItemImage = (item) => {
  if (item.image_path) return item.image_path
  
  const publicationImages = fallbackImages.publications
  return publicationImages[item.category] || publicationImages.default
}

// Modal functions
const openModal = (item) => {
  selectedItem.value = item
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedItem.value = null
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}

// Navigation functions (simplified for publications only)
const navigateToTab = async (tab: string) => {
  activeTab.value = tab
  router.replace({ path: '/resources', hash: tab })
}

// Search function (publications only)
const handleSearch = async () => {
  await searchPublications(searchQuery.value)
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

// Download document
const downloadDocument = (item: any) => {
  if (item.download_count !== undefined) {
    item.download_count++
  }
  window.open(item.file_path, '_blank')
}

onMounted(async () => {
  await fetchPublications()
})

// Close modal on escape key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

watch(() => route.hash, (newHash) => {
  const hash = newHash.replace('#', '')
  if (hash && ['research', 'annual', 'policy'].includes(hash)) {
    activeTab.value = hash
  }
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Section with Professional Background -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="Resources Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80"></div>
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml;utf8,<svg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><g fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;><g fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;><circle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/></g></g></svg>');"></div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Latest Resources Available
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          {{ t('navigation.menu.resources') }}
        </h1>
        <p class="text-xl lg:text-2xl max-w-4xl mx-auto text-white/80 mb-12 leading-relaxed">
          Access our comprehensive library of publications, career opportunities, and commodity information.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-4xl font-bold text-white mb-2">150+</div>
            <div class="text-white/70 text-sm">Research Papers</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-4xl font-bold text-white mb-2">25+</div>
            <div class="text-white/70 text-sm">Annual Reports</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-4xl font-bold text-white mb-2">50+</div>
            <div class="text-white/70 text-sm">Policy Documents</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Professional Navigation -->
    <section class="py-8 transition-colors duration-300 shadow-lg border-b" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-2">
          <button
            class="px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 border bg-yellow-500 text-black border-yellow-500 shadow-lg"
          >
            Publications
          </button>
          <router-link
            to="/careers"
            class="px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 border"
            :class="isDarkMode ? 'bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700' : 'bg-transparent text-slate-700 border-gray-300 hover:bg-gray-50'"
          >
            Careers
          </router-link>
          <router-link
            to="/commodities"
            class="px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-300 border"
            :class="isDarkMode ? 'bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700' : 'bg-transparent text-slate-700 border-gray-300 hover:bg-gray-50'"
          >
            Commodities
          </router-link>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-12 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
      <div class="max-w-4xl mx-auto px-4">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Search publications..."
            class="w-full pl-12 pr-20 py-4 text-lg border-2 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 shadow-lg"
            :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-gray-200 bg-white text-slate-900'"
                />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
          <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button
              @click="handleSearch"
              class="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs Section -->
    <section class="py-8 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
            <button
            v-for="tab in publicationsTabs"
              :key="tab.key"
              @click="navigateToTab(tab.key)"
              class="px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300"
              :class="activeTab === tab.key 
              ? 'bg-yellow-500 text-black shadow-lg' 
              : (isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700' : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200')"
            >
              {{ tab.label }}
            </button>
          </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
          <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
          <p class="mt-4 text-lg" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Loading resources...</p>
          </div>

          <!-- Error State -->
        <div v-else-if="currentError" class="text-center py-20">
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
            <svg class="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error loading resources</h3>
            <p class="text-red-600 dark:text-red-400">{{ currentError }}</p>
            </div>
          </div>

        <!-- Resource Cards Grid -->
        <div v-else-if="filteredData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
            v-for="item in filteredData"
              :key="item.id"
            @click="openModal(item)"
            class="group rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border cursor-pointer transform hover:-translate-y-2"
            :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'"
            >
            <!-- Card Image -->
            <div class="relative h-56 overflow-hidden">
              <img 
                :src="getItemImage(item)" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @error="(e) => (e.target as HTMLImageElement).src = fallbackImages.publications.default"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <!-- Category Badge -->
                <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
                    {{ item.category }}
                  </span>
                </div>
              
              <!-- Status Badge -->
              <div v-if="item.status" class="absolute top-4 right-4">
                <span class="px-3 py-1 text-xs font-semibold rounded-full"
                      :class="item.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'">
                  {{ item.status }}
                </span>
              </div>
              
              <!-- Bottom Info -->
                <div class="absolute bottom-4 left-4 text-white">
                <div v-if="item.author" class="text-sm font-medium">{{ item.author }}</div>
                <div v-if="item.publication_date" class="text-xs opacity-90">{{ formatDate(item.publication_date) }}</div>
              </div>
              </div>

            <!-- Card Content -->
              <div class="p-6">
              <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ item.title }}
                </h3>

              <p class="text-sm leading-relaxed line-clamp-3 mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ item.description || 'Click to view more details about this resource.' }}
              </p>
              
              <!-- Quick Info -->
              <div class="flex items-center justify-between text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                <div v-if="item.file_size" class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                  {{ formatFileSize(item.file_size) }}
                </div>
                <div v-if="item.download_count" class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3" />
                  </svg>
                  {{ item.download_count }}
                </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
        <div v-else class="text-center py-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        </div>
    </section>

    <!-- Professional Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="closeModal"
      ></div>
      
      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          :class="isDarkMode ? 'bg-slate-800' : 'bg-white'"
          @click.stop
        >
          <!-- Close Button -->
            <button
            @click="closeModal"
            class="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
            :class="isDarkMode ? 'bg-slate-800/90 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-slate-900'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
          
          <!-- Modal Header Image -->
          <div class="relative h-64 overflow-hidden rounded-t-2xl">
            <img 
              :src="selectedItem ? getItemImage(selectedItem) : ''" 
              :alt="selectedItem?.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
            <div class="inline-block px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-full mb-2">
              {{ selectedItem?.category }}
                </div>
              <h2 class="text-3xl font-bold">{{ selectedItem?.title }}</h2>
                </div>
              </div>

          <!-- Modal Body -->
          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Main Content -->
              <div class="lg:col-span-2">
                <p class="text-lg leading-relaxed mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  {{ selectedItem?.description || 'Detailed information about this resource.' }}
                </p>
                
                <!-- Key Points (if available) -->
                <div v-if="selectedItem?.key_points" class="mb-6">
                  <h3 class="text-xl font-semibold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Key Highlights</h3>
                  <ul class="space-y-2">
                    <li v-for="point in selectedItem.key_points" :key="point" class="flex items-start gap-3">
                      <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                      <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ point }}</span>
                    </li>
                  </ul>
              </div>
              </div>

              <!-- Sidebar Info -->
              <div class="space-y-6">
                <!-- File Info -->
                <div class="rounded-xl p-6" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-50'">
                  <h4 class="font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">File Information</h4>
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Type:</span>
                      <span class="font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ selectedItem?.file_type?.toUpperCase() || 'PDF' }}</span>
                </div>
                    <div class="flex justify-between">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Size:</span>
                      <span class="font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ formatFileSize(selectedItem?.file_size || 0) }}</span>
              </div>
                    <div class="flex justify-between">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Downloads:</span>
                      <span class="font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ selectedItem?.download_count || 0 }}</span>
            </div>
                    <div v-if="selectedItem?.publication_date" class="flex justify-between">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Published:</span>
                      <span class="font-medium" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ formatDate(selectedItem.publication_date) }}</span>
          </div>
          </div>
        </div>


                <!-- Action Buttons -->
                <div class="space-y-3">
                  <button 
                    @click="downloadDocument(selectedItem)"
                    class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Document
                  </button>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Custom scrollbar */
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