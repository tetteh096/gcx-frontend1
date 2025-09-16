<template>
  <div class="commodity-manager">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Commodities Manager</h2>
        <p class="text-gray-600 dark:text-gray-400">Manage commodity trading information and market data</p>
      </div>
      <button
        @click="openAddModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <i class="pi pi-plus"></i>
        Add Commodity
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
          <input
            v-model="searchQuery"
            @input="searchCommodities(searchQuery)"
            type="text"
            placeholder="Search commodities..."
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            v-model="categoryFilter"
            @change="filterByCategory(categoryFilter)"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="Grains">Grains</option>
            <option value="Oilseeds">Oilseeds</option>
            <option value="Legumes">Legumes</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <select
            v-model="statusFilter"
            @change="filterByStatus(statusFilter)"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <i class="pi pi-spin pi-spinner text-2xl text-blue-600"></i>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading commodities...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600 mr-2"></i>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <!-- Commodities Table -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Commodity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Code</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Change</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="commodity in filteredCommodities" :key="commodity.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ commodity.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ commodity.origin_country }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                {{ commodity.code }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getCategoryBadgeClass(commodity.category)">
                  {{ commodity.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div class="font-medium">{{ commodity.price_unit }} {{ commodity.current_price.toLocaleString() }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ commodity.contract_size }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex items-center">
                  <span :class="commodity.price_change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ commodity.price_change >= 0 ? '+' : '' }}{{ commodity.price_change.toFixed(2) }}
                  </span>
                  <span class="ml-1 text-xs" :class="commodity.price_change_percent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    ({{ commodity.price_change_percent >= 0 ? '+' : '' }}{{ commodity.price_change_percent.toFixed(2) }}%)
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(commodity.market_status)">
                  {{ commodity.market_status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editCommodity(commodity)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="handleDeleteCommodity(commodity.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="pagination.page <= 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="pagination.page >= pagination.totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }} results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="prevPage"
                :disabled="pagination.page <= 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="pi pi-chevron-left"></i>
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === pagination.page
                    ? 'z-10 bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="pagination.page >= pagination.totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="pi pi-chevron-right"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-5 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ editingCommodity ? 'Edit Commodity' : 'Add New Commodity' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="saveCommodity" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code *</label>
                <input
                  v-model="formData.code"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="formData.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  v-model="formData.category"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Category</option>
                  <option value="Grains">Grains</option>
                  <option value="Oilseeds">Oilseeds</option>
                  <option value="Legumes">Legumes</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Origin Country</label>
                <input
                  v-model="formData.origin_country"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Harvest Season</label>
                <input
                  v-model="formData.harvest_season"
                  type="text"
                  placeholder="e.g., June-September"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trading Hours</label>
                <input
                  v-model="formData.trading_hours"
                  type="text"
                  placeholder="e.g., Monday-Friday 9:00-17:00"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contract Size</label>
                <input
                  v-model="formData.contract_size"
                  type="text"
                  placeholder="e.g., 50kg bags"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Price *</label>
                <input
                  v-model.number="formData.current_price"
                  type="number"
                  step="0.01"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Unit</label>
                <input
                  v-model="formData.price_unit"
                  type="text"
                  placeholder="e.g., GHC per bag"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Market Status</label>
                <select
                  v-model="formData.market_status"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Price</label>
                <input
                  v-model.number="formData.minimum_price"
                  type="number"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maximum Price</label>
                <input
                  v-model.number="formData.maximum_price"
                  type="number"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specifications</label>
              <textarea
                v-model="formData.specifications"
                rows="3"
                placeholder="Trading specifications and requirements..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Storage Requirements</label>
              <textarea
                v-model="formData.storage_requirements"
                rows="2"
                placeholder="Storage and handling requirements..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality Standards</label>
              <textarea
                v-model="formData.quality_standards"
                rows="2"
                placeholder="Quality standards and certifications..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="saving" class="pi pi-spin pi-spinner mr-2"></i>
                {{ editingCommodity ? 'Update' : 'Create' }} Commodity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCommodities } from '../../composables/useCommodities';
import type { Commodity } from '../../services/commodityService';

const {
  commodities,
  loading,
  error,
  pagination,
  searchQuery,
  categoryFilter,
  statusFilter,
  filteredCommodities,
  fetchCommodities,
  searchCommodities,
  filterByCategory,
  filterByStatus,
  clearFilters,
  goToPage,
  nextPage,
  prevPage,
  createCommodity,
  updateCommodity,
  deleteCommodity
} = useCommodities();

// Modal state
const showModal = ref(false);
const editingCommodity = ref<Commodity | null>(null);
const saving = ref(false);

// Form data
const formData = ref({
  name: '',
  code: '',
  description: '',
  category: '',
  origin_country: '',
  harvest_season: '',
  trading_hours: '',
  contract_size: '',
  current_price: 0,
  price_unit: '',
  minimum_price: 0,
  maximum_price: 0,
  market_status: 'Open',
  specifications: '',
  storage_requirements: '',
  quality_standards: '',
  image_path: ''
});

// Computed
const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, pagination.value.page - 2);
  const end = Math.min(pagination.value.totalPages, pagination.value.page + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// Methods
const openAddModal = () => {
  editingCommodity.value = null;
  formData.value = {
    name: '',
    code: '',
    description: '',
    category: '',
    origin_country: '',
    harvest_season: '',
    trading_hours: '',
    contract_size: '',
    current_price: 0,
    price_unit: '',
    minimum_price: 0,
    maximum_price: 0,
    market_status: 'Open',
    specifications: '',
    storage_requirements: '',
    quality_standards: '',
    image_path: ''
  };
  showModal.value = true;
};

const editCommodity = (commodity: Commodity) => {
  editingCommodity.value = commodity;
  formData.value = {
    name: commodity.name,
    code: commodity.code,
    description: commodity.description,
    category: commodity.category,
    origin_country: commodity.origin_country,
    harvest_season: commodity.harvest_season,
    trading_hours: commodity.trading_hours,
    contract_size: commodity.contract_size,
    current_price: commodity.current_price,
    price_unit: commodity.price_unit,
    minimum_price: commodity.minimum_price,
    maximum_price: commodity.maximum_price,
    market_status: commodity.market_status,
    specifications: commodity.specifications,
    storage_requirements: commodity.storage_requirements,
    quality_standards: commodity.quality_standards,
    image_path: commodity.image_path
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingCommodity.value = null;
};

const saveCommodity = async () => {
  saving.value = true;
  try {
    if (editingCommodity.value) {
      await updateCommodity(editingCommodity.value.id, formData.value);
    } else {
      await createCommodity(formData.value as any);
    }
    closeModal();
  } catch (error) {
    console.error('Error saving commodity:', error);
  } finally {
    saving.value = false;
  }
};

const handleDeleteCommodity = async (id: number) => {
  if (confirm('Are you sure you want to delete this commodity?')) {
    try {
      await deleteCommodity(id);
    } catch (error) {
      console.error('Error deleting commodity:', error);
    }
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Grains':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'Oilseeds':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'Legumes':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'Closed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'Suspended':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

// Lifecycle
onMounted(() => {
  fetchCommodities();
});
</script>
