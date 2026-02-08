export interface PaymentJson {
  id: number;
  rental_id: number;
  amount: number;
  payment_date: string;
  method: "CASH" | "CARD" | "TRANSFER";
  status: "PAID" | "PENDING";
}
