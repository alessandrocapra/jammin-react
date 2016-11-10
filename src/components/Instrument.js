import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

// TODO
// 1. Retrieve the appropriate image from the database

class Instrument extends Component {
  render(){
    return(
      <article>
        <Row>
          <Col xs={12} sm={3}>
            <img src={this.props.image} alt={this.props.name}/>
          </Col>
          <Col xs={12} sm={9}>
            <h4>{this.props.name}</h4>
          </Col>
        </Row>
      </article>
    );
  }
}

export default Instrument;
