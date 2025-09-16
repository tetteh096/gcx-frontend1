import { ref, computed } from 'vue';
import * as careerService from '../services/careerService';
import type { Career, CareerFilters } from '../services/careerService';

export function useCareers() {
  const careers = ref<Career[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const searchQuery = ref('');
  const categoryFilter = ref('');
  const statusFilter = ref('');

  // Computed properties
  const filteredCareers = computed(() => careers.value);
  const hasCareers = computed(() => careers.value.length > 0);
  const totalPages = computed(() => pagination.value.totalPages);

  // Fetch careers
  const fetchCareers = async (filters: CareerFilters = {}) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await careerService.getAllCareers({
        page: filters.page || pagination.value.page,
        limit: filters.limit || pagination.value.limit,
        search: filters.search || searchQuery.value,
        category: filters.category || categoryFilter.value,
        status: filters.status || statusFilter.value
      });
      
      careers.value = response.data;
      pagination.value = response.pagination;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch careers';
      console.error('Error fetching careers:', err);
    } finally {
      loading.value = false;
    }
  };

  // Search careers
  const searchCareers = async (query: string) => {
    searchQuery.value = query;
    pagination.value.page = 1; // Reset to first page
    await fetchCareers();
  };

  // Filter by category
  const filterByCategory = async (category: string) => {
    categoryFilter.value = category;
    pagination.value.page = 1; // Reset to first page
    await fetchCareers();
  };

  // Filter by status
  const filterByStatus = async (status: string) => {
    statusFilter.value = status;
    pagination.value.page = 1; // Reset to first page
    await fetchCareers();
  };

  // Clear filters
  const clearFilters = async () => {
    searchQuery.value = '';
    categoryFilter.value = '';
    statusFilter.value = '';
    pagination.value.page = 1;
    await fetchCareers();
  };

  // Pagination
  const goToPage = async (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page;
      await fetchCareers();
    }
  };

  const nextPage = async () => {
    if (pagination.value.page < pagination.value.totalPages) {
      await goToPage(pagination.value.page + 1);
    }
  };

  const prevPage = async () => {
    if (pagination.value.page > 1) {
      await goToPage(pagination.value.page - 1);
    }
  };

  // CRUD operations
  const createCareer = async (careerData: Omit<Career, 'id' | 'created_at' | 'updated_at' | 'application_count'>) => {
    try {
      const response = await careerService.createCareer(careerData);
      await fetchCareers(); // Refresh the list
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create career';
      throw err;
    }
  };

  const updateCareer = async (id: number, careerData: Partial<Career>) => {
    try {
      const response = await careerService.updateCareer(id, careerData);
      await fetchCareers(); // Refresh the list
      return response;
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update career';
      throw err;
    }
  };

  const deleteCareer = async (id: number) => {
    try {
      await careerService.deleteCareer(id);
      await fetchCareers(); // Refresh the list
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete career';
      throw err;
    }
  };

  return {
    // State
    careers,
    loading,
    error,
    pagination,
    searchQuery,
    categoryFilter,
    statusFilter,
    
    // Computed
    filteredCareers,
    hasCareers,
    totalPages,
    
    // Methods
    fetchCareers,
    searchCareers,
    filterByCategory,
    filterByStatus,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
    createCareer,
    updateCareer,
    deleteCareer
  };
}
