import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import SubmitButton from '../../components/SubmitButton.jsx';
import LinkButton from '../../components/LinkButton.jsx';
import CustomButton from '../../components/CustomButton.jsx';

const ModifyUserInfo = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  // 상태 관리 (useState로 폼 데이터 저장)
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [tel, setTel] = useState('');
  const userID = localStorage.getItem('userID');

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
      setUserData(data);
      setId(data.UserID || ''); // 기존 사용자 데이터로 폼 초기화
      setPassword(data.Password || ''); // 비밀번호는 변경할 때만 처리
      setName(data.UserName || '');
      setBirth(data.UserBirth || '');
      setTel(data.UserPhone || '');
  } catch (error) {
    console.error('API 호출 실패:', error);
  }
};

useEffect(() => {
  fetchUserInfo(); // 컴포넌트가 마운트되면 호출
}, []);


  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { userID, id, password, name, birth, tel };

    console.log('Form Submitted:', formData);

    try {
      const response = await fetch('http://localhost:3001/api/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('정보가 성공적으로 수정되었습니다.');
      } else {
        alert('정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
    }
  };


  return (
    <div className = "form-container">
      <h1 className="title-center">내 정보 수정</h1>
      <form onSubmit={handleSubmit}>
        아이디
        <div className="form-group">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        비밀번호
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        이름
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        생년월일
        <div className="form-group">
          <input
            type="date"
            name="birth"
            placeholder="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>
        전화번호
        <div className="form-group">
          <input
            type="text"
            name="tel"
            placeholder="000-0000-0000"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div btn-container>
            <CustomButton
              text={'수정'}
              textColor={'#000000'}
              innerColor={'#CBEDF5'}
              borderColor={'#9FCED9'}
              onClick={handleSubmit}
            />
            <CustomButton
              text={'취소'}
              textColor={'#fff'}
              innerColor={'#59696C'}
              borderColor={'#2C2C2C'}
              onClick={() => navigate('/mypage')}
            />
        </div>
      </form>
    </div>
  );
};
export default ModifyUserInfo;
