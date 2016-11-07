import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

// importing components
import Home from './Home';
import Venues from './Venues';

// defining routes
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/venues" component={Venues} />
  </Router>
);
