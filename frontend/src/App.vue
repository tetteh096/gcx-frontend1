<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { initializeDarkMode, isDarkMode } from './utils/darkMode'

onMounted(() => {
  // Ensure dark mode is properly initialized
  initializeDarkMode()
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <Navbar />
    <main class="w-full">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Additional custom styles can go here */
</style>
