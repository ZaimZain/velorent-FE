export type CustomerStatus = "active" | "warning" | "inactive";

export interface CustomerJson {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;

  status: CustomerStatus;

  totalRentals: number;
  totalSpent: number; // store as number; format as RM in UI

  // optional: only show box if exists
  currentRental?: {
    carName: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
  };

  memberSince: string; // YYYY-MM-DD
  note?: string;

  // optional: if you want profile photo later
  avatarUrl?: string;
}
