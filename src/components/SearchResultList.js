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
        searchResults.on('value', (snap) => {
            let users = snap.val();
            const profiles = Object.keys(users).map((key) => users[key]);
            this.setState({ users: {...profiles}});
        });

        console.log('state: ', this.state.users);
    }

    render(){
        // console.log('statess: ', Object.keys(this.state.users))
        return(
            <Row>
                {/*{this.state.users}*/}
            </Row>
        );
    }
}

export default SearchResultList;