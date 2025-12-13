# Tech Stack Implementation Guide

## Can You Build This with React TypeScript + Vite + Tailwind CSS + Axios + Spring Boot + MySQL?

**YES, absolutely!** This UI is perfectly suited for that exact tech stack. Here's how:

## Frontend Architecture (Current Implementation)

### ✅ What You Already Have
- **React + TypeScript**: All components are written in TypeScript (.tsx files)
- **Tailwind CSS v4**: Using the latest Tailwind with CSS custom properties
- **Component Library**: ShadCN UI components for consistent, accessible UI
- **Routing**: Can be easily integrated with React Router
- **State Management**: Currently using React hooks (useState), can add Context API or Redux if needed

### 🔄 What You Need to Add for Production

#### 1. **Vite Configuration**
```bash
npm create vite@latest velorent -- --template react-ts
```

Your project structure is already compatible with Vite. Just need to:
- Move files to `src/` directory
- Update import paths
- Configure `vite.config.ts`

#### 2. **Axios Integration**
Replace mock data with API calls:

```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Spring Boot backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Car service example
export const carService = {
  getAllCars: () => api.get('/cars'),
  getCarById: (id: string) => api.get(`/cars/${id}`),
  createCar: (data: CarData) => api.post('/cars', data),
  updateCar: (id: string, data: CarData) => api.put(`/cars/${id}`, data),
  deleteCar: (id: string) => api.delete(`/cars/${id}`),
};
```

## Backend Architecture (Spring Boot + MySQL)

### Required Spring Boot Structure

```
velorent-backend/
├── src/main/java/com/velorent/
│   ├── VelorentApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── CorsConfig.java
│   ├── controller/
│   │   ├── CarController.java
│   │   ├── CustomerController.java
│   │   ├── RentalController.java
│   │   └── AuthController.java
│   ├── model/
│   │   ├── Car.java
│   │   ├── Customer.java
│   │   ├── Rental.java
│   │   └── User.java
│   ├── repository/
│   │   ├── CarRepository.java
│   │   ├── CustomerRepository.java
│   │   ├── RentalRepository.java
│   │   └── UserRepository.java
│   ├── service/
│   │   ├── CarService.java
│   │   ├── CustomerService.java
│   │   ├── RentalService.java
│   │   └── AuthService.java
│   └── dto/
│       ├── CarDTO.java
│       ├── RentalDTO.java
│       └── CustomerDTO.java
└── src/main/resources/
    └── application.properties
```

### Example Spring Boot Controller

```java
@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:5173") // Vite default port
public class CarController {
    
    @Autowired
    private CarService carService;
    
    @GetMapping
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }
    
    @PostMapping
    public ResponseEntity<CarDTO> createCar(@Valid @RequestBody CarDTO carDTO) {
        return ResponseEntity.ok(carService.createCar(carDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CarDTO> updateCar(
        @PathVariable Long id, 
        @Valid @RequestBody CarDTO carDTO
    ) {
        return ResponseEntity.ok(carService.updateCar(id, carDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Example Entity (Car.java)

```java
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String make;
    
    @Column(nullable = false)
    private String model;
    
    @Column(nullable = false)
    private Integer year;
    
    @Column(nullable = false)
    private String licensePlate;
    
    @Column(nullable = false)
    private BigDecimal dailyRate;
    
    @Enumerated(EnumType.STRING)
    private CarStatus status; // AVAILABLE, RENTED, MAINTENANCE
    
    @Column(length = 500)
    private String imageUrl;
    
    @OneToMany(mappedBy = "car")
    private List<Rental> rentals;
    
    // Getters, setters, constructors
}
```

### MySQL Database Schema

```sql
CREATE DATABASE velorent;

USE velorent;

-- Cars table
CREATE TABLE cars (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    daily_rate DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    ic_number VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rentals table
CREATE TABLE rentals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    car_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Users table (for authentication)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Integration Steps

### 1. **Update Components to Use API**

Example for CarList.tsx:
```typescript
import { useEffect, useState } from 'react';
import { carService } from '../services/api';

export function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await carService.getAllCars();
      setCars(response.data);
    } catch (err) {
      setError('Failed to fetch cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component...
}
```

### 2. **Add Authentication**

```typescript
// services/auth.ts
export const authService = {
  login: async (username: string, password: string) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  },
};
```

### 3. **Environment Variables**

Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

Update axios config:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## Spring Boot Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Spring Security (for authentication) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Lombok (optional, for reducing boilerplate) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

## Application Properties

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/velorent
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# JWT Configuration
jwt.secret=your-secret-key-min-256-bits
jwt.expiration=86400000
```

## Deployment Considerations

### Frontend (Vite + React)
- Build: `npm run build`
- Deploy to: Vercel, Netlify, AWS S3 + CloudFront
- Configure environment variables in hosting platform

### Backend (Spring Boot)
- Build: `mvn clean package`
- Deploy to: AWS EC2, Heroku, DigitalOcean
- Set up MySQL database in production

### Database (MySQL)
- Use managed service: AWS RDS, Google Cloud SQL, DigitalOcean Managed Databases
- Set up proper backups and security

## Summary

✅ **Your current UI is 100% compatible with React + TypeScript + Vite + Tailwind CSS**

✅ **All components can easily integrate with Axios for API calls**

✅ **The data structures align perfectly with Spring Boot + MySQL backend**

✅ **Authentication flow (logout button) is already prepared for JWT integration**

✅ **The responsive design works across all devices**

The main work ahead is:
1. Setting up the Spring Boot backend with the required endpoints
2. Creating the MySQL database schema
3. Replacing mock data with Axios API calls
4. Implementing authentication with JWT
5. Adding error handling and loading states
6. Testing the full integration

This is a very standard and production-ready tech stack. Many enterprise applications use this exact combination!
