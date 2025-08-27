<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useRouter } from 'vue-router'
import type { NavigationItem } from '../../types/cms'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'toggle'): void
  (e: 'navigate', section: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const { user, logout } = useAuth()
const router = useRouter()

const activeSection = ref('dashboard')

// Navigation items with PrimeIcons
const navigationItems = computed<NavigationItem[]>(() => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'pi pi-th-large',
  },
  {
    id: 'content',
    label: 'Content',
    icon: 'pi pi-folder',
    children: [
      {
        id: 'posts',
        label: 'Blog Posts',
        icon: 'pi pi-file-edit',
        permissions: ['blogger', 'admin']
      },
      {
        id: 'media',
        label: 'Media Library',
        icon: 'pi pi-images',
        permissions: ['blogger', 'admin']
      },
      {
        id: 'pages',
        label: 'Website Content',
        icon: 'pi pi-globe',
        permissions: ['admin']
      }
    ]
  },
  {
    id: 'market-data',
    label: 'Market Data',
    icon: 'pi pi-chart-line',
    permissions: ['admin']
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'pi pi-users',
    permissions: ['admin']
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'pi pi-chart-bar',
    permissions: ['admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'pi pi-cog',
    permissions: ['admin']
  }
])

// Filter navigation items based on user permissions
const visibleItems = computed(() => {
  const userRole = user.value?.role
  if (!userRole) return []

  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.filter(item => {
      if (!item.permissions || item.permissions.length === 0) return true
      return item.permissions.includes(userRole)
    }).map(item => ({
      ...item,
      children: item.children ? filterItems(item.children) : undefined
    }))
  }

  return filterItems(navigationItems.value)
})

const isItemActive = (itemId: string): boolean => {
  return activeSection.value === itemId
}

const hasChildren = (item: NavigationItem): boolean => {
  return !!(item.children && item.children.length > 0)
}

const navigateToSection = (section: string) => {
  activeSection.value = section
  emit('navigate', section)
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div 
    class="fixed left-0 top-0 h-full w-72 z-40 transform transition-all duration-300 ease-in-out border-r shadow-xl bg-gray-900 border-gray-800"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-800">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
          <img src="/logo_black.png" alt="GCX" class="h-5 w-auto" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-white">
            GCX CMS
          </h1>
          <p class="text-xs text-gray-400 font-medium">
            Content Management
          </p>
        </div>
      </div>
      
      <!-- Toggle Button for Mobile -->
      <button
        @click="emit('toggle')"
        class="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-400 hover:text-white"
      >
        <i class="pi pi-times text-lg"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      <template v-for="item in visibleItems" :key="item.id">
        <!-- Parent Item without children -->
        <div v-if="!hasChildren(item)">
          <button
            @click="navigateToSection(item.id)"
            class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
            :class="isItemActive(item.id)
              ? 'bg-green-600 text-white shadow-lg'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'"
          >
            <div class="w-5 h-5 flex items-center justify-center">
              <i :class="item.icon" class="text-base"></i>
            </div>
            <span>{{ item.label }}</span>
          </button>
        </div>

        <!-- Parent with Children -->
        <div v-else class="space-y-1">
          <div class="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center space-x-2">
            <i :class="item.icon" class="text-sm"></i>
            <span>{{ item.label }}</span>
          </div>
          
          <div class="space-y-1 ml-2">
            <button
              v-for="child in item.children"
              :key="child.id"
              @click="navigateToSection(child.id)"
              class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
              :class="isItemActive(child.id)
                ? 'bg-green-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'"
            >
              <div class="w-4 h-4 flex items-center justify-center">
                <i :class="child.icon" class="text-sm"></i>
              </div>
              <span>{{ child.label }}</span>
            </button>
          </div>
        </div>
      </template>
    </nav>

    <!-- Bottom Section - Absolute bottom with visible divider -->
    <div class="mt-auto">
      <!-- Strong visible divider -->
      <div class="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"></div>
      
      <!-- Logout Section -->
      <div class="px-6 py-4 border-t-2 border-gray-700">
        <button
          @click="handleLogout"
          class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-red-400 hover:bg-red-900/20 hover:text-red-300 group"
        >
          <i class="pi pi-sign-out text-base"></i>
          <span>Logout</span>
          <i class="pi pi-angle-right text-xs ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i>
        </button>
      </div>

      <!-- User Info -->
      <div class="px-6 py-4">
        <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg">
            <span class="text-lg font-bold text-white">
              {{ user?.name?.charAt(0)?.toUpperCase() }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white truncate">
              {{ user?.name }}
            </p>
            <div class="flex items-center space-x-2">
              <p class="text-xs text-green-400 font-medium capitalize">
                {{ user?.role }}
              </p>
              <div class="flex items-center space-x-1">
                <i class="pi pi-circle-fill text-green-500 text-xs"></i>
                <span class="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-3 border-t border-gray-800 bg-gray-900/50">
        <p class="text-xs text-gray-500 text-center">
          © 2025 GCX Platform
        </p>
      </div>
    </div>

    <!-- Decorative accent -->
    <div class="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600"></div>
  </div>

  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    @click="emit('toggle')"
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
  ></div>
</template>

<style scoped>
/* Custom scrollbar */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(34, 197, 94, 0.3);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.5);
}

/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

/* Active item glow effect */
.bg-green-600 {
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
}

/* Hover effects */
button:hover {
  transform: translateX(2px);
}

/* Icon animations */
i {
  transition: transform 0.2s ease;
}

button:hover i {
  transform: scale(1.1);
}
</style>