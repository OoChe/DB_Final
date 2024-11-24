import React, {useState} from "react";
import "../styles/EventList.css";
import EventCard from "./EventCard.jsx";
import { Link } from 'react-router-dom';

function EventList({ selectedRegion = '전체', selectedMonth = '전체'}) {
    const events = [
        { id: 1, title: 'Event 1', subtitle: 'Sub 1', startDate: '2025-10-01', rating: 4.0, region: '서울', keywords: ['keyword1', 'keyword2'] },
        { id: 2, title: 'Event 2', subtitle: 'Sub 2', startDate: '2024-11-02', rating: 5.0, region: '부산', keywords: ['keyword3', 'keyword4'] },
        // 이벤트 예시 
      ];

      const [sortOption, setSortOption] = useState('latest'); // 초기 상태는 최신순

        const handleSortChange = (option) => {
            setSortOption(option);
        };

        // 각 이벤트에 월(month) 속성 추가
        const addMonth = events.map(event => {
            const month = new Date(event.startDate).getMonth() + 1; // 0부터 시작하는 월을 1부터 시작하도록 변환
            return { ...event, month: `${month}월` };
        });

        const filteredEvents = addMonth.filter((event) => {
            // 지역 필터
            if (selectedRegion && selectedRegion !== "전체" && event.region !== selectedRegion) {
              return false;
            }
            // 월 필터
            if (selectedMonth && selectedMonth !== "전체" && event.month !== selectedMonth) {
              return false;
            }
            return true;
          });

        const sortedEvents = [...filteredEvents].sort((a, b) => {
            if (sortOption === 'latest') {
              // 최신순 정렬 (startDate 기준)
              return new Date(b.startDate) - new Date(a.startDate);
            } else if (sortOption === 'rating') {
              // 별점순 정렬 (rating 기준)
              return b.rating - a.rating;
            }
            return 0;
          });

    return (
        <div className = "list-container">
        <hr></hr>
            <div className="sort-options">
                <span
                className={sortOption === "latest" ? "active" : ""}
                onClick={() => handleSortChange("latest")}
                >
                최신순
                </span>
                <span
                className={sortOption === "rating" ? "active" : ""}
                onClick={() => handleSortChange("rating")}
                >
                별점순
                </span>
            </div>
        <hr></hr>
            <div className="event-list">
            {sortedEvents.map(event => (
            <Link key={event.id} to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
            <EventCard
                id={event.id}
                title={event.title}
                subtitle={event.subtitle}
                startDate={event.startDate}
                keywords={event.keywords}
            />
            </Link>
            ))}
            </div>
      </div>
    );
}

export default EventList;
