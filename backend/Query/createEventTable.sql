create table Event (
    AutoID INT AUTO_INCREMENT PRIMARY KEY,
    EventID VARCHAR(10) NOT NULL UNIQUE,
    EventTitle VARCHAR(100) NOT NULL,
    EventSubtitle VARCHAR(100),
    Region VARCHAR(20) NOT NULL DEFAULT '서울',
    EventDate DATE,
    Address VARCHAR(255),
    AvgRating DECIMAL(2, 1),
    EventDescription text,
    EventURL text,
    ImgUrl VARCHAR(255),
    CONSTRAINT CHK_EventID_Format CHECK (EventID REGEXP '^E[0-9]{6}$')
);

INSERT INTO Event (EventID, EventTitle, EventSubtitle, Region, EventDate, Address, AvgRating, EventDescription, EventURL)
VALUES (
        CONCAT('E', LPAD(AutoID + 1, 6, '0')),
        '행사 제목',
        '행사 부제목',
        '부산',
        '2024-10-19',
        '부산광역시 해운대구',
        4.3,
        '행사 설명',
        'https://www.busan.go.kr'
       )
-- 이벤트 리뷰 테이블
CREATE TABLE EventReview (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY, -- 후기 고유 ID
    UserID VARCHAR(20) NOT NULL,                     -- 작성자 ID
    EventID INT NOT NULL,
    Rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5), -- 별점 (1~5)
    Content TEXT NOT NULL,                    -- 후기 내용
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 작성 날짜 (그냥 추가해봄.. 빼도 됨)
    FOREIGN KEY (UserID) REFERENCES User(UserID)
        ON DELETE CASCADE                     -- 사용자 삭제 시 해당 후기도 삭제
        On UPDATE CASCADE   ,                  -- 사용자 아이디 업데이트 시 업데이트
    FOREIGN KEY (EventID) REFERENCES Event(EventID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

SELECT e.EventID, e.EventTitle, e.EventSubtitle, e.Region, e.EventDate, e.Address, e.EventDescription, e.EventURL, COALESCE(ROUND(AVG(r.Rating), 2), 0) AS AvgRating, COUNT(r.ReviewID) AS ReviewCount FROM Event e LEFT JOIN EventReview r ON e.EventID = r.EventID WHERE e.EventID = ?;