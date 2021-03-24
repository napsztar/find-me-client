import axios from 'axios';
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/main.scss';
import { store } from '../../contexts/store';
import { login, logout } from '../../contexts/actionCreators';

const MyPage = ({ history }) => {
  const [storeState, dispatch] = useContext(store);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    nickName: '',
    password: '',
    changePassword: '',
  });

  const { email, nickName, password, changePassword } = inputs;

  const signOutSuccess = e => {
    e.preventDefault();
    dispatch(logout());
    history.push('/intro');
  };

  const onChangeInput = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleWithdawal = async e => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_HOST}/users/delete`,
        { accessToken: storeState.accToken },
        { 'Content-Type': 'application/json', withCredentials: true },
      )
      .catch(err => console.log(err));
    await signOutSuccess(e);
  };

  const handleChangePassword = async e => {
    if (!email || !nickName || !password || !changePassword) {
      setErrorMessage({ errorMessage: '모든 항목은 필수입니다' });
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_HOST}/users/update`,
          { accessToken: storeState.accToken, changePassword: changePassword },
          { 'Content-Type': 'application/json', withCredentials: true },
        )
        .catch(err => console.log(err));
      await signOutSuccess(e);
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
          <div className="btn-container">
            {errorMessage === '' ? null : (
              <div className="error-box">{errorMessage}</div>
            )}
            <button type="submit" onClick={handleChangePassword}>
              비밀번호 변경
            </button>
            <button type="submit" onClick={handleWithdawal}>
              회원탈퇴
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(MyPage);
