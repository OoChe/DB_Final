import React from 'react';
import HotelShort from './HotelShort';

function HotelList({ hotelList }) {
  if (!hotelList || !Array.isArray(hotelList)) {
    console.log(hotelList);
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  return (
    <div className='hotel-list'>
      {hotelList.map((hotel, index) => (
        <HotelShort key={index} {...hotel} />
      ))}
    </div>
  );
}

export default HotelList;
