export type CarFleetStatus = "available" | "rented" | "maintenance";

export interface CarFleetJson {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: CarFleetStatus;
  color: string;
  fuelType: "Gasoline" | "Diesel" | "Hybrid" | "Electric";
  dailyRate: number;
  image?: string;
  currentRenter?: string;
  dueDate?: string; // YYYY-MM-DD
}
