export type CustomerStatus = "active" | "warning" | "inactive";

export interface CustomerType {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  driverLicense: string;

  status: CustomerStatus;
  note?: string;

  // optional: if you want profile photo later
  avatarUrl?: string;

  createdAt: string;
  updatedAt: string;
}
