const { fetchHotelList, fetchHotelById } = require('../Models/hotelModel');

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

module.exports = { getHotels, getHotelDetails };
