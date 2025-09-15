<script setup lang="ts">
import { isDarkMode } from '../../utils/darkMode'

interface Props {
  searchQuery: string
  selectedTag: string
  allTags: string[]
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedTag', value: string): void
  (e: 'clearFilters'): void
}

const props = defineProps<Props>()
const { t } = useI18n()
const emit = defineEmits<Emits>()

const updateSearchQuery = (value: string) => {
  emit('update:searchQuery', value)
}

const updateSelectedTag = (value: string) => {
  emit('update:selectedTag', value)
}

const clearFilters = () => {
  emit('clearFilters')
}
</script>

<template>
  <div class="mb-12">
    <div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
      <div class="flex-1 max-w-md">
        <input
          :value="searchQuery"
          @input="updateSearchQuery(($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search posts..."
          class="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          :class="isDarkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'"
        />
      </div>
      <div class="flex gap-3">
        <select
          :value="selectedTag"
          @change="updateSelectedTag(($event.target as HTMLSelectElement).value)"
          class="px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          :class="isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'"
        >
          <option value="">All Tags</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
        <button
          @click="clearFilters"
          class="px-4 py-3 rounded-lg transition-all duration-200"
          :class="isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>
