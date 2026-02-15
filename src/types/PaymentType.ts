export interface PaymentType {
  id: number;
  rentalId: number;
  amount: number;
  paymentDate: string;
  method: "cash" | "card" | "transfer";
  status: "paid" | "pending";
}
