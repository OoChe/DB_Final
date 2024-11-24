import logo from './logo.svg';
import './App.css';
import Header from '../src/components/Header.jsx'
import EventPage from './pages/Event/EventPage.jsx';
import EventInfo from '../src/pages/Event/EventInfo.jsx';
import LogIn from '../src/pages/User/LogIn.jsx';
import SignUp from '../src/pages/User/SignUp.jsx';
import MyPage from '../src/pages/User/MyPage.jsx';
import ModifyUserInfo from '../src/pages/User/ModifyUserInfo.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      헤더 들어갈 공간
      <Link to="/login">
              <button>로그인하기</button>
      </Link>
      <Link to="/signup">
              <button>회원가입하기</button>
      </Link>
      <Link to="/modifyUserInfo">
              <button>회원 정보 수정</button>
      </Link>
      <Link to="/mypage">
              <button>마이페이지</button>
      </Link>
      <Routes>
        <Route path="/" element={<EventPage />} /> 
        <Route path="/event" element={<EventPage />} /> {/* 이벤트 리스트 페이지 */}
        <Route path="/event/:id" element={<EventInfo />} /> {/* 이벤트 상세 페이지 */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/modifyUserInfo" element={<ModifyUserInfo />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
    </div>
    </Router>
  );
}

export default App;
