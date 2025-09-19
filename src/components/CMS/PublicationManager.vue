<template>
  <div class="publication-manager">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Publications Manager</h2>
        <p class="text-gray-600 dark:text-gray-400">Manage research papers, annual reports, and policy documents</p>
      </div>
      <button
        @click="openAddModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <i class="pi pi-plus"></i>
        Add Publication
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
          <input
            v-model="searchQuery"
            @input="searchPublications(searchQuery)"
            type="text"
            placeholder="Search publications..."
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
            <option value="Research Papers">Research Papers</option>
            <option value="Annual Reports">Annual Reports</option>
            <option value="Policy Documents">Policy Documents</option>
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
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading publications...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <i class="pi pi-exclamation-triangle text-red-600 mr-2"></i>
        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <!-- Publications Table -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Downloads</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="publication in filteredPublications" :key="publication.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ publication.title }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ publication.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getCategoryBadgeClass(publication.category)">
                  {{ publication.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ publication.author }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(publication.status)">
                  {{ publication.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div v-if="publication.file_path && publication.file_path.trim() !== ''" class="flex items-center">
                  <i class="pi pi-file-pdf text-red-500"></i>
                </div>
                <div v-else class="flex items-center">
                  <i class="pi pi-file text-gray-400"></i>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ publication.download_count }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editPublication(publication)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="handleDeletePublication(publication.id)"
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
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-white/20 rounded-xl">
                <i class="pi pi-file-pdf text-2xl text-white"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">
                  {{ editingPublication ? 'Edit Publication' : 'Add New Publication' }}
                </h3>
                <p class="text-blue-100 mt-1">
                  {{ editingPublication ? 'Update publication information' : 'Create new publication' }}
                </p>
              </div>
            </div>
            <button
              @click="closeModal"
              class="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <i class="pi pi-times text-xl text-white"></i>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">

          <form @submit.prevent="savePublication" class="space-y-8">
            <!-- Basic Information Section -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <i class="pi pi-info-circle mr-2 text-blue-600"></i>
                Basic Information
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                    Title *
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    required
                    class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 dark:bg-slate-800 dark:text-white"
                    placeholder="Enter publication title"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  <select
                    v-model="formData.category"
                    required
                    class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Research Papers">Research Papers</option>
                    <option value="Annual Reports">Annual Reports</option>
                    <option value="Policy Documents">Policy Documents</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Description Section -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <i class="pi pi-file-edit mr-2 text-green-600"></i>
                Description
              </h4>
              <div>
                <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                  Publication Description
                </label>
                <textarea
                  v-model="formData.description"
                  rows="5"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none dark:bg-slate-800 dark:text-white"
                  placeholder="Enter detailed description of the publication..."
                ></textarea>
              </div>
            </div>

            <!-- Author and Status Section -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <i class="pi pi-user mr-2 text-purple-600"></i>
                Author & Status
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                    Author
                  </label>
                  <input
                    v-model="formData.author"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 dark:bg-slate-800 dark:text-white"
                    placeholder="Enter author name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    v-model="formData.status"
                    class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- File Upload Section -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <i class="pi pi-file-pdf mr-2 text-red-600"></i>
                Publication File
              </h4>
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0">
                  <div class="w-32 h-32 rounded-xl overflow-hidden border-4 border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <div v-if="formData.file_path" class="text-center">
                      <i class="pi pi-file-pdf text-4xl text-red-500 mb-2"></i>
                      <p class="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
                        {{ formData.file_name || 'PDF File' }}
                      </p>
                    </div>
                    <div v-else class="text-center">
                      <i class="pi pi-file text-4xl text-slate-400"></i>
                    </div>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Choose a PDF file for this publication. Click on any file to select it.
                  </p>
                  <FileUpload
                    title="Select Publication File"
                    :current-file="formData.file_path"
                    folder="publications"
                    accepted-types=".pdf"
                    accepted-types-text="PDF files up to 10MB"
                    @file-selected="(file) => { formData.file_path = file.url; formData.file_name = file.name || file.url.split('/').pop() || '' }"
                  />
                </div>
              </div>
            </div>

            <!-- Tags Section -->
            <div class="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
              <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <i class="pi pi-tags mr-2 text-orange-600"></i>
                Tags
              </h4>
              <div>
                <label class="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
                  Publication Tags
                </label>
                <input
                  v-model="formData.tags"
                  type="text"
                  placeholder="Enter comma-separated tags (e.g., research, agriculture, policy)"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 dark:bg-slate-800 dark:text-white"
                />
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Separate multiple tags with commas
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <i class="pi pi-spin pi-spinner" v-if="saving"></i>
                <i v-else class="pi pi-check" v-if="!saving"></i>
                <span>{{ saving ? 'Saving...' : (editingPublication ? 'Update Publication' : 'Create Publication') }}</span>
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
import { usePublications } from '../../composables/usePublications';
import type { Publication } from '../../services/publicationService';
import FileUpload from './FileUpload.vue';

const {
  publications,
  loading,
  error,
  pagination,
  searchQuery,
  categoryFilter,
  filteredPublications,
  fetchPublications,
  searchPublications,
  filterByCategory,
  clearFilters,
  goToPage,
  nextPage,
  prevPage,
  createPublication,
  updatePublication,
  deletePublication
} = usePublications();

// Modal state
const showModal = ref(false);
const editingPublication = ref<Publication | null>(null);
const saving = ref(false);

// Form data
const formData = ref({
  title: '',
  description: '',
  category: '',
  author: '',
  status: 'Published',
  file_path: '',
  file_name: '',
  tags: ''
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
  editingPublication.value = null;
  formData.value = {
    title: '',
    description: '',
    category: '',
    author: '',
    status: 'Published',
    file_path: '',
    file_name: '',
    tags: ''
  };
  showModal.value = true;
};

const editPublication = (publication: Publication) => {
  editingPublication.value = publication;
  formData.value = {
    title: publication.title,
    description: publication.description,
    category: publication.category,
    author: publication.author,
    status: publication.status,
    file_path: publication.file_path,
    file_name: publication.file_name,
    tags: publication.tags
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingPublication.value = null;
};

const savePublication = async () => {
  saving.value = true;
  try {
    if (editingPublication.value) {
      await updatePublication(editingPublication.value.id, formData.value);
    } else {
      await createPublication(formData.value as any);
    }
    closeModal();
  } catch (error) {
    console.error('Error saving publication:', error);
  } finally {
    saving.value = false;
  }
};

const handleDeletePublication = async (id: number) => {
  if (confirm('Are you sure you want to delete this publication?')) {
    try {
      await deletePublication(id);
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Research Papers':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'Annual Reports':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'Policy Documents':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Published':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'Archived':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

// Lifecycle
onMounted(() => {
  fetchPublications();
});
</script>
