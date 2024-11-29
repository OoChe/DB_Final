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