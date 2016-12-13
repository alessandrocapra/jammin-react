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
        const users = FBAppDB.ref('users');

        let location = this.props.location;
        let instrument = this.props.instrument;

        let searchResult = users.orderByChild('location').equalTo(location).on('value', (snapshot) => {
            let profilesArray = snapshot.val();
            this.setState({ users: {...profilesArray}});
            // ...
        });

        // let profiles = [];
        // users.orderByChild('location').on('value', (snap) => {
        //     let users = snap.val();
        //     console.log('users from search results: ', users);
        //     const profiles = Object.keys(users).map((key) => users[key]);
        //     this.setState({ users: {...profiles}});
        // });
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