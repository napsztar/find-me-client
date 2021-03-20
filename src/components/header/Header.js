import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBookHeart } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import logo from '../../image/logo.png';
import '../../styles/main.scss';

const Header = () => {
  const [isToggleOn, setToggleOn] = useState(false);

  //토글 스위치버튼
  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };

  return (
    <div className="header-container">
      <header>
        <div className="header-logo">
          <img src={logo} alt="logo" width="90px" height="100px"></img>
        </div>
        <div className="header-lists">
          <button>
            <Link to="/intro">
              <BiBookHeart size="25" />
            </Link>
          </button>
        </div>
        <button className="header-lists" onClick={() => handleToggle()}>
          <BsFillPersonFill size="25" />
        </button>
        <div style={{ display: isToggleOn ? 'block' : 'none' }}>
          <Link to="/">마이페이지</Link>
        </div>
        <div style={{ display: isToggleOn ? 'block' : 'none' }}>
          <Link to="/">로그아웃</Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
