import React, { Component } from 'react';
import Firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';

// Example to import element from React-Bootstrap
import { Row, Col } from 'react-bootstrap';

class Home extends Component {
  saveUser(e) {
      e.preventDefault();

      var database = Firebase.database();

      var username=e.target[0].value;
      var mail=e.target[1].value;

      database.ref('users/' + username).set({
          username: username,
          email: mail,
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} className="jumbotron">
            <h2>Find some talents to jam with in your area!</h2>
            <form onSubmit={this.saveUser}>
              <Autocomplete
                style={{width: '40%'}}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
                types={['(regions)']} />
              <input type="text" placeholder="Select a location"/>
              <input type="text" placeholder="Which instrument/s do you play?"/>
              <button type="submit">Search Jammers</button>
            </form>
          </Col>
        </Row>
        <Row className="facts">
          <Col xs={4}>
            <h3>The Incredible Perks</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col xs={4}>
            <h3>The Amazing Musicians</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col xs={4}>
            <h3>The Unbelievable Performances</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
