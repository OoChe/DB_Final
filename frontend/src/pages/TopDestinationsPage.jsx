import React from 'react';
import '../styles/TopDestinationPage.css';

const destinations = [
  '부산',
  '경주',
  '제주',
  '여수',
  '강릉',
  '군산',
  '속초',
  '전주',
  '대구',
  '대전',
];

const events = {
  부산: [
    {
      title: '행사 제목 1',
      date: '2024-01-01',
      imageUrl:
        'https://minio.nculture.org/amsweb-opt/multimedia_assets/50/30104/16031/c/004_2019-%EC%A2%85%EB%A1%9C%ED%95%9C%EB%B3%B5%EC%B6%95%EC%A0%9C%281%29-medium-size.jpg',
    },
    {
      title: '행사 제목 2',
      date: '2024-01-02',
      imageUrl: 'https://example.com/image2.jpg',
    },
    {
      title: '행사 제목 3',
      date: '2024-01-03',
      imageUrl: 'https://example.com/image3.jpg',
    },
  ],
};

const EventCard = ({ title, date, imageUrl }) => {
  return (
    <div className='small-event-card'>
      <div
        className='small-event-thumbnail'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <p className='small-event-title'>{title}</p>
      <p className='small-event-date'>{date}</p>
    </div>
  );
};

const TopDestinationPage = () => {
  return (
    <div className='top-destination-container'>
      {/* 왼쪽 콘텐츠 */}
      <div className='top-destination-content'>
        <h1 className='page-title'>인기 여행지 TOP 10</h1>
        <hr />
        {destinations.slice(0, 10).map((destination, index) => (
          <div key={index} className='destination-section'>
            <h2 className='destination-title'>{`${
              index + 1
            }. ${destination} 여행`}</h2>
            <div className='small-event-list'>
              {events[destination]?.slice(0, 3).map((event, eventIndex) => (
                <EventCard
                  key={eventIndex}
                  title={event.title}
                  date={event.date}
                  imageUrl={event.imageUrl}
                />
              ))}
            </div>
            <a href='#' className='view-more'>
              더보기 &gt;
            </a>
          </div>
        ))}
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className='top-10-sidebar'>
        <h2 className='sidebar-title'>TOP 10 한 눈에 보기</h2>
        <ul className='sidebar-list'>
          {destinations.slice(0, 10).map((destination, index) => (
            <li key={index} className='sidebar-item'>
              {index + 1}. {destination}여행
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopDestinationPage;
