<script setup lang="ts">
import { computed } from 'vue'
import { isDarkMode } from '../../utils/darkMode'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  tags: string[]
  featured: boolean
  slug?: string
}

interface Props {
  posts: BlogPost[]
  currentPage: number
  postsPerPage: number
}

interface Emits {
  (e: 'update:currentPage', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Get paginated posts (excluding featured)
const paginatedPosts = computed(() => {
  const startIndex = (props.currentPage - 1) * props.postsPerPage
  return props.posts.filter(post => !post.featured).slice(startIndex, startIndex + props.postsPerPage)
})

// Calculate total pages
const totalPages = computed(() => {
  const nonFeaturedPosts = props.posts.filter(post => !post.featured)
  return Math.ceil(nonFeaturedPosts.length / props.postsPerPage)
})

// Pagination functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <div>
    <!-- Posts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
             <router-link
         v-for="post in paginatedPosts"
         :key="post.id"
         :to="`/blog/${post.slug || post.id}`"
         class="group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden block"
         :class="isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'"
       >
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-6">
          <div class="mb-4">
            <span class="text-sm font-semibold" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'">
              {{ post.author }} • {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </span>
          </div>
          <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
            {{ post.title }}
          </h3>
          <p class="mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
            {{ post.excerpt }}
          </p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-yellow-500 font-medium group-hover:text-yellow-600 transition-colors">
              Read More →
            </span>
            <svg class="w-5 h-5 text-slate-400 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
                   </div>
         </router-link>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-between items-center py-8 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      
      <div class="flex gap-1">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="w-10 h-10 rounded-lg transition-all duration-200 font-medium"
          :class="page === currentPage 
            ? 'bg-yellow-500 text-white' 
            : (isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-200')"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'"
      >
        Next
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
