// server.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import your main routes
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes); // Use your main routes
// Add the following line to use dashboard routes
app.use('/api', require('./routes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
