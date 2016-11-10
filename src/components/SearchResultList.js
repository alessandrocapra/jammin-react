import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

import SearchResult from './SearchResult';

class SearchResultList extends Component {
    render(){
        return(
            <article>
                <Row>
                    <Col xs={12}>
                        <SearchResult user={this.props.user}/>
                    </Col>
                </Row>
            </article>
        );
    }
}

export default SearchResultList;