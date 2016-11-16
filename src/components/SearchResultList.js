import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import {FBApp} from '../modules/firebase';

import SearchResult from './SearchResult';

class SearchResultList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: {}
        }
    }

    componentWillMount() {

        let location = this.props.location;
        let instrument = this.props.instrument;

        // return SEARCH_RESULTS.orderByChild("age").on("child_added", function(snapshot) {
        //     let user = snapshot.val();
        //     console.log(user.name + " is " + user.age + " years old.");
        //     // this.setState({user: user});
        // }.bind(this));

        // let SEARCH_RESULTS = FBApp.ref('users/');
        // SEARCH_RESULT.on('value', function(snapshot) {
        //
        // });

    }

    getProfiles() {
        const users = this.state.user;

        Object.keys(users).map((key, index) => {
            let user = users[key];
            console.log(user);

            return <SearchResult user={user} />
        });
    }

    render(){
        // Load user data

        // put relevant results in var
        // let profiles = SEARCH_RESULTS.on('value', function(snapshot) {
        //     let user = snapshot.val();
        //     console.log('profile.name', user.name);
        //     return <SearchResult user={user} />
        // });

        return(
            <Row>
                <Col xs={12}>
                    {this.getProfiles}
                </Col>
            </Row>
        );
    }
}

export default SearchResultList;