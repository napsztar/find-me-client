import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/Header';
import '../../styles/main.scss';

const SignUp = ({ history, signOutComplete }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    nickName: '',
    password: '',
    checkPassword: '',
  });

  const { email, nickName, password, checkPassword } = inputs;

  const onChangeInput = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    if (!email || !nickName || !password || !checkPassword) {
      setErrorMessage('모든 항목을 입력해주세요');
    } else if (password !== checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOST}/users/signup`,
          {
            email: email,
            nickname: nickName,
            password: password,
          },
          { 'Content-Type': 'application/json', withCredentials: true },
        )
        .then(() => history.push('/'))
        .catch(err => {
          err.response.status === 409
            ? setErrorMessage('이미 존재하는 회원입니다.')
            : alert(err);
        });
    }
  };

  return (
    <div className="container">
      <Header signOutComplete={signOutComplete} />
      <div className="content signup">
        <div className="userinfo-container">
          <form onSubmit={e => e.preventDefault()}>
            <div className="email-box">
              <div>Email</div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeInput}
                placeholder="Write your Email"
              ></input>
            </div>
            <div className="nickname-box">
              <div>Nickname</div>
              <input
                type="nickName"
                name="nickName"
                value={nickName}
                onChange={onChangeInput}
                placeholder="Write your Nickname"
              ></input>
            </div>
            <div className="password-box">
              <div>Password</div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangeInput}
                placeholder="Write your Password"
              ></input>
            </div>
            <div className="check-password-box">
              <div>Check Password</div>
              <input
                type="password"
                name="checkPassword"
                value={checkPassword}
                onChange={onChangeInput}
                placeholder="Check your Password"
              ></input>
            </div>
          </form>
        </div>
        <div>
          {errorMessage === '' ? null : (
            <div className="error-box">{errorMessage}</div>
          )}
          <button onClick={handleSignUp}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
