import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            instrument: "",
        }
    }

    submitSearch(){

    }
    render(){
        return(
            <form onSubmit={this.submitSearch}>
                <Autocomplete
                    onPlaceSelected={(place) => {
                        console.log(place);
                    }}
                    types={['(regions)']} />
                <input type="text" placeholder="Which instrument/s are you looking for?"/>
                <button type="submit">Search Jammers</button>
            </form>
        );
    }
}

export default SearchForm;

