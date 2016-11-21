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

        let profiles = [];
        searchResults.orderByChild('location').equalTo(location).once('value').then((snap) => {
            let users = snap.val();
            Object.keys(users).map((key) => {
                let user = users[key];
                console.log(user);
                profiles.push(user);
            });
        });

        // this.setState({users: profiles[0]});
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