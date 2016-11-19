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

    // getProfiles() {
    //     const users = this.state.user;
    //
    //     Object.keys(users).map((key, index) => {
    //         let user = users[key];
    //         console.log(user);
    //
    //         return <SearchResult user={user} />
    //     });
    // }

    render(){
        // Load user data
        let SEARCH_RESULTS = FBAppDB.ref('users');
        // let instrument_ref = SEARCH_RESULTS.child('instruments');

        let location = this.props.location;
        let instrument = this.props.instrument;

        let profiles = [];

        SEARCH_RESULTS.orderByChild('location').equalTo(location).once('value').then(function(snap){
            let user = snap.val();
            Object.keys(user).map(function (key) {
                console.log('key:', key);
            });

            profiles.push(<SearchResult user={user} />);
        });

        return(
            <Row>
                {profiles}
            </Row>
        );
    }
}

export default SearchResultList;