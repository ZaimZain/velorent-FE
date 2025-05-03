import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import CustomNavbar from '../../components/Navbar';
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
      <CustomNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Header
                as="h5"
                className="text-white rounded-top-4"
                style={{ backgroundColor: "#1E293B", fontFamily: "Inter" }}
              >
                Add New Car
              </Card.Header>
              <Card.Body className="p-4">
                <CarForm car={car} handleChange={handleChange} handleSubmit={handleSubmit} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
};
