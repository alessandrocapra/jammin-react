import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import Autocomplete from 'react-google-autocomplete';
// import {InputRange} from 'react-input-range'

// Load components
import SearchResultList from './SearchResultList';

class SearchResultPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            // add here the filter inputs
        };
    }

    render(){
        let location = this.props.params.location;
        let instrument = this.props.params.instrument;

        return (
            <div className="searchResultPage">
                <Row>
                    <Col xs={12}><h2>Search results for <span>{this.props.params.instrument}</span> around <span>{this.props.params.location}</span></h2></Col>
                </Row>
                <Row>
                    <Col xs={4} className="filter">
                        <h3>Filters</h3>
                        <Autocomplete
                            onPlaceSelected={(place) => {
                                console.log(place);
                            }}
                            types={['(regions)']} />
                        <input type="text" placeholder="Instruments"/>

                        <h4>Availability</h4>
                        <input name="availability" type="range" defaultValue={50} />

                        <Row>
                            <Col xs={6}>
                                <h4>Music played</h4>
                                {/* This list should be updated taking the info from the profile currently listed in the search results */}
                                <input type="checkbox" name="musicPlayed"/> Ostia <br/>
                                <input type="checkbox" name="musicPlayed"/> Ostia <br/>
                                <input type="checkbox" name="musicPlayed"/> Ostia <br/>
                                <input type="checkbox" name="musicPlayed"/> Ostia <br/>
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
                        <SearchResultList location={location} instrument={instrument} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchResultPage;