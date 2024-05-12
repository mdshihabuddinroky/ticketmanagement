// controllers/dashboardController.js

const connection = require('../db');

const dashboardController = {
  getRoutes: (req, res) => {
    connection.query('SELECT * FROM Route', (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.json(results);
    });
  },

  getBusesForRoute: (req, res) => {
    const { routeId } = req.params;
    connection.query(
      `SELECT Bus.BusID, Bus.BusNumber, BusRoute.DepartureTime
       FROM Bus
       INNER JOIN BusRoute ON Bus.BusID = BusRoute.BusID
       WHERE BusRoute.RouteID = ?`,
      [routeId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
      }
    );
  },

  getSeatsForBus: (req, res) => {
    const { busId } = req.params;
    connection.query(
      `SELECT Seat.SeatID, Seat.SeatNumber
       FROM Seat
       INNER JOIN BusRoute ON Seat.BusRouteID = BusRoute.BusRouteID
       WHERE BusRoute.BusID = ? AND Seat.IsBooked = FALSE`,
      [busId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
      }
    );
  },

  purchaseTicket: async (req, res) => {
    const { userId, seatIds } = req.body;

    try {
      const totalPriceResult = await new Promise((resolve, reject) => {
        connection.query(
          `SELECT SUM(BusRoute.SeatPrice) AS TotalPrice
           FROM Seat
           INNER JOIN BusRoute ON Seat.BusRouteID = BusRoute.BusRouteID
           WHERE Seat.SeatID IN (?)`,
          [seatIds],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].TotalPrice);
            }
          }
        );
      });

      const ticketResult = await new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO Ticket (UserID, BusRouteID, TicketDate, Price)
           VALUES (?, ?, CURDATE(), ?)`,
          [userId, 1, totalPriceResult], // Assuming BusRouteID is 1
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results.insertId);
            }
          }
        );
      });

      await new Promise((resolve, reject) => {
        const values = seatIds.map(seatId => `(${ticketResult}, ${seatId})`).join(',');
        connection.query(
          `INSERT INTO TicketSeat (TicketID, SeatID)
           VALUES ${values}`,
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });

      await new Promise((resolve, reject) => {
        connection.query(
          `UPDATE Seat
           SET IsBooked = TRUE
           WHERE SeatID IN (?)`,
          [seatIds],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });

      res.json({ message: 'Ticket purchased successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = dashboardController;
