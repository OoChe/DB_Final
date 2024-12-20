import React, { useState } from 'react';
import '../styles/Reservation.css'; // 스타일 파일

function Reservation({ hotelData }) {
  const today = new Date();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservedDates, setReservedDates] = useState(hotelData.reservedDates);

  // 날짜 선택 제한
  const isDateReserved = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return reservedDates.includes(formattedDate);
  };

  // 총 금액 계산
  const calculateTotal = (inDate, outDate, numGuests) => {
    if (!inDate || !outDate) return 0;
    const startDate = new Date(inDate);
    const endDate = new Date(outDate);
    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);

    return nights * numGuests * hotelData.hotelPrice;
  };

  // 날짜 변경 핸들러
  const handleDateChange = (type, value) => {
    if (type === 'checkIn') setCheckIn(value);
    if (type === 'checkOut') setCheckOut(value);

    const updatedTotal = calculateTotal(
      type === 'checkIn' ? value : checkIn,
      type === 'checkOut' ? value : checkOut,
      guests
    );
    setTotalPrice(updatedTotal);
  };

  // 인원수 변경 핸들러
  const handleGuestsChange = (increment) => {
    const updatedGuests = Math.min(5, Math.max(1, guests + increment));
    setGuests(updatedGuests);
    setTotalPrice(calculateTotal(checkIn, checkOut, updatedGuests));
  };

  const handleReservation = async () => {
    const loggedInUserID = localStorage.getItem('userID');
    if (!loggedInUserID) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    const reservationData = {
      hotelID: hotelData.hotelID,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      reserveNum: guests,
      userID: loggedInUserID,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/api/hotel/${hotelData.hotelID}/reserve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        alert('예약이 완료되었습니다.');
      } else {
        const errorData = await response.json();
        alert(`예약 실패: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류로 인해 예약에 실패했습니다.');
    }
  };

  return (
    <div className='reservation-container'>
      <p className='price-info'>
        비용: 1인 당 {hotelData.hotelPrice.toLocaleString()}원 / 1박
      </p>
      <div className='date-container'>
        <div className='date-field'>
          <span>체크인&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input
            type='date'
            value={checkIn}
            min={today.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange('checkIn', e.target.value)}
          />
          <span>15:00</span>
        </div>
        <div className='date-field'>
          <span>체크아웃</span>
          <input
            type='date'
            value={checkOut}
            min={checkIn || today.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange('checkOut', e.target.value)}
          />
          <span>11:00</span>
        </div>
      </div>
      <div className='guests-container'>
        <span>인원수</span>
        <div>
          <button onClick={() => handleGuestsChange(-1)}>-</button>
          {guests}
          <button onClick={() => handleGuestsChange(1)}>+</button>
        </div>
      </div>
      <p className='total-price'>총금액 {totalPrice.toLocaleString()} 원</p>
      <button className='reserve-button' onClick={handleReservation}>
        예약하기
      </button>
    </div>
  );
}

export default Reservation;
