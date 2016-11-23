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
            <div id="firebaseui-auth"></div>
        );
    }
}

export default Register;
