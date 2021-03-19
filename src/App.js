import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Add from './components/answer/Add';
import Edit from './components/answer/Edit';
import List from './components/answer/List';
import Read from './components/answer/Read';

import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import Mypage from './components/user/Mypage';

//Switch 안에 계속 추가해서 설정하면 된다.
const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Signin} />
        <Route exact path="/users/signup" component={Signup} />
        <Route path="/users" component={Mypage} />
      </Switch>
    </div>
  );
};
export default withRouter(App);
