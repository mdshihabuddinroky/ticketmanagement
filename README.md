

```
# Ticket Management System

This project is a Ticket Management System designed to facilitate the online booking of bus tickets. It provides users with a convenient platform to browse available routes, select buses, choose seats, purchase tickets, and view their booked tickets.

## Features

### Frontend Features:
- User Registration and Login: Users can create accounts and log in securely.
- Browse Routes: Users can view available bus routes.
- Select Route: Users can select their desired route from the available options.
- Choose Bus: Users can choose a bus for their selected route.
- Select Seats: Users can select seats for their journey.
- Purchase Tickets: Users can purchase tickets for their selected route and seats.
- View My Tickets: Users can view their purchased tickets.

### Backend Features:
- User Authentication: Secured user authentication and authorization.
- Route Management: CRUD operations for managing bus routes.
- Bus Management: CRUD operations for managing buses.
- Seat Management: CRUD operations for managing bus seats.
- Ticket Management: CRUD operations for managing user tickets.

## Database Schema

### Users Table:
   - UserID (Primary Key)
   - Username
   - Password
   - Email
   - FullName
   - Address
   - PhoneNumber
   - UserType (Enum: 'Admin', 'User')

### Routes Table:
   - RouteID (Primary Key)
   - Source
   - Destination
   - Distance
   - Duration

### Buses Table:
   - BusID (Primary Key)
   - BusNumber
   - BusType
   - TotalSeats

### BusRoute Table:
   - BusRouteID (Primary Key)
   - BusID (Foreign Key referencing Buses)
   - RouteID (Foreign Key referencing Routes)
   - DepartureTime
   - SeatPrice

### Seats Table:
   - SeatID (Primary Key)
   - BusRouteID (Foreign Key referencing BusRoute)
   - SeatNumber
   - IsBooked

### Tickets Table:
   - TicketID (Primary Key)
   - UserID (Foreign Key referencing Users)
   - BusRouteID (Foreign Key referencing BusRoute)
   - TicketDate
   - Price

### TicketSeat Table:
   - TicketSeatID (Primary Key)
   - TicketID (Foreign Key referencing Tickets)
   - SeatID (Foreign Key referencing Seats)

## Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL

## How to Run

### Prerequisites
- Node.js installed on your machine
- MySQL database server installed and running

### Steps
1. Clone the repository: `git clone https://github.com/your-username/ticket-management.git`
2. Navigate to the project directory: `cd ticket-management`
3. Install dependencies:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Set up the database:
   - Create a MySQL database named `ticket_management`
   - Import the database schema from `database.sql` file
5. Configure backend:
   - Rename `.env.example` to `.env`
   - Update `.env` file with your database credentials
6. Start the backend server: `npm start` (inside the backend directory)
7. Start the frontend development server: `npm start` (inside the frontend directory)
8. Open your browser and visit: `http://localhost:3000`

## Contributors
- [Your Name](https://github.com/mdshihabuddinroky)

## License
This project is licensed under the [MIT License](LICENSE).
```