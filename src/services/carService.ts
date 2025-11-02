import axios from 'axios';
import { Car } from '../types/Car';

const API_URL = 'http://localhost:8080/api/cars'; // Change this to your real API

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(API_URL);
  return response.data;
};

export const addCar = async (car: Car): Promise<Car> => {
  const response = await axios.post<Car>(API_URL, car);
  return response.data;
};

// Add more methods like updateCar, deleteCar if needed
