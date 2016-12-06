import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import {browserHistory} from 'react-router';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        }
    }

    render() {
        return (
            <Row className="register">
                <Col xs={12}>

                </Col>
            </Row>
        );
    }
}

export default Register;
