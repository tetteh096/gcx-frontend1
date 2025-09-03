<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initializeDarkMode } from './utils/darkMode'
import Navbar from './components/Navbar.vue'
import TradingViewTicker from './components/Landing/TradingViewTicker.vue'

import { RouterView } from 'vue-router'

const route = useRoute()

// Hide navbar for CMS and auth pages
const hideNavbar = computed(() => {
  const hideOnRoutes = ['/login', '/cms']
  return hideOnRoutes.includes(route.path)
})

// No padding needed - hero section handles its own positioning

onMounted(() => {
  initializeDarkMode()
})
</script>

<template>
  <div id="app" class="min-h-screen transition-colors duration-300">
    <!-- TradingView Ticker - Always visible at top -->
    <TradingViewTicker />
    
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
