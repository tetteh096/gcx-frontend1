import { ref, watch } from 'vue'

// Create a reactive dark mode state
const isDarkMode = ref(false)

// Initialize dark mode with light as default (override any stale saved dark)
const initializeDarkMode = () => {
  if (typeof window !== 'undefined') {
    // Force default to light on load; user can toggle to dark as needed
    isDarkMode.value = false
    localStorage.setItem('darkMode', 'false')
    applyDarkMode()
  }
}

// Apply dark mode to document
const applyDarkMode = () => {
  if (typeof document !== 'undefined') {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', isDarkMode.value.toString())
  }
  applyDarkMode()
}

// Watch for changes and apply them
watch(isDarkMode, () => {
  applyDarkMode()
})

// Initialize on module load
initializeDarkMode()

export { isDarkMode, toggleDarkMode, initializeDarkMode } 