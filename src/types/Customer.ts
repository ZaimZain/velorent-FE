export interface Customer {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "INACTIVE" | "WARNING";
  created_at: string;
}
