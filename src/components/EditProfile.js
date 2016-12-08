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
        this.saveData = this.saveData.bind(this);

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
            });
        }

        setTimeout(function() {
            callback(null, {options: options});
        }, 500);
    }

    musicPlayChange(val){
        let musicPlayArray = this.state.user.music_play ? this.state.user.music_play : [];
        musicPlayArray.push(val.value);
        this.setState({user: {...this.state.user, music_play: musicPlayArray}});
    }

    saveData(){
        let user = this.state.user;
        let profileId = this.props.params.userId;

        firebase.database().ref('users/' + profileId).set({
            name: user.name,
            surname: user.surname,
            image : user.image,
            age: user.age,
            location: user.location,
            about: user.about,
            music_play: user.music_play,
            // music_listen: user.music_listen,
        });
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
                                About me <textarea name="about" id="" cols="30" rows="10" placeholder="Present yourself to other musicians!" onChange={this.handleChange}>{this.state.user.about}</textarea>
                            </label>
                            <h2>My music</h2>
                            <Row>
                                <Col xs={6}>
                                    <label htmlFor="music_play">
                                        Genres/Artists I listen to
                                        <Select.Async
                                            name="music_play"
                                            loadOptions={this.getOptions}
                                            onChange={this.musicPlayChange}
                                        />
                                    </label>
                                    <div id="music_like_container" className="container-tags">
                                        {this.state.user.music_play ? this.state.user.music_play.map((name,index) => {
                                            return <button className="btn btn-default"> {name} </button>;
                                        }) : <div></div>}
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <label htmlFor="music_play">
                                        Genres/Artists I play
                                        <Select.Async
                                            name="music_play"
                                            loadOptions={this.getOptions}
                                            onChange={this.musicPlayChange}
                                            value={this.state.user.music_play}
                                        />
                                    </label>
                                    <div id="music_play_container" className="container-tags">
                                    </div>
                                </Col>
                            </Row>
                            <div className="center-block">
                                <button className="btn btn-success" onClick={this.saveData}>Save</button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Register;
