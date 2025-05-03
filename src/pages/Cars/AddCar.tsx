import React from "react";
import { Card, Container } from "react-bootstrap";
import { useCarForm } from "../../hooks/useCarForm";
import CarForm from "../../components/CarForm";
import { addCar } from "../../services/carService";
import { validateCarForm } from "../../utils/validateCarForm";

const AddCar: React.FC = () => {
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

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header as="h5">Add New Car</Card.Header>
        <Card.Body>
          <CarForm car={car} handleChange={handleChange} handleSubmit={handleSubmit} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddCar;
