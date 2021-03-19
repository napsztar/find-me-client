import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Add from './components/answer/Add';
import Edit from './components/answer/Edit';
import List from './components/answer/List';
import Read from './components/answer/Read';

import Signin from './components/user/SignIn';
import Signup from './components/user/Signup';
import Mypage from './components/user/Mypage';
import axios from 'axios';

//Switch 안에 계속 추가해서 설정하면 된다.
const App = () => {
  //회원탈퇴 처리, 로그인 상태변경해줘야함
  const handleDelete = () => {
    axios.post('http://localhost:5000/users/:userid/delete', {
      'Content-Type': 'application/json',
      withCredentials: true,
    });
  };

  return (
    <div>
      <Switch>
        <Route path="/" component={Signin} />
        <Route exact path="/users/signup" component={Signup} />
        <Route
          exact
          path="/users"
          component={Mypage}
          handleDelete={handleDelete}
        />
      </Switch>
    </div>
  );
};
export default withRouter(App);
