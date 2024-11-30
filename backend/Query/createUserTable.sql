CREATE TABLE User (
    AutoID INT AUTO_INCREMENT PRIMARY KEY,
    UserID VARCHAR(20) NOT NULL UNIQUE,
    Password VARCHAR(20) NOT NULL,
    UserName VARCHAR(10) NOT NULL,
    UserBirth Date,
    UserPhone VARCHAR(20),
    UserGrade ENUM('customer', 'manager', 'owner') DEFAULT 'customer'
);
INSERT INTO User (UserID, Password, UserName, UserBirth, UserPhone, UserGrade)
VALUES ('dongguki', '1234', '동국이', '2000-05-15', '010-1234-5678', 'customer');

-- 즐겨찾기 테이블
CREATE TABLE Bookmark (
    BookmarkID INT AUTO_INCREMENT PRIMARY KEY,
    UserID VARCHAR(20) NOT NULL,
    EventID VARCHAR(10),
    HotelID VARCHAR(10),
    FOREIGN KEY (UserID) REFERENCES User(UserID) -- 사용자 테이블과의 관계 설정
        ON DELETE CASCADE                     -- 사용자 삭제 시 해당 후기도 삭제
        On UPDATE CASCADE,
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);