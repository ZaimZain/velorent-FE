export interface Rental {
  id: number;
  car_id: number;
  customer_id: number;
  start_date: string;
  end_date: string;
  pickup_location: string;
  dropoff_location: string;
  total_amount: number;
  paid_amount: number;
  status: "ACTIVE" | "COMPLETED" | "OVERDUE" | "UPCOMING";
  pickupLocation: string;
  dropoffLocation: string;
  payment_status: "PAID" | "PARTIAL" | "UNPAID";
  created_at: string;
  updated_at: string;
}
