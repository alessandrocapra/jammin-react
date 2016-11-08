import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// importing components
import App from './components/App';
import Home from './components/Home';
import Venues from './components/Venues';
import Profile from './components/Profile';

// defining routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="venues" component={Venues} />
      <Route path="profile" component={Profile} />
    </Route>
  </Router>
);

export default routes;
