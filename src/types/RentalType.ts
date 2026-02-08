export type RentalStatus = "active" | "upcoming" | "completed" | "cancelled";
export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface Rental {
  id: number;

  car_id: number;
  customer_id: number;

  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD

  pickup_location: string;
  dropoff_location: string;

  total_amount: number;
  paid_amount: number;

  rental_status: RentalStatus;
  payment_status: PaymentStatus;

  created_at: string;
  updated_at: string;
}
