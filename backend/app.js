const express = require('express');
const cors = require('cors');
const db = require('./Source/db');

const app = express();

// CORS 설정: React에서 API를 호출할 수 있도록 허용
app.use(cors());
app.use(express.json()); // JSON 데이터 파싱

// Route: Event 테이블 데이터 가져오기
app.get('/api/hotel', (req, res) => {
  const query = 'SELECT * FROM Event'; // SQL 쿼리
  db.query(query, (err, results) => {
    if (err) {
      console.error('쿼리 실행 중 오류 발생:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results); // 데이터 응답
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
