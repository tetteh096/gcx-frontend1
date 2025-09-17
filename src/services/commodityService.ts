import axios from '../plugins/axios';

export interface Commodity {
  id: number;
  name: string;
  code: string;
  description: string;
  specifications: string;
  trading_hours: string;
  contract_size: string;
  price_unit: string;
  minimum_price: number;
  maximum_price: number;
  current_price: number;
  price_change: number;
  price_change_percent: number;
  trading_volume: number;
  market_status: 'Open' | 'Closed' | 'Suspended';
  image_path: string;
  category: string;
  origin_country: string;
  harvest_season: string;
  storage_requirements: string;
  quality_standards: string;
  created_at: string;
  updated_at: string;
}

export interface CommodityFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export interface CommodityResponse {
  success: boolean;
  data: Commodity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Get all commodities with pagination and filters
export const getAllCommodities = async (filters: CommodityFilters = {}): Promise<CommodityResponse> => {
  const params = new URLSearchParams();
  
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.status) params.append('status', filters.status);

  const response = await axios.get(`/api/commodities?${params.toString()}`);
  return response.data;
};

// Get single commodity by ID
export const getCommodityById = async (id: number): Promise<{ success: boolean; data: Commodity }> => {
  const response = await axios.get(`/api/commodities/${id}`);
  return response.data;
};