// Router/index.js
const express = require('express');
const hotelRoutes = require('./hotel');
const router = express.Router();

// 각 기능별 라우터 연결
router.use('/hotel', hotelRoutes);

module.exports = router;
