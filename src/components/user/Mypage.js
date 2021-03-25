import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../header/Header';
import '../../styles/main.scss';

const MyPage = ({ handleSignOut }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    nickName: '',
    password: '',
    changePassword: '',
  });

  const { email, nickName, password, changePassword } = inputs;

  const onChangeInput = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleChangePassword = () => {
    if (!email || !nickName || !password || !changePassword) {
      setErrorMessage({ errorMessage: '모든 항목은 필수입니다' });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_HOST}/users/:userid/update`,
          {
            email: email,
            nickname: nickName,
            password: changePassword,
          },
          { 'Content-Type': 'application/json', withCredentials: true },
        )
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <div className="container">
        <Header />
        <div className="content mypage">
          <form onSubmit={e => e.preventDefault()}>
            <div className="email-container">
              <div>Email</div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChangeInput}
                placeholder="Enter your email"
              ></input>
            </div>
            <div className="nickname-container">
              <div>Nickname</div>
              <input
                type="nickName"
                name="nickName"
                value={nickName}
                onChange={onChangeInput}
                placeholder="Enter your nickname"
              ></input>
            </div>
            <div className="password-container">
              <div>Password</div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangeInput}
                placeholder="Enter your password"
              ></input>
            </div>
            <div className="change-password-container">
              <div>Change Password</div>
              <input
                type="password"
                name="changePassword"
                value={changePassword}
                onChange={onChangeInput}
                placeholder="Enter a password to change"
              ></input>
            </div>

            {errorMessage === '' ? null : (
              <div className="error-box">{errorMessage}</div>
            )}
            <button className="signout-btn" onClick={handleChangePassword}>
              비밀번호 변경
            </button>
            <button className="delete-btn" onClick={handleSignOut}>
              회원탈퇴
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MyPage);
