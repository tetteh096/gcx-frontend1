<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const searchQuery = ref('')
const selectedTag = ref('')

onMounted(async () => {
  await blogStore.fetchPosts()
})

const filteredPosts = computed(() => {
  let posts = blogStore.posts

  if (searchQuery.value) {
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedTag.value) {
    posts = posts.filter(post => post.tags.includes(selectedTag.value))
  }

  return posts
})

const allTags = computed(() => {
  const tags = new Set<string>()
  blogStore.posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Our Blog</h1>
      <p class="text-xl text-gray-600">
        Insights, tutorials, and updates from our team
      </p>
    </div>

    <!-- Search and Filters -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="flex-1 max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedTag"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Tags</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="blogStore.loading" class="text-center py-12">
      <p class="text-gray-600">Loading posts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="text-center py-12">
      <p class="text-red-600">{{ blogStore.error }}</p>
    </div>

    <!-- Posts Grid -->
    <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in filteredPosts"
        :key="post.id"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <img
          v-if="post.featured_image"
          :src="post.featured_image"
          :alt="post.title"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div v-else class="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm text-gray-500">{{ post.author }}</span>
          <span class="text-gray-300">•</span>
          <span class="text-sm text-gray-500">{{ new Date(post.published_at).toLocaleDateString() }}</span>
        </div>
        
        <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        
        <router-link
          :to="`/blog/${post.slug}`"
          class="text-primary-600 hover:text-primary-700 font-medium"
        >
          Read More →
        </router-link>
      </article>
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600">
        {{ searchQuery || selectedTag ? 'No posts found matching your criteria.' : 'No posts available yet.' }}
      </p>
    </div>
  </div>
</template> 