import React, { Component } from 'react';
import {Row} from 'react-bootstrap';


import SearchResult from './SearchResult';

class SearchResultList extends Component {

    render(){

        return(
            <Row>
                {Object.keys(this.props.users).map((key) => {
                    return <SearchResult user={this.props.users[key]} key={key} />
                })}
            </Row>
        );
    }
}

export default SearchResultList;