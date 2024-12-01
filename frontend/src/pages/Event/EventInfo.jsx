/* [행사 하나의 상세 정보를 보여주는 페이지] */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/EventInfo.css';
import '../../styles/Event.css';
import CustomButton from '../../components/CustomButton.jsx';

function EventInfo() {
  const { id } = useParams(); // URL에서 이벤트 ID 추출
  const [eventData, setEventData] = useState([]); // 이벤트 데이터를 저장할 상태
  const navigate = useNavigate();

  // 백엔드에서 데이터를 가져오는 함수
  const fetchEventDetail = async () => {
    console.log('함수 실행', id);
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`); // Node.js API 호출
      console.log('API Response:', response);
      if (!response.ok) {
        throw new Error('이벤트를 가져오는 데 실패했습니다.');
      }
      const data = await response.json(); // JSON 데이터를 파싱
      console.log('Fetched Event Data:', data);
      setEventData(data); // 상태에 저장
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchEventDetail(); // 컴포넌트가 마운트되면 호출
  }, [id]);

  return (
    <div className='info-container'>
      <div className='event-text'>
        <h1 className='event-title'>{eventData.EventTitle}</h1>
        <h2 className='event-subtitle'>{eventData.EventSubtitle}</h2>
        <div className='star-container'>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < eventData.AvgRating ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
        <div className='event-rating'>
          <p>
            평균 별점 : {eventData.AvgRating} ({eventData.ReviewCount})
          </p>
          {/* <button className="review-button">후 기</button> */}
          <CustomButton
            text={'후 기'}
            textColor={'#000000'}
            innerColor={'#CBEDF5'}
            borderColor={'#9FCED9'}
            //onClick={() => navigate(`/eventReview/${id}`)}
            onClick={() => navigate('eventReview')}
          />
        </div>

        <div className='event-details'>
          <table className='event-details-table'>
            <tbody>
              <tr>
                <td>
                  <strong>지역:</strong>
                </td>
                <td>{eventData.Region}</td>
              </tr>
              <tr>
                <td>
                  <strong>날짜:</strong>
                </td>
                <td>{eventData.EventDate}</td>
              </tr>
              <tr>
                <td>
                  <strong>행사 설명:</strong>
                </td>
                <td>{eventData.EventDescription}</td>
              </tr>
              <tr>
                <td>
                  <strong>위치:</strong>
                </td>
                <td>{eventData.Address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <a href={eventData.EventURL} className='detail-link'>
          더 자세한 정보를 보고 싶다면? 사이트로 이동
        </a>
      </div>
      <div className='event-image'>
        {eventData.EventImageURL ? (
          <img src={eventData.EventImageURL} alt='Event' />
        ) : (
          <div className='placeholder'>이미지</div>
        )}
      </div>
    </div>
  );
}

export default EventInfo;
