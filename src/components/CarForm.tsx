import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Car } from "../types/Car";
import TextField from "../components/ui/TextField";
import SelectDropdown from "../components/ui/SelectDropdown";
import PrimaryButton from "../components/ui/PrimaryButton";

interface CarFormProps {
  car?: Car; // make it optional
  onSubmit: (formData: Car) => void;
}

export default function CarForm ( { car, onSubmit } : CarFormProps) {
  const [formData, setFormData] = useState<Car>({
    id: car?.id || "", // Include ID if editing
    brand: car?.brand || "",
    model: car?.model || "",
    year: car?.year || new Date().getFullYear(),
    pricePerDay: car?.pricePerDay || 0,
  });

  useEffect(() => {
    if (car) setFormData(car);
  }, [car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerDay" || name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return <>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Brand</Form.Label>
        <Form.Control
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Model</Form.Label>
        <Form.Control
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Year</Form.Label>
        <Form.Control
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price per Day (RM)</Form.Label>
        <Form.Control
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />
      <PrimaryButton label={car ? "Update Car" : "Add Car"} type="submit" className="mt-3" />
    </Form>
  </>
};
