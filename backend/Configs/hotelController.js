const { fetchHotelList, fetchHotelById } = require('../Models/hotelModel');
const { saveReservation } = require('../Models/hotelModel');
const {
  getHotelRatingAndCount,
  getHotelReviews,
} = require('../Models/hotelModel');
const { insertHotelReview } = require('../Models/hotelModel');

// 숙소 목록 정보를 처리하는 컨트롤러
const getHotels = async (req, res) => {
  try {
    const results = await fetchHotelList();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
};

// 숙소 상세 정보를 처리하는 컨트롤러
const getHotelDetails = async (req, res) => {
  const { hotelID } = req.params; // 프론트에서 보내준 hotelID

  if (!hotelID) {
    return res.status(400).json({ error: 'hotelID is required' });
  }

  try {
    const hotelDetails = await fetchHotelById(hotelID);
    if (hotelDetails) {
      res.status(200).json(hotelDetails);
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 숙소 예약 정보 보내기
const makeReservation = async (req, res) => {
  const { hotelID, checkInDate, checkOutDate, reserveNum, userID } = req.body;

  if (!hotelID || !checkInDate || !checkOutDate || !reserveNum || !userID) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    saveReservation(
      hotelID,
      checkInDate,
      checkOutDate,
      reserveNum,
      userID,
      (err, results) => {
        if (err) {
          console.error('예약 실패:', err);
        } else {
          console.log('예약 성공:', results);
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '예약 중 오류가 발생했습니다.' });
  }
};

// 숙소 리뷰 보기
const getHotelReviewsController = async (req, res) => {
  const hotelID = req.params;

  console.log('Hotel Review 백엔드 호출', hotelID);

  if (!hotelID) {
    return res.status(400).json({ error: 'hotelID is required' });
  }

  try {
    // 평균 평점과 리뷰 수 가져오기
    const { AvgRating: avgRating, ReviewCount: reviewCount } =
      await getHotelRatingAndCount(hotelID);

    // 리뷰 리스트 가져오기
    const reviews = await getHotelReviews(hotelID);

    if (reviews.length > 0) {
      res.status(200).json({
        avgRating,
        reviewCount,
        results: reviews,
      });
      console.log('Hotel reviews:', reviews);
    } else {
      res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('Error fetching hotel reviews:', err);
    res.status(500).json({ error: '서버 오류' });
  }
};

// 숙소 리뷰 작성 컨트롤러
const addHotelReview = (req, res) => {
  const { userID, id, rating, content } = req.body;

  // 필수 값 확인
  if (!userID || !id || !rating || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 모델 호출
  reviewModel.insertHotelReview(userID, id, rating, content, (err, result) => {
    if (err) {
      console.error('Error inserting review:', err);
      return res.status(500).send('Error inserting review');
    }

    res.status(201).json({ message: 'Review added successfully' });
  });
};

module.exports = {
  getHotels,
  getHotelDetails,
  makeReservation,
  getHotelReviewsController,
  addHotelReview,
};
