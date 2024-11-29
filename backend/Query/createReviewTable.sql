CREATE TABLE HotelReview (
    reviewID INT PRIMARY KEY AUTO_INCREMENT,
    hotelID VARCHAR(10),
    userID VARCHAR(20),
    reviewInfo TEXT,
    rateInfo INT CHECK (rateInfo BETWEEN 1 AND 5),
    FOREIGN KEY (hotelID) REFERENCES Hotel(hotelID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);