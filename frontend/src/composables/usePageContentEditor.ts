import { ref, reactive } from 'vue'
import { apiFetch } from '@/utils/api'
import axios from '../plugins/axios'

export function usePageContentEditor(pageId: string) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pageContent = reactive<Record<string, any>>({})

  // Load page content from CMS (try both settings and pages API)
  const loadPageContent = async () => {
    loading.value = true
    error.value = null

    try {
      // First try to get from pages API using slug
      try {
        console.log(`🔍 Attempting to load page content for: ${pageId}`)
        const response = await axios.get(`/api/pages/${pageId}`)
        console.log(`📄 Page API response:`, response.data)
        
        if (response.data.page && response.data.page.content) {
          const content = JSON.parse(response.data.page.content)
          Object.assign(pageContent, content)
          console.log(`✅ Loaded CMS content for ${pageId} page from pages API:`, content)
          return
        } else {
          console.log(`⚠️ Page found but no content field:`, response.data.page)
        }
      } catch (pagesError) {
        console.log(`❌ No page found for ${pageId} in pages API:`, pagesError.response?.data || pagesError.message)
      }

      // Fallback to settings API
      try {
        console.log(`🔍 Attempting to load settings content for: ${pageId}_content`)
        const response = await axios.get(`/api/settings/${pageId}_content`)
        console.log(`⚙️ Settings API response:`, response.data)
        
        if (response.data.setting && response.data.setting.value) {
          const content = JSON.parse(response.data.setting.value)
          Object.assign(pageContent, content)
          console.log(`✅ Loaded CMS content for ${pageId} page from settings:`, content)
        } else {
          console.log(`⚠️ Setting found but no value field:`, response.data.setting)
        }
      } catch (settingsError) {
        console.log(`❌ No settings found for ${pageId}_content:`, settingsError.response?.data || settingsError.message)
      }
    } catch (err: any) {
      console.log(`No CMS content found for ${pageId} page, using static fallbacks`)
      // Don't set error for missing content - just use static fallbacks
    } finally {
      loading.value = false
    }
  }

  // Save page content to CMS
  const savePageContent = async (content: Record<string, any>) => {
    loading.value = true
    error.value = null

    try {
      console.log(`💾 Attempting to save content for: ${pageId}`, content)
      
      // Try to save to pages API first
      try {
        const response = await axios.get(`/api/pages/${pageId}`)
        console.log(`📄 Found existing page:`, response.data.page)
        
        if (response.data.page) {
          // Update existing page
          const pageData = {
            ...response.data.page,
            content: JSON.stringify(content)
          }
          console.log(`🔄 Updating page with data:`, pageData)
          await axios.put(`/api/pages/id/${response.data.page.id}`, pageData)
          console.log(`✅ Updated CMS content for ${pageId} page`)
          return
        }
      } catch (pagesError) {
        console.log(`❌ No existing page found for ${pageId}, creating new page...`, pagesError.response?.data || pagesError.message)
        
        // Create new page
        const pageData = {
          title: pageId.charAt(0).toUpperCase() + pageId.slice(1),
          slug: pageId,
          content: JSON.stringify(content),
          excerpt: `Content for ${pageId} page`,
          template: 'default',
          status: 'published',
          meta_title: `${pageId.charAt(0).toUpperCase() + pageId.slice(1)} - GCX`,
          meta_description: `Content for ${pageId} page`,
          meta_keywords: pageId,
          sort_order: 0
        }
        
        console.log(`🆕 Creating new page with data:`, pageData)
        await axios.post('/api/pages', pageData)
        console.log(`✅ Created new CMS page for ${pageId}`)
        return
      }

      // Fallback to settings API
      const settingData = {
        key: `${pageId}_content`,
        value: JSON.stringify(content),
        type: 'json',
        group: 'pages',
        label: `${pageId.charAt(0).toUpperCase() + pageId.slice(1)} Page Content`,
        description: `Content for ${pageId} page`,
        is_public: true,
        sort_order: 0
      }

      console.log(`⚙️ Saving to settings with data:`, settingData)
      
      try {
        await axios.put(`/api/settings/${pageId}_content`, settingData)
        console.log(`✅ Updated existing setting for ${pageId}_content`)
      } catch (err: any) {
        if (err.response?.status === 404) {
          console.log(`🆕 Setting not found, creating new one...`)
          await axios.post('/api/settings', settingData)
          console.log(`✅ Created new setting for ${pageId}_content`)
        } else {
          console.error(`❌ Settings API error:`, err.response?.data || err.message)
          throw err
        }
      }
      
      console.log(`✅ Saved CMS content for ${pageId} page to settings`)
    } catch (err: any) {
      console.error(`❌ Failed to save CMS content for ${pageId} page:`, err)
      error.value = err.response?.data?.error || err.message || 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get content with fallback
  const getContent = (key: string, fallback: string = '') => {
    return pageContent[key] || fallback
  }

  // Get image with fallback
  const getImage = (key: string, fallback: string = '') => {
    return pageContent[key] || fallback
  }

  // Update content locally
  const updateContent = (key: string, value: any) => {
    pageContent[key] = value
  }

  // Get all content
  const getAllContent = () => {
    return { ...pageContent }
  }

  return {
    loading,
    error,
    pageContent,
    loadPageContent,
    savePageContent,
    getContent,
    getImage,
    updateContent,
    getAllContent
  }
}
