// Router/index.js
const express = require('express');
// const userRoutes = require('./user');
// const authRoutes = require('./auth');
// const eventRoutes = require('./events');
const hotelRoutes = require('./hotel');

const router = express.Router();

// 각 기능별 라우터 연결
// router.use('/user', userRoutes); // 사용자 관련 API
// router.use('/auth', authRoutes);
// router.use('/events', eventRoutes);
router.use('/hotel', hotelRoutes);

module.exports = router;
