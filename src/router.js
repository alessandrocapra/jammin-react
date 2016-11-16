import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// importing components
import App from './components/App';
import Home from './components/Home';
import Venues from './components/VenuePage';
import Profile from './components/Profile';
import SearchResultPage from './components/SearchResultPage';
import Faq from './components/Faq';

// import static data
import InstrumentList from './data/instruments';

// defining routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="venues" component={Venues} />
      <Route path="faq" component={Faq} />
      <Route path="profile/:userId" component={Profile} instruments={InstrumentList.STRUMENTI} />
      <Route path="search/:location/:instrument" component={SearchResultPage} />
    </Route>
  </Router>
);

export default routes;
