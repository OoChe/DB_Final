/* [숙소 목록 보여주는 페이지] */
import React, { useState } from 'react';
import HotelList from '../../components/HotelList';
import RegionSection from '../../components/RegionSection';
import '../../styles/Hotel.css';

export default function HotelPage() {
  const [filter, setFilter] = useState('최신순'); // 정렬 기준
  const [region, setRegion] = useState(null); // 선택된 지역

  const hotelList = [
    { hotelName: '숙소 이름', hotelRegion: '지역', hotelOwnerName: '호스트' },
    { hotelName: '숙소 이름', hotelRegion: '지역', hotelOwnerName: '호스트' },
    { hotelName: '숙소 이름', hotelRegion: '지역', hotelOwnerName: '호스트' },
    { hotelName: '숙소 이름', hotelRegion: '지역', hotelOwnerName: '호스트' },
    { hotelName: '숙소 이름', hotelRegion: '지역', hotelOwnerName: '호스트' },
    { hotelName: '숙소 이름', hotelRegion: '지역', hotelOwnerName: '호스트' },
  ];

  const filteredHotel = region
    ? hotelList.filter((item) => item.location === region)
    : hotelList;

  return (
    <div className='hotel-page'>
      <p className='HotelPage-title'>숙소</p>
      <div className='sorting-options'>
        <button
          className={filter === '최신순' ? 'active' : ''}
          onClick={() => setFilter('최신순')}
        >
          최신순
        </button>
        <button
          className={filter === '별점순' ? 'active' : ''}
          onClick={() => setFilter('별점순')}
        >
          별점순
        </button>
      </div>
      <div className='main-content'>
        <HotelList hotelList={filteredHotel} />
        <RegionSection setRegion={setRegion} />
      </div>
    </div>
  );
}
