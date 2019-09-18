import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';

const App = ({ isLogged }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={isLogged ? Home : Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/player/:id' component={isLogged ? Player : Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
