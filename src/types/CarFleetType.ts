export type CarStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";
export type FuelType = "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";
export type TransmissionType = "AUTOMATIC" | "MANUAL";

export interface CarFleetJson {
  carId: number;
  renterId: number;
  renterUsername: string;
  renterFullName: string;
  brand: string;
  model: string;
  bodyType: string;
  color: string;
  mileage: number;
  seat: number;
  year: number;
  plateNumber: string;
  dailyRate: number;
  description: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  carStatus: CarStatus;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

