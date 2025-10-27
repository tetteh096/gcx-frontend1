<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { isDarkMode } from '../../utils/darkMode'
import { useBlog } from '../../composables/useBlog'
import { useMedia } from '../../composables/useMedia'
import { slugify, formatDate } from '../../utils/cms'
import { getImageUrl } from '../../utils/imageUrl'
import type { BlogPost, CreatePostRequest } from '../../types/cms'
// import QuillEditor from './QuillEditor.vue' // Temporarily disabled

interface Props {
  post?: BlogPost | null
  isEditing?: boolean
}

interface Emits {
  (e: 'save', post: BlogPost): void
  (e: 'cancel'): void
  (e: 'delete', postId: number): void
}

const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {
  post: null,
  isEditing: false
})

const emit = defineEmits<Emits>()

const { createPost, updatePost, deletePost, isLoading, error } = useBlog()
const { uploadFile, files, fetchFiles } = useMedia()

// Form data
const formData = reactive({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featured_image: '',
  tags: [] as string[],
  status: 'draft' as 'draft' | 'published' | 'private',
  // SEO metadata
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  og_title: '',
  og_description: '',
  og_image: '',
  canonical_url: '',
  publish_date: '',
  author_notes: ''
})

// UI state
const activeTab = ref('content')
const tagInput = ref('')
const showImageLibrary = ref(false)
const showPreview = ref(false)
const isUploading = ref(false)
const autoSlug = ref(true)
const wordCount = computed(() => {
  const text = formData.content.replace(/<[^>]*>/g, '')
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
})

// Quill editor reference
const quillEditor = ref()

// Handle image selection from gallery
const handleImageSelected = (image: { url: string }) => {
  formData.featured_image = image.url
  showImageLibrary.value = false
}

// Image upload from computer
const imageInput = ref<HTMLInputElement>()
const uploadImageFromComputer = () => {
  imageInput.value?.click()
}

const handleEditorImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  // Check file size (5MB max - we'll compress if needed)
  if (file.size > 5 * 1024 * 1024) {
    alert('⚠️ Image size should be less than 5MB. Please choose a smaller image.')
    return
  }

  try {
    isUploading.value = true
    
    // Always try server upload first (this should work now)
    try {
      const result = await uploadFile(file)
      if (result.success && result.data) {
        // Use the server URL - this is the preferred method
        insertImageWithControls(result.data.url, 500)
        console.log('✅ Image uploaded to server:', result.data.url)
      } else {
        throw new Error('Server upload failed')
      }
    } catch (uploadError) {
      console.warn('⚠️ Server upload failed, attempting smart compression...', uploadError)
      
      // Fallback: Smart compression for base64 (only as last resort)
      const compressedFile = await smartCompress(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        if (base64) {
          // Check base64 size before inserting
          const sizeInMB = (base64.length * 3) / (4 * 1024 * 1024)
          if (sizeInMB > 0.5) { // 500KB limit for base64
            alert('⚠️ Image is still too large after compression. Please use a smaller image or try uploading to server.')
            return
          }
          insertImageWithControls(base64, 500)
          console.log('📁 Using compressed base64 fallback (size:', sizeInMB.toFixed(2), 'MB)')
        }
      }
      reader.readAsDataURL(compressedFile)
    }
  } catch (error) {
    console.error('Image upload error:', error)
    alert('Failed to upload image. Please try again.')
  } finally {
    isUploading.value = false
    // Clear the input
    if (target) target.value = ''
  }
}

// Smart compression function that maintains quality while reducing size
const smartCompress = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    
    img.onload = () => {
      let { width, height } = img
      
      // Smart sizing based on image dimensions
      let maxWidth = 1200 // Higher quality baseline
      let quality = 0.85 // Start with high quality
      
      // Adjust based on original size
      if (width > 2000 || height > 2000) {
        maxWidth = 1000
        quality = 0.8
      } else if (width > 1500 || height > 1500) {
        maxWidth = 800
        quality = 0.8
      } else if (width <= 800 && height <= 600) {
        maxWidth = width // Don't upscale small images
        quality = 0.9 // Higher quality for small images
      }
      
      // Calculate new dimensions maintaining aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      // Use high-quality rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      
      // Draw image
      ctx.drawImage(img, 0, 0, width, height)
      
      // Try different quality levels until size is acceptable
      const tryCompress = (currentQuality: number) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            
            // If still too large and quality can be reduced, try again
            if (blob.size > 800 * 1024 && currentQuality > 0.3) { // 800KB threshold
              tryCompress(currentQuality - 0.1)
            } else {
              resolve(compressedFile)
            }
          } else {
            resolve(file)
          }
        }, file.type, currentQuality)
      }
      
      tryCompress(quality)
    }
    
    img.src = URL.createObjectURL(file)
  })
}



// Get content from Quill editor
const getEditorContent = () => {
  return quillEditor.value?.getContent() || ''
}

// Set content in Quill editor
const setEditorContent = (content: string) => {
  quillEditor.value?.setContent(content)
}

// Initialize form data


onMounted(async () => {
  
  // Fetch media files for the library
  await fetchFiles()
  
  if (props.post && props.isEditing) {
    Object.assign(formData, {
      title: props.post.title,
      slug: props.post.slug,
      content: props.post.content,
      excerpt: props.post.excerpt,
      featured_image: props.post.featured_image || '',
      tags: Array.isArray(props.post.tags) ? props.post.tags : [],
      status: props.post.status,
      meta_title: (props.post as any).meta_title || '',
      meta_description: (props.post as any).meta_description || '',
      meta_keywords: (props.post as any).meta_keywords || '',
      og_title: (props.post as any).og_title || '',
      og_description: (props.post as any).og_description || '',
      og_image: (props.post as any).og_image || '',
      canonical_url: (props.post as any).canonical_url || '',
      publish_date: props.post.published_at ? new Date(props.post.published_at).toISOString().slice(0, 16) : '',
      author_notes: (props.post as any).author_notes || ''
    })
    
    // Set content in Quill editor
    setEditorContent(props.post.content)
    
    autoSlug.value = false
  }
})

// Auto-generate slug from title
const onTitleChange = () => {
  if (autoSlug.value && formData.title) {
    formData.slug = slugify(formData.title)
  }
  
  // Auto-generate meta title if empty
  if (!formData.meta_title) {
    formData.meta_title = formData.title
  }
}

// Add tag
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    tagInput.value = ''
  }
}

// Remove tag
const removeTag = (index: number) => {
  formData.tags.splice(index, 1)
}

// Handle featured image upload
const handleFeaturedImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    isUploading.value = true
    const result = await uploadFile(file)
    if (result.success && result.data) {
      formData.featured_image = result.data.url
    }
  } catch (err) {
    console.error('Failed to upload image:', err)
  } finally {
    isUploading.value = false
  }
}

// Select image from library
const selectImage = (imageUrl: string) => {
  formData.featured_image = imageUrl
  showImageLibrary.value = false
}

// Handle multiple image uploads for library
const handleLibraryImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  try {
    isUploading.value = true
    
    // Upload files one by one
    for (const file of Array.from(files)) {
      // Check file size and type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        continue
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`)
        continue
      }
      
      await uploadFile(file)
    }
    
    // Refresh the files list
    await fetchFiles()
    
  } catch (error) {
    console.error('Failed to upload images:', error)
    alert('Failed to upload some images. Please try again.')
  } finally {
    isUploading.value = false
    // Clear the input
    if (target) target.value = ''
  }
}

// Handle image loading errors
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('Failed to load image:', img.src)
  // You could add a placeholder image here
  // img.src = '/path/to/placeholder.png'
}

// Save post
const savePost = async () => {
  try {
    // Get content from Quill editor
    formData.content = getEditorContent()
    
    // Auto-generate excerpt if empty
    if (!formData.excerpt && formData.content) {
      const textContent = formData.content.replace(/<[^>]*>/g, ' ').trim()
      formData.excerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '')
    }

    const postData: CreatePostRequest = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      featured_image: formData.featured_image || undefined,
      tags: formData.tags,
      status: formData.status
    }

    let result
    if (props.isEditing && props.post) {
      result = await updatePost(props.post.id, { ...postData, id: props.post.id })
    } else {
      result = await createPost(postData)
    }

    if (result.success && result.data) {
      emit('save', result.data)
    }
  } catch (err) {
    console.error('Failed to save post:', err)
  }
}

// Delete post
const handleDelete = async () => {
  if (!props.post || !confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
    return
  }

  try {
    const result = await deletePost(props.post.id)
    if (result.success) {
      emit('delete', props.post.id)
    }
  } catch (err) {
    console.error('Failed to delete post:', err)
  }
}

// Preview post
const previewPost = () => {
  // Auto-generate excerpt if empty for preview
  if (!formData.excerpt && formData.content) {
    const textContent = formData.content.replace(/<[^>]*>/g, ' ').trim()
    formData.excerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '')
  }
  showPreview.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-50" :class="{ 'dark bg-slate-900': isDarkMode }">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200 shadow-lg" :class="{ 'dark:bg-slate-800 dark:border-slate-700': isDarkMode }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-8">
          <div>
            <h1 class="text-4xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              {{ isEditing ? 'Edit Post' : 'Create New Post' }}
            </h1>
            <p class="mt-3 text-lg" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
              {{ isEditing ? 'Update your blog post' : 'Create a new blog post for your website' }}
            </p>
          </div>
          
          <div class="flex space-x-4">
            <button
              @click="emit('cancel')"
              class="px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              :class="isDarkMode 
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 shadow-md'"
            >
              Cancel
            </button>
            
            <button
              @click="previewPost"
              class="px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              :class="isDarkMode 
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 shadow-md'"
            >
              Preview
            </button>
            
            <button
              v-if="isEditing"
              @click="handleDelete"
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Delete
            </button>
            
            <button
              @click="savePost"
              :disabled="isLoading || !formData.title || !formData.content"
              class="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
              {{ isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Save Post' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">

    <!-- Error Message -->
    <div v-if="error" class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6">
      <nav class="flex space-x-2 p-2 rounded-2xl shadow-md" :class="isDarkMode ? 'bg-slate-800' : 'bg-gray-100'">
        <button
          @click="activeTab = 'content'"
          class="py-4 px-8 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
          :class="activeTab === 'content'
            ? (isDarkMode ? 'bg-slate-700 text-green-400 shadow-lg' : 'bg-white text-green-600 shadow-lg')
            : (isDarkMode ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200')"
        >
          Content
        </button>
        <button
          @click="activeTab = 'seo'"
          class="py-4 px-8 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
          :class="activeTab === 'seo'
            ? (isDarkMode ? 'bg-slate-700 text-green-400 shadow-lg' : 'bg-white text-green-600 shadow-lg')
            : (isDarkMode ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200')"
        >
          SEO & Meta
        </button>
        <button
          @click="activeTab = 'settings'"
          class="py-4 px-8 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
          :class="activeTab === 'settings'
            ? (isDarkMode ? 'bg-slate-700 text-green-400 shadow-lg' : 'bg-white text-green-600 shadow-lg')
            : (isDarkMode ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200')"
        >
          Settings
        </button>
      </nav>
    </div>

    <!-- Content Tab -->
    <div v-if="activeTab === 'content'" class="rounded-2xl shadow-xl p-8 space-y-8 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'">
      <!-- Title & Slug Section -->
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Post Details
          </h3>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label class="block text-base font-semibold mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              Post Title *
            </label>
            <input
              v-model="formData.title"
              @input="onTitleChange"
              type="text"
              required
              class="w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm"
              :class="isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 hover:border-slate-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md'"
              placeholder="Enter post title"
            />
          </div>
          
          <div>
            <label class="block text-base font-semibold mb-3" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              URL Slug
              <button
                @click="autoSlug = !autoSlug"
                class="ml-3 text-sm px-3 py-1 rounded-lg transition-colors shadow-sm"
                :class="autoSlug 
                  ? (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800 border border-green-200') 
                  : (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600 border border-gray-200')"
              >
                {{ autoSlug ? 'Auto' : 'Manual' }}
              </button>
            </label>
            <input
              v-model="formData.slug"
              type="text"
              :disabled="autoSlug"
              class="w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm"
              :class="[
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 hover:border-slate-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400 hover:shadow-md',
                autoSlug ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              placeholder="post-url-slug"
            />
            <p class="mt-3 text-base font-medium" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
              URL: <span class="text-green-600 font-semibold">/blog/{{ formData.slug || 'post-slug' }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Featured Image Section -->
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold mb-4" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
            Featured Image
          </h3>
        </div>
        
        <div v-if="formData.featured_image" class="mb-4">
          <div class="relative w-48 h-32 rounded-lg overflow-hidden border" :class="isDarkMode ? 'border-slate-600' : 'border-slate-200'">
            <img :src="formData.featured_image" alt="Featured image" class="w-full h-full object-cover" />
            <button
              @click="formData.featured_image = ''"
              class="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <label class="flex items-center px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                 :class="isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-50'">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {{ isUploading ? 'Uploading...' : 'Upload Image' }}
            <input
              type="file"
              accept="image/*"
              @change="handleFeaturedImageUpload"
              class="hidden"
              :disabled="isUploading"
            />
          </label>
          
          <button
            @click="showImageLibrary = true"
            class="px-4 py-2 border rounded-lg transition-colors"
            :class="isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-50'"
          >
            Choose from Library
          </button>
        </div>
      </div>

      <!-- Content Editor -->
      <div>
        <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Content *
          <span class="ml-2 text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            {{ wordCount }} words
          </span>
        </label>
        
        <div class="border-2 rounded-xl overflow-hidden shadow-lg" :class="isDarkMode ? 'border-slate-600' : 'border-gray-300'">
          <!-- Custom Toolbar -->
          <div class="flex flex-wrap items-center gap-1 p-3 border-b" :class="isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'">
            <!-- Text Formatting -->
            <div class="flex items-center gap-1 mr-4">
              <button
                type="button"
                @click="toggleBold"
                :class="editor?.isActive('bold') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Bold"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a3 3 0 110 6H9v2h2a3 3 0 110 6H6V3h5zM9 5v4h2a1 1 0 100-2H9V5zm0 6v4h2a1 1 0 100-2H9v-2z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="toggleItalic"
                :class="editor?.isActive('italic') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Italic"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3h6v2h-2l-2 10h2v2H6v-2h2l2-10H8V3z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="toggleUnderline"
                :class="editor?.isActive('underline') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Underline"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a5 5 0 015 5v4a5 5 0 01-10 0V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3zM3 18h14v2H3v-2z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="toggleStrike"
                :class="editor?.isActive('strike') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Strikethrough"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.5 10h5a.5.5 0 000-1h-5a.5.5 0 000 1zM3 9h14v2H3V9zM7 6a2 2 0 012-2h2a2 2 0 110 4H9a2 2 0 01-2-2zm2 0a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zM7 14a2 2 0 012-2h2a2 2 0 110 4H9a2 2 0 01-2-2zm2 0a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                </svg>
              </button>
            </div>

            <!-- Headings -->
            <div class="flex items-center gap-1 mr-4">
              <button
                type="button"
                @click="setParagraph"
                :class="editor?.isActive('paragraph') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="px-3 py-2 rounded transition-colors text-sm font-medium"
                title="Paragraph"
              >
                P
              </button>
              
              <button
                type="button"
                @click="setHeading(1)"
                :class="editor?.isActive('heading', { level: 1 }) ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="px-3 py-2 rounded transition-colors text-sm font-bold"
                title="Heading 1"
              >
                H1
              </button>
              
              <button
                type="button"
                @click="setHeading(2)"
                :class="editor?.isActive('heading', { level: 2 }) ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="px-3 py-2 rounded transition-colors text-sm font-bold"
                title="Heading 2"
              >
                H2
              </button>
              
              <button
                type="button"
                @click="setHeading(3)"
                :class="editor?.isActive('heading', { level: 3 }) ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="px-3 py-2 rounded transition-colors text-sm font-bold"
                title="Heading 3"
              >
                H3
              </button>
            </div>

            <!-- Lists -->
            <div class="flex items-center gap-1 mr-4">
              <button
                type="button"
                @click="toggleBulletList"
                :class="editor?.isActive('bulletList') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Bullet List"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 6a2 2 0 110-4 2 2 0 010 4zM4 12a2 2 0 110-4 2 2 0 010 4zM4 18a2 2 0 110-4 2 2 0 010 4zM8 5h10v2H8V5zM8 11h10v2H8v-2zM8 17h10v2H8v-2z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="toggleOrderedList"
                :class="editor?.isActive('orderedList') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Numbered List"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4h1v1H3V4zM3 8h1v1H3V8zM3 12h1v1H3v-1zM6 4h12v2H6V4zM6 10h12v2H6v-2zM6 16h12v2H6v-2z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="toggleBlockquote"
                :class="editor?.isActive('blockquote') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Quote"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 13V7h3l-2-3H6l2 3h1v6h1zM14 13V7h3l-2-3h-3l2 3h1v6h1z"/>
                </svg>
              </button>
            </div>

            <!-- Links and Images -->
            <div class="flex items-center gap-1 mr-4">
              <button
                type="button"
                @click="addLink"
                :class="editor?.isActive('link') ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Add Link"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z"/>
                  <path d="M7.414 15.414a2 2 0 01-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="uploadImageFromComputer"
                class="p-2 rounded transition-colors relative"
                :class="isUploading ? 'text-green-500' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                :title="isUploading ? 'Uploading...' : 'Upload Image from Computer (Auto-compressed)'"
                :disabled="isUploading"
              >
                <svg v-if="!isUploading" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"/>
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="addImage"
                class="p-2 rounded transition-colors"
                :class="isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'"
                title="Add Image by URL"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
              
              <!-- Image Size Buttons -->
              <div class="border-l pl-2 ml-2 flex gap-1" :class="isDarkMode ? 'border-slate-600' : 'border-slate-300'">
                <button
                  type="button"
                  @click="addImageSize('small')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-green-400 hover:bg-slate-700' : 'text-green-600 hover:bg-green-50'"
                  title="Add Small Image (300px)"
                >
                  S
                </button>
                <button
                  type="button"
                  @click="addImageSize('medium')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-green-400 hover:bg-slate-700' : 'text-green-600 hover:bg-green-50'"
                  title="Add Medium Image (500px)"
                >
                  M
                </button>
                <button
                  type="button"
                  @click="addImageSize('large')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-green-400 hover:bg-slate-700' : 'text-green-600 hover:bg-green-50'"
                  title="Add Large Image (700px)"
                >
                  L
                </button>
                <button
                  type="button"
                  @click="addImageSize('xl')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-green-400 hover:bg-slate-700' : 'text-green-600 hover:bg-green-50'"
                  title="Add Extra Large Image (900px)"
                >
                  XL
                </button>
                <button
                  type="button"
                  @click="addImageSize('full')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-green-400 hover:bg-slate-700' : 'text-green-600 hover:bg-green-50'"
                  title="Add Full Width Image"
                >
                  100%
                </button>
              </div>
              
              <!-- Image Alignment -->
              <div class="border-l pl-2 ml-2 flex gap-1" :class="isDarkMode ? 'border-slate-600' : 'border-slate-300'">
                <button
                  type="button"
                  @click="addQuickImage('medium', 'left')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-blue-400 hover:bg-slate-700' : 'text-blue-600 hover:bg-blue-50'"
                  title="Add Left-Aligned Image"
                >
                  ← Left
                </button>
                <button
                  type="button"
                  @click="addQuickImage('medium', 'center')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-blue-400 hover:bg-slate-700' : 'text-blue-600 hover:bg-blue-50'"
                  title="Add Center-Aligned Image"
                >
                  ↕ Center
                </button>
                <button
                  type="button"
                  @click="addQuickImage('medium', 'right')"
                  class="px-2 py-1 text-xs rounded font-medium"
                  :class="isDarkMode ? 'text-blue-400 hover:bg-slate-700' : 'text-blue-600 hover:bg-blue-50'"
                  title="Add Right-Aligned Image"
                >
                  Right →
                </button>
              </div>

            </div>



            <!-- Alignment -->
            <div class="flex items-center gap-1">
              <button
                type="button"
                @click="setTextAlign('left')"
                :class="editor?.isActive({ textAlign: 'left' }) ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Align Left"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4h14v2H3V4zM3 8h8v2H3V8zM3 12h14v2H3v-2zM3 16h8v2H3v-2z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="setTextAlign('center')"
                :class="editor?.isActive({ textAlign: 'center' }) ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Align Center"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4h14v2H3V4zM6 8h8v2H6V8zM3 12h14v2H3v-2zM6 16h8v2H6v-2z"/>
                </svg>
              </button>
              
              <button
                type="button"
                @click="setTextAlign('right')"
                :class="editor?.isActive({ textAlign: 'right' }) ? 'bg-green-500 text-white' : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200')"
                class="p-2 rounded transition-colors"
                title="Align Right"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4h14v2H3V4zM9 8h8v2H9V8zM3 12h14v2H3v-2zM9 16h8v2H9v-2z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Quill Editor -->
          <textarea
            v-model="formData.content"
            rows="15"
            class="w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
            placeholder="Write your blog post content here..."
          ></textarea>
        </div>
      </div>

      <!-- Excerpt -->
      <div>
        <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Excerpt
          <span class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            (Auto-generated if empty)
          </span>
        </label>
        <textarea
          v-model="formData.excerpt"
          rows="3"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          :class="isDarkMode 
            ? 'bg-slate-700 border-slate-600 text-white' 
            : 'bg-white border-slate-300 text-slate-900'"
          placeholder="Brief description of the post (max 160 characters recommended)"
        ></textarea>
        <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          {{ formData.excerpt.length }}/160 characters
        </p>
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Tags
        </label>
        
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            v-for="(tag, index) in formData.tags"
            :key="index"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
          >
            {{ tag }}
            <button
              @click="removeTag(index)"
              class="ml-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              ×
            </button>
          </span>
        </div>
        
        <div class="flex">
          <input
            v-model="tagInput"
            type="text"
            class="flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'"
            placeholder="Add a tag"
            @keypress.enter.prevent="addTag"
          />
          <button
            @click="addTag"
            class="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- SEO Tab -->
    <div v-if="activeTab === 'seo'" class="rounded-2xl shadow-xl p-8 space-y-8 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Meta Title -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            Meta Title
          </label>
          <input
            v-model="formData.meta_title"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'"
            placeholder="SEO title for search engines"
          />
          <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            {{ formData.meta_title.length }}/60 characters
          </p>
        </div>

        <!-- Meta Keywords -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            Meta Keywords
          </label>
          <input
            v-model="formData.meta_keywords"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'"
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>
      </div>

      <!-- Meta Description -->
      <div>
        <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Meta Description
        </label>
        <textarea
          v-model="formData.meta_description"
          rows="3"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          :class="isDarkMode 
            ? 'bg-slate-700 border-slate-600 text-white' 
            : 'bg-white border-slate-300 text-slate-900'"
          placeholder="Meta description for search engines"
        ></textarea>
        <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
          {{ formData.meta_description.length }}/160 characters
        </p>
      </div>

      <!-- Open Graph -->
      <div class="border-t pt-6" :class="isDarkMode ? 'border-slate-700' : 'border-slate-200'">
        <h3 class="text-lg font-medium mb-4" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
          Open Graph (Social Media)
        </h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              OG Title
            </label>
            <input
              v-model="formData.og_title"
              type="text"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              :class="isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white' 
                : 'bg-white border-slate-300 text-slate-900'"
              placeholder="Title for social media sharing"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
              OG Image URL
            </label>
            <input
              v-model="formData.og_image"
              type="text"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              :class="isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white' 
                : 'bg-white border-slate-300 text-slate-900'"
              placeholder="Image URL for social media"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            OG Description
          </label>
          <textarea
            v-model="formData.og_description"
            rows="2"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'"
            placeholder="Description for social media sharing"
          ></textarea>
        </div>
      </div>

      <!-- Canonical URL -->
      <div>
        <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Canonical URL
        </label>
        <input
          v-model="formData.canonical_url"
          type="url"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          :class="isDarkMode 
            ? 'bg-slate-700 border-slate-600 text-white' 
            : 'bg-white border-slate-300 text-slate-900'"
          placeholder="https://gcx.com.gh/blog/your-post-slug"
        />
      </div>
    </div>

    <!-- Settings Tab -->
    <div v-if="activeTab === 'settings'" class="rounded-2xl shadow-xl p-8 space-y-8 border" :class="isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Publication Status -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            Publication Status
          </label>
          <select
            v-model="formData.status"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="private">Private</option>
          </select>
          <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            Draft: Only visible to authors • Published: Live on website • Private: Only visible to you
          </p>
        </div>

        <!-- Publish Date -->
        <div>
          <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
            Publish Date
          </label>
          <input
            v-model="formData.publish_date"
            type="datetime-local"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :class="isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-900'"
          />
          <p class="text-xs mt-1" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            Leave empty for immediate publishing
          </p>
        </div>
      </div>

      <!-- Author Notes -->
      <div>
        <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'">
          Author Notes
          <span class="text-xs" :class="isDarkMode ? 'text-slate-400' : 'text-slate-500'">
            (Internal notes, not visible to readers)
          </span>
        </label>
        <textarea
          v-model="formData.author_notes"
          rows="3"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          :class="isDarkMode 
            ? 'bg-slate-700 border-slate-600 text-white' 
            : 'bg-white border-slate-300 text-slate-900'"
          placeholder="Internal notes about this post..."
        ></textarea>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div class="rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border transform hover:scale-[1.01] transition-all duration-300" 
           :class="isDarkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-gray-200'">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              Preview Post
            </h3>
            <button
              @click="showPreview = false"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Preview Content -->
          <div class="space-y-6">
            <!-- Featured Image -->
            <div v-if="formData.featured_image" class="w-full h-64 rounded-lg overflow-hidden">
              <img :src="formData.featured_image" :alt="formData.title" class="w-full h-full object-cover" />
            </div>
            
            <!-- Title -->
            <h1 class="text-3xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
              {{ formData.title || 'Untitled Post' }}
            </h1>
            
            <!-- Meta Info -->
            <div class="flex items-center space-x-4 text-sm" :class="isDarkMode ? 'text-slate-400' : 'text-gray-600'">
              <span>{{ new Date().toLocaleDateString() }}</span>
              <span>•</span>
              <span>{{ wordCount }} words</span>
              <span>•</span>
              <span class="px-2 py-1 rounded text-xs font-medium" 
                    :class="formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ formData.status.charAt(0).toUpperCase() + formData.status.slice(1) }}
              </span>
            </div>
            
            <!-- Excerpt -->
            <div v-if="formData.excerpt" class="text-lg italic" :class="isDarkMode ? 'text-slate-300' : 'text-gray-700'">
              {{ formData.excerpt }}
            </div>
            
            <!-- Content -->
            <div class="prose max-w-none" :class="isDarkMode ? 'prose-invert' : ''" v-html="formData.content"></div>
            
            <!-- Tags -->
            <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="tag in formData.tags"
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Library Modal -->
    <div v-if="showImageLibrary" class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div class="rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border transform hover:scale-[1.01] transition-all duration-300" 
           :class="isDarkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-slate-900'">
              Image Library
            </h3>
            <button
              @click="showImageLibrary = false"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Use the existing ImageGallery component -->
          <ImageGallery
            title="Select Featured Image"
            :current-image="formData.featured_image"
            @image-selected="handleImageSelected"
            @close="showImageLibrary = false"
          />
              </div>
      </div>
    </div>

    <!-- Hidden file input for editor image upload -->
    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      @change="handleEditorImageUpload"
      class="hidden"
    />
    </div>
  </div>
</template>

<style scoped>
/* Tiptap editor styling */
:deep(.ProseMirror) {
  outline: none;
  padding: 1rem;
  min-height: 350px;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

:deep(.ProseMirror h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

:deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

:deep(.ProseMirror h3) {
  font-size: 1.2em;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

:deep(.ProseMirror ul, .ProseMirror ol) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

:deep(.ProseMirror li) {
  margin: 0.25rem 0;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

:deep(.ProseMirror pre) {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  padding: 1rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  margin: 1rem 0;
  overflow-x: auto;
  border-left: 4px solid #10b981;
}

:deep(.ProseMirror code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.875em;
}

/* Code highlighting */
:deep(.ProseMirror pre code.language-html) {
  color: #e11d48;
}

:deep(.ProseMirror pre code.language-css) {
  color: #0ea5e9;
}

:deep(.ProseMirror pre code.language-javascript) {
  color: #f59e0b;
}

:deep(.ProseMirror a) {
  color: #059669;
  text-decoration: underline;
}

/* Modern image handling with text wrapping */
:deep(.ProseMirror img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 16px 0;
  display: block;
  transition: transform 0.2s ease-in-out;
}

:deep(.ProseMirror img:hover) {
  transform: scale(1.02);
}

/* Image alignment classes */
:deep(.ProseMirror img[style*="float: left"]) {
  float: left;
  margin: 0 16px 16px 0;
  max-width: 50%;
}

:deep(.ProseMirror img[style*="float: right"]) {
  float: right;
  margin: 0 0 16px 16px;
  max-width: 50%;
}

:deep(.ProseMirror img[style*="text-align: center"]) {
  display: block;
  margin: 16px auto;
}

/* Text wrapping around images */
:deep(.ProseMirror p) {
  text-align: justify;
  line-height: 1.7;
  margin-bottom: 16px;
}

/* Image container for better control */
:deep(.ProseMirror .image-container) {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

:deep(.ProseMirror .image-container img) {
  margin: 0;
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive image handling */
:deep(.ProseMirror img[width]) {
  width: auto !important;
  max-width: 100%;
}

/* Image resize handles */
:deep(.ProseMirror img[data-resize-handles]) {
  cursor: grab;
}

:deep(.ProseMirror img[data-resize-handles]:active) {
  cursor: grabbing;
}

/* Dark mode styles */
.dark :deep(.ProseMirror) {
  color: #f1f5f9;
}

.dark :deep(.ProseMirror blockquote) {
  border-left-color: #475569;
}

.dark :deep(.ProseMirror pre) {
  background-color: #374151;
  color: #f1f5f9;
}

.dark :deep(.ProseMirror code) {
  background-color: #374151;
  color: #f1f5f9;
}

.dark :deep(.ProseMirror a) {
  color: #10b981;
}

/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Smooth transitions for all interactive elements */
button, input, textarea, select {
  transition: all 0.2s ease-in-out;
}

/* Better focus states */
input:focus, textarea:focus, select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
}

/* Loading state animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Image container styles */
:deep(.ProseMirror img) {
  transition: all 0.2s ease;
}

:deep(.ProseMirror img:hover) {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}
</style>
