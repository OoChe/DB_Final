CREATE TABLE Hotel (
    hotelID INT AUTO_INCREMENT NOT NULL,           -- 내부 숫자 관리용, AUTO_INCREMENT로 사용
    hotelName VARCHAR(100) NOT NULL,
    hotelRegion VARCHAR(50) NOT NULL,
    hotelAddress VARCHAR(255),
    hotelPrice DECIMAL(10, 2) NOT NULL,
    hotelOwnerID VARCHAR(20),
    PRIMARY KEY (hotelID),               -- hotelID를 기본키로 설정
    FOREIGN KEY (hotelOwnerID) REFERENCES User(userID)
);

-- 관광지, 명소 정보 테이블
CREATE TABLE TouristSpot (
  SpotID INT AUTO_INCREMENT PRIMARY KEY,
  SpotName VARCHAR(100) NOT NULL
);

-- 호텔 주변의 관광지 정보 테이블
CREATE TABLE Hotel_TouristSpot (
  HotelID INT not null,
  SpotID INT,
  PRIMARY KEY (HotelID, SpotID),
  FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID),
  FOREIGN KEY (SpotID) REFERENCES TouristSpot(SpotID)
);
-- 숙소 예약 테이블
CREATE TABLE Reservation (
    reserveID INT PRIMARY KEY AUTO_INCREMENT, -- 예약 ID
    hotelID INT NOT NULL,             -- 숙소 ID
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