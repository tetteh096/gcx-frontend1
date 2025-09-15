<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initializeDarkMode } from './utils/darkMode'
import Navbar from './components/Navbar.vue'
import TradingViewTicker from './components/Landing/TradingViewTicker.vue'

import { RouterView } from 'vue-router'

const route = useRoute()

// Hide navbar and ticker for CMS and auth pages
const hideNavbar = computed(() => {
  const hideOnRoutes = ['/login', '/cms']
  const hideOnRoutePrefixes = ['/cms/']
  
  // Check exact routes
  if (hideOnRoutes.includes(route.path)) {
    return true
  }
  
  // Check route prefixes
  if (hideOnRoutePrefixes.some(prefix => route.path.startsWith(prefix))) {
    return true
  }
  
  return false
})

// Hide ticker for CMS, auth pages, and other protected routes
const hideTicker = computed(() => {
  const hideOnRoutes = ['/login', '/cms']
  const hideOnRoutePrefixes = ['/admin', '/dashboard', '/api', '/cms']
  
  // Check exact routes
  if (hideOnRoutes.includes(route.path)) {
    return true
  }
  
  // Check route prefixes
  if (hideOnRoutePrefixes.some(prefix => route.path.startsWith(prefix))) {
    return true
  }
  
  return false
})

// No padding needed - hero section handles its own positioning

onMounted(() => {
  initializeDarkMode()
})
</script>

<template>
  <div id="app" class="min-h-screen transition-colors duration-300">
    <!-- TradingView Ticker - Only show on main website pages -->
    <TradingViewTicker v-if="!hideTicker" />
    
    <!-- Only show Navbar for main website pages -->
    <Navbar v-if="!hideNavbar" />
    
    <!-- Main content area -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Additional custom styles can go here */
</style>
