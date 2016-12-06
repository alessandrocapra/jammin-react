import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        }
    }

    componentWillMount() {
        // Load user data
        let profileId = this.props.params.userId;
        var USER_DB = firebase.database().ref('users/' + profileId);

        return USER_DB.once('value').then(function (snapshot) {
            let user = snapshot.val();
            console.log(user);
            this.setState({user: user});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h2>Edit your profile</h2>
                    </Col>
                </Row>
                <Row className="edit">
                    <Col xs={4}>
                        <img src={this.state.user.image} alt=""/>
                    </Col>
                    <Col xs={8}>
                        <h2>My info</h2>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name <input type="text" name="name" value={this.state.user.name}/>
                            </label>
                            <label htmlFor="surname">
                                Surname <input type="text" name="surname" value={this.state.user.surname}/>
                            </label>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Register;
