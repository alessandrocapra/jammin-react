import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

// import components
import Review from './Review';
import Instrument from './Instrument';

class Profile extends Component {
  render(){
    return(
      <div>
        <Row>
          <Col xs={4}>
            <Row>
              <Col xs={12} className="left-sidebar">
                <img src="#" alt='lol'/>
                <h2 className="name">John Doe</h2>
                <h4>Male, 23 years old</h4>
                <h4> <FontAwesome name='globe' /> Location </h4>
                <section>
                  <h3>Availability</h3>
                  <p>3 times per week</p>
                </section>
                <section className="reviews">
                  <h3>Reviews</h3>
                  <Review />
                  <Review />
                </section>
              </Col>
            </Row>
          </Col>
          <Col xs={8}>
          <section>
            <h3>About me</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
          <section className="instruments">
            <h3>My instruments</h3>
            <Instrument />
            <Instrument />
          </section>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
