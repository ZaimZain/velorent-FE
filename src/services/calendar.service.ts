import api from "./api";
import { USE_API } from "./dataSource";
import { getRentals } from "./rentals.service";
import { getCars } from "./cars.service";
import { getCustomers } from "./customers.service";

import { CalendarRentalEntry } from "../types/CalendarType";

export async function getCalendarAvailability(): Promise<CalendarRentalEntry[]> {
  if (USE_API) {
    const res = await api.get<CalendarRentalEntry[]>("/calendar/availability");
    return res.data;
  }

  const [rentals, cars, customers] = await Promise.all([
    getRentals(),
    getCars(),
    getCustomers(),
  ]);

  const carById = new Map(cars.map((c) => [c.id, c]));
  const customerById = new Map(customers.map((c) => [c.id, c]));

  return rentals
    .filter((r) => r.rentalStatus === "active" || r.rentalStatus === "upcoming")
    .map((r) => {
      const car = carById.get(r.carId);
      const customer = customerById.get(r.customerId);

      return {
        id: r.id,
        carId: r.carId,
        customerId: r.customerId,
        carName: car ? `${car.make} ${car.model} ${car.year}` : `Car #${r.carId}`,
        licensePlate: car?.licensePlate ?? "",
        customerName: customer?.fullName ?? `Customer #${r.customerId}`,
        startDate: r.startDate,
        endDate: r.endDate,
        rentalStatus: r.rentalStatus,
      };
    });
}