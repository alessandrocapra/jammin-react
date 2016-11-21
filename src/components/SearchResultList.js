import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import {FBAppDB} from '../modules/firebase';


import SearchResult from './SearchResult';

class SearchResultList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: {}
        }
    }

    componentWillMount(){
        const searchResults = FBAppDB.ref('users');
        // let instrument_ref = SEARCH_RESULTS.child('instruments');

        let location = this.props.location;
        let instrument = this.props.instrument;

        // let profiles = [];
        searchResults.on('value', (snap) => {
            let users = snap.val();
            const profiles = Object.keys(users).map((key) => users[key]);
            this.setState({ users: {...profiles}});
        });
    }

    render(){
        return(
            <Row>
                {Object.keys(this.state.users).map((key) => {
                    return <SearchResult user={this.state.users[key]} key={key} />
                })}
            </Row>
        );
    }
}

export default SearchResultList;