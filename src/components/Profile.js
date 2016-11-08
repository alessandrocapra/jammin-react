import React, {Component} from 'react';

class Profile extends Component {
  render(){
    return(
      <div>
        <Row>
          // Left sidebar with picture, availability etc.
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                Prova
              </Col>
            </Row>
            <img src="#" alt='lol'/>
          </Col>
          // Main contents of the profile
          <Col xs={8}></Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
