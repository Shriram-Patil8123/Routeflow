# RouteFlow - Logistics Management System

RouteFlow is a full-stack logistics management system developed to manage orders, shipments, warehouses, delivery partners, and shipment tracking events.

## Features

- Dashboard with logistics statistics
- Order management
- Shipment management
- Shipment tracking events
- Warehouse management
- Delivery partner management
- Assign delivery partners to shipments
- CRUD operations for major modules
- REST APIs using Spring Boot
- MySQL database integration
- React frontend

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

### Database
- MySQL

## Project Structure

RouteFlow/
- backend/
- frontend/
- database/
- docs/

## Main Modules

### Orders
Create, view, update and delete customer orders.

### Shipments
Manage shipment details including tracking number, order, warehouse, delivery partner and estimated delivery.

### Tracking Events
Track shipment status updates with location, description and event time.

### Warehouses
Manage warehouse location, capacity and current stock.

### Delivery Partners
Manage delivery partner details including phone, email, vehicle and availability status.

## API Endpoints

### Orders

GET /api/orders

POST /api/orders

PUT /api/orders/{id}

DELETE /api/orders/{id}

### Shipments

GET /api/shipments

POST /api/shipments

PUT /api/shipments/{id}

DELETE /api/shipments/{id}

### Warehouses

GET /api/warehouses

POST /api/warehouses

PUT /api/warehouses/{id}

DELETE /api/warehouses/{id}

### Delivery Partners

GET /api/delivery-partners

POST /api/delivery-partners

PUT /api/delivery-partners/{id}

DELETE /api/delivery-partners/{id}

### Tracking Events

GET /api/tracking-events

POST /api/tracking-events

GET /api/tracking-events/{id}

GET /api/tracking-events/shipment/{shipmentId}

PUT /api/tracking-events/{id}

DELETE /api/tracking-events/{id}

## How to Run the Project

### Backend

1. Make sure MySQL is running.
2. Create a database named `routeflow`.
3. Configure your local database credentials in:

backend/src/main/resources/application.properties

4. Open the backend folder in the terminal.

5. Run:

mvn spring-boot:run

The backend runs on:

http://localhost:8080

### Frontend

Open another terminal and run:

cd frontend

npm install

npm run dev

The frontend runs on:

http://localhost:5173

## Database

The application uses MySQL for storing:

- Users
- Orders
- Order Items
- Products
- Shipments
- Tracking Events
- Warehouses
- Delivery Partners

## Project Architecture

React Frontend
        |
        | REST API
        ↓
Spring Boot Backend
        |
        | JPA / Hibernate
        ↓
MySQL Database

## Future Improvements

- User authentication
- Role-based access
- Better shipment tracking
- Cloud deployment
- Advanced reporting and analytics

## Author

Shriram Patil

B.E. Computer Science and Engineering