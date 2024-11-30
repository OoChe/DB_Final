import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hotel.css';

function HotelCard({ hotelId, hotelName, hotelRegion, hotelOwnerName }) {
  const [clicked, setClicked] = useState(false);

  // 즐겨찾기 아이콘 상태 변경 함수
  const handleClick = () => {
    setClicked(!clicked); // 클릭할 때마다 상태 변경
  };
  return (
    <div className='hotel-item'>
      <div>
        <p className='hotel-name'>{hotelName}</p>
        <p className='hotel-region'>{hotelRegion}</p>
        <p className='hotel-owner'>{hotelOwnerName}</p>
      </div>
      <div
        className={`icon ${clicked ? 'clicked' : ''}`} // clicked 상태에 따라 클래스 추가
        onClick={handleClick}
      >
        ⭐
      </div>
    </div>
  );
}

export default HotelCard;
