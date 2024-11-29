import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import SubmitButton from '../../components/SubmitButton.jsx';
import CustomButton from '../../components/CustomButton.jsx';

const LogIn = (props) => {

  const navigate = useNavigate();
  // State to manage form input values
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const userData = {
    userId: id,
    userPassword: password,
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { id, password });
    fetch('http://localhost:3001/api/login', { 
      method: "post", 
      headers: {      
        "content-type": "application/json",
      },
      body: JSON.stringify(userData), //userData 객체 전송 
    })
      .then((res) => res.json())
      .then((json) => {            
        if(json.isLogin==="True"){
          localStorage.setItem('userID', id);
          navigate('/');
          window.location.reload();
        }
        else {
          alert(json.isLogin)
        }
      });
  };

  return (
    <div className = "form-container">
      <h1 className="title-center">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <SubmitButton text="로그인" onSubmit={handleSubmit} size="big" />
        <div className="footer-text">
          아직 계정이 없으신가요?
        </div>
        <CustomButton
          text={'회원가입'}
          textColor={'#fff'}
          innerColor={'#59696C'}
          borderColor={'#2C2C2C'}
          onClick={() => navigate('/signup')}
        />
      </form>
    </div>
  );
};

export default LogIn;
