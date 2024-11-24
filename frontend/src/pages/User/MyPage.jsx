import React from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/EventInfo.css";
import "../../styles/Event.css";
import "../../styles/MyPage.css";
import EventList from "../../components/EventList.jsx"
import TagButton from '../../components/TagButton.jsx';

function MyPage() {
  const { id } = useParams(); // URL에서 이벤트 ID 추출

  const userData = {
    name: "동국이",
    userClass: "등급",
    id: "dongguki",
    birth: "동국이",
    tel: "010-1234-5678",
  };

  return (

    <div className="info-container">
      {/* 유저 데이터 표시 */}
      <div className="user-info">
        <h1 className="user-title">{userData.name} 님</h1>
        <table className="user-details-table">
          <tbody>
            <tr>
              <td><strong>등급:</strong></td>
              <td>{userData.userClass}</td>
            </tr>
            <tr>
              <td><strong>ID:</strong></td>
              <td>{userData.id}</td>
            </tr>
            <tr>
              <td><strong>생년월일:</strong></td>
              <td>{userData.birth}</td>
            </tr>
            <tr>
              <td><strong>전화번호:</strong></td>
              <td>{userData.tel}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className = "bookmark-list">
        <h2>내 즐겨찾기</h2>
        <TagButton text="전체" label="전체" />
        <TagButton text="행사" label="event" />
        <TagButton text="숙소" label="hotel" />
        <EventList />
      </div>
    </div>
  );
}

export default MyPage;