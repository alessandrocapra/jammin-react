import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import {browserHistory} from 'react-router';

class Register extends Component {

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    signIn(){

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;

            // The signed-in user info.
            var user = result.user;

            // hide register button, show logout
            let register = document.getElementById('register-li').parentNode;
            register.style.display = 'none';

            let logout = document.getElementById('logout-li').parentNode;
            logout.style.display = 'inline';

            // redirect user to his profile
            browserHistory.push('profile/' + this.state.location + '/' + this.state.instrument.label);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    render() {
        return (
            <Row className="register">
                <Col xs={3}>
                    <h2>Sign up</h2>
                    <button id="firebase-auth" onClick={this.signIn}>Sign in</button>
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
