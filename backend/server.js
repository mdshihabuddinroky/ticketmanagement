// server.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const dashboardRoutes = require('./routes/dashboard');
const ticketRoutes = require('./routes/tickets'); // Import ticket routes
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tickets', ticketRoutes); // Use ticket routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
