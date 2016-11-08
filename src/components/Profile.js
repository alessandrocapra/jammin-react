import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class Profile extends Component {
  render(){
    return(
      <div>
        <Row>
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <img src="#" alt='lol'/>
                <h2 className="name">John Doe</h2>
                <h4>Male, 23 years old</h4>
                <h4> <FontAwesome name='rocket' size='2x'/> Location </h4>
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
