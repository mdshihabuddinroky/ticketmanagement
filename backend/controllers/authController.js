const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db');
const router = express.Router();

// Load JWT secret key from .env file
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Login
router.post('/login', (req, res) => {
  const { mobileNumber, password } = req.body;

  connection.query(
    'SELECT * FROM User WHERE PhoneNumber = ?',
    [mobileNumber],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Mobile number not registered' });
      }

      const user = results[0];
      bcrypt.compare(password, user.Password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!result) {
          return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ userId: user.UserID }, JWT_SECRET);
        res.status(200).json({ token, userId: user.UserID });
      });
    }
  );
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, email, fullName, address, mobileNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(
      'INSERT INTO User (Username, Password, Email, FullName, Address, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, email, fullName, address, mobileNumber],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;