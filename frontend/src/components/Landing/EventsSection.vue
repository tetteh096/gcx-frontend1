<script setup lang="ts">
import { ref } from 'vue'
import { CalendarIcon, MapPinIcon, ClockIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { isDarkMode } from '../../utils/darkMode'

const activeTab = ref('upcoming')

const upcomingEvents = [
  {
    title: "GCX Annual Trading Conference 2025",
    date: "September 15-17, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Accra International Conference Centre",
    description: "Join industry leaders, traders, and stakeholders for three days of insights, networking, and market analysis.",
    category: "Conference",
    image: "/trading.jpg",
    status: "upcoming"
  },
  {
    title: "Farmer Training Workshop",
    date: "September 25, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Kumasi Agricultural Centre",
    description: "Learn about modern trading practices, quality standards, and market access opportunities.",
    category: "Workshop",
    image: "/crop.jpg",
    status: "upcoming"
  },
  {
    title: "Commodity Price Analysis Seminar",
    date: "October 5, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "GCX Trading Floor, Accra",
    description: "Expert analysis of current market trends and future price projections for major commodities.",
    category: "Seminar",
    image: "/trading dashboard.jpg",
    status: "upcoming"
  }
]

const pastEvents = [
  {
    title: "GCX Market Opening Ceremony 2024",
    date: "December 15, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "GCX Headquarters, Accra",
    description: "Official opening ceremony for the 2024 trading season with key stakeholders and government officials.",
    category: "Ceremony",
    image: "/crop.jpg",
    status: "past"
  },
  {
    title: "Agricultural Commodity Summit",
    date: "November 20, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Kumasi Conference Centre",
    description: "Comprehensive summit covering agricultural commodity trends, market analysis, and future projections.",
    category: "Summit",
    image: "/trading.jpg",
    status: "past"
  },
  {
    title: "Trading Technology Workshop",
    date: "October 10, 2024",
    time: "1:00 PM - 5:00 PM",
    location: "GCX Training Centre, Accra",
    description: "Hands-on workshop on using GCX trading platforms and mobile applications.",
    category: "Workshop",
    image: "/trading dashboard.jpg",
    status: "past"
  }
]

const getCurrentEvents = () => {
  return activeTab.value === 'upcoming' ? upcomingEvents : pastEvents
}
</script>

<template>
  <section class="py-24 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
    <div class="max-w-[1600px] mx-auto px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-5xl font-bold mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">Upcoming Events</h2>
        <p class="text-xl max-w-3xl mx-auto transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">Join us for exciting events and educational opportunities</p>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="flex justify-center mb-12">
        <div class="flex rounded-2xl border-2 overflow-hidden" :class="isDarkMode ? 'border-slate-600' : 'border-slate-300'">
          <button
            @click="activeTab = 'upcoming'"
            class="px-8 py-4 text-lg font-semibold transition-all duration-300"
            :class="activeTab === 'upcoming' 
              ? 'bg-yellow-500 text-black' 
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')"
          >
            Upcoming Events
          </button>
          <button
            @click="activeTab = 'past'"
            class="px-8 py-4 text-lg font-semibold transition-all duration-300"
            :class="activeTab === 'past' 
              ? 'bg-yellow-500 text-black' 
              : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100')"
          >
            Past Events
          </button>
        </div>
      </div>
      
      <!-- Events Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        <div 
          v-for="event in getCurrentEvents()" 
          :key="event.title"
          class="group relative overflow-hidden rounded-3xl shadow-2xl border transition-all duration-500 hover:shadow-3xl"
          :class="isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'"
        >
          <!-- Event Image -->
          <div class="w-full h-64 overflow-hidden">
            <img 
              :src="event.image" 
              :alt="event.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
          
          <!-- Category Badge -->
          <div class="absolute top-6 left-6">
            <span class="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg bg-yellow-500">
              {{ event.category }}
            </span>
          </div>
          
          <!-- Status Badge -->
          <div class="absolute top-6 right-6">
            <span class="px-3 py-2 rounded-lg text-xs font-medium text-white shadow-lg" :class="{
              'bg-green-500': event.status === 'upcoming',
              'bg-slate-500': event.status === 'past'
            }">
              {{ event.status === 'upcoming' ? 'Upcoming' : 'Past' }}
            </span>
          </div>
          
          <!-- Event Content -->
          <div class="p-8">
            <!-- Event Title -->
            <h3 class="text-2xl font-bold mb-4 transition-colors duration-300" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ event.title }}
            </h3>
            
            <!-- Event Description -->
            <p class="text-base mb-6 transition-colors duration-300" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              {{ event.description }}
            </p>
            
            <!-- Event Details -->
            <div class="space-y-3 mb-6">
              <div class="flex items-center text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                <CalendarIcon class="w-4 h-4 mr-3 text-yellow-500" />
                {{ event.date }}
              </div>
              <div class="flex items-center text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                <ClockIcon class="w-4 h-4 mr-3 text-yellow-500" />
                {{ event.time }}
              </div>
              <div class="flex items-center text-sm transition-colors duration-300" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                <MapPinIcon class="w-4 h-4 mr-3 text-yellow-500" />
                {{ event.location }}
              </div>
            </div>
            
            <!-- CTA Button -->
            <button 
              class="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              :class="event.status === 'past' ? 'bg-slate-500 hover:bg-slate-400 text-white cursor-default' : ''"
            >
              <span>{{ event.status === 'upcoming' ? 'Register Now' : 'Event Completed' }}</span>
              <ChevronRightIcon v-if="event.status === 'upcoming'" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- View All Events Button -->
      <div class="text-center mt-16">
        <button class="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-lg">
          View All Events →
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth transitions */
.transition-all {
  transition: all 0.5s ease-in-out;
}

/* Image hover effect only */
.group:hover img {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg:grid-cols-3 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .py-24 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .mb-16 {
    margin-bottom: 3rem;
  }
  
  .mt-16 {
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .px-8 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .gap-8 {
    gap: 1.5rem;
  }
}
</style>
