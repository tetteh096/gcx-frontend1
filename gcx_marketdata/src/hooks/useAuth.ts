import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/authService';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const storedUser = AuthService.getStoredUser();
          if (storedUser) {
            setUser(storedUser);
          } else {
            // Token exists but no user data, fetch profile
            const profile = await AuthService.getProfile();
            setUser(profile);
            AuthService.storeAuthData(AuthService.getStoredToken()!, profile);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        AuthService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);
      AuthService.storeAuthData(response.token, response.user);
      setUser(response.user);
      router.push('/app/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const response = await AuthService.register(credentials);
      AuthService.storeAuthData(response.token, response.user);
      setUser(response.user);
      router.push('/app/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    AuthService.logout();
    router.push('/auth/login');
  }, [router]);

  const updateProfile = useCallback(async (profileData: Partial<User>) => {
    try {
      const updatedUser = await AuthService.updateProfile(profileData);
      setUser(updatedUser);
      AuthService.storeAuthData(AuthService.getStoredToken()!, updatedUser);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };
};
