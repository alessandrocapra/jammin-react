import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
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

    handleInstrumentChange(event){
        console.log('instrument clicked: ', event.target.value);
        this.setState({instrument: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        browserHistory.push('search/' + this.state.location + '/' + this.state.instrument);
    }

    render(){

        return(
            <form>
                <Autocomplete
                    onPlaceSelected={(place) => {
                        console.log(place);
                        this.setState({location: place.name});
                    }}
                    types={['(regions)']} value={this.state.location} onChange={this.handleLocationChange}
                    className="autocompleteLocation" />
                <div className="text-center">
                    <select name="instruments" value={this.state.instrument} placeholder="Select instrument..." onChange={this.handleInstrumentChange}>
                        <option value="selected" selected>Select an instrument...</option>
                        {this.props.instruments.map((instrument) => {
                            return <option key={instrument.value} value={instrument.label}>{instrument.label}</option>;
                        })}
                    </select>
                </div>

                <button type="button" onClick={this.handleSubmit}>Search Jammers</button>
            </form>
        );
    }
}

export default SearchForm;

