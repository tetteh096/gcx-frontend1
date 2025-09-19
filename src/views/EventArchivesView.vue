<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isDarkMode } from '../utils/darkMode'
import Footer from '../components/Footer.vue'

const router = useRouter()

// Event data
const events = ref([
  // Upcoming Events
  {
    id: 'gcx-annual-conference-2025',
    title: 'GCX Annual Conference 2025',
    date: 'December 15, 2025',
    location: 'Accra, Ghana',
    type: 'Conference',
    status: 'upcoming',
    description: 'The Ghana Commodity Exchange Annual Conference will bring together industry leaders, farmers, and stakeholders to discuss the future of commodity trading in Ghana.',
    attendees: 500,
    image: '/Picture3.png',
    registrationOpen: true,
    registrationDeadline: 'December 10, 2025',
    price: 'Free',
    category: 'Conference'
  },
  {
    id: 'agricultural-tech-summit-2025',
    title: 'Agricultural Technology Summit 2025',
    date: 'November 20, 2025',
    location: 'Kumasi, Ghana',
    type: 'Summit',
    status: 'upcoming',
    description: 'Exploring cutting-edge agricultural technologies and their impact on commodity trading and market development.',
    attendees: 300,
    image: '/Picture3.png',
    registrationOpen: true,
    registrationDeadline: 'November 15, 2025',
    price: 'GHS 50',
    category: 'Summit'
  },
  {
    id: 'youth-agriculture-program-2025',
    title: 'Youth in Agriculture Program 2025',
    date: 'October 25, 2025',
    location: 'Takoradi, Ghana',
    type: 'Program',
    status: 'upcoming',
    description: 'Engaging young people in agriculture and commodity trading through education, mentorship, and practical training.',
    attendees: 100,
    image: '/Picture3.png',
    registrationOpen: true,
    registrationDeadline: 'October 20, 2025',
    price: 'Free',
    category: 'Program'
  },
  // Past Events
  {
    id: 'gcx-annual-conference-2023',
    title: 'GCX Annual Conference 2023',
    date: 'December 15, 2023',
    location: 'Accra, Ghana',
    type: 'Conference',
    status: 'completed',
    description: 'The Ghana Commodity Exchange Annual Conference brought together industry leaders, farmers, and stakeholders to discuss the future of commodity trading in Ghana.',
    attendees: 500,
    image: '/Picture3.png',
    registrationOpen: false,
    category: 'Conference'
  },
  {
    id: 'agricultural-innovation-summit-2023',
    title: 'Agricultural Innovation Summit 2023',
    date: 'October 20, 2023',
    location: 'Kumasi, Ghana',
    type: 'Summit',
    status: 'completed',
    description: 'Exploring digital agriculture and technology solutions for modern farming practices and commodity trading.',
    attendees: 300,
    image: '/Picture3.png',
    registrationOpen: false,
    category: 'Summit'
  },
  {
    id: 'commodity-market-workshop-2023',
    title: 'Commodity Market Analysis Workshop 2023',
    date: 'August 10, 2023',
    location: 'Tamale, Ghana',
    type: 'Workshop',
    status: 'completed',
    description: 'Training workshop on commodity market analysis and trading strategies for local farmers and traders.',
    attendees: 150,
    image: '/Picture3.png',
    registrationOpen: false,
    category: 'Workshop'
  },
  {
    id: 'women-agriculture-forum-2023',
    title: 'Women in Agriculture Forum 2023',
    date: 'June 15, 2023',
    location: 'Cape Coast, Ghana',
    type: 'Forum',
    status: 'completed',
    description: 'Empowering women farmers and traders in the commodity exchange ecosystem.',
    attendees: 200,
    image: '/Picture3.png',
    registrationOpen: false,
    category: 'Forum'
  },
  {
    id: 'youth-agriculture-program-2023',
    title: 'Youth in Agriculture Program 2023',
    date: 'April 22, 2023',
    location: 'Takoradi, Ghana',
    type: 'Program',
    status: 'completed',
    description: 'Engaging young people in agriculture and commodity trading through education and mentorship.',
    attendees: 100,
    image: '/Picture3.png',
    registrationOpen: false,
    category: 'Program'
  },
  {
    id: 'international-trade-meeting-2023',
    title: 'International Trade Partnership Meeting 2023',
    date: 'February 28, 2023',
    location: 'Accra, Ghana',
    type: 'Meeting',
    status: 'completed',
    description: 'Strengthening international partnerships for commodity trade and market development.',
    attendees: 75,
    image: '/Picture3.png',
    registrationOpen: false,
    category: 'Meeting'
  }
])

// Filter states
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedYear = ref('All')
const selectedStatus = ref('All')

// Available filters
const categories = ['All', 'Conference', 'Summit', 'Workshop', 'Forum', 'Program', 'Meeting']
const years = ['All', '2025', '2024', '2023', '2022', '2021', '2020']
const statuses = ['All', 'Upcoming', 'Completed']

// Computed properties
const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = selectedCategory.value === 'All' || event.category === selectedCategory.value
    const matchesYear = selectedYear.value === 'All' || event.date.includes(selectedYear.value)
    const matchesStatus = selectedStatus.value === 'All' || 
                         (selectedStatus.value === 'Upcoming' && event.status === 'upcoming') ||
                         (selectedStatus.value === 'Completed' && event.status === 'completed')
    
    return matchesSearch && matchesCategory && matchesYear && matchesStatus
  })
})

const upcomingEvents = computed(() => filteredEvents.value.filter(event => event.status === 'upcoming'))
const pastEvents = computed(() => filteredEvents.value.filter(event => event.status === 'completed'))

const totalAttendees = computed(() => {
  return events.value.reduce((total, event) => total + event.attendees, 0)
})

// Functions
const viewEventDetails = (eventId: string) => {
  router.push(`/media/archives/${eventId}`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusColor = (status: string) => {
  return status === 'upcoming' 
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

const getTypeColor = (type: string) => {
  const colors = {
    'Conference': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Summit': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Workshop': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Forum': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'Program': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Meeting': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Event Archives
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
            <div class="text-3xl font-bold text-white mb-2">{{ totalAttendees.toLocaleString() }}+</div>
            <div class="text-white/70 text-sm">Total Attendees</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Search and Filters -->
        <div class="mb-12">
          <div class="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <!-- Search Bar -->
            <div class="w-full lg:w-96">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search events..."
                  class="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-slate-900 placeholder-gray-500'"
                />
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-4">
              <select
                v-model="selectedCategory"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              >
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>

              <select
                v-model="selectedYear"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              >
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>

              <select
                v-model="selectedStatus"
                class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                :class="isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300 text-slate-900'"
              >
                <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div v-if="upcomingEvents.length > 0" class="mb-16">
          <h2 class="text-3xl font-bold mb-8" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Upcoming Events
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'"
              @click="viewEventDetails(event.id)"
            >
              <div class="relative">
                <img :src="event.image" :alt="event.title" class="w-full h-48 object-cover" />
                <div class="absolute top-4 left-4 flex gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusColor(event.status)">
                    {{ event.status }}
                  </span>
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getTypeColor(event.type)">
                    {{ event.type }}
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ event.title }}
                </h3>
                <div class="flex items-center text-sm mb-2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(event.date) }}
                </div>
                <div class="flex items-center text-sm mb-3" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ event.location }}
                </div>
                <p class="text-sm mb-4 line-clamp-3" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
                  {{ event.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-500' : 'text-gray-500'">
                    {{ event.attendees }} attendees
                  </span>
                  <span class="text-sm font-semibold" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'">
                    {{ event.price }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Past Events -->
        <div>
          <h2 class="text-3xl font-bold mb-8" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            Past Events
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="event in pastEvents"
              :key="event.id"
              class="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              :class="isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'"
              @click="viewEventDetails(event.id)"
            >
              <div class="relative">
                <img :src="event.image" :alt="event.title" class="w-full h-48 object-cover" />
                <div class="absolute top-4 left-4 flex gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusColor(event.status)">
                    {{ event.status }}
                  </span>
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getTypeColor(event.type)">
                    {{ event.type }}
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ event.title }}
                </h3>
                <div class="flex items-center text-sm mb-2" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(event.date) }}
                </div>
                <div class="flex items-center text-sm mb-3" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ event.location }}
                </div>
                <p class="text-sm mb-4 line-clamp-3" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
                  {{ event.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm" :class="isDarkMode ? 'text-slate-500' : 'text-gray-500'">
                    {{ event.attendees }} attendees
                  </span>
                  <button class="text-sm font-semibold hover:underline" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
</style>
