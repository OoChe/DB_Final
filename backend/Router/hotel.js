const express = require('express');
const {
  getHotels,
  getHotelDetails,
  makeReservation,
  getHotelReviewsController,
  addHotelReview,
} = require('../Configs/hotelController');

const router = express.Router();

// 숙소 목록 API
router.get('/', getHotels);
// 숙소 상세 정보 API
router.get('/:hotelID', getHotelDetails);
// 예약 요청 처리
router.post('/:hotelID/reserve', makeReservation);
router.get('/reviews/:hotelID', getHotelReviewsController);
// 리뷰 작성 라우트
router.post('/review', addHotelReview);

module.exports = router;
