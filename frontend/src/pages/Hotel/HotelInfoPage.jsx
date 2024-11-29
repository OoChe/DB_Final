/* [행사 하나의 상세 정보를 보여주는 페이지] */
import React from 'react';
import { useParams } from 'react-router-dom';
import renderStars from '../../components/StarFilled';
import Reservation from '../../components/Reservation';
import '../../styles/HotelInfo.css';
import '../../styles/Hotel.css';

function HotelInfoPage() {
  const { id } = useParams(); // URL에서 이벤트 ID 추출

  const hotelData = {
    title: '숙소 이름',
    rating: 3.7,
    reviews: 12,
    region: '서울',
    owner: '동국이',
    location: '서울특별시 중구 필동로 1길 30',
    tourspot: ['관광지1', '관광지2', '관광지3'],
    hotelPrice: 10000, // 숙소 가격 추가
    reservedDates: [],
  };

  return (
    <div className='hotel-info-container'>
      <div className='hotel-text'>
        <h1 className='hotel-title'>{hotelData.title}</h1>
        <div className='stars-wrapper'>{renderStars(hotelData.rating)}</div>
        <div className='hotel-rating'>
          <p>
            평균 별점 : {hotelData.rating} ({hotelData.reviews})
          </p>
          <button className='review-button'>후 기</button>
        </div>

        <div className='hotel-details'>
          <table className='hotel-details-table'>
            <tbody>
              <tr>
                <td>
                  <strong>지역:</strong>
                </td>
                <td>{hotelData.region}</td>
              </tr>
              <tr>
                <td>
                  <strong>호스트:</strong>
                </td>
                <td>{hotelData.owner}</td>
              </tr>
              <tr>
                <td>
                  <strong>위치:</strong>
                </td>
                <td>{hotelData.location}</td>
              </tr>
              <tr>
                <td>
                  <strong>주변 관광지:</strong>
                </td>
                {hotelData.tourspot.map((spot, index) => (
                  <tr key={index}>
                    <td>{spot}</td>
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <a href='#' className='detail-link'>
          더 자세한 정보를 보고 싶다면? 사이트로 이동
        </a>
      </div>
      <div className='hotel-reservation'>
        <Reservation hotelData={hotelData} />
      </div>
    </div>
  );
}

export default HotelInfoPage;
