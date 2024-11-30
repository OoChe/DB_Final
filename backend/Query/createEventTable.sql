DROP TABLE Event;
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