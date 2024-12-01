import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'; // 홈 페이지 컴포넌트
import LogIn from '../src/pages/User/LogIn.jsx';
import SignUp from '../src/pages/User/SignUp.jsx';
import EventPage from './pages/Event/EventPage.jsx';
import EventInfo from '../src/pages/Event/EventInfo.jsx';
import EventReview from '../src/pages/Event/EventReview.jsx';
import MyPage from '../src/pages/User/MyPage.jsx';
import MyReview from '../src/pages/User/MyReview.jsx';
import ModifyUserInfo from '../src/pages/User/ModifyUserInfo.jsx';
import HotelPage from './pages/Hotel/HotelPage'; // 숙소 페이지 컴포넌트
import HotelInfoPage from './pages/Hotel/HotelInfoPage';
import HotelReviewPage from './pages/Hotel/HotelReviewPage';
import TopDestinations from './pages/TopDestinationsPage'; // 인기 여행지 페이지 컴포넌트
import EnrollHotelPage from './pages/Hotel/EnrollHotelPage'; // 숙소 등록 페이지 컴포넌트
import Header from '../src/components/Header.jsx';

function App() {
  return (
    <Router>
      {/* Header는 모든 페이지에서 항상 보이도록 설정 */}
      <Header />
      <Routes>
        {/* Home 페이지를 기본 경로로 설정 */}
        <Route path='/' element={<Home />} />
        <Route path='/event' element={<EventPage />} />
        {/* 행사 리스트 페이지 */}
        <Route path='/event/:id' element={<EventInfo />} />
        {/* 행사 상세 페이지 */}
        <Route path='/hotel' element={<HotelPage />} />
        <Route path='/hotel/:id' element={<HotelInfoPage />} />
        <Route path='/top-destinations' element={<TopDestinations />} />
        <Route path='/enrollhotel' element={<EnrollHotelPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/modifyUserInfo' element={<ModifyUserInfo />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/myReview' element={<MyReview />} />
        {/* 행사 후기 페이지 */}
        <Route path='/event/:id/eventReview' element={<EventReview />} />
        {/* 호텔 후기 페이지 */}
        <Route path='/hotel/reviews/:id' element={<HotelReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
