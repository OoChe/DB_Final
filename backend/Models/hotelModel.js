const db = require('../Configs/db');

// hotelOwnerID와 userID를 연결하여 hotelID, hotelName, hotelRegion, userName을 가져오는 함수
const fetchHotelList = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        Hotel.hotelID, 
        Hotel.hotelName, 
        Hotel.hotelRegion, 
        User.userName
      FROM Hotel
      LEFT JOIN User
      ON Hotel.hotelOwnerID = User.userID;
    `;
    db.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// 특정 호텔의 상세 정보를 가져오는 함수
const fetchHotelById = (hotelID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
    h.hotelID, 
    h.hotelName, 
    h.hotelRegion, 
    h.hotelAddress, 
    h.hotelPrice, 
    u.userName AS hotelOwnerName, 
    AVG(r.Rating) AS hotelRate
FROM Hotel h
LEFT JOIN User u 
    ON h.hotelOwnerID = u.userID
LEFT JOIN HotelReview r 
    ON h.hotelID = r.hotelID
WHERE h.hotelID = ?
GROUP BY 
    h.hotelID, 
    h.hotelName, 
    h.hotelRegion, 
    h.hotelAddress, 
    h.hotelPrice, 
    h.hotelOwnerID, 
    u.userName;

    `;
    db.query(query, [hotelID], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]); // 상세 정보는 단일 레코드로 반환
    });
  });
};

module.exports = { fetchHotelList, fetchHotelById };