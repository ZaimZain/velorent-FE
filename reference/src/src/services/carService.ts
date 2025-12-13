import { apiClient } from './api';
import { Car, ApiResponse, PaginatedResponse } from '../types';

/**
 * Car Service - Handles all car-related API calls
 */

// Get all cars
export const getCars = async (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}): Promise<PaginatedResponse<Car>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Car>>('/cars', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Get car by ID
export const getCarById = async (id: string): Promise<ApiResponse<Car>> => {
  try {
    const response = await apiClient.get<ApiResponse<Car>>(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car ${id}:`, error);
    throw error;
  }
};

// Add new car
export const addCar = async (carData: Omit<Car, 'id'>): Promise<ApiResponse<Car>> => {
  try {
    const response = await apiClient.post<ApiResponse<Car>>('/cars', carData);
    return response.data;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
};

// Update car
export const updateCar = async (id: string, carData: Partial<Car>): Promise<ApiResponse<Car>> => {
  try {
    const response = await apiClient.put<ApiResponse<Car>>(`/cars/${id}`, carData);
    return response.data;
  } catch (error) {
    console.error(`Error updating car ${id}:`, error);
    throw error;
  }
};

// Delete car
export const deleteCar = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting car ${id}:`, error);
    throw error;
  }
};

// Update car status
export const updateCarStatus = async (
  id: string,
  status: 'available' | 'rented' | 'maintenance'
): Promise<ApiResponse<Car>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Car>>(`/cars/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating car status ${id}:`, error);
    throw error;
  }
};

// Get available cars for marketplace
export const getAvailableCars = async (params?: {
  startDate?: string;
  endDate?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  seats?: number;
}): Promise<PaginatedResponse<Car>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Car>>('/cars/available', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching available cars:', error);
    throw error;
  }
};
