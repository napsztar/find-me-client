import { Switch, Route, withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

const App = ({ history, location }) => {
  const [isSigned, setIsSigned] = useState(false);

  const signInSuccess = () => {
    setIsSigned({
      isSigned: true,
    });
  };

  const signOutComplete = () => {
    setIsSigned({ isSigned: false });
    history.push('/');
  };

  const socialLoginHandler = () => {
    window.location.assign(
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=101615654292-d5eqm5ke1i58qcqbfg0ktrp7hdbd0mpt.apps.googleusercontent.com&scope=email profile&redirect_uri=http://localhost:3000',
    );
  };

  useEffect(() => {
    const authCode = new URLSearchParams(location.search).get('code');
    //console.log(authCode);
    if (authCode) {
      function getAccessToken(authCode) {
        axios
          .post(
            'http://localhost:5000/callback',
            {
              code: authCode,
            },
            { 'Content-Type': 'application/json' },
          )
          .then(() => signInSuccess(), history.push('/intro'));
      }
      getAccessToken(authCode);
    }
  }, []);

  return isSigned ? (
    <Intro />
  ) : (
    <div>
      <Switch>
        <Route exact path="/">
          <SignIn
            signInSuccess={signInSuccess}
            socialLoginHandler={socialLoginHandler}
          />
        </Route>
        <Route exact path="/users/signup">
          <SignUp signOutComplete={signOutComplete} />
        </Route>
        <Route exact path="/test/modal" component={TestModal} />
        <Route exact path="/intro" component={Intro} />
        <Route exact path="/answer/" component={List} />
        <Route exact path="/answer/add" component={Add} />
        <Route exact path="/answer/:answerId/edit" component={Edit} />
        {/*<Route exact path="/answer/:answerId" component={Read} />*/}
        <Route exact path="/users">
          <MyPage signOutComplete={signOutComplete} />
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);
