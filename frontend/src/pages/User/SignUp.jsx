import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import SubmitButton from '../../components/SubmitButton.jsx';
import LinkButton from '../../components/LinkButton.jsx';

const SignUp = () => {
  // 상태 관리 (useState로 폼 데이터 저장)
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [tel, setCity] = useState('');

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터 처리
    const formData = { id, password, name, birth, tel };
    console.log('Form Submitted:', formData);
    // 예를 들어, fetch로 서버에 제출할 수 있음
    // fetch('signupProcess.jsp', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } });
  };

  return (
    <div className = "form-container">
      <h1 className="title-center">Register</h1>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        생년월일
        <div className="form-group">
          <input
            type="date"
            name="birth"
            placeholder="birth"
            value={birth}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        전화번호
        <div className="form-group">
          <input
            type="text"
            name="tel"
            placeholder="000-0000-0000"
            value={tel}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <SubmitButton text="회원가입" onSubmit={handleSubmit} size ="big" />
        <div className="footer-text">
          계정이 이미 있으신가요?
        </div>
        <LinkButton to="/login" text="로그인" />
      </form>
    </div>
  );
};
export default SignUp;
