import { useState } from "react";
import { Car } from "../types/Car";

export const useCarForm = (initialValues?: Partial<Car>) => {
  const [carData, setCarData] = useState<Partial<Car>>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    registrationNumber: "",
    imageUrl: "",
    ...initialValues, // useful if used for editing
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setCarData({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      registrationNumber: "",
      imageUrl: "",
    });
  };

  return {
    carData,
    handleChange,
    resetForm,
    setCarData, // optional for future usage
  };
};
