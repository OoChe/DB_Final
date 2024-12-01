CREATE TABLE Ranking (
    RankingNum INT AUTO_INCREMENT NOT NULL,        -- 순위
    RegionName VARCHAR(100) NOT NULL,     -- 지역명
    cityName varchar(20) not null,
    PRIMARY KEY (RankingNum, RegionName)     -- 순위와 지역명으로 복합 기본키 설정
);

SELECT Region, eventTitle, eventDate, eventImageURL
                      FROM Event
                      WHERE Region IN (SELECT cityName FROM Ranking ORDER BY RankingNum)
                      ORDER BY eventDate