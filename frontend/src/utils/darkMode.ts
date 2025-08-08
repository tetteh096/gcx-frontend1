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
    console.log('Applying dark mode:', isDarkMode.value)
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      console.log('Added dark class')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('Removed dark class')
    }
    console.log('Current document classes:', document.documentElement.classList.toString())
  }
}

// Toggle dark mode
const toggleDarkMode = () => {
  console.log('Toggle clicked, current state:', isDarkMode.value)
  isDarkMode.value = !isDarkMode.value
  console.log('New state:', isDarkMode.value)
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