<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Enhanced Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <i class="pi pi-handshake text-white text-xl"></i>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
              Partner Management
            </h2>
            <p class="text-slate-600 dark:text-slate-400 mt-1">Manage strategic partnerships and collaborations</p>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button
            @click="exportPartners"
            class="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-medium transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700"
            :class="isDarkMode ? 'text-slate-300' : 'text-slate-700'"
          >
            <i class="pi pi-download mr-2"></i>
            Export
          </button>
          <button
            @click="openAddModal"
            class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <i class="pi pi-plus"></i>
            Add Partner
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
            placeholder="Search partners by name, description, or email..."
            class="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
            :class="isDarkMode ? 'placeholder-slate-400' : 'placeholder-slate-500'"
            @input="debouncedSearch"
          />
        </div>
        
        <div class="flex gap-3">
          <select
            v-model="categoryFilter"
            @change="loadPartners"
            class="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
          >
            <option value="">All Categories</option>
            <option value="financial">Financial Institutions</option>
            <option value="donor">Donor Agencies</option>
            <option value="government">Government Agencies</option>
            <option value="ngo">NGOs</option>
            <option value="private">Private Agencies</option>
            <option value="tender">Tenders & Procurement</option>
          </select>
          
          <select
            v-model="statusFilter"
            @change="loadPartners"
            class="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
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
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Partners</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ partners.length }}</p>
            </div>
            <i class="pi pi-handshake text-2xl text-green-500 dark:text-green-400"></i>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Active</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ activePartners }}</p>
            </div>
            <i class="pi pi-check-circle text-2xl text-green-500 dark:text-green-400"></i>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Inactive</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ inactivePartners }}</p>
            </div>
            <i class="pi pi-clock text-2xl text-orange-500 dark:text-orange-400"></i>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Suspended</p>
              <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ suspendedPartners }}</p>
            </div>
            <i class="pi pi-ban text-2xl text-red-500 dark:text-red-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Partners Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full table-fixed">
          <thead class="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th class="w-80 px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-building text-slate-500 dark:text-slate-400"></i>
                  Partner & Logo
                </div>
              </th>
              <th class="w-32 px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-tag text-slate-500 dark:text-slate-400"></i>
                  Category
                </div>
              </th>
              <th class="w-24 px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-globe text-slate-500 dark:text-slate-400"></i>
                  Website
                </div>
              </th>
              <th class="w-40 px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-envelope text-slate-500 dark:text-slate-400"></i>
                  Contact
                </div>
              </th>
              <th class="w-20 px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-circle text-slate-500 dark:text-slate-400"></i>
                  Status
                </div>
              </th>
              <th class="w-24 px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                  <i class="pi pi-cog text-slate-500 dark:text-slate-400"></i>
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="partner in partners" :key="partner.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <!-- Partner Logo -->
                  <div class="w-10 h-10 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <img 
                      v-if="partner.logo" 
                      :src="partner.logo" 
                      :alt="partner.name"
                      class="w-full h-full object-contain"
                      @error="handleLogoError"
                    />
                    <div 
                      v-else
                      class="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-xs"
                    >
                      {{ partner.name.charAt(0).toUpperCase() }}
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ partner.name }}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {{ partner.description ? (partner.description.length > 60 ? partner.description.substring(0, 60) + '...' : partner.description) : 'No description' }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 truncate">
                  <i class="pi pi-tag mr-1 text-xs"></i>
                  <span class="truncate">{{ getCategoryLabel(partner.category) }}</span>
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="text-xs">
                  <a 
                    v-if="partner.website" 
                    :href="partner.website" 
                    target="_blank" 
                    class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    <i class="pi pi-external-link text-xs"></i>
                    <span class="truncate">Visit</span>
                  </a>
                  <span v-else class="text-slate-400">-</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="text-xs text-slate-900 dark:text-white">
                  <div v-if="partner.email" class="truncate" :title="partner.email">
                    <i class="pi pi-envelope text-slate-400 text-xs mr-1"></i>
                    {{ partner.email.length > 20 ? partner.email.substring(0, 20) + '...' : partner.email }}
                  </div>
                  <div v-if="partner.phone" class="truncate mt-1" :title="partner.phone">
                    <i class="pi pi-phone text-slate-400 text-xs mr-1"></i>
                    {{ partner.phone }}
                  </div>
                  <span v-if="!partner.email && !partner.phone" class="text-slate-400">-</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <span :class="getStatusClass(partner.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  <i :class="getStatusIcon(partner.status)" class="mr-1 text-xs"></i>
                  {{ partner.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex gap-1">
                  <button
                    @click="editPartner(partner)"
                    class="p-1.5 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-all duration-200"
                    title="Edit Partner"
                  >
                    <i class="pi pi-pencil text-xs"></i>
                  </button>
                  <button
                    @click="viewPartner(partner)"
                    class="p-1.5 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-all duration-200"
                    title="View Details"
                  >
                    <i class="pi pi-eye text-xs"></i>
                  </button>
                  <button
                    @click="deletePartner(partner.id)"
                    class="p-1.5 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all duration-200"
                    title="Delete Partner"
                  >
                    <i class="pi pi-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Enhanced Empty State -->
      <div v-if="partners.length === 0 && !loading" class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
          <i class="pi pi-handshake text-3xl text-green-500 dark:text-green-400"></i>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">No partners found</h3>
        <p class="text-slate-500 dark:text-slate-400 mb-6">Get started by adding your first partner to the system.</p>
        <button
          @click="openAddModal"
          class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 mx-auto"
        >
          <i class="pi pi-plus"></i>
          Add Your First Partner
        </button>
      </div>
    </div>

    <!-- Enhanced Pagination -->
    <div v-if="(pagination && pagination.totalPages > 1) || partners.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm text-slate-700 dark:text-slate-300">
          <template v-if="pagination">
            Showing <span class="font-semibold text-slate-900 dark:text-white">{{ (pagination.page - 1) * pagination.limit + 1 }}</span> to 
            <span class="font-semibold text-slate-900 dark:text-white">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span> of 
            <span class="font-semibold text-slate-900 dark:text-white">{{ pagination.total }}</span> results
          </template>
          <template v-else>
            Showing <span class="font-semibold text-slate-900 dark:text-white">1</span> to 
            <span class="font-semibold text-slate-900 dark:text-white">{{ partners.length }}</span> of 
            <span class="font-semibold text-slate-900 dark:text-white">{{ partners.length }}</span> results
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
            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="changePage(page)"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  page === pagination.page
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                ]"
              >
                {{ page }}
              </button>
              <span
                v-else
                class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400"
              >
                ...
              </span>
            </template>
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
      <i class="pi pi-spin pi-spinner text-2xl text-green-600"></i>
      <p class="mt-2 text-slate-600 dark:text-slate-400">Loading partners...</p>
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
              {{ editingPartner ? 'Edit Partner' : 'Add New Partner' }}
            </h3>
            <button
              @click="closeModal"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="savePartner" class="space-y-4">
            <!-- Logo Upload Section -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Partner Logo *
              </label>
              
              <!-- Logo Preview -->
              <div v-if="form.logo" class="mb-4">
                <div class="relative inline-block">
                  <img 
                    :src="form.logo" 
                    :alt="form.name || 'Partner Logo'"
                    class="w-24 h-24 object-contain border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                    @error="handleLogoError"
                  />
                  <button
                    @click="removeLogo"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    title="Remove logo"
                  >
                    <i class="pi pi-times"></i>
                  </button>
                </div>
              </div>
              
              <!-- Upload Options -->
              <div class="flex flex-col sm:flex-row gap-3">
                <label class="flex items-center px-4 py-2 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                       :class="isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-50'">
                  <i class="pi pi-upload mr-2"></i>
                  {{ isUploading ? 'Uploading...' : 'Upload Logo' }}
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleLogoUpload"
                    class="hidden"
                    :disabled="isUploading"
                  />
                </label>
                
                <button
                  @click="showImageLibrary = true"
                  class="px-4 py-2 border rounded-lg transition-colors"
                  :class="isDarkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-50'"
                >
                  <i class="pi pi-images mr-2"></i>
                  Choose from Library
                </button>
                
                <div class="flex-1">
                  <input
                    v-model="form.logo"
                    type="url"
                    placeholder="Or enter logo URL directly..."
                    class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
              
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Recommended: 200x200px or larger, PNG/JPG format, max 5MB
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  v-model="form.category"
                  required
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="financial">Financial Institutions</option>
                  <option value="donor">Donor Agencies</option>
                  <option value="government">Government Agencies</option>
                  <option value="ngo">NGOs</option>
                  <option value="private">Private Agencies</option>
                  <option value="tender">Tenders & Procurement</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Website
                </label>
                <input
                  v-model="form.website"
                  type="url"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Address
              </label>
              <textarea
                v-model="form.address"
                rows="2"
                class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
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
                class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i v-if="saving" class="pi pi-spin pi-spinner"></i>
                {{ saving ? 'Saving...' : (editingPartner ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Image Library Modal -->
    <div
      v-if="showImageLibrary"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="showImageLibrary = false"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
              Choose Partner Logo
            </h3>
            <button
              @click="showImageLibrary = false"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <!-- Upload New Image -->
          <div class="mb-6">
            <label class="block w-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                @change="handleLibraryImageUpload"
                class="sr-only"
                :disabled="isUploading"
              />
              <div class="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed rounded-xl transition-colors hover:bg-opacity-50"
                   :class="isDarkMode 
                     ? 'border-slate-600 hover:bg-slate-700 text-slate-300' 
                     : 'border-gray-300 hover:bg-gray-50 text-gray-600'"
              >
                <i class="pi pi-upload text-3xl mb-3"></i>
                <p class="text-lg font-medium">{{ isUploading ? 'Uploading...' : 'Upload New Image' }}</p>
                <p class="text-sm opacity-75">Click to browse or drag and drop</p>
                <p class="text-xs opacity-50 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </label>
          </div>

          <!-- Image Grid -->
          <div v-if="mediaFiles.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            <div
              v-for="file in mediaFiles"
              :key="file.id"
              @click="selectImage(file.url)"
              class="relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all duration-200"
              :class="form.logo === file.url 
                ? 'border-green-500 ring-2 ring-green-200' 
                : 'border-slate-200 dark:border-slate-600 hover:border-green-400'"
            >
              <img
                :src="file.url"
                :alt="file.original_name"
                class="w-full h-24 object-cover"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <i v-if="form.logo === file.url" class="pi pi-check-circle text-green-500 text-xl"></i>
                <i v-else class="pi pi-plus text-white text-xl opacity-0 group-hover:opacity-100"></i>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <i class="pi pi-images text-4xl text-slate-400 mb-4"></i>
            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">No images found</h3>
            <p class="text-slate-500 dark:text-slate-400">Upload some images to get started.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getCMSPartners, createPartner, updatePartner, deletePartner, type Partner, type CreatePartnerRequest } from '../../services/partnerService'
import { isDarkMode } from '../../utils/darkMode'
import { useMedia } from '../../composables/useMedia'
import type { MediaFile } from '../../types/cms'

// Media composable
const { files: mediaFiles, uploadFile, fetchFiles } = useMedia()

// State
const partners = ref<Partner[]>([])
const loading = ref(false)
const saving = ref(false)
const isUploading = ref(false)
const showModal = ref(false)
const showImageLibrary = ref(false)
const editingPartner = ref<Partner | null>(null)
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const pagination = ref<{
  page: number
  limit: number
  total: number
  totalPages: number
} | null>(null)

// Form
const form = ref<CreatePartnerRequest>({
  name: '',
  description: '',
  category: 'financial',
  website: '',
  email: '',
  phone: '',
  address: '',
  status: 'active'
})

// Computed properties
const activePartners = computed(() => partners.value.filter(partner => partner.status === 'active').length)
const inactivePartners = computed(() => partners.value.filter(partner => partner.status === 'inactive').length)
const suspendedPartners = computed(() => partners.value.filter(partner => partner.status === 'suspended').length)

const visiblePages = computed(() => {
  if (!pagination.value || pagination.value.totalPages <= 1) return []
  
  const current = pagination.value.page
  const total = pagination.value.totalPages
  const pages = []
  
  // Always show first page
  if (total > 0) {
    pages.push(1)
  }
  
  // Calculate range around current page
  let start = Math.max(2, current - 1)
  let end = Math.min(total - 1, current + 1)
  
  // Adjust if we're near the beginning or end
  if (current <= 3) {
    end = Math.min(5, total - 1)
  }
  if (current >= total - 2) {
    start = Math.max(2, total - 4)
  }
  
  // Add ellipsis if there's a gap
  if (start > 2) {
    pages.push('...')
  }
  
  // Add middle pages
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i)
    }
  }
  
  // Add ellipsis if there's a gap
  if (end < total - 1) {
    pages.push('...')
  }
  
  // Always show last page (if more than 1 page)
  if (total > 1) {
    pages.push(total)
  }
  
  return pages
})

// Methods
const loadPartners = async () => {
  loading.value = true
  try {
    const params: any = {
      page: pagination.value?.page || 1,
      limit: 10
    }
    
    if (searchQuery.value) {
      params.search = searchQuery.value
    }
    
    if (categoryFilter.value) {
      params.category = categoryFilter.value
    }
    
    if (statusFilter.value) {
      params.status = statusFilter.value
    }
    
    const response = await getCMSPartners(params)
    partners.value = response.data
    pagination.value = response.pagination || null
  } catch (error) {
    console.error('Failed to load partners:', error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = (() => {
  let timeout: number
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      pagination.value = { ...pagination.value!, page: 1 }
      loadPartners()
    }, 500)
  }
})()

const changePage = (page: number) => {
  if (pagination.value && page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.page = page
    loadPartners()
  } else if (!pagination.value) {
    // Fallback for client-side pagination if backend doesn't support it
  }
}

const openAddModal = () => {
  editingPartner.value = null
  form.value = {
    name: '',
    description: '',
    category: 'financial',
    website: '',
    email: '',
    phone: '',
    address: '',
    status: 'active'
  }
  showModal.value = true
}

const editPartner = (partner: Partner) => {
  editingPartner.value = partner
  form.value = {
    name: partner.name,
    description: partner.description,
    category: partner.category,
    website: partner.website,
    email: partner.email,
    phone: partner.phone,
    address: partner.address,
    status: partner.status
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingPartner.value = null
}

const savePartner = async () => {
  saving.value = true
  try {
    if (editingPartner.value) {
      await updatePartner(editingPartner.value.id, form.value)
    } else {
      await createPartner(form.value)
    }
    closeModal()
    loadPartners()
  } catch (error) {
    console.error('Failed to save partner:', error)
  } finally {
    saving.value = false
  }
}

const deletePartner = async (id: number) => {
  if (confirm('Are you sure you want to delete this partner?')) {
    try {
      await deletePartner(id)
      loadPartners()
    } catch (error) {
      console.error('Failed to delete partner:', error)
    }
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    case 'suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return 'pi pi-check-circle'
    case 'inactive':
      return 'pi pi-clock'
    case 'suspended':
      return 'pi pi-ban'
    default:
      return 'pi pi-circle'
  }
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    financial: 'Financial Institutions',
    donor: 'Donor Agencies',
    government: 'Government Agencies',
    ngo: 'NGOs',
    private: 'Private Agencies',
    tender: 'Tenders & Procurement'
  }
  return labels[category] || category
}

const exportPartners = () => {
  // Export functionality can be implemented here
}

const toggleFilters = () => {
  // Toggle filters functionality
}

const viewPartner = (partner: Partner) => {
  // View partner functionality
}

// Upload functions
const handleLogoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert('⚠️ Image size should be less than 5MB. Please choose a smaller image.')
    return
  }

  try {
    isUploading.value = true
    const result = await uploadFile(file)
    if (result.success && result.data) {
      form.value.logo = result.data.url
    }
  } catch (error) {
    console.error('Logo upload error:', error)
    alert('Failed to upload logo. Please try again.')
  } finally {
    isUploading.value = false
    // Clear the input
    if (target) target.value = ''
  }
}

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

const selectImage = (imageUrl: string) => {
  form.value.logo = imageUrl
  showImageLibrary.value = false
}

const removeLogo = () => {
  form.value.logo = ''
}

const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // You could add a placeholder image here
  img.src = '/Partners/1-ukaid.jpg'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
}


// Lifecycle
onMounted(async () => {
  await Promise.all([
    loadPartners(),
    fetchFiles() // Load media files for the image library
  ])
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
