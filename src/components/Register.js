import React, {Component} from 'react';
import firebase from 'firebase';
import {Row,Col} from 'react-bootstrap';

class Register extends Component {
    handleRegister(e){
        e.preventDefault();
        console.log('inside handleRegister');

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
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

    render(){

        return(
            <Row>
                <Col>
                    <h2>Register</h2>
                    <form onSubmit={this.handleRegister}>
                        <button type="submit">Register!</button>
                    </form>
                </Col>
            </Row>
        );
    }
}

export default Register;
