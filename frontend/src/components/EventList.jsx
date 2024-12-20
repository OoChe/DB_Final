import React, { useEffect, useState } from 'react';
import '../styles/EventList.css';
import EventCard from './EventCard.jsx';
import { Link } from 'react-router-dom';

function EventList({ selectedRegion = '전체', selectedMonth = '전체' }) {
  const [events, setEvents] = useState([]);

  // 백엔드에서 데이터를 가져오는 함수
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/events'); // Node.js API 호출
      const data = await response.json(); // JSON 데이터를 파싱
      setEvents(data); // 상태에 저장
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchEvents(); // 컴포넌트가 마운트되면 호출
  }, []);

  const [sortOption, setSortOption] = useState('latest'); // 초기 상태는 최신순

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // 각 이벤트에 월(month) 속성 추가
  const addMonth = events.map((event) => {
    const month = new Date(event.EventDate).getMonth() + 1; // 0부터 시작하는 월을 1부터 시작하도록 변환
    return { ...event, month: `${month}월` };
  });

  const filteredEvents = addMonth.filter((event) => {
    // 지역 필터
    if (
      selectedRegion &&
      selectedRegion !== '전체' &&
      event.Region !== selectedRegion
    ) {
      return false;
    }
    // 월 필터
    if (
      selectedMonth &&
      selectedMonth !== '전체' &&
      event.month !== selectedMonth
    ) {
      return false;
    }
    return true;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOption === 'latest') {
      // 최신순 정렬 (startDate 기준)
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'rating') {
      // 별점순 정렬 (rating 기준)
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className='list-container'>
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
      <div className='event-list'>
        {sortedEvents.map((event) => (
          <Link
            key={event.EventID}
            to={`/event/${event.EventID}`}
            style={{ textDecoration: 'none' }}
          >
            <EventCard
              id={event.EventID}
              title={event.EventTitle}
              region={event.Region}
              date={event.EventDate}
              description={event.EventDescription}
              imageUrl={event.ImgUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventList;
