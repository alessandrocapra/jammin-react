import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

// TODO
// 1. Retrieve the appropriate image from the database

class Instrument extends Component {
    render(){
        return(
            <article className="instrument">
                <Row>
                    <Col xs={12} sm={2}>
                        <img src={this.props.image} alt={this.props.name}/>
                    </Col>
                    <Col xs={12} sm={10}>
                        <h4>{this.props.name}</h4>
                        <p>Been playing for 5 years</p>
                        <p>Been playing for 5 years</p>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default Instrument;
