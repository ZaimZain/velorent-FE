import { apiClient } from './api';
import { CalendarEvent, ApiResponse } from '../types';

/**
 * Calendar Service - Handles calendar and event-related API calls
 */

// Get calendar events
export const getCalendarEvents = async (params?: {
  startDate?: string;
  endDate?: string;
  type?: 'rental' | 'maintenance' | 'booking';
}): Promise<ApiResponse<CalendarEvent[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<CalendarEvent[]>>('/calendar/events', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};

// Get car availability for date range
export const getCarAvailability = async (
  carId: string,
  startDate: string,
  endDate: string
): Promise<ApiResponse<{ available: boolean; conflicts?: CalendarEvent[] }>> => {
  try {
    const response = await apiClient.get<
      ApiResponse<{ available: boolean; conflicts?: CalendarEvent[] }>
    >(`/calendar/availability/${carId}`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking car availability:', error);
    throw error;
  }
};

// Get all cars availability for a specific date
export const getAllCarsAvailability = async (
  date: string
): Promise<ApiResponse<{ carId: string; available: boolean }[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<{ carId: string; available: boolean }[]>>(
      '/calendar/availability',
      { params: { date } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all cars availability:', error);
    throw error;
  }
};
