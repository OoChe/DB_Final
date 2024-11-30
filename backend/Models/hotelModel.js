const db = require('../Configs/db');

// hotelOwnerID와 userID를 연결하여 hotelID, hotelName, hotelRegion, userName을 가져오는 함수
const fetchHotelList = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      h.hotelID,
      h.hotelName,
      h.hotelRegion,
      ROUND(IFNULL(AVG(r.Rating), 0), 1) AS hotelRate,
      u.UserName
    FROM Hotel h
    LEFT JOIN User u ON h.hotelOwnerID = u.userID
    LEFT JOIN HotelReview r ON h.hotelID = r.hotelID
    GROUP BY h.hotelID, h.hotelName, h.hotelRegion, u.UserName;
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
    const query = `
    SELECT
      h.hotelID,
      h.hotelName,
      h.hotelRegion,
      h.hotelAddress,
      h.hotelPrice,
      u.userName AS hotelOwnerName,
      ROUND(IFNULL(AVG(r.Rating), 0), 1) AS hotelRate,
      GROUP_CONCAT(DISTINCT ts.SpotName) AS tourspot -- 관광지 이름을 ','로 연결하여 반환
    FROM Hotel h
    LEFT JOIN User u
      ON h.hotelOwnerID = u.userID
    LEFT JOIN HotelReview r
      ON h.hotelID = r.hotelID
    LEFT JOIN hotel_touristspot hts
      ON h.hotelID = hts.HotelID
    LEFT JOIN touristspot ts
      ON hts.SpotID = ts.SpotID
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

// 예약 정보 저장 쿼리 함수
const saveReservation = async (
  hotelID,
  checkInDate,
  checkOutDate,
  reserveNum,
  userID
) => {
  const query = `
    INSERT INTO Reservation (hotelID, checkInDate, checkOutDate, reserveNum, userID)
    VALUES (?, ?, ?, ?, ?)
  `;

  await db.query(query, [
    hotelID,
    checkInDate,
    checkOutDate,
    reserveNum,
    userID,
  ]);
};

module.exports = { fetchHotelList, fetchHotelById, saveReservation };
