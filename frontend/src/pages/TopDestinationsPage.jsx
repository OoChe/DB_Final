import React, { useEffect, useState } from 'react';
import '../styles/TopDestinationPage.css';

const EventCard = ({ title, date, imageUrl }) => {
  return (
    <div className='small-event-card'>
      <div
        className='small-event-thumbnail'
        style={{ backgroundImage: `url(${imageUrl || '../assets/image//default-image.png'})` }}
      />
      <p className='small-event-title'>{title}</p>
      <p className='small-event-date'>{date}</p>
    </div>
  );
};

const TopDestinationPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/top-destinations'
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
        console.log('결과: ', result);
      } catch (err) {
        console.error('Error fetching top destinations:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='top-destination-container'>
      {/* 왼쪽 콘텐츠 */}
      <div className='top-destination-content'>
        <h1 className='page-title'>인기 여행지 TOP 10</h1>
        <hr />
        {data.map(({ RegionName, RankingNum, events }, index) => (
          <div key={RankingNum} className='destination-section'>
            <h2 className='destination-title'>{`${
              index + 1
            }. ${RegionName} 여행`}</h2>
            <div className='small-event-list'>
              {events.slice(0, 3).map((event, eventIndex) => (
                <EventCard
                  key={eventIndex}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString()}
                  imageUrl={event.imageUrl}
                />
              ))}
            </div>
            <a href='/event' className='view-more'>
              더보기 &gt;
            </a>
          </div>
        ))}
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className='top-10-sidebar'>
        <h2 className='sidebar-title'>TOP 10 한 눈에 보기</h2>
        <ul className='sidebar-list'>
          {data.map(({ RegionName, RankingNum }, index) => (
            <li key={RankingNum} className='sidebar-item'>
              {index + 1}. {RegionName} 여행
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopDestinationPage;
