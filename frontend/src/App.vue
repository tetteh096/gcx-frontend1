<script setup lang="ts">
import { onMounted } from 'vue'
import { initializeDarkMode } from './utils/darkMode'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  initializeDarkMode()
})
</script>

<template>
  <div id="app" class="min-h-screen transition-colors duration-300">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Additional custom styles can go here */
</style>
