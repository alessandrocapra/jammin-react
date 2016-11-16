import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

// Example to import element from React-Bootstrap
import { Row, Col } from 'react-bootstrap';

class Home extends Component {
  saveUser(e) {
      e.preventDefault();

      // var database = Firebase.database();

      // var location=e.target[0].value;
      // var instrument=e.target[1].value;



      // How to write in the DB
      // database.ref('users/' + username).set({
      //     username: username,
      //     email: mail,
      // });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} className="headline">
            <h2>Find some talents to jam with in your area!</h2>
            <form onSubmit={this.saveUser}>
              <Autocomplete
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
                types={['(regions)']} />
              <input type="text" placeholder="Which instrument/s are you looking for?"/>
              <button type="submit">Search Jammers</button>
            </form>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center"><h2>How Jammin works</h2></Col>
        </Row>
        <Row className="facts">
          <Col xs={12} sm={4}>
            <h3>The Incredible Perks</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col xs={12} sm={4}>
            <h3>The Amazing Musicians</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
          <Col xs={12} sm={4}>
            <h3>The Unbelievable Performances</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
