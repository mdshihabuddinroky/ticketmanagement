// routes/dashboard.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/routes', dashboardController.getRoutes);
router.get('/buses/:routeId', dashboardController.getBusesForRoute);
router.get('/seats/:busId', dashboardController.getSeatsForBus);
router.post('/purchase', dashboardController.purchaseTicket);

module.exports = router;
