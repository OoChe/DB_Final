import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // 스타일 파일 import
import CustomButton from './CustomButton';

function Header() {
  const navigate = useNavigate();

  const menuItems = [
    { label: '행사', path: '/events' },
    { label: '숙소', path: '/hotel' },
    { label: '인기 여행지 TOP 10', path: '/top-destinations' },
    { label: '숙소 예약', path: '/bookhotel' },
    { label: '숙소 등록', path: '/registerhotel' },
  ];

  return (
    <div className="header-container">
      {/* 메뉴 섹션 */}
      <div className="header-menu">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="menu-item"
            onClick={() => navigate(item.path)}
          >
            <p className="menu-text">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 버튼 섹션 */}
      <div className="header-buttons">
        <CustomButton
          text={'로그인'}
          textColor={'#000000'}
          innerColor={'#CBEDF5'}
          borderColor={'#9FCED9'}
        />
        <CustomButton
          text={'회원가입'}
          textColor={'#fff'}
          innerColor={'#59696C'}
          borderColor={'#2C2C2C'}
        />
      </div>
    </div>
  );
}

export default Header;
