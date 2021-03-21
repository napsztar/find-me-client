import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Add from './components/answer/Add';
import Edit from './components/answer/Edit';
import List from './components/answer/List';
import Read from './components/answer/Read';

import SignIn from './components/user/SignIn';
import SignUp from './components/user/Signup';
import MyPage from './components/user/Mypage';
import axios from 'axios';
import { useState } from 'react';
import TestModal from './components/test/TestModal';
import Intro from './components/Intro';

//Switch 안에 계속 추가해서 설정하면 된다.
const App = ({ history }) => {
  const [signinStatus, setSigninstauts] = useState({
    isSignin: true,
    userInfo: null,
  });

  const { isSignin, userInfo } = signinStatus;

  //로그인 성공시 사용자정보와 로그인 상태변경해줘야함
  //path insert page로 이동 설정
  const handleSigninSuccess = () => {
    console.log('로그인성공 잘도착했니이이??');
    axios
      .get('http://localhost:5000//users/:userid', {
        'Content-Type': 'application/json',
      })
      //.then(res => console.log(res))
      .then(() => {
        setSigninstauts({ isSignin: true });
        history.push('/question');
      });
  };

  //회원탈퇴 처리, 로그인 상태변경해줘야함
  //랜딩페이지로 이동
  const handleDelete = () => {
    console.log('회원탈퇴 버튼씨 잘도착하셨습니까??');
    setSigninstauts({ isSignin: false });
    history.push('/');
    //.then(res => console.log(res));
  };


  //이미 로그인 상태라면 리다이렉트
  return isSignin ? (
    <Intro />
  ) : (
    <div>
      <Switch>
         <Route exact path="/">
          <Signin handleSigninSuccess={handleSigninSuccess} />
        </Route>
        <Route exact path="/users/signup" component={SignUp} />
        <Route exact path="/test/modal" component={TestModal} />
        <Route exact path="/users">
          <MyPage handleDelete={handleDelete} />
        </Route>
      </Switch>
    </div>
  );
};
export default withRouter(App);
