const express = require('express');
const { getHotels, getHotelDetails } = require('../Configs/hotelController');

const router = express.Router();

// 숙소 목록 API
router.get('/', getHotels);
// 숙소 상세 정보 API
router.get('/:hotelID', getHotelDetails);

module.exports = router;
