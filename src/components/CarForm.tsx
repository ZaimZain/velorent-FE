import { Form } from "react-bootstrap";
import { Car } from "../types/Car";
import PrimaryButton from "../components/ui/PrimaryButton";

interface CarFormProps {
  car: Car;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function CarForm({ car, handleChange, handleSubmit }: CarFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Brand</Form.Label>
        <Form.Control name="brand" value={car.brand} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Model</Form.Label>
        <Form.Control name="model" value={car.model} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Year</Form.Label>
        <Form.Control name="year" type="number" value={car.year} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price per Day</Form.Label>
        <Form.Control
          name="pricePerDay"
          type="number"
          value={car.pricePerDay}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <br />
      <PrimaryButton label="Add Car" type="submit" />
    </Form>
  );
}
