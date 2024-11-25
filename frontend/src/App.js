<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'; // 홈 페이지 컴포넌트
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import Events from './pages/Event/EvenPage'; // 행사 페이지 컴포넌트
import Accommodations from './pages/Hotel/HotelPage'; // 숙소 페이지 컴포넌트
import TopDestinations from './pages/TopDestinationsPage'; // 인기 여행지 페이지 컴포넌트
import BookAccommodation from './pages/Hotel/BookHotelPage'; // 숙소 예약 페이지 컴포넌트
import RegisterAccommodation from './pages/Hotel/RegisterHotelPage'; // 숙소 등록 페이지 컴포넌트
=======
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
>>>>>>> 1b80e5a90b0b0d81552a0b84cf724e1004be3d59

function App() {
  return (
    <Router>
<<<<<<< HEAD
      {/* Header는 모든 페이지에서 항상 보이도록 설정 */}
      <Header />
      <Routes>
        {/* Home 페이지를 기본 경로로 설정 */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/hotel" element={<Accommodations />} />
        <Route path="/top-destinations" element={<TopDestinations />} />
        <Route path="/bookhotel" element={<BookAccommodation />} />
        <Route path="/registerhotel" element={<RegisterAccommodation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
=======
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
>>>>>>> 1b80e5a90b0b0d81552a0b84cf724e1004be3d59
    </Router>
  );
}

export default App;
