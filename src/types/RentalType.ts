export type RentalStatus = "active" | "upcoming" | "completed" | "cancelled";
export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface RentalType {
  id: number;

  carId: number;
  customerId: number;

  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD

  pickupLocation: string;
  dropoffLocation: string;

  totalAmount: number;
  paidAmount: number;

  rentalStatus: RentalStatus;
  paymentStatus: PaymentStatus;

  createdAt: string;
  updatedAt: string;
}
