import { apiClient } from './api';
import { DashboardStats, Notification, ApiResponse } from '../types';

/**
 * Dashboard Service - Handles dashboard and statistics API calls
 */

// Get dashboard statistics
export const getDashboardStats = async (): Promise<ApiResponse<DashboardStats>> => {
  try {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get revenue statistics
export const getRevenueStats = async (params?: {
  startDate?: string;
  endDate?: string;
  groupBy?: 'day' | 'week' | 'month';
}): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get<ApiResponse<any>>('/dashboard/revenue', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue stats:', error);
    throw error;
  }
};

// Get notifications
export const getNotifications = async (params?: {
  unreadOnly?: boolean;
  limit?: number;
}): Promise<ApiResponse<Notification[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Notification[]>>('/notifications', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.patch<ApiResponse<void>>(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.patch<ApiResponse<void>>('/notifications/read-all');
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Delete notification
export const deleteNotification = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting notification ${id}:`, error);
    throw error;
  }
};
