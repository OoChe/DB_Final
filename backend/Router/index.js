// Router/index.js
const express = require('express');
const authRoutes = require('./auth');
const eventRoutes = require('./events');
const accommodationRoutes = require('./accommodations');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/accommodations', accommodationRoutes);

module.exports = router;
