import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import SubmitButton from '../../components/SubmitButton.jsx';
import LinkButton from '../../components/LinkButton.jsx';
import CustomButton from '../../components/CustomButton.jsx';

const SignUp = () => {

  const navigate = useNavigate();
  // 상태 관리 (useState로 폼 데이터 저장)
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  const formData = {
    userId: id,
    userPassword: password,
    userName: name,
    userBirth: birth,
    userPhone: phone
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터 처리
    console.log('Form Submitted:', formData);
    fetch("http://localhost:3001/api/signup", { //signin 주소에서 받을 예정
      method: "post", // method :통신방법
      headers: {      // headers: API 응답에 대한 정보를 담음
        "content-type": "application/json",
      },
      body: JSON.stringify(formData), //userData라는 객체를 보냄
    })
      .then((res) => res.json())
      .then((json) => {
        if(json.isSuccess==="True"){
          alert('회원가입이 완료되었습니다!')
          navigate('/');
          //props.setMode("LOGIN");
        }
        else{
          alert(json.isSuccess)
        }
      });
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
            name="phone"
            placeholder="000-0000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <SubmitButton text="회원가입" onSubmit={handleSubmit} size ="big" />
        <div className="footer-text">
          계정이 이미 있으신가요?
        </div>
        <CustomButton
          text={'로그인'}
          textColor={'#fff'}
          innerColor={'#59696C'}
          borderColor={'#2C2C2C'}
          onClick={() => navigate('/login')}
        />
      </form>
    </div>
  );
};
export default SignUp;
