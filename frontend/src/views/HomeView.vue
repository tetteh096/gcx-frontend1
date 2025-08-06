<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()
const featuredPosts = ref([])

onMounted(async () => {
  await blogStore.fetchPosts()
  featuredPosts.value = blogStore.posts.slice(0, 3)
})
</script>

<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-5xl font-bold mb-6">
          Welcome to GCX
        </h1>
        <p class="text-xl mb-8 text-blue-100">
          Building modern web experiences with cutting-edge technology
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/blog"
            class="btn-primary text-lg px-8 py-3"
          >
            Read Our Blog
          </router-link>
          <router-link
            to="/about"
            class="btn-secondary text-lg px-8 py-3"
          >
            Learn More
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What We Do</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Web Development</h3>
            <p class="text-gray-600">
              Modern, responsive websites built with the latest technologies
            </p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Mobile Apps</h3>
            <p class="text-gray-600">
              Cross-platform mobile applications for iOS and Android
            </p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Data Analytics</h3>
            <p class="text-gray-600">
              Insights and analytics to drive your business forward
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Blog Posts -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
        <div v-if="blogStore.loading" class="text-center">
          <p class="text-gray-600">Loading posts...</p>
        </div>
        <div v-else-if="featuredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="post in featuredPosts"
            :key="post.id"
            class="card hover:shadow-lg transition-shadow duration-200"
          >
            <img
              v-if="post.featured_image"
              :src="post.featured_image"
              :alt="post.title"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ post.author }}</span>
                <router-link
                  :to="`/blog/${post.slug}`"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More →
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          <p class="text-gray-600">No posts available</p>
        </div>
        <div class="text-center mt-8">
          <router-link
            to="/blog"
            class="btn-primary"
          >
            View All Posts
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template> 