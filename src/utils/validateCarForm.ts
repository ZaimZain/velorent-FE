import { Car } from "../types/Car";

export const validateCarForm = (car: Car) => {
  if (!car.brand || !car.model || !car.year || !car.pricePerDay) {
    return false;
  }
  return true;
};