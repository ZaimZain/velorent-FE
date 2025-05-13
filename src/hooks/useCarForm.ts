import { useState } from "react";
import { Car } from "../types/Car";

export const useCarForm = (initialValues?: Partial<Car>) => {
  const [car, setCar] = useState<Partial<Car>>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    pricePerDay: 0,
    ...initialValues,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: name === "year" || name === "pricePerDay" ? Number(value) : value,
    }));
  };

  return {
    car,
    handleChange,
    setCar,
  };
};
