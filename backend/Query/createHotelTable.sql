CREATE TABLE Hotel (
    AutoID INT AUTO_INCREMENT PRIMARY KEY, -- 내부 숫자 관리용
    hotelID VARCHAR(10) NOT NULL UNIQUE,   -- 실제 호텔 ID (h + 숫자)
    hotelName VARCHAR(100) NOT NULL,
    hotelRegion VARCHAR(50) NOT NULL,
    hotelAddress VARCHAR(255),
    hotelPrice DECIMAL(10, 2) NOT NULL,
    hotelOwnerID VARCHAR(20),
    FOREIGN KEY (hotelOwnerID) REFERENCES User(userID),
    CONSTRAINT CHK_HotelID_Format CHECK (HotelID REGEXP '^H[0-9]{6}$') -- 형식 검증
);
-- 관광지, 명소 정보 테이블
CREATE TABLE TouristSpot (
  SpotID INT AUTO_INCREMENT PRIMARY KEY,
  SpotName VARCHAR(100) NOT NULL
);
-- 호텔 주변의 관광지 정보 테이블
CREATE TABLE Hotel_TouristSpot (
  HotelID VARCHAR(10),
  SpotID INT,
  PRIMARY KEY (HotelID, SpotID),
  FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID),
  FOREIGN KEY (SpotID) REFERENCES TouristSpot(SpotID)
);
-- 숙소 예약 테이블
CREATE TABLE Reservation (
    reserveID INT PRIMARY KEY AUTO_INCREMENT,
    hotelID VARCHAR(10),
    reserveDate DATE NOT NULL,
    reservePeriod INT NOT NULL, -- 예약 기간 (일 단위)
    reserveNum INT NOT NULL,   -- 예약 인원
    userID VARCHAR(20),
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);
-- 호텔 데이터 생성
INSERT INTO Hotel (HotelID, HotelName, hotelRegion, hotelAddress, hotelPrice, hotelOwnerID)
VALUES (
    CONCAT('H', LPAD(AutoID + 1, 6, '0')), -- ID 생성 규칙: h + 숫자 6자리
    'E호텔',
    '서울',
    '서울특별시 서초구 반포대로18길 40 E 호텔',
    120000,
    'dongguki'
);
-- 평균 후기 값 가져오는 쿼리문
    SELECT h.hotelID, h.hotelName, AVG(r.rateInfo) AS hotelRate
FROM Hotel h
LEFT JOIN Review r ON h.hotelID = r.hotelID
GROUP BY h.hotelID, h.hotelName;

