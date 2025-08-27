<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { initializeDarkMode } from './utils/darkMode'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'

const route = useRoute()

// Hide navbar for CMS and auth pages
const hideNavbar = computed(() => {
  const hideOnRoutes = ['/login', '/cms']
  return hideOnRoutes.includes(route.path)
})

onMounted(() => {
  initializeDarkMode()
})
</script>

<template>
  <div id="app" class="min-h-screen transition-colors duration-300">
    <!-- Only show Navbar for main website pages -->
    <Navbar v-if="!hideNavbar" />
    
    <!-- Main content area -->
    <main :class="hideNavbar ? '' : 'pt-0'">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Additional custom styles can go here */
</style>
