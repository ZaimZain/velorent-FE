import React from "react";
import PageCard from "../../components/ui/PageCard";
import PageLayout from "../../components/ui/PageLayout";
import { useCarForm } from "../../hooks/useCarForm";
import CarForm from "../../components/CarForm";
import { addCar } from "../../services/carService";
import { validateCarForm } from "../../utils/validateCarForm";

export default function AddCar () {
  const { car, handleChange, setCar } = useCarForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCarForm(car)) return alert("All fields are required.");
    try {
      await addCar(car);
      alert("Car added successfully!");
      setCar({ brand: "", model: "", year: new Date().getFullYear(), pricePerDay: 0 });
    } catch (error) {
      alert("Error adding car.");
    }
  };

  return <>
    <PageLayout>
      <PageCard title="Add New Car">
        <CarForm car={car} handleChange={handleChange} handleSubmit={handleSubmit} />
      </PageCard>
    </PageLayout>
  </>
};
