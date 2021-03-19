import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/main.scss';

const Mypage = ({ handleDelete }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    changePassword: '',
  });

  const { email, nickname, password, changePassword } = inputs;

  //inputValue 상태변경
  const onChangeInput = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //비밀번호 변경(업데이트), changePassword처리 서버에 요청하기
  //변경성공 시 처리해주기
  const rePassword = () => {
    if (!email || !nickname || !password || !changePassword) {
      setErrorMessage({ errorMessage: '모든 항목은 필수입니다' });
    } else {
      axios
        .post(
          'http://localhost:5000/users/:userid/update',
          {
            email: email,
            nickname: nickname,
            password: password,
            changePassword: changePassword,
          },
          { 'Content-Type': 'application/json' },
        )
        .then(() => console.log('changed success'))
        .catch(err => console.log(err));
    }
  };

  //회원탈퇴, 비밀번호 변경 서로 다른 알림 나오게 변경하기 or 모달로 변경하기
  return (
    <div>
      <div classame="container">
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
              type="current-password"
              onChange={onChangeInput}
              name="password"
              value={password}
            ></input>
          </div>

          <div>
            <span>Change Password</span>
            <input
              type="new-password"
              placeholder="Enter a password to change"
              onChange={onChangeInput}
              name="changePassword"
              value={changePassword}
            ></input>
          </div>
          <button
            className="button-change-password"
            type="submit"
            onClick={rePassword}
          ></button>
          <button
            className="button-delete"
            type="submit"
            onClick={handleDelete}
          ></button>
          {errorMessage === '' ? null : (
            <div className="mssage-info">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default withRouter(Mypage);
