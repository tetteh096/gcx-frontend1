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
      { name: 'Who We Are', href: '/about' },
      { name: 'Vision & Purpose', href: '/about#vision' },
      { name: 'Board of Directors', href: '/about/leadership#board' },
      { name: 'Executive Management', href: '/about/leadership#executive' },
      { name: 'Functional Heads', href: '/about/leadership#functional' },
      { name: 'Donor Agencies', href: '/about/partners#donor' },
      { name: 'Financial Institutions', href: '/about/partners#financial' },
      { name: 'Government Agencies', href: '/about/partners#government' },
      { name: 'Non-Governmental Organizations', href: '/about/partners#ngo' },
      { name: 'Private Agencies', href: '/about/partners#private' },
      { name: 'Procurement Opportunities', href: '/about/partners#tenders' }
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Trading Platform', href: '/services/trading' },
      { name: 'Market Data', href: '/services/data' },
      { name: 'Clearing & Settlement', href: '/services/clearing' },
      { name: 'Risk Management', href: '/services/risk' }
    ]
  },
  { 
    name: 'Membership', 
    href: '/membership',
    dropdown: [
      { name: 'Become a Member', href: '/membership/apply' },
      { name: 'Member Types', href: '/membership/types' },
      { name: 'Benefits', href: '/membership/benefits' },
      { name: 'Rules & Regulations', href: '/membership/rules' }
    ]
  },
  { 
    name: 'Market Data', 
    href: '/market-data',
    dropdown: [
      { name: 'Live Prices', href: '/market-data/prices' },
      { name: 'Market Reports', href: '/market-data/reports' },
      { name: 'Trading Statistics', href: '/market-data/stats' }
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

const toggleDropdown = (itemName: string) => {
  openDropdown.value = openDropdown.value === itemName ? null : itemName
}

const closeDropdown = () => {
  openDropdown.value = null
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

        <!-- Desktop Navigation - Centered with more spacing -->
        <div class="hidden lg:flex items-center flex-1 justify-center">
          <div class="flex items-center space-x-4 rounded-full p-3 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800/80' : 'bg-slate-100/80'">
            <div
              v-for="item in navigation"
              :key="item.name"
              class="relative"
              @mouseenter="item.dropdown ? toggleDropdown(item.name) : null"
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
              
              <!-- Dropdown Menu -->
              <div
                v-if="item.dropdown && openDropdown === item.name"
                class="absolute top-full left-0 mt-2 w-80 rounded-xl shadow-xl border py-2 z-50 transition-colors duration-300 max-h-96 overflow-y-auto"
                :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'"
              >
                <!-- Group 1: Who We Are -->
                <div class="px-4 py-2">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Organization</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(0, 2)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
                
                <!-- Group 2: Leadership -->
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Leadership</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(2, 5)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
                
                <!-- Group 3: Partners -->
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Partners</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(5, 10)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
                
                <!-- Group 4: Opportunities -->
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Opportunities</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(10)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
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

          <!-- Get Started Button Only -->
          <div class="hidden lg:flex items-center">
            <button class="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
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
              
              <!-- Mobile About Dropdown -->
              <div v-if="item.dropdown" class="mt-2 ml-4 space-y-1">
                <div class="px-4 py-2">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Organization</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(0, 2)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    @click="closeMenu"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
                
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Leadership</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(2, 5)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    @click="closeMenu"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
                
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Partners</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(5, 10)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    @click="closeMenu"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
                    :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                  >
                    {{ dropdownItem.name }}
                  </router-link>
                </div>
                
                <div class="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Opportunities</h4>
                  <router-link
                    v-for="dropdownItem in item.dropdown.slice(10)"
                    :key="dropdownItem.name"
                    :to="dropdownItem.href"
                    @click="closeMenu"
                    class="block px-2 py-2 text-sm transition-colors rounded-lg"
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
            <button class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-6 rounded-full transition-all">
              Get Started
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