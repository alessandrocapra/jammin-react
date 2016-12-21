import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// importing components
import App from './components/App';
import Home from './components/Home';
import Venues from './components/VenuePage';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import SearchResultPage from './components/SearchResultPage';
import Faq from './components/Faq';
import Register from './components/Register';
import My404Component from './components/My404Component';

// import static data
import InstrumentList from './data/instruments';
import GenreList from './data/genres';


// defining routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App} onChange={(prevState, nextState) => {
      if (nextState.location.action !== "POP") {
        window.scrollTo(0, 0);
      }
    }}>
      <Route path="/" component={Home} instruments={InstrumentList} />
      <Route path="venues" component={Venues} />
      <Route path="faq" component={Faq} />
      <Route path="/profile/:userId" component={Profile} />
      <Route path="/profile/edit/:userId" component={EditProfile} instruments={InstrumentList} genres={GenreList}/>
      <Route path="register" component={Register} />
      <Route path="search/:location/:instrument" component={SearchResultPage} instruments={InstrumentList}/>
      <Route path='*' status={404} component={My404Component} />
    </Route>
  </Router>
);

export default routes;
