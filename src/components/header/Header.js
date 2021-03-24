import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BiBookHeart } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from 'axios';
import logo from '../../image/logo.png';
import '../../styles/main.scss';

const Header = ({ signOutComplete }) => {
  const [isToggleOn, setToggleOn] = useState(false);

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };

  const handleSignOut = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/users/signout`, {
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then(() => signOutComplete());
  };

  return (
    <div className="container signup header">
      <header>
        <span>
          <img src={logo} alt="logo" width="300px" height="95px"></img>
        </span>
        <div>
          <div>
            <Link to="/intro">
              <BiBookHeart size="40" color="#FB5B38" />
            </Link>
          </div>
          <div onClick={() => handleToggle()}>
            <BsFillPersonFill size="40" color="#FB5B38" />
          </div>
          <div style={{ display: isToggleOn ? 'block' : 'none' }}>
            <Link to="/users">마이페이지</Link>
          </div>
          <div
            style={{ display: isToggleOn ? 'block' : 'none' }}
            onClick={handleSignOut}
          >
            로그아웃
          </div>
        </div>
      </header>
    </div>
  );
};

export default withRouter(Header);
