import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import logo from '../../image/logo.png';
import '../../styles/main.scss';

const SignIn = ({ handleSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력하세요');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOST}/users/signin`,
          {
            email: email,
            password: password,
          },
          { 'Content-Type': 'application/json' },
        )
        .then(res => handleSignInSuccess(res.data))
        .catch(err => {
          err.response.status === 401
            ? setErrorMessage('일치하는 정보가 없습니다.')
            : alert(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="logo" width="380px" height="400px"></img>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div className="email-container">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={onChangeEmail}
          ></input>
        </div>
        <div className="password-container">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={onChangePassword}
          ></input>
        </div>
        <div className="signin-btn">
          {errorMessage === '' ? null : (
            <div className="error-box">{errorMessage}</div>
          )}
          <button type="submit" onClick={handleSignIn}>
            로그인
          </button>
        </div>
      </form>
      <div className="social-container">
        <span className="social-signin">
          <FcGoogle size="30" />
          <Link to="/">소셜페이지</Link>
        </span>
      </div>
      <div className="signup-info-container">
        <span className="signup-info">계정이 없으신가요?</span>
        <Link to="/users/signup">가입하기</Link>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
