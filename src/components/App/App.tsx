import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppBar from '../AppBar';
import Tasks from '../../features/tasks/Tasks';
import { selectUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import Login from '../../features/auth/Login';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from '../../app/store';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <ConnectedRouter history={browserHistory}>
      <AppBar>
        <Switch>
          <Route exact path="/" component={Tasks} />
          {!user && <Route path="/login" component={Login} />}
          <Redirect to={'/'} />
        </Switch>
      </AppBar>
    </ConnectedRouter>
  );
}

export default App;
