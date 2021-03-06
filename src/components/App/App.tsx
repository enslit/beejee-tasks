import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppBar from '../AppBar';
import Tasks from '../../features/tasks/';
import { selectUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import Login from '../../features/auth/Login';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from '../../app/store';
import MessageHandler from '../MessageHandler';

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
      <MessageHandler />
    </ConnectedRouter>
  );
}

export default App;
