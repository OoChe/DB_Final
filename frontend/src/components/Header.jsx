/* [헤더 컴포넌트]
 */
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import CustomButton from './CustomButton';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 여부 상태
  const [userID, setUserID] = useState(null); // 로그인한 유저 아이디 
  const navigate = useNavigate();

  // 로그인 상태 확인 - 세션 대신 local storage 사용.. 
  const isLogin = async () => {
    const storedUserID = localStorage.getItem('userID');
    console.log("저장된아이디", storedUserID)
    if (storedUserID) {
      setIsLoggedIn(true);
      setUserID(storedUserID);
    } else {
      setIsLoggedIn(false);
    }
    // try {
    //   const response = await fetch('http://localhost:3001/api/loginCheck',
    //     { method: 'GET', credentials: 'include' }
    //   ); // Node.js API 호출 
    //   const data = await response.json(); // JSON 데이터를 파싱
    //   console.log(data.userID)
    //   if (data.userID) {
    //     setIsLoggedIn(true);  // 로그인 상태로 변경
    //     setUserID(data.userID);  // 사용자 ID 저장
    //   } else {
    //     setIsLoggedIn(false);  // 로그인되지 않은 상태
    //   }
    // } catch (error) {
    //   console.error('로그인 상태 확인 오류:', error);
    //     setIsLoggedIn(false);  // 로그인되지 않은 상태로 처리
    // }
    
  };

  useEffect(() => {
    isLogin(); // 컴포넌트가 마운트되면 호출
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
    setUserID(null);
    navigate('/');
  };

  const menuItems = [
    { label: '행사', path: '/event' },
    { label: '숙소', path: '/hotel' },
    { label: '인기 여행지 TOP 10', path: '/top-destinations' },
    { label: '숙소 등록', path: '/enrollhotel' },
  ];

  return (
    <div className='header-container'>
      {/* 메뉴 섹션 */}
      <div className='title-text' onClick={() => navigate('/')}>
        Travel Guide
      </div>
      <div className='header-menu'>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className='menu-item'
            onClick={() => navigate(item.path)}
          >
            <p className='menu-text'>{item.label}</p>
          </div>
        ))}
      </div>

      {/* 버튼 섹션 */}
      {isLoggedIn ? (
        <>
          <CustomButton
            text={'마이페이지'}
            textColor={'#000000'}
            innerColor={'#CBEDF5'}
            borderColor={'#9FCED9'}
            onClick={() => navigate('/mypage')}  // 마이페이지로 이동
          />
          <CustomButton
              text={'로그아웃'}
              textColor={'#fff'}
              innerColor={'#59696C'}
              borderColor={'#2C2C2C'}
              onClick={handleLogout}
            />
            </>
        ) : (
          <>
            <CustomButton
              text={'로그인'}
              textColor={'#000000'}
              innerColor={'#CBEDF5'}
              borderColor={'#9FCED9'}
              onClick={() => navigate('/login')}
            />
            <CustomButton
              text={'회원가입'}
              textColor={'#fff'}
              innerColor={'#59696C'}
              borderColor={'#2C2C2C'}
              onClick={() => navigate('/signup')}
            />
          </>
        )}
      {/* <div className="header-buttons">
        <CustomButton
          text={'로그인'}
          textColor={'#000000'}
          innerColor={'#CBEDF5'}
          borderColor={'#9FCED9'}
          onClick={() => navigate('/login')}
        />
        <CustomButton
          text={'회원가입'}
          textColor={'#fff'}
          innerColor={'#59696C'}
          borderColor={'#2C2C2C'}
          onClick={() => navigate('/signup')}
        />
      </div> */}
    </div>
  );
}

export default Header;
