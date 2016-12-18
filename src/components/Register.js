import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import {FBAppAuth} from '../modules/firebase';
import {browserHistory} from 'react-router';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.signUpWithEmail = this.signUpWithEmail.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
        this.signInWithEmail = this.signInWithEmail.bind(this);
    }

    signInWithGoogle(){
        let provider = new firebase.auth.GoogleAuthProvider();

        FBAppAuth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;

            // The signed-in user info.
            let user = result.user;
            console.log('user info after login: ', user);

            // hide register button, show logout
            let register = document.getElementById('register-li').parentNode;
            register.style.display = 'none';

            let logout = document.getElementById('logout-li').parentNode;
            logout.style.display = 'inline';

            // redirect user to his profile
            console.log('user id in signin: ', user.uid);
            browserHistory.push('profile/' + user.uid);

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

    signUpWithEmail(e){
        e.preventDefault();
        var self = this;

        FBAppAuth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(function () {
            firebase.auth().currentUser.sendEmailVerification();
            browserHistory.push('/profile/edit/'+firebase.auth().currentUser.uid);
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage);

            let email = self.state.email;
            let password = self.state.password;

            let errorBox = document.getElementById('error-box');
            let errorMessageBox = document.getElementById('error-message');

            switch(errorCode) {
                case 'auth/email-already-in-use':
                    self.signInWithEmail(email, password, errorBox, errorMessageBox);
                    break;
                case 'auth/invalid-email':
                    console.log('invalid email!');
                    errorBox.className = "alert alert-danger";
                    errorMessageBox.innerHTML = '<span>Invalid email! Check it again!</span>';
                    break;
                case 'auth/weak-password':
                    errorBox.className = "alert alert-danger";
                    errorMessageBox.innerHTML = 'Password is too weak! Choose one with at least 6 characters';
                    break;
                default:
                    break;
            }
        });
    }

    signInWithEmail(email, password, errorBox, errorMessageBox){
        FBAppAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log('Sign in - ' + errorCode + ': ' + errorMessage);

            switch(errorCode) {
                case 'auth/wrong-password':
                    errorBox.className = "alert alert-danger";
                    errorMessageBox.innerHTML = 'Wrong password! Try again';
                    break;
            }
        });
    }

    handleEmailChange(event){
        this.setState({email: event.target.value})
    }

    handlePassword(event){
        this.setState({password: event.target.value})
    }

    handleConfirmPassword(event){
        this.setState({confirmPassword: event.target.value})
    }

    render() {
        return (
            <Row className="register">
                <Col xs={3}>
                    <h2>Sign up</h2>
                    <button id="firebase-auth" onClick={this.signInWithGoogle}>Sign in with Google</button>
                    <h3>Sign up via e-mail</h3>
                    <div className="form-group">
                        <form action="">
                            <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-mail address"/>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" />
                            <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} placeholder="Confirm password"/>
                            <button type="submit" onClick={this.signUpWithEmail}>Sign up</button>
                            <div  id="error-box" className="alert alert-danger hidden" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"> </span>
                                <span className="sr-only">Error:</span>
                                <span id="error-message">Email not valid. Check it again!</span>
                            </div>
                        </form>
                    </div>
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
