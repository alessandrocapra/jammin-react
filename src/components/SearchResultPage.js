import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import {FBAppDB} from '../modules/firebase';
import update from 'immutability-helper';
import firebase from 'firebase';
import InstrumentList from '../data/instruments';

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
        this.cleanUsersState = this.cleanUsersState.bind(this);
    }

    getProfiles(){
        // let location = this.props.params.location;
        // let instrumentProp = this.props.params.instrument;
        if(!this.state.location.length){
            this.setState({location: this.props.params.location});
        }

        FBAppDB.ref('users').orderByChild('location').equalTo(this.state.location).on('value', (snapshot) => {
            let profilesArray = snapshot.val();
            console.log('Object.keys(profilesArray): ', profilesArray);
            Object.keys(profilesArray).map((profile) => {
                let instrumentsArray = profilesArray[profile].instruments;
                if(instrumentsArray.length){
                    instrumentsArray.map((instrument) => {
                        // if one of the instruments is the one in the search, add the profile to the component state
                        if((instrument.name == this.state.instrument.value) && (profilesArray[profile].id != firebase.auth().currentUser.uid)){
                            console.log('instrProp: ' + this.state.instrument +', profile: ' + profilesArray[profile].name + ' - playing : ' + instrument.name);
                            let currentUser = profilesArray[profile];
                            this.setState({users: update(this.state.users, {$push: [currentUser]}), music_listen: update(this.state.music_listen, {$push: [currentUser.music_listen]}), music_play: update(this.state.music_play, {$push: [currentUser.music_play]})});
                        }
                    });
                } else {
                    console.log('Error: no profiles with instruments available!');
                }
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
            console.log('instruuuuuuuuuuuuuuuu: ', instrument);
            if (instrument.label === instrumentProp) {
                this.setState({instrument: instrument});
            }
        });
    }

    cleanUsersState(){
        this.setState({users: []});
    }

    handleChange(e){
        console.log('name: ' + e.target.name + ' - value: ' + e.target.value);
        switch (e.target.name){
            case 'location':
                this.setState({[e.target.name]: e.target.value}, () => {
                    this.cleanUsersState();
                    this.getProfiles();
                });
                break;
            default:
                this.setState({[e.target.name]: e.target.value});
        }
    }

    handleInstrumentChange(value){
        this.setState({instrument: value}, () => {
            this.cleanUsersState();
            this.getProfiles();
        });
    }

    render(){

        return (
            <div className="searchResultPage">
                <Row>
                    <Col xs={12}><h2>Search results for <span>{this.props.params.instrument}</span> around <span>{this.props.params.location}</span></h2></Col>
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
                                            this.setState({location: place.name});
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
                                {this.state.music_listen.length ? this.state.music_listen.map((artist) => {
                                    return artist.map((single) => {
                                        return <div><input type="checkbox" name={single}/> {single} </div>;
                                    });
                                }) : <p>No influences defined by the users</p>}

                            </Col>
                            <Col xs={6}>
                                <label>
                                    Artists listened
                                </label>
                                {this.state.music_play.length ? this.state.music_play.map((artist) => {
                                    return artist.map((single) => {
                                        return <div><input type="checkbox" name={single}/> {single} </div>;
                                    });
                                }) : <p>No listened artists defined by the users</p>}
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