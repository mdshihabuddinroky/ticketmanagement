// routes/index.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dashboardRoutes = require('./dashboard'); // Import dashboardRoutes
const authRoutes = require('./auth'); // Assuming you have separate auth routes

router.get('/routes', dashboardRoutes.getRoutes);
router.get('/buses/:routeId', dashboardRoutes.getBusesForRoute);
router.get('/seats/:busId', dashboardRoutes.getSeatsForBus);
router.post('/purchase', dashboardRoutes.purchaseTicket);
router.use('/auth', authRoutes);

module.exports = router;
