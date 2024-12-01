/* [행사 하나의 상세 정보를 보여주는 페이지] */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import renderStars from '../../components/StarFilled';
import Reservation from '../../components/Reservation';
import CustomButton from '../../components/CustomButton';
import '../../styles/HotelInfo.css';
import '../../styles/Hotel.css';

function HotelInfoPage() {
  const { id } = useParams(); // URL에서 이벤트 ID 추출
  const [hotelData, setHotelData] = useState(null); // 호텔 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();

  // 호텔 데이터를 가져오는 함수
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/hotel/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hotel data');
        }
        const data = await response.json();
        setHotelData(data); // 상태에 데이터 저장
        setLoading(false);
        console.log('결과: ', hotelData);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotelDetails(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  if (loading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!hotelData) {
    return <div>호텔 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='hotel-info-container'>
      <div className='hotel-text'>
        <h1 className='hotel-title'>{hotelData.hotelName}</h1>
        <div className='stars-wrapper'>{renderStars(hotelData.hotelRate)}</div>
        <div className='hotel-rating'>
          <p>평균 별점 : {hotelData.hotelRate} / 5</p>
          <CustomButton
            text={'후 기'}
            textColor={'#000000'}
            innerColor={'#CBEDF5'}
            borderColor={'#9FCED9'}
            onClick={() => navigate(`/hotel/reviews/${id}`)}
          />
        </div>

        <div className='hotel-details'>
          <table className='hotel-details-table'>
            <tbody>
              <tr>
                <td>
                  <strong>지역:</strong>
                </td>
                <td>{hotelData.hotelRegion}</td>
              </tr>
              <tr>
                <td>
                  <strong>호스트:</strong>
                </td>
                <td>{hotelData.hotelOwnerName}</td>
              </tr>
              <tr>
                <td>
                  <strong>위치:</strong>
                </td>
                <td>{hotelData.hotelAddress}</td>
              </tr>
              <tr>
                <td>
                  <strong>주변 관광지:</strong>
                </td>
                {hotelData.tourspot
                  ? hotelData.tourspot.split(',').map((spot, index) => (
                      <tr key={index}>
                        <td>{spot.trim()}</td> {/* trim()으로 앞뒤 공백 제거 */}
                      </tr>
                    ))
                  : null}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='hotel-reservation'>
        <Reservation hotelData={hotelData} />
      </div>
    </div>
  );
}

export default HotelInfoPage;
