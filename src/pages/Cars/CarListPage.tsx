import { useEffect, useState } from 'react';
import { Card, Button, Spinner, Row, Col } from 'react-bootstrap';
import { getCars } from '../../services/carService';
import { Car } from '../../types/Car';

export default function CarListPage () {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  return <>
    <div className="container mt-4">
      <h2 className="mb-4">Car List</h2>
      <Row>
        {cars.map((car) => (
          <Col md={4} sm={6} xs={12} key={car.id} className="mb-4">
            <Card className="shadow-sm rounded">
              <Card.Img variant="top" src={car.imageUrl} height={180} style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{car.make} {car.model}</Card.Title>
                <Card.Text>
                  Year: {car.year} <br />
                  Color: {car.color} <br />
                  Plate No: {car.plateNumber}
                </Card.Text>
                <Button variant="outline-primary" size="sm">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </>
};

