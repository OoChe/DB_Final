create table Event (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    EventTitle VARCHAR(100) NOT NULL,
    EventSubtitle VARCHAR(100),
    Region VARCHAR(20) NOT NULL DEFAULT '서울',
    EventDate DATE,
    Address VARCHAR(255),
    AvgRating DECIMAL(2, 1),
    EventDescription text,
    EventURL text
);
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