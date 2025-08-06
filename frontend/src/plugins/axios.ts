import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000'

// Add request interceptor for common headers
axios.interceptors.request.use(
  (config) => {
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

export default axios 