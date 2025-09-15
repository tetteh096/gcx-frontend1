<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { isDarkMode, toggleDarkMode } from '../utils/darkMode'
import { useTickerVisibility } from '../composables/useTickerVisibility'
import { useI18n } from '../composables/useI18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const router = useRouter()
const isMenuOpen = ref(false)
const searchQuery = ref('')
const { isTickerVisible } = useTickerVisibility()
const { t } = useI18n()

// Dynamic navbar positioning based on ticker visibility
const navbarTop = computed(() => {
  return isTickerVisible.value ? 'top-8 md:top-10' : 'top-0'
})

// Simplified navigation structure
const navigation = computed(() => [
  { name: 'Home', href: '/' },
  { 
    name: t('navigation.menu.about'), 
    href: '/about',
    dropdown: [
      { 
        title: 'About GCX',
        items: [
          { name: t('navigation.about.aboutGcx'), href: '/about#about', description: 'Overview of Ghana Commodity Exchange' },
          { name: t('navigation.about.mission'), href: '/about#who', description: 'Our mission and purpose' },
          { name: t('navigation.about.vision'), href: '/about#vision', description: 'Our vision and strategic goals' }
        ]
      },
      { 
        title: 'Leadership',
        items: [
          { name: t('navigation.about.boardOfDirectors'), href: '/about#board', description: 'GCX board members and governance' },
          { name: t('navigation.about.executiveManagement'), href: '/about#exec', description: 'Senior leadership team' },
          { name: t('navigation.about.functionalHeads'), href: '/about#func', description: 'Department and function leaders' }
        ]
      },
      { 
        title: 'Partnerships',
        items: [
          { name: 'Strategic Partners', href: '/about/partnership#partners', description: 'Building strong partnerships for market growth' },
          { name: 'Donor Agencies', href: '/about/partnership#donors', description: 'International donor partnerships' },
          { name: 'Financial Institutions', href: '/about/partnership#financial', description: 'Banking and financial collaborations' },
          { name: 'Government Agencies', href: '/about/partnership#government', description: 'Government sector partnerships' }
        ]
      }
    ]
  },
  { 
    name: t('navigation.menu.services'), 
    href: '/services'
  },
  { 
    name: t('navigation.menu.membership'), 
    href: '/membership',
    dropdown: [
      { 
        title: 'Membership Information',
        items: [
          { name: 'Membership Types', href: '/membership#types', description: 'Different membership categories and requirements' },
          { name: 'Membership Benefits', href: '/membership#benefits', description: 'Exclusive benefits for GCX members' },
          { name: 'Rights & Obligations', href: '/membership#rights', description: 'Member rights and responsibilities' },
          { name: 'Membership List', href: '/membership#list', description: 'Current GCX member directory' }
        ]
      },
      { 
        title: 'Application Process',
        items: [
          { name: 'Rules & Regulations', href: '/membership/application#rules', description: 'Complete membership rules and guidelines' },
          { name: 'Application Process', href: '/membership/application#process', description: 'Step-by-step application guide' },
          { name: 'Application Forms', href: '/membership/application#forms', description: 'Download membership application forms' }
        ]
      }
    ]
  },
  { 
    name: t('navigation.menu.marketData'), 
    href: '/market-data',
    dropdown: [
      { 
        title: 'Market Information',
        items: [
          { name: 'Live Prices', href: '/market-data#prices', description: 'Real-time commodity price updates' },
          { name: 'Market Overview', href: '/market-data#overview', description: 'Comprehensive market analysis and statistics' },
          { name: 'Price Charts', href: '/market-data#charts', description: 'Technical analysis and price charts' },
          { name: 'Market Reports', href: '/market-data#reports', description: 'Detailed market reports and analysis' },
          { name: 'Trading Statistics', href: '/market-data#stats', description: 'Trading performance and volume data' },
          { name: 'Price History', href: '/market-data#history', description: 'Historical price trends and analysis' }
        ]
      }
    ]
  },
  { 
    name: t('navigation.menu.resources'), 
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
        title: 'Publications & Documents',
        items: [
          { name: 'Research Papers', href: '/resources#research', description: 'Academic and industry research publications' },
          { name: 'Annual Reports', href: '/resources#annual', description: 'GCX annual performance reports' },
          { name: 'Policy Documents', href: '/resources#policy', description: 'Regulatory and policy information' }
        ]
      },
      { 
        title: 'Career Opportunities',
        items: [
          { name: 'Job Openings', href: '/resources#openings', description: 'Current career opportunities at GCX' },
          { name: 'Internship Programs', href: '/resources#internship', description: 'Student internship and training programs' },
          { name: 'Functional Areas', href: '/resources#functional', description: 'Available job functions and departments' }
        ]
      },
      { 
        title: 'Commodity Information',
        items: [
          { name: 'Maize Trading', href: '/resources#maize', description: 'Maize commodity trading information' },
          { name: 'Soya Bean', href: '/resources#soybean', description: 'Soya bean market insights and trading' },
          { name: 'Sorghum', href: '/resources#sorghum', description: 'Sorghum commodity details and pricing' },
          { name: 'Sesame', href: '/resources#sesame', description: 'Sesame seed trading and market data' },
          { name: 'Rice', href: '/resources#rice', description: 'Rice commodity trading information' }
        ]
      }
    ]
  },
  { 
    name: t('navigation.menu.media'), 
    href: '/media',
    dropdown: [
      { 
        title: 'News & Updates',
        items: [
          { name: 'Latest News', href: '/media', description: 'Recent news and announcements' },
          { name: 'Press Releases', href: '/media', description: 'Official press releases and statements' },
          { name: 'Media Coverage', href: '/media', description: 'GCX in the news and media' },
          { name: 'Featured Stories', href: '/blog', description: 'Highlighted stories from the industry' },
          { name: 'Industry Insights', href: '/blog', description: 'Expert analysis and market insights' }
        ]
      },
      { 
        title: 'Multimedia Content',
        items: [
          { name: 'Photo Gallery', href: '/media#gallery', description: 'Event photos and visual content' },
          { name: 'Videos', href: '/media#videos', description: 'Video content and presentations' },
          { name: 'Webinars', href: '/media#webinars', description: 'Educational webinars and events' }
        ]
      },
      { 
        title: 'External Resources',
        items: [
          { name: 'GCX RTI Portal', href: 'https://gcx.com.gh/gcxrti/', description: 'Right to Information portal access', external: true }
        ]
      }
    ]
  },
  { name: t('navigation.menu.contact'), href: '/contact' }
])

// State management
const openDropdown = ref<string | null>(null)
let dropdownTimeout: number | null = null

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

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
  }, 300) // 300ms delay before closing
}

const clearDropdownTimeout = () => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout)
    dropdownTimeout = null
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search functionality
    console.log('Searching for:', searchQuery.value)
  }
}

const navigateToApplication = () => {
  router.push('/membership/application')
  closeMenu()
}
</script>

<template>
  <!-- Modern Clean Navbar -->
  <nav 
    class="fixed left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300" 
    :class="[
      navbarTop,
      isDarkMode ? 'bg-slate-900/95 border-b border-slate-700' : 'bg-white/95 border-b border-slate-200'
    ]"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div class="flex items-center h-16">
        
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center group">
            <img 
              src="/logo_black.png" 
              alt="GCX Logo" 
              class="h-9 w-auto transition-transform group-hover:scale-105" 
            />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center flex-1 justify-center mx-8">
          <!-- Navigation Container with Background -->
          <div class="flex items-center space-x-4 rounded-full px-6 py-2 backdrop-blur-sm border"
               :class="isDarkMode ? 'bg-slate-800/90 border-slate-700/50' : 'bg-white/90 border-slate-200/50'">
            <div
              v-for="item in navigation"
              :key="item.name"
              class="relative group"
              @mouseenter="item.dropdown ? (clearDropdownTimeout(), toggleDropdown(item.name)) : null"
              @mouseleave="closeDropdown"
            >
              <!-- Main Navigation Link -->
              <router-link
                :to="item.href"
                class="flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:text-yellow-500 whitespace-nowrap"
                                 :class="$route.path === item.href 
                  ? 'text-yellow-500'
                  : (isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900')"
              >
                {{ item.name }}
                <ChevronDownIcon v-if="item.dropdown" class="ml-1 h-4 w-4" />
              </router-link>
              
            <!-- Large Professional Dropdown Menu -->
              <div
                v-if="item.dropdown && openDropdown === item.name"
                class="absolute top-full left-0 mt-1 w-[700px] rounded-xl shadow-xl border py-3 z-50 transition-all duration-300"
                :class="isDarkMode ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'"
                @mouseenter="clearDropdownTimeout()"
                @mouseleave="closeDropdown"
              >
                <div class="grid grid-cols-2 gap-4 px-4">
                  <!-- Left Column -->
                  <div class="space-y-4">
                    <div v-for="(section, index) in item.dropdown.slice(0, Math.ceil(item.dropdown.length / 2))" :key="index">
                      <h4 class="text-xs font-semibold uppercase tracking-wide mb-2" :class="isDarkMode ? 'text-yellow-400' : 'text-slate-600'">
                        {{ section.title }}
                      </h4>
                      <div class="space-y-2">
                          <router-link
                        v-for="dropdownItem in section.items"
                        :key="dropdownItem.name"
                            :to="dropdownItem.href"
                            class="group block p-2 rounded-lg transition-all duration-200"
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
                  <div class="space-y-4">
                    <div v-for="(section, index) in item.dropdown.slice(Math.ceil(item.dropdown.length / 2))" :key="index">
                      <h4 class="text-xs font-semibold uppercase tracking-wide mb-2" :class="isDarkMode ? 'text-yellow-400' : 'text-slate-600'">
                        {{ section.title }}
                      </h4>
                      <div class="space-y-2">
                          <router-link
                        v-for="dropdownItem in section.items"
                        :key="dropdownItem.name"
                            :to="dropdownItem.href"
                            class="group block p-2 rounded-lg transition-all duration-200"
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
                        Apply
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden lg:flex items-center">
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                :placeholder="t('forms.placeholders.search')"
                class="w-28 pl-8 pr-3 py-1.5 text-xs border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                :class="isDarkMode ? 'bg-slate-800 text-white placeholder-slate-400 border-slate-600' : 'bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300'"
              />
            </div>
          </div>

          <!-- Language Switcher -->
          <div class="hidden lg:flex items-center">
            <LanguageSwitcher />
          </div>

          <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
            class="p-1.5 rounded-full transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'"
            >
            <SunIcon v-if="!isDarkMode" class="h-4 w-4" />
            <MoonIcon v-else class="h-4 w-4" />
            </button>

          <!-- Apply Button -->
            <button 
              @click="navigateToApplication"
            class="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg text-xs"
            >
            Apply
            </button>

          <!-- Mobile Menu Button -->
                         <button
               @click="toggleMenu"
            class="lg:hidden p-2 rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'"
             >
            <Bars3Icon v-if="!isMenuOpen" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
            </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="lg:hidden">
        <div class="py-4 space-y-1 rounded-lg mt-2 shadow-lg border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
          
          <!-- Mobile Search -->
          <div class="px-4 mb-4">
            <div class="relative">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                :placeholder="t('forms.placeholders.search')"
                class="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                :class="isDarkMode ? 'bg-slate-700 text-white placeholder-slate-400 border-slate-600' : 'bg-slate-50 text-slate-900 placeholder-slate-500 border-slate-300'"
              />
            </div>
          </div>

          <!-- Mobile Navigation Links -->
          <div class="px-2">
            <div v-for="item in navigation" :key="item.name" class="mb-1">
              <router-link
                :to="item.href"
                @click="closeMenu"
                class="flex items-center justify-between px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200"
                :class="$route.path === item.href 
                  ? (isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-yellow-50 text-yellow-600')
                  : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900')"
              >
                <span>{{ item.name }}</span>
                <ChevronDownIcon v-if="item.dropdown" class="h-4 w-4" />
              </router-link>
              
              <!-- Mobile Dropdown -->
              <div v-if="item.dropdown" class="ml-4 mt-2 space-y-1">
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

          <!-- Mobile Utilities -->
          <div class="px-4 pt-4 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
            <div class="flex items-center justify-between mb-4">
              <!-- Dark Mode Toggle -->
              <button
                @click="toggleDarkMode"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200"
                :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'"
              >
                <SunIcon v-if="!isDarkMode" class="h-4 w-4" />
                <MoonIcon v-else class="h-4 w-4" />
                <span class="text-sm font-medium">{{ isDarkMode ? 'Light' : 'Dark' }}</span>
              </button>

              <!-- Language Switcher -->
              <LanguageSwitcher />
            </div>

            <!-- Mobile Apply Button -->
            <button 
              @click="navigateToApplication"
              class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg"
            >
              Apply
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Spacer for fixed navbar -->
  <div class="h-12"></div>
</template>