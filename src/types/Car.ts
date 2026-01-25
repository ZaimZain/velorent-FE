export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  color: string;
  fuel_type: "Gasoline" | "Diesel" | "Hybrid" | "Electric";
  daily_rate: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}