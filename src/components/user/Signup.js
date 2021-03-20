import React, { useState } from 'react';
import '../../styles/main.scss';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });

  const { email, nickname, password, checkPassword } = inputs;

  const onChangeInput = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSignup = () => {
    if (!email || !nickname || !password || !checkPassword) {
      setErrorMessage('모든 항목을 입력해주세요');
    } else if (password !== checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다');
    } else {
      axios
        .post(
          'http://localhost:5000/users/signup',
          {
            email: email,
            nickname: nickname,
            password: password,
          },
          { 'Content-Type': 'application/json' },
        )
        .then(() => history.push('/'))
        .catch(err => {
          err.response.status === 409
            ? alert('이미 존재하는 회원입니다.')
            : alert(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <div>header</div>
      </div>
      <div className="userinfo-container">
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <span>Email</span>
            <input
              type="email"
              onChange={onChangeInput}
              name="email"
              value={email}
            ></input>
          </div>
          <div>
            <span>Nickname</span>
            <input
              type="nickname"
              onChange={onChangeInput}
              name="nickname"
              value={nickname}
            ></input>
          </div>
          <div>
            <span>Password</span>
            <input
              type="password"
              onChange={onChangeInput}
              name="password"
              value={password}
            ></input>
          </div>
          <div>
            <span>Check Password</span>
            <input
              type="password"
              onChange={onChangeInput}
              name="checkPassword"
              value={checkPassword}
            ></input>
          </div>
        </form>
      </div>
      <div className="signup-btn">
        <button onClick={handleSignup}>Signup</button>
        {errorMessage === '' ? null : (
          <div className="message-box">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Signup);
