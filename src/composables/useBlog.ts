import { ref, computed } from 'vue'
import { blogAPI } from '../services/api'
import type { BlogPost, CreatePostRequest, UpdatePostRequest } from '../types/cms'

const posts = ref<BlogPost[]>([])
const currentPost = ref<BlogPost | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useBlog() {
  // Clear error
  const clearError = () => {
    error.value = null
  }

  // Get all posts for CMS
  const fetchPosts = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await blogAPI.getAllPosts()
      posts.value = response.data
      
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch posts'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Get public posts for website
  const fetchPublicPosts = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await blogAPI.getPublicPosts()
      console.log('Raw API response:', response)
      
      // Handle different response structures
      if (response.data) {
        posts.value = Array.isArray(response.data) ? response.data : [response.data]
      } else if (Array.isArray(response)) {
        posts.value = response
      } else {
        posts.value = []
      }
      
      console.log('Processed posts:', posts.value)
      
      return { success: true }
    } catch (err: any) {
      console.error('API Error:', err)
      const message = err.response?.data?.error || 'Failed to fetch posts'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Get single post
  const fetchPost = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await blogAPI.getPost(id)
      currentPost.value = response.data
      
      return { success: true, data: response.data }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch post'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Get public post by slug
  const fetchPublicPost = async (slug: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await blogAPI.getPublicPost(slug)
      currentPost.value = response.data
      
      return { success: true, data: response.data }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch post'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Create post
  const createPost = async (data: CreatePostRequest) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await blogAPI.createPost(data)
      posts.value.unshift(response.data)
      
      return { success: true, data: response.data }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to create post'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Update post
  const updatePost = async (id: number, data: UpdatePostRequest) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await blogAPI.updatePost(id, data)
      
      // Update in posts array
      const index = posts.value.findIndex(p => p.id === id)
      if (index !== -1) {
        posts.value[index] = response.data
      }
      
      // Update current post if it's the same
      if (currentPost.value?.id === id) {
        currentPost.value = response.data
      }
      
      return { success: true, data: response.data }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to update post'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Delete post
  const deletePost = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      
      await blogAPI.deletePost(id)
      
      // Remove from posts array
      posts.value = posts.value.filter(p => p.id !== id)
      
      // Clear current post if it's the same
      if (currentPost.value?.id === id) {
        currentPost.value = null
      }
      
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to delete post'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const publishedPosts = computed(() => 
    posts.value.filter(post => post.status === 'published')
  )
  
  const draftPosts = computed(() => 
    posts.value.filter(post => post.status === 'draft')
  )
  
  const privatePosts = computed(() => 
    posts.value.filter(post => post.status === 'private')
  )

  return {
    // State
    posts: computed(() => posts.value),
    currentPost: computed(() => currentPost.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    
    // Computed
    publishedPosts,
    draftPosts,
    privatePosts,
    
    // Actions
    fetchPosts,
    fetchPublicPosts,
    fetchPost,
    fetchPublicPost,
    createPost,
    updatePost,
    deletePost,
    clearError,
  }
}
