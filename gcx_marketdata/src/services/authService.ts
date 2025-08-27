import api from './api';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  User,
  ResetPasswordRequest,
  ResetPasswordConfirm,
  ChangePasswordRequest,
  ApiResponse
} from '@/types/auth';

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
  }

  // Register new user
  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/register', credentials);
    return response.data;
  }

  // Get current user profile
  static async getProfile(): Promise<User> {
    const response = await api.get<User>('/api/user/profile');
    return response.data;
  }

  // Update user profile
  static async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await api.put<User>('/api/user/profile', profileData);
    return response.data;
  }

  // Change password
  static async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/api/user/change-password', passwordData);
    return response.data;
  }

  // Request password reset
  static async requestPasswordReset(email: ResetPasswordRequest): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/api/auth/forgot-password', email);
    return response.data;
  }

  // Reset password with token
  static async resetPassword(resetData: ResetPasswordConfirm): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/api/auth/reset-password', resetData);
    return response.data;
  }

  // Logout (clear local storage)
  static logout(): void {
    localStorage.removeItem('gcx_token');
    localStorage.removeItem('gcx_user');
    // Redirect to login page
    window.location.href = '/auth/login';
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('gcx_token');
  }

  // Get stored user data
  static getStoredUser(): User | null {
    const userStr = localStorage.getItem('gcx_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get stored token
  static getStoredToken(): string | null {
    return localStorage.getItem('gcx_token');
  }

  // Store auth data
  static storeAuthData(token: string, user: User): void {
    localStorage.setItem('gcx_token', token);
    localStorage.setItem('gcx_user', JSON.stringify(user));
  }
}

export default AuthService;
