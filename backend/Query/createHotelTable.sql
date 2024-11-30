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
    reserveID INT PRIMARY KEY AUTO_INCREMENT, -- 예약 ID
    hotelID VARCHAR(10) NOT NULL,             -- 숙소 ID
    checkInDate DATE NOT NULL,                -- 체크인 날짜
    checkOutDate DATE NOT NULL,               -- 체크아웃 날짜
    reserveNum INT NOT NULL,                  -- 예약 인원
    userID VARCHAR(20) NOT NULL,              -- 예약한 사용자
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- 호텔 데이터 생성
INSERT INTO Hotel (HotelName, hotelRegion, hotelAddress, hotelPrice, hotelOwnerID)
VALUES (
    'E호텔',
    '서울',
    '서울특별시 서초구 반포대로18길 40 E 호텔',
    120000,
    'dongguki'
), (
    'JS호텔분당',
    '경기',
    '경기도 성남시 분당구 황새울로311번길 36',
    210000,
    'dongguki'
), (
    '로얄엠포리움호텔',
    '인천',
    '인천광역시 중구 중산동 1951-5',
    110000,
    'dongguki'
), (
    '나인트리프리미어호텔명동2',
    '서울',
    '서울특별시 중구 마른내로 28',
    140000,
    'dongguki'
), (
    '라마다앙코르제주서귀포',
    '제주',
    '제주특별자치도 서귀포시 서호중로 55',
    180000,
    'dongguki'
), (
    '밸류호텔월드와이드부산',
    '부산',
    '부산광역시 영도구 대교동1가 40	',
    280000,
    'dongguki'
);
-- 트리거를 활용한 자동 호텔 값 생성
DELIMITER $$

CREATE TRIGGER generate_hotelID
BEFORE INSERT ON Hotel
FOR EACH ROW
BEGIN
    -- AutoID 대신 서브쿼리를 통해 현재 테이블의 최대 ID를 기반으로 hotelID 생성
    DECLARE nextID INT;

    -- 현재 테이블에서 AutoID의 최대값 + 1 계산
    SELECT IFNULL(MAX(AutoID), 0) + 1 INTO nextID FROM Hotel;

    -- hotelID를 생성하여 NEW.hotelID에 할당
    SET NEW.hotelID = CONCAT('H', LPAD(nextID, 6, '0'));
END$$

DELIMITER ;