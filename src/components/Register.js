import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import {FBAppAuth} from '../modules/firebase';
import {FBAppStorage} from '../modules/firebase';
import {browserHistory} from 'react-router';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            reg_email: "",
            reg_password: "",
            reg_confirmPassword: "",
            login_email: "",
            login_password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.signUpWithEmail = this.signUpWithEmail.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
        this.signInWithEmail = this.signInWithEmail.bind(this);
    }

    signInWithGoogle(){
        let providerGoogle = new firebase.auth.GoogleAuthProvider();

        FBAppAuth.signInWithPopup(providerGoogle).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;

            // The signed-in user info.
            let user = result.user;

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

        // here goes the check if password and confirmPassword match

        if (this.state.reg_password !== this.state.reg_confirmPassword) {
            document.getElementById('password').style = "border: #B21F10 2px solid";
            document.getElementById('confirm_password').style = "border: #B21F10 2px solid";
            document.getElementById('password-mismatching-error-box').className = "alert alert-danger";
        } else {

            FBAppAuth.createUserWithEmailAndPassword(this.state.reg_email, this.state.reg_password).then(function () {
                firebase.auth().currentUser.sendEmailVerification();
                browserHistory.push('/profile/edit/' + firebase.auth().currentUser.uid);
            }).catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorCode + ': ' + errorMessage);

                let email = self.state.email;
                let password = self.state.password;

                let errorBox = document.getElementById('register-error-box');
                let errorMessageBox = document.getElementById('register-error-message');

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        // self.signInWithEmail(email, password, errorBox, errorMessageBox);
                        errorBox.className = "alert alert-danger";
                        errorMessageBox.innerHTML = '<span>Email already in use, try to login ;)</span>';
                        break;
                    case 'auth/invalid-email':
                        console.log('invalid email!');
                        errorBox.className = "alert alert-danger";
                        errorMessageBox.innerHTML = '<span>Invalid email! Check it again!</span>';
                        document.getElementById('reg-email').style = "border: #B21F10 2px solid";
                        break;
                    case 'auth/weak-password':
                        errorBox.className = "alert alert-danger";
                        errorMessageBox.innerHTML = '<span>Password is too weak! Choose one with at least 6 characters</span>';
                        document.getElementById('password').style = "border: #B21F10 2px solid";
                        break;
                    default:
                        break;
                }
            });
        }
    }

    signInWithEmail(e){
	e.preventDefault();
        FBAppAuth.signInWithEmailAndPassword(this.state.login_email, this.state.login_password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log('Sign in - ' + errorCode + ': ' + errorMessage);

            let errorBox = document.getElementById('login-error-box');
            let errorMessageBox = document.getElementById('login-error-message');

            switch(errorCode) {
                case 'auth/wrong-password':
                    errorBox.className = "alert alert-danger";
                    errorMessageBox.innerHTML = '<span>Please check the password again.</span>';
                    document.getElementById('login-password').style = "border: #B21F10 2px solid";
                    break;
                case 'auth/invalid-email':
                    errorBox.className = "alert alert-danger";
                    errorMessageBox.innerHTML = '<span>Email is in the wrong format. <br>Type it again.</span>';
                    document.getElementById('login-email').style = "border: #B21F10 2px solid";
                    break;
                default:
                    break;
            }
        }).then(() => {
            browserHistory.push('/profile/'+firebase.auth().currentUser.uid);
        });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Row className="register headline">
                <Col xs={12} sm={3} smOffset={2}>
                    <h8> Returning Jammer? </h8>
                    <h2>Sign in </h2>
                    <div className="form-group">
                        <form action="">
                            <input id="login-email" name="login_email" type="text" value={this.state.login_email} onChange={this.handleChange} placeholder="E-mail address"/>
                            <input id="login-password" name="login_password" type="password" value={this.state.login_password} onChange={this.handleChange} placeholder="Password" />
                            <button type="submit" onClick={this.signInWithEmail}>Sign in</button>
                            <div id="login-error-box" className="alert alert-danger hidden" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"> </span>
                                <span className="sr-only">Error:</span>
                                <span id="login-error-message">Email not valid. Check it again!</span>
                            </div>
                        </form>
                    </div>
                    <button id="firebase-auth" onClick={this.signInWithGoogle}>Sign in with Google</button> 
                </Col>

                <Col xs={12} sm={3} smOffset={2}>
                    <h8> New to Jammin? </h8>
                    <h2>Sign up </h2>
                    <div className="form-group">
                        <form action="">
                            <input id="reg_email" name="reg_email" type="text" value={this.state.reg_email} onChange={this.handleChange} placeholder="E-mail address"/>
                            <input id="password" name="reg_password" type="password" value={this.state.reg_password} onChange={this.handleChange} placeholder="Password" />
                            <input name="reg_confirmPassword" id="confirm_password" type="password" value={this.state.reg_confirmPassword} onChange={this.handleChange} placeholder="Confirm password"/>
                            <div  id="password-mismatching-error-box" className="alert alert-danger hidden" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"> </span>
                                <span className="sr-only">Error:</span>
                                <span id="error-message">The passwords don't match!</span>
                            </div>
                            <button type="submit" onClick={this.signUpWithEmail}>Sign up</button>
                            <div  id="register-error-box" className="alert alert-danger hidden" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"> </span>
                                <span className="sr-only">Error:</span>
                                <span id="register-error-message">Email not valid. Check it again!</span>
                            </div>
                        </form>
                    </div>
                <button id="firebase-auth" onClick={this.signInWithGoogle}>Sign up with Google</button>
                </Col>
            </Row>
        );
    }
}

export default Register;
