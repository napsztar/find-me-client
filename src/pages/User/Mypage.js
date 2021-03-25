import axios from 'axios';
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import '../../styles/main.scss';
import { OneModal, TwoModal } from '../../components/Modal/Modal';
import { store } from '../../contexts/store';
import { logout } from '../../contexts/actionCreators';
import requests from '../../utils/requests';

const MyPage = ({ history }) => {
  const [storeState, dispatch] = useContext(store);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    nickName: '',
    password: '',
    changePassword: '',
  });

  const [
    isChangePasswordModalDisplay,
    setIsChangePasswordModalDisplay,
  ] = useState(false);

  const handleChangePasswordModalDisplay = isOk => {
    setIsChangePasswordModalDisplay(false);
    if (isOk) {
      handleChangePassword();
    }
  };
  const [isWithdrawalModalDisplay, setIsWithdrawalModalDisplay] = useState(
    false,
  );
  const handleIsWithdrawalModalDisplay = isOk => {
    setIsWithdrawalModalDisplay(false);
    if (isOk) {
      handleWithdawal();
      history.push('/');
    }
  };
  const { email, nickName, password, changePassword } = inputs;

  const signOutSuccess = e => {
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
        requests.DELETE_USER_PATH,
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
          requests.UPDATE_PASSWORD_PATH,
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
            <button
              className="signout-btn"
              onClick={() => {
                setIsChangePasswordModalDisplay(true);
              }}
            >
              비밀번호 변경
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setIsWithdrawalModalDisplay(true);
              }}
            >
              회원탈퇴
            </button>
          </form>
        </div>
        <OneModal
          isModalDisplay={isChangePasswordModalDisplay}
          handleModalDisplay={handleChangePasswordModalDisplay}
          message="비밀번호가 변경되었습니다."
        />
        <TwoModal
          isModalDisplay={isWithdrawalModalDisplay}
          handleModalDisplay={handleIsWithdrawalModalDisplay}
          message="정말로 탈퇴하시겠습니까?"
        />
      </div>
    </div>
  );
};
export default withRouter(MyPage);
