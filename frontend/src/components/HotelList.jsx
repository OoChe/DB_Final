import React, { useState, useEffect } from 'react';
import '../styles/Hotel.css';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';

function HotelList({ selectedRegion = '전체' }) {
  // 백엔드에서 데이터를 가져오는 함수
  const [hotelList, setHotelList] = useState([]);
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
      return 0;
    } else if (sortOption === 'rating') {
      // 별점순 정렬 (rating 기준)
      return parseFloat(b.hotelRate) - parseFloat(a.hotelRate);
    }
    return 0;
  });

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/hotel'); // Node.js API 호출
      // 3306 -> 3000 수정해야 API 호출 실패 안 뜸
      const data = await response.json(); // JSON 데이터를 파싱
      setHotelList(data); // 상태에 저장
      console.log(hotelList);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchHotels(); // 컴포넌트가 마운트되면 호출
  }, []);

  return (
    <div className='hotel-list'>
      {!hotelList || !Array.isArray(hotelList) ? (
        <div>데이터를 불러오는 중입니다...</div>
      ) : (
        <>
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
                key={hotel.hotelID}
                to={`/hotel/${hotel.hotelID}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <HotelCard
                  hotelID={hotel.hotelID}
                  hotelName={hotel.hotelName}
                  hotelRegion={hotel.hotelRegion}
                  hotelOwnerName={hotel.userName}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HotelList;
