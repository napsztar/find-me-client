import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BiBookHeart } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from 'axios';
import logo from '../../image/logo.png';
import '../../styles/main.scss';
import requests from '../../utils/requests';
import { store } from '../../contexts/store';
import { logout } from '../../contexts/actionCreators';

const Header = ({ history }) => {
  const [isToggleOn, setToggleOn] = useState(false);
  const [storeState, dispatch] = useContext(store);

  const signOutComplete = e => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };

  const handleSignOut = async e => {
    await axios.post(
      requests.SIGN_OUT_PATH,
      { accessToken: storeState.accToken },
      {
        'Content-Type': 'application/json',
        withCredentials: true,
      },
    );
    await signOutComplete(e);
  };

  return (
    <header>
      <span>
        <img src={logo} alt="logo" width="300px" height="95px" />
      </span>
      <div>
        <div style={{ marginRight: 25 }}>
          <Link to="/intro">
            <BiBookHeart size="30" color="#B6867A" />
          </Link>
        </div>
        <div className="toggle" onClick={() => handleToggle()}>
          <BsFillPersonFill size="30" color="#B6867A" />
        </div>
        <div style={{ display: isToggleOn ? 'block' : 'none' }}>
          <Link to="/users">마이 페이지</Link>
        </div>
        <div
          style={{ display: isToggleOn ? 'block' : 'none' }}
          onClick={handleSignOut}
          className="signout-btn"
        >
          로그아웃
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
