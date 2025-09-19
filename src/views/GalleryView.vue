<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { isDarkMode } from '../utils/darkMode'

const { t } = useI18n()

// Gallery folders data
const galleryFolders = ref([
  {
    id: 'events',
    title: 'Events & Conferences',
    category: 'Events',
    coverImage: '/conference.jpg',
    imageCount: 12,
    date: '2023-12-15',
    description: 'Key moments from our annual conferences, events, and stakeholder meetings.',
    images: [
      { id: 1, src: '/conference.jpg', title: 'Opening Ceremony', date: '2023-12-15' },
      { id: 2, src: '/farmer.jpg', title: 'Keynote Speaker', date: '2023-12-15' },
      { id: 3, src: '/trading.jpg', title: 'Panel Discussion', date: '2023-12-15' },
      { id: 4, src: '/maize.jpg', title: 'Networking Session', date: '2023-12-15' },
      { id: 5, src: '/crop.jpg', title: 'Award Ceremony', date: '2023-12-15' },
      { id: 6, src: '/market-analysis.jpg', title: 'Closing Remarks', date: '2023-12-15' }
    ],
    tags: ['Conference', 'Leadership', 'Networking']
  },
  {
    id: 'training',
    title: 'Training & Workshops',
    category: 'Training',
    coverImage: '/farmer.jpg',
    imageCount: 8,
    date: '2023-11-20',
    description: 'Training sessions and workshops empowering farmers and traders.',
    images: [
      { id: 7, src: '/farmer.jpg', title: 'Farmers Training', date: '2023-11-20' },
      { id: 8, src: '/trading.jpg', title: 'Trading Workshop', date: '2023-11-20' },
      { id: 9, src: '/maize.jpg', title: 'Quality Assessment', date: '2023-11-20' },
      { id: 10, src: '/crop.jpg', title: 'Field Visit', date: '2023-11-20' }
    ],
    tags: ['Training', 'Farmers', 'Education']
  },
  {
    id: 'operations',
    title: 'Trading Operations',
    category: 'Operations',
    coverImage: '/trading.jpg',
    imageCount: 15,
    date: '2023-10-15',
    description: 'Behind-the-scenes look at our trading operations and market activities.',
    images: [
      { id: 11, src: '/trading.jpg', title: 'Trading Floor', date: '2023-10-15' },
      { id: 12, src: '/conference.jpg', title: 'Market Analysis', date: '2023-10-15' },
      { id: 13, src: '/farmer.jpg', title: 'Commodity Exchange', date: '2023-10-15' },
      { id: 14, src: '/maize.jpg', title: 'Price Monitoring', date: '2023-10-15' },
      { id: 15, src: '/crop.jpg', title: 'Order Processing', date: '2023-10-15' }
    ],
    tags: ['Trading', 'Operations', 'Market']
  },
  {
    id: 'quality',
    title: 'Quality Assurance',
    category: 'Quality',
    coverImage: '/maize.jpg',
    imageCount: 10,
    date: '2023-09-10',
    description: 'Our quality assurance team ensuring the highest standards for commodity trading.',
    images: [
      { id: 16, src: '/maize.jpg', title: 'Quality Inspection', date: '2023-09-10' },
      { id: 17, src: '/crop.jpg', title: 'Grading Process', date: '2023-09-10' },
      { id: 18, src: '/trading.jpg', title: 'Sample Testing', date: '2023-09-10' },
      { id: 19, src: '/conference.jpg', title: 'Certification', date: '2023-09-10' }
    ],
    tags: ['Quality', 'Inspection', 'Standards']
  },
  {
    id: 'programs',
    title: 'Youth Programs',
    category: 'Programs',
    coverImage: '/crop.jpg',
    imageCount: 6,
    date: '2023-08-25',
    description: 'Engaging young people in agriculture and commodity trading through education and mentorship.',
    images: [
      { id: 20, src: '/crop.jpg', title: 'Youth Program', date: '2023-08-25' },
      { id: 21, src: '/farmer.jpg', title: 'Mentorship Session', date: '2023-08-25' },
      { id: 22, src: '/trading.jpg', title: 'Practical Training', date: '2023-08-25' }
    ],
    tags: ['Youth', 'Programs', 'Education']
  },
  {
    id: 'analysis',
    title: 'Market Analysis',
    category: 'Analysis',
    coverImage: '/market-analysis.jpg',
    imageCount: 9,
    date: '2023-07-30',
    description: 'Expert analysis sessions on commodity market trends and trading strategies.',
    images: [
      { id: 23, src: '/market-analysis.jpg', title: 'Market Analysis', date: '2023-07-30' },
      { id: 24, src: '/conference.jpg', title: 'Data Presentation', date: '2023-07-30' },
      { id: 25, src: '/trading.jpg', title: 'Trend Discussion', date: '2023-07-30' },
      { id: 26, src: '/maize.jpg', title: 'Strategy Planning', date: '2023-07-30' }
    ],
    tags: ['Analysis', 'Market', 'Strategy']
  },
  {
    id: 'partnerships',
    title: 'International Partnerships',
    category: 'Partnerships',
    coverImage: '/rice.jpg',
    imageCount: 7,
    date: '2023-06-15',
    description: 'Building strategic partnerships with international commodity exchanges and organizations.',
    images: [
      { id: 27, src: '/rice.jpg', title: 'Partnership Meeting', date: '2023-06-15' },
      { id: 28, src: '/conference.jpg', title: 'Agreement Signing', date: '2023-06-15' },
      { id: 29, src: '/farmer.jpg', title: 'Collaboration', date: '2023-06-15' }
    ],
    tags: ['Partnerships', 'International', 'Collaboration']
  },
  {
    id: 'forums',
    title: 'Women in Agriculture',
    category: 'Forums',
    coverImage: '/sesame.jpg',
    imageCount: 5,
    date: '2023-05-20',
    description: 'Empowering women farmers and traders in the commodity exchange ecosystem.',
    images: [
      { id: 30, src: '/sesame.jpg', title: 'Women Forum', date: '2023-05-20' },
      { id: 31, src: '/farmer.jpg', title: 'Empowerment Session', date: '2023-05-20' },
      { id: 32, src: '/crop.jpg', title: 'Success Stories', date: '2023-05-20' }
    ],
    tags: ['Women', 'Forum', 'Empowerment']
  },
  {
    id: 'technology',
    title: 'Technology & Innovation',
    category: 'Technology',
    coverImage: '/soybean.jpg',
    imageCount: 11,
    date: '2023-04-10',
    description: 'Showcasing cutting-edge technology solutions for modern agriculture.',
    images: [
      { id: 33, src: '/soybean.jpg', title: 'Tech Innovation', date: '2023-04-10' },
      { id: 34, src: '/trading.jpg', title: 'Digital Platform', date: '2023-04-10' },
      { id: 35, src: '/market-analysis.jpg', title: 'Data Analytics', date: '2023-04-10' },
      { id: 36, src: '/conference.jpg', title: 'Tech Demo', date: '2023-04-10' }
    ],
    tags: ['Technology', 'Innovation', 'Digital']
  }
])

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedFolder = ref(null)
const selectedImage = ref(null)
const isModalOpen = ref(false)
const isFolderModalOpen = ref(false)
const currentImageIndex = ref(0)

// Categories
const categories = ['All', 'Events', 'Training', 'Operations', 'Quality', 'Programs', 'Analysis', 'Partnerships', 'Forums', 'Technology']

// Filtered gallery folders
const filteredGalleryFolders = computed(() => {
  let filtered = galleryFolders.value

  if (searchQuery.value) {
    filtered = filtered.filter(folder =>
      folder.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      folder.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      folder.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (selectedCategory.value && selectedCategory.value !== 'All') {
    filtered = filtered.filter(folder => folder.category === selectedCategory.value)
  }

  return filtered
})

const openFolderModal = (folder) => {
  selectedFolder.value = folder
  isFolderModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFolderModal = () => {
  selectedFolder.value = null
  isFolderModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const openImageModal = (image) => {
  selectedImage.value = image
  currentImageIndex.value = selectedFolder.value.images.findIndex(img => img.id === image.id)
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  selectedImage.value = null
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  if (currentImageIndex.value < selectedFolder.value.images.length - 1) {
    currentImageIndex.value++
    selectedImage.value = selectedFolder.value.images[currentImageIndex.value]
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    selectedImage.value = selectedFolder.value.images[currentImageIndex.value]
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div class="absolute inset-0">
        <img src="/Picture3.png" alt="Photo Gallery Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-green-900/80 via-slate-800/70 to-emerald-900/90"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Photo Gallery
        </div>
        
        <h1 class="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Visual Stories
        </h1>
        <p class="text-xl lg:text-2xl max-w-4xl mx-auto text-white/80 mb-12 leading-relaxed">
          Explore our visual journey through events, programs, and the people who make Ghana's commodity exchange thrive
        </p>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">{{ galleryFolders.length }}+</div>
            <div class="text-white/70 text-sm">Photos Available</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">{{ categories.length - 1 }}</div>
            <div class="text-white/70 text-sm">Categories</div>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div class="text-3xl font-bold text-white mb-2">HD</div>
            <div class="text-white/70 text-sm">High Quality</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filters -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-800' : 'bg-slate-50'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-2xl mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search folders..."
              class="w-full pl-12 pr-4 py-4 text-lg border-2 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 shadow-lg"
              :class="isDarkMode ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-400' : 'border-gray-200 bg-white text-slate-900 placeholder-slate-500'"
            />
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-4 py-2 font-medium rounded-full transition-all duration-300"
            :class="(selectedCategory === category || (selectedCategory === '' && category === 'All'))
              ? 'bg-green-500 text-white shadow-lg' 
              : isDarkMode 
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'"
          >
            {{ category }}
          </button>
        </div>

        <!-- Clear Filters -->
        <div v-if="searchQuery || selectedCategory !== ''" class="text-center">
          <button
            @click="clearFilters"
            class="px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
            :class="isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-16 transition-colors duration-300" :class="isDarkMode ? 'bg-slate-900' : 'bg-white'">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Gallery Grid -->
        <div v-if="filteredGalleryFolders.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="folder in filteredGalleryFolders"
            :key="folder.id"
            @click="openFolderModal(folder)"
            class="group cursor-pointer rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border transform hover:-translate-y-2"
            :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'"
          >
            <!-- Folder Cover Image -->
            <div class="relative overflow-hidden">
              <img 
                :src="folder.coverImage"
                :alt="folder.title"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                @error="(e) => (e.target as HTMLImageElement).src = '/trading.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ folder.category }}
              </div>
              
              <!-- Image Count Badge -->
              <div class="absolute top-4 right-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ folder.imageCount }} photos
              </div>
              
              <!-- Folder Icon -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Image Info -->
            <div class="p-4">
              <h3 class="text-lg font-bold mb-2 group-hover:text-green-500 transition-colors leading-tight line-clamp-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                {{ folder.title }}
              </h3>
              
              <p class="text-sm mb-3 leading-relaxed line-clamp-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">
                {{ folder.description }}
              </p>
              
              <div class="flex items-center gap-2 text-xs mb-3" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(folder.date) }}</span>
              </div>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in folder.tags.slice(0, 2)"
                  :key="tag"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="isDarkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-slate-100 text-slate-700'"
                >
                  {{ tag }}
                </span>
                <span v-if="folder.tags.length > 2" class="px-2 py-1 rounded-full text-xs font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                  +{{ folder.tags.length - 2 }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">No photos found</h3>
          <p :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    </section>

    <!-- Folder Modal -->
    <div v-if="isFolderModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        @click="closeFolderModal"
      ></div>
      
      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          :class="isDarkMode ? 'bg-slate-800' : 'bg-white'"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeFolderModal"
            class="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
            :class="isDarkMode ? 'bg-slate-800/90 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-slate-900'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Folder Header -->
          <div class="p-8 border-b" :class="isDarkMode ? 'border-slate-700' : 'border-gray-200'">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h2 class="text-3xl font-bold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ selectedFolder?.title }}
                </h2>
                <div class="flex items-center gap-4 text-sm mb-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                  <span class="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full">
                    {{ selectedFolder?.category }}
                  </span>
                  <span>{{ selectedFolder?.imageCount }} photos</span>
                  <span>{{ formatDate(selectedFolder?.date || '') }}</span>
                </div>
              </div>
            </div>
            
            <p class="text-lg leading-relaxed" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              {{ selectedFolder?.description }}
            </p>
          </div>
          
          <!-- Images Grid -->
          <div class="p-8">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="image in selectedFolder?.images"
                :key="image.id"
                @click="openImageModal(image)"
                class="group cursor-pointer rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                :class="isDarkMode ? 'bg-slate-700' : 'bg-gray-100'"
              >
                <img
                  :src="image.src"
                  :alt="image.title"
                  class="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  @error="(e) => (e.target as HTMLImageElement).src = '/trading.jpg'"
                />
                <div class="p-3">
                  <h4 class="text-sm font-medium line-clamp-1" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                    {{ image.title }}
                  </h4>
                  <p class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
                    {{ formatDate(image.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        @click="closeImageModal"
      ></div>
      
      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          :class="isDarkMode ? 'bg-slate-800' : 'bg-white'"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeImageModal"
            class="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
            :class="isDarkMode ? 'bg-slate-800/90 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-slate-900'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Image -->
          <div class="aspect-video w-full relative">
            <img
              v-if="selectedImage"
              :src="selectedImage.image"
              :alt="selectedImage.title"
              class="w-full h-full object-cover rounded-t-2xl"
            />
            
            <!-- Navigation Buttons -->
            <div class="absolute inset-0 flex items-center justify-between p-4">
              <!-- Previous Button -->
              <button
                v-if="currentImageIndex > 0"
                @click="previousImage"
                class="p-3 rounded-full transition-all duration-300 hover:scale-110"
                :class="isDarkMode ? 'bg-slate-800/90 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-slate-900'"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div v-else class="w-12"></div>
              
              <!-- Next Button -->
              <button
                v-if="currentImageIndex < selectedFolder?.images.length - 1"
                @click="nextImage"
                class="p-3 rounded-full transition-all duration-300 hover:scale-110"
                :class="isDarkMode ? 'bg-slate-800/90 hover:bg-slate-700 text-white' : 'bg-white/90 hover:bg-white text-slate-900'"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div v-else class="w-12"></div>
            </div>
            
            <!-- Image Counter -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium"
                 :class="isDarkMode ? 'bg-slate-800/90 text-white' : 'bg-white/90 text-slate-900'">
              {{ currentImageIndex + 1 }} / {{ selectedFolder?.images.length }}
            </div>
          </div>
          
          <!-- Image Details -->
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h2 class="text-2xl font-bold mb-2" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
                  {{ selectedImage?.title }}
                </h2>
                <div class="flex items-center gap-4 text-sm mb-4" :class="isDarkMode ? 'text-slate-400' : 'text-slate-600'">
                  <span class="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full">
                    {{ selectedImage?.category }}
                  </span>
                  <span>{{ formatDate(selectedImage?.date || '') }}</span>
                </div>
              </div>
            </div>
            
            <p class="text-lg leading-relaxed mb-6" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              {{ selectedImage?.description }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedImage?.tags"
                :key="tag"
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="isDarkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-slate-100 text-slate-700'"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
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
</style>
