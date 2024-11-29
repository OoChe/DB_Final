CREATE TABLE Hotel (
    AutoID INT AUTO_INCREMENT PRIMARY KEY, -- 내부 숫자 관리용
    HotelID VARCHAR(10) NOT NULL UNIQUE,   -- 실제 호텔 ID (h + 숫자)
    HotelName VARCHAR(100) NOT NULL,
    Region VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    AvgRating DECIMAL(2, 1),
    OwnerID VARCHAR(10),
    CONSTRAINT CHK_HotelID_Format CHECK (HotelID REGEXP '^H[0-9]{6}$') -- 형식 검증
);
INSERT INTO Hotel (HotelID, HotelName, Region, Address, AvgRating, OwnerID)
VALUES (
    CONCAT('H', LPAD(AutoID + 1, 6, '0')), -- ID 생성 규칙: h + 숫자 6자리
    'E호텔',
    '서울',
    '서울특별시 서초구 반포대로18길 40 E 호텔',
    4.5,
    ''
);
select * from Hotel;