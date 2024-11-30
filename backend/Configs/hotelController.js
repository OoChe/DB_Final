const { fetchHotelList, fetchHotelById } = require('../Models/hotelModel');
const { saveReservation } = require('../Models/hotelModel');

const getHotels = async (req, res) => {
  try {
    const results = await fetchHotelList();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
};

// 호텔의 상세 정보를 처리하는 컨트롤러
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

// 호텔 예약 정보 보내기
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

module.exports = { getHotels, getHotelDetails, makeReservation };
