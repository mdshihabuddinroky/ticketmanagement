-- Inserting users
INSERT INTO User (Username, Password, Email, FullName, Address, PhoneNumber, UserType)
VALUES 
    ('admin', 'admin123', 'admin@example.com', 'Admin User', 'Admin Address', '1234567890', 'Admin'),
    ('user1', 'user123', 'user1@example.com', 'User One', 'User One Address', '9876543210', 'User'),
    ('user2', 'user123', 'user2@example.com', 'User Two', 'User Two Address', '9876543211', 'User');

-- Inserting routes
INSERT INTO Route (Source, Destination, Distance, Duration)
VALUES 
    ('Source1', 'Destination1', 100, '04:00:00'),
    ('Source2', 'Destination2', 200, '06:00:00'),
    ('Source3', 'Destination3', 150, '05:00:00');

-- Inserting buses
INSERT INTO Bus (BusNumber, BusType, TotalSeats)
VALUES 
    ('Bus1', 'AC', 50),
    ('Bus2', 'Non-AC', 40),
    ('Bus3', 'Semi-AC', 30);

-- Inserting bus routes
INSERT INTO BusRoute (BusID, RouteID, DepartureTime)
VALUES 
    (1, 1, '08:00:00',50),
    (2, 2, '09:00:00',100),
    (3, 3, '10:00:00',150);

-- Inserting seats
INSERT INTO Seat (BusRouteID, SeatNumber)
VALUES 
    (1, 'A1'), (1, 'A2'), (1, 'A3'), (1, 'A4'), (1, 'A5'), 
    (1, 'B1'), (1, 'B2'), (1, 'B3'), (1, 'B4'), (1, 'B5'), 
    (2, 'A1'), (2, 'A2'), (2, 'A3'), (2, 'A4'), (2, 'A5'), 
    (2, 'B1'), (2, 'B2'), (2, 'B3'), (2, 'B4'), (2, 'B5'), 
    (3, 'A1'), (3, 'A2'), (3, 'A3'), (3, 'A4'), (3, 'A5'), 
    (3, 'B1'), (3, 'B2'), (3, 'B3'), (3, 'B4'), (3, 'B5'), 
    (1, 'C1'), (1, 'C2'), (1, 'C3'), (1, 'C4'), (1, 'C5'), 
    (1, 'D1'), (1, 'D2'), (1, 'D3'), (1, 'D4'), (1, 'D5'), 
    (2, 'C1'), (2, 'C2'), (2, 'C3'), (2, 'C4'), (2, 'C5'), 
    (2, 'D1'), (2, 'D2'), (2, 'D3'), (2, 'D4'), (2, 'D5');

-- Purchasing tickets
-- Calculate total ticket price
SELECT SUM(BusRoute.SeatPrice) AS TotalPrice
FROM Seat
INNER JOIN BusRoute ON Seat.BusRouteID = BusRoute.BusRouteID
WHERE Seat.SeatID IN (1, 2, 6, 7); -- Assuming SeatIDs are selected

-- Purchase ticket
INSERT INTO Ticket (UserID, BusRouteID, TicketDate, Price)
VALUES 
    (1, 1, CURDATE(), (SELECT SUM(BusRoute.SeatPrice) FROM Seat INNER JOIN BusRoute ON Seat.BusRouteID = BusRoute.BusRouteID WHERE SeatID IN (1, 2, 6, 7)));

-- Add seats to TicketSeat table
INSERT INTO TicketSeat (TicketID, SeatID)
VALUES 
    (LAST_INSERT_ID(), 1), (LAST_INSERT_ID(), 2), (LAST_INSERT_ID(), 6), (LAST_INSERT_ID(), 7); -- Assuming TicketID is generated automatically and SeatIDs are selected

-- Update seat availability
UPDATE Seat
SET IsBooked = TRUE
WHERE SeatID IN (1, 2, 6, 7); -- Assuming SeatIDs are selected
