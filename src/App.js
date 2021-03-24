import { Switch, Route, withRouter } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Add from './components/answer/Add';
import Edit from './components/answer/Edit';
import List from './components/answer/List';
import Read from './components/answer/Read';

import SignIn from './components/user/SignIn';
import SignUp from './components/user/Signup';
import MyPage from './components/user/Mypage';
import TestModal from './components/test/TestModal';
import Intro from './components/Intro';
import axios from 'axios';

import { QuestionProvider } from './contexts/question';
import { store } from './contexts/store';
import { login } from './contexts/actionCreators';
import { getNeedLogInPage } from './utils/common';

const App = ({ history, location }) => {
  const [loginState, dispatch] = useContext(store);

  const signInSuccess = e => {
    e.preventDefault();
    dispatch(login());
    history.push('/intro');
  };

  const signOutComplete = e => {
    e.preventDefault();
  };

  useEffect(() => {
    const authCode = new URLSearchParams(location.search).get('code');
    if (authCode) {
      axios
        .post(
          'http://localhost:5000/callback',
          {
            code: authCode,
          },
          { 'Content-Type': 'application/json', withCredentials: true },
        )
        .then(() => signInSuccess());
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={getNeedLogInPage(Intro, loginState.isLoggedIn)}
        />
        <Route exact path="/users/signup">
          <SignUp signOutComplete={signOutComplete} />
        </Route>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/test/modal" component={TestModal} />

        <Route
          exact
          path="/intro"
          component={getNeedLogInPage(Intro, loginState.isLoggedIn)}
        />
        <Route
          exact
          path="/answer"
          component={getNeedLogInPage(List, loginState.isLoggedIn)}
        />
        <Route
          exact
          path="/answer/add"
          component={getNeedLogInPage(Add, loginState.isLoggedIn)}
        />
        <Route
          exact
          path="/answer/:answerId/edit"
          component={getNeedLogInPage(Edit, loginState.isLoggedIn)}
        />
        <Route
          exact
          path="/answer/:answerId"
          component={getNeedLogInPage(Read, loginState.isLoggedIn)}
        />
        <Route
          exact
          path="/users"
          component={getNeedLogInPage(MyPage, loginState.isLoggedIn)}
        />
      </Switch>
    </div>
  );
};

export default withRouter(App);
