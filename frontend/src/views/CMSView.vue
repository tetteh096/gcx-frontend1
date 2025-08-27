<script setup lang="ts">
import { ref } from 'vue'
import { isDarkMode } from '../utils/darkMode'

// Import CMS Components
import CMSSidebar from '../components/CMS/CMSSidebar.vue'
import CMSNavbar from '../components/CMS/CMSNavbar.vue'
import CMSBlogView from './CMSBlogView.vue'

// Note: user, isAuthenticated are handled by router guard
// const { user, isAuthenticated, logout } = useAuth()

const activeSection = ref('dashboard')
const sidebarOpen = ref(true)

// This component will only be accessible if user is authenticated (handled by router guard)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const navigateToSection = (section: string) => {
  activeSection.value = section
}
</script>

<template>
  <div class="min-h-screen flex transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Sidebar -->
    <CMSSidebar 
      :is-open="sidebarOpen" 
      @toggle="toggleSidebar"
      @navigate="navigateToSection"
    />
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col" :class="sidebarOpen ? 'lg:ml-72' : ''">
      <!-- Top Navigation -->
      <CMSNavbar 
        :sidebar-open="sidebarOpen"
        @toggle-sidebar="toggleSidebar"
        @navigate="navigateToSection"
      />
      
      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <div class="container mx-auto px-6 py-8">
          <!-- Dashboard Section -->
          <div v-if="activeSection === 'dashboard'">
            <div class="mb-8">
              <h1 class="text-3xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                Dashboard
              </h1>
              <p class="mt-2" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                Welcome to your GCX content management system
              </p>
            </div>
            
            <!-- Dashboard Stats -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="rounded-lg border p-6 transition-all hover:shadow-lg"
                   :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="flex items-center">
                  <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                      Total Posts
                    </p>
                    <p class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                      24
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="rounded-lg border p-6 transition-all hover:shadow-lg"
                   :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="flex items-center">
                  <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                      Published
                    </p>
                    <p class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                      18
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="rounded-lg border p-6 transition-all hover:shadow-lg"
                   :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="flex items-center">
                  <div class="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                      Drafts
                    </p>
                    <p class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                      6
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="rounded-lg border p-6 transition-all hover:shadow-lg"
                   :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <div class="flex items-center">
                  <div class="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                      Media Files
                    </p>
                    <p class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                      156
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="rounded-lg border p-6"
                   :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <h3 class="text-lg font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  Quick Actions
                </h3>
                <div class="space-y-3">
                  <button
                    @click="navigateToSection('posts')"
                                class="w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:border-green-300"
            :class="isDarkMode ? 'border-slate-600 hover:bg-slate-700 hover:border-green-500' : 'border-slate-200 hover:bg-green-50'"
                  >
                    <span class="flex items-center">
                      <svg class="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span :class="isDarkMode ? 'text-white' : 'text-slate-900'">Create New Post</span>
                    </span>
                    <svg class="w-4 h-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button
                    @click="navigateToSection('media')"
                                class="w-full flex items-center justify-between p-3 rounded-lg border transition-colors hover:border-green-300"
            :class="isDarkMode ? 'border-slate-600 hover:bg-slate-700 hover:border-green-500' : 'border-slate-200 hover:bg-green-50'"
                  >
                    <span class="flex items-center">
                      <svg class="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span :class="isDarkMode ? 'text-white' : 'text-slate-900'">Upload Media</span>
                    </span>
                    <svg class="w-4 h-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="rounded-lg border p-6"
                   :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'">
                <h3 class="text-lg font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  Recent Activity
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                      Published "Market Update Q1 2025"
                    </span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                      Uploaded 5 new images
                    </span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span class="text-sm" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                      Updated market data settings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Blog Posts Section -->
          <CMSBlogView v-else-if="activeSection === 'posts'" />

          <!-- Other Sections -->
          <div v-else class="text-center py-12">
            <h2 class="text-2xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ activeSection.charAt(0).toUpperCase() + activeSection.slice(1) }}
            </h2>
            <p :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
              This section is coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
