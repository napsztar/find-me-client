import React, { useState } from 'react';
import '../../styles/main.scss';
import logo from '../../image/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    setEmail({ email });
    setPassword('');
  };

  return (
    <div className="container">
      <div className="logo-contianer">
        <img src={logo} alt="logo" width="380px" height="400px"></img>
      </div>
      <div className="signin-container">
        <div className="email-container">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
          ></input>
        </div>
        <div className="password-container">
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
          ></input>
        </div>
        <div className="signin-btn-container">
          <button onClick={onClick}>Signin</button>
        </div>
        <hr></hr>
      </div>
      <div className="social-container">
        <span className="social-icon">소셜 아이콘 넣기</span>
        <span className="move-social">소셜페이지로(a태크로?link로?)</span>
      </div>

      <div className="signup-info-container">
        <span className="signup-info">계정이 없으신가요?</span>
        <span className="move-signup">가입하기(a태크로 링크)</span>
      </div>
    </div>
  );
};

export default SignIn;
