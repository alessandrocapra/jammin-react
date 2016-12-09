import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import $ from 'jquery';

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                name: "",
                surname: "",
                age: "",
                gender: "",
                availability: "",
                location: "",
                about: "",
                image: "",
                instruments: [],
                music_listen: [],
                music_play: [],
                soundcloud: [],
                youtube: [],
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInstrumentChange= this.handleInstrumentChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.musicPlayChange = this.musicPlayChange.bind(this);
        this.musicListenChange = this.musicListenChange.bind(this);
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
        console.log('name: value', e.target.name, e.target.value);
        this.setState({user : { ...this.state.user, [e.target.name]: e.target.value}});

    }

    getOptions(input, callback){
        var options = [];
        if(input.length){
            $.getJSON( "https://api.spotify.com/v1/search?q=" + input + "&type=artist", function( data ) {
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

    musicListenChange(val){
        let musicListenArray = this.state.user.music_listen ? this.state.user.music_listen : [];
        musicListenArray.push(val.value);
        this.setState({user: {...this.state.user, music_listen: musicListenArray}});
    }

    saveData(){
        let user = this.state.user;
        let profileId = this.props.params.userId;

        firebase.database().ref('users/' + profileId).update({
            name: user.name,
            surname: user.surname,
            image : user.image,
            age: user.age,
            location: user.location,
            about: user.about,
            music_play: user.music_play,
            music_listen: user.music_listen,
        });
    }

    handleInstrumentChange(val){
        this.setState({user: {...this.state.user, instruments: val.value}});
    }

    saveInstrument(){

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
                        <img src={this.state.user.image} alt={this.state.user.name + this.state.user.surname} className="img-responsive"/>
                    </Col>
                    <Col xs={8}>
                        <div className="form-group">
                            <Row>
                                <Col xs={12}>
                                    <h2>My info</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>

                                </Col>
                                <Col xs={12} sm={6}>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <label htmlFor="name">
                                        Name <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange}/>
                                    </label>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <label htmlFor="surname">
                                        Surname <input type="text" name="surname" value={this.state.user.surname} onChange={this.handleChange}/>
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <label htmlFor="age">
                                        Age <input type="text" name="age" placeholder="e.g. 23" value={this.state.user.age} onChange={this.handleChange}/>
                                    </label>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <label id="radio-gender">
                                        Gender
                                        <div className="radio">
                                            <label>
                                                <input type="radio" value="option1" checked={true} />
                                                Option 1
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" value="option2" />
                                                Option 2
                                            </label>
                                        </div>
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <label htmlFor="location">
                                        Location
                                        <Autocomplete
                                            name="location"
                                            onPlaceSelected={(place) => {
                                                console.log('setting ' + place.name + ' as location in state');
                                                this.setState({user: { ...this.state.user, location: place.name}});
                                            }}
                                            types={['(regions)']} value={this.state.user.location} onChange={this.handleChange}
                                            className="autocompleteLocation" />
                                    </label>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <label htmlFor="availability">
                                        Availability <input type="text" name="availability" value={this.state.user.availability} onChange={this.handleChange}/>
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <label htmlFor="about">
                                        About me <textarea name="about" id="" cols="30" rows="10" placeholder="Present yourself to other musicians!" value={this.state.user.about} onChange={this.handleChange}></textarea>
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <h2>My instruments</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} id="instrument-form">
                                    <Select
                                        name="instruments"
                                        value={this.state.instrument}
                                        options={this.props.route.instruments}
                                        onChange={this.handleInstrumentChange}
                                    />
                                    <input type="text" name="experience" placeholder="Years of experience.." value="eh" onChange={this.handleChange}/>
                                    <button id="add-instrument">Add instrument</button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <div className="container-tags">
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <h2>My music</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <label htmlFor="music_play">
                                        What I like to play
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
                                    <label htmlFor="music_listen">
                                        Music influencers
                                        <Select.Async
                                            name="music_listen"
                                            loadOptions={this.getOptions}
                                            onChange={this.musicListenChange}
                                        />
                                    </label>
                                    <div className="container-tags">
                                        {this.state.user.music_listen ? this.state.user.music_listen.map((name,index) => {
                                            return <button className="btn btn-default"> {name} </button>;
                                        }) : <div></div>}
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

export default EditProfile;
