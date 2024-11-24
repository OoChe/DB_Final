import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import SubmitButton from '../../components/SubmitButton.jsx';
import LinkButton from '../../components/LinkButton.jsx';

const ModifyUserInfo = () => {
  // 상태 관리 (useState로 폼 데이터 저장)
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [tel, setTel] = useState('');

  // 데이터 불러오기 (예: useEffect로 서버에서 정보 가져오기)
  useEffect(() => {
    // 예시: 데이터 로드 (API 호출을 통해 사용자 정보 가져오기)
    // 실제로는 `fetch`나 `axios` 등을 사용해 서버에서 데이터를 가져오세요.
    const userData = {
      id: "user123",
      password: "password123",
      name: "John Doe",
      birth: "1990-01-01",
      tel: "010-1234-5678"
    };

    // 불러온 데이터를 상태로 설정
    setId(userData.id);
    setPassword(userData.password);
    setName(userData.name);
    setBirth(userData.birth);
    setTel(userData.tel);
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터 처리
    const formData = { id, password, name, birth, tel };
    console.log('Form Submitted:', formData);
    // 예: fetch로 서버에 제출할 수 있음
    // fetch('updateUserInfoEndpoint', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } });
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
            <SubmitButton text="수정" onSubmit={handleSubmit} size = 'small'/>
            <LinkButton to="/mypage" text="취소" />
        </div>
      </form>
    </div>
  );
};
export default ModifyUserInfo;
