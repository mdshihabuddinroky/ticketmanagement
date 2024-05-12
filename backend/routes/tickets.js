// routes/tickets.js

const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get ticket details including bus number and seat number
router.get('/details/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  connection.query(
    `SELECT Ticket.TicketID, Ticket.UserID, Ticket.BusRouteID, Ticket.TicketDate, Ticket.Price, 
    Bus.BusNumber, GROUP_CONCAT(Seat.SeatNumber) AS SeatNumber, Route.Source, Route.Destination, BusRoute.DepartureTime
    FROM Ticket
    INNER JOIN TicketSeat ON Ticket.TicketID = TicketSeat.TicketID
    INNER JOIN Seat ON TicketSeat.SeatID = Seat.SeatID
    INNER JOIN BusRoute ON Ticket.BusRouteID = BusRoute.BusRouteID
    INNER JOIN Bus ON BusRoute.BusID = Bus.BusID
    INNER JOIN Route ON BusRoute.RouteID = Route.RouteID
    WHERE Ticket.TicketID = ?
    GROUP BY Ticket.TicketID`,
    [ticketId],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json(results[0]);
    }
  );
});

// Get tickets for a specific user
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  connection.query(
    `SELECT DISTINCT Ticket.TicketID, Ticket.UserID, Ticket.BusRouteID, Ticket.TicketDate, Ticket.Price, 
    Bus.BusNumber, GROUP_CONCAT(Seat.SeatNumber) AS SeatNumber, Route.Source, Route.Destination, BusRoute.DepartureTime
    FROM Ticket
    INNER JOIN TicketSeat ON Ticket.TicketID = TicketSeat.TicketID
    INNER JOIN Seat ON TicketSeat.SeatID = Seat.SeatID
    INNER JOIN BusRoute ON Ticket.BusRouteID = BusRoute.BusRouteID
    INNER JOIN Bus ON BusRoute.BusID = Bus.BusID
    INNER JOIN Route ON BusRoute.RouteID = Route.RouteID
    WHERE Ticket.UserID = ?
    GROUP BY Ticket.TicketID`,
    [userId],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(200).json(results);
    }
  );
});

module.exports = router;
