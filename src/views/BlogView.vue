<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { isDarkMode } from '../utils/darkMode'
import BlogHero from '../components/Blog/BlogHero.vue'
import RecentPosts from '../components/Blog/RecentPosts.vue'
import BlogFilters from '../components/Blog/BlogFilters.vue'
import BlogPostsGrid from '../components/Blog/BlogPostsGrid.vue'
import { useBlog } from '../composables/useBlog'
import { getImageUrl } from '../utils/imageUrl'
import Footer from '../components/Footer.vue'

const { posts, fetchPublicPosts, isLoading } = useBlog()

// Blog posts from API - no more mock data!
const blogPosts = ref([])
const { t } = useI18n()

const searchQuery = ref('')
const selectedTag = ref('')
const currentPage = ref(1)
const postsPerPage = 6

// Filter posts based on search and tags
const filteredPosts = computed(() => {
  let posts = blogPosts.value

  if (searchQuery.value) {
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedTag.value) {
    posts = posts.filter(post => post.tags.includes(selectedTag.value))
  }

  return posts
})

// Get all unique tags
const allTags = computed(() => {
  const tags = new Set<string>()
  blogPosts.value.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
  currentPage.value = 1
}

// Manual refresh function for debugging
const refreshPosts = async () => {
  blogPosts.value = []
  await loadPosts()
}

// Load posts function
const loadPosts = async () => {
  try {
    const result = await fetchPublicPosts()
    
    if (posts.value && posts.value.length > 0) {
      // Transform API posts to match frontend structure
      const transformedPosts = posts.value.map(post => {
        // Handle null/undefined tags
        let postTags: string[] = []
        if (post.tags) {
          if (typeof post.tags === 'string') {
            try {
              postTags = JSON.parse(post.tags)
            } catch {
              postTags = (post.tags as string).split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          } else if (Array.isArray(post.tags)) {
            postTags = post.tags
          }
        }
        
        // Generate excerpt if not provided
        let excerpt = post.excerpt
        if (!excerpt && post.content) {
          excerpt = post.content.replace(/<[^>]*>/g, ' ').trim().substring(0, 160)
          if (excerpt.length === 160) excerpt += '...'
        }
        
        // Handle featured image - use getImageUrl to properly handle S3 URLs
        const featuredImage = post.featured_image ? getImageUrl(post.featured_image) : '/trading.jpg'
        
        // Handle date formatting
        let postDate
        try {
          const dateToUse = post.published_at || post.created_at
          postDate = new Date(dateToUse).toISOString().split('T')[0]
        } catch {
          postDate = new Date().toISOString().split('T')[0]
        }
        
        // Handle author - could be string or object
        let authorName = 'GCX Team'
        if (post.author) {
          if (typeof post.author === 'string') {
            authorName = post.author
          } else if (typeof post.author === 'object' && post.author.name) {
            authorName = post.author.name
          }
        }
        
        return {
          id: post.id,
          title: post.title || 'Untitled Post',
          excerpt: excerpt || 'No excerpt available',
          author: authorName,
          date: postDate,
          image: featuredImage,
          tags: postTags,
          featured: false, // You can add featured logic later
          slug: post.slug || post.id.toString()
        }
      })
      
      blogPosts.value = transformedPosts
    } else {
      blogPosts.value = []
    }
  } catch (error) {
    console.error('Failed to fetch posts from API:', error)
    blogPosts.value = []
  }
}

// Load blog posts on component mount
onMounted(loadPosts)
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
    <!-- Hero Section with Subscription -->
    <BlogHero />
    
    <!-- Recent Blog Posts -->
    <RecentPosts :posts="filteredPosts" />
    
    <!-- All Blog Posts -->
    <section class="py-24 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-slate-50'">
      <div class="max-w-[1600px] mx-auto px-4">
        <!-- Search and Filters -->
        <BlogFilters
          v-model:search-query="searchQuery"
          v-model:selected-tag="selectedTag"
          :all-tags="allTags"
          @clear-filters="clearFilters"
        />

        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            All Blog Posts
          </h2>
          <button 
            @click="refreshPosts"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            🔄 Refresh Posts
          </button>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p class="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="!isLoading && blogPosts.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            No Blog Posts Yet
          </h3>
          <p class="text-gray-600">
            Create your first blog post in the CMS to see it here!
          </p>
        </div>
        
        <!-- Posts Grid with Pagination -->
        <BlogPostsGrid
          v-else
          :posts="filteredPosts"
          v-model:current-page="currentPage"
          :posts-per-page="postsPerPage"
        />
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #eab308;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ca8a04;
}
</style>
