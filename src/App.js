import { Switch, Route, withRouter } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import Add from './pages/Answer/Add';
import Edit from './pages/Answer/Edit';
import List from './pages/Answer/List';
import Read from './pages/Answer/Read';

import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/Signup';
import MyPage from './pages/User/Mypage';
import Intro from './pages/Intro';
import axios from 'axios';

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
    } // eslint-disable-next-line
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
          <SignUp />
        </Route>
        <Route exact path="/signin" component={SignIn} />

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
