<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { isDarkMode } from '../utils/darkMode'

const { t } = useI18n()

// Event data
const events = ref([
  {
    id: 1,
    title: 'GCX Annual Conference 2023',
    date: '2023-12-15',
    location: 'Accra, Ghana',
    description: 'The Ghana Commodity Exchange Annual Conference brought together industry leaders, farmers, and stakeholders to discuss the future of commodity trading in Ghana.',
    image: '/conference.jpg',
    category: 'Conference',
    attendees: 500,
    status: 'Completed'
  },
  {
    id: 2,
    title: 'Agricultural Innovation Summit',
    date: '2023-10-20',
    location: 'Kumasi, Ghana',
    description: 'Exploring digital agriculture and technology solutions for modern farming practices and commodity trading.',
    image: '/farmer.jpg',
    category: 'Summit',
    attendees: 300,
    status: 'Completed'
  },
  {
    id: 3,
    title: 'Commodity Market Analysis Workshop',
    date: '2023-08-10',
    location: 'Tamale, Ghana',
    description: 'Training workshop on commodity market analysis and trading strategies for local farmers and traders.',
    image: '/trading.jpg',
    category: 'Workshop',
    attendees: 150,
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Women in Agriculture Forum',
    date: '2023-06-15',
    location: 'Cape Coast, Ghana',
    description: 'Empowering women farmers and traders in the commodity exchange ecosystem.',
    image: '/maize.jpg',
    category: 'Forum',
    attendees: 200,
    status: 'Completed'
  },
  {
    id: 5,
    title: 'Youth in Agriculture Program',
    date: '2023-04-22',
    location: 'Takoradi, Ghana',
    description: 'Engaging young people in agriculture and commodity trading through education and mentorship.',
    image: '/crop.jpg',
    category: 'Program',
    attendees: 100,
    status: 'Completed'
  },
  {
    id: 6,
    title: 'International Trade Partnership Meeting',
    date: '2023-02-28',
    location: 'Accra, Ghana',
    description: 'Strengthening international partnerships for commodity trade and market development.',
    image: '/market-analysis.jpg',
    category: 'Meeting',
    attendees: 75,
    status: 'Completed'
  }
])

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedYear = ref('')

// Categories
const categories = ['All', 'Conference', 'Summit', 'Workshop', 'Forum', 'Program', 'Meeting']

// Years
const years = ['All', '2023', '2022', '2021', '2020']

// Filtered events
const filteredEvents = computed(() => {
  let filtered = events.value

  if (searchQuery.value) {
    filtered = filtered.filter(event =>
      event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value && selectedCategory.value !== 'All') {
    filtered = filtered.filter(event => event.category === selectedCategory.value)
  }

  if (selectedYear.value && selectedYear.value !== 'All') {
    filtered = filtered.filter(event => event.date.startsWith(selectedYear.value))
  }

  return filtered
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedYear.value = ''
}
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="Event Archives Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-800/70 to-green-900/90"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Event Archives
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Past Events
        </h1>
        <p class="text-xl lg:text-2xl max-w-4xl mx-auto text-white/80 mb-12 leading-relaxed">
          Explore our historical events, conferences, and programs that have shaped Ghana's commodity trading landscape
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">{{ events.length }}+</div>
            <div class="text-white/70 text-sm">Events Archived</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">{{ categories.length - 1 }}</div>
            <div class="text-white/70 text-sm">Event Categories</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">1,325+</div>
            <div class="text-white/70 text-sm">Total Attendees</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filters -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-2xl mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search events..."
              class="w-full pl-12 pr-4 py-4 text-lg border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg"
              :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-400' : 'border-gray-200 bg-white text-slate-900 placeholder-slate-500'"
            />
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              class="px-4 py-2 font-medium rounded-full transition-all duration-300"
              :class="(selectedCategory === category || (selectedCategory === '' && category === 'All'))
                ? 'bg-blue-500 text-white shadow-lg' 
                : isDarkMode 
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                  : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Year Filter -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            v-for="year in years"
            :key="year"
            @click="selectedYear = year"
            class="px-4 py-2 font-medium rounded-full transition-all duration-300"
            :class="(selectedYear === year || (selectedYear === '' && year === 'All'))
              ? 'bg-green-500 text-white shadow-lg' 
              : isDarkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'"
          >
            {{ year }}
          </button>
        </div>

        <!-- Clear Filters -->
        <div v-if="searchQuery || selectedCategory !== '' || selectedYear !== ''" class="text-center">
          <button
            @click="clearFilters"
            class="px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
            :class="isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Events Grid -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Events Grid -->
        <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="group cursor-pointer rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border transform hover:-translate-y-2"
            :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'"
          >
            <!-- Event Image -->
            <div class="relative overflow-hidden">
              <img 
                :src="event.image"
                :alt="event.title"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                @error="(e) => (e.target as HTMLImageElement).src = '/trading.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ event.category }}
              </div>
              
              <!-- Status Badge -->
              <div class="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ event.status }}
              </div>
            </div>

            <!-- Event Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors leading-tight" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ event.title }}
              </h3>
              
              <div class="flex items-center gap-2 mb-3 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(event.date) }}</span>
              </div>
              
              <div class="flex items-center gap-2 mb-3 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ event.location }}</span>
              </div>
              
              <p class="mb-4 leading-relaxed line-clamp-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ event.description }}
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <div class="flex items-center gap-2 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{{ event.attendees }} attendees</span>
                </div>
                
                <span class="text-blue-500 font-semibold group-hover:text-blue-600 transition-colors flex items-center gap-2">
                  View Details
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">No events found</h3>
          <p :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    </section>
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
</style>
