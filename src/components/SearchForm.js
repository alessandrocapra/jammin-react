import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';
import Select from 'react-select';
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
        this.setState({instrument: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        window.location = 'search/' + this.state.location + '/' + this.state.instrument;
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <Autocomplete
                    onPlaceSelected={(place) => {
                        console.log(place);
                    }}
                    types={['(regions)']} value={this.state.location} onChange={this.handleLocationChange} />
                <input type="text" placeholder="Which instrument are you looking for?" value={this.state.instrument} onChange={this.handleInstrumentChange}/>
                <button type="submit">Search Jammers</button>
            </form>
        );
    }
}

export default SearchForm;

