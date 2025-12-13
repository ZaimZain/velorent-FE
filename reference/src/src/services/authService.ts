import { apiClient } from './api';
import { User, ApiResponse } from '../types';

/**
 * Authentication Service - Handles authentication and user management
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: 'owner' | 'customer';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Login
export const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Register
export const register = async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Logout
export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>('/auth/logout');
    localStorage.removeItem('authToken');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    localStorage.removeItem('authToken');
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Update profile
export const updateProfile = async (
  userId: string,
  profileData: Partial<User>
): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
