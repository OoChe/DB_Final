/* [행사 하나의 상세 정보를 보여주는 페이지] */
import React from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/EventInfo.css";
import "../../styles/Event.css";

function EventInfo() {
  const { id } = useParams(); // URL에서 이벤트 ID 추출

  const eventData = {
    title: "행사 이름",
    subtitle: "부제목",
    rating: 4.0,
    reviews: 12,
    region: "서울",
    date: "동국이",
    description: "행사에 대한 설명",
    location: "서울특별시 중구 필동로 1길 30",
    imageUrl: "", // 이미지 URL (비어 있으면 기본 이미지)
  };

  return (

    <div className="info-container">
      <div className="event-text">
        <h1 className="event-title">{eventData.title}</h1>
        <h2 className="event-subtitle">{eventData.subtitle}</h2>
        <div className="star-list">
          {[...Array(5)].map((_, index) => (
              <span key={index} className={`star ${index < eventData.rating ? "filled" : ""}`}>★</span>
            ))}
        </div>
        <div className="event-rating">
          <p>
            평균 별점 : {eventData.rating} ({eventData.reviews})
          </p>
          <button className="review-button">후 기</button>
        </div>

        <div className="event-details">
            <table className="event-details-table">
                <tbody>
                <tr>
                    <td><strong>지역:</strong></td>
                    <td>{eventData.region}</td>
                </tr>
                <tr>
                    <td><strong>날짜:</strong></td>
                    <td>{eventData.date}</td>
                </tr>
                <tr>
                    <td><strong>행사 설명:</strong></td>
                    <td>{eventData.description}</td>
                </tr>
                <tr>
                    <td><strong>위치:</strong></td>
                    <td>{eventData.location}</td>
                </tr>
                </tbody>
            </table>
        </div>


        <a href="#" className="detail-link">더 자세한 정보를 보고 싶다면? 사이트로 이동</a>
      </div>
      <div className="event-image">
        {eventData.imageUrl ? (
          <img src={eventData.imageUrl} alt="Event" />
        ) : (
          <div className="placeholder">이미지</div>
        )}
      </div>
    </div>
  );
}

export default EventInfo;
