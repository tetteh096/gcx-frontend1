<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isDarkMode, toggleDarkMode } from '../utils/darkMode'

const documentClasses = ref('')

const testToggle = () => {
  console.log('Test toggle clicked')
  console.log('Current isDarkMode value:', isDarkMode.value)
  if (typeof document !== 'undefined') {
    console.log('Current document classes:', document.documentElement.classList.toString())
  }
  toggleDarkMode()
  console.log('After toggle, isDarkMode value:', isDarkMode.value)
  if (typeof document !== 'undefined') {
    console.log('After toggle, document classes:', document.documentElement.classList.toString())
    documentClasses.value = document.documentElement.classList.toString()
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    documentClasses.value = document.documentElement.classList.toString()
  }
})
</script>

<template>
  <div class="fixed top-24 right-4 z-50 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
    <h3 class="text-sm font-bold mb-2 text-slate-900 dark:text-white">Dark Mode Test</h3>
    <div class="space-y-2">
      <div class="text-xs text-slate-600 dark:text-slate-300">
        Current: {{ isDarkMode ? 'Dark' : 'Light' }}
      </div>
      <button 
        @click="testToggle"
        class="w-full px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
      >
        Toggle Dark Mode
      </button>
      <div class="text-xs text-slate-600 dark:text-slate-300">
        Classes: {{ documentClasses }}
      </div>
    </div>
  </div>
</template> 