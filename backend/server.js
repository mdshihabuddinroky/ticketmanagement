// server.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
