<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { isDarkMode, toggleDarkMode } from '../utils/darkMode'

const router = useRouter()
const isMenuOpen = ref(false)
const searchQuery = ref('')

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { 
        title: 'Organization',
        items: [
          { name: 'About GCX', href: '/about', description: 'Learn about Ghana Commodity Exchange' },
          { name: 'Mission & Vision', href: '/about', description: 'Our core mission and strategic vision for agricultural development' },
          { name: 'Strategic Partners', href: '/about/partnership', description: 'Building strong partnerships for market growth' }
        ]
      },
      { 
        title: 'Leadership',
        items: [
          { name: 'Board of Directors', href: '/about', description: 'Meet our distinguished board members' },
          { name: 'Executive Management', href: '/about', description: 'Our experienced executive team' },
          { name: 'Functional Heads', href: '/about', description: 'Specialized department leaders' }
        ]
      },
      { 
        title: 'Partnerships',
        items: [
          { name: 'Donor Agencies', href: '/about/partnership', description: 'International donor partnerships' },
          { name: 'Financial Institutions', href: '/about/partnership', description: 'Banking and financial collaborations' },
          { name: 'Government Agencies', href: '/about/partnership', description: 'Government sector partnerships' },
          { name: 'NGOs', href: '/about/partnership', description: 'Non-governmental organization networks' },
          { name: 'Private Agencies', href: '/about/partnership', description: 'Private sector collaborations' }
        ]
      },
      { 
        title: 'Opportunities',
        items: [
          { name: 'Procurement Opportunities', href: '/about/partnership', description: 'Business and procurement opportunities' }
        ]
      }
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { 
        title: 'Core Services',
        items: [
          { name: 'Trading Platform', href: '/services', description: 'Advanced electronic trading platform' },
          { name: 'Commodity Prices', href: '/services', description: 'Real-time commodity pricing and market data' },
          { name: 'Warehouse Services', href: '/services', description: 'Certified warehouse and storage solutions' },
          { name: 'Quality Assurance', href: '/services', description: 'Quality testing and certification services' }
        ]
      }
    ]
  },
  { 
    name: 'Membership', 
    href: '/membership',
    dropdown: [
      { 
        title: 'Membership Information',
        items: [
          { name: 'Membership Types', href: '/membership', description: 'Different membership categories and requirements' },
          { name: 'Membership Benefits', href: '/membership', description: 'Exclusive benefits for GCX members' },
          { name: 'Rights & Obligations', href: '/membership', description: 'Member rights and responsibilities' },
          { name: 'Membership List', href: '/membership', description: 'Current GCX member directory' },
          { name: 'Brokers', href: '/membership', description: 'Registered broker information' }
        ]
      },
      { 
        title: 'Application Process',
        items: [
          { name: 'Rules & Regulations', href: '/membership/application', description: 'Complete membership rules and guidelines' },
          { name: 'Application Process', href: '/membership/application', description: 'Step-by-step application guide' },
          { name: 'Application Forms', href: '/membership/application', description: 'Download membership application forms' }
        ]
      }
    ]
  },
  { 
    name: 'Market Data', 
    href: '/market-data',
    dropdown: [
      { 
        title: 'Market Information',
        items: [
          { name: 'Live Prices', href: '/market-data', description: 'Real-time commodity price updates' },
          { name: 'Market Reports', href: '/market-data', description: 'Comprehensive market analysis reports' },
          { name: 'Trading Statistics', href: '/market-data', description: 'Detailed trading performance data' },
          { name: 'Price History', href: '/market-data', description: 'Historical price trends and analysis' }
        ]
      }
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources',
    dropdown: [
      { 
        title: 'Educational Materials',
        items: [
          { name: 'Trading Guides', href: '/resources', description: 'Comprehensive trading tutorials and guides' },
          { name: 'Market Analysis', href: '/resources', description: 'In-depth market research and analysis' },
          { name: 'Best Practices', href: '/resources', description: 'Industry best practices and standards' },
          { name: 'Training Materials', href: '/resources', description: 'Educational resources for traders' }
        ]
      },
      { 
        title: 'Publications',
        items: [
          { name: 'Research Papers', href: '/resources', description: 'Academic and industry research publications' },
          { name: 'Annual Reports', href: '/resources', description: 'GCX annual performance reports' },
          { name: 'Policy Documents', href: '/resources', description: 'Regulatory and policy information' }
        ]
      }
    ]
  },
  { 
    name: 'Media', 
    href: '/media',
    dropdown: [
      { 
        title: 'News & Updates',
        items: [
          { name: 'Latest News', href: '/media', description: 'Recent news and announcements' },
          { name: 'Press Releases', href: '/media', description: 'Official press releases and statements' },
          { name: 'Media Coverage', href: '/media', description: 'GCX in the news and media' }
        ]
      },
      { 
        title: 'Multimedia',
        items: [
          { name: 'Photo Gallery', href: '/media', description: 'Event photos and visual content' },
          { name: 'Videos', href: '/media', description: 'Video content and presentations' },
          { name: 'Webinars', href: '/media', description: 'Educational webinars and events' }
        ]
      }
    ]
  },
  { name: 'Contact', href: '/contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    alert(`Searching for: ${searchQuery.value}`)
    searchQuery.value = ''
  }
}

// Dropdown state
const openDropdown = ref<string | null>(null)
let dropdownTimeout: number | null = null

const toggleDropdown = (itemName: string) => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout)
    dropdownTimeout = null
  }
  openDropdown.value = openDropdown.value === itemName ? null : itemName
}

const closeDropdown = () => {
  dropdownTimeout = setTimeout(() => {
    openDropdown.value = null
  }, 150) // 150ms delay before closing
}

const clearDropdownTimeout = () => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout)
    dropdownTimeout = null
  }
}

const navigateToApplication = () => {
  router.push('/membership/application')
  closeMenu()
}
</script>

<template>
    <!-- Modern Glassmorphism Navbar -->
  <nav class="fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'">
    <!-- Main navbar content -->
    <div class="w-full px-6">
      <div class="flex justify-between items-center h-20">
        <!-- Logo - Far left edge -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center group">
            <img src="/logo_black.png" alt="GCX Logo" class="h-20 w-auto transition-transform group-hover:scale-105" />
          </router-link>
        </div>

        <!-- Desktop Navigation - Right side -->
        <div class="hidden lg:flex items-center flex-1 justify-end">
          <div class="flex items-center space-x-4 rounded-full p-3 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800/80' : 'bg-slate-100/80'">
            <div
              v-for="item in navigation"
              :key="item.name"
              class="relative"
              @mouseenter="item.dropdown ? (clearDropdownTimeout(), toggleDropdown(item.name)) : null"
              @mouseleave="closeDropdown"
            >
              <router-link
                :to="item.href"
                class="px-6 py-3 text-sm font-medium rounded-full transition-all flex items-center"
                                 :class="$route.path === item.href 
                   ? (isDarkMode ? 'bg-slate-700 text-white' : 'bg-white shadow-sm text-slate-900')
                   : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:text-slate-900')"
              >
                {{ item.name }}
                <ChevronDownIcon v-if="item.dropdown" class="w-4 h-4 ml-1" />
              </router-link>
              
              <!-- Large Dropdown Menu -->
              <div
                v-if="item.dropdown && openDropdown === item.name"
                class="absolute top-full left-0 mt-2 w-[800px] rounded-2xl shadow-2xl border py-6 z-50 transition-all duration-300"
                :class="isDarkMode ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'"
                @mouseenter="clearDropdownTimeout()"
                @mouseleave="closeDropdown"
              >
                <div class="grid grid-cols-2 gap-8 px-8">
                  <!-- Left Column -->
                  <div class="space-y-6">
                    <div v-for="(section, index) in item.dropdown.slice(0, Math.ceil(item.dropdown.length / 2))" :key="index">
                      <h4 class="text-xs font-semibold uppercase tracking-wide mb-3" :class="isDarkMode ? 'text-yellow-400' : 'text-slate-600'">
                        {{ section.title }}
                      </h4>
                      <div class="space-y-3">
                        <router-link
                          v-for="dropdownItem in section.items"
                          :key="dropdownItem.name"
                          :to="dropdownItem.href"
                          class="group block p-3 rounded-xl transition-all duration-200"
                          :class="isDarkMode ? 'hover:bg-slate-800 hover:border-slate-600' : 'hover:bg-slate-50 hover:border-slate-200'"
                        >
                          <div class="flex items-start justify-between">
                            <div class="flex-1">
                              <h5 class="font-medium text-sm mb-1 transition-colors" :class="isDarkMode ? 'text-white group-hover:text-yellow-300' : 'text-slate-900 group-hover:text-slate-700'">
                                {{ dropdownItem.name }}
                              </h5>
                              <p class="text-xs leading-relaxed" :class="isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-slate-600 group-hover:text-slate-500'">
                                {{ dropdownItem.description }}
                              </p>
                            </div>
                            <svg class="w-4 h-4 transition-colors" :class="isDarkMode ? 'text-slate-500 group-hover:text-yellow-400' : 'text-slate-400 group-hover:text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div class="space-y-6">
                    <div v-for="(section, index) in item.dropdown.slice(Math.ceil(item.dropdown.length / 2))" :key="index">
                      <h4 class="text-xs font-semibold uppercase tracking-wide mb-3" :class="isDarkMode ? 'text-yellow-400' : 'text-slate-600'">
                        {{ section.title }}
                      </h4>
                      <div class="space-y-3">
                        <router-link
                          v-for="dropdownItem in section.items"
                          :key="dropdownItem.name"
                          :to="dropdownItem.href"
                          class="group block p-3 rounded-xl transition-all duration-200"
                          :class="isDarkMode ? 'hover:bg-slate-800 hover:border-slate-600' : 'hover:bg-slate-50 hover:border-slate-200'"
                        >
                          <div class="flex items-start justify-between">
                            <div class="flex-1">
                              <h5 class="font-medium text-sm mb-1 transition-colors" :class="isDarkMode ? 'text-white group-hover:text-yellow-300' : 'text-slate-900 group-hover:text-slate-700'">
                                {{ dropdownItem.name }}
                              </h5>
                              <p class="text-xs leading-relaxed" :class="isDarkMode ? 'text-slate-300 group-hover:text-slate-200' : 'text-slate-600 group-hover:text-slate-500'">
                                {{ dropdownItem.description }}
                              </p>
                            </div>
                            <svg class="w-4 h-4 transition-colors" :class="isDarkMode ? 'text-slate-500 group-hover:text-yellow-400' : 'text-slate-400 group-hover:text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom CTA Section -->
                <div class="mt-6 pt-6 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                  <div class="px-8">
                    <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl p-4 border" :class="isDarkMode ? 'border-yellow-700/30' : 'border-yellow-200'">
                      <div class="flex items-center justify-between">
                        <div>
                          <h4 class="font-semibold text-sm mb-1" :class="isDarkMode ? 'text-yellow-300' : 'text-yellow-800'">Ready to Get Started?</h4>
                          <p class="text-xs" :class="isDarkMode ? 'text-yellow-200' : 'text-yellow-700'">Join GCX and access our comprehensive trading platform</p>
                        </div>
                        <button 
                          @click="navigateToApplication"
                          class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-all transform hover:scale-105 shadow-lg"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden lg:flex items-center">
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search markets..."
                class="w-64 pl-9 pr-4 py-2.5 text-sm border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                :class="isDarkMode ? 'bg-slate-800/80 text-white placeholder-slate-400 focus:bg-slate-700' : 'bg-slate-100/80 text-slate-900 placeholder-slate-500 focus:bg-white'"
              />
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <div class="hidden lg:flex items-center">
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-full transition-colors"
              :class="isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'"
            >
              <SunIcon v-if="!isDarkMode" class="h-5 w-5 text-slate-600" />
              <MoonIcon v-else class="h-5 w-5 text-slate-300" />
            </button>
          </div>

          <!-- Apply Now Button -->
          <div class="hidden lg:flex items-center">
            <button 
              @click="navigateToApplication"
              class="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Apply Now
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="lg:hidden">
                         <button
               @click="toggleMenu"
               class="p-2 rounded-full transition-colors"
               :class="isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'"
             >
              <Bars3Icon v-if="!isMenuOpen" class="h-5 w-5 text-slate-600" />
              <XMarkIcon v-else class="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMenuOpen" class="lg:hidden">
                 <div class="py-4 space-y-2 backdrop-blur-md rounded-2xl mx-4 mb-4 shadow-xl border transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800/95 border-slate-700/50' : 'bg-white/95 border-slate-200/50'">
          <!-- Mobile Search -->
          <div class="px-4 mb-4">
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search markets..."
                                 class="w-full pl-9 pr-4 py-2 text-sm border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                 :class="isDarkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-slate-100 text-slate-900 placeholder-slate-500'"
              />
            </div>
          </div>

          <!-- Mobile Navigation -->
          <div class="px-2">
            <div v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.href"
                @click="closeMenu"
                class="block px-4 py-3 text-base font-medium rounded-xl transition-colors"
                :class="$route.path === item.href 
                  ? (isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900')
                  : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')"
              >
                {{ item.name }}
              </router-link>
              
              <!-- Mobile Dropdown -->
              <div v-if="item.dropdown" class="mt-2 ml-4 space-y-1">
                <div v-for="section in item.dropdown" :key="section.title" class="mb-4">
                  <h4 class="text-xs font-semibold uppercase tracking-wide mb-2 px-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                    {{ section.title }}
                  </h4>
                  <router-link
                    v-for="dropdownItem in section.items"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    @click="closeMenu"
                    class="block px-4 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Buttons -->
          <div class="px-4 pt-4">
            <button 
              @click="navigateToApplication"
              class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-6 rounded-full transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Gold Line at Bottom - Full Width -->
    <div class="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 w-full"></div>
  </nav>

  <!-- Spacer for fixed navbar -->
  <div class="h-20"></div>
</template>