import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
import {browserHistory} from 'react-router';

import 'react-select/dist/react-select.css';

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            instrument: "",
        };

        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLocationChange(event){
        this.setState({location: event.target.value});
    }

    handleInstrumentChange(value){
        this.setState({instrument: value});
    }

    handleSubmit(event){
        event.preventDefault();
        browserHistory.push('search/' + this.state.location + '/' + this.state.instrument.label);
    }

    render(){
        // const options = [
        //     { value: 'guitar', label: 'Guitar' },
        //     { value: 'bass', label: 'Bass' }
        // ];

        return(
            <form onSubmit={this.handleSubmit}>
                <Autocomplete
                    onPlaceSelected={(place) => {
                        console.log(place);
                        this.setState({location: place.name});
                    }}
                    types={['(regions)']} value={this.state.location} onChange={this.handleLocationChange}
                    className="autocompleteLocation" />
                <Select
                    name="instruments"
                    value={this.state.instrument}
                    options={this.props.route.instruments}
                    onChange={this.handleInstrumentChange}
                />
                <button type="submit">Search Jammers</button>
            </form>
        );
    }
}

export default SearchForm;

