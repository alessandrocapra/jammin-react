import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import {FBAppAuth} from '../modules/firebase';
import firebase from 'firebase';

class Register extends Component {

    componentDidMount() {
        var self = this;
        var uiConfig = {
            'callbacks': {
                'signInSuccess': function(user) {
                    if (self.props.onSignIn) {
                        self.props.onSignIn(user);
                        console.log('user logged');
                        console.log(user.name);
                    }
                    return false;
                }
            },
            'signInOptions': [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        FBAppAuth.start('#firebaseui-auth', uiConfig);
    }

    componentWillUnmount() {
        FBAppAuth.reset();
    }

    render() {
        return (
            <Row className="register">
                <Col xs={3}>
                    <h2>Sign up</h2>
                    <div id="firebaseui-auth"></div>
                </Col>
                <Col xs={9}>
                    <h2>Take part in our incredible community!</h2>
                    <section>
                        <Row>
                            <Col xs={6}>
                                <img className="img-responsive" src="/img/venue1.jpg" alt=""/>
                            </Col>
                            <Col xs={6}>
                                <h3>Meet lots of musicians</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi consectetur cumque delectus et eveniet, ex facilis fugit ipsum minima nemo nesciunt omnis quaerat quos repellat reprehenderit repudiandae voluptatem! Porro!</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem culpa cum deserunt ducimus eos error facilis illo, ipsam molestias natus nostrum odio optio qui quisquam quod similique ullam voluptate.</p>
                            </Col>
                        </Row>
                    </section>
                    <section>
                        <Row>
                            <Col xs={6}>
                                <h3>Meet lots of musicians</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi consectetur cumque delectus et eveniet, ex facilis fugit ipsum minima nemo nesciunt omnis quaerat quos repellat reprehenderit repudiandae voluptatem! Porro!</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem culpa cum deserunt ducimus eos error facilis illo, ipsam molestias natus nostrum odio optio qui quisquam quod similique ullam voluptate.</p>
                            </Col>
                            <Col xs={6}>
                                <img className="img-responsive" src="/img/venue1.jpg" alt=""/>
                            </Col>
                        </Row>
                    </section>
                </Col>
            </Row>
        );
    }
}

export default Register;
