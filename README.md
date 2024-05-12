

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


## Project Screenshots
# Login screen
![Screenshot 2024-05-13 at 12 25 05 AM](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/176103da-f37e-43b5-adee-e311c5a2813f)
# Register screen

![Login Screen](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/68ea4709-44b2-49f2-a7a3-bcf61ff0113b)
# Dashboard for ticket purchase
![Screenshot 2024-05-13 at 12 26 16 AM](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/bb6814b6-2f4b-4c88-b952-a161c0d59e02)
# Select Route, Bus, Seat
![Screenshot 2024-05-13 at 12 26 32 AM](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/b1823cae-1bec-4cc0-a641-d1d22eb26497)
![Screenshot 2024-05-13 at 12 26 43 AM](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/4d1ec8f4-3553-4a7c-95be-ef5e07d8fe4f)

![Screenshot 2024-05-13 at 12 28 48 AM](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/236669bc-905f-4790-9464-07122d6dd5cc)

# My Tickets
![Screenshot 2024-05-13 at 12 29 00 AM](https://github.com/mdshihabuddinroky/ticketmanagement/assets/99485727/96471d21-7cb8-4906-b824-c9f693c2ef7b)







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
- [Md. SHihab Uddin Roky](https://github.com/mdshihabuddinroky)
- [Md. SHihab Uddin Roky](https://github.com/nooraalam1)

## License
This project is licensed under the [MIT License](LICENSE).
