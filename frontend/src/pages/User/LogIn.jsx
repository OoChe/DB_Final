import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/User.css";
import SubmitButton from '../../components/SubmitButton.jsx';
import LinkButton from '../../components/LinkButton.jsx';

const LogIn = () => {
  // State to manage form input values
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can use id and password values here to send a request to your backend
    console.log('Submitting:', { id, password });
    // Example: You might want to send a POST request to login
    // fetch('/loginProcess', {
    //   method: 'POST',
    //   body: JSON.stringify({ id, password }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
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
        <LinkButton to="/signup" text="회원가입" />
      </form>
    </div>
  );
};

export default LogIn;
