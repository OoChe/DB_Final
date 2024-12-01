const express = require('express');
const db = require('./Configs/db');
const routers = require('./Router');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 3001;

// CORS 설정: React에서 API를 호출할 수 있도록 허용
app.use(cors());
app.use(express.json()); // JSON 데이터 파싱

// 라우터 연결
app.use('/api', routers);

// 이벤트 데이터를 반환하는 API
app.get('/api/events', (req, res) => {
  const query = 'SELECT * FROM Event';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '서버 오류' });
    } else {
      res.status(200).json(results); // JSON 형식으로 React에 데이터 반환
      console.log('Database results:', results);
    }
  });
});

// 특정 이벤트의 상세 정보를 반환하는 API
app.get('/api/events/:id', (req, res) => {
  const eventId = req.params.id; // URL 파라미터에서 ID를 가져옴
  //const query = 'SELECT * FROM Event WHERE EventID = ?';  // 이벤트 ID로 쿼리
  const query =
    'SELECT e.EventID, e.EventTitle, e.EventSubtitle, e.Region, e.EventDate, e.Address, e.EventDescription, e.EventURL, COALESCE(ROUND(AVG(r.Rating), 2), 0) AS AvgRating, COUNT(r.ReviewID) AS ReviewCount FROM Event e LEFT JOIN EventReview r ON e.EventID = r.EventID WHERE e.EventID = ?';
  console.log('Event details 백엔드 호출', eventId);
  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '서버 오류' });
    } else if (results.length > 0) {
      res.status(200).json(results[0]); // 첫 번째 결과만 반환
      console.log('Event details:', results[0]);
    } else {
      res.status(404).json({ message: '이벤트를 찾을 수 없습니다.' });
    }
  });
});

app.use(
  session({
    //key: 'session_cookie_name',
    secret: '0000',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'lax' },
  })
);

// 로그인
app.post('/api/login', (req, res) => {
  // 데이터 받아서 결과 전송
  const userID = req.body.userId;
  const password = req.body.userPassword;
  const sendData = { isLogin: '' };
  console.log('로그인 호출', userID, password);
  if (userID && password) {
    // id와 pw가 입력되었는지 확인
    db.query(
      'SELECT * FROM User WHERE UserID = ? AND Password = ?',
      [userID, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          // 계정 존재
          req.session.is_logined = true; // 세션 정보 갱신
          req.session.userid = userID;
          console.log(userID, '세션에 저장');
          req.session.save(function () {
            sendData.isLogin = 'True';
            res.send(sendData);
          });
          console.log(
            '세션 정보:',
            req.session,
            '세션아이디: ',
            req.session.userid
          ); // 로그인 후 세션 확인
        } else {
          // db에 해당 아이디가 없는 경우
          sendData.isLogin = '아이디 또는 비밀번호가 일치하지 않습니다.';
          res.send(sendData);
        }
      }
    );
  } else {
    // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
    sendData.isLogin = '아이디와 비밀번호를 입력하세요!';
    res.send(sendData);
  }
});

// 세션에서 로그인 상태 확인하는 API
app.get('/api/loginCheck', (req, res) => {
  console.log('세션 함수 호출', req.session.userid);
  if (req.session.is_logined) {
    res.json({ userID: req.session.userid });
  } else {
    res.status(401).json({ message: '로그인되지 않은 사용자' });
  }
});

app.post('/api/signup', (req, res) => {
  // 데이터 받아서 결과 전송
  const userID = req.body.userId;
  const password = req.body.userPassword;
  const username = req.body.userName;
  const userBirth = req.body.userBirth;
  const userPhone = req.body.userPhone;
  const userGrade = 'customer';

  const sendData = { isSuccess: '' };
  console.log('회원가입 호출', userID, password);
  if (username && password && username) {
    db.query(
      'SELECT * FROM User WHERE UserID = ?',
      [userID],
      function (error, results, fields) {
        // DB에 같은 이름의 회원아이디가 있는지 확인
        if (error) throw error;
        if (results.length <= 0) {
          // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
          db.query(
            'INSERT INTO User (UserID, Password, UserName, UserBirth, UserPhone, UserGrade) VALUES(?,?,?,?,?,?)',
            [userID, password, username, userBirth, userPhone, userGrade],
            function (error, data) {
              if (error) throw error;
              req.session.save(function () {
                sendData.isSuccess = 'True';
                res.send(sendData);
              });
            }
          );
        } else {
          // DB에 같은 이름의 회원아이디가 있는 경우
          sendData.isSuccess = '이미 존재하는 아이디 입니다!';
          res.send(sendData);
        }
      }
    );
  } else {
    sendData.isSuccess = '아이디, 비밀번호, 이름은 필수 입력 사항입니다.';
    res.send(sendData);
  }
});

// 유저 정보 받아오기 - local
app.post('/api/user', (req, res) => {
  const { userID } = req.body; // 요청 본문에서 userID 가져오기
  if (!userID) {
    return res.status(400).json({ message: '아이디가 필요합니다.' });
  }

  // 데이터베이스에서 userID로 사용자 정보를 찾는 로직
  db.query(
    'SELECT * FROM User WHERE UserID = ?',
    [userID],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: '사용자 정보 조회 중 오류 발생' });
      }
      if (results.length > 0) {
        res.json(results[0]); // 사용자 정보 반환
      } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }
    }
  );
});

// 정보 수정
app.post('/api/updateUserInfo', (req, res) => {
  const { userID, id, password, name, birth, tel } = req.body;
  console.log('정보 수정 요청', userID);
  db.query(
    'UPDATE User SET UserID = ?, Password = ?, UserName = ?, UserBirth = ?, UserPhone = ? WHERE UserID = ?',
    [id, password, name, birth, tel, userID],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: '정보 업데이트 중 오류 발생' });
      }
      if (results.affectedRows > 0) {
        res.json({ message: '정보가 성공적으로 수정되었습니다.' });
      } else {
        res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }
    }
  );
});

// 회원 탈퇴 API
app.post('/api/unregister', (req, res) => {
  const { userID } = req.body;
  console.log('탈퇴', userID);

  // 유효한 userID가 있는지 확인
  if (!userID) {
    return res
      .status(400)
      .json({ isSuccess: 'False', message: '유효하지 않은 사용자 ID입니다.' });
  }

  // 데이터베이스에서 사용자 정보 삭제
  const query = 'DELETE FROM User WHERE UserID = ?';

  db.query(query, [userID], (err, result) => {
    if (err) {
      console.error('탈퇴 처리 중 오류 발생:', err);
      return res.status(500).json({
        isSuccess: 'False',
        message: '회원 탈퇴 처리 중 오류가 발생했습니다.',
      });
    }

    // 사용자 삭제 성공
    if (result.affectedRows > 0) {
      return res.json({
        isSuccess: 'True',
        message: '회원 탈퇴가 완료되었습니다.',
      });
    } else {
      return res
        .status(404)
        .json({ isSuccess: 'False', message: '사용자를 찾을 수 없습니다.' });
    }
  });
});

// 리뷰 작성
app.post('/api/event/review', (req, res) => {
  const { userID, id, rating, content } = req.body;
  console.log(userID);
  const query = `
      INSERT INTO EventReview (UserID, EventID, Rating, Content)
      VALUES (?, ?, ?, ?)
  `;
  db.query(query, [userID, id, rating, content], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting review');
    }
    res.status(201).json({ message: 'Review added successfully' });
  });
});

// 리뷰 불러오기
app.get('/api/reviews/:id', (req, res) => {
  const eventId = req.params.id; // URL 파라미터에서 ID를 가져옴
  const queryRate =
    'SELECT AVG(Rating) AS AvgRating, COUNT(*) AS ReviewCount FROM EventReview WHERE EventID = ?';
  const query = 'SELECT * FROM EventReview WHERE EventID = ?'; // 이벤트 ID로 쿼리
  console.log('Event Review 백엔드 호출', eventId);

  db.query(queryRate, [eventId], (err, rateResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '서버 오류' });
    }

    const avgRating = rateResult[0].AvgRating;
    const reviewCount = rateResult[0].ReviewCount;

    db.query(query, [eventId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
      } else if (results.length > 0) {
        res.status(200).json({
          avgRating,
          reviewCount,
          results,
        });
        console.log('Event reviews:', results);
      } else {
        res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
      }
    });
  });
});

// 내 리뷰 가져오기
app.post('/api/myreviews', (req, res) => {
  const { userID } = req.body;
  const queryRate = `
  SELECT AVG(Rating) AS AvgRating, COUNT(*) AS ReviewCount 
  FROM (
    SELECT Rating FROM EventReview WHERE UserID = ?
    UNION ALL
    SELECT Rating FROM HotelReview WHERE UserID = ?
  ) AS combined_reviews;
`;
  const query = `
SELECT * FROM (
  SELECT * FROM EventReview WHERE UserID = ?
  UNION ALL
  SELECT * FROM HotelReview WHERE UserID = ?
) AS combined_reviews;
`;
  console.log('my Review 백엔드 호출', userID);

  db.query(queryRate, [userID, userID], (err, rateResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '서버 오류' });
    }

    const avgRating = rateResult[0].AvgRating;
    const reviewCount = rateResult[0].ReviewCount;

    db.query(query, [userID, userID], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
      } else if (results.length > 0) {
        res.status(200).json({
          avgRating,
          reviewCount,
          results,
        });
        console.log('Event reviews:', results);
      } else {
        res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
      }
    });
  });
});

// 북마크 가져오기
app.post('/api/bookmarks', (req, res) => {
  const { userID } = req.body;
  console.log('함수 호출', userID);

  const query = `
    SELECT
    BookmarkID, 
    COALESCE(e.EventID, h.hotelID) AS TypeID, 
    COALESCE(e.EventTitle, h.hotelName) AS Name,
    COALESCE(e.Region, h.hotelRegion) AS Region
    FROM 
    Bookmark b
    LEFT JOIN Event e ON b.EventID = e.EventID
    LEFT JOIN Hotel h ON b.HotelID = h.HotelID
    WHERE UserID = ?;
  `;

  db.query(query, [userID], (err, results) => {
    if (err) {
      console.log('에러');
      return res
        .status(500)
        .json({ message: '북마크를 가져오는 데 실패했습니다.' });
    }
    res.json(results); // 결과 반환
    console.log('결과', results);
  });
});

// 북마크 삭제
app.delete('/api/bookmarks/:bookmarkId', (req, res) => {
  const { bookmarkId } = req.params;

  const query = `DELETE FROM Bookmark WHERE BookmarkID = ?`;
  console.log('삭제함수');
  db.query(query, [bookmarkId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: '북마크 삭제 실패' });
    }
    res.json({ message: '북마크 삭제 성공' });
  });
});

// 유저 정보 받아오기 - 세션
// app.get('/api/user', (req, res) => {
//   const userId = req.session.userid;
//   console.log('User details 백엔드 호출', userId);
//   if (req.session.is_logined) {
//     //res.json({ userID: req.session.id });
//     const query = 'SELECT * FROM User WHERE UserID = ?';  // 이벤트 ID로 쿼리
//     console.log('User 로그인 정보 있음', userId);
//       db.query(query, [userId], (err, results) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: '서버 오류' });
//       } else if (results.length > 0) {
//         res.status(200).json(results[0]);  // 첫 번째 결과만 반환
//         console.log('User details:', results[0]);
//       } else {
//         res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
//       }
//   });
//   } else {
//     res.status(401).json({ message: '로그인되지 않은 사용자' });
//   }
// });

// 상위 Top10 여행지 제공 함수
app.get('/api/top-destinations', (req, res) => {
  const rankingQuery = `SELECT * FROM Ranking ORDER BY RankingNum`;
  const eventQuery = `SELECT Region, eventTitle, eventDate, eventImageUrl
                      FROM Event 
                      WHERE Region IN (SELECT cityName FROM Ranking ORDER BY RankingNum) 
                      ORDER BY eventDate`;

  // 두 개의 쿼리 실행
  db.query(rankingQuery, (err, rankingResults) => {
    if (err) {
      console.error('Error fetching rankings:', err);
      res.status(500).send({ message: 'Error fetching rankings' });
      return;
    }

    db.query(eventQuery, (err, eventResults) => {
      if (err) {
        console.error('Error fetching events:', err);
        res.status(500).send({ message: 'Error fetching events' });
        return;
      }

      // 지역별 행사 매핑
      const eventsByRegion = {};
      eventResults.forEach((event) => {
        const { Region, eventTitle, eventDate, eventImageUrl } = event;
        if (!eventsByRegion[Region]) {
          eventsByRegion[Region] = [];
        }
        eventsByRegion[Region].push({
          title: eventTitle, // 키 이름 일치
          date: eventDate,
          imageUrl: eventImageUrl,
        });
      });
      console.log(eventsByRegion);
      // 최종 데이터 가공
      const response = rankingResults.map((ranking) => ({
        RegionName: ranking.cityName,
        RankingNum: ranking.RankingNum,
        events: eventsByRegion[ranking.cityName] || [], // 행사 정보가 없을 경우 빈 배열
      }));
      console.log(response);
      res.send(response);
    });
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
