import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../styles/main.scss';
import logo from '../../image/logo.png';
import axios from 'axios';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력하세요!');
    } else {
      axios
        .post(
          'http://localhost:5000/users/signin',
          {
            email: email,
            password: password,
          },
          { 'Content-Type': 'application/json', withCredentials: true },
        )
        .then(() => console.log('success!'));
    }
  };

  return (
    <div className="container">
      <div className="logo-contianer">
        <img src={logo} alt="logo" width="380px" height="400px"></img>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div className="email-container">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
          ></input>
        </div>
        <div className="password-container">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
          ></input>
        </div>
        <div className="signin-btn-container">
          <button onClick={handleLogin}>Signin</button>
        </div>
        <div className="error-box">{errorMessage}</div>
      </form>

      <div className="social-container">
        <span className="social-icon">소셜 아이콘 넣기</span>
        <span className="move-social">소셜페이지로(a태크로?link로?)</span>
      </div>

      <div className="signup-info-container">
        <span className="signup-info">계정이 없으신가요?</span>
        <Link to="/users/signup">가입하기</Link>
      </div>
    </div>
  );
};

export default withRouter(Signin);
