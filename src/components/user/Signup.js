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
    <div className="container signup">
      <Header signOutComplete={signOutComplete} />
      <div className="userinfo-container">
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeInput}
            ></input>
          </div>
          <div>
            <span>Nickname</span>
            <input
              type="nickName"
              name="nickName"
              value={nickName}
              onChange={onChangeInput}
            ></input>
          </div>
          <div>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangeInput}
            ></input>
          </div>
          <div>
            <span>Check Password</span>
            <input
              type="password"
              name="checkPassword"
              value={checkPassword}
              onChange={onChangeInput}
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
  );
};

export default withRouter(SignUp);
