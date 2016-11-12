import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

// TODO
// 1. Retrieve the appropriate image from the database

class Instrument extends Component {
    render(){
        return(
            <article className="instrument">
                <Row>
                    <Col xs={12} sm={2}>
                        <img className="profile_pic" src={this.props.image} alt={this.props.name}/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <h4>{this.props.name}</h4>
                        <p>Been playing for {this.props.experience} years</p>
                    </Col>
                    <Col xs={12} sm={6}>
                        <h4>Overall Rating</h4>
                        <FontAwesome name={this.props.rating} size="4x"/>
                        <p>95% positive opinions</p>
                    </Col>
                </Row>
                <hr/>
            </article>
        );
    }
}

export default Instrument;
