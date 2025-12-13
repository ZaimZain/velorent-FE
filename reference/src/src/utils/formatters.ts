/**
 * Utility functions for formatting data
 */

// Format currency in Malaysian Ringgit
export const formatCurrency = (amount: number): string => {
  return `RM ${amount.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Format date to readable format
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format date to full format with time
export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date for API (YYYY-MM-DD)
export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Malaysian phone number (e.g., +60 12-345 6789)
  if (cleaned.startsWith('60')) {
    const number = cleaned.substring(2);
    return `+60 ${number.substring(0, 2)}-${number.substring(2, 5)} ${number.substring(5)}`;
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  }
  
  return phone;
};

// Calculate days between two dates
export const calculateDays = (startDate: string | Date, endDate: string | Date): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Calculate rental total
export const calculateRentalTotal = (
  dailyRate: number,
  startDate: string | Date,
  endDate: string | Date
): number => {
  const days = calculateDays(startDate, endDate);
  return dailyRate * days;
};

// Format plate number
export const formatPlateNumber = (plateNumber: string): string => {
  return plateNumber.toUpperCase().replace(/\s+/g, ' ').trim();
};

// Get status color
export const getStatusColor = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const statusMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    available: 'default',
    active: 'default',
    confirmed: 'default',
    rented: 'secondary',
    pending: 'secondary',
    maintenance: 'outline',
    completed: 'outline',
    cancelled: 'destructive',
    overdue: 'destructive',
  };
  return statusMap[status.toLowerCase()] || 'default';
};

// Get payment status color
export const getPaymentStatusColor = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const statusMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    paid: 'default',
    partial: 'secondary',
    pending: 'outline',
    overdue: 'destructive',
  };
  return statusMap[status.toLowerCase()] || 'default';
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
