<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { isDarkMode } from '../utils/darkMode'
import { useCareers } from '../composables/useCareers'
import Footer from '../components/Footer.vue'

const { t } = useI18n()

// Career composable
const {
  careers,
  loading: careersLoading,
  error: careersError,
  fetchCareers,
  searchCareers,
  filterByCategory: filterCareersByCategory,
  filterByStatus: filterCareersByStatus,
  filterByDepartment: filterCareersByDepartment,
  clearFilters: clearCareersFilters
} = useCareers()

// State
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDepartment = ref('')
const selectedStatus = ref('')
const selectedJob = ref(null)
const isModalOpen = ref(false)

// Career categories
const careerCategories = [
  'Job Openings',
  'Internship', 
  'Job Functional Areas'
]

// Departments
const departments = [
  'Trading Operations',
  'Technology',
  'Market Research', 
  'Finance',
  'Human Resources',
  'Operations',
  'Legal & Compliance'
]

// Filtered careers
const filteredCareers = computed(() => {
  if (!careers.value) return []
  
  let filtered = careers.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(career => 
      career.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedCategory.value) {
    filtered = filtered.filter(career => career.category === selectedCategory.value)
  }
  
  if (selectedDepartment.value) {
    filtered = filtered.filter(career => career.department === selectedDepartment.value)
  }
  
  if (selectedStatus.value) {
    filtered = filtered.filter(career => career.status === selectedStatus.value)
  }
  
  return filtered
})

// Functions
const handleSearch = async () => {
  await searchCareers(searchQuery.value)
}

const handleCategoryFilter = async (category: string) => {
  selectedCategory.value = category
  await filterCareersByCategory(category)
}

const handleDepartmentFilter = async (department: string) => {
  selectedDepartment.value = department
  await filterCareersByDepartment(department)
}

const handleStatusFilter = async (status: string) => {
  selectedStatus.value = status
  await filterCareersByStatus(status)
}

const clearAllFilters = async () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedDepartment.value = ''
  selectedStatus.value = ''
  await clearCareersFilters()
}

const openJobModal = (job) => {
  selectedJob.value = job
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeJobModal = () => {
  selectedJob.value = null
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    case 'Closed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    case 'On Hold':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
}

onMounted(async () => {
  await fetchCareers()
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/trading dashboard.jpg" alt="Careers" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90"></div>
      </div>
      
      <!-- Floating Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Join Our Team
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Career Opportunities
        </h1>
        <p class="text-xl lg:text-2xl max-w-4xl mx-auto text-white/80 mb-12 leading-relaxed">
          Build your future with Ghana Commodity Exchange. Explore exciting career opportunities in commodity trading, technology, and finance.
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-4xl font-bold text-white mb-2">{{ filteredCareers.length }}+</div>
            <div class="text-white/70 text-sm">Open Positions</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-4xl font-bold text-white mb-2">{{ departments.length }}+</div>
            <div class="text-white/70 text-sm">Departments</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-4xl font-bold text-white mb-2">100+</div>
            <div class="text-white/70 text-sm">Team Members</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search & Filters Section -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <div class="rounded-2xl shadow-xl p-8 border transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'">
          <!-- Search Bar -->
          <div class="mb-8">
            <div class="relative max-w-2xl mx-auto">
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search for jobs, skills, departments..."
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

          <!-- Filters Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-semibold mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Category</label>
              <select
                v-model="selectedCategory"
                @change="handleCategoryFilter(selectedCategory)"
                class="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-gray-200 bg-white text-slate-900'"
              >
                <option value="">All Categories</option>
                <option v-for="category in careerCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Department Filter -->
            <div>
              <label class="block text-sm font-semibold mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Department</label>
              <select
                v-model="selectedDepartment"
                @change="handleDepartmentFilter(selectedDepartment)"
                class="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-gray-200 bg-white text-slate-900'"
              >
                <option value="">All Departments</option>
                <option v-for="dept in departments" :key="dept" :value="dept">
                  {{ dept }}
                </option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-semibold mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">Status</label>
              <select
                v-model="selectedStatus"
                @change="handleStatusFilter(selectedStatus)"
                class="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white' : 'border-gray-200 bg-white text-slate-900'"
              >
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <div class="flex items-end">
              <button
                @click="clearAllFilters"
                class="w-full px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Jobs Grid Section -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Loading State -->
        <div v-if="careersLoading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
          <p class="mt-4 text-lg" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Loading career opportunities...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="careersError" class="text-center py-20">
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
            <svg class="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error loading careers</h3>
            <p class="text-red-600 dark:text-red-400">{{ careersError }}</p>
          </div>
        </div>

        <!-- Jobs Grid -->
        <div v-else-if="filteredCareers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="job in filteredCareers"
            :key="job.id"
            @click="openJobModal(job)"
            class="group cursor-pointer rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border transform hover:-translate-y-2"
            :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'"
          >
            <!-- Job Header -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="job.image_path || '/trading dashboard.jpg'"
                :alt="job.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <!-- Status Badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 text-xs font-semibold rounded-full" :class="getStatusColor(job.status)">
                  {{ job.status }}
                </span>
              </div>
              
              <!-- Department -->
              <div class="absolute bottom-4 left-4 text-white">
                <div class="text-sm font-medium">{{ job.department }}</div>
                <div class="text-xs opacity-90">{{ job.location }}</div>
              </div>
            </div>

            <!-- Job Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-600 transition-colors" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ job.title }}
              </h3>
              
              <p class="text-sm leading-relaxed mb-4 line-clamp-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ job.description }}
              </p>
              
              <!-- Job Details -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ job.location }}
                </div>
                <div class="flex items-center gap-2 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ job.employment_type }}
                </div>
              </div>
              
              <!-- Salary Range -->
              <div v-if="job.salary_range" class="mb-4">
                <span class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {{ job.salary_range }}
                </span>
              </div>
              
              <!-- Apply Button -->
              <button class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                View Details & Apply
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
          <h3 class="text-xl font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">No career opportunities found</h3>
          <p :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    </section>

    <!-- Job Detail Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        @click="closeJobModal"
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
            @click="closeJobModal"
            class="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
            :class="isDarkMode ? 'bg-slate-800/90 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-slate-900'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Modal Header -->
          <div class="relative h-64 overflow-hidden rounded-t-2xl">
            <img 
              :src="selectedJob?.image_path || '/trading dashboard.jpg'"
              :alt="selectedJob?.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <div class="inline-block px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-full mb-2">
                {{ selectedJob?.category }}
              </div>
              <h2 class="text-3xl font-bold">{{ selectedJob?.title }}</h2>
              <p class="text-lg opacity-90">{{ selectedJob?.department }} • {{ selectedJob?.location }}</p>
            </div>
          </div>
          
          <!-- Modal Body -->
          <div class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Main Content -->
              <div class="lg:col-span-2">
                <h3 class="text-xl font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Job Description</h3>
                <div class="text-lg leading-relaxed mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
                  <!-- Handle description with proper line breaks -->
                  <div v-if="selectedJob?.description" v-html="selectedJob.description.replace(/\n/g, '<br>')"></div>
                  <p v-else>
                    Join our dynamic team at Ghana Commodity Exchange and contribute to the growth of agricultural commodity trading in Ghana. 
                    This role offers exciting opportunities for professional development in a fast-paced, innovative environment.
                  </p>
                </div>
                
                <!-- Requirements -->
                <div v-if="selectedJob?.requirements || selectedJob?.qualifications" class="mb-6">
                  <h4 class="text-lg font-semibold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Requirements</h4>
                  
                  <!-- Handle requirements as array -->
                  <ul v-if="Array.isArray(selectedJob?.requirements)" class="space-y-2">
                    <li v-for="req in selectedJob.requirements" :key="req" class="flex items-start gap-3">
                      <svg class="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ req }}</span>
                    </li>
                  </ul>
                  
                  <!-- Handle requirements as string (split by common separators) -->
                  <ul v-else-if="selectedJob?.requirements" class="space-y-2">
                    <li v-for="req in selectedJob.requirements.split(/[,;•\n]/).filter(r => r.trim())" :key="req" class="flex items-start gap-3">
                      <svg class="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ req.trim() }}</span>
                    </li>
                  </ul>
                  
                  <!-- Handle qualifications as fallback -->
                  <ul v-else-if="selectedJob?.qualifications" class="space-y-2">
                    <li v-for="qual in (Array.isArray(selectedJob.qualifications) ? selectedJob.qualifications : selectedJob.qualifications.split(/[,;•\n]/).filter(q => q.trim()))" :key="qual" class="flex items-start gap-3">
                      <svg class="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ Array.isArray(selectedJob.qualifications) ? qual : qual.trim() }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Responsibilities -->
                <div v-if="selectedJob?.responsibilities" class="mb-6">
                  <h4 class="text-lg font-semibold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Key Responsibilities</h4>
                  
                  <!-- Handle responsibilities as array -->
                  <ul v-if="Array.isArray(selectedJob?.responsibilities)" class="space-y-2">
                    <li v-for="resp in selectedJob.responsibilities" :key="resp" class="flex items-start gap-3">
                      <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ resp }}</span>
                    </li>
                  </ul>
                  
                  <!-- Handle responsibilities as string -->
                  <ul v-else class="space-y-2">
                    <li v-for="resp in selectedJob.responsibilities.split(/[,;•\n]/).filter(r => r.trim())" :key="resp" class="flex items-start gap-3">
                      <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">{{ resp.trim() }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Sidebar -->
              <div class="space-y-6">
                <!-- Job Details -->
                <div class="rounded-xl p-6" :class="isDarkMode ? 'bg-slate-700' : 'bg-slate-50'">
                  <h4 class="font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Job Details</h4>
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Employment Type:</span>
                      <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ selectedJob?.employment_type || 'Full-time' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Experience Level:</span>
                      <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ selectedJob?.experience_level || 'Mid Level' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Department:</span>
                      <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ selectedJob?.department || 'General' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Location:</span>
                      <span class="font-semibold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">{{ selectedJob?.location || 'Accra, Ghana' }}</span>
                    </div>
                    <div v-if="selectedJob?.salary_range" class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Salary Range:</span>
                      <span class="font-semibold text-green-600">{{ selectedJob.salary_range }}</span>
                    </div>
                    <div v-if="selectedJob?.application_deadline" class="flex justify-between items-center py-2">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Application Deadline:</span>
                      <span class="font-semibold text-orange-600">{{ formatDate(selectedJob.application_deadline) }}</span>
                    </div>
                    <div v-if="!selectedJob?.application_deadline" class="flex justify-between items-center py-2">
                      <span :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Application Deadline:</span>
                      <span class="font-semibold text-blue-600">Open until filled</span>
                    </div>
                  </div>
                </div>
                
                <!-- Application Info -->
                <div class="rounded-xl p-4 border-2 border-dashed" :class="isDarkMode ? 'border-slate-600 bg-slate-800' : 'border-gray-300 bg-gray-50'">
                  <div class="text-center">
                    <svg class="mx-auto h-8 w-8 mb-2" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                      Ready to join our team?
                    </p>
                  </div>
                </div>
                
                <!-- Apply Button -->
                <button class="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Apply for This Position
                </button>
                
                <!-- Contact Info -->
                <div class="text-center text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                  <p>Questions about this role?</p>
                  <p>Contact HR: <a href="mailto:careers@gcx.com.gh" class="text-yellow-600 hover:text-yellow-700 font-medium">careers@gcx.com.gh</a></p>
                </div>
              </div>
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
