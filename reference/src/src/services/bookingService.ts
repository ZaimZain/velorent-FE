import { apiClient } from './api';
import { Booking, ApiResponse, PaginatedResponse } from '../types';

/**
 * Booking Service - Handles all booking-related API calls for marketplace
 */

// Get all bookings
export const getBookings = async (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  userId?: string;
}): Promise<PaginatedResponse<Booking>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Booking>>('/bookings', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (id: string): Promise<ApiResponse<Booking>> => {
  try {
    const response = await apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    throw error;
  }
};

// Create new booking
export const createBooking = async (
  bookingData: Omit<Booking, 'id' | 'createdAt'>
): Promise<ApiResponse<Booking>> => {
  try {
    const response = await apiClient.post<ApiResponse<Booking>>('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Update booking
export const updateBooking = async (
  id: string,
  bookingData: Partial<Booking>
): Promise<ApiResponse<Booking>> => {
  try {
    const response = await apiClient.put<ApiResponse<Booking>>(`/bookings/${id}`, bookingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating booking ${id}:`, error);
    throw error;
  }
};

// Cancel booking
export const cancelBooking = async (id: string): Promise<ApiResponse<Booking>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling booking ${id}:`, error);
    throw error;
  }
};

// Confirm booking
export const confirmBooking = async (id: string): Promise<ApiResponse<Booking>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/confirm`);
    return response.data;
  } catch (error) {
    console.error(`Error confirming booking ${id}:`, error);
    throw error;
  }
};

// Get user bookings
export const getUserBookings = async (userId: string): Promise<ApiResponse<Booking[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Booking[]>>(`/users/${userId}/bookings`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user bookings ${userId}:`, error);
    throw error;
  }
};

// Check car availability
export const checkCarAvailability = async (
  carId: string,
  startDate: string,
  endDate: string
): Promise<ApiResponse<{ available: boolean }>> => {
  try {
    const response = await apiClient.post<ApiResponse<{ available: boolean }>>(
      `/bookings/check-availability`,
      { carId, startDate, endDate }
    );
    return response.data;
  } catch (error) {
    console.error('Error checking car availability:', error);
    throw error;
  }
};
