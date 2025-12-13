// Type definitions for Velorent car rental management system

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  dailyRate: number;
  status: 'available' | 'rented' | 'maintenance';
  features: string[];
  image?: string;
  transmission?: 'automatic' | 'manual';
  fuelType?: string;
  seats?: number;
  mileage?: number;
  location?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  licenseNumber?: string;
  dateJoined: string;
  totalRentals: number;
}

export interface Rental {
  id: string;
  carId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled' | 'overdue';
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'overdue';
  notes?: string;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  pickupLocation?: string;
  dropoffLocation?: string;
  additionalRequests?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'customer';
  profileImage?: string;
}

export interface Notification {
  id: string;
  type: 'payment' | 'rental' | 'maintenance' | 'booking';
  title: string;
  message: string;
  date: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface DashboardStats {
  totalCars: number;
  availableCars: number;
  rentedCars: number;
  maintenanceCars: number;
  activeRentals: number;
  totalRevenue: number;
  monthlyRevenue: number;
  overduePayments: number;
  overdueAmount: number;
  revenueData: {
    month: string;
    revenue: number;
  }[];
  rentalStatusData: {
    status: string;
    count: number;
  }[];
}

export interface CalendarEvent {
  id: string;
  carId: string;
  customerId: string;
  title: string;
  start: Date;
  end: Date;
  type: 'rental' | 'maintenance' | 'booking';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
