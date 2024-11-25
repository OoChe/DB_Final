import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'; // 홈 페이지 컴포넌트
import LogIn from '../src/pages/User/LogIn.jsx';
import SignUp from '../src/pages/User/SignUp.jsx';
import EventPage from './pages/Event/EventPage.jsx';
import EventInfo from '../src/pages/Event/EventInfo.jsx';
import MyPage from '../src/pages/User/MyPage.jsx';
import HotelPage from './pages/Hotel/HotelPage'; // 숙소 페이지 컴포넌트
import TopDestinations from './pages/TopDestinationsPage'; // 인기 여행지 페이지 컴포넌트
import BookAccommodation from './pages/Hotel/BookHotelPage'; // 숙소 예약 페이지 컴포넌트
import RegisterAccommodation from './pages/Hotel/RegisterHotelPage'; // 숙소 등록 페이지 컴포넌트
import Header from '../src/components/Header.jsx';
import ModifyUserInfo from '../src/pages/User/ModifyUserInfo.jsx';

function App() {
  return (
    <Router>
      {/* Header는 모든 페이지에서 항상 보이도록 설정 */}
      <Header />
      <Routes>
        {/* Home 페이지를 기본 경로로 설정 */}
        <Route path='/' element={<Home />} />
        <Route path='/event' element={<EventPage />} />
        {/* 이벤트 리스트 페이지 */}
        <Route path='/event/:id' element={<EventInfo />} />
        {/* 이벤트 상세 페이지 */}
        <Route path='/hotel' element={<HotelPage />} />
        <Route path='/top-destinations' element={<TopDestinations />} />
        <Route path='/bookhotel' element={<BookAccommodation />} />
        <Route path='/registerhotel' element={<RegisterAccommodation />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/modifyUserInfo' element={<ModifyUserInfo />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
