/**
 * Application constants
 */

export const APP_NAME = 'Velorent';
export const APP_DESCRIPTION = 'Car Rental Management System';

export const THEME_COLORS = {
  primary: '#004B87',
  secondary: '#E8F2F7',
  background: '#F3F4F6',
  backgroundDark: '#111827',
};

export const CAR_STATUS = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  MAINTENANCE: 'maintenance',
} as const;

export const RENTAL_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OVERDUE: 'overdue',
} as const;

export const PAYMENT_STATUS = {
  PAID: 'paid',
  PARTIAL: 'partial',
  PENDING: 'pending',
  OVERDUE: 'overdue',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const NOTIFICATION_TYPES = {
  PAYMENT: 'payment',
  RENTAL: 'rental',
  MAINTENANCE: 'maintenance',
  BOOKING: 'booking',
} as const;

export const TRANSMISSION_TYPES = ['Automatic', 'Manual'] as const;

export const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'] as const;

export const LOCATIONS = [
  'Kuala Lumpur',
  'Petaling Jaya',
  'Shah Alam',
  'Subang Jaya',
  'Johor Bahru',
  'Penang',
  'Ipoh',
  'Melaka',
] as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const DATE_FORMAT = {
  DISPLAY: 'DD MMM YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'DD MMM YYYY, HH:mm',
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_ADDRESS_LENGTH: 255,
  MIN_PLATE_NUMBER_LENGTH: 5,
  MAX_PLATE_NUMBER_LENGTH: 10,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15,
} as const;
