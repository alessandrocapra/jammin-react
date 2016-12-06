import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        };

        this.handleChange = this.handleChange.bind(this);

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

    handleChange(e){
        this.setState({user : { ...this.state.user, [e.target.name]: e.target.value}});
        console.log('name: value', e.target.name, e.target.value);

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
                                Name <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="surname">
                                Surname <input type="text" name="surname" value={this.state.user.surname} onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="age">
                                Age <input type="text" name="age" placeholder="e.g. 23" value={this.state.user.age} onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="age">
                                Location
                                <Autocomplete
                                onPlaceSelected={(place) => {
                                    console.log(place);
                                    this.setState({user: { ...this.state.user, location: place.name}});
                                }}
                                types={['(regions)']} value={this.state.user.location} onChange={this.handleChange}
                                className="autocompleteLocation" />
                            </label>

                            <label htmlFor="about">
                                About me <textarea name="about" id="" cols="30" rows="10" placeholder="Present yourself to other musicians!">{this.state.user.about}</textarea>
                            </label>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Register;
