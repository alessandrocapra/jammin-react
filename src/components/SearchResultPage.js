import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import {FBAppDB} from '../modules/firebase';
import update from 'immutability-helper';
import firebase from 'firebase';
import InstrumentList from '../data/instruments';
import $ from 'jquery';
/* eslint-disable */

// Load components
import SearchResultList from './SearchResultList';

class SearchResultPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            instrument: [],
            availability: 2,
            music_play: [],
            music_listen: [],
            reviews: [],
            users: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
        this.getProfiles = this.getProfiles.bind(this);
        this.cleanResults = this.cleanResults.bind(this);
    }

    getProfiles(){
        let finalProfiles = [];

        this.setState({users: [], music_play: [], music_listen: []}, () => {
            FBAppDB.ref('users').orderByChild('location').equalTo(this.state.location).on('value', (snapshot) => {
                let profilesArray = snapshot.val();
                Object.keys(profilesArray).map((profile) => {
                    let currentUser = profilesArray[profile];
                    if(currentUser.instruments.length){
                        currentUser.instruments.map((instrument) => {
                            // if one of the instruments is the one in the search, add the profile to the component state
                            if(instrument.name == this.state.instrument.value){
                                if(firebase.auth().currentUser && currentUser.id != firebase.auth().currentUser.uid) {
                                    currentUser.id = profile;
                                    finalProfiles.push(currentUser);
                                }
                            }
                        });
                    } else {
                        console.log('Error: no profiles with instruments available!');
                    }
                });

                // put all users in state
                let musicListen = [];
                let musicPlay = [];
                let music_listened_no_duplicates = {};
                let music_played_no_duplicates = {};

                finalProfiles.map((user) => {
                    if(user.music_listen){
                        for (let artist in user.music_listen){
                            user.music_listen[artist] in music_listened_no_duplicates
                                ? music_listened_no_duplicates[user.music_listen[artist]] = music_listened_no_duplicates[user.music_listen[artist]] + 1
                                : music_listened_no_duplicates[user.music_listen[artist]] = 1;
                        }
                    }
                    if(user.music_play){
                        for (let artist in user.music_play){
                            user.music_play[artist] in music_played_no_duplicates
                                ? music_played_no_duplicates[user.music_play[artist]] = music_played_no_duplicates[user.music_play[artist]] + 1
                                : music_played_no_duplicates[user.music_play[artist]] = 1;
                        }
                    }
                });

                musicListen.push(music_listened_no_duplicates);
                musicPlay.push(music_played_no_duplicates);

                this.setState({users: finalProfiles, music_listen: musicListen, music_play: musicPlay});

            });
        });
    }

    componentWillMount(){
        let location = this.props.params.location;
        let instrumentProp = this.props.params.instrument;
        this.setState({location: location, instrument: instrumentProp}, () => {
            this.getProfiles();
        });

        InstrumentList.filter((instrument) => {
            if (instrument.label === instrumentProp) {
                this.setState({instrument: instrument});
            }
        });
    }

    cleanResults(){
        // console.log('this.state.users cleaning -  BEFORE: ',this.state.users);
        // this.setState({users: [], music_play: [], music_listen: []}, () => {
        //     console.log('this.state.users cleaning - AFTER: ',this.state.users);
        // });
    }

    handleChange(e){
        console.log('name: ' + e.target.name + ' - value: ' + e.target.value);
        switch (e.target.name){
            case 'location':
                this.setState({[e.target.name]: e.target.value}, () => {
                    this.cleanResults();
                    // this.getProfiles();
                });
                break;
            default:
                this.setState({[e.target.name]: e.target.value});
        }
    }

    handleInstrumentChange(value){
        this.setState({instrument: value}, () => {
            this.getProfiles();
        });
    }

    render(){

        var influences_selected = [];
        $(document).ready(function() {
            $('#music_listen :checkbox').change(function() {

                var selected = this.name;
                if (this.checked) {
                    influences_selected.push(selected);
                } else {
                    var index = influences_selected.indexOf(selected);
                    influences_selected.splice(index, 1);
                }

                if (influences_selected.length == 0) {
                    $('.music_influence').each(function () {
                        $(this).parents().eq(3).css('display', 'block');
                    });
                } else {
                    $('.music_influence').each(function () {

                        var influences_matching = 0;
                        for (var influence in influences_selected) {
                            $(this).children('.tag').each(function () {
                                if ($(this).text() == influences_selected[influence]) {
                                    influences_matching += 1;
                                }
                            });
                        }

                        if (influences_matching == influences_selected.length) {
                            $(this).parents().eq(3).css('display', 'block');
                        } else {
                            $(this).parents().eq(3).css('display', 'none');
                        }
                    })
                }
            });

            var music_play_selected = [];
            $('#music_play :checkbox').change(function () {

                var selected = this.name;
                if (this.checked) {
                    music_play_selected.push(selected);
                } else {
                    var index = music_play_selected.indexOf(selected);
                    music_play_selected.splice(index, 1);
                }

                if (music_play_selected.length == 0) {
                    $('.music_play').each(function () {
                        $(this).parents().eq(3).css('display', 'block');
                    });
                } else {
                    $('.music_play').each(function () {

                        var music_play_matching = 0;
                        for (var music_play in music_play_selected) {
                            $(this).children('.tag').each(function () {
                                if ($(this).text() == music_play_selected[music_play]) {
                                    music_play_matching += 1;
                                }
                            });
                        }

                        if (music_play_matching == music_play_selected.length) {
                            $(this).parents().eq(3).css('display', 'block');
                        } else {
                            $(this).parents().eq(3).css('display', 'none');
                        }
                    })
                }
            })
        });

        return (
            <div className="searchResultPage">
                <Row>
                    <Col xs={12}><h2>Search results for <span>{this.state.instrument ? this.state.instrument.label : this.props.params.instrument }</span> around <span>{this.state.location}</span></h2></Col>
                </Row>
                <Row>
                    <Col xs={4} className="filter">
                        <Row>
                            <Col xs={12}>
                                <h3>Filters</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <label>
                                    Location
                                    <Autocomplete
                                        name="location"
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                            this.setState({location: place.name}, () => {
                                                this.cleanResults();
                                                this.getProfiles();
                                            });
                                        }}
                                        types={['(regions)']}
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <label>
                                    Instrument
                                    <Select
                                        name="instrument"
                                        value={this.state.instrument}
                                        options={this.props.route.instruments}
                                        onChange={this.handleInstrumentChange}
                                    />
                                </label>
                                <label>
                                    Availability
                                    <input
                                        type="range"
                                        name="availability"
                                        max="7"
                                        min="2"
                                        value={this.state.availability}
                                        onChange={this.handleChange}
                                    />
                                    <span>{this.state.availability} times per week</span>
                                </label>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6}>
                                <label>
                                    Influences
                                </label>
                                <div id="music_listen">
                                {this.state.music_listen.length ? this.state.music_listen.map((artist) => {
                                    return Object.keys(artist).map(function(artist_name){
                                        return <div><input type="checkbox" name={artist_name}/> {artist_name} ({artist[artist_name]}) </div>;
                                    })
                                }) : <p>No influences defined by the users</p>}
                                </div>
                            </Col>
                            <Col xs={6}>
                                <label>
                                    Artists listened
                                </label>
                                <div id="music_play">
                                {this.state.music_play.length ? this.state.music_play.map((artist) => {
                                    return Object.keys(artist).map(function (artist_name) {
                                        return <div><input type="checkbox" name={artist_name}/> {artist_name} ({artist[artist_name]}) </div>;
                                    })
                                }) : <p>No listened artists defined by the users</p>}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <label>
                                    Reviews
                                </label>
                                <input type="checkbox" name="review"/> Rockstar <br/>
                                <input type="checkbox" name="review"/> Super <br/>
                                <input type="checkbox" name="review"/> OK <br/>
                                <input type="checkbox" name="review"/> Not good <br/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <SearchResultList users={this.state.users} location={this.state.location} instrument={this.state.instrument} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchResultPage;