const express = require('express');
const db = require('./Configs/db');
const cors = require('cors');
const routers = require('./Router');

const app = express();
const PORT = 3001;

// CORS 설정: React에서 API를 호출할 수 있도록 허용
app.use(cors());
app.use(express.json()); // JSON 데이터 파싱

// 라우터 연결
app.use('/api', routers);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});