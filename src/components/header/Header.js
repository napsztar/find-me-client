import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBookHeart } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from 'axios';
import logo from '../../image/logo.png';
import '../../styles/main.scss';

const Header = ({ handleSignOutSuccess }) => {
  const [isToggleOn, setToggleOn] = useState(false);

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };

  const handleSignOut = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/users/signout`, {
        'Content-Type': 'application/json',
      })
      .then(() => handleSignOutSuccess());
  };

  return (
    <div className="header-container">
      <header>
        <div className="logo-container">
          <img src={logo} alt="logo" width="90px" height="100px"></img>
        </div>
        <div className="header-list">
          <button>
            <Link to="/intro">
              <BiBookHeart size="25" />
            </Link>
          </button>
          <button onClick={() => handleToggle()}>
            <BsFillPersonFill size="25" />
          </button>
          <div style={{ display: isToggleOn ? 'block' : 'none' }}>
            <Link to="/">마이페이지</Link>
          </div>
          <div style={{ display: isToggleOn ? 'block' : 'none' }}>
            <button onClick={handleSignOut}>로그아웃</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
