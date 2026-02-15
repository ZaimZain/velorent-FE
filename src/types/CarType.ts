export type CarStatus = "available" | "rented" | "maintenance";

export interface CarType {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: CarStatus;
  color: string;
  fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
  dailyRate: number;
  image?: string;

  createdAt: string;
  updatedAt: string;
}
