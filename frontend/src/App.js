import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'; // 홈 페이지 컴포넌트
import Events from './pages/Event/EvenPage'; // 행사 페이지 컴포넌트
import Accommodations from './pages/Hotel/HotelPage'; // 숙소 페이지 컴포넌트
import TopDestinations from './pages/TopDestinationsPage'; // 인기 여행지 페이지 컴포넌트
import BookAccommodation from './pages/Hotel/BookHotelPage'; // 숙소 예약 페이지 컴포넌트
import RegisterAccommodation from './pages/Hotel/RegisterHotelPage'; // 숙소 등록 페이지 컴포넌트

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
