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
}

interface Props {
  posts: BlogPost[]
}

const props = defineProps<Props>()

// Get featured post
const featuredPost = computed(() => {
  return props.posts.find(post => post.featured)
})

// Get recent posts (excluding featured)
const recentPosts = computed(() => {
  return props.posts.filter(post => !post.featured).slice(0, 3)
})
</script>

<template>
  <section class="py-24 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-white'">
    <div class="max-w-[1600px] mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
        Recent Blog Posts
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Featured Post -->
        <div v-if="featuredPost" class="lg:col-span-2">
          <div class="flex flex-col lg:flex-row gap-8">
            <img 
              :src="featuredPost.image" 
              :alt="featuredPost.title"
              class="w-full lg:w-2/3 h-80 object-cover rounded-xl shadow-2xl"
            />
            <div class="flex-1 flex flex-col justify-center">
              <div class="mb-6">
                <span class="text-sm font-semibold" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'">
                  {{ featuredPost.author }} • {{ new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </span>
              </div>
              <h3 class="text-3xl font-bold mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ featuredPost.title }}
              </h3>
              <p class="text-lg mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ featuredPost.excerpt }}
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in featuredPost.tags"
                  :key="tag"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'"
                >
                  {{ tag }}
                </span>
              </div>
                             <router-link 
                 :to="`/blog/${featuredPost.id}`"
                 class="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-medium transition-colors"
               >
                 Read More
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17" />
                 </svg>
               </router-link>
            </div>
          </div>
        </div>
        
        <!-- Recent Posts Grid -->
        <router-link 
          v-for="post in recentPosts" 
          :key="post.id"
          :to="`/blog/${post.id}`"
          class="flex flex-col lg:flex-row gap-6 group hover:bg-slate-50 dark:hover:bg-slate-700 p-4 rounded-xl transition-all duration-300"
        >
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full lg:w-80 h-48 object-cover rounded-xl shadow-lg"
          />
          <div class="flex-1 flex flex-col justify-center">
            <div class="mb-4">
              <span class="text-sm font-semibold" :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'">
                {{ post.author }} • {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </span>
            </div>
            <h4 class="text-xl font-bold mb-3" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              {{ post.title }}
            </h4>
            <p class="mb-4" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
              {{ post.excerpt }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>
