import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/EventInfo.css";
import "../../styles/Event.css";
import "../../styles/MyPage.css";
import EventList from "../../components/EventList.jsx"
import TagButton from '../../components/TagButton.jsx';
import CustomButton from '../../components/CustomButton.jsx';
import Bookmark from '../../components/Bookmark.jsx';

function MyPage() {
  const navigate = useNavigate();

  // const userData = {
  //   name: "동국이",
  //   userClass: "등급",
  //   id: "dongguki",
  //   birth: "동국이",
  //   tel: "010-1234-5678",
  // };
  const userID = localStorage.getItem('userID');
  const [userData, setUserData] = useState([]); // 이벤트 데이터를 저장할 상태
  const [selectedTag, setSelectedTag] = useState("전체");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // 백엔드에서 데이터를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      console.log(userID)
      if (!userID) {
        throw new Error('로그인된 사용자가 없습니다.');
      }
      const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }), // 아이디를 본문에 담아서 전송
      }); 
      console.log('API Response:', response);
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
      }
      const data = await response.json(); // JSON 데이터를 파싱
      console.log('Fetched User Data:', data);
      setUserData(data); // 상태에 저장
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 컴포넌트가 마운트되면 호출
  }, []);

  const handleUnregister = (e) => {
    e.preventDefault();
    
    
    // 탈퇴 확인 창 띄우기
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
        console.log('탈퇴:', { userID });
        
        // 회원 탈퇴 API 요청
        fetch('http://localhost:3001/api/unregister', { 
          method: "post", 
          headers: {      
            "content-type": "application/json",
          },
          body: JSON.stringify({ userID: userID }),
        })
        .then((res) => res.json())
        .then((json) => {            
          if(json.isSuccess === "True") {
            // 회원 탈퇴 후 로컬 스토리지 지우기
            localStorage.removeItem('userID');
            
            // 알림 띄우기
            alert('회원 탈퇴가 완료되었습니다.');
            
            // 메인 화면으로 이동
            navigate('/');
            window.location.reload(); // 페이지 새로 고침
          }
          else {
            alert(json.isSuccess); // 실패 시 알림
          }
        })
        .catch((err) => {
          console.error('탈퇴 실패:', err);
          alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
        });
    }
};
  return (

    <div className="info-container">
      {/* 유저 데이터 표시 */}
      <div className="user-info">
        <h1 className="user-title">{userData.UserName} 님</h1>
        <table className="user-details-table">
          <tbody>
            <tr>
              <td><strong>등급:</strong></td>
              <td>{userData.UserGrade}</td>
            </tr>
            <tr>
              <td><strong>ID:</strong></td>
              <td>{userData.UserID}</td>
            </tr>
            <tr>
              <td><strong>생년월일:</strong></td>
              <td>{userData.UserBirth}</td>
            </tr>
            <tr>
              <td><strong>전화번호:</strong></td>
              <td>{userData.UserPhone}</td>
            </tr>
          </tbody>
        </table>
        <CustomButton
              text={'내 정보 수정'}
              textColor={'#000000'}
              innerColor={'#CBEDF5'}
              borderColor={'#9FCED9'}
              onClick={() => navigate('/modifyUserInfo')}
            />
            <CustomButton
              text={'내가 작성한 후기'}
              textColor={'#000000'}
              innerColor={'#CBEDF5'}
              borderColor={'#9FCED9'}
              onClick={() => navigate('/myReview')}
            />
            <CustomButton
              text={'회원 탈퇴'}
              textColor={'#fff'}
              innerColor={'#59696C'}
              borderColor={'#2C2C2C'}
              onClick={handleUnregister}
            />
      </div>
      <div className = "bookmark-list">
        <h2>내 즐겨찾기</h2>
        <TagButton
            text="전체"
            onClick={() => handleTagClick("전체")}
            isSelected={selectedTag === "전체"}
          />
        <TagButton
            text="행사"
            onClick={() => handleTagClick("행사")}
            isSelected={selectedTag === "행사"}
          />
        <TagButton
            text="숙소"
            onClick={() => handleTagClick("숙소")}
            isSelected={selectedTag === "숙소"}
          />
       <Bookmark selectedTag={selectedTag} />
      </div>
    </div>
  );
}

export default MyPage;