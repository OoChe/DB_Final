import React, { useState } from 'react';
import '../styles/Hotel.css';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';

function HotelList({ selectedRegion = '전체' }) {
  const hotelList = [
    {
      hotelID: 'H00000001',
      hotelName: '호텔1',
      hotelRegion: '서울',
      hotelOwnerName: '호스트',
    },
    {
      hotelID: 'H00000002',
      hotelName: '호텔2',
      hotelRegion: '부산',
      hotelOwnerName: '호스트',
    },
    {
      hotelID: 'H00000003',
      hotelName: '호텔3',
      hotelRegion: '광주',
      hotelOwnerName: '호스트',
    },
    {
      hotelID: 'H00000004',
      hotelName: '호텔4',
      hotelRegion: '경기',
      hotelOwnerName: '호스트',
    },
    {
      hotelID: 'H00000005',
      hotelName: '호텔5',
      hotelRegion: '충북',
      hotelOwnerName: '호스트',
    },
    {
      hotelID: 'H00000006',
      hotelName: '호텔6',
      hotelRegion: '서울',
      hotelOwnerName: '호스트',
    },
  ];

  const [sortOption, setSortOption] = useState('latest'); // 초기 상태는 최신순

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const filteredHotels = hotelList.filter((hotel) => {
    // 지역 필터: selectedRegion이 '전체'가 아니고 선택된 지역과 일치하지 않으면 필터링
    if (selectedRegion && selectedRegion !== '전체') {
      return hotel.hotelRegion === selectedRegion;
    }

    return true; // '전체'일 경우 모든 호텔 포함
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortOption === 'latest') {
      // 최신순 정렬 (startDate 기준)
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortOption === 'rating') {
      // 별점순 정렬 (rating 기준)
      return b.rating - a.rating;
    }
    return 0;
  });

  if (!hotelList || !Array.isArray(hotelList)) {
    console.log(hotelList);
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  return (
    <div className='hotel-list'>
      <hr></hr>
      <div className='sort-options'>
        <span
          className={sortOption === 'latest' ? 'active' : ''}
          onClick={() => handleSortChange('latest')}
        >
          최신순
        </span>
        <span
          className={sortOption === 'rating' ? 'active' : ''}
          onClick={() => handleSortChange('rating')}
        >
          별점순
        </span>
      </div>
      <hr></hr>
      <div className='hotel-item-list'>
        {sortedHotels.map((hotel) => (
          <Link
            key={hotel.id}
            to={`/hotel/${hotel.hotelID}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <HotelCard
              hotelID={hotel.hotelID}
              hotelName={hotel.hotelName}
              hotelRegion={hotel.hotelRegion}
              hotelOwnerName={hotel.hotelOwnerName}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HotelList;
