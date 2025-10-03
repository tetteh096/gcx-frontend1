<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] transition-opacity duration-300 overflow-hidden"
      @click="close"
    >
        <!-- Sliding Panel -->
        <div
          class="fixed right-0 top-0 h-full w-full max-w-4xl shadow-2xl transform transition-transform duration-300 ease-in-out"
          :class="[
            isOpen ? 'translate-x-0' : 'translate-x-full',
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
              : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50'
          ]"
          @click.stop
        >
        <!-- Header -->
        <div 
          class="flex items-center justify-between p-6 border-b transition-colors duration-200"
          :class="isDarkMode 
            ? 'border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-900/50' 
            : 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50'"
        >
          <h2 
            class="text-2xl font-bold transition-colors duration-200"
            :class="isDarkMode ? 'text-white' : 'text-slate-900'"
          >
            {{ publication?.title }}
          </h2>
          <button
            @click="close"
            class="p-2 rounded-lg transition-colors duration-200"
            :class="isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'"
          >
            <svg 
              class="w-6 h-6 transition-colors duration-200" 
              :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-hide">
          <div class="p-6">
            <!-- Publication Image -->
            <div v-if="publication?.image_path" class="mb-8">
              <div class="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  :src="publication.image_path" 
                  :alt="publication.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Publication Info -->
            <div class="space-y-6">
              <!-- Title and Category -->
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <h1 
                    class="text-3xl font-bold transition-colors duration-200"
                    :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                  >
                    {{ publication?.title }}
                  </h1>
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getCategoryBadgeClass(publication?.category)"
                  >
                    {{ publication?.category }}
                  </span>
                </div>
                
                <div class="flex items-center gap-4 text-sm"
                     :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{{ publication?.author }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span 
                      class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(publication?.status)"
                    >
                      {{ publication?.status }}
                    </span>
                  </div>
                  <div v-if="publication?.publication_date" class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatDate(publication.publication_date) }}</span>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div 
                v-if="publication?.description" 
                class="pt-6 transition-colors duration-200"
                :class="isDarkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'"
              >
                <h4 
                  class="text-lg font-semibold mb-4 transition-colors duration-200"
                  :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'"
                >
                  About This Publication
                </h4>
                <div class="prose max-w-none">
                  <p 
                    class="leading-relaxed whitespace-pre-line transition-colors duration-200"
                    :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
                  >
                    {{ publication.description }}
                  </p>
                </div>
              </div>

              <!-- Tags -->
              <div 
                v-if="publication?.tags" 
                class="pt-6 transition-colors duration-200"
                :class="isDarkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'"
              >
                <h4 
                  class="text-lg font-semibold mb-4 transition-colors duration-200"
                  :class="isDarkMode ? 'text-slate-200' : 'text-slate-800'"
                >
                  Tags
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in getTags(publication.tags)" 
                    :key="tag"
                    class="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Download Stats -->
              <div 
                class="pt-6 transition-colors duration-200"
                :class="isDarkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'"
              >
                <div class="flex items-center justify-between p-4 rounded-lg"
                     :class="isDarkMode 
                       ? 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600' 
                       : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'">
                  <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-md">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p 
                        class="font-semibold transition-colors duration-200"
                        :class="isDarkMode ? 'text-white' : 'text-slate-900'"
                      >
                        {{ publication?.download_count || 0 }} Downloads
                      </p>
                      <p 
                        class="text-sm transition-colors duration-200"
                        :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'"
                      >
                        This publication has been downloaded {{ publication?.download_count || 0 }} times
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="p-6 border-t transition-colors duration-200"
             :class="isDarkMode 
               ? 'border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-900/50' 
               : 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50'">
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              v-if="publication?.file_path"
              @click="downloadPublication"
              class="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Publication
            </button>
            <button 
              @click="close"
              class="flex-1 border-2 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              :class="isDarkMode 
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' 
                : 'border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isDarkMode } from '../../utils/darkMode'
import type { Publication } from '../../services/publicationService'

interface Props {
  isOpen: boolean
  publication: Publication | null
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const close = () => {
  emit('close')
}

const downloadPublication = () => {
  if (props.publication?.file_path) {
    const link = document.createElement('a')
    link.href = props.publication.file_path
    link.download = props.publication.file_name || `${props.publication.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Research Papers':
      return 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
    case 'Annual Reports':
      return 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg'
    case 'Policy Documents':
      return 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg'
  }
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Published':
      return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
    case 'Draft':
      return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
    case 'Archived':
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-md'
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-md'
  }
}

const getTags = (tagsString: string) => {
  if (!tagsString) return []
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
