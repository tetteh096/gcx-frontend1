<template>
  <div class="market-data-widget">
    <!-- Header -->
    <div class="market-header">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Live Market Data</h2>
        <div class="flex items-center space-x-4">
          <span v-if="lastUpdated" class="text-sm text-gray-500">
            Last updated: {{ formatDateTime(lastUpdated) }}
          </span>
          <button 
            @click="refreshData" 
            :disabled="loading"
            class="btn-refresh"
            :class="{ 'animate-spin': loading }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !marketData.length" class="loading-state">
      <div class="animate-pulse space-y-4">
        <div v-for="i in 6" :key="i" class="loading-row">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/6"></div>
          <div class="h-4 bg-gray-200 rounded w-1/8"></div>
          <div class="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-red-800">{{ error }}</p>
        </div>
        <button @click="refreshData" class="mt-2 text-red-600 hover:text-red-800 font-medium">
          Try Again
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div v-else class="market-filters">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label for="commodity-filter" class="block text-sm font-medium text-gray-700 mb-1">
            Filter by Commodity
          </label>
          <select 
            id="commodity-filter"
            v-model="selectedCommodity" 
            @change="applyFilters"
            class="filter-select"
          >
            <option value="">All Commodities</option>
            <option v-for="commodity in uniqueCommodities" :key="commodity" :value="commodity">
              {{ commodity }}
            </option>
          </select>
        </div>
        
        <div>
          <label for="centre-filter" class="block text-sm font-medium text-gray-700 mb-1">
            Filter by Delivery Centre
          </label>
          <select 
            id="centre-filter"
            v-model="selectedCentre" 
            @change="applyFilters"
            class="filter-select"
          >
            <option value="">All Centres</option>
            <option v-for="centre in uniqueCentres" :key="centre" :value="centre">
              {{ centre }}
            </option>
          </select>
        </div>

        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input 
            id="search"
            type="text" 
            v-model="searchTerm" 
            @input="debounceSearch"
            placeholder="Search by symbol or commodity..."
            class="filter-input"
          >
        </div>
      </div>
    </div>

    <!-- Market Data Table -->
    <div v-if="!loading && !error && filteredData.length" class="market-table-container">
      <div class="overflow-x-auto">
        <table class="market-table">
          <thead>
            <tr>
              <th @click="sortBy('Symbol')" class="sortable-header">
                Symbol
                <span class="sort-icon" :class="getSortClass('Symbol')">↕️</span>
              </th>
              <th @click="sortBy('Commodity')" class="sortable-header">
                Commodity
                <span class="sort-icon" :class="getSortClass('Commodity')">↕️</span>
              </th>
              <th>Grade</th>
              <th>Delivery Centre</th>
              <th @click="sortBy('ClosingPrice')" class="sortable-header text-right">
                Closing Price
                <span class="sort-icon" :class="getSortClass('ClosingPrice')">↕️</span>
              </th>
              <th class="text-right">Change</th>
              <th class="text-right">High</th>
              <th class="text-right">Low</th>
              <th @click="sortBy('LastTradeDate')" class="sortable-header">
                Last Trade
                <span class="sort-icon" :class="getSortClass('LastTradeDate')">↕️</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedData" :key="item.Symbol" class="table-row">
              <td class="font-mono font-semibold text-blue-600">{{ item.Symbol }}</td>
              <td class="font-medium">{{ item.Commodity }}</td>
              <td class="text-center">
                <span class="grade-badge">{{ item.Grade || 'N/A' }}</span>
              </td>
              <td>{{ item.DeliveryCentre || 'N/A' }}</td>
              <td class="text-right font-semibold">{{ item.formattedPrice }}</td>
              <td class="text-right">
                <span 
                  :class="getPriceChangeClass(item)"
                  class="price-change"
                >
                  {{ formatPriceChange(item.PriceChange) }}
                  <span v-if="item.priceChangePercent" class="text-xs ml-1">
                    ({{ item.priceChangePercent.toFixed(2) }}%)
                  </span>
                </span>
              </td>
              <td class="text-right">{{ formatPrice(item.HighPrice) }}</td>
              <td class="text-right">{{ formatPrice(item.LowPrice) }}</td>
              <td class="text-sm">{{ formatDate(item.LastTradeDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Previous
        </button>
        
        <span class="pagination-info">
          Page {{ currentPage }} of {{ totalPages }} 
          ({{ filteredData.length }} items)
        </span>
        
        <button 
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else-if="!loading && !error && !filteredData.length" class="no-data-state">
      <div class="text-center py-8">
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No market data available</h3>
        <p class="text-gray-500">Try adjusting your filters or check back later.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { marketDataService, type ProcessedMarketData } from '../services/marketDataService'

// Reactive data
const marketData = ref<ProcessedMarketData[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const lastUpdated = ref<string>('')

// Filters
const selectedCommodity = ref('')
const selectedCentre = ref('')
const searchTerm = ref('')
const uniqueCommodities = ref<string[]>([])
const uniqueCentres = ref<string[]>([])

// Sorting
const sortField = ref<keyof ProcessedMarketData>('Symbol')
const sortDirection = ref<'asc' | 'desc'>('asc')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 20

// Computed properties
const filteredData = computed(() => {
  let data = [...marketData.value]

  // Apply commodity filter
  if (selectedCommodity.value) {
    data = data.filter(item => item.Commodity === selectedCommodity.value)
  }

  // Apply centre filter
  if (selectedCentre.value) {
    data = data.filter(item => item.DeliveryCentre === selectedCentre.value)
  }

  // Apply search filter
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    data = data.filter(item =>
      item.Symbol.toLowerCase().includes(term) ||
      item.Commodity.toLowerCase().includes(term) ||
      item.DeliveryCentre?.toLowerCase().includes(term)
    )
  }

  // Apply sorting
  data.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    // Handle numeric fields
    if (sortField.value === 'ClosingPrice' || sortField.value === 'HighPrice' || sortField.value === 'LowPrice') {
      aValue = parseFloat(aValue as string) || 0
      bValue = parseFloat(bValue as string) || 0
    }

    // Handle date fields
    if (sortField.value === 'LastTradeDate') {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }

    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return data
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage)
})

// Methods
const loadMarketData = async () => {
  try {
    loading.value = true
    error.value = null

    const [data, commodities, centres, statistics] = await Promise.all([
      marketDataService.getCombinedMarketData(),
      marketDataService.getUniqueCommodities(),
      marketDataService.getUniqueDeliveryCentres(),
      marketDataService.getMarketStatistics()
    ])

    marketData.value = data
    uniqueCommodities.value = commodities
    uniqueCentres.value = centres
    lastUpdated.value = statistics.lastUpdated

    console.log(`✅ Loaded ${data.length} market data items`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load market data'
    console.error('❌ Market data loading error:', err)
  } finally {
    loading.value = false
  }
}

const refreshData = async () => {
  await loadMarketData()
}

const applyFilters = () => {
  currentPage.value = 1 // Reset to first page when filtering
}

const debounceSearch = (() => {
  let timeout: number
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      currentPage.value = 1
    }, 300)
  }
})()

const sortBy = (field: keyof ProcessedMarketData) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

const getSortClass = (field: keyof ProcessedMarketData) => {
  if (sortField.value !== field) return ''
  return sortDirection.value === 'asc' ? 'sort-asc' : 'sort-desc'
}

const getPriceChangeClass = (item: ProcessedMarketData) => {
  const change = parseFloat(item.PriceChange)
  if (change > 0) return 'text-green-600'
  if (change < 0) return 'text-red-600'
  return 'text-gray-600'
}

const formatPrice = (price: string): string => {
  const numPrice = parseFloat(price)
  if (isNaN(numPrice)) return price
  
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numPrice)
}

const formatPriceChange = (change: string): string => {
  const numChange = parseFloat(change)
  if (isNaN(numChange)) return change
  
  const formatted = Math.abs(numChange).toLocaleString('en-GH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
  
  return numChange >= 0 ? `+${formatted}` : `-${formatted}`
}

const formatDate = (dateString: string): string => {
  try {
    return marketDataService.formatDate(dateString)
  } catch {
    return dateString
  }
}

const formatDateTime = (dateTimeString: string): string => {
  try {
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateTimeString
  }
}

// Lifecycle
onMounted(async () => {
  await loadMarketData()
  
  // Auto-refresh every 5 minutes
  setInterval(async () => {
    if (!loading.value) {
      await refreshData()
    }
  }, 5 * 60 * 1000)
})
</script>

<style scoped>
.market-data-widget {
  @apply bg-white rounded-lg shadow-lg p-6;
}

.market-header {
  @apply mb-6 pb-4 border-b border-gray-200;
}

.btn-refresh {
  @apply p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200;
}

.loading-state, .error-state, .no-data-state {
  @apply py-8;
}

.loading-row {
  @apply flex justify-between items-center py-3 space-x-4;
}

.market-filters {
  @apply mb-6;
}

.filter-select {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.filter-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.market-table-container {
  @apply -mx-6;
}

.market-table {
  @apply min-w-full divide-y divide-gray-200;
}

.market-table thead th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50;
}

.sortable-header {
  @apply cursor-pointer hover:bg-gray-100 transition-colors duration-150;
}

.sort-icon {
  @apply inline-block ml-1 text-gray-400;
}

.sort-asc .sort-icon {
  @apply text-blue-500 transform rotate-180;
}

.sort-desc .sort-icon {
  @apply text-blue-500;
}

.table-row {
  @apply hover:bg-gray-50 transition-colors duration-150;
}

.table-row td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}

.grade-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800;
}

.price-change {
  @apply font-medium;
}

.pagination {
  @apply flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200;
}

.pagination-btn {
  @apply px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed;
}

.pagination-info {
  @apply text-sm text-gray-700;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .market-table-container {
    @apply mx-0;
  }
  
  .market-table {
    @apply text-xs;
  }
  
  .market-table thead th,
  .table-row td {
    @apply px-3 py-2;
  }
}
</style>