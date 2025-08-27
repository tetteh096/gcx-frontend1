export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'trader' | 'premium' | 'admin';
  avatar?: string | null;
  bio?: string | null;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  time_zone?: string | null;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company?: string;
  phone?: string;
  country?: string;
  time_zone?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}
