import { apiClient } from './api';
import { Rental, ApiResponse, PaginatedResponse } from '../types';

/**
 * Rental Service - Handles all rental-related API calls
 */

// Get all rentals
export const getRentals = async (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  customerId?: string;
  carId?: string;
}): Promise<PaginatedResponse<Rental>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Rental>>('/rentals', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching rentals:', error);
    throw error;
  }
};

// Get rental by ID
export const getRentalById = async (id: string): Promise<ApiResponse<Rental>> => {
  try {
    const response = await apiClient.get<ApiResponse<Rental>>(`/rentals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching rental ${id}:`, error);
    throw error;
  }
};

// Create new rental
export const createRental = async (
  rentalData: Omit<Rental, 'id'>
): Promise<ApiResponse<Rental>> => {
  try {
    const response = await apiClient.post<ApiResponse<Rental>>('/rentals', rentalData);
    return response.data;
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
};

// Update rental
export const updateRental = async (
  id: string,
  rentalData: Partial<Rental>
): Promise<ApiResponse<Rental>> => {
  try {
    const response = await apiClient.put<ApiResponse<Rental>>(`/rentals/${id}`, rentalData);
    return response.data;
  } catch (error) {
    console.error(`Error updating rental ${id}:`, error);
    throw error;
  }
};

// Update rental status
export const updateRentalStatus = async (
  id: string,
  status: 'active' | 'completed' | 'cancelled' | 'overdue'
): Promise<ApiResponse<Rental>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Rental>>(`/rentals/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating rental status ${id}:`, error);
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (
  id: string,
  paymentData: {
    paidAmount: number;
    paymentStatus: 'paid' | 'partial' | 'pending' | 'overdue';
  }
): Promise<ApiResponse<Rental>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Rental>>(
      `/rentals/${id}/payment`,
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating payment status ${id}:`, error);
    throw error;
  }
};

// Delete rental
export const deleteRental = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(`/rentals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting rental ${id}:`, error);
    throw error;
  }
};

// Get active rentals
export const getActiveRentals = async (): Promise<ApiResponse<Rental[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Rental[]>>('/rentals/active');
    return response.data;
  } catch (error) {
    console.error('Error fetching active rentals:', error);
    throw error;
  }
};

// Get overdue rentals
export const getOverdueRentals = async (): Promise<ApiResponse<Rental[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Rental[]>>('/rentals/overdue');
    return response.data;
  } catch (error) {
    console.error('Error fetching overdue rentals:', error);
    throw error;
  }
};
