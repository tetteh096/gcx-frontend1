import axios from 'axios'

// Backend configuration - easily switch between Go and Laravel
const BACKEND_CONFIG = {
  // Set to 'go' or 'laravel' to switch backends
  BACKEND_TYPE: 'go', // Change this to 'laravel' to use Laravel backend
  GO_BACKEND_URL: 'http://localhost:8080',
  LARAVEL_BACKEND_URL: 'http://localhost:8000'
}

// Get the appropriate backend URL
const getBackendURL = () => {
  return BACKEND_CONFIG.BACKEND_TYPE === 'go' 
    ? BACKEND_CONFIG.GO_BACKEND_URL 
    : BACKEND_CONFIG.LARAVEL_BACKEND_URL
}

// Configure axios defaults
axios.defaults.baseURL = getBackendURL()

// Add request interceptor for common headers
axios.interceptors.request.use(
  (config) => {
    // Add JWT token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add any common headers here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Export configuration for use in other parts of the app
export { BACKEND_CONFIG, getBackendURL }
export default axios 