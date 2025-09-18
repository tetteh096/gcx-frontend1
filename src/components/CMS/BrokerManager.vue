<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Enhanced Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <i class="pi pi-briefcase text-white text-xl"></i>
          </div>
      <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Broker Management
            </h2>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Manage broker information and licensing</p>
          </div>
      </div>
        
        <div class="flex gap-3">
          <button
            @click="exportBrokers"
            class="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-medium transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
          >
            <i class="pi pi-download mr-2"></i>
            Export
          </button>
      <button
        @click="openAddModal"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
      >
        <i class="pi pi-plus"></i>
        Add Broker
      </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Search and Filters -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex flex-col lg:flex-row gap-4 items-center">
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i class="pi pi-search text-slate-400 dark:text-slate-400"></i>
          </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search brokers by name, company, or specialization..."
            class="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
            :class="isDarkMode ? 'placeholder-slate-400' : 'placeholder-slate-500'"
          @input="debouncedSearch"
        />
      </div>
        
        <div class="flex gap-3">
      <select
        v-model="statusFilter"
        @change="loadBrokers"
            class="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Suspended">Suspended</option>
      </select>
          
          <button
            @click="toggleFilters"
            class="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
          >
            <i class="pi pi-filter mr-2"></i>
            Filters
          </button>
        </div>
      </div>
      
      <!-- Stats Row -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Brokers</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ brokers.length }}</p>
            </div>
            <i class="pi pi-briefcase text-2xl text-blue-500 dark:text-blue-400"></i>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Active</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ activeBrokers }}</p>
            </div>
            <i class="pi pi-check-circle text-2xl text-green-500 dark:text-green-400"></i>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Inactive</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ inactiveBrokers }}</p>
            </div>
            <i class="pi pi-clock text-2xl text-orange-500 dark:text-orange-400"></i>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Suspended</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ suspendedBrokers }}</p>
            </div>
            <i class="pi pi-ban text-2xl text-red-500 dark:text-red-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Brokers Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-user text-slate-500 dark:text-slate-400"></i>
                  Name
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-building text-slate-500 dark:text-slate-400"></i>
                  Company
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-tag text-slate-500 dark:text-slate-400"></i>
                  Specialization
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-clock text-slate-500 dark:text-slate-400"></i>
                  Experience
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-circle text-slate-500 dark:text-slate-400"></i>
                  Status
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-cog text-slate-500 dark:text-slate-400"></i>
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="broker in brokers" :key="broker.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group">
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                    {{ broker.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                <div class="text-sm font-medium text-slate-900 dark:text-white">{{ broker.name }}</div>
                    <div class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <i class="pi pi-envelope text-xs"></i>
                      {{ broker.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="text-sm text-slate-900 dark:text-white">
                {{ broker.company || '-' }}
                </div>
              </td>
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="text-sm text-slate-900 dark:text-white">
                {{ broker.specialization || '-' }}
                </div>
              </td>
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="text-sm text-slate-900 dark:text-white flex items-center gap-1">
                  <i class="pi pi-calendar text-slate-400 text-xs"></i>
                {{ broker.experience_years }} years
                </div>
              </td>
              <td class="px-6 py-5 whitespace-nowrap">
                <span :class="getStatusClass(broker.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  <i :class="getStatusIcon(broker.status)" class="mr-1 text-xs"></i>
                  {{ broker.status }}
                </span>
              </td>
              <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">
                <div class="flex gap-2">
                  <button
                    @click="editBroker(broker)"
                    class="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                    title="Edit Broker"
                  >
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button
                    @click="viewBroker(broker)"
                    class="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                    title="View Details"
                  >
                    <i class="pi pi-eye"></i>
                  </button>
                  <button
                    @click="deleteBroker(broker.id)"
                    class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    title="Delete Broker"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Enhanced Empty State -->
      <div v-if="brokers.length === 0 && !loading" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
          <i class="pi pi-briefcase text-3xl text-blue-500 dark:text-blue-400"></i>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">No brokers found</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">Get started by adding your first broker to the system.</p>
        <button
          @click="openAddModal"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
        >
          <i class="pi pi-plus"></i>
          Add Your First Broker
        </button>
      </div>
    </div>

    <!-- Enhanced Pagination -->
    <div v-if="(pagination && pagination.totalPages > 1) || brokers.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="text-sm text-slate-700 dark:text-slate-300">
          <template v-if="pagination">
            Showing <span class="font-semibold text-slate-900 dark:text-white">{{ (pagination.page - 1) * pagination.limit + 1 }}</span> to 
            <span class="font-semibold text-slate-900 dark:text-white">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span> of 
            <span class="font-semibold text-slate-900 dark:text-white">{{ pagination.total }}</span> results
          </template>
          <template v-else>
            Showing <span class="font-semibold text-slate-900 dark:text-white">1</span> to 
            <span class="font-semibold text-slate-900 dark:text-white">{{ brokers.length }}</span> of 
            <span class="font-semibold text-slate-900 dark:text-white">{{ brokers.length }}</span> results
          </template>
      </div>
        
        <!-- Page Numbers -->
        <div v-if="pagination && pagination.totalPages > 1" class="flex items-center gap-2">
        <button
          @click="changePage(pagination.page - 1)"
          :disabled="pagination.page <= 1"
            class="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          
          <!-- Page Numbers -->
          <div class="flex gap-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                page === pagination.page
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700',
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              ]"
            >
              {{ page }}
        </button>
          </div>
          
        <button
          @click="changePage(pagination.page + 1)"
          :disabled="pagination.page >= pagination.totalPages"
            class="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
        >
            <i class="pi pi-chevron-right"></i>
        </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <i class="pi pi-spin pi-spinner text-2xl text-blue-600"></i>
      <p class="mt-2 text-slate-600 dark:text-slate-400">Loading brokers...</p>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
              {{ editingBroker ? 'Edit Broker' : 'Add New Broker' }}
            </h3>
            <button
              @click="closeModal"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="saveBroker" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Company
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  License Number
                </label>
                <input
                  v-model="form.license_number"
                  type="text"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  v-model="form.phone_no"
                  type="tel"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Specialization
                </label>
                <input
                  v-model="form.specialization"
                  type="text"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Experience (Years)
                </label>
                <input
                  v-model.number="form.experience_years"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Address
              </label>
              <textarea
                v-model="form.address"
                rows="3"
                class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              ></textarea>
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i v-if="saving" class="pi pi-spin pi-spinner"></i>
                {{ saving ? 'Saving...' : (editingBroker ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllBrokers, createBroker, updateBroker, deleteBroker, type Broker, type CreateBrokerRequest } from '../../services/brokerService'
import { isDarkMode } from '../../utils/darkMode'

// State
const brokers = ref<Broker[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const editingBroker = ref<Broker | null>(null)
const searchQuery = ref('')
const statusFilter = ref('')
const pagination = ref<{
  page: number
  limit: number
  total: number
  totalPages: number
} | null>(null)

// Form
const form = ref<CreateBrokerRequest>({
  name: '',
  company: '',
  license_number: '',
  phone_no: '',
  email: '',
  address: '',
  specialization: '',
  experience_years: 0,
  status: 'Active'
})

// Computed properties
const activeBrokers = computed(() => brokers.value.filter(broker => broker.status === 'Active').length)
const inactiveBrokers = computed(() => brokers.value.filter(broker => broker.status === 'Inactive').length)
const suspendedBrokers = computed(() => brokers.value.filter(broker => broker.status === 'Suspended').length)

const visiblePages = computed(() => {
  if (!pagination.value) return []
  const current = pagination.value.page
  const total = pagination.value.totalPages
  const pages = []
  
  // Show up to 5 pages
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const loadBrokers = async () => {
  loading.value = true
  try {
    const params: any = {
      page: pagination.value?.page || 1,
      limit: 10
    }
    
    if (searchQuery.value) {
      params.search = searchQuery.value
    }
    
    if (statusFilter.value) {
      params.status = statusFilter.value
    }
    
    const response = await getAllBrokers(params)
    brokers.value = response.data
    pagination.value = response.pagination || null
  } catch (error) {
    console.error('Failed to load brokers:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = (() => {
  let timeout: NodeJS.Timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      pagination.value = { ...pagination.value!, page: 1 }
      loadBrokers()
    }, 500)
  }
})()

const changePage = (page: number) => {
  if (pagination.value) {
    pagination.value.page = page
    loadBrokers()
  }
}

const openAddModal = () => {
  editingBroker.value = null
  form.value = {
    name: '',
    company: '',
    license_number: '',
    phone_no: '',
    email: '',
    address: '',
    specialization: '',
    experience_years: 0,
    status: 'Active'
  }
  showModal.value = true
}

const editBroker = (broker: Broker) => {
  editingBroker.value = broker
  form.value = {
    name: broker.name,
    company: broker.company,
    license_number: broker.license_number,
    phone_no: broker.phone_no,
    email: broker.email,
    address: broker.address,
    specialization: broker.specialization,
    experience_years: broker.experience_years,
    status: broker.status
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingBroker.value = null
}

const saveBroker = async () => {
  saving.value = true
  try {
    if (editingBroker.value) {
      await updateBroker(editingBroker.value.id, form.value)
    } else {
      await createBroker(form.value)
    }
    closeModal()
    loadBrokers()
  } catch (error) {
    console.error('Failed to save broker:', error)
  } finally {
    saving.value = false
  }
}

const deleteBroker = async (id: number) => {
  if (confirm('Are you sure you want to delete this broker?')) {
    try {
      await deleteBroker(id)
      loadBrokers()
    } catch (error) {
      console.error('Failed to delete broker:', error)
    }
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    case 'Suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Active':
      return 'pi pi-check-circle'
    case 'Inactive':
      return 'pi pi-clock'
    case 'Suspended':
      return 'pi pi-ban'
    default:
      return 'pi pi-circle'
  }
}

const exportBrokers = () => {
  // Export functionality
}

const toggleFilters = () => {
  // Toggle filters functionality
}

const viewBroker = (broker: Broker) => {
  // View broker functionality
}

// Lifecycle
onMounted(() => {
  loadBrokers()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode scrollbar */
.dark .overflow-x-auto::-webkit-scrollbar-track {
  background: #334155;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
