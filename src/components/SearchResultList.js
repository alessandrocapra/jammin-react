import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import update from 'react-addons-update';
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
        searchResults.orderByChild('location').equalTo(location).on('value', (snap) => {
            let users = snap.val();
            const profiles = Object.keys(users).map((key) => users[key]);
            this.setState({ users: {...profiles}});
        });

        console.log('state: ', this.state.users);
    }

    render(){
        return(
            <Row>
                {/*{*/}
                    {/*Object.keys(this.state.users).map(function (key) {*/}
                        {/*var user = this.state.users[key];*/}
                        {/*return <SearchResult user={user}/>*/}
                    {/*})*/}
                {/*}*/}
            </Row>
        );
    }
}

export default SearchResultList;