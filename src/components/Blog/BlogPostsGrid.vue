<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../../composables/useI18n'
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
const { t } = useI18n()
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
        <!-- Enhanced Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <router-link
            v-for="post in paginatedPosts"
            :key="post.id"
            :to="`/blog/${post.slug || post.id}`"
            class="group cursor-pointer transition-all duration-500 hover:shadow-2xl rounded-2xl overflow-hidden block border transform hover:-translate-y-2"
            :class="isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700' : 'bg-white hover:bg-slate-50 border-gray-200'"
          >
            <!-- Enhanced Image Container -->
            <div class="relative overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                @error="(e) => (e.target as HTMLImageElement).src = '/trading.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Read Time Badge -->
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                {{ Math.ceil(post.excerpt.length / 200) }} min read
              </div>
              
              <!-- Category Badge -->
              <div v-if="post.tags.length > 0" class="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ post.tags[0] }}
              </div>
            </div>

            <!-- Enhanced Content -->
            <div class="p-6">
              <!-- Author and Date -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{{ typeof post.author === 'string' ? post.author.charAt(0) : ((post.author as any)?.name || 'G').charAt(0) }}</span>
                </div>
                <div>
                  <p class="text-sm font-semibold" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'">
                    {{ typeof post.author === 'string' ? post.author : ((post.author as any)?.name || 'GCX Team') }}
                  </p>
                  <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                    {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                  </p>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors leading-tight line-clamp-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ post.title }}
              </h3>
              
              <!-- Excerpt -->
              <p class="mb-4 leading-relaxed line-clamp-3" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ post.excerpt }}
              </p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-1 rounded-full text-xs font-medium border"
                  :class="isDarkMode ? 'bg-slate-700/50 text-slate-300 border-slate-600' : 'bg-slate-50 text-slate-700 border-slate-200'"
                >
                  {{ tag }}
                </span>
                <span v-if="post.tags.length > 3" class="px-2 py-1 rounded-full text-xs font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  +{{ post.tags.length - 3 }} more
                </span>
              </div>
              
              <!-- Enhanced Read More -->
              <div class="flex items-center justify-between pt-4 border-t" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
                <span class="text-yellow-500 font-semibold group-hover:text-yellow-600 transition-colors flex items-center gap-2">
                  Read Article
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                
                <!-- Social Preview -->
                <div class="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg class="w-4 h-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg class="w-4 h-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
