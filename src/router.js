import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { FBApp } from './modules/firebase'

// importing components
import App from './components/App';
import Home from './components/Home';
import Venues from './components/VenuePage';
import Profile from './components/Profile';
import SearchResultPage from './components/SearchResultPage';

// Load user data
var USERS_DB = FBApp.ref('/users/');

// import static data
import InstrumentList from './data/instruments';

// defining routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App} users={USERS_DB}>
      <Route path="/" component={Home} />
      <Route path="venues" component={Venues} />
      <Route path="profile" component={Profile} users={USERS_DB} instruments={InstrumentList.STRUMENTI} />
      <Route path="search/:location/:instrument" component={SearchResultPage} />
    </Route>
  </Router>
);

export default routes;
