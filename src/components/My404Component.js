import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import NavLink from './NavLink';

class My404Component extends Component {
    render(){
        return(
            <div className="my404component">
                <Row>
                    <Col xs={6}>
                        <img className="not-found" src="img/404.jpg" alt="Page not found"/>
                    </Col>
                    <Col xs={6}>
                        <h2>Page not found</h2>
                        <p>It is weird, no content has been found on this page... probably someone rocked too hard and broke some strings?</p>
                        <p>While we are at it, you can go back to the <NavLink to="/">homepage</NavLink>!</p>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default My404Component;
