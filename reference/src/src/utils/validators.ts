/**
 * Utility functions for validation
 */

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate Malaysian phone number
export const isValidPhone = (phone: string): boolean => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Malaysian phone numbers are typically 10-11 digits
  // Starting with 01 (mobile) or 03-09 (landline) or +60
  if (cleaned.startsWith('60')) {
    return cleaned.length === 11 || cleaned.length === 12;
  }
  return cleaned.length === 10 || cleaned.length === 11;
};

// Validate plate number format
export const isValidPlateNumber = (plateNumber: string): boolean => {
  // Malaysian plate number format (simplified)
  // Examples: ABC 1234, WA 1234 A, etc.
  const plateRegex = /^[A-Z]{1,3}\s?\d{1,4}\s?[A-Z]?$/i;
  return plateRegex.test(plateNumber.trim());
};

// Validate date range
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate < endDate;
};

// Validate future date
export const isFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Validate past date
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Validate positive number
export const isPositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

// Validate year
export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

// Validate required field
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

// Validate minimum length
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

// Validate maximum length
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

// Validate password strength
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Validate number range
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
