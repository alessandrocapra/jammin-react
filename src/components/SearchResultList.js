import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import {FBAppDB} from '../modules/firebase';
import update from 'immutability-helper';


import SearchResult from './SearchResult';

class SearchResultList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentWillMount(){
        const users = FBAppDB.ref('users');

        let location = this.props.location;
        let instrumentProp = this.props.instrument;

        let searchResult = users.orderByChild('location').equalTo(location).on('value', (snapshot) => {
            let profilesArray = snapshot.val();
            Object.keys(profilesArray).map((profile) => {
                let instrumentsArray = profilesArray[profile].instruments;
                let instrumentsName = [];
                if(instrumentsArray.length){
                    instrumentsArray.map((instrument) => {
                        // if one of the instruments is the one in the search, add the profile to the component state
                        if(instrument.name == instrumentProp.toLowerCase()){
                            console.log('instrProp: ' + instrumentProp +', profile: ' + profilesArray[profile].name + ' - playing : ' + instrument.name);
                            this.setState({users: update(this.state.users, {$push: [profilesArray[profile]]})});
                        }
                    });
                } else {
                    console.log('Error: no profiles with instruments available!');
                }
            });
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