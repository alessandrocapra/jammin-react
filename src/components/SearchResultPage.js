import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import {FBAppDB} from '../modules/firebase';
import update from 'immutability-helper';

// Load components
import SearchResultList from './SearchResultList';

class SearchResultPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            instrument: "",
            availability: 2,
            music_play: [],
            music_listen: [],
            reviews: [],
            users: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        let location = this.props.params.location;
        let instrumentProp = this.props.params.instrument;
        this.setState({location: location, instrument: instrumentProp});

        FBAppDB.ref('users').orderByChild('location').equalTo(location).on('value', (snapshot) => {
            let profilesArray = snapshot.val();
            Object.keys(profilesArray).map((profile) => {
                let instrumentsArray = profilesArray[profile].instruments;
                if(instrumentsArray.length){
                    instrumentsArray.map((instrument) => {
                        // if one of the instruments is the one in the search, add the profile to the component state
                        if(instrument.name == instrumentProp.toLowerCase()){
                            console.log('instrProp: ' + instrumentProp +', profile: ' + profilesArray[profile].name + ' - playing : ' + instrument.name);
                            let currentUser = profilesArray[profile];
                            this.setState({users: update(this.state.users, {$push: [currentUser]})});
                        }
                    });
                } else {
                    console.log('Error: no profiles with instruments available!');
                }
            });
        });
    }

    handleChange(e){
        console.log('name: ' + e.target.name + ' - value: ' + e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount(){

        console.log()
        // THIS CODE IS NOT WORKING, PROBABLY BECAUSE IS STILL POPULATING THE STATE FOR USERS!
        // let musicListenArray = [];
        // console.log('this.state.users: ', this.state.users[0]);
        //
        // this.state.users.map((user) => {
        //     console.log('userr: ', user);
        //     user.music_listen.map((artist) => {
        //         console.log('artista: ', artist);
        //         musicListenArray.push(artist);
        //     });
        // });

        // console.log('music array: ', musicListenArray);
        // this.setState({music_listen: musicListenArray});
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
                                {this.state.music_listen ? this.state.music_listen.map((artist) => {
                                    console.log('arrrrr: ', artist);
                                    return <div><input type="checkbox" name={artist}/> {artist} </div>;
                                }) : <p>No influences defined by the users</p>}

                            </Col>
                            <Col xs={6}>
                                <h4>Music listened</h4>
                                {/* This list should be updated taking the info from the profile currently listed in the search results */}
                                <input type="checkbox" name="musicListened"/> Ostia <br/>
                                <input type="checkbox" name="musicListened"/> Ostia <br/>
                                <input type="checkbox" name="musicListened"/> Ostia <br/>
                                <input type="checkbox" name="musicListened"/> Ostia <br/>
                            </Col>
                        </Row>

                        <h4>Reviews</h4>
                        {/* This list should be updated taking the info from the profile currently listed in the search results */}
                        <input type="checkbox" name="review"/> Rockstar <br/>
                        <input type="checkbox" name="review"/> Super <br/>
                        <input type="checkbox" name="review"/> OK <br/>
                        <input type="checkbox" name="review"/> Not good <br/>

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