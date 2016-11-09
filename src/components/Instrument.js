import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

class Instrument extends Component {
  render(){
    return(
      <article>
        <Row>
          <Col xs={12} sm={3}>
            <img src={this.props.image} alt={this.props.name}/>
          </Col>
          <Col xs={12} sm={9}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Col>
        </Row>
      </article>
    );
  }
}

export default Instrument;
