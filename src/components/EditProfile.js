import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import $ from 'jquery';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.musicPlayChange = this.musicPlayChange.bind(this);

    }

    componentWillMount() {
        // Load user data
        let profileId = this.props.params.userId;
        var USER_DB = firebase.database().ref('users/' + profileId);

        return USER_DB.once('value').then(function (snapshot) {
            let user = snapshot.val();
            this.setState({user: user});
        }.bind(this));
    }

    handleChange(e){
        this.setState({user : { ...this.state.user, [e.target.name]: e.target.value}});
        console.log('name: value', e.target.name, e.target.value);

    }

    getOptions(input, callback){
        var options = [];
        if(input.length){
            $.getJSON( "https://api.spotify.com/v1/search?q=" + input + "&type=artist", function( data ) {
                console.log('is it here?');
                var artistsArray = data.artists.items;
                $.each(artistsArray, function(key, value){
                    options.push({value: value.name, label: value.name});
                });
                console.log(options);
            });
        }

        setTimeout(function() {
            callback(null, {options: options});
        }, 500);
    }

    musicPlayChange(val){
        console.log('selected: ',val);
        this.setState({user: {...this.state.user, music_play: val.value}});
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
                        <div className="form-group">
                            <h2>My info</h2>
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
                                    this.setState({user: { ...this.state.user, location: place.name}});
                                }}
                                types={['(regions)']} value={this.state.user.location} onChange={this.handleChange}
                                className="autocompleteLocation" />
                            </label>
                            <label htmlFor="about">
                                About me <textarea name="about" id="" cols="30" rows="10" placeholder="Present yourself to other musicians!">{this.state.user.about}</textarea>
                            </label>
                            <h2>My music</h2>
                            <label htmlFor="music_play">
                                Music
                                <Select.Async
                                    name="music_play"
                                    loadOptions={this.getOptions}
                                    onChange={this.musicPlayChange}
                                    value={this.state.user.music_play}
                                />

                            </label>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Register;
