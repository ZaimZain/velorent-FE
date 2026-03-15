import { RentalStatus } from "./RentalType";

export interface CalendarRentalEntry {
  id: number;
  carId: number;
  customerId: number;

  carName: string;
  licensePlate: string;
  customerName: string;

  startDate: string;
  endDate: string;

  rentalStatus: RentalStatus;
}