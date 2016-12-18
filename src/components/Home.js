import React, { Component } from 'react';

// Example to import element from React-Bootstrap
import { Row, Col } from 'react-bootstrap';

// Components
import SearchForm from './SearchForm';

class Home extends Component {

    saveUser(e) {
        e.preventDefault();

        // var database = firebase.database();

        // var location=e.target[0].value;
        // var instrument=e.target[1].value;



        // How to write in the DB
        // database.ref('users/' + username).set({
        //     username: username,
        //     email: mail,
        // });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} className="headline">
                        <h2>Find some talents to jam with in your area!</h2>
                        <SearchForm instruments={this.props.route.instruments} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="h3homepageclass">
            <center><h2> How Jammin works </h2></center>
                    </Col>
                </Row>
                <Row className="facts">
                <Row>
                    <Col xs={12} className="imageclass">
                        <div className="module lr">
                        <h3>About Jammin</h3>
                        <p>Jammin is a community of musicians and musical artists. Joining Jammin is free and always will be.</p>
                        </div>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs={12} className= "imageclass">
                        <div className="module2 lr">
                        <h3>Find musicians</h3>
                        <p>Create a free profile, find musicians, contact them, form or join jammer groups to play music together.</p>
                        </div>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs={12} className="imageclass">
                        <div className="module3 lr">
                        <h3>Meet and Play</h3>
                        <p>Find a venue suggestion on our website, contact them, meet up, play and enjoy!</p>
                        </div>
                    </Col>
                    </Row>
                </Row>
            </div>
        );
    }
}

export default Home;
