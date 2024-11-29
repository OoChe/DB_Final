const express = require('express');
const db = require('./Configs/db');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 3001;

// CORS 설정: React에서 API를 호출할 수 있도록 허용
app.use(cors());
app.use(express.json()); // JSON 데이터 파싱

// 숙소 데이터를 반환하는 API
app.get('/api/hotel', (req, res) => {
  const query = 'SELECT * FROM Hotel';
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

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
