# Backend-Evaluation-2-Rental-Car-
**Car Rental Management System - Frontend**
This repository contains the backend implementation of a car rental management system built using Node.js with Express.js and MongoDB as the database.

**Features**
**User Roles**

**_Two user roles: Manager and User._**

**User Authentication**       

Users can create an account and log in.

**Car Profile Information**

Each car includes:
- Name
- Model
- Color

**Availability status**

# Manager Functionalities

**Car Management**

CRUD operations for Cars.

**User and Manager Management**

CRUD operations for Users and Managers.
**Reservation Details**

- View all users who reserved a car with the reservation period.
- View all cars reserved by a user with the reservation period.
# User Functionalities
**Car Availability**

View a list of all available cars for specific dates.

**Car Filtering**

Filter available cars by model, color, or name.

**Reservation**

Reserve a car for a specific period.

**Reservation Cancellation**

Cancel a reservation.

**Tech Stack**

- Front-end: Vue.js
- Back-end: Node.js with Express.js
- Database: MongoDB
# Getting Started

1. Clone the repository: git clone https://github.com/TalalAhmad786/Rental-Car-Application-FrontEnd-.git
2. Install dependencies: npm install
3. Configure MongoDB connection in .env file.
4. Run the application: npm start

**Code Structure**
  
- The project follows a modular structure for components, views, and services.
- Clear separation of concerns for improved maintainability.

**Security**

- Basic security measures are implemented to protect user data and authentication.
- Ensure that sensitive information is properly handled.
**Documentation**
  
Refer to the frontend repository for detailed documentation on setting up the entire application.
