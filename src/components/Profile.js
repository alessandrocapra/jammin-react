import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

// import components
import Review from './Review';

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
          <Col xs={8}></Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
