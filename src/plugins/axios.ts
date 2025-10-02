import axios from 'axios'

// Backend configuration - easily switch between Go and Laravel
const BACKEND_CONFIG = {
  // Set to 'go' or 'laravel' to switch backends
  BACKEND_TYPE: 'go', // Change this to 'laravel' to use Laravel backend
  
  // Go backend URLs - switch between local, ngrok, and Heroku
  GO_BACKEND_URL_LOCAL: 'http://localhost:8080',
  GO_BACKEND_URL_NGROK: 'https://8f5e6659a95f.ngrok-free.app',
  GO_BACKEND_URL_HEROKU: 'https://gcx-backend-api-e4d0fabe07d7.herokuapp.com',
  GO_USE_NGROK: false, // Set to true for ngrok, false for local
  GO_USE_HEROKU: true, // Set to true for Heroku, false for local/ngrok
  
  LARAVEL_BACKEND_URL: 'http://localhost:8000'
}

// Get the appropriate backend URL
const getBackendURL = () => {
  if (BACKEND_CONFIG.BACKEND_TYPE === 'go') {
    if (BACKEND_CONFIG.GO_USE_HEROKU) {
      return BACKEND_CONFIG.GO_BACKEND_URL_HEROKU
    }
    return BACKEND_CONFIG.GO_USE_NGROK 
      ? BACKEND_CONFIG.GO_BACKEND_URL_NGROK
      : BACKEND_CONFIG.GO_BACKEND_URL_LOCAL
  }
  return BACKEND_CONFIG.LARAVEL_BACKEND_URL
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