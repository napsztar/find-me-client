import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import logo from '../../image/logo.png';
import '../../styles/main.scss';
import { store } from '../../contexts/store';
import { login, logout } from '../../contexts/actionCreators';

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginState, dispatch] = useContext(store);

  const signInSuccess = e => {
    e.preventDefault();
    dispatch(login());
    // advaced :: Login여부 로컬스토리지에 저장하는 작업
    history.push('/intro');
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSignIn = async e => {
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력하세요');
    } else {
      await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/users/signin`,
        {
          email: email,
          password: password,
        },
        { 'Content-Type': 'application/json', withCredentials: true },
      );
      await signInSuccess(e);
    }
  };

  const socialLoginHandler = () => {
    window.location.assign(
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=101615654292-d5eqm5ke1i58qcqbfg0ktrp7hdbd0mpt.apps.googleusercontent.com&scope=email profile&redirect_uri=http://localhost:3000',
    );
  };

  return (
    <div className="container signin">
      <div className="logo-container">
        <img src={logo} alt="logo" width="90%" height="230px"></img>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div className="email-container">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Write your Email"
            onChange={onChangeEmail}
          ></input>
        </div>
        <div className="password-container">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Write your password"
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
      <hr />

      <div className="social-container">
        <button className="social-signin" onClick={socialLoginHandler}>
          <FcGoogle size="25" />
          <span>Google 계정으로 로그인</span>
        </button>
        <button className="signup-info-container">
          <span className="blinking">계정이 없으신가요?</span>
          <Link to="/users/signup">가입하기</Link>
        </button>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
