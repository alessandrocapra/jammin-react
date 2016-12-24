import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import {FBAppDB} from '../modules/firebase';
import firebase from 'firebase';
import InstrumentList from '../data/instruments';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

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
        this.showFilters = this.showFilters.bind(this);
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
                                console.log(firebase.auth().currentUser);
                                if(firebase.auth().currentUser === null) {
                                    currentUser.id = profile;
                                    finalProfiles.push(currentUser);
                                } else if (firebase.auth().currentUser && currentUser.id != firebase.auth().currentUser.uid) {
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

                this.setState({users: finalProfiles, music_listen: musicListen, music_play: musicPlay}, () => {
                    console.log('Inseriti in state: ', this.state.users);
                });

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

    showFilters(){
        $(document).ready(() => {
            $('#showHideFilters').toggleClass('fa-chevron-down fa-chevron-up');
            $('.filters').toggle("slow");
        })
    }

    render(){

        var filters_selected = [];
        $(document).ready(() => {
            $('#filters1 :checkbox, #filters2 :checkbox').change(function() {

                // Get checkbox values
                var selected = this.name;
                if (this.checked) {
                    filters_selected.push(selected);
                } else {
                    // Remove filter from array
                    var index = filters_selected.indexOf(selected);
                    filters_selected.splice(index, 1);
                }

                // Check correspondence between checkbox values
                // and filter_options
                if (filters_selected.length == 0) {
                    // Show all elements -- no filter applied
                    $('.filter_options').each(function () {
                        $(this).parents().eq(2).css('display', 'block');
                    });
                } else {
                    $('.result_info').each(function () {

                        // Get all the filter options for every user
                        // returned with the search
                        var user_filter_options = [];
                        $(this).find('.tag').each(function(){
                            user_filter_options.push($(this).text());
                        });

                        // Calculate the number of matching between
                        // user_filter_options and the selected filters
                        var influences_matching = 0;
                        for (var filter in filters_selected){
                            if (user_filter_options.includes(filters_selected[filter])){
                                influences_matching += 1;
                            }
                        }

                        // Show and hide users based on filtering
                        if (influences_matching == filters_selected.length) {
                            $(this).parents().eq(1).css('display', 'block');
                        } else {
                            $(this).parents().eq(1).css('display', 'none');
                        }
                    })
                }
            });
        });

        return (
            <div className="searchResultPage">
                <Row>
                    <Col xs={12}><h2>Search results for <span>{this.state.instrument ? this.state.instrument.label : this.props.params.instrument }</span> around <span>{this.state.location}</span></h2></Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Row>
                            <Col xs={12}>
                                <h3>Filters <FontAwesome id="showHideFilters" name='chevron-down' onClick={this.showFilters}/></h3>
                            </Col>
                        </Row>
                        <div className="filters">
                            <Row>
                                <Col xs={12}>
                                    <label>
                                            <h5> Location </h5>
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
                                        <h5> Instrument </h5>
                                        <Select
                                            name="instrument"
                                            value={this.state.instrument}
                                            options={this.props.route.instruments}
                                            onChange={this.handleInstrumentChange}
                                        />
                                    </label>
                                    <label>
                                       <h5> Availability - {this.state.availability} times per week </h5>
                                        <input
                                            type="range"
                                            name="availability"
                                            max="7"
                                            min="1"
                                            value={this.state.availability}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} sm={6}>
                                    <label>
                                        <h5> Influences </h5>
                                    </label>
                                    <div id="filters1">
                                        {this.state.music_listen.length ? this.state.music_listen.map((artist) => {
                                            return Object.keys(artist).sort().map(function(artist_name){
                                                return <div><input type="checkbox" name={artist_name}/> {artist_name} ({artist[artist_name]}) </div>;
                                            })
                                        }) : <p>No influences defined by the users</p>}
                                    </div>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <label>
                                        <h5> Artists listened </h5>
                                    </label>
                                    <div id="filters2">
                                        {this.state.music_play.length ? this.state.music_play.map((artist) => {
                                            return Object.keys(artist).sort().map(function (artist_name) {
                                                console.log('inside', artist_name, artist[artist_name]);
                                                return <div><input type="checkbox" name={artist_name}/> {artist_name} ({artist[artist_name]}) </div>;
                                            });
                                        }) : <p>No listened artists defined by the users</p>}
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <label>
                                        <h5> Reviews </h5>
                                    </label>
                                    <input type="checkbox" name="review"/> Rockstar <br/>
                                    <input type="checkbox" name="review"/> Super <br/>
                                    <input type="checkbox" name="review"/> OK <br/>
                                    <input type="checkbox" name="review"/> Not good <br/>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} sm={8}>
                        <SearchResultList users={this.state.users} location={this.state.location} instrument={this.state.instrument} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchResultPage;