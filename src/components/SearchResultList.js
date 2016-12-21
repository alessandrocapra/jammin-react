import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import SearchResult from './SearchResult';

class SearchResultList extends Component {

    render(){

        console.log('this.props.users in list: ', this.props.users);

        return(
            <Row>
                {this.props.users.length ? Object.keys(this.props.users).map((user) => {
                    return <SearchResult user={this.props.users[user]} key={user} />
                }) : <p>No results for {this.props.instrument.label} in {this.props.location}</p>}
            </Row>
        );
    }
}

export default SearchResultList;