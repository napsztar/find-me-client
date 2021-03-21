import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/main.scss';

const MyPage = ({ handleDelete }) => {
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
          { 'Content-Type': 'application/json' },
        )
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={e => e.preventDefault()}>
          <div className="email-container">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeInput}
            ></input>
          </div>
          <div className="nickName-container">
            <span>Nickname</span>
            <input
              type="nickName"
              name="nickName"
              value={nickName}
              onChange={onChangeInput}
            ></input>
          </div>
          <div className="password-container">
            <span>Password</span>
            <input
              type="password"
              name="current-password"
              value={password}
              onChange={onChangeInput}
            ></input>
          </div>
          <div className="change-password-container">
            <span>Change Password</span>
            <input
              type="password"
              name="new-password"
              value={changePassword}
              onChange={onChangeInput}
              placeholder="Enter a password to change"
            ></input>
          </div>
          <div className="btn-container">
            {errorMessage === '' ? null : (
              <div className="error-box">{errorMessage}</div>
            )}
            <button type="submit" onClick={handleChangePassword}>
              비밀번호 변경
            </button>
            <button type="submit" onClick={handleDelete}>
              회원탈퇴
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(MyPage);
