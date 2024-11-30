import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EventCard.css'; 
import { useState } from 'react';

const EventCard = ({ id, title, region, date, description, imgUrl }) => {

  const [clicked, setClicked] = useState(false);
  
  // 즐겨찾기 아이콘 상태 변경 함수
  const handleClick = () => {
    setClicked(!clicked); // 클릭할 때마다 상태 변경
  };

  return (
    <div className = "card">
      <div className = "image">
      {imgUrl ? (
          <img src={imgUrl} alt="Event" />
        ) : (
          <div className="placeholder"></div>
        )}
      </div>
      <div className = "content">
      <h3 className="title">{title}</h3>
        <p className="subtitle">{region}</p>
        <p className="date">{date}</p>
        <p className="date">{description}</p>
        {/* <p className="keyword">{keywords.join(', ')}</p> */}
      </div>
      {/* <Link to={`/event/${id}`} className="view-details">View Details</Link> */}
      <div
        className={`icon ${clicked ? 'clicked' : ''}`} // clicked 상태에 따라 클래스 추가
        onClick={handleClick}
      >
        ⭐
      </div>
    </div>
  );
};

export default EventCard;

