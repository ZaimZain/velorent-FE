import { apiClient } from './api';
import { Customer, ApiResponse, PaginatedResponse } from '../types';

/**
 * Customer Service - Handles all customer-related API calls
 */

// Get all customers
export const getCustomers = async (params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<PaginatedResponse<Customer>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Customer>>('/customers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Get customer by ID
export const getCustomerById = async (id: string): Promise<ApiResponse<Customer>> => {
  try {
    const response = await apiClient.get<ApiResponse<Customer>>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    throw error;
  }
};

// Add new customer
export const addCustomer = async (
  customerData: Omit<Customer, 'id' | 'dateJoined' | 'totalRentals'>
): Promise<ApiResponse<Customer>> => {
  try {
    const response = await apiClient.post<ApiResponse<Customer>>('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

// Update customer
export const updateCustomer = async (
  id: string,
  customerData: Partial<Customer>
): Promise<ApiResponse<Customer>> => {
  try {
    const response = await apiClient.put<ApiResponse<Customer>>(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer ${id}:`, error);
    throw error;
  }
};

// Delete customer
export const deleteCustomer = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer ${id}:`, error);
    throw error;
  }
};

// Get customer rental history
export const getCustomerRentals = async (customerId: string): Promise<ApiResponse<any[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>(`/customers/${customerId}/rentals`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer rentals ${customerId}:`, error);
    throw error;
  }
};
