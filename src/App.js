import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useState } from 'react';

import Add from './components/answer/Add';
import Edit from './components/answer/Edit';
import List from './components/answer/List';
import Read from './components/answer/Read';

import SignIn from './components/user/SignIn';
import SignUp from './components/user/Signup';
import MyPage from './components/user/Mypage';
import TestModal from './components/test/TestModal';
import Intro from './components/Intro';
import { QuestionProvider } from './contexts/question';

const App = ({ history }) => {
  const [signInStatus, setSignInStatus] = useState({
    isSignIn: false,
    accessToken: '',
  });

  const { isSignIn, accessToken } = signInStatus;

  const handleSignInSuccess = data => {
    setSignInStatus({
      isSignIn: true,
      accessToken: data.accessToken,
    });
    history.push('/intro');
  };

  const handleSignOutSuccess = () => {
    setSignInStatus({ isSignIn: false });
    history.push('/');
  };

  const handleDelete = () => {
    setSignInStatus({ isSignIn: false });
    history.push('/');
  };

  return isSignIn ? (
    <Intro />
  ) : (
    <div>
      <QuestionProvider>
        <Switch>
          <Route exact path="/">
            <SignIn handleSignInSuccess={handleSignInSuccess} />
          </Route>
          <Route exact path="/users/signup">
            <SignUp handleSignOutSuccess={handleSignOutSuccess} />
          </Route>
          <Route exact path="/test/modal" component={TestModal} />
          <Route exact path="/intro" component={Intro} />
          <Route exact path="/answer/" component={List} />
          <Route exact path="/answer/add" component={Add} />
          <Route exact path="/answer/:answerId/edit" component={Edit} />
          {/*<Route exact path="/answer/:answerId" component={Read} />*/}
          <Route exact path="/users">
            <MyPage handleDelete={handleDelete} />
          </Route>
        </Switch>
      </QuestionProvider>
    </div>
  );
};

export default withRouter(App);
